import { Video, MapPin, Users, Calendar as CalendarIcon, Clock } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface AdminScheduleProps {
  appointments: any[];
}

export function AdminSchedule({ appointments = [] }: AdminScheduleProps) {
  // Filter for today's appointments
  const today = new Date().toISOString().split('T')[0];
  
  const todaysAppointments = appointments.filter(apt => {
      // Robust date parsing
      try {
          const aptDate = new Date(apt.scheduled_at).toISOString().split('T')[0];
          return aptDate === today;
      } catch (e) {
          return false;
      }
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Today's Schedule</h2>
        <Link href="/dashboard/admin/calendar" className="text-sm font-medium text-secondary hover:text-primary transition-colors">View Calendar</Link>
      </div>
      
      <div className="space-y-4 flex-1 overflow-y-auto max-h-[400px]">
        {todaysAppointments.length > 0 ? (
            todaysAppointments.map((session, index) => {
                const isOnline = session.location_type === 'online';
                const isGroup = session.type === 'group';
                const Icon = isGroup ? Users : isOnline ? Video : MapPin;
                const colorClass = isGroup ? 'bg-purple-100 text-purple-700' : isOnline ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700';

                return (
                  <div key={session.id || index} className="flex items-center p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-slate-900">{session.profiles?.full_name || 'Client'}</h3>
                        <span className="text-xs font-bold text-slate-400">
                            {format(new Date(session.scheduled_at), 'h:mm a')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 capitalize">{session.title || 'Session'}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="text-xs text-slate-400 flex items-center gap-1">
                          {isOnline ? 'Video Call' : isGroup ? `${session.participants?.length || 0} Participants` : 'In-Person'}
                         </span>
                      </div>
                    </div>
                  </div>
                );
            })
        ) : (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                <CalendarIcon className="w-12 h-12 mb-3 opacity-20" />
                <p>No sessions scheduled for today</p>
            </div>
        )}
      </div>
      
       <div className="mt-6 pt-6 border-t border-slate-100">
        <Link 
            href="?new_appointment=true"
            scroll={false} 
            className="flex items-center justify-center w-full py-2.5 rounded-lg border border-dashed border-slate-300 text-slate-500 text-sm font-medium hover:bg-slate-50 hover:border-slate-400 transition-all font-sans"
        >
          + Manually Add Session
        </Link>
      </div>
    </div>
  );
}
