'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export const LegalPageLayout = ({ title, lastUpdated, children }: LegalPageLayoutProps) => {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      {/* Grain texture overlay */}
      <div className="bg-grain fixed inset-0 opacity-[0.03] z-[100] pointer-events-none" />
      
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 mb-12 relative z-10">
        <nav className="flex items-center gap-2 text-sm text-primary/40 font-display">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary/60">Legal</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">{title}</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-6 mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-display font-medium text-primary mb-6 tracking-tight leading-[1.1]">
          {title}
        </h1>
        <p className="text-xs font-display uppercase tracking-[0.3em] text-primary/40 font-semibold">
          Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="space-y-8">
          {children}
        </div>
      </div>

      {/* Return to Home */}
      <div className="max-w-4xl mx-auto px-6 mt-24 pt-12 border-t border-primary/10 relative z-10">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.3em] text-accent hover:text-primary transition-colors font-semibold"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};
