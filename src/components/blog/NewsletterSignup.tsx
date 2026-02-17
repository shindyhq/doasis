'use client';

import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterSignupProps {
  className?: string;
}

export function NewsletterSignup({ className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to subscribe');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`py-12 px-4 text-center ${className}`}>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="max-w-md mx-auto bg-secondary/5 rounded-3xl p-8 border border-primary/5"
        >
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="text-xl font-serif italic text-primary mb-2">Welcome to the Sanctuary.</h3>
          <p className="text-sm font-serif font-light text-primary/60">
            You've been successfully subscribed. Look for a note from me soon.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`py-12 px-4 text-center ${className}`}>
        <div className="max-w-4xl mx-auto border-y border-primary/5 py-16 px-4">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif italic text-primary mb-8">
              Stay in the <span className="text-secondary opacity-80">stillness.</span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-lg font-serif font-light text-primary/50 mb-12 max-w-xl mx-auto leading-relaxed">
              Gentle reminders and soulful resources sent from my heart to yours, twice a month. 
              No noise, just presence.
            </p>
          </Reveal>
          
          <Reveal delay={0.4}>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto relative group">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="w-full bg-transparent border-b border-primary/10 py-4 text-lg font-serif italic text-primary focus:border-accent outline-none transition-all pr-32 disabled:opacity-50" 
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.4em] font-bold text-accent hover:text-primary transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
              </button>
              
              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -bottom-8 left-0 right-0 text-xs text-red-500 font-bold uppercase tracking-widest"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>
    </div>
  );
}
