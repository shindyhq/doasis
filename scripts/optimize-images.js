import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public/images');
const BACKUP_DIR = path.join(__dirname, '../public/images_backup');
const MAX_WIDTH = 2560;
const QUALITY = 75; // Balanced quality for AVIF

async function optimizeImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip the backup directory
      if (fullPath === BACKUP_DIR) continue;
      await optimizeImages(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

    const avifPath = fullPath.replace(ext, '.avif');

    try {
      const image = sharp(fullPath);
      const metadata = await image.metadata();

      let pipeline = image;

      // Resize if too wide
      if (metadata.width > MAX_WIDTH) {
        console.log(`Resizing ${entry.name} from ${metadata.width}px...`);
        pipeline = pipeline.resize(MAX_WIDTH);
      }

      // Convert to AVIF
      await pipeline
        .avif({ quality: QUALITY, effort: 4 }) // Effort 4 is a good speed/quality balance for AVIF
        .toFile(avifPath);

      console.log(`✅ Converted ${entry.name} to AVIF`);

      // Delete original if the new file exists and is smaller (or if user wants to replace all)
      const statsOrig = await fs.stat(fullPath);
      const statsAvif = await fs.stat(avifPath);

      if (statsAvif.size < statsOrig.size) {
        await fs.unlink(fullPath);
        console.log(`🗑️ Deleted original ${entry.name} (${(statsAvif.size / statsOrig.size * 100).toFixed(1)}% of original size)`);
      } else {
        console.log(`⚠️ AVIF was larger than original for ${entry.name}, keeping original but AVIF is also there.`);
      }

    } catch (error) {
      console.error(`❌ Error processing ${entry.name}:`, error.message);
    }
  }
}

console.log('🚀 Starting AVIF optimization...');
optimizeImages(INPUT_DIR)
  .then(() => console.log('✨ All images optimized!'))
  .catch(err => console.error('💥 Batch optimization failed:', err));
