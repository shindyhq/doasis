import { createClient, getUser } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Plus,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AppointmentService } from '@/services/AppointmentService';
import { format, differenceInDays } from 'date-fns';
import { Appointment } from '@/types/custom';

export default async function AppointmentsPage() {
  const { data: { user } } = await getUser();

  if (!user) {
    return redirect('/login');
  }

  let upcomingAppointments: Appointment[] = [];
  let history: Appointment[] = [];
  let error = null;

  try {
    upcomingAppointments = await AppointmentService.getUpcomingAppointments(user.id);
    history = await AppointmentService.getAppointmentHistory(user.id);
  } catch (e) {
    console.error('Error fetching appointments:', e);
    error = e;
  }
  
  const nextSession = upcomingAppointments && upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
            Rhythm of Healing
          </p>
          <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
            Your <span className="font-serif italic text-secondary">Appointments</span>
          </h1>
          <p className="mt-4 text-lg font-serif italic text-primary/60 max-w-xl">
            View and manage your upcoming sessions. Each encounter is a step towards wholeness.
          </p>
        </div>
        <Button variant="primary" className="w-fit px-10 py-5">
          <Plus size={18} className="mr-2" />
          Schedule New Session
        </Button>
      </section>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-8">
          <p className="font-bold">Unable to load appointments</p>
          <p className="text-sm">Please try again later or contact support if the issue persists.</p>
        </div>
      )}

      {/* Featured Appointment (Next Session) */}
      <section className="space-y-6">
        <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70 px-4">
          Upcoming
        </h3>
        {nextSession ? (
          <div className="bg-primary text-background rounded-[40px] p-10 relative overflow-hidden group shadow-2xl shadow-primary/20">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-accent font-display text-[11px] uppercase tracking-widest font-bold">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Next Session in {differenceInDays(new Date(nextSession.scheduled_at), new Date())} Days
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl font-display font-medium tracking-tight">
                    {nextSession.type || 'Coaching Session'}
                  </h4>
                  <div className="flex flex-wrap items-center gap-6 text-background/80 text-[11px] font-display font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={16} className="text-accent" />
                      <span>{format(new Date(nextSession.scheduled_at), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-accent" />
                      <span>{format(new Date(nextSession.scheduled_at), 'h:mm a')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-accent" />
                      <span>Zoom Sanctuary</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Button variant="secondary" className="w-full md:w-fit px-10 py-5">
                  Enter Waiting Room
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-background/60 hover:text-white hover:bg-white/5 px-6 py-3 text-[10px]"
                >
                  Reschedule Session
                </Button>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>
        ) : (
          <div className="p-12 rounded-[40px] bg-white border border-primary/5 text-center space-y-4">
              <p className="font-serif italic text-primary/60 text-lg">No upcoming sessions available.</p>
              <Button variant="outline">Schedule a Session</Button>
          </div>
        )}
      </section>

      {/* Past Appointments / History */}
      <section className="space-y-6 pb-12">
        <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70 px-4">
          Recent History
        </h3>
        {history && history.length > 0 ? (
          <div className="bg-white/40 rounded-[40px] border border-primary/5 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary/5">
                  <th className="px-10 py-6 font-display text-[12px] uppercase tracking-widest font-bold text-primary/70">Date & Time</th>
                  <th className="px-10 py-6 font-display text-[12px] uppercase tracking-widest font-bold text-primary/70">Session Type</th>
                  <th className="px-10 py-6 font-display text-[12px] uppercase tracking-widest font-bold text-primary/70">Status</th>
                  <th className="px-10 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {history.map((apt: any) => (
                  <tr key={apt.id} className="group hover:bg-white transition-colors cursor-default">
                    <td className="px-10 py-8">
                      <div className="space-y-1">
                        <p className="font-display font-bold text-primary">{format(new Date(apt.scheduled_at), 'MMM d, yyyy')}</p>
                        <p className="font-display text-[11px] text-primary/60 font-bold uppercase tracking-widest">{format(new Date(apt.scheduled_at), 'h:mm a')}</p>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <p className="font-serif italic text-primary/80">{apt.type || 'Session'}</p>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-display text-[11px] uppercase tracking-widest font-bold ${
                        apt.status === 'completed' ? 'bg-green-500/10 text-green-700' : 
                        apt.status === 'cancelled' ? 'bg-red-500/10 text-red-700' : 'bg-primary/5 text-primary/60'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          apt.status === 'completed' ? 'bg-green-500' : 
                          apt.status === 'cancelled' ? 'bg-red-500' : 'bg-primary/40'
                        }`} />
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button 
                        title="View Details"
                        className="p-3 rounded-xl bg-primary/5 text-primary/40 group-hover:bg-primary group-hover:text-background transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 rounded-[40px] bg-primary/2 border border-primary/5 text-center">
             <p className="text-primary/40 font-display text-xs uppercase tracking-widest">No history available</p>
          </div>
        )}
      </section>
    </div>
  );
}
