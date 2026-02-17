'use client';

import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { motion } from 'framer-motion';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/posts';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { NewsletterSignup } from '@/components/blog/NewsletterSignup';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <div className="bg-background pt-48 pb-16">
      <div className="bg-grain fixed inset-0 opacity-[0.03] z-[100] pointer-events-none" />

      {/* Hero Section - High-End Editorial */}
      <Section className="mb-32">
        <div className="max-w-5xl">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.5em] font-display font-bold text-accent mb-12 block text-balance">
              The Sanctuary Journal
            </span>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h1 className="text-[clamp(4rem,12vw,10rem)] font-serif italic text-primary leading-[0.85] tracking-tighter mb-16">
              Words for the <br />
              <span className="text-secondary opacity-80">becoming.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-2xl font-serif font-light text-primary/50 leading-relaxed max-w-2xl border-l border-primary/10 pl-12 py-4">
              A curated collection of reflections on faith deconstruction, 
              embodied rest, and the sacred beauty of the messy middle.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Sticky Navigation / Filter */}
      <div className="sticky top-[100px] z-40 mb-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-12 overflow-x-auto no-scrollbar pb-6 border-b border-primary/5">
            {BLOG_CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-[0.3em] font-display font-bold whitespace-nowrap transition-all duration-500 hover:text-primary ${
                  activeCategory === cat 
                  ? 'text-primary' 
                  : 'text-primary/30'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeCat"
                    className="h-[1px] w-full bg-accent mt-2" 
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid - Asymmetrical editorial flow */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-48">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: (i % 2) * 0.2 }}
              className={`group flex flex-col ${i % 2 === 1 ? 'md:mt-32' : ''}`}
            >
              <Link href={`/blog/${post.slug}`} className="block relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-primary/5 mb-12 editorial-shadow transition-all duration-1000 group">
                {post.image ? (
                  <motion.img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-16 text-center">
                    <div className="w-full h-full border border-primary/5 rounded-[1rem] flex items-center justify-center">
                      <span className="text-xl font-serif italic text-primary/10 group-hover:text-primary/20 transition-colors duration-1000 px-8">
                        {post.title}
                      </span>
                    </div>
                  </div>
                )}
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-1000" />
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs uppercase tracking-[0.4em] font-display font-bold text-accent">{post.category}</span>
                <div className="h-[1px] w-8 bg-primary/10" />
                <span className="text-xs uppercase tracking-[0.4em] font-display font-bold text-primary/20">{post.readTime}</span>
              </div>

              <h2 className="text-4xl font-serif font-light text-primary mb-8 leading-[1.2] group-hover:translate-x-2 transition-transform duration-700">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-lg font-serif font-light text-primary/40 leading-relaxed max-w-md line-clamp-3 mb-10">
                {post.excerpt}
              </p>

              <Link 
                href={`/blog/${post.slug}`} 
                className="group/link flex items-center gap-6 text-xs uppercase tracking-[0.4em] font-display font-bold text-primary/50 hover:text-primary transition-all"
              >
                Read Reflection
                <div className="h-[1px] w-12 bg-primary/10 group-hover/link:w-20 group-hover/link:bg-accent transition-all duration-700" />
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Newsletter - Integrated Editorial Style */}
      <Section className="py-32 md:py-64">
        <NewsletterSignup />
      </Section>
    </div>
  );
}
