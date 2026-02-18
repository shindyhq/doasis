'use client';

import { useState } from 'react';
import { StorageService, CloudFile } from '@/services/StorageService';
import { Folder, File, HardDrive, Cloud, Loader2, Check, Link as LinkIcon, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CloudStoragePickerProps {
  onSelect: (file: CloudFile) => void;
  onCancel: () => void;
}

export const CloudStoragePicker = ({ onSelect, onCancel }: CloudStoragePickerProps) => {
  const [activeProvider, setActiveProvider] = useState<'google-drive' | 'dropbox' | 'proton' | null>(null);
  const [files, setFiles] = useState<CloudFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [protonLink, setProtonLink] = useState('');

  const handleProviderSelect = async (provider: 'google-drive' | 'dropbox') => {
    setActiveProvider(provider);
    setLoading(true);
    try {
      const fetchedFiles = await StorageService.listFiles(provider);
      setFiles(fetchedFiles);
    } catch (error) {
      console.error('Failed to load files', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProtonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!protonLink) return;
    const smartLink = StorageService.generateSmartLink(protonLink);
    if (smartLink) {
      onSelect(smartLink);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/20 backdrop-blur-sm" onClick={onCancel}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fdfbf7] w-full max-w-2xl rounded-3xl shadow-2xl border border-primary/10 overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-primary/5 flex justify-between items-center bg-white/50">
          <h2 className="text-xl font-display font-medium text-primary flex items-center gap-2">
            <Cloud size={20} className="text-accent"/> 
            Sanctuary Resource Picker
          </h2>
          <button onClick={onCancel} className="text-primary/40 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">
            Close
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Sidebar Providers */}
          <div className="w-48 bg-white/30 border-r border-primary/5 p-4 space-y-2">
             <p className="text-[10px] uppercase tracking-widest font-bold text-primary/30 mb-2">Sources</p>
             <button 
               onClick={() => handleProviderSelect('google-drive')}
               className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-medium ${activeProvider === 'google-drive' ? 'bg-white shadow-md text-primary' : 'text-primary/60 hover:bg-white/50'}`}
             >
               <HardDrive size={16} /> Google Drive
             </button>
             <button 
               onClick={() => handleProviderSelect('dropbox')}
               className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-medium ${activeProvider === 'dropbox' ? 'bg-white shadow-md text-primary' : 'text-primary/60 hover:bg-white/50'}`}
             >
               <Folder size={16} /> Dropbox
             </button>
             <button 
               onClick={() => { setActiveProvider('proton'); setFiles([]); }}
               className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-medium ${activeProvider === 'proton' ? 'bg-white shadow-md text-primary' : 'text-primary/60 hover:bg-white/50'}`}
             >
               <Lock size={16} /> Proton / Link
             </button>
          </div>

          {/* Main Area */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-white/20">
             {loading ? (
               <div className="h-full flex flex-col items-center justify-center text-primary/30 gap-3">
                 <Loader2 size={32} className="animate-spin" />
                 <p className="font-serif italic text-sm">Accessing secure storage...</p>
               </div>
             ) : activeProvider === 'proton' ? (
                <div className="h-full flex flex-col items-center justify-center gap-6">
                   <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary/20">
                     <Lock size={32} />
                   </div>
                   <div className="text-center max-w-xs">
                     <h3 className="font-display font-bold text-lg text-primary">Secure Link</h3>
                     <p className="text-primary/50 text-sm mt-1">Paste a secure link from Proton Drive or other encrypted storage.</p>
                   </div>
                   <form onSubmit={handleProtonSubmit} className="w-full max-w-sm flex gap-2">
                      <input 
                        type="url" 
                        placeholder="https://drive.proton.me/..."
                        value={protonLink}
                        onChange={(e) => setProtonLink(e.target.value)}
                        className="flex-1 bg-white border border-primary/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-accent/50"
                        autoFocus
                      />
                      <button type="submit" className="px-4 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent transition-colors">
                        Link
                      </button>
                   </form>
                </div>
             ) : files.length > 0 ? (
               <div className="grid grid-cols-1 gap-3">
                 {files.map(file => (
                   <button
                     key={file.id}
                     onClick={() => onSelect(file)}
                     className="flex items-center gap-4 p-4 bg-white rounded-xl border border-primary/5 hover:border-accent/30 hover:shadow-md transition-all group text-left"
                   >
                     <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary/40 group-hover:text-accent transition-colors">
                        <File size={20} />
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="font-medium text-primary truncate text-sm">{file.name}</p>
                       <p className="text-[10px] text-primary/40 uppercase tracking-widest">{file.mimeType.split('/')[1] || 'File'}</p>
                     </div>
                     <ArrowRightIcon className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                   </button>
                 ))}
               </div>
             ) : (
                <div className="h-full flex flex-col items-center justify-center text-primary/20 gap-2">
                  <Cloud size={48} />
                  <p className="font-serif italic text-sm">Select a provider to browse files.</p>
                </div>
             )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
