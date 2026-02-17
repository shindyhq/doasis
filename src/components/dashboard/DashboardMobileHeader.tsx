'use client';

import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { PlaceholderLogo } from '@/components/ui/PlaceholderLogo';

interface DashboardMobileHeaderProps {
  isOpen: boolean;
  toggle: () => void;
}

export const DashboardMobileHeader = ({ isOpen, toggle }: DashboardMobileHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-primary/5 flex items-center justify-between px-6 py-4 lg:hidden">
      <Link href="/" className="relative group">
        <PlaceholderLogo variant="light" />
      </Link>
      
      <div className="flex items-center gap-3">
        <Link 
          href="/dashboard/profile"
          className="p-2 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all duration-300"
          aria-label="Profile"
        >
          <User size={20} />
        </Link>

        <button 
          onClick={toggle}
          className="p-2 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all duration-300"
          aria-label={isOpen ? "Close Dashboard Menu" : "Open Dashboard Menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};
