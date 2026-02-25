import { createClient, getUser } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
import { AppointmentService } from '@/services/AppointmentService';
import { JournalService } from '@/services/JournalService';
import {
  Calendar as CalendarIcon,
  Clock,
  BookOpen,
  Target,
  Users,
  Library,
  Settings,
  MessageSquare,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { format, differenceInDays } from 'date-fns';
import { Appointment } from '@/types/custom';
import { Button } from '@/components/ui/Button';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await getUser();

  // Mock user for dev - remove before production
  const user = authUser || {
      id: 'mock-user-id',
      email: 'guest@doasis.org',
      user_metadata: { full_name: 'Guest User' }
  };

  const userDisplayName = (user.user_metadata?.full_name as string | undefined)?.split(' ')[0] || 'Friend';

  let nextAppointment: Appointment | null = null;
  let journalStats = { totalEntries: 0, streak: 0 };
  let isAdmin = false;
  let statsSummary = { sessions: 0, goals: 0 };

  try {
    const [appointments, stats, profileRes, goalsRes, sessionCountRes] = await Promise.all([
      AppointmentService.getUpcomingAppointments(user.id),
      JournalService.getStats(user.id),
      supabase.from('profiles').select('role, created_at, meeting_url').eq('id', user.id).single(),
      supabase.from('goals').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'in_progress'),
      supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('client_id', user.id).eq('status', 'completed')
    ]);

    nextAppointment = appointments?.[0] ?? null;
    journalStats = stats;
    const profile = profileRes.data;
    isAdmin = profile?.role === 'admin' || user.id === 'mock-admin-id';
    statsSummary = {
      sessions: sessionCountRes.count || 0,
      goals: goalsRes.count || 0
    };
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
  }

  const quickLinks = [
    { label: 'Appointments', sublabel: 'Manage your sessions', href: '/dashboard/appointments', Icon: CalendarIcon },
    { label: 'Journal', sublabel: 'Your written path', href: '/dashboard/journal', Icon: BookOpen },
    { label: 'Goals', sublabel: 'Track your progress', href: '/dashboard/goals', Icon: Target },
    { label: 'Community', sublabel: 'Connect & share', href: '/dashboard/community', Icon: Users },
    { label: 'Library', sublabel: 'Curated resources', href: '/dashboard/library', Icon: Library },
    { label: 'Sessions', sublabel: 'Session history', href: '/dashboard/sessions', Icon: Clock },
    { label: 'Billing', sublabel: 'Invoices & payments', href: '/dashboard/billing', Icon: MessageSquare },
    { label: 'Settings', sublabel: 'Your preferences', href: '/dashboard/settings', Icon: Settings },
  ];

  return (
    <div className="space-y-12">
      {/* ── Page Header ─────────────────────────────── */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
            Your Sanctuary
          </p>
          <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
            Welcome, <span className="font-serif italic text-secondary">{userDisplayName}</span>
          </h1>
          <p className="mt-4 text-lg font-serif italic text-primary/60 max-w-xl">
            This is your healing space. Every step you take here is a step towards wholeness.
          </p>
        </div>
        <Link href="/dashboard/appointments">
          <Button variant="primary" className="w-fit px-10 py-5">
            <CalendarIcon size={18} className="mr-2" />
            Book a Session
          </Button>
        </Link>
      </section>

      {/* ── Affirmation Banner ───────────────────────── */}
      <div className="bg-primary text-background rounded-[40px] p-10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <Sparkles size={32} className="text-accent shrink-0" />
          <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-background/90">
            &ldquo;I am deserving of peace, and I create the space to heal at my own pace.&rdquo;
          </p>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 blur-[100px] rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      </div>

      {/* ── Next Session ─────────────────────────────── */}
      <section className="space-y-6">
        <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70 px-4">
          Next Session
        </h3>

        {nextAppointment ? (
          <div className="bg-primary text-background rounded-[40px] p-10 relative overflow-hidden group shadow-2xl shadow-primary/20">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-accent font-display text-[11px] uppercase tracking-widest font-bold">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  In {differenceInDays(new Date(nextAppointment.scheduled_at), new Date())} Days
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl font-display font-medium tracking-tight">
                    {nextAppointment.type || 'Coaching Session'}
                  </h4>
                  <div className="flex flex-wrap items-center gap-6 text-background/80 text-[11px] font-display font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={16} className="text-accent" />
                      <span>{format(new Date(nextAppointment.scheduled_at), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-accent" />
                      <span>{format(new Date(nextAppointment.scheduled_at), 'h:mm a')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Button variant="secondary" className="w-full md:w-fit px-10 py-5">
                  Enter Waiting Room
                </Button>
                <Link href="/dashboard/appointments">
                  <Button variant="ghost" className="text-background/60 hover:text-white hover:bg-white/5 px-6 py-3 text-[10px]">
                    View All Appointments
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          </div>
        ) : (
          <div className="p-12 rounded-[40px] bg-white/60 backdrop-blur-sm border border-primary/5 text-center space-y-4">
            <p className="font-serif italic text-primary/60 text-lg">
              No upcoming sessions scheduled yet.
            </p>
            <Link href="/dashboard/appointments">
              <Button variant="outline">Schedule a Session</Button>
            </Link>
          </div>
        )}
      </section>

      {/* ── Quick Stats ──────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Journal Entries', value: journalStats.totalEntries, sublabel: 'recorded thoughts' },
          { label: 'Day Streak', value: journalStats.streak, sublabel: 'consecutive days' },
          { label: 'Sessions', value: statsSummary.sessions, sublabel: 'completed' },
          { label: 'Goals', value: statsSummary.goals, sublabel: 'in progress' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/60 backdrop-blur-sm border border-white/60 rounded-[32px] p-8 text-center">
            <p className="text-4xl font-display font-bold text-primary">{stat.value}</p>
            <p className="font-display text-[11px] uppercase tracking-widest font-bold text-primary/70 mt-1">{stat.label}</p>
            <p className="font-serif italic text-primary/40 text-xs mt-1">{stat.sublabel}</p>
          </div>
        ))}
      </section>

      {/* ── Quick Access ─────────────────────────────── */}
      <section className="space-y-6">
        <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70 px-4">
          Your Sanctuary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quickLinks.map(({ label, sublabel, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white/60 backdrop-blur-sm border border-white/60 rounded-[32px] p-8 hover:bg-white/80 hover:shadow-xl hover:shadow-primary/5 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-primary/5 rounded-2xl text-primary/60 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                  <Icon size={22} />
                </div>
                <ChevronRight size={18} className="text-primary/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-display text-lg font-medium text-primary group-hover:text-accent transition-colors">{label}</h4>
              <p className="font-serif italic text-primary/50 text-sm mt-1">{sublabel}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Admin Portal Entry ───────────────────────── */}
      {isAdmin && (
        <section>
          <div className="bg-primary/5 border border-primary/10 rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-6 group">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-2">Practitioner Access</p>
              <h3 className="text-3xl font-display font-medium text-primary">Sanctuary Control</h3>
              <p className="font-serif italic text-primary/50 mt-2">Access the admin dashboard to manage clients and sessions.</p>
            </div>
            <Link href="/dashboard/admin">
              <Button variant="primary" className="px-10 py-5 flex items-center gap-3 shrink-0">
                Enter Control Room
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
