import { useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  Video, 
  CreditCard, 
  LogOut,
  User,
  Users,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clients', href: '/dashboard/admin', icon: Users, adminOnly: true },
  { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
  { name: 'Journal', href: '/dashboard/journal', icon: BookOpen },
  { name: 'Library', href: '/dashboard/library', icon: Video },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
];

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      setIsAdmin(profile?.role === 'admin');
    };
    checkRole();
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={isDesktop ? { x: 0 } : (isOpen ? { x: 0 } : { x: -300 })}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`w-72 bg-primary h-screen fixed lg:sticky top-0 z-50 flex flex-col pt-12 pb-8 px-6 text-background/80 overflow-y-auto border-r border-white/5`}
      >
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          aria-label="Close sidebar"
          className="lg:hidden absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Brand Header */}
        <div className="mb-16 px-4">
          <Link href="/" className="group" onClick={onClose}>
            <h2 className="font-display text-lg uppercase tracking-[0.3em] font-bold text-white group-hover:text-accent transition-colors">
              D&apos;Oasis
            </h2>
            <p className="text-[9px] uppercase tracking-[0.4em] font-serif italic text-accent/60 mt-2">
              Sanctuary Portal
            </p>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-4">
          {NAV_ITEMS.map((item) => {
            if (item.adminOnly) {
              if (isAdmin === null) return null; // Still loading
              if (!isAdmin) return null; // Not an admin
            }

            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]' 
                    : 'hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`transition-colors duration-500 ${
                  isActive ? 'text-accent' : 'text-white/40 group-hover:text-accent/80'
                }`}>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`font-display text-[11px] uppercase tracking-[0.25em] font-bold transition-all duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'
                }`}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute right-4 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(150,154,123,0.8)]" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-10 mt-10 border-t border-white/5 space-y-2">
          <Link 
            href="/dashboard/profile"
            onClick={onClose}
            className="flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-500 hover:bg-white/5 group"
            aria-label="View Profile Settings"
          >
            <div className="text-white/40 group-hover:text-white transition-colors">
              <User size={18} strokeWidth={2} />
            </div>
            <span className="font-display text-[11px] uppercase tracking-[0.25em] font-bold opacity-50 group-hover:opacity-100">
              Profile
            </span>
          </Link>
          
          <button 
            onClick={async () => {
              const supabase = createClient();
              try {
                // Attempt standard sign out
                await supabase.auth.signOut();
              } catch (e) {
                console.warn('Sign out redirected or failed, clearing local session...', e);
              } finally {
                // Force clear mock auth cookie for development/bypass environments
                document.cookie = "sb-mock-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                // Always redirect to home
                window.location.href = '/';
              }
            }}
            className="w-full flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-500 hover:bg-white/5 group text-left relative overflow-hidden"
            aria-label="Exit Sanctuary (Log out)"
          >
            <div className="text-white/40 group-hover:text-red-400/80 transition-colors">
              <LogOut size={18} strokeWidth={2} />
            </div>
            <span className="font-display text-[11px] uppercase tracking-[0.25em] font-bold opacity-50 group-hover:opacity-100 group-hover:text-red-400/80">
              Exit Sanctuary
            </span>
          </button>

          {/* Trust Status Badge */}
          <div className="mt-6 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(150,154,123,0.5)]" />
             <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-white/30">Sanctuary Status</span>
                <span className="text-[10px] font-display font-bold text-accent/80">Shielded & Encrypted</span>
             </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

// Update imports
import { createClient } from '@/lib/supabase/client';
import { X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
