'use client';

import { X, BookOpen, Trash2, Link as LinkIcon, FileText, Video, Mic } from 'lucide-react';
import { useState } from 'react';
import { Resource } from '@/types/custom';
import { createResource } from '@/actions/resources';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface ResourceLibraryModalProps {
  resources: Resource[];
}

export function ResourceLibraryModal({ resources: initialResources }: ResourceLibraryModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const isOpen = searchParams.get('library') === 'true';

  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
      title: '',
      description: '',
      type: 'link',
      url: '',
      category: 'General'
  });

  if (!isOpen) return null;

  const onClose = () => {
      const params = new URLSearchParams(searchParams);
      params.delete('library');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCreate = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
          const newResource = await createResource(formData);
          setResources([newResource, ...resources]);
          setActiveTab('list');
          setFormData({ title: '', description: '', type: 'link', url: '', category: 'General' }); // Reset
          alert('Resource added to library!');
      } catch (err) {
          console.error(err);
          alert('Failed to create resource.');
      } finally {
          setIsLoading(false);
      }
  };

  const getIcon = (type: string) => {
      switch(type) {
          case 'video': return Video;
          case 'audio': return Mic;
          case 'pdf': return FileText;
          default: return LinkIcon;
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Resource Library</h2>
            <p className="text-sm text-slate-500">Manage global resources available for assignment.</p>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="text-slate-400 hover:text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
         <div className="flex border-b border-slate-100 px-6 shrink-0 gap-6">
            <button 
                onClick={() => setActiveTab('list')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'list' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
                Library Content ({resources.length})
            </button>
            <button 
                onClick={() => setActiveTab('add')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'add' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
                Add New Resource
            </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/30">
            {activeTab === 'list' && (
                <div className="space-y-3">
                    {resources.map(resource => {
                        const Icon = getIcon(resource.type);
                        return (
                            <div key={resource.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between group hover:border-secondary transition-colors shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900">{resource.title}</h3>
                                        <p className="text-xs text-slate-500 line-clamp-1">{resource.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                     <span className="text-xs font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-600 capitalize">{resource.category}</span>
                                     <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete (Not Implemented)">
                                        <Trash2 className="w-4 h-4" />
                                     </button>
                                </div>
                            </div>
                        );
                    })}
                    {resources.length === 0 && (
                        <div className="text-center py-12">
                            <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">No resources in the library.</p>
                            <button onClick={() => setActiveTab('add')} className="text-secondary text-sm font-medium mt-2 hover:underline">Add your first resource</button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'add' && (
                <div className="max-w-xl mx-auto">
                    <form onSubmit={handleCreate} className="space-y-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-700">Title</label>
                            <input 
                                required
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                placeholder="e.g. Anxiety Relief Techniques"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1">
                                <label className="block text-sm font-medium text-slate-700">Type</label>
                                <select 
                                    aria-label="Resource Type"
                                    value={formData.type}
                                    onChange={e => setFormData({...formData, type: e.target.value})}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all bg-white"
                                >
                                    <option value="link">External Link</option>
                                    <option value="video">Video</option>
                                    <option value="audio">Audio</option>
                                    <option value="pdf">PDF Document</option>
                                </select>
                            </div>
                             <div className="space-y-1">
                                <label className="block text-sm font-medium text-slate-700">Category</label>
                                <input 
                                    value={formData.category}
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                    placeholder="e.g. Wellness"
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-700">URL / Link</label>
                            <input 
                                required
                                type="url"
                                value={formData.url}
                                onChange={e => setFormData({...formData, url: e.target.value})}
                                placeholder="https://..."
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-700">Description</label>
                            <textarea 
                                required
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                                rows={3}
                                placeholder="Brief description of the resource..."
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-none"
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                             <button 
                                type="button"
                                onClick={() => setActiveTab('list')}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {isLoading ? 'Creating...' : 'Create Resource'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
