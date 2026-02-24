'use client';

import { useState } from 'react';
import { UploadCloud, FileText, Music, Video, Link as LinkIcon, Plus } from 'lucide-react';
import { Resource } from '@/types/custom';
import { ResourceUploadModal } from '@/components/dashboard/admin/library/ResourceUploadModal';
import { useRouter } from 'next/navigation';

interface LibraryClientProps {
  initialResources: Resource[];
}

export function LibraryClient({ initialResources }: LibraryClientProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Music;
      case 'pdf': return FileText;
      default: return LinkIcon;
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
            Content Management
          </p>
          <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
            Resource Library
          </h1>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-display uppercase tracking-widest text-xs font-bold shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-3 active:scale-95"
        >
          <UploadCloud size={18} />
          Upload Resource
        </button>
      </header>

      {/* Upload Dropzone (Trigger) */}
      <div 
        onClick={() => setIsUploadModalOpen(true)}
        className="bg-white/40 border-2 border-dashed border-primary/10 rounded-[40px] p-12 flex flex-col items-center justify-center text-center gap-6 group hover:border-accent/40 hover:bg-white/60 transition-all cursor-pointer"
      >
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary/40 group-hover:text-accent group-hover:scale-110 transition-all">
          <UploadCloud size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-bold text-xl text-primary">Upload new material</h3>
          <p className="font-serif italic text-primary/60">
            Share PDFs, Meditations, or Masterclasses with your community
          </p>
        </div>
      </div>

      {/* Resources List */}
      <div className="space-y-6">
        <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70 px-4">
          All Resources ({initialResources.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {initialResources.map((item, i) => {
             const Icon = getIcon(item.type);
             return (
              <div key={item.id || i} className="bg-white/50 p-6 rounded-[24px] border border-primary/5 flex items-center gap-4 hover:bg-white transition-all group shadow-sm hover:shadow-md cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary/40 shadow-sm group-hover:text-primary transition-colors">
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-primary truncate max-w-[150px]">{item.title}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-widest text-primary/40">
                      {item.category}
                    </div>
                    <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.is_published ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {item.is_published ? 'Published' : 'Draft'}
                    </div>
                  </div>
                </div>
              </div>
             );
           })}
           {initialResources.length === 0 && (
             <div className="col-span-full py-20 text-center bg-white/30 rounded-[40px] border border-primary/5">
               <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary/20 mx-auto mb-4">
                 <FileText size={32} />
               </div>
               <p className="text-primary/40 font-serif italic text-lg">
                 Your library is empty.
               </p>
               <button 
                 onClick={() => setIsUploadModalOpen(true)}
                 className="mt-4 text-secondary font-bold text-sm hover:underline"
               >
                 Upload your first resource
               </button>
             </div>
           )}
        </div>
      </div>

      <ResourceUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
