
'use client';

import { useState } from 'react';
import { Profile } from '@/lib/types/admin';
import { useClientData } from '@/hooks/admin/useClientData';
import { Widget } from '@/components/admin/widgets/Widget';
import { 
  Users, Search, Filter, Mail, Video, MoreVertical, 
  MapPin, Phone, Calendar, Clock, ArrowRight, Shield 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminClientManagerProps {
  clients: Profile[];
}

export const AdminClientManager = ({ clients }: AdminClientManagerProps) => {
  const { 
    clients: filteredClients, 
    searchQuery, 
    setSearchQuery,
    filteredCount,
    totalCount
  } = useClientData({ clients });

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const selectedClient = clients.find(c => c.id === selectedClientId);

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[900px]">
      {/* LEFT PANE: Directory List */}
      <Widget className="w-full lg:w-[450px] flex flex-col h-full bg-white/40 border-r-0">
        <Widget.Header 
          title="Sanctuary Souls" 
          subtitle={`${filteredCount} Active Members`}
          icon={<Users size={24} />}
          action={
            <button aria-label="Filter Clients" className="p-3 bg-white hover:bg-white/80 rounded-2xl shadow-sm text-primary/40 hover:text-accent transition-all">
              <Filter size={20} />
            </button>
          }
        />
        
        {/* Search Bar */}
        <div className="px-8 pb-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/50 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 font-display text-sm text-primary outline-none focus:border-accent/30 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Client List */}
        <Widget.Content className="space-y-3 p-6 pt-0">
          {filteredClients.map((client) => (
            <motion.button
              key={client.id}
              layoutId={client.id}
              onClick={() => setSelectedClientId(client.id)}
              className={`w-full text-left p-4 rounded-[28px] border transition-all group relative overflow-hidden ${
                selectedClientId === client.id 
                  ? 'bg-primary text-background border-primary shadow-xl scale-[1.02] z-10' 
                  : 'bg-white/40 border-primary/5 hover:border-accent/30 hover:bg-white/80'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-display font-bold uppercase transition-colors ${
                  selectedClientId === client.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-primary/5 text-primary/40 group-hover:text-accent'
                }`}>
                  {client.full_name?.charAt(0) || client.email.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-display font-medium text-sm truncate ${
                    selectedClientId === client.id ? 'text-white' : 'text-primary'
                  }`}>
                    {client.full_name || 'Unnamed Soul'}
                  </h4>
                  <p className={`text-xs truncate font-medium font-display ${
                    selectedClientId === client.id ? 'text-white/60' : 'text-primary/40'
                  }`}>
                    {client.email}
                  </p>
                </div>
                {selectedClientId === client.id && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="text-accent"
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </Widget.Content>
      </Widget>

      {/* RIGHT PANE: Client Detail */}
      <Widget className="flex-1 h-full bg-white/60 backdrop-blur-md relative overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedClient ? (
            <motion.div 
              key={selectedClient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col h-full"
            >
              {/* Cover Image / Header */}
              <div className="h-48 bg-gradient-to-br from-primary/5 to-accent/5 relative">
                <div className="absolute top-8 right-8 flex gap-3">
                  <button title="Schedule Zoom" className="p-3 bg-white/80 backdrop-blur rounded-2xl hover:text-accent transition-colors shadow-sm">
                    <Video size={20} />
                  </button>
                  <button title="Send Mail" className="p-3 bg-white/80 backdrop-blur rounded-2xl hover:text-accent transition-colors shadow-sm">
                    <Mail size={20} />
                  </button>
                  <button title="More Options" className="p-3 bg-white/80 backdrop-blur rounded-2xl hover:text-primary transition-colors shadow-sm">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Profile Content */}
              <div className="flex-1 px-12 -mt-12 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col items-start mb-8">
                  <div className="w-24 h-24 rounded-[32px] bg-white shadow-2xl p-2 mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
                     <div className="w-full h-full bg-primary/5 rounded-[24px] flex items-center justify-center text-primary/20">
                       {selectedClient.avatar_url ? (
                         <img src={selectedClient.avatar_url} className="w-full h-full object-cover rounded-[24px]" alt="" />
                       ) : (
                         <Users size={32} />
                       )}
                     </div>
                  </div>
                  
                  <h1 className="text-4xl font-display font-medium text-primary mb-2">
                    {selectedClient.full_name || 'Unnamed Soul'}
                  </h1>
                  
                  <div className="flex items-center gap-4 text-primary/40 text-sm font-medium font-display">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/5 text-primary">
                       <Shield size={14} />
                       {selectedClient.role}
                    </span>
                    <span className="flex items-center gap-2">
                       <Clock size={16} />
                       Joined {new Date(selectedClient.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6 mb-10">
                   <div className="p-6 rounded-[32px] bg-white border border-primary/5 shadow-sm hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                        <Calendar size={20} />
                      </div>
                      <p className="font-display text-xs uppercase tracking-widest font-bold text-primary/30 mb-1">Total Impact</p>
                      <p className="text-3xl font-display font-bold text-primary">12</p>
                      <p className="text-xs text-primary/40 font-display mt-2">Sessions completed</p>
                   </div>
                   
                   <div className="p-6 rounded-[32px] bg-white border border-primary/5 shadow-sm hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                        <Clock size={20} />
                      </div>
                      <p className="font-display text-xs uppercase tracking-widest font-bold text-primary/30 mb-1">Time Invested</p>
                      <p className="text-3xl font-display font-bold text-primary">24h</p>
                      <p className="text-xs text-primary/40 font-display mt-2">Personal growth</p>
                   </div>
                </div>

                {/* Recent Activity */}
                <div className="mb-10">
                  <h3 className="text-xl font-display font-medium text-primary mb-6 flex items-center gap-3">
                    Recent Journey
                    <span className="h-px flex-1 bg-primary/5"></span>
                  </h3>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/50 transition-colors cursor-pointer group">
                        <div className="w-16 text-center">
                          <p className="font-display text-xs font-bold text-primary/30 uppercase tracking-widest">Oct</p>
                          <p className="font-display text-xl font-bold text-primary">{10 + i}</p>
                        </div>
                        <div className="w-px h-10 bg-primary/10"></div>
                        <div className="flex-1">
                           <h4 className="font-display font-medium text-primary group-hover:text-accent transition-colors">1:1 Coaching Session</h4>
                           <p className="text-xs text-primary/40 font-display">Focused on clarity and purpose mapping.</p>
                        </div>
                        <div className="text-primary/20 hover:text-primary transition-colors">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 h-full flex flex-col items-center justify-center text-center p-12 opacity-40">
              <div className="w-32 h-32 bg-primary/5 rounded-[40px] flex items-center justify-center text-primary/20 mb-8 animate-pulse">
                <Users size={64} />
              </div>
              <h2 className="text-3xl font-display font-medium text-primary mb-2">Select a Soul</h2>
              <p className="font-serif italic text-primary/60 max-w-md">
                Choose a member from the directory to view their journey, manage permissions, and schedule sessions.
              </p>
            </div>
          )}
        </AnimatePresence>
      </Widget>
    </div>
  );
};
