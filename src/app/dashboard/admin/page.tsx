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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
        <div className="xl:col-span-2 flex flex-col">
           <AdminClientManager clients={(clients as any[]) || []} />
        </div>

        {/* Right Col: Quick Tools */}
        <div className="flex flex-col gap-10 sticky top-6">
           {/* Calendar Snippet */}
           <div className="bg-white/40 border border-primary/5 rounded-[40px] p-1 shadow-sm">
              <AdminCalendarWrapper />
           </div>
           
           {/* Halo Tasks */}
           <div>
              <AdminTodoListWrapper />
           </div>
        </div>
      </div>
    </div>
  );
}
