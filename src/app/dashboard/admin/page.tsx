'use client';

import { useState, useEffect } from 'react';
import { Search, Users, ExternalLink, ShieldCheck, Loader2, X } from 'lucide-react';
import { ClientSearch } from '@/components/admin/ClientSearch';
import { ClientAssignmentSheet } from '@/components/admin/ClientAssignmentSheet';
import { AdminCalendar } from '@/components/admin/AdminCalendar';
import { AdminTodoList } from '@/components/admin/AdminTodoList';
import { Button } from '@/components/ui/Button';
import { Profile, Session, TodoItem } from '@/lib/types/admin';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboardPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Profile | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Dashboard Data
  const [sessions, setSessions] = useState<Session[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalendarFull, setIsCalendarFull] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [sessionResp, todoResp] = await Promise.all([
          fetch('/api/admin/sessions'),
          fetch('/api/admin/todos')
        ]);
        const [sessionsData, todosData] = await Promise.all([
          sessionResp.json(),
          todoResp.json()
        ]);
        setSessions(sessionsData);
        setTodos(todosData);
      } catch (e) {
        console.error('Fetch error:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectClient = (client: Profile) => {
    setSelectedClient(client);
    setIsSearchOpen(false);
    setIsSheetOpen(true);
  };

  const handleTodoToggle = async (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    await fetch('/api/admin/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: true }) // Logic handled in state, just notify API
    });
  };

  const handleTodoDelete = async (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    await fetch(`/api/admin/todos?id=${id}`, { method: 'DELETE' });
  };

  const handleTodoAdd = async (title: string, priority: 'low' | 'medium' | 'high') => {
    const resp = await fetch('/api/admin/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, priority })
    });
    const { id } = await resp.json();
    setTodos(prev => [{ id, title, priority, completed: false, created_at: new Date().toISOString() }, ...prev]);
  };

  return (
    <div className="space-y-12">
      {/* ... header and actions ... */}
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Master of Sanctuary
          </p>
          <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
            Client <span className="font-serif italic text-secondary">Management</span>
          </h1>
          <p className="mt-4 text-lg font-serif italic text-primary/60 max-w-xl">
            The overseer&apos;s toolkit. Search for clients to manage their services, links, and documents in the quiet space of administrating.
          </p>
        </div>
      </section>

      {/* Action Grid & Management Tools */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Calendar View */}
        <div className="xl:col-span-2 space-y-8">
           <div className="flex items-center justify-between px-2">
             <h2 className="text-2xl font-display font-medium text-primary">Sacred <span className="font-serif italic text-secondary">Schedule</span></h2>
             <Button 
              variant="ghost" 
              className="text-[10px] uppercase tracking-widest font-bold"
              onClick={() => setIsCalendarFull(true)}
             >
                View Full Calendar
             </Button>
           </div>
           <AdminCalendar 
              sessions={sessions} 
              isLoading={isLoading} 
              onDateSelect={(date) => console.log('Date selected:', date)} 
           />
        </div>

        {/* Full Screen Calendar Overlay */}
        <AnimatePresence>
          {isCalendarFull && (
            <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center p-4 sm:p-12 overflow-hidden">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCalendarFull(false)}
                className="absolute inset-0 bg-primary/60 backdrop-blur-xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-[1600px] h-[90vh] bg-white rounded-[48px] shadow-3xl overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-8 border-b border-primary/5 bg-primary/[0.02]">
                   <div>
                     <h2 className="text-3xl font-display font-medium text-primary">Sacred <span className="font-serif italic text-secondary">Schedule</span></h2>
                     <p className="font-serif italic text-xs text-primary/40 mt-1">Full-screen sanctuary management</p>
                   </div>
                   <button 
                    onClick={() => setIsCalendarFull(false)}
                    className="p-4 bg-primary text-background rounded-2xl hover:bg-accent transition-colors shadow-xl group flex items-center gap-3 font-display text-[10px] uppercase font-bold tracking-widest"
                   >
                     <X size={20} />
                     Exit Full Screen
                   </button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                  <AdminCalendar 
                      sessions={sessions} 
                      isLoading={isLoading} 
                      onDateSelect={(date) => console.log('Date selected:', date)} 
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Sidebar Tools: Todo List & Quick Search */}
        <div className="space-y-8 h-fit">
           <div className="flex items-center justify-between px-2">
             <h2 className="text-2xl font-display font-medium text-primary">Daily <span className="font-serif italic text-secondary">Focus</span></h2>
           </div>
           <AdminTodoList 
              todos={todos}
              onAdd={handleTodoAdd}
              onToggle={handleTodoToggle}
              onDelete={handleTodoDelete}
              isLoading={isLoading}
           />

           {/* Quick Action Card moved here */}
           <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-full glass p-8 rounded-[32px] border border-primary/5 flex flex-col items-start gap-4 hover:border-accent/40 transition-all group text-left"
            >
              <div className="p-3 bg-primary text-background rounded-xl group-hover:bg-accent group-hover:text-primary transition-colors">
                <Search size={20} />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-primary">Quick Search</h3>
                <p className="font-serif italic text-xs text-primary/40">Find clients to manage session records.</p>
              </div>
            </button>
        </div>
      </div>

      {/* Selected Client Overview */}
      {selectedClient && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="bg-primary text-background rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="space-y-2 text-center md:text-left">
               <p className="font-display text-[11px] uppercase tracking-widest font-bold text-accent">Active Administrative Selection</p>
               <h4 className="text-3xl font-display font-medium">{selectedClient.full_name}</h4>
               <p className="font-serif italic text-background/60">{selectedClient.email}</p>
             </div>
             <div className="flex gap-4">
               <Button 
                variant="secondary" 
                className="px-8 rounded-xl"
                onClick={() => setIsSheetOpen(true)}
               >
                 Manage Client
               </Button>
               <button 
                 onClick={() => setSelectedClient(null)}
                 className="px-6 py-4 font-display text-[11px] uppercase tracking-widest font-bold text-background/40 hover:text-white transition-colors"
               >
                 Clear
               </button>
             </div>
           </div>
        </section>
      )}

      {/* Search Palette Component */}
      <ClientSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelect={handleSelectClient} 
      />

      {/* Assignment Sheet */}
      <AnimatePresence>
        {isSheetOpen && (
          <ClientAssignmentSheet 
            client={selectedClient} 
            onClose={() => setIsSheetOpen(false)}
            onSuccess={() => {
              // Future: Refresh data
              setIsSheetOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

