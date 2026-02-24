'use client';

import { X, Video, BookOpen, Link as LinkIcon, Save, Plus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { UserProfile, Resource } from '@/types/custom';
import { updateClientProfile, assignResourceToClient } from '@/actions/clients';
// We receive resources as props.

interface ClientActionModalProps {
  client: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  resources: Resource[];
}

export function ClientActionModal({ client, isOpen, onClose, resources }: ClientActionModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'resources'>('details');
  const [zoomLink, setZoomLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [assignedResources, setAssignedResources] = useState<string[]>([]); // URLs or IDs? IDs.

  // Initialize state when client changes
  useEffect(() => {
    if (client) {
        // In a real app, we might need to fetch the *current* meeting_url if it's not in the UserProfile type yet
        // For now, assuming it's in the client object or we'll add it to the type augmentation
        setZoomLink((client as any).meeting_url || ''); 
        
        // Fetch assigned resources? 
        // For now, we'll start empty or we'd need another fetch.
        // Let's assume we just allow adding for now.
    }
  }, [client]);

  if (!isOpen || !client) return null;

  const handleSaveDetails = async () => {
      setLoading(true);
      try {
          await updateClientProfile(client.id, { meeting_url: zoomLink });
          // Show success toast?
          onClose(); // Close on save for now
      } catch (e) {
          console.error(e);
          alert('Failed to save details');
      } finally {
          setLoading(false);
      }
  };

  const handleAssignResource = async (resourceId: string) => {
      setLoading(true);
      try {
          await assignResourceToClient(client.id, resourceId);
          alert('Resource assigned!');
          // Update local state to show it's assigned?
          setAssignedResources([...assignedResources, resourceId]);
      } catch (e) {
          console.error(e);
          alert('Failed to assign resource');
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Manage Client</h2>
            <p className="text-sm text-slate-500">{client.full_name}</p>
          </div>
          <button onClick={onClose} title="Close modal" className="text-slate-400 hover:text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-6 shrink-0">
            <button 
                onClick={() => setActiveTab('details')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
                Details & Settings
            </button>
            <button 
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'resources' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
                Resources
            </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
            {activeTab === 'details' && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Zoom / Meeting Link</label>
                        <p className="text-xs text-slate-500">This link will be displayed on the client's dashboard for them to join sessions.</p>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="url" 
                                    value={zoomLink}
                                    onChange={(e) => setZoomLink(e.target.value)}
                                    placeholder="https://zoom.us/j/..."
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-sans"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'resources' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                         <h3 className="text-sm font-medium text-slate-900">Available Resources</h3>
                         {/* Could add a filter here */}
                    </div>
                    
                    <div className="space-y-2">
                        {resources.length > 0 ? resources.map(resource => (
                            <div key={resource.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{resource.title}</p>
                                        <p className="text-xs text-slate-500 capitalize">{resource.type}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleAssignResource(resource.id)}
                                    disabled={loading}
                                    className="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors text-xs font-medium flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" />
                                    Assign
                                </button>
                            </div>
                        )) : (
                            <p className="text-sm text-slate-500 text-center py-8">No resources found. Add resources to the library first.</p>
                        )}
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 shrink-0 flex justify-end gap-3 bg-slate-50/50">
            <button 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
                Cancel
            </button>
            {activeTab === 'details' && (
                <button 
                    onClick={handleSaveDetails}
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            )}
        </div>
      </div>
    </div>
  );
}
