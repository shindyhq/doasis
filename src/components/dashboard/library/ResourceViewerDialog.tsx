'use client';

import { Resource } from '@/types/custom';
import { X, ExternalLink, Play, FileText, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ResourceViewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource | null;
  onComplete: () => void;
}

export function ResourceViewerDialog({ isOpen, onClose, resource, onComplete }: ResourceViewerDialogProps) {
  if (!isOpen || !resource) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const renderContent = () => {
    switch (resource.type) {
      case 'video':
        return (
          <div className="relative pt-[56.25%] bg-black rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src={resource.url}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      case 'pdf':
        return (
          <div className="h-[60vh] bg-white rounded-2xl border border-primary/10 p-8 flex flex-col items-center justify-center text-center space-y-4">
             <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4">
                <FileText size={40} />
             </div>
             <h3 className="font-display text-xl font-bold text-primary">PDF Document</h3>
             <p className="text-primary/60 max-w-sm">
               This resource is a downloadable document. Click below to open it in a new tab.
             </p>
             <a 
               href={resource.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-secondary text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-secondary/90 transition-colors"
             >
               Open PDF <ExternalLink size={14} />
             </a>
          </div>
        );
      case 'audio':
        return (
          <div className="bg-[#F5F2EB] p-12 rounded-2xl flex flex-col items-center justify-center space-y-8">
             <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center text-accent animate-pulse">
                <Headphones size={64} />
             </div>
             <div className="text-center">
                <h3 className="font-display text-2xl font-bold text-primary mb-2">{resource.title}</h3>
                <p className="font-serif italic text-primary/60">Audio Session</p>
             </div>
             <audio controls className="w-full max-w-md">
                <source src={resource.url} type="audio/mpeg" />
                Your browser does not support the audio element.
             </audio>
          </div>
        );
      case 'link':
        return (
          <div className="h-[40vh] bg-white rounded-2xl border border-primary/10 p-8 flex flex-col items-center justify-center text-center space-y-4">
             <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-4">
                <ExternalLink size={40} />
             </div>
             <h3 className="font-display text-xl font-bold text-primary">External Resource</h3>
             <p className="text-primary/60 max-w-sm">
               This link will take you to an external website.
             </p>
             <a 
               href={resource.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-primary text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primary/90 transition-colors"
             >
               Visit Website <ExternalLink size={14} />
             </a>
          </div>
        ); 
      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-[#FDFCF8] w-full max-w-4xl rounded-[32px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-white/50 p-6 flex justify-between items-center border-b border-primary/5">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent mb-1 block">
              {resource.category}
            </span>
            <h2 className="text-xl font-display font-bold text-primary">{resource.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-primary/5 flex items-center justify-center text-primary/40 hover:bg-red-50 hover:text-red-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          {renderContent()}
          
          <div className="mt-8 bg-white/50 p-6 rounded-2xl border border-primary/5">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-primary mb-2">Description</h4>
            <p className="text-primary/70 font-serif leading-relaxed">
              {resource.description || "No description available."}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-primary/5 flex justify-end gap-4">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={() => { onComplete(); onClose(); }}>
            Mark as Completed
          </Button>
        </div>
      </div>
    </div>
  );
}
