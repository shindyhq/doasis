'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, User, X, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Profile } from '@/lib/types/admin';

interface ClientSearchProps {
  onSelect: (client: Profile) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ClientSearch = ({ onSelect, isOpen, onClose }: ClientSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      searchClients('');
    }
  }, [isOpen]);

  const searchClients = async (q: string) => {
    setIsLoading(true);
    try {
      const resp = await fetch(`/api/admin/clients/search?q=${encodeURIComponent(q)}`);
      const data = await resp.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    searchClients(val);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 sm:px-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
      />

      {/* Palette */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: -20 }}
        className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-primary/5"
      >
        <div className="p-6 border-b border-primary/5 flex items-center gap-4">
          <Search className="text-primary/30" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search clients by name or email..."
            className="flex-1 bg-transparent border-none outline-none font-display text-lg text-primary placeholder:text-primary/20"
            value={query}
            onChange={handleQueryChange}
          />
          <button 
            onClick={onClose}
            title="Close search"
            className="p-2 hover:bg-primary/5 rounded-full text-primary/30 hover:text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
          {isLoading && results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-primary/20 gap-3">
              <Loader2 className="animate-spin" size={32} />
              <p className="font-display text-xs uppercase tracking-widest font-bold">Seeking clients...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="px-4 py-2 font-display text-[10px] uppercase tracking-widest font-bold text-primary/30">
                {results.length} Clients Found
              </p>
              {results.map((client) => (
                <button
                  key={client.id}
                  onClick={() => onSelect(client)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-primary/5 transition-all group group-hover:shadow-lg text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-background transition-all">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-primary group-hover:text-primary transition-colors">
                        {client.full_name || 'Anonymous User'}
                      </p>
                      <p className="font-display text-xs text-primary/40 font-bold uppercase tracking-tighter">
                        {client.email}
                      </p>
                    </div>
                  </div>
                  <ArrowRight 
                    size={18} 
                    className="text-primary/10 group-hover:text-primary transition-all group-hover:translate-x-1" 
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-primary/20 gap-3">
              <Search size={32} />
              <p className="font-display text-xs uppercase tracking-widest font-bold">No clients found in the sanctuary</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-primary/5 border-t border-primary/5 flex items-center justify-between">
          <p className="text-[10px] font-display font-bold uppercase tracking-widest text-primary/30">
            Esc to close • Enter to select
          </p>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-accent" />
             <span className="text-[10px] font-display font-bold uppercase tracking-widest text-accent">Admin Portal</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
