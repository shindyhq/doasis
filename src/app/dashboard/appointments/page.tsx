import { createClient, getUser } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Plus,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default async function AppointmentsPage() {
  const { data: { user } } = await getUser();

  if (!user) {
    return redirect('/login');
  }

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

      {/* Featured Appointment (Next Session) */}
      <section className="space-y-6">
        <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70 px-4">
          Upcoming
        </h3>
        <div className="bg-primary text-background rounded-[40px] p-10 relative overflow-hidden group shadow-2xl shadow-primary/20">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-accent font-display text-[11px] uppercase tracking-widest font-bold">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Next Session in 4 Days
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-display font-medium tracking-tight">Becoming: Core Identity Exploration</h4>
                <div className="flex flex-wrap items-center gap-6 text-background/80 text-[11px] font-display font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-accent" />
                    <span>Feb 15, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-accent" />
                    <span>2:00 PM — 3:00 PM CST</span>
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
      </section>

      {/* Past Appointments / History */}
      <section className="space-y-6 pb-12">
        <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70 px-4">
          Recent History
        </h3>
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
              {[
                { date: 'Feb 08, 2026', time: '11:00 AM', type: 'The Weight of Quiet (Grief)', status: 'Completed' },
                { date: 'Feb 01, 2026', time: '2:00 PM', type: 'Naming the Void (Identity)', status: 'Completed' },
                { date: 'Jan 25, 2026', time: '4:30 PM', type: 'Introductory Consultation', status: 'Completed' },
              ].map((apt, i) => (
                <tr key={i} className="group hover:bg-white transition-colors cursor-default">
                  <td className="px-10 py-8">
                    <div className="space-y-1">
                      <p className="font-display font-bold text-primary">{apt.date}</p>
                      <p className="font-display text-[11px] text-primary/60 font-bold uppercase tracking-widest">{apt.time}</p>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <p className="font-serif italic text-primary/80">{apt.type}</p>
                  </td>
                  <td className="px-10 py-8">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-700 rounded-full font-display text-[11px] uppercase tracking-widest font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
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
      </section>
    </div>
  );
}
