import { getUser } from '@/lib/supabase/server';
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

export default async function DashboardPage() {
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

  try {
    const [appointments, journals, stats] = await Promise.all([
      AppointmentService.getUpcomingAppointments(user.id),
      JournalService.getRecentEntries(user.id),
      JournalService.getStats(user.id)
    ]);
    
    upcomingAppointments = appointments;
    nextAppointment = upcomingAppointments && upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;
    recentJournals = journals;
    journalStats = stats;

  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    // Non-blocking error: allow dashboard to load even if data fetching fails
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

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Peace be with you
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Welcome Home, <span className="font-serif italic">{userDisplayName}</span>
        </h1>
        <p className="mt-6 text-lg font-serif italic text-primary/60 max-w-2xl leading-relaxed">
          This is your quiet corner of the sanctuary. Here, your journey is honored, your story is safe, and your progress is celebrated in the stillness.
        </p>
      </section>

      {/* Quick Stats/Highlights */}
      <QuickStatsWidget stats={statsData} />

      {/* Main Actions/Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        {/* Next Session Widget */}
        <NextSessionWidget appointment={nextAppointment} />

        {/* Recent Journal Entries */}
        <RecentJournalsWidget entries={recentJournals} />
      </div>
    </div>
  );
}
