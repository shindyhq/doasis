'use client';

// Navbar Component
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlaceholderLogo } from '../ui/PlaceholderLogo';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Work With Me', href: '/work-with-me' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isHome = pathname === '/';
  const navTextClass = isScrolled || !isHome 
    ? 'text-primary' 
    : 'text-white';
  
  const navBgClass = isScrolled 
    ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-primary/5' 
    : 'bg-transparent border-transparent';

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/login')) return null;

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-0' : 'py-4'}`}>
        <nav className={`w-full px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${navBgClass}`}>
          
          {/* Logo */}
          <Link href="/" className="z-50 relative group">
            <PlaceholderLogo variant={isScrolled || !isHome ? "light" : "dark"} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`font-display text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 hover:text-accent ${pathname === link.href ? 'text-accent' : navTextClass}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link 
              href="/login" 
              className="font-display bg-primary text-background px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-accent hover:text-white transition-all duration-500 shadow-lg shadow-primary/10 flex items-center gap-2 group"
            >
              <User size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              Clients
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden z-50 text-primary p-2 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-accent rounded-full transition-colors"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#F7F5F0] pt-32 px-6 pb-12 flex flex-col h-screen md:hidden"
          >
            <div className="flex flex-col gap-8 items-center justify-center flex-1">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    className={`text-2xl font-display font-medium ${pathname === link.href ? 'text-accent' : 'text-primary'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link 
                  href="/login" 
                  className="font-display bg-primary text-background px-10 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-accent transition-colors w-full text-center flex items-center justify-center gap-3"
                >
                  <User size={18} />
                  Clients
                </Link>
              </motion.div>
            </div>

            <div className="text-center pb-8 opacity-40">
              <p className="text-[10px] uppercase tracking-[0.3em] font-serif italic">Faith-Rooted Counseling</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
