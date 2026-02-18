'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

const SLIDES = [
  {
    id: 'stillness',
    title: 'Find your stillness.',
    subtitle: 'exhale.',
    description: 'A curated experience where faith meets psychology, designed for the woman who has spent too long carrying everything for everyone else.',
    cta: 'Hold Space for Me',
    bg: '/images/external/hero-stillness-landscape.jpg',
    position: 'left',
    accent: 'stillness'
  },
  {
    id: 'healing',
    title: 'Healing doesn\'t have to be loud.',
    subtitle: 'a sacred place for one.',
    description: 'Faith-rooted counseling where your journey is witnessed, honored, and held in the quiet—because healing doesn\'t shout, it unfolds.',
    cta: 'Enter the Sanctuary',
    bg: '/images/external/hero-healing-forest.jpg',
    position: 'left',
    accent: 'witness'
  },
  {
    id: 'unbecoming',
    title: 'The Art of unbecoming.',
    subtitle: 'reclaim your self.',
    description: 'A premium space for women navigating the deep waters of faith, grief, and the reclamation of who you truly are.',
    cta: 'Start your journey',
    bg: '/images/external/hero-unbecoming-window.jpg',
    position: 'left',
    accent: 'reclaim'
  }
];

export function HomeHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 8000);

    const handleMouseMove = (e: MouseEvent) => {
      // Disable parallax on mobile to reduce TBT
      if (window.innerWidth < 1024) return;
      
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 30, 
        y: (e.clientY / window.innerHeight - 0.5) * 30 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#0A1B12] overflow-hidden">
      {/* Background Parallax Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={SLIDES[current].id + '-bg'}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2, ease: "circOut" }}
          className="absolute inset-0 pointer-events-none"
          style={{ 
            x: mousePos.x * 0.5,
            y: mousePos.y * 0.5
          }}
        >
          <Image
            src={SLIDES[current].bg}
            alt="Hero background"
            fill
            className="object-cover grayscale scale-110"
            priority={true}
            quality={90}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Darker Overlay for better contrast */}
      <div className="absolute inset-0 bg-[#0A1B12]/40 z-10" />

      {/* Glow Blobs */}
      <motion.div 
        animate={{ x: mousePos.x, y: mousePos.y }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ x: -mousePos.x, y: -mousePos.y }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B12] via-transparent to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto w-full relative z-20 px-6 md:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={SLIDES[current].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`grid grid-cols-1 lg:grid-cols-12 items-center gap-16 ${
              SLIDES[current].position === 'right' ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className={`lg:col-span-7 ${SLIDES[current].position === 'right' ? 'lg:col-start-6 lg:text-right flex flex-col items-end lg:pr-12' : ''}`}>
              <Reveal>
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-10 ${
                  SLIDES[current].position === 'right' ? 'flex-row-reverse' : ''
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-display font-bold text-accent">
                    {SLIDES[current].subtitle}
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-[clamp(60px,7.5vw,110px)] leading-[0.95] font-display font-medium text-white mb-10 tracking-tight text-balance">
                  {SLIDES[current].title.split('.').map((part, i) => (
                    <span key={i} className="block">
                      {part}
                      {i === 0 && SLIDES[current].title.includes('.') && (
                        <span className="text-accent">.</span>
                      )}
                    </span>
                  ))}
                </h1>
                
                <p className={`text-xl text-white/70 font-serif font-light leading-relaxed mb-16 max-w-xl italic text-balance ${
                  SLIDES[current].position === 'right' ? 'ml-auto' : ''
                }`}>
                  {SLIDES[current].description}
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className={`flex items-center gap-12 group ${SLIDES[current].position === 'right' ? 'flex-row-reverse' : ''}`}>
                  <Link 
                    href="/booking" 
                    className="relative overflow-hidden px-12 py-5 bg-accent text-primary font-display font-bold uppercase tracking-[0.2em] text-[11px] rounded-2xl group transition-all duration-500 hover:shadow-[0_0_50px_rgba(150,154,123,0.3)] hover:scale-105"
                  >
                    <span className="relative z-10">{SLIDES[current].cta}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                  </Link>
                  <Link href="/work-with-me" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/60 hover:text-white transition-colors flex items-center gap-3">
                    Our Philosophy
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className={`hidden lg:block lg:col-span-5 relative ${SLIDES[current].position === 'right' ? 'lg:col-start-1 lg:-translate-x-12' : 'lg:translate-x-12'}`}>
              <Reveal delay={0.3}>
                <div className="relative aspect-square">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[1px] border-accent/20 rounded-full" 
                  />
                  <div className="absolute inset-12 border-[1px] border-accent/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      key={SLIDES[current].id + '-img'}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="w-[85%] h-[85%] rounded-full overflow-hidden grayscale opacity-50 hover:opacity-100 transition-all duration-1000 cursor-pointer shadow-inner relative"
                    >
                      <img src={SLIDES[current].bg} className="w-full h-full object-cover scale-125" alt="Sanctuary focus" />
                      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                    </motion.div>
                  </div>
                </div>
              </Reveal>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id + '-dot'}
            onClick={() => setCurrent(i)}
            className="group py-4 px-2"
            aria-label={`Go to slide ${i + 1}: ${slide.title}`}
            aria-current={current === i ? 'true' : 'false'}
          >
            <div className={`h-1 transition-all duration-500 rounded-full ${
              current === i ? 'w-12 bg-accent shadow-[0_0_10px_rgba(150,154,123,0.5)]' : 'w-4 bg-white/20 group-hover:bg-white/40'
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
}
