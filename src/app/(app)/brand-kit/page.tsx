'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import Image from 'next/image';
import { Download, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

const LOGO_VARIANTS = [
  { hex: '#173919', name: 'Forest Green (T-700)', file: 'logo-173919.webp', bg: 'bg-white' },
  { hex: '#2A6F3C', name: 'Oasis Base (T-600)', file: 'logo-2a6f3c.webp', bg: 'bg-white' },
  { hex: '#A3B9A4', name: 'Sage Leaf (S-200)', file: 'logo-a3b9a4.webp', bg: 'bg-primary' },
  { hex: '#C5CA9B', name: 'Lime Sage (Accent)', file: 'logo-c5ca9b.webp', bg: 'bg-primary' },
  { hex: '#FFFFFF', name: 'Pure White (Knockout)', file: 'logo-ffffff.webp', bg: 'bg-primary' },
];

const COLOR_SYSTEM = [
  { hex: '#EDF2ED', label: 'S-50', desc: 'Lightest Neutral' },
  { hex: '#CDD9CE', label: 'S-100', desc: 'Soft Mist' },
  { hex: '#A3B9A4', label: 'S-200', desc: 'Sage Tint' },
  { hex: '#638864', label: 'S-300', desc: 'Leaf Midtone' },
  { hex: '#235725', label: 'Base', desc: 'Brand Primary' },
  { hex: '#1D481F', label: 'T-600', desc: 'Deep Forest' },
  { hex: '#173919', label: 'T-700', desc: 'Midnight Green' },
  { hex: '#0E230F', label: 'T-800', desc: 'Night Shade' },
  { hex: '#050D06', label: 'Deepest', desc: 'Obsidian Forest' },
];

export default function BrandKitPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { showToast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    showToast(`Copied ${text} to clipboard`, 'success');
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-48">
      {/* Header */}
      <Section className="!py-0 mb-24">
        <Reveal>
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="text-xs font-display uppercase tracking-[0.4em] font-bold text-muted mb-8 text-center w-full block">Visual Identity</span>
            <h1 className="text-6xl md:text-8xl font-display text-primary mb-12 tracking-tighter leading-[0.9]">
              D&apos;Oasis <br />
              <span className="font-serif-italic text-secondary">Brand Kit</span>
            </h1>
            <p className="text-xl font-serif italic text-primary/70 leading-relaxed max-w-2xl">
              &quot;Identity is not what we show, but how we hold space.&quot; 
              Our visual language is rooted in tranquility, depth, and sacred simplicity.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Logo Assets */}
      <Section className="bg-primary/5 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-20 border-b border-primary/10 pb-8 gap-4 flex-wrap">
            <h2 className="text-3xl font-display text-primary font-medium">Logo System</h2>
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted">WebP Format | High Resolution</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LOGO_VARIANTS.map((logo, i) => (
              <Reveal key={logo.hex} delay={i * 0.1}>
                <div className="group bg-white rounded-[40px] overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-700">
                  <div className={`aspect-square relative p-16 ${logo.bg} transition-colors duration-1000`}>
                    <div className="relative w-full h-full">
                      <Image
                        src={`/images/external/${logo.file}`}
                        alt={logo.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="p-8 flex items-center justify-between border-t border-primary/5">
                    <div>
                      <h3 className="text-sm font-display font-bold text-primary mb-1 uppercase tracking-wider">{logo.name}</h3>
                      <p className="text-[11px] text-muted font-display uppercase tracking-widest">{logo.hex}</p>
                    </div>
                    <button 
                      onClick={() => window.open(`/images/external/${logo.file}`, '_blank')}
                      className="p-4 rounded-full bg-primary/5 hover:bg-primary hover:text-white transition-all duration-300"
                      title="Download Asset"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Color Palette */}
      <Section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-20 border-b border-primary/10 pb-8 flex-wrap gap-4">
            <h2 className="text-3xl font-display text-primary font-medium">Color System</h2>
            <p className="text-xs font-display text-muted italic max-w-md md:text-right">
              A tinted-neutral approach where every tone contains a trace of our primary forest green.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-4">
            {COLOR_SYSTEM.map((color, i) => (
              <Reveal key={color.hex} delay={i * 0.05} className="h-full">
                <button
                  onClick={() => copyToClipboard(color.hex)}
                  className="w-full flex flex-col group h-full text-left"
                >
                  <div 
                    className="aspect-[4/5] w-full rounded-2xl mb-4 transition-transform duration-500 group-hover:scale-[0.98] border border-black/5 flex items-center justify-center relative overflow-hidden shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    <AnimatePresence>
                      {copiedColor === color.hex && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="bg-white/90 p-2 rounded-full shadow-lg z-10"
                        >
                          <Check className="w-4 h-4 text-primary" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex flex-col items-start px-2">
                    <span className="text-[10px] font-display font-bold text-primary mb-1 uppercase tracking-widest">{color.label}</span>
                    <span className="text-[12px] font-display text-muted tracking-tighter transition-colors group-hover:text-primary">{color.hex}</span>
                    <span className="text-[9px] text-muted/60 font-display uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {color.desc}
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Typography */}
      <Section className="bg-primary text-white py-40 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] rounded-full translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-baseline justify-between mb-32 border-b border-white/10 pb-8 flex-wrap gap-4">
            <h2 className="text-3xl font-display text-white font-medium">Typography Pairing</h2>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Editorial Standard</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <span className="text-[10px] uppercase tracking-[0.6em] text-accent/60 mb-12 block font-bold">Display Font</span>
              <h3 className="text-8xl md:text-9xl font-display mb-12 leading-none tracking-tighter">Outfit</h3>
              <p className="text-2xl font-display text-white/50 leading-relaxed max-w-md italic font-light mb-16">
                Modern, balanced, and approachable. Used for primary UI elements and clarity-focused information.
              </p>
              <div className="space-y-4 font-display text-3xl opacity-30">
                <p>Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj</p>
                <p className="font-bold uppercase tracking-widest">BOLD CAPS FOR EMPHASIS</p>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.6em] text-accent/60 mb-12 block font-bold">Script / Serif</span>
              <h3 className="text-8xl md:text-9xl font-serif-italic italic mb-12 leading-none tracking-tighter">Cormorant</h3>
              <p className="text-2xl font-serif italic text-white/50 leading-relaxed max-w-md font-light mb-16">
                Atmospheric, sacred, and grounded. Used for headlines and emotive reflections.
              </p>
              <div className="space-y-4 font-serif-italic italic text-4xl opacity-30">
                <p>Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj</p>
                <p>The art of holding space.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Brand Voice */}
      <Section className="py-48 bg-white selection:bg-accent/30 selection:text-primary">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-xs font-display uppercase tracking-[0.5em] font-bold text-muted mb-12">Tone of Voice</h2>
            <h3 className="text-4xl md:text-6xl font-display text-primary tracking-tighter mb-12">The Whisper Test.</h3>
            <p className="text-xl font-serif italic text-primary/60 leading-relaxed">
              If you can&apos;t imagine it being said softly, with steady eye contact and genuine care - rewrite it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
            {[
              { 
                label: 'Whispered Strength', 
                desc: 'Not shouted confidence. We lead with the quiet authority of one who has been through the fire.' 
              },
              { 
                label: 'Sacred Simplicity', 
                desc: 'Not clinical complexity. We remove the clutter so the soul can breathe.' 
              },
              { 
                label: 'Grounded Wisdom', 
                desc: 'Not performative expertise. We offer tools that work in the messy middle of life.' 
              },
              { 
                label: 'Collaborative Growth', 
                desc: 'Not prescriptive dictates. We honor the client as the expert of their own experience.' 
              }
            ].map((tone, i) => (
              <Reveal key={tone.label} delay={i * 0.1}>
                <div className="p-8 border-l border-accent/30 hover:border-accent transition-colors duration-500">
                  <h4 className="text-[11px] font-display uppercase tracking-[0.4em] font-bold text-primary mb-4">{tone.label}</h4>
                  <p className="text-lg text-primary/70 font-serif italic leading-relaxed">{tone.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
