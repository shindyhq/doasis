'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { logSecurityEvent } from '@/lib/supabase/security-logger';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight, User, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    console.log('DEBUG: Current Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Generic Error Message for Security (Anti-Enumeration)
    const genericErrorMessage = "Invalid credentials. Please check your email and password and try again.";

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
          await logSecurityEvent('login_failure', { email });
          // Always show generic error in production
          setError(genericErrorMessage);
        } else {
          await logSecurityEvent('login_success', { email });
          router.push('/dashboard');
          router.refresh();
          return; // Stop here to avoid resetting loading state too early
        }
      } else {
        // --- SIGNUP LOGIC ---
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              avatar_url: '',
            },
          },
        });

        if (authError) {
          throw authError; // Throw to catch block
        }

        if (data.user) {
           await logSecurityEvent('signup_success', { email });
           router.push('/dashboard');
           router.refresh();
           return;
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      if (!isLogin) {
         await logSecurityEvent('signup_failure', { email, error: err.message });
         setError(err.message || "An error occurred during sign up.");
      } else {
         setError(genericErrorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden selection:bg-accent/30 selection:text-primary">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block group border-none outline-none">
            <motion.div
              whileHover={{ y: -2 }}
              className="space-y-1"
            >
              <h1 className="font-display text-3xl uppercase tracking-[0.4em] font-extrabold text-primary group-hover:text-accent transition-colors duration-500">
                D'Oasis
              </h1>
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-4 bg-accent/30" />
                <p className="text-[9px] uppercase tracking-[0.6em] font-display font-medium text-accent">
                  Sanctuary Portal
                </p>
                <span className="h-px w-4 bg-accent/30" />
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="glass-dark p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500">
          {/* Subtle Inner Glow */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          
          <div className="mb-10 text-center relative">
             <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login-header' : 'signup-header'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-[2.75rem] leading-none font-display font-medium text-white mb-4 tracking-[-0.03em]">
                  {isLogin ? 'Welcome Back.' : 'Begin Journey.'}
                </h2>
                <p className="font-serif italic text-white/40 text-lg">
                  {isLogin ? 'Return to your quiet space.' : 'Create your sanctuary space.'}
                </p>
              </motion.div>
             </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <label className="text-[10px] uppercase tracking-[0.25em] font-display font-bold text-white/50 ml-1">
                    Full Name
                  </label>
                  <div className="group relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors duration-300">
                      <User size={16} />
                    </div>
                    <input 
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:bg-white/[0.06] focus:ring-0 focus:border-accent/50 transition-all outline-none text-white font-display"
                      placeholder="Your Name"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.25em] font-display font-bold text-white/50 ml-1">
                Sanctuary ID
              </label>
              <div className="group relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors duration-300">
                  <Mail size={16} />
                </div>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:bg-white/[0.06] focus:ring-0 focus:border-accent/50 transition-all outline-none text-white font-display"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-[0.25em] font-display font-bold text-white/50">
                  Password
                </label>
                 {isLogin && (
                  <Link href="/contact" className="text-[9px] uppercase tracking-widest text-accent/60 hover:text-accent transition-colors">
                    Lost Key?
                  </Link>
                )}
              </div>
              <div className="group relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors duration-300">
                  <Lock size={16} />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:bg-white/[0.06] focus:ring-0 focus:border-accent/50 transition-all outline-none text-white font-display tracking-widest"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-400/10 border border-red-400/20 rounded-xl text-red-400 text-[11px] text-center font-display font-medium tracking-wide"
              >
                {error}
              </motion.div>
            )}

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full py-6 text-sm flex items-center justify-center gap-3 relative overflow-hidden group shadow-[0_20px_40px_-10px_rgba(150,154,123,0.3)]" 
                variant="secondary"
                disabled={loading}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? 'Processing...' : (isLogin ? 'Enter the Sanctuary' : 'Create Account')}
                  {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </Button>
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-8 flex justify-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 py-2 px-4 border border-white/5 rounded-full">
              Encrypted Sanctuary Access
            </p>
          </div>
        </div>

        <div className="mt-12 text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-primary/30 uppercase tracking-[0.3em] text-[10px] font-display font-medium translate-y-4">
            <Shield size={12} className="text-accent/60" />
            <span className="hidden sm:inline">HIPAA-Compliant Secure Gateway</span>
            <span className="sm:hidden">Secure Gateway</span>
          </div>
          
          <div className="h-12 w-px bg-gradient-to-b from-primary/10 to-transparent" />
          
          <button 
            type="button"
            onClick={toggleMode}
            className="group flex flex-col items-center gap-4 border-none outline-none"
          >
            <span className="text-xs text-primary/40 uppercase tracking-[0.2em] font-display font-bold group-hover:text-primary transition-colors">
              {isLogin ? 'New seeker?' : 'Already have a key?'}
            </span>
            <span className="text-sm font-serif italic text-accent hover:text-primary transition-all underline underline-offset-8 decoration-accent/20 group-hover:decoration-primary/40">
              {isLogin ? 'Request access to the sanctuary' : 'Enter the sanctuary'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Footer Branding Silhouette / Watermark */}
      <div className="absolute bottom-[-10%] md:bottom-[-15%] pointer-events-none select-none opacity-[0.05]">
        <h3 className="font-display font-black text-[35vw] leading-none uppercase tracking-tighter whitespace-nowrap text-primary">
          D'OASIS
        </h3>
      </div>
    </div>
  );
}
