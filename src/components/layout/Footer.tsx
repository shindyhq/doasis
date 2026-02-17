'use client';

import { PlaceholderLogo } from '../ui/PlaceholderLogo';
import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const legalLinks = [
    { label: 'Privacy', href: '/privacy-policy' },
    { label: 'Terms', href: '/terms-of-service' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Cancellation', href: '/cancellation-policy' },
    { label: 'Rights', href: '/client-rights' },
    { label: 'Telehealth', href: '/telehealth-consent' },
    { label: 'Cookies', href: '/cookie-policy' },
    { label: 'Accessibility', href: '/accessibility-statement' },
  ];

  // Map routes to watermark titles
  const getWatermarkText = (path: string) => {
    if (path === '/') return 'Sanctuary';
    if (path.startsWith('/work-with-me')) return 'Offerings';
    if (path.startsWith('/about')) return 'Story';
    if (path.startsWith('/contact')) return 'Connect';
    if (path.startsWith('/blog')) return 'Journal';
    if (path.startsWith('/booking')) return 'Session';
    
    // Legal pages - show page title
    if (path.startsWith('/privacy-policy')) return 'Privacy';
    if (path.startsWith('/terms-of-service')) return 'Terms';
    if (path.startsWith('/disclaimer')) return 'Disclaimer';
    if (path.startsWith('/cookie-policy')) return 'Cookies';
    if (path.startsWith('/cancellation-policy')) return 'Cancellation';
    if (path.startsWith('/telehealth-consent')) return 'Telehealth';
    if (path.startsWith('/client-rights')) return 'Rights';
    if (path.startsWith('/accessibility-statement')) return 'Accessibility';
    
    return 'D\'Oasis'; // Fallback
  };

  const watermarkText = getWatermarkText(pathname);

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/login')) return null;

  return (
    <footer className="bg-primary text-background/90 pt-20 pb-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      {/* Sharp Silhouette Background Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-display font-black text-[15vw] leading-none text-background/[0.03] whitespace-nowrap uppercase tracking-tighter transition-all duration-700">
          {watermarkText}
        </span>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center gap-16">
        
        {/* Level 1: Brand Identity */}
        <div className="flex flex-col items-center gap-8 w-full">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <PlaceholderLogo variant="dark" />
          </Link>
          
          <p className="font-serif italic text-xl text-background/60 max-w-2xl leading-relaxed">
            Faith-rooted counseling and coaching for women seeking clarity in the quiet.
          </p>
          
          <div className="flex items-center gap-6">
             <a 
               href="https://instagram.com/doasis_sanctuary" 
               target="_blank" 
               rel="noopener noreferrer"
               className="p-3.5 bg-white/5 rounded-full hover:bg-white/10 text-background/60 hover:text-accent transition-all duration-300 group"
               aria-label="Instagram"
             >
               <Instagram size={22} className="group-hover:scale-110 transition-transform" />
             </a>
             <a 
               href="mailto:hello@doasis.com" 
               className="p-3.5 bg-white/5 rounded-full hover:bg-white/10 text-background/60 hover:text-accent transition-all duration-300 group"
               aria-label="Email"
             >
               <Mail size={22} className="group-hover:scale-110 transition-transform" />
             </a>
          </div>
        </div>

        {/* Level 2: Horizontal Legal Menu */}
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="w-24 h-px bg-accent/30" />
          <nav aria-label="Legal">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-10 lg:gap-x-16">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="font-display text-[11px] uppercase tracking-[0.2em] text-background/80 hover:text-accent transition-colors font-semibold px-2 py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="w-24 h-px bg-accent/30" />
        </div>

        {/* Level 3: Footer Meta */}
        <div className="flex flex-col items-center gap-4 text-[10px] uppercase tracking-[0.25em] font-bold font-display">
          <span className="text-background/60">Copyright © {currentYear} D&apos;Oasis Sanctuary. All rights reserved.</span>
          <span className="text-background/30 hover:text-background/60 transition-opacity cursor-default">Designed with purpose.</span>
        </div>

      </div>
    </footer>
  );
};
