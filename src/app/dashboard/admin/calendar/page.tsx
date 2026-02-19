import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays, getDay } from 'date-fns';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import Link from 'next/link';
import { Appointment } from '@/types/custom';

export const dynamic = 'force-dynamic';

export default async function AdminCalendarPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Verify Admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && user.id !== 'mock-admin-id') redirect('/dashboard');

  // Date Logic
  const today = new Date();
  const yearParam = params?.year ? Number(params.year) : today.getFullYear();
  const monthParam = params?.month ? Number(params.month) : today.getMonth(); // 0-indexed
  
  const currentDate = new Date(yearParam, monthParam, 1);
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Preview next/prev links
  const prevMonth = new Date(yearParam, monthParam - 1, 1);
  const nextMonth = new Date(yearParam, monthParam + 1, 1);
  const prevLink = `/dashboard/admin/calendar?month=${prevMonth.getMonth()}&year=${prevMonth.getFullYear()}`;
  const nextLink = `/dashboard/admin/calendar?month=${nextMonth.getMonth()}&year=${nextMonth.getFullYear()}`;

  // Fetch Appointments
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*, profiles:user_id(full_name, email)')
    .gte('scheduled_at', monthStart.toISOString())
    .lte('scheduled_at', monthEnd.toISOString());

  // Helper to find appointments for a day
  const getAppointmentsForDay = (day: Date) => {
    return appointments?.filter((appt: Appointment & { profiles: any }) => isSameDay(new Date(appt.scheduled_at), day)) || [];
  };

  // Calendar Grid Padding (Empty cells before 1st of month)
  const startDay = getDay(monthStart); // 0 (Sun) - 6 (Sat)
  const paddingDays = Array.from({ length: startDay });

  return (
    <div className="space-y-8 select-none">
      <header className="flex justify-between items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
            Sanctuary Schedule
          </p>
          <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
            Calendar
          </h1>
        </div>
        <div className="flex gap-2">
           <Link href={prevLink} className="p-2 border border-primary/10 rounded-full hover:bg-white hover:shadow-lg transition-all">
             <ChevronLeft />
           </Link>
           <h2 className="w-48 text-center font-display text-xl font-bold py-2">
             {format(currentDate, 'MMMM yyyy')}
           </h2>
           <Link href={nextLink} className="p-2 border border-primary/10 rounded-full hover:bg-white hover:shadow-lg transition-all">
             <ChevronRight />
           </Link>
        </div>
      </header>

      {/* Calendar Grid */}
      <div className="bg-white/50 border border-white/60 rounded-[32px] overflow-hidden shadow-sm">
         {/* Days Header */}
         <div className="grid grid-cols-7 bg-primary/5 border-b border-primary/10">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-4 text-center text-xs font-bold uppercase tracking-widest text-primary/40">
                {day}
              </div>
            ))}
         </div>

         {/* Days Cells */}
         <div className="grid grid-cols-7 auto-rows-fr">
            {/* Padding */}
            {paddingDays.map((_, i) => (
              <div key={`padding-${i}`} className="min-h-[140px] bg-primary/[0.02] border-r border-b border-primary/5" />
            ))}

            {/* Actual Days */}
            {daysInMonth.map((day) => {
              const dayAppts = getAppointmentsForDay(day);
              const isToday = isSameDay(day, today);

              return (
                <div key={day.toISOString()} className={`min-h-[140px] border-r border-b border-primary/10 p-2 transition-colors hover:bg-white/60 relative group ${isToday ? 'bg-accent/5' : ''}`}>
                   <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full mb-2 ${isToday ? 'bg-accent text-white' : 'text-primary/40'}`}>
                     {format(day, 'd')}
                   </span>

                   <div className="space-y-1">
                     {dayAppts.map((appt: any) => (
                       <Link 
                         key={appt.id}
                         href={`/dashboard/admin/clients/${appt.user_id}`}
                         className="block text-[10px] bg-white border border-primary/5 p-1.5 rounded-lg hover:border-accent hover:shadow-sm transition-all"
                       >
                         <div className="font-bold text-primary truncate">
                            {format(new Date(appt.scheduled_at), 'h:mm a')}
                         </div>
                         <div className="text-primary/60 truncate flex items-center gap-1">
                            {appt.profiles?.full_name || 'Client'}
                         </div>
                       </Link>
                     ))}
                   </div>

                   {/* Add Button (Hidden usually, visible on hover) */}
                   <button className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                     +
                   </button>
                </div>
              );
            })}
         </div>
      </div>
    </div>
  );
}
