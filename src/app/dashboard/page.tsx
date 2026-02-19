import { createClient, getUser } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { AppointmentService } from '@/services/AppointmentService';
import { JournalService } from '@/services/JournalService';
import { 
  Calendar, 
  BookOpen, 
  Star 
} from 'lucide-react';
import { QuickStatsWidget } from '@/components/dashboard/widgets/QuickStatsWidget';
import { NextSessionWidget } from '@/components/dashboard/widgets/NextSessionWidget';
import { RecentJournalsWidget } from '@/components/dashboard/widgets/RecentJournalsWidget';
import { format } from 'date-fns';
import { Appointment, JournalEntry } from '@/types/custom';
import { CheckInService } from '@/services/CheckInService';
import { CheckInWidget } from '@/components/dashboard/widgets/CheckInWidget';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await getUser();

  if (!user) {
    return redirect('/login');
  }

  const userDisplayName = user.user_metadata?.full_name || user.email?.split('@')[0];
  
  // Fetch data using Services
  let upcomingAppointments: Appointment[] = [];
  let nextAppointment: Appointment | null = null;
  let recentJournals: JournalEntry[] = [];
  let journalStats = { totalEntries: 0 };
  let isAdmin = false;
  let profile: any = null; // Define profile outside
  let todayCheckIn: ReturnType<typeof CheckInService.getTodayCheckIn> extends Promise<infer U> ? U : null = null;

  try {
    const [appointments, journals, stats, profileRes, checkInRes] = await Promise.all([
      AppointmentService.getUpcomingAppointments(user.id),
      JournalService.getRecentEntries(user.id),
      JournalService.getStats(user.id),
      supabase.from('profiles').select('role, created_at').eq('id', user.id).single(),
      CheckInService.getTodayCheckIn()
    ]);
    
    upcomingAppointments = appointments;
    nextAppointment = upcomingAppointments && upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;
    recentJournals = journals;
    journalStats = stats;
    profile = profileRes.data; // Assign profile data
    isAdmin = profile?.role === 'admin' || user.id === 'mock-admin-id';
    todayCheckIn = checkInRes;

  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    // Non-blocking error
  }

  const statsData = [
    { 
      label: 'Upcoming Session', 
      value: nextAppointment ? format(new Date(nextAppointment.scheduled_at), 'MMM d, h:mm a') : 'No sessions scheduled', 
      icon: Calendar, 
      color: 'text-accent' 
    },
    { 
      label: 'Completed Reflections', 
      value: `${journalStats.totalEntries} Entries`, 
      icon: BookOpen, 
      color: 'text-secondary' 
    },
    { label: 'Current Plan', value: 'The Becoming', icon: Star, color: 'text-primary' },
  ];

  // Dynamic Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const currentDate = format(new Date(), 'EEEE, MMMM do');

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
            {currentDate} • Peace be with you
          </p>
          <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
            {greeting}, <span className="font-serif italic text-secondary">{userDisplayName}</span>
          </h1>
          <p className="mt-6 text-lg font-serif italic text-primary/60 max-w-2xl leading-relaxed">
            "Stillness is not the absence of movement, but the presence of peace."
            <span className="block text-sm font-sans font-bold uppercase tracking-widest mt-2 opacity-50">– Daily Affirmation</span>
          </p>
        </div>
        
        {/* Wellness Check-in (Mood) */}
        <div className="flex flex-col gap-4 items-end">
           <CheckInWidget initialCheckIn={todayCheckIn} />
           {profile?.created_at && (
             <div className="bg-white/50 px-4 py-2 rounded-full border border-primary/5 text-[10px] font-bold uppercase tracking-widest text-primary/40">
                {Math.floor((new Date().getTime() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24))} Days in Journey
             </div>
           )}
        </div>
      </section>

      {/* Quick Stats/Highlights */}
      <QuickStatsWidget stats={statsData} />

      {/* Main Actions/Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        {/* Admin Access Card */}
        {isAdmin && (
          <div className="col-span-1 lg:col-span-2 bg-primary/5 border border-primary/10 p-8 rounded-[32px] flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-all">
            <div>
              <h3 className="text-2xl font-display font-medium text-primary">Sanctuary Control</h3>
              <p className="text-primary/60 font-serif italic mt-2">Access the practitioner dashboard to manage souls and sessions.</p>
            </div>
            <a href="/dashboard/admin" className="bg-primary text-white px-8 py-3 rounded-xl font-display uppercase tracking-widest text-xs font-bold shadow-lg group-hover:scale-105 transition-transform">
              Enter Admin Portal
            </a>
          </div>
        )}

        {/* Next Session Widget */}
        <NextSessionWidget appointment={nextAppointment} />

        {/* Recent Journal Entries */}
        <RecentJournalsWidget entries={recentJournals} />
      </div>
    </div>
  );
}
