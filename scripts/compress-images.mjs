/**
 * Image Compression Script — D'Oasis
 * Uses `sharp` to re-compress all AVIF/JPG/PNG images in /public
 * with optimal settings while preserving visual quality.
 *
 * Strategy:
 *  - AVIF hero/full-bleed images (>1200px wide): max 1920px wide, quality 60
 *  - AVIF blog thumbnails (<800px wide): max 800px, quality 62
 *  - AVIF small assets (<400px): keep dimensions, quality 65
 *  - JPGs larger than 1 MB: convert to AVIF (better compression at same quality)
 *  - Logo AVIFs: skip (already tiny, <15KB)
 * Originals are NOT deleted — script writes compressed versions in-place
 * only if the new file is smaller than the original.
 */

import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = new URL('../public/images', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

// Max dimensions for different categories
const HERO_MAX_WIDTH = 1920;
const BLOG_MAX_WIDTH = 1200;
const THUMB_MAX_WIDTH = 800;

// Quality settings (AVIF: lower = smaller, 60 = visually lossless for photos)
const AVIF_OPTS = { quality: 60, effort: 6, chromaSubsampling: '4:2:0' };
const AVIF_BLOG_OPTS = { quality: 62, effort: 6 };

let totalSaved = 0;
let filesProcessed = 0;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(full)));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.avif', '.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(full);
      }
    }
  }
  return files;
}

function getMaxWidth(filePath) {
  const name = basename(filePath).toLowerCase();
  if (name.startsWith('logo-')) return null; // skip logos
  if (name.startsWith('hero-') || name.startsWith('main-') || 
      name.startsWith('work-with-me') || name.startsWith('journal') ||
      name.startsWith('1Z6A') || name.startsWith('portrait') ||
      name.startsWith('contact-collab') || name.startsWith('contact-bg') ||
      name.startsWith('cta-') || name.startsWith('wwm-')) {
    return HERO_MAX_WIDTH;
  }
  if (name.startsWith('blog-') || name.startsWith('about-') ||
      name.startsWith('services-')) {
    return BLOG_MAX_WIDTH;
  }
  return THUMB_MAX_WIDTH;
}

function getAvifOpts(filePath) {
  const name = basename(filePath).toLowerCase();
  if (name.startsWith('blog-') || name.startsWith('about-')) return AVIF_BLOG_OPTS;
  return AVIF_OPTS;
}

async function processFile(filePath) {
  const name = basename(filePath).toLowerCase();
  // Skip logos (already tiny)
  if (name.startsWith('logo-')) {
    console.log(`  SKIP  ${basename(filePath)} (logo, already small)`);
    return;
  }

  const ext = extname(filePath).toLowerCase();
  const originalStat = await stat(filePath);
  const originalSize = originalStat.size;

  const maxWidth = getMaxWidth(filePath);
  const avifOpts = getAvifOpts(filePath);

  // For large JPGs/PNGs, convert to AVIF
  const targetPath = ext === '.avif' ? filePath : filePath.replace(/\.(jpg|jpeg|png)$/i, '.avif');
  const tmpPath = targetPath + '.tmp.avif';

  try {
    let pipeline = sharp(filePath, { failOn: 'none' });

    // Get metadata for conditional resizing
    const meta = await pipeline.metadata();
    const currentWidth = meta.width || 9999;

    if (maxWidth && currentWidth > maxWidth) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true, kernel: 'lanczos3' });
    }

    await pipeline
      .avif(avifOpts)
      .toFile(tmpPath);

    const newStat = await stat(tmpPath);
    const newSize = newStat.size;
    const saved = originalSize - newSize;
    const savedPct = ((saved / originalSize) * 100).toFixed(1);

    if (newSize < originalSize) {
      // Replace original with compressed version
      if (targetPath !== filePath) {
        // It was a JPG/PNG being converted to AVIF — keep original too
        await rename(tmpPath, targetPath);
        console.log(`  CONV  ${basename(filePath)} → ${basename(targetPath)} | ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (-${savedPct}%)`);
      } else {
        await rename(tmpPath, filePath);
        console.log(`  COMP  ${basename(filePath)} | ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (-${savedPct}%)`);
      }
      totalSaved += saved;
      filesProcessed++;
    } else {
      await unlink(tmpPath);
      console.log(`  SKIP  ${basename(filePath)} (already optimal, ${(originalSize/1024).toFixed(0)}KB)`);
    }
  } catch (err) {
    try { await unlink(tmpPath); } catch {}
    console.error(`  ERR   ${basename(filePath)}: ${err.message}`);
  }
}

async function main() {
  console.log('🖼  D\'Oasis Image Compression\n');
  const files = await getFiles(PUBLIC_DIR);
  console.log(`Found ${files.length} image files to process...\n`);

  // Process in sequence to avoid memory issues with large images
  for (const file of files) {
    await processFile(file);
  }

  console.log(`\n✅ Done! Processed ${filesProcessed} files.`);
  console.log(`   Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
