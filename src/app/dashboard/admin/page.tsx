
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

      {/* Header */}
      <div className="relative z-10 mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-primary tracking-tight">
            Sanctuary <span className="font-serif italic text-accent">Control</span>
          </h1>
          <p className="font-serif italic text-primary/40 mt-2 text-lg">
            Manage souls, schedule sessions, and orchestrate the journey.
          </p>
        </div>
        <AdminPageClient />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column: Client Management (Spans 2 cols) */}
        <div className="xl:col-span-2">
          <AdminClientManager clients={(clients as any[]) || []} />
        </div>

        {/* Right Column: Widgets (Stacked) */}
        <div className="space-y-8 flex flex-col sticky top-6">
          <SanctuaryCalendarWidget sessions={sessions as any[]} />
          <SanctuaryTasksWidget 
            todos={todos as any[]} 
            onAdd={async (title, priority) => {
              'use server';
            }}
            onToggle={async (id) => {
              'use server';
            }}
            onDelete={async (id) => {
              'use server';
            }}
          />
        </div>
      </div>
    </div>
  );
}
