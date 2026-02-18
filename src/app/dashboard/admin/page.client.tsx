'use client';

import { useState } from 'react';
import { Command } from 'lucide-react';
import { AdminCommandBar } from '@/components/admin/AdminCommandBar';

export const AdminPageClient = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsCommandOpen(true)}
        className="flex items-center gap-3 px-6 py-3 bg-white border border-primary/10 rounded-2xl shadow-sm hover:border-accent/50 hover:shadow-md transition-all group"
      >
        <Command size={18} className="text-primary/40 group-hover:text-accent" />
        <span className="text-sm font-medium text-primary/60 group-hover:text-primary">
          Type <kbd className="font-mono text-xs bg-primary/5 px-1.5 py-0.5 rounded border border-primary/10 mx-1">CMD+K</kbd> to search
        </span>
      </button>

      <AdminCommandBar isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
