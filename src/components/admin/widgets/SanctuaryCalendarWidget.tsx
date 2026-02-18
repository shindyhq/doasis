
'use client';

import { useState } from 'react';
import { 
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, 
  parseISO, isSameDay
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

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getDaySessions = (day: Date) => sessions.filter(s => isSameDay(parseISO(s.start_time), day));

  return (
    <Widget isLoading={isLoading} className="h-[500px]">
      <Widget.Header
        title={format(currentDate, 'MMMM yyyy')}
        subtitle="Sanctuary Schedule"
        icon={<Calendar size={24} />}
        action={
          <div className="flex items-center gap-2">
            <button aria-label="Previous Month" onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-2 hover:bg-primary/5 rounded-xl transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button aria-label="Go to Today" onClick={() => setCurrentDate(new Date())} className="font-display text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg hover:bg-primary/5">
              Today
            </button>
            <button aria-label="Next Month" onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-2 hover:bg-primary/5 rounded-xl transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        }
      />
      <Widget.Content noPadding>
        <div className="grid grid-cols-7 border-b border-primary/5">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-4 text-center font-display text-[10px] uppercase tracking-widest font-bold text-primary/30">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 h-full">
          {days.map((day, i) => {
            const daySessions = getDaySessions(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            
            return (
              <div 
                key={day.toISOString()} 
                className={`
                  border-b border-r border-primary/5 p-2 min-h-[80px] transition-colors hover:bg-primary/[0.01] relative group
                  ${!isCurrentMonth ? 'bg-primary/[0.02]' : ''}
                `}
              >
                <span className={`
                  text-xs font-medium block mb-1
                  ${isToday(day) ? 'bg-primary text-background w-6 h-6 rounded-full flex items-center justify-center' : 'text-primary/40'}
                `}>
                  {format(day, 'd')}
                </span>
                
                <div className="space-y-1">
                  {daySessions.slice(0, 2).map(session => (
                    <div key={session.id} className="text-[10px] truncate px-1.5 py-0.5 rounded-md bg-accent/10 text-accent font-medium">
                      {session.title}
                    </div>
                  ))}
                  {daySessions.length > 2 && (
                    <div className="text-[9px] text-primary/40 pl-1">
                      +{daySessions.length - 2} more
                    </div>
                  )}
                </div>

                <button 
                  aria-label="Add Event"
                  className="absolute top-2 right-2 p-1 text-primary/10 opacity-0 group-hover:opacity-100 hover:text-primary transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </Widget.Content>
    </Widget>
  );
};
