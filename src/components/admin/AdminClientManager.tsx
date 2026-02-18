'use client';

import { useState } from 'react';
import { StorageService, CloudFile } from '@/services/StorageService';
import { Profile } from '@/lib/types/admin'; 
import { Search, Plus, Filter, User, MoreVertical, Mail, Calendar, StickyNote, Video, Loader2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudStoragePicker } from '@/components/admin/CloudStoragePicker';
import { ZoomService } from '@/services/ZoomService';

interface AdminClientManagerProps {
  clients: Profile[]; 
}

export const AdminClientManager = ({ clients }: AdminClientManagerProps) => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [resources, setResources] = useState<{id: string, name: string, type: string}[]>([]);
  const [isGeneratingZoom, setIsGeneratingZoom] = useState(false);
  const [zoomLink, setZoomLink] = useState('');

  const selectedClient = clients.find(c => c.id === selectedClientId);

  const filteredClients = clients.filter(client => 
    client.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScheduleZoom = async () => {
    setIsGeneratingZoom(true);
    try {
      const meeting = await ZoomService.createMeeting(`${selectedClient?.full_name || 'Client'} Session`, new Date().toISOString());
      setZoomLink(meeting.join_url);
    } catch (e) {
      console.error('Failed to create meeting', e);
    } finally {
      setIsGeneratingZoom(false);
    }
  };

  const handleResourceSelect = (file: CloudFile) => {
    // Add to local state for demo
    setResources([...resources, { id: file.id, name: file.name, type: file.mimeType }]);
    setIsPickerOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] min-h-[600px] border border-primary/5 rounded-[32px] overflow-hidden shadow-2xl bg-white/40 glass">
      
      {/* LEFT PANE: Client List (Master) */}
      <div className="w-[350px] md:w-[400px] border-r border-primary/5 flex flex-col bg-white/50 backdrop-blur-md">
        {/* Search Header */}
        <div className="p-6 border-b border-primary/5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold uppercase tracking-widest text-xs text-primary/50">Sanctuary Members</h2>
            <button 
              className="p-2 hover:bg-primary/5 rounded-lg text-primary/40 hover:text-primary transition-colors"
              aria-label="Filter clients"
            >
              <Filter size={16} />
            </button>
          </div>
          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={16} />
             <input 
               type="text" 
               placeholder="Search souls..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-white border border-primary/5 rounded-2xl py-3 pl-11 pr-4 font-display text-sm text-primary outline-none focus:border-accent/50 transition-all"
             />
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
           {filteredClients.map(client => (
             <button
               key={client.id}
               onClick={() => setSelectedClientId(client.id)}
               className={`w-full text-left p-4 rounded-2xl border transition-all group relative overflow-hidden ${
                 selectedClientId === client.id 
                   ? 'bg-primary text-background border-primary shadow-lg scale-[1.02]' 
                   : 'bg-white border-primary/5 hover:border-accent/30 hover:shadow-md'
               }`}
             >
               <div className="flex items-center gap-4 relative z-10">
                 {client.avatar_url ? (
                   <img src={client.avatar_url} alt={client.full_name || ''} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                 ) : (
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedClientId === client.id ? 'bg-white/20 text-white' : 'bg-primary/5 text-primary/30'}`}>
                     <User size={18} />
                   </div>
                 )}
                 <div>
                   <p className={`font-display font-bold text-sm ${selectedClientId === client.id ? 'text-white' : 'text-primary'}`}>
                     {client.full_name || 'Unnamed Soul'}
                   </p>
                   <p className={`text-[10px] font-medium truncate ${selectedClientId === client.id ? 'text-white/60' : 'text-primary/40'}`}>
                     {client.email}
                   </p>
                 </div>
               </div>
             </button>
           ))}
        </div>
      </div>

      {/* RIGHT PANE: Detail View */}
      <div className="flex-1 bg-[#fdfbf7]/50 relative flex flex-col">
        {selectedClient ? (
          <>
            {/* Detail Header */}
            <div className="h-24 border-b border-primary/5 flex items-center justify-between px-8 bg-white/40">
               <div>
                  <h1 className="text-2xl font-display font-medium text-primary flex items-center gap-3">
                    {selectedClient.full_name}
                    <span className="px-2 py-0.5 bg-accent/10 text-accent text-[9px] uppercase tracking-widest font-bold rounded-md">Active Member</span>
                  </h1>
                  <p className="text-primary/40 text-xs mt-1 font-serif italic">Member since {new Date().getFullYear()}</p>
               </div>
                <div className="flex items-center gap-2">
                 <button 
                    onClick={handleScheduleZoom}
                    disabled={isGeneratingZoom}
                    className="p-3 bg-white border border-primary/5 rounded-xl hover:border-accent hover:text-accent transition-all shadow-sm text-primary/60 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" 
                    title="Schedule Zoom Meeting"
                 >
                    {isGeneratingZoom ? <Loader2 size={18} className="animate-spin" /> : <Video size={18} />}
                 </button>
                 <button className="p-3 bg-white border border-primary/5 rounded-xl hover:border-accent hover:text-accent transition-all shadow-sm text-primary/60" title="Send Email">
                    <Mail size={18} />
                 </button>
                 <button className="p-3 bg-primary text-background rounded-xl hover:bg-accent transition-colors shadow-lg font-display text-xs font-bold uppercase tracking-widest px-6" title="Manage Access">
                    Manage Access
                 </button>
               </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
               <div className="grid grid-cols-2 gap-8 mb-8">
                  {/* Notes Snippet */}
                  <div className="p-6 bg-white rounded-[24px] border border-primary/5 shadow-sm space-y-4">
                     <div className="flex items-center gap-3 text-primary/40">
                        <StickyNote size={18} />
                        <span className="font-display text-[10px] uppercase tracking-widest font-bold">Latest Private Note</span>
                     </div>
                     <p className="font-serif italic text-primary/80 leading-relaxed text-sm">
                       "Detailed progress on the acceptance phase. Client requested additional resources on mindfulness..."
                     </p>
                     <button className="text-accent text-xs font-bold hover:underline" aria-label="View all notes">View all notes</button>
                  </div>

                  {/* Upcoming Session */}
                   <div className="p-6 bg-white rounded-[24px] border border-primary/5 shadow-sm space-y-4">
                     <div className="flex items-center gap-3 text-primary/40">
                        <Calendar size={18} />
                        <span className="font-display text-[10px] uppercase tracking-widest font-bold">Next Session</span>
                     </div>
                     <div>
                       {zoomLink ? (
                         <div className="space-y-1">
                            <p className="font-display font-bold text-lg text-primary">Zoom Meeting Ready</p>
                            <a href={zoomLink} target="_blank" rel="noopener noreferrer" className="text-xs text-accent underline truncate block max-w-[200px]">
                               {zoomLink}
                            </a>
                         </div>
                       ) : (
                         <>
                            <p className="font-display font-bold text-lg text-primary">Feb 24, 2026</p>
                            <p className="text-sm text-primary/50">2:00 PM - 3:00 PM</p>
                         </>
                       )}
                     </div>
                     <div className="flex gap-2">
                        <span className="px-2 py-1 bg-accent/10 text-accent rounded text-[10px] font-bold">Confirmed</span>
                     </div>
                  </div>
               </div>

               {/* Resources Section */}
               <section>
                 <h3 className="font-display font-bold uppercase tracking-widest text-xs text-primary/50 mb-4 px-2">Assigned Sanctuary Resources</h3>
                 <div className="space-y-3">
                   {resources.map((res, i) => (
                     <div key={res.id || i} className="flex items-center justify-between p-4 bg-white border border-primary/5 rounded-2xl hover:border-accent/20 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary/40">
                             <FileText size={20} />
                           </div>
                           <div className="min-w-0">
                             <p className="font-display font-bold text-sm text-primary truncate max-w-[200px]">{res.name}</p>
                             <p className="text-[10px] text-primary/40">{res.type}</p>
                           </div>
                        </div>
                        <span className="text-[10px] text-primary/30 font-bold uppercase tracking-widest">Just Now</span>
                     </div>
                   ))}
                   
                   {/* Static Mock Items (if empty) */}
                   {resources.length === 0 && [1].map(i => (
                     <div key={i} className="flex items-center justify-between p-4 bg-white border border-primary/5 rounded-2xl hover:border-accent/20 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary/40">
                             <Video size={20} />
                           </div>
                           <div>
                             <p className="font-display font-bold text-sm text-primary">The Art of Stillness</p>
                             <p className="text-[10px] text-primary/40">Video • 45m</p>
                           </div>
                        </div>
                        <span className="text-[10px] text-primary/30 font-bold uppercase tracking-widest">Assigned Jan 12</span>
                     </div>
                   ))}

                   <button 
                     onClick={() => setIsPickerOpen(true)}
                     className="w-full py-4 border-2 border-dashed border-primary/5 rounded-2xl text-primary/30 hover:border-accent/30 hover:text-accent transition-all font-display text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                   >
                     <Plus size={16} /> Assign Resource
                   </button>
                 </div>
               </section>

               {/* Add ClientAssignmentSheet here controlled by state later */}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-40">
             <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6">
               <User size={40} />
             </div>
             <h3 className="font-display font-medium text-2xl text-primary">Select a Soul</h3>
             <p className="font-serif italic text-primary max-w-xs mt-2">
               Choose a member from the list to view their journey, notes, and assigned resources.
             </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isPickerOpen && (
          <CloudStoragePicker 
            onCancel={() => setIsPickerOpen(false)}
            onSelect={handleResourceSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

