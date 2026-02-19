
import { createClient } from '@/lib/supabase/server';
import { AdminClientManager } from '@/components/admin/AdminClientManager';
import { SanctuaryCalendarWidget } from '@/components/admin/widgets/SanctuaryCalendarWidget';
import { SanctuaryTasksWidget } from '@/components/admin/widgets/SanctuaryTasksWidget';
import { AdminPageClient } from './page.client'; 

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = await createClient();
  
  // Fetch data in parallel
  const [clientsRes, sessionsRes, todosRes] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    supabase.from('sessions').select('*').order('start_time', { ascending: true }),
    supabase.from('admin_todos').select('*').order('created_at', { ascending: false })
  ]);

  const clients = clientsRes.data || [];
  const sessions = sessionsRes.data || [];
  const todos = todosRes.data || [];

  return (
    <div className="min-h-screen bg-[#fdfbf7] p-8 md:p-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <section className="flex items-end justify-between border-b border-primary/5 pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
              Sanctuary Control
            </p>
            <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
              Admin <span className="font-serif italic">Dashboard</span>
            </h1>
            <p className="mt-6 text-lg font-serif italic text-primary/60 max-w-2xl leading-relaxed">
              Orchestrate the journey. Manage souls, schedule sessions, and guide the path forward.
            </p>
          </div>
          <AdminPageClient />
        </section>

        {/* Section 1: Calendar (Full Width) */}
        <section className="space-y-8">
           <div className="flex items-center gap-4">
             <h2 className="text-2xl font-display font-medium text-primary">Sanctuary Schedule</h2>
             <div className="h-px flex-1 bg-primary/5"></div>
           </div>
           <SanctuaryCalendarWidget sessions={sessions as any[]} />
        </section>

        {/* Section 2: Client Management (Full Width) */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-display font-medium text-primary">Soul Directory</h2>
             <div className="h-px flex-1 bg-primary/5 ml-8"></div>
          </div>
          <AdminClientManager clients={(clients as any[]) || []} />
        </section>

        {/* Section 3: Tasks (Full Width) */}
        <section className="space-y-8">
           <div className="flex items-center gap-4">
             <h2 className="text-2xl font-display font-medium text-primary">Sanctuary Priorities</h2>
             <div className="h-px flex-1 bg-primary/5"></div>
           </div>
           <SanctuaryTasksWidget 
             todos={todos as any[]} 
             onAdd={async (title, priority) => { 'use server'; }}
             onToggle={async (id) => { 'use server'; }}
             onDelete={async (id) => { 'use server'; }}
           />
        </section>
      </div>
    </div>
  );
}
