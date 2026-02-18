'use client';

import { useEffect, useState } from 'react';
import { Command, Search, User, FileText, Calendar, Plus, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface AdminCommandBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminCommandBar = ({ isOpen, onClose }: AdminCommandBarProps) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const actions = [
    { id: 'new-client', icon: User, label: 'Add New Client', shortcut: 'C' },
    { id: 'new-session', icon: Calendar, label: 'Schedule Session', shortcut: 'S' },
    { id: 'new-note', icon: FileText, label: 'Create Private Note', shortcut: 'N' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-[#fdfbf7] rounded-[24px] shadow-2xl overflow-hidden border border-primary/10 flex flex-col"
          >
            {/* Search Input */}
            <div className="flex items-center gap-4 p-6 border-b border-primary/5">
              <Search className="text-primary/40" size={24} />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent font-display text-xl text-primary placeholder:text-primary/20 outline-none"
              />
              <div className="flex items-center gap-2">
                 <button 
                  onClick={onClose}
                  className="p-1 hover:bg-primary/5 rounded-lg text-primary/30 hover:text-primary transition-colors"
                 >
                   <span className="text-[10px] font-bold border border-primary/20 rounded px-1.5 py-0.5">ESC</span>
                 </button>
              </div>
            </div>

            {/* Results / Actions */}
            <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                {/* Immediate Actions */}
                <div>
                   <p className="px-4 mb-2 font-display text-[10px] uppercase tracking-widest font-bold text-primary/30">Quick Actions</p>
                   <div className="space-y-1">
                     {actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase())).map(action => (
                       <button
                         key={action.id}
                         className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 group transition-colors text-left"
                       >
                         <div className="flex items-center gap-4">
                           <div className="p-2 bg-white rounded-lg text-primary/40 group-hover:text-accent group-hover:bg-white shadow-sm transition-colors border border-primary/5">
                             <action.icon size={18} />
                           </div>
                           <span className="font-display text-sm font-medium text-primary group-hover:text-accent transition-colors">
                             {action.label}
                           </span>
                         </div>
                         {/* <span className="text-[10px] font-bold text-primary/20 border border-primary/10 rounded px-1.5 py-0.5 group-hover:border-accent/20 group-hover:text-accent/50">
                           {action.shortcut}
                         </span> */}
                         <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                       </button>
                     ))}
                   </div>
                </div>
                
                {/* Fallback for empty search */}
                {query && actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                   <div className="py-12 text-center text-primary/30">
                     <p className="font-serif italic text-sm">No sanctuary commands found.</p>
                   </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-3 bg-primary/5 border-t border-primary/5 flex justify-end gap-4 px-6">
               <p className="text-[10px] font-display uppercase tracking-widest text-primary/30 flex items-center gap-2">
                 <span className="font-bold">Sanctuary OS</span> 2.0
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
