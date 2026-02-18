'use client';

import { useParams, notFound } from 'next/navigation';
import { Section } from '@/components/layout/Section';
import { BLOG_POSTS } from '@/data/posts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Clock, Calendar } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import ReactMarkdown from 'react-markdown';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { NewsletterSignup } from '@/components/blog/NewsletterSignup';

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="bg-grain fixed inset-0 opacity-[0.03] z-[100] pointer-events-none" />

      <Section>
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumbs / Back */}
          <Link 
            href="/blog" 
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-display font-bold text-primary/40 hover:text-primary transition-all mb-16"
          >
            <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Sanctuary Reflections
          </Link>

          {/* Featured Image */}
          {post.image && (
            <Reveal delay={0.1}>
              <div className="relative aspect-[16/9] mb-16 rounded-[2rem] overflow-hidden editorial-shadow">
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={post.image} 
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </Reveal>
          )}

          {/* Post Header */}
          <div className="mb-16">
            <Reveal delay={0.2}>
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-6 block">
                {post.category}
              </span>
            </Reveal>
            
            <Reveal delay={0.3}>
              <h1 className="text-5xl md:text-7xl font-display font-medium text-primary leading-[1.1] mb-10">
                {post.title}
              </h1>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-display font-bold text-primary/30">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Post Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-none"
          >
            <article className="prose prose-lg prose-stone max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:text-primary prose-p:font-serif prose-p:font-light prose-p:text-xl prose-p:leading-[1.8] prose-p:text-primary/70 prose-strong:font-bold prose-strong:text-primary/90 prose-blockquote:border-l-accent prose-blockquote:text-primary prose-blockquote:font-serif prose-blockquote:italic">
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
            </article>

            {post.cta && <BlogCTA content={post.cta} />}

            <div className="border-t border-primary/5 pt-16">
              <NewsletterSignup />
            </div>
          </motion.div>

          {/* Footer Navigation */}
          <div className="mt-32 pt-16 border-t border-primary/5 flex justify-between items-center">
             <Link 
              href="/blog" 
              className="text-[10px] uppercase tracking-[0.3em] font-display font-bold text-primary/40 hover:text-primary transition-all underline underline-offset-8"
            >
              All Reflections
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
