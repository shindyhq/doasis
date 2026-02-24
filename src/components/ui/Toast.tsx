'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Info, CheckCircle2, X } from 'lucide-react';

type ToastType = 'info' | 'success' | 'coming-soon';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto min-w-[320px] bg-slate-900 text-white rounded-2xl shadow-2xl p-4 flex items-center gap-4 border border-white/10 backdrop-blur-xl"
            >
              <div className={`p-2 rounded-lg ${
                toast.type === 'coming-soon' ? 'bg-secondary/20 text-secondary' :
                toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 
                'bg-white/10 text-white'
              }`}>
                {toast.type === 'coming-soon' ? <Sparkles size={18} /> : 
                 toast.type === 'success' ? <CheckCircle2 size={18} /> : 
                 <Info size={18} />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{toast.message}</p>
                {toast.type === 'coming-soon' && (
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Feature coming soon</p>
                )}
              </div>
              <button 
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors text-slate-500 hover:text-white"
                title="Dismiss"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
