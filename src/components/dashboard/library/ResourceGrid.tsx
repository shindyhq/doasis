'use client';

import { useState } from 'react';
import { Resource, ClientResource } from '@/types/custom';
import { ResourceService } from '@/services/ResourceService';
import { ResourceViewerDialog } from './ResourceViewerDialog';
import { Play, FileText, Headphones, Link as LinkIcon, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResourceWithStatus extends Resource {
  clientStatus?: ClientResource | null;
}

interface ResourceGridProps {
  initialResources: ResourceWithStatus[];
}

export function ResourceGrid({ initialResources }: ResourceGridProps) {
  const [resources, setResources] = useState(initialResources);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewingResource, setViewingResource] = useState<Resource | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];

  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  const handleComplete = async (resourceId: string) => {
    try {
      const updatedStatus = await ResourceService.markAsAccessed(resourceId, true);
      
      setResources(prev => prev.map(r => {
        if (r.id === resourceId && updatedStatus) {
           return { ...r, clientStatus: updatedStatus };
        }
        return r;
      }));
    } catch (error) {
      console.error('Failed to mark complete', error);
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'video': return <Play size={16} className="ml-0.5" />;
      case 'audio': return <Headphones size={16} />;
      case 'pdf': return <FileText size={16} />;
      default: return <LinkIcon size={16} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all
              ${selectedCategory === category 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-white text-primary/40 hover:bg-white/80 hover:text-primary'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredResources.map((resource) => {
            const isCompleted = resource.clientStatus?.status === 'completed';
            
            return (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-white/60 backdrop-blur-sm border border-white/60 rounded-[32px] overflow-hidden hover:shadow-xl hover:bg-white/80 transition-all cursor-pointer"
                onClick={() => setViewingResource(resource)}
              >
                {/* Thumbnail / Visual Header */}
                <div className={`h-48 relative overflow-hidden flex items-center justify-center
                  ${resource.type === 'video' ? 'bg-black' : 
                    resource.type === 'audio' ? 'bg-[#F2EFE9]' : 
                    'bg-primary/5'}
                `}>
                  {resource.thumbnail_url ? (
                    <img src={resource.thumbnail_url} alt={resource.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110
                      ${resource.type === 'video' ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}
                    `}>
                      {getIcon(resource.type)}
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  {isCompleted && (
                    <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm">
                      <CheckCircle size={10} /> Completed
                    </div>
                  )}

                  {/* Play Overlay */}
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 text-primary px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transform translate-y-2 group-hover:translate-y-0 transition-all">
                        View Details
                      </div>
                   </div>
                </div>

                {/* Content Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] bg-accent/10 text-accent px-2 py-1 rounded-lg font-bold uppercase tracking-widest">
                      {resource.category}
                    </span>
                    {resource.duration && (
                      <span className="flex items-center gap-1 text-[10px] text-primary/40 font-bold uppercase tracking-widest">
                        <Clock size={10} /> {resource.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-medium text-primary leading-tight mb-2 group-hover:text-accent transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm font-serif italic text-primary/50 line-clamp-2">
                    {resource.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      
      {filteredResources.length === 0 && (
          <div className="col-span-full py-20 text-center text-primary/40">
            <p className="font-display font-medium">No resources found in this category.</p>
          </div>
      )}

      {/* Viewer Modal */}
      <ResourceViewerDialog 
        isOpen={!!viewingResource}
        onClose={() => setViewingResource(null)}
        resource={viewingResource}
        onComplete={() => viewingResource && handleComplete(viewingResource.id)}
      />
    </div>
  );
}
