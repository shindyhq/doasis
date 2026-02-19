import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar, Clock, Video, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SessionsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Fetch past sessions
  const { data: sessions } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', user.id)
    .or(`status.eq.completed,scheduled_at.lt.${new Date().toISOString()}`)
    .order('scheduled_at', { ascending: false });

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Your Journey
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Session History
        </h1>
      </header>

      <div className="bg-white/50 border border-white/60 rounded-[32px] overflow-hidden">
        {sessions && sessions.length > 0 ? (
          <div className="divide-y divide-primary/5">
            {sessions.map((session: any) => (
              <div key={session.id} className="p-6 hover:bg-white/60 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/40 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                      <Calendar size={20} />
                   </div>
                   <div>
                      <div className="font-display font-bold text-lg text-primary">
                        {format(new Date(session.scheduled_at), 'MMMM d, yyyy')}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-primary/60 mt-1">
                         <span className="flex items-center gap-1"><Clock size={12} /> {format(new Date(session.scheduled_at), 'h:mm a')}</span>
                         <span className="flex items-center gap-1"><Video size={12} /> Zoom Session</span>
                      </div>
                   </div>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="px-4 py-2 rounded-xl border border-primary/10 text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-sm">
                      View Notes
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-primary/40 font-serif italic">
            No completed sessions found in your history.
          </div>
        )}
      </div>
    </div>
  );
}
