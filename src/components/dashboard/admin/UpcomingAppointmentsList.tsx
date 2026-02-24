import { Clock, Video, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

interface UpcomingAppointmentsListProps {
    appointments?: any[];
}

export function UpcomingAppointmentsList({ appointments = [] }: UpcomingAppointmentsListProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full flex flex-col">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 font-display">Upcoming Sessions</h2>
            
            <div className="space-y-6 flex-1 overflow-y-auto">
                {appointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                        <Clock className="w-8 h-8 opacity-20 mb-2" />
                        <p className="text-sm">No upcoming sessions</p>
                    </div>
                ) : (
                    appointments.slice(0, 5).map((apt) => (
                        <div key={apt.id} className="flex gap-4 group">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center text-secondary font-bold">
                                {apt.profiles?.avatar_url ? (
                                    <Image src={apt.profiles.avatar_url} alt={apt.profiles.full_name || 'Client'} fill className="object-cover" />
                                ) : (
                                    <span>{apt.profiles?.full_name?.charAt(0) || 'C'}</span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-900 truncate text-sm">{apt.profiles?.full_name || 'Untitled Client'}</h3>
                                <p className="text-xs text-slate-500 truncate">{apt.type || 'Session'}</p>
                                
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center gap-1.5 text-[10px] text-secondary font-bold bg-secondary/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                        <Clock className="w-3 h-3" />
                                        <span>{format(new Date(apt.scheduled_at), 'MMM d, h:mm a')}</span>
                                    </div>
                                    {apt.location_type === 'online' ? (
                                        <div className="p-1 rounded bg-slate-100 text-slate-400" title="Video Call">
                                            <Video className="w-3 h-3" />
                                        </div>
                                    ) : (
                                        <div className="p-1 rounded bg-slate-100 text-slate-400" title="In Person">
                                            <MapPin className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            <Link 
                href="?new_appointment=true" 
                className="w-full mt-8 py-2.5 border border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-500 hover:text-secondary hover:border-secondary hover:bg-secondary/10 transition-all flex items-center justify-center"
            >
                + Schedule New
            </Link>
        </div>
    );
}
