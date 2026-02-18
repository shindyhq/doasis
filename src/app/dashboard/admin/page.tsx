import { createClient } from '@/lib/supabase/server';
import { AdminClientManager } from '@/components/admin/AdminClientManager';
import { AdminCommandBar } from '@/components/admin/AdminCommandBar';
import { AdminCalendarWrapper } from '@/components/admin/AdminCalendarWrapper';
import { AdminTodoListWrapper } from '@/components/admin/AdminTodoListWrapper';
import { Command } from 'lucide-react';
import { AdminPageClient } from './page.client'; 

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = await createClient();

  // Fetch all profiles (clients)
  const { data: clients } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'client')
    .order('full_name', { ascending: true });

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Command Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-medium text-primary">Sanctuary Command</h1>
          <p className="text-primary/60 font-serif italic mt-2">Manage the journey of every soul.</p>
        </div>
        <AdminPageClient /> 
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-[800px]">
        <div className="xl:col-span-2 flex flex-col h-full">
           <AdminClientManager clients={(clients as any[]) || []} />
        </div>

        {/* Right Col: Quick Tools */}
        <div className="flex flex-col gap-8 h-full overflow-hidden">
           {/* Calendar Snippet */}
           <div className="flex-1 min-h-0 bg-white/40 border border-primary/5 rounded-[32px] p-1 overflow-hidden relative">
              <AdminCalendarWrapper />
           </div>
           
           {/* Halo Tasks */}
           <div className="h-1/3 min-h-[300px]">
              <AdminTodoListWrapper />
           </div>
        </div>
      </div>
    </div>
  );
}
