import { Video, CalendarDays } from 'lucide-react';
import { Appointment } from '@/types/custom';
import { format } from 'date-fns';

interface NextSessionWidgetProps {
    appointment?: Appointment | null;
    fallbackMeetingUrl?: string;
}

export function NextSessionWidget({ appointment, fallbackMeetingUrl }: NextSessionWidgetProps) {
  const hasAppointment = !!appointment;
  // Use appointment meeting link if available, otherwise fallback to provider/client generic link
  const joinLink = appointment?.meeting_link || fallbackMeetingUrl;

  if (!hasAppointment) {
      return (
        <div className="bg-slate-900 text-white rounded-2xl p-8 mb-8 relative overflow-hidden flex items-center justify-center min-h-[300px]">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <CalendarDays className="w-32 h-32" />
            </div>
            <div className="relative z-10 text-center">
                 <h2 className="text-xl font-semibold mb-2">No Upcoming Sessions</h2>
                 <p className="text-slate-400 mb-6 max-w-md mx-auto">
                    You don't have any sessions scheduled at the moment.
                 </p>
                 {/* Could add a 'Schedule Session' button here if self-scheduling is allowed */}
            </div>
        </div>
      );
  }

  const sessionDate = new Date(appointment.scheduled_at);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-8 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Video className="w-32 h-32" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 text-teal-400 font-medium uppercase tracking-wider text-sm">
          <CalendarDays className="w-4 h-4" />
          <span>Next Session</span>
        </div>

        <h2 className="text-2xl font-semibold mb-2">{appointment.type || 'Therapy Session'}</h2>
        <p className="text-slate-300 mb-6">
          {appointment.notes || 'Upcoming session with your practitioner.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/5">
            <span className="block text-xs text-slate-400 uppercase tracking-widest mb-1">Date</span>
            <span className="font-medium text-lg">{format(sessionDate, 'EEEE, MMM d, h:mm a')}</span>
          </div>
           <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/5">
            <span className="block text-xs text-slate-400 uppercase tracking-widest mb-1">Provider</span>
            <span className="font-medium text-lg">Dr. Aris Thorne</span>
          </div>
        </div>
        
        <div className="mt-8 flex gap-4">
           {joinLink ? (
             <a 
                href={joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-500 hover:bg-teal-400 text-white font-medium py-3 px-6 rounded-xl transition-colors w-full sm:w-auto text-center inline-block"
             >
                Join Session
             </a>
           ) : (
                <button disabled className="bg-slate-700 text-slate-400 font-medium py-3 px-6 rounded-xl cursor-not-allowed w-full sm:w-auto text-center">
                    Link Not Available
                </button>
           )}
           <button className="bg-transparent hover:bg-white/5 text-white border border-white/20 font-medium py-3 px-6 rounded-xl transition-colors w-full sm:w-auto text-center">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
