import { useState, useRef, useEffect } from 'react';
import { X, Calendar, Video, FileText, Plus, Save, Loader2, Check, ExternalLink, StickyNote, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Profile } from '@/lib/types/admin';
import { Button } from '@/components/ui/Button';
import { addClientNote, getClientNotes } from '@/actions/admin-actions'; // Import Server Actions

interface ClientAssignmentSheetProps {
  client: Profile | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ClientAssignmentSheet = ({ client, onClose, onSuccess }: ClientAssignmentSheetProps) => {
  const [activeTab, setActiveTab] = useState<'services' | 'links' | 'documents' | 'notes'>('services');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form State
  const [serviceName, setServiceName] = useState('The Becoming — Bi-Weekly Coaching');
  const [price, setPrice] = useState('350.00');
  const [zoomLink, setZoomLink] = useState('');
  
  // Notes State
  const [noteContent, setNoteContent] = useState('');
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);

  // Document State
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch notes when tab changes to 'notes'
  useEffect(() => {
    if (activeTab === 'notes' && client) {
      setIsLoadingNotes(true);
      getClientNotes(client.id)
        .then(setNotes)
        .catch(console.error)
        .finally(() => setIsLoadingNotes(false));
    }
  }, [activeTab, client]);

  const handleSave = async () => {
    if (!client) return;
    setIsSaving(true);
    try {
      if (activeTab === 'notes') {
        if (!noteContent.trim()) return;
        const newNote = await addClientNote(client.id, noteContent);
        setNotes([newNote, ...notes]);
        setNoteContent('');
        setIsSuccess(true);
      } else {
        // ... existing save logic for other tabs ...
        const payload = activeTab === 'services' 
          ? { clientId: client.id, type: 'service', data: { serviceName, price: parseFloat(price) } }
          : { clientId: client.id, type: 'link', data: { link: zoomLink } };

        const resp = await fetch('/api/admin/clients/assign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (resp.ok) setIsSuccess(true);
      }

      if (isSuccess || (activeTab === 'notes' && !isSuccess)) { // Success state handling
         setTimeout(() => {
          setIsSuccess(false);
          if (onSuccess && activeTab !== 'notes') onSuccess(); // Don't close sheet on note save
        }, 1500);
      }

    } catch (e) {
      console.error('Save failed:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... existing upload logic ...
    const file = e.target.files?.[0];
    if (!file || !client) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('clientId', client.id);
    try {
      const resp = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (resp.ok) {
        const { data } = await resp.json();
        setUploadedDocs(prev => [data, ...prev]);
      }
    } catch (e) {
      console.error('Upload failed:', e);
    } finally {
      setIsUploading(false);
    }
  };

  if (!client) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-end overflow-hidden">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
      />

      {/* Sheet Content */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-xl bg-[#fdfbf7] h-full shadow-2xl flex flex-col border-l border-primary/5"
      >
        {/* Header */}
        <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-white/40">
          <div>
            <p className="font-display text-[10px] uppercase tracking-widest font-bold text-accent mb-1">
              Client Management
            </p>
            <h2 className="text-3xl font-display font-medium text-primary">
              Manage <span className="font-serif italic">{client.full_name}</span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            title="Close Panel"
            className="p-3 hover:bg-primary/5 rounded-2xl text-primary/30 hover:text-primary transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex px-8 py-4 gap-6 border-b border-primary/5 bg-white/20 overflow-x-auto">
          {[
            { id: 'services', label: 'Services', icon: Calendar },
            { id: 'links', label: 'Links', icon: Video },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'notes', label: 'Private Notes', icon: StickyNote },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-2 font-display text-[11px] uppercase tracking-widest font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-accent text-primary' 
                  : 'border-transparent text-primary/30 hover:text-primary/60'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'services' && (
              <motion.div 
                key="services"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="block font-display text-[11px] uppercase tracking-widest font-bold text-primary/70 px-1">
                    Select Service Type
                  </label>
                  <select 
                    title="Select Service"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full bg-white border border-primary/10 rounded-2xl p-4 font-display text-sm text-primary outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                  >
                    <option>The Becoming — Bi-Weekly Coaching</option>
                    <option>The Stillness — Monthly Reflection</option>
                    <option>Introductory Sanctuary Consultation</option>
                    <option>Grief & Identity Workshop</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="block font-display text-[11px] uppercase tracking-widest font-bold text-primary/70 px-1">
                    Custom Price (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 font-display font-bold">$</span>
                    <input 
                      type="number" 
                      placeholder="350.00" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-white border border-primary/10 rounded-2xl p-4 pl-8 font-display text-sm text-primary outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'links' && (
              <motion.div 
                key="links"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="block font-display text-[11px] uppercase tracking-widest font-bold text-primary/70 px-1">
                    Zoom Sanctuary Link
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://zoom.us/j/..." 
                    value={zoomLink}
                    onChange={(e) => setZoomLink(e.target.value)}
                    className="w-full bg-white border border-primary/10 rounded-2xl p-4 font-display text-sm text-primary outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="p-6 bg-accent/10 rounded-[24px] border border-accent/20 flex gap-4">
                  <Video className="text-accent shrink-0" size={20} />
                  <p className="text-[13px] font-serif italic text-primary/70 leading-relaxed">
                    Once assigned, this link will be automatically emailed to the client and appear in their dashboard waiting room.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'documents' && (
              <motion.div 
                key="documents"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  title="Upload New Document"
                  className="w-full border-2 border-dashed border-primary/10 rounded-[32px] p-12 flex flex-col items-center justify-center gap-4 text-center group hover:border-accent/40 hover:bg-accent/5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="p-4 bg-primary/5 rounded-2xl text-primary/30 group-hover:bg-accent group-hover:text-primary transition-colors">
                    {isUploading ? <Loader2 className="animate-spin" size={24} /> : <Plus size={24} />}
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-primary">
                      {isUploading ? 'Preparing document...' : 'Upload Session Record'}
                    </p>
                    <p className="font-serif italic text-xs text-primary/40 mt-1">Upload PDF, Session Transcripts, or Journal Notes</p>
                  </div>
                </button>

                <div className="space-y-4">
                  <p className="font-display text-[10px] uppercase tracking-widest font-bold text-primary/30 px-1">Successfully Uploaded</p>
                  {uploadedDocs.length > 0 ? (
                    <div className="space-y-3">
                      {uploadedDocs.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white border border-primary/5 rounded-2xl group hover:border-accent/20 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/5 rounded-lg text-primary/40 group-hover:bg-primary/10 transition-colors">
                              <FileText size={16} />
                            </div>
                            <div className="text-left">
                              <p className="font-display text-[13px] font-bold text-primary">{doc.file_name}</p>
                              <p className="font-serif italic text-[11px] text-primary/40">Secured in Sanctuary</p>
                            </div>
                          </div>
                          <a 
                            href={doc.file_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-primary/30 hover:text-accent transition-colors"
                            title="Download Record"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-primary/20 bg-primary/5 rounded-3xl border border-primary/5">
                      <p className="font-serif italic text-sm">The archives are awaiting your shared wisdom.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'notes' && (
              <motion.div 
                key="notes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                 <div className="p-6 bg-[#f0f0e0]/50 rounded-[24px] border border-primary/5 flex gap-4">
                  <Lock className="text-primary/40 shrink-0" size={20} />
                  <p className="text-[13px] font-serif italic text-primary/70 leading-relaxed">
                    These notes are strictly private. Only administrators can view them. They are never shared with the client.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="block font-display text-[11px] uppercase tracking-widest font-bold text-primary/70 px-1">
                    Add New Note
                  </label>
                  <textarea 
                    placeholder="Reflections on recent session progress..." 
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="w-full h-32 bg-white border border-primary/10 rounded-2xl p-4 font-body text-sm text-primary outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <div className="space-y-4">
                   <p className="font-display text-[10px] uppercase tracking-widest font-bold text-primary/30 px-1">History</p>
                   {isLoadingNotes ? (
                     <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary/20" /></div>
                   ) : notes.length > 0 ? (
                     <div className="space-y-3">
                        {notes.map((note) => (
                          <div key={note.id} className="bg-white p-4 rounded-2xl border border-primary/5 space-y-2">
                             <p className="text-sm text-primary/80 whitespace-pre-wrap">{note.note}</p>
                             <p className="text-[10px] font-display uppercase tracking-wider text-primary/30">
                               {new Date(note.created_at).toLocaleDateString()}
                             </p>
                          </div>
                        ))}
                     </div>
                   ) : (
                     <div className="text-center py-8 text-primary/30 italic font-serif text-sm">No private notes yet.</div>
                   )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-primary/5 bg-white/40 flex items-center justify-between gap-4">
          <Button variant="ghost" onClick={onClose} className="px-6">
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
            disabled={isSaving || (activeTab !== 'notes' && isSuccess)} // Notes allows multiple saves
            className="flex-1 max-w-[240px]"
          >
            {isSaving ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : isSuccess ? (
              <Check className="mr-2" size={18} />
            ) : (
              <Save className="mr-2" size={18} />
            )}
            {isSaving ? 'Saving...' : isSuccess ? 'Saved' : activeTab === 'notes' ? 'Save Private Note' : 'Update Client Access'}
          </Button>
        </div>
      </motion.aside>
    </div>
  );
};
