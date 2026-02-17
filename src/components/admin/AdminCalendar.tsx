'use client';

import { useState, useRef } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameDay, 
  isSameMonth, 
  parseISO, 
  isToday,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  startOfDay,
  endOfDay,
  eachHourOfInterval,
  isSameHour
} from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  Calendar as CalendarIcon, 
  Clock, 
  LayoutGrid, 
  Rows, 
  Columns, 
  Maximize2,
  X,
  User,
  Video,
  FileText,
  ExternalLink
} from 'lucide-react';
import { Session } from '@/lib/types/admin';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminCalendarProps {
  sessions: Session[];
  isLoading: boolean;
  onDateSelect: (date: Date) => void;
}

type ViewMode = 'month' | 'week' | 'day' | 'hour';

export const AdminCalendar = ({ sessions, isLoading, onDateSelect }: AdminCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  // Navigation Logic
  const next = () => {
    if (viewMode === 'month') setCurrentDate(addMonths(currentDate, 1));
    else if (viewMode === 'week') setCurrentDate(addWeeks(currentDate, 1));
    else setCurrentDate(addDays(currentDate, 1));
  };

  const prev = () => {
    if (viewMode === 'month') setCurrentDate(subMonths(currentDate, 1));
    else if (viewMode === 'week') setCurrentDate(subWeeks(currentDate, 1));
    else setCurrentDate(subDays(currentDate, 1));
  };

  const getSessionsForDay = (day: Date) => {
    return sessions.filter(session => isSameDay(parseISO(session.start_time), day));
  };

  const getSessionsForHour = (hour: Date) => {
    return sessions.filter(session => isSameHour(parseISO(session.start_time), hour));
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    return (
      <div className="grid grid-cols-7 gap-px bg-primary/5 rounded-[32px] overflow-hidden border border-primary/5 shadow-inner">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-white/40 py-4 font-display text-[10px] uppercase tracking-[0.2em] font-bold text-primary/30 text-center">
            {day}
          </div>
        ))}
        {calendarDays.map((day) => {
          const daySessions = getSessionsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isDayToday = isToday(day);

          return (
            <button
              key={day.toString()}
              onClick={() => onDateSelect(day)}
              className={`
                relative min-h-[120px] p-4 text-left transition-all group
                ${isCurrentMonth ? 'bg-white/60 hover:bg-white' : 'bg-primary/[0.02] text-primary/20'}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`
                  font-display text-sm font-bold
                  ${isDayToday ? 'w-7 h-7 bg-primary text-background rounded-full flex items-center justify-center -ml-1 -mt-1' : ''}
                  ${!isCurrentMonth ? 'opacity-30' : ''}
                `}>
                  {format(day, 'd')}
                </span>
                {daySessions.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                )}
              </div>
              <div className="space-y-1">
                {daySessions.slice(0, 3).map(session => (
                  <div 
                    key={session.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSession(session);
                    }}
                    className={`
                      px-2 py-0.5 rounded-md text-[8px] font-display font-bold uppercase tracking-tighter truncate cursor-pointer hover:scale-105 transition-transform
                      ${session.type === 'coaching' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-primary/5 text-primary/60 border border-primary/10'}
                    `}
                  >
                    {session.title}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const startDate = startOfWeek(currentDate);
    const endDate = endOfWeek(currentDate);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map((day) => {
          const sessions = getSessionsForDay(day);
          return (
            <div key={day.toString()} className="flex flex-col gap-4">
              <div className={`text-center p-4 rounded-3xl ${isToday(day) ? 'bg-primary text-background' : 'bg-primary/5 text-primary'}`}>
                <p className="font-display text-[9px] uppercase tracking-widest font-bold opacity-60">{format(day, 'EEE')}</p>
                <p className="text-xl font-display font-medium mt-1">{format(day, 'd')}</p>
              </div>
              <div className="flex-1 space-y-3">
                {sessions.map(session => (
                  <motion.div
                    key={session.id}
                    layoutId={`session-${session.id}`}
                    onClick={() => setSelectedSession(session)}
                    className="p-4 rounded-[28px] border border-primary/5 bg-white/60 hover:bg-white hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className={`w-2 h-2 rounded-full mb-3 ${session.type === 'coaching' ? 'bg-accent' : 'bg-primary/20'}`} />
                    <p className="font-display text-xs font-bold text-primary group-hover:text-accent transition-colors truncate">{session.title}</p>
                    <p className="font-serif italic text-[10px] text-primary/40 mt-1">{format(parseISO(session.start_time), 'h:mm a')}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const sessions = getSessionsForDay(currentDate);
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-6 p-6 bg-primary/5 rounded-[32px]">
          <div className="w-16 h-16 bg-primary text-background rounded-2xl flex flex-col items-center justify-center">
            <span className="font-display text-[10px] uppercase font-bold opacity-60">{format(currentDate, 'MMM')}</span>
            <span className="text-2xl font-display font-bold">{format(currentDate, 'dd')}</span>
          </div>
          <div>
            <h4 className="text-xl font-display font-medium text-primary">{format(currentDate, 'EEEE')}</h4>
            <p className="font-serif italic text-sm text-primary/40">{sessions.length} sessions scheduled</p>
          </div>
        </div>
        <div className="grid gap-4">
          {sessions.map(session => (
            <div 
              key={session.id}
              onClick={() => setSelectedSession(session)}
              className="group flex items-center justify-between p-6 bg-white border border-primary/5 rounded-[32px] hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-2xl ${session.type === 'coaching' ? 'bg-accent/10 text-accent' : 'bg-primary/5 text-primary'}`}>
                  <Clock size={24} />
                </div>
                <div>
                  <h5 className="font-display font-bold text-primary group-hover:text-accent transition-colors">{session.title}</h5>
                  <p className="font-serif italic text-sm text-primary/40">
                    {format(parseISO(session.start_time), 'h:mm a')} - {format(parseISO(session.end_time), 'h:mm a')}
                  </p>
                </div>
              </div>
              <ChevronRight className="text-primary/10 group-hover:text-accent transition-colors" />
            </div>
          ))}
          {sessions.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-primary/5 rounded-[40px]">
              <p className="font-serif italic text-primary/30">Quiet space in the sanctuary today.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderHourlyView = () => {
    const hours = eachHourOfInterval({
      start: startOfDay(currentDate),
      end: endOfDay(currentDate)
    }).filter(h => format(h, 'HH') >= '08' && format(h, 'HH') <= '20'); // 8 AM to 8 PM

    return (
      <div className="space-y-4">
        {hours.map((hour) => {
          const hourSessions = getSessionsForHour(hour);
          return (
            <div key={hour.toString()} className="flex gap-6 group">
              <div className="w-20 pt-2 text-right">
                <span className="font-display text-[11px] uppercase tracking-widest font-bold text-primary/30 group-hover:text-primary transition-colors">
                  {format(hour, 'h a')}
                </span>
              </div>
              <div className="flex-1 min-h-[60px] relative border-l border-primary/5 pl-6 pb-6 last:pb-0">
                <div className="absolute left-[-4.5px] top-3 w-2 h-2 rounded-full bg-primary/10 group-hover:bg-accent transition-colors" />
                {hourSessions.map(session => (
                  <motion.div
                    key={session.id}
                    layoutId={`session-h-${session.id}`}
                    onClick={() => setSelectedSession(session)}
                    className="p-4 bg-white border border-primary/5 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-1 h-8 rounded-full ${session.type === 'coaching' ? 'bg-accent' : 'bg-primary/20'}`} />
                      <div>
                        <p className="font-display text-xs font-bold text-primary">{session.title}</p>
                        <p className="text-[10px] text-primary/40">{session.client_name}</p>
                      </div>
                    </div>
                    <Maximize2 size={14} className="text-primary/10" />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="glass rounded-[40px] p-8 border border-primary/5 shadow-2xl relative">
      {/* Header & View Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 pb-8 border-b border-primary/5">
        <div className="flex flex-wrap items-center gap-8">
          <div>
            <h3 className="text-3xl font-display font-medium text-primary flex items-center gap-3">
              {viewMode === 'month' ? format(currentDate, 'MMMM') : format(currentDate, 'MMM d')} 
              <span className="font-serif italic text-secondary">{format(currentDate, 'yyyy')}</span>
            </h3>
            <p className="font-serif italic text-xs text-primary/30 mt-0.5">
              {viewMode === 'month' && "Monthly Sanctuary Overview"}
              {viewMode === 'week' && "Weekly Progress Reflection"}
              {viewMode === 'day' && "Daily Journey Focus"}
              {viewMode === 'hour' && "Precision Scheduling"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Navigation */}
            <div className="flex items-center gap-1 bg-primary/5 p-1 rounded-2xl border border-primary/5 shadow-inner">
              <button 
                onClick={prev} 
                className="p-2 hover:bg-white rounded-xl transition-all text-primary/40 hover:text-primary active:scale-90"
                title="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())} 
                className="px-4 py-1.5 font-display text-[9px] uppercase font-bold text-primary/60 hover:text-primary transition-colors hover:bg-white rounded-xl"
              >
                Today
              </button>
              <button 
                onClick={next} 
                className="p-2 hover:bg-white rounded-xl transition-all text-primary/40 hover:text-primary active:scale-90"
                title="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* View Toggles - Now Icons */}
        <div className="flex items-center gap-1 bg-primary/5 p-1 rounded-2xl border border-primary/5 shadow-inner">
           {[
             { mode: 'month', icon: LayoutGrid, label: 'Month' },
             { mode: 'week', icon: Columns, label: 'Week' },
             { mode: 'day', icon: CalendarIcon, label: 'Day' },
             { mode: 'hour', icon: Clock, label: 'Hour' }
           ].map(({ mode, icon: Icon, label }) => (
             <button
               key={mode}
               onClick={() => setViewMode(mode as ViewMode)}
               className={`
                 p-2.5 rounded-xl transition-all relative group active:scale-95
                 ${viewMode === mode ? 'bg-white text-primary shadow-md' : 'text-primary/30 hover:text-primary/60'}
               `}
               title={label}
             >
               <Icon size={18} />
               <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-primary text-background text-[8px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase font-bold tracking-tighter">
                 {label}
               </span>
             </button>
           ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode + currentDate.toString()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'month' && renderMonthView()}
            {viewMode === 'week' && renderWeekView()}
            {viewMode === 'day' && renderDayView()}
            {viewMode === 'hour' && renderHourlyView()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Session Pop-up */}
      <AnimatePresence>
        {selectedSession && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSession(null)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[48px] p-10 shadow-3xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedSession(null)}
                className="absolute right-6 top-6 p-3 bg-primary/5 rounded-2xl text-primary/30 hover:text-primary hover:bg-primary/10 transition-all"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-6 mb-10">
                <div className={`p-5 rounded-3xl ${selectedSession.type === 'coaching' ? 'bg-accent/10 text-accent' : 'bg-primary/5 text-primary'}`}>
                  <CalendarIcon size={32} />
                </div>
                <div>
                  <span className="font-display text-[10px] uppercase tracking-[0.2em] font-bold text-primary/30">Session Detail</span>
                  <h4 className="text-3xl font-display font-medium text-primary mt-1">{selectedSession.title}</h4>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-primary/[0.02] p-6 rounded-[32px] border border-primary/5">
                    <div className="flex items-center gap-3 text-primary/30 mb-2">
                       <User size={16} />
                       <span className="font-display text-[10px] uppercase font-bold">Client</span>
                    </div>
                    <p className="font-display font-bold text-primary">{selectedSession.client_name}</p>
                  </div>
                  <div className="bg-primary/[0.02] p-6 rounded-[32px] border border-primary/5">
                    <div className="flex items-center gap-3 text-primary/30 mb-2">
                       <Clock size={16} />
                       <span className="font-display text-[10px] uppercase font-bold">Duration</span>
                    </div>
                    <p className="font-display font-bold text-primary">60 Minutes</p>
                  </div>
                </div>

                <div className="bg-primary/[0.02] p-6 rounded-[32px] border border-primary/5">
                   <div className="flex items-center gap-3 text-primary/30 mb-3">
                      <Clock size={16} />
                      <span className="font-display text-[10px] uppercase font-bold">Scheduled Time</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <p className="text-xl font-display font-medium text-primary">
                        {format(parseISO(selectedSession.start_time), 'EEEE, MMM do')}
                      </p>
                      <p className="font-serif italic text-accent font-bold">
                        {format(parseISO(selectedSession.start_time), 'h:mm a')}
                      </p>
                   </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-primary text-background p-5 rounded-[24px] font-display text-[11px] uppercase tracking-widest font-bold flex items-center justify-center gap-3 hover:bg-accent transition-colors">
                    <Video size={18} />
                    Enter Sanctuary
                  </button>
                  <button className="p-5 bg-primary/5 rounded-[24px] text-primary hover:bg-primary/10 transition-all">
                    <FileText size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Loading State Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-[40px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-accent" size={40} />
            <p className="font-display text-[11px] uppercase tracking-widest font-bold text-primary/40">Synchronizing Sanctuary...</p>
          </div>
        </div>
      )}
    </div>
  );
};
