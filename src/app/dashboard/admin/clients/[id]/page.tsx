import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Shield, 
  BookOpen, 
  Target, 
  Video, 
  Heart,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { GoalCard } from '@/components/dashboard/goals/GoalCard';
// import { CheckInChart } from '@/components/dashboard/admin/CheckInChart'; // TODO: Build this later

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage(props: PageProps) {
  const params = await props.params;
  const { id } = params;
  const supabase = createClient();

  // 1. Verify Admin Access
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: currentUserProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (currentUserProfile?.role !== 'admin' && user.id !== 'mock-admin-id') {
    redirect('/dashboard');
  }

  // 2. Fetch Client Data Aggregation
  const [profileRes, goalsRes, journalsRes, resourcesRes, checkInsRes, appointmentsRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', id).single(),
    supabase.from('goals').select('*, milestones:goal_milestones(*)').eq('user_id', id).order('created_at', { ascending: false }),
    supabase.from('journals').select('*').eq('user_id', id).order('created_at', { ascending: false }).limit(5),
    supabase.from('client_resources').select('*, resource:resources(*)').eq('user_id', id).order('last_accessed_at', { ascending: false }),
    supabase.from('check_ins').select('*').eq('user_id', id).order('created_at', { ascending: false }).limit(10),
    supabase.from('appointments').select('*').eq('user_id', id).gt('scheduled_at', new Date().toISOString()).order('scheduled_at', { ascending: true }).limit(1)
  ]);

  const profile = profileRes.data;
  const goals = goalsRes.data || [];
  const journals = journalsRes.data || [];
  const resources = resourcesRes.data || [];
  const checkIns = checkInsRes.data || [];
  const nextAppointment = appointmentsRes.data?.[0];

  if (!profile) {
    return <div>Client not found</div>;
  }

  // Calculate Average Mood
  const avgMood = checkIns.length > 0 
    ? (checkIns.reduce((acc: number, curr: any) => acc + curr.mood_score, 0) / checkIns.length).toFixed(1)
    : 'N/A';

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link 
        href="/dashboard/admin" 
        className="inline-flex items-center gap-2 text-primary/40 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest"
      >
        <ArrowLeft size={12} /> Back to Directory
      </Link>

      {/* Header Profile Card */}
      <div className="bg-white/50 backdrop-blur-sm border border-white/60 p-8 rounded-[32px] flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="w-24 h-24 rounded-full bg-[#E8E6E1] flex items-center justify-center text-primary/20">
          <User size={40} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-display font-medium text-primary">{profile.full_name || 'Unnamed Soul'}</h1>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
              Active Member
            </span>
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm text-primary/60">
            <div className="flex items-center gap-2">
              <Mail size={14} className="opacity-50" />
              {profile.email}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="opacity-50" />
              Joined {new Date(profile.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="opacity-50" />
              {profile.location || 'Remote'}
            </div>
            <div className="flex items-center gap-2">
               <Shield size={14} className="opacity-50" />
               ID: {profile.id.slice(0,8)}...
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-center p-4 bg-white/40 rounded-2xl border border-primary/5">
             <div className="text-2xl font-display font-bold text-accent">{avgMood}</div>
             <div className="text-[9px] uppercase tracking-widest text-primary/40">Avg Mood</div>
          </div>
          <div className="text-center p-4 bg-white/40 rounded-2xl border border-primary/5">
             <div className="text-2xl font-display font-bold text-secondary">{goals.length}</div>
             <div className="text-[9px] uppercase tracking-widest text-primary/40">Active Goals</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Quick Info */}
        <div className="space-y-6">
          {/* Next Session */}
          <div className="bg-white/50 p-6 rounded-[32px] border border-white/60">
             <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-4 flex items-center gap-2">
               <Calendar size={14} /> Next Session
             </h3>
             {nextAppointment ? (
               <div className="bg-primary/5 p-4 rounded-xl">
                 <div className="font-display font-bold text-primary text-lg">
                   {format(new Date(nextAppointment.scheduled_at), 'MMM d, yyyy')}
                 </div>
                 <div className="text-accent text-sm font-medium">
                   {format(new Date(nextAppointment.scheduled_at), 'h:mm a')}
                 </div>
               </div>
             ) : (
               <div className="text-sm text-primary/40 italic">No upcoming sessions.</div>
             )}
          </div>

          {/* Recent Moods */}
          <div className="bg-white/50 p-6 rounded-[32px] border border-white/60">
             <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-4 flex items-center gap-2">
               <Heart size={14} /> Recent Spirit
             </h3>
             <div className="space-y-3">
               {checkIns.slice(0, 5).map((checkIn: any) => (
                 <div key={checkIn.id} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                     <span className="text-lg">{['😔', '😐', '🙂', '😌', '🥰'][checkIn.mood_score - 1]}</span>
                     <span className="text-primary/60">{format(new Date(checkIn.created_at), 'MMM d')}</span>
                   </div>
                   {checkIn.note && (
                     <div className="text-[10px] bg-white px-2 py-1 rounded border overflow-hidden max-w-[100px] truncate">
                       {checkIn.note}
                     </div>
                   )}
                 </div>
               ))}
               {checkIns.length === 0 && <span className="text-primary/40 text-sm">No check-ins yet.</span>}
             </div>
          </div>
        </div>

        {/* Middle/Right Column: Tabs Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Goals Section */}
          <section>
            <h3 className="text-lg font-display font-medium text-primary mb-4 flex items-center gap-2">
              <Target size={18} className="text-accent" /> Active Goals
            </h3>
            {goals.length > 0 ? (
              <div className="space-y-4">
                 {/* Reusing GoalCard purely for display (handlers are no-op since viewing as admin) */}
                 {goals.map((goal: any) => (
                   <div key={goal.id} className="opacity-90 hover:opacity-100 transition-opacity">
                     {/* Simplified view or reuse component? reusing component might have edit buttons enabled... 
                         Ideally pass readOnly prop, but GoalCard doesn't have it. 
                         For now, create a lightweight read-only view. */}
                     <div className="bg-white p-6 rounded-2xl border border-primary/5">
                        <div className="flex justify-between">
                            <h4 className="font-display font-bold text-primary">{goal.title}</h4>
                            <span className="text-xs font-bold uppercase tracking-widest text-accent">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-primary/5 h-1.5 rounded-full mt-2 overflow-hidden">
                           <div className="bg-accent h-full" style={{ width: `${goal.progress}%` }} />
                        </div>
                        <div className="mt-4 space-y-1">
                           {goal.milestones?.map((m: any) => (
                             <div key={m.id} className="flex items-center gap-2 text-sm">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${m.is_completed ? 'bg-secondary border-secondary' : 'border-primary/20'}`}>
                                   {m.is_completed && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                                <span className={m.is_completed ? 'text-primary/40 line-through' : 'text-primary/80'}>{m.title}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                   </div>
                 ))}
              </div>
            ) : (
              <div className="bg-white/50 p-8 rounded-2xl border border-dashed border-primary/10 text-center text-primary/40">
                No active goals.
              </div>
            )}
          </section>

          {/* Journals Section */}
          <section>
            <h3 className="text-lg font-display font-medium text-primary mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-secondary" /> Recent Reflections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {journals.map((entry: any) => (
                <div key={entry.id} className="bg-[#FAF9F6] p-6 rounded-2xl border border-primary/5 hover:border-primary/10 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">
                      {format(new Date(entry.created_at), 'MMM d, yyyy')}
                    </span>
                    {entry.mood && <span className="text-lg">{['😔', '😐', '🙂', '😌', '🥰'][entry.mood - 1]}</span>}
                  </div>
                  <h4 className="font-display font-bold text-primary">{entry.title}</h4>
                  <p className="text-sm font-serif italic text-primary/60 mt-2 line-clamp-3">
                    {entry.content}
                  </p>
                </div>
              ))}
              {journals.length === 0 && (
                <div className="col-span-full py-8 text-center text-primary/40 italic font-serif">
                   No journal entries shared.
                </div>
              )}
            </div>
          </section>

          {/* Resources Section */}
          <section>
            <h3 className="text-lg font-display font-medium text-primary mb-4 flex items-center gap-2">
              <Video size={18} className="text-primary" /> Resource Library Activity
            </h3>
            <div className="space-y-2">
               {resources.map((item: any) => (
                 <div key={item.id} className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-primary/5">
                    <div className="flex items-center gap-3">
                       <span className="text-xs font-bold uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded text-primary/60">
                         {item.resource?.category}
                       </span>
                       <span className="text-sm font-medium text-primary">{item.resource?.title}</span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                      item.status === 'completed' ? 'bg-secondary/10 text-secondary' : 'bg-primary/5 text-primary/40'
                    }`}>
                      {item.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                 </div>
               ))}
               {resources.length === 0 && (
                 <p className="text-sm text-primary/40 italic pl-2">No resources accessed yet.</p>
               )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
