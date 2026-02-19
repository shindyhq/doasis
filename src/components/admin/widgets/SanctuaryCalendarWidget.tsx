
'use client';

import { useState } from 'react';
import { 
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, 
  parseISO, isSameDay, addWeeks, subWeeks, addDays, subDays, differenceInMinutes
} from 'date-fns';
import { Widget } from '@/components/admin/widgets/Widget';
import { Session } from '@/lib/types/admin';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';

interface SanctuaryCalendarWidgetProps {
  sessions: Session[];
  isLoading?: boolean;
}

export const SanctuaryCalendarWidget = ({ sessions, isLoading }: SanctuaryCalendarWidgetProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  // Navigation Logic
  const navigate = (direction: 'prev' | 'next') => {
    switch (view) {
      case 'month':
        setCurrentDate(direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(direction === 'next' ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1));
        break;
      case 'day':
        setCurrentDate(direction === 'next' ? addDays(currentDate, 1) : subDays(currentDate, 1));
        break;
    }
  };

  const getDaySessions = (day: Date) => sessions.filter(s => isSameDay(parseISO(s.start_time), day));

  // Time Grid (6 AM to 10 PM)
  const hours = Array.from({ length: 17 }, (_, i) => i + 6);

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="h-full flex flex-col">
        <div className="grid grid-cols-7 border-b border-primary/5">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-4 text-center font-display text-[10px] uppercase tracking-widest font-bold text-primary/30">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 flex-1">
          {days.map((day) => {
            const daySessions = getDaySessions(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            
            return (
              <div 
                key={day.toISOString()} 
                className={`
                  border-b border-r border-primary/5 p-2 min-h-[80px] transition-colors hover:bg-primary/[0.01] relative group flex flex-col
                  ${!isCurrentMonth ? 'bg-primary/[0.02]' : ''}
                `}
              >
                <div className="flex justify-between items-start">
                  <span className={`
                    text-xs font-display font-medium block mb-1
                    ${isToday(day) ? 'bg-primary text-background w-6 h-6 rounded-full flex items-center justify-center' : 'text-primary/40'}
                  `}>
                    {format(day, 'd')}
                  </span>
                  {daySessions.length > 0 && (
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  )}
                </div>
                
                <div className="space-y-1 mt-1 overflow-hidden">
                  {daySessions.slice(0, 3).map(session => (
                    <div key={session.id} className="text-[9px] font-display truncate px-1.5 py-0.5 rounded-md bg-accent/10 text-accent font-medium">
                      {session.title}
                    </div>
                  ))}
                  {daySessions.length > 3 && (
                    <div className="text-[9px] text-primary/40 pl-1">
                      +{daySessions.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimeGrid = (isWeek: boolean) => {
    const startDate = isWeek ? startOfWeek(currentDate) : currentDate;
    const daysToShow = isWeek ? eachDayOfInterval({ start: startDate, end: endOfWeek(startDate) }) : [currentDate];

    return (
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header Row */}
        <div className="flex border-b border-primary/5">
          <div className="w-12 flex-shrink-0" /> {/* Time column spacer */}
          {daysToShow.map(day => (
            <div key={day.toISOString()} className={`flex-1 py-4 text-center border-l border-primary/5 ${isToday(day) ? 'bg-accent/5' : ''}`}>
              <div className="font-display text-[10px] uppercase tracking-widest font-bold text-primary/30">
                {format(day, 'EEE')}
              </div>
              <div className={`
                mx-auto mt-1 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm
                ${isToday(day) ? 'bg-primary text-background' : 'text-primary'}
              `}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>

        {/* Scrollable Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-[48px_1fr] relative">
             {/* Time Labels */}
             <div className="flex flex-col">
               {hours.map(hour => (
                 <div key={hour} className="h-20 border-b border-primary/5 text-[10px] font-display font-medium text-primary/30 text-right pr-2 pt-2">
                   {format(new Date().setHours(hour, 0), 'h a')}
                 </div>
               ))}
             </div>

             {/* Days Columns */}
             <div className={`grid ${isWeek ? 'grid-cols-7' : 'grid-cols-1'} flex-1`}>
               {daysToShow.map(day => (
                 <div key={day.toISOString()} className={`border-l border-primary/5 relative ${isToday(day) ? 'bg-accent/[0.02]' : ''}`}>
                   {/* Hour Lines */}
                   {hours.map(hour => (
                     <div key={hour} className="h-20 border-b border-primary/5 group relative">
                       {/* Add Event Button Placeholder */}
                       <button 
                         aria-label={`Add Event at ${format(new Date().setHours(hour, 0), 'h a')}`}
                         className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 hover:bg-primary/5 transition-all text-primary/20 flex items-center justify-center"
                       >
                         <Plus size={16} />
                       </button>
                     </div>
                   ))}

                   {/* Events Overlay */}
                   {getDaySessions(day).map(session => {
                      const start = parseISO(session.start_time);
                      const end = parseISO(session.end_time);
                      
                      const startHour = start.getHours();
                      if (startHour < 6 || startHour > 22) return null; // Out of view
                      
                      const startMinutesFrom6am = (start.getHours() - 6) * 60 + start.getMinutes();
                      const durationMinutes = differenceInMinutes(end, start);
                      
                      // 80px per hour => 80/60 px per minute = 1.3333 px/min
                      const pixelsPerMinute = 80 / 60;
                      const top = startMinutesFrom6am * pixelsPerMinute;
                      const height = Math.max(durationMinutes * pixelsPerMinute, 20); // Min height 20px

                      return (
                        <div 
                          key={session.id}
                          className="absolute left-1 right-1 rounded-lg bg-accent text-primary p-2 text-xs overflow-hidden shadow-lg shadow-accent/20 border border-white/10 z-10 hover:z-20 transition-all cursor-pointer hover:scale-[1.02]"
                          style={{ top: `${top}px`, height: `${height}px` }}
                        >
                          <p className="font-bold text-white font-display text-[10px] uppercase tracking-wider truncate">
                            {format(start, 'h:mm a')} - {format(end, 'h:mm a')}
                          </p>
                          <p className="font-display font-bold text-white leading-tight truncate">
                            {session.title}
                          </p>
                        </div>
                      );
                   })}
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Widget isLoading={isLoading} className="h-[600px]">
      <Widget.Header
        title={format(currentDate, view === 'month' ? 'MMMM yyyy' : view === 'day' ? 'MMMM d, yyyy' : "'Week of' MMM d")}
        subtitle="Sanctuary Schedule"
        icon={<Calendar size={24} />}
        action={
          <div className="flex items-center gap-4">
            {/* View Switcher */}
            <div className="flex bg-primary/5 p-1 rounded-xl">
              {(['month', 'week', 'day'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`
                    px-3 py-1.5 rounded-lg text-[10px] font-display font-bold uppercase tracking-widest transition-all
                    ${view === v ? 'bg-primary text-background shadow-sm' : 'text-primary/40 hover:text-primary'}
                  `}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-primary/10" />

            <div className="flex items-center gap-2">
              <button aria-label="Previous" onClick={() => navigate('prev')} className="p-2 hover:bg-primary/5 rounded-xl transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button aria-label="Today" onClick={() => setCurrentDate(new Date())} className="font-display text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg hover:bg-primary/5">
                Today
              </button>
              <button aria-label="Next" onClick={() => navigate('next')} className="p-2 hover:bg-primary/5 rounded-xl transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        }
      />
      <Widget.Content noPadding>
        {view === 'month' ? renderMonthView() : renderTimeGrid(view === 'week')}
      </Widget.Content>
    </Widget>
  );
};
