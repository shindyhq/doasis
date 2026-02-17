'use client';

import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isSameMonth, parseISO, isBefore, isAfter, setHours, setMinutes, startOfToday, addDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { BookingService } from '@/services/bookingService';

interface BookingCalendarProps {
  onSelectSlot: (slot: { start: string }) => void;
  serviceDuration: number; // in minutes
  calendlyEventUri?: string;
}

export function BookingCalendar({ onSelectSlot, serviceDuration = 60, calendlyEventUri }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(startOfToday());
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [busySlots, setBusySlots] = useState<{ start: string; end: string }[]>([]);
  const [calendlySlots, setCalendlySlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<Date[]>([]);

  // Calculate the dates to display in the grid
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // Fetch availability when month changes
  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        if (calendlyEventUri) {
          // Fetch for a larger range to cover the calendar view (Calendly restricts to 7 days, so we might need multiple calls or just fetch for visible area)
          // For now, let's fetch for the selected date's week or a reasonable window
          const data = await BookingService.getCalendlyAvailability(
            calendlyEventUri, 
            startDate, 
            endDate
          );
          setCalendlySlots(data.collection || []);
        } else {
          const data = await BookingService.getAvailability(startDate, endDate);
          setBusySlots(data.busySlots || []);
        }
      } catch (error) {
        console.error('Failed to load slots', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, [currentMonth, calendlyEventUri]);

  // Calculate daily slots based on selected date
  useEffect(() => {
    if (!selectedDate) return;

    if (calendlyEventUri) {
      // Filter Calendly slots for the selected date
      const slots = calendlySlots
        .filter(s => isSameDay(parseISO(s.start_time), selectedDate) && s.status === 'available')
        .map(s => parseISO(s.start_time));
      
      setAvailableTimeSlots(slots);
      return;
    }

    // Fallback logic for Google Calendar (Legacy)
    const workStartHour = 9;
    const workEndHour = 17;

    const dayStart = setHours(setMinutes(selectedDate, 0), workStartHour);
    const dayEnd = setHours(setMinutes(selectedDate, 0), workEndHour);

    const slots: Date[] = [];
    let currentTime = dayStart;

    while (isBefore(currentTime, dayEnd)) {
        const slotEnd = setMinutes(currentTime, currentTime.getMinutes() + serviceDuration);
        
        const isBusy = busySlots.some(busy => {
            const busyStart = parseISO(busy.start);
            const busyEnd = parseISO(busy.end);
            return (
                (isAfter(currentTime, busyStart) && isBefore(currentTime, busyEnd)) ||
                (isAfter(slotEnd, busyStart) && isBefore(slotEnd, busyEnd)) ||
                (isSameDay(currentTime, busyStart) && currentTime.getTime() === busyStart.getTime()) 
            );
        });

        if (!isBusy && isAfter(currentTime, new Date())) {
            slots.push(currentTime);
        }

        currentTime = setMinutes(currentTime, currentTime.getMinutes() + 30);
    }

    setAvailableTimeSlots(slots);

  }, [selectedDate, busySlots, calendlySlots, serviceDuration, calendlyEventUri]);


  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="flex flex-col md:flex-row gap-8">
        {/* Calendar Grid */}
        <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-2xl text-primary">{format(currentMonth, 'MMMM yyyy')}</h3>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-primary/5 rounded-full transition-colors" aria-label="Previous Month"><ChevronLeft/></button>
                    <button onClick={nextMonth} className="p-2 hover:bg-primary/5 rounded-full transition-colors" aria-label="Next Month"><ChevronRight/></button>
                </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="font-display text-xs font-bold uppercase text-primary/40">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {days.map(day => {
                    const isSelected = isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const isPast = isBefore(day, startOfToday());
                    
                    return (
                        <button
                            key={day.toString()}
                            onClick={() => setSelectedDate(day)}
                            disabled={isPast}
                            className={`
                                font-display aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all
                                ${isSelected ? 'bg-accent text-primary' : 'hover:bg-primary/5 text-primary'}
                                ${!isCurrentMonth ? 'text-primary/30' : ''}
                                ${isPast ? 'opacity-20 cursor-not-allowed hover:bg-transparent' : ''}
                            `}
                        >
                            {format(day, 'd')}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Time Slots */}
        <div className="w-full md:w-64 border-l border-primary/10 md:pl-8">
            <h4 className="font-display font-medium text-lg mb-6 text-primary">
                Available Times <span className="text-sm not-italic text-primary/40 block mt-1">{format(selectedDate, 'MMM d, yyyy')}</span>
            </h4>
            {loading ? (
                <div className="flex justify-center py-8"><Loader2 className="animate-spin text-accent" /></div>
            ) : availableTimeSlots.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {availableTimeSlots.map(time => (
                        <button
                            key={time.toISOString()}
                            onClick={() => onSelectSlot({ start: time.toISOString() })}
                            className="font-display px-4 py-3 rounded-xl border border-primary/10 hover:border-accent hover:bg-accent/5 transition-all text-sm font-medium text-left"
                        >
                            {format(time, 'h:mm a')}
                        </button>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-primary/40 italic">No slots available for this date.</p>
            )}
        </div>
    </div>
  );
}
