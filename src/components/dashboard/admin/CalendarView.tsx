'use client';

import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface CalendarViewProps {
    month: number; // 0-11
    year: number;
    events: any[];
}

export function CalendarView({ month, year, events }: CalendarViewProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Helper to get days in month
    const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (m: number, y: number) => new Date(y, m, 1).getDay();

    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    
    // Create array for grid
    const daysArray = Array.from({ length: 42 }, (_, i) => {
        const dayNumber = i - firstDay + 1;
        const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
        const date = isCurrentMonth ? new Date(year, month, dayNumber) : null;
        
        let dayEvents: any[] = [];
        
        if (date) {
             const dateStr = date.toISOString().split('T')[0];
             dayEvents = events.filter(e => e.start.startsWith(dateStr));
        }

        return {
            day: isCurrentMonth ? dayNumber : null,
            date: date,
            events: dayEvents
        };
    });

    const handlePrevMonth = () => {
        const newDate = new Date(year, month - 1, 1);
        const params = new URLSearchParams(searchParams);
        params.set('month', newDate.getMonth().toString());
        params.set('year', newDate.getFullYear().toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleNextMonth = () => {
        const newDate = new Date(year, month + 1, 1);
        const params = new URLSearchParams(searchParams);
        params.set('month', newDate.getMonth().toString());
        params.set('year', newDate.getFullYear().toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6 shrink-0">
             <h2 className="text-lg font-semibold text-slate-900">{MONTHS[month]} {year}</h2>
             <div className="flex items-center gap-2">
                <button 
                    onClick={handlePrevMonth}
                    title="Previous Month"
                    className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
                >
                   <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                    onClick={handleNextMonth}
                    title="Next Month"
                    className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
                >
                   <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex bg-slate-100 rounded-lg p-1 ml-4">
                    <button 
                        onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.set('view', 'month');
                            router.push(`${pathname}?${params.toString()}`);
                        }}
                        className={`px-3 py-1 text-sm font-medium transition-colors rounded-md ${
                            (searchParams.get('view') || 'month') === 'month' 
                            ? 'bg-white shadow-sm text-slate-900' 
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        Month
                    </button>
                    <button 
                         onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.set('view', 'week');
                            router.push(`${pathname}?${params.toString()}`);
                        }}
                        className={`px-3 py-1 text-sm font-medium transition-colors rounded-md ${
                            searchParams.get('view') === 'week' 
                            ? 'bg-white shadow-sm text-slate-900' 
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        Week
                    </button>
                    <button 
                         onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.set('view', 'day');
                            router.push(`${pathname}?${params.toString()}`);
                        }}
                        className={`px-3 py-1 text-sm font-medium transition-colors rounded-md ${
                            searchParams.get('view') === 'day' 
                            ? 'bg-white shadow-sm text-slate-900' 
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        Day
                    </button>
                </div>
             </div>
          </div>
    
          <div className="grid grid-cols-7 mb-2 shrink-0">
             {(searchParams.get('view') === 'week' || searchParams.get('view') === 'day') ? (
                 <div className="col-span-7 py-2 text-center text-sm text-slate-500 bg-slate-50 rounded-lg border border-slate-200 mb-4">
                    {searchParams.get('view') === 'week' ? 'Week' : 'Day'} View is coming soon.
                 </div>
             ) : (
                DAYS.map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider py-2">
                    {day}
                    </div>
                ))
             )}
          </div>
    
          <div className="grid grid-cols-7 grid-rows-6 gap-px bg-slate-100 border border-slate-100 rounded-lg overflow-hidden flex-1 min-h-0">
             {(searchParams.get('view') === 'week' || searchParams.get('view') === 'day') ? (
                 <div className="col-span-7 row-span-6 bg-white flex items-center justify-center text-slate-400 flex-col gap-2">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                        <ChevronRight className="w-8 h-8 text-slate-300" />
                    </div>
                    <span>Use Month view to manage events</span>
                 </div>
             ) : (
                 daysArray.map((dayObj, i) => (
                <div key={i} className={`bg-white p-2 relative group min-h-[100px] overflow-hidden ${!dayObj.day ? 'bg-slate-50/50' : ''}`}>
                   {dayObj.day && (
                       <span className={`text-sm font-medium inline-block w-7 h-7 leading-7 text-center rounded-full ${
                           // Highlight today (mock for now, ideally check against actual today)
                           dayObj.day === 24 && month === 9 && year === 2025 ? 'bg-primary text-white' : 'text-slate-700'
                       }`}>
                           {dayObj.day}
                       </span>
                   )}
                   
                   <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-2rem)]">
                      {dayObj.events.map((event, idx) => (
                          <div key={idx} className={`text-xs p-1.5 rounded border-l-2 truncate cursor-pointer transition-colors ${
                              event.type === 'session' ? 'bg-emerald-50 border-emerald-500 text-emerald-900 hover:bg-emerald-100' :
                              event.type === 'meeting' ? 'bg-blue-50 border-blue-500 text-blue-900 hover:bg-blue-100' :
                              'bg-amber-50 border-amber-500 text-amber-900 hover:bg-amber-100'
                          }`}>
                              <div className="font-semibold">{new Date(event.start).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
                              <div className="truncate">{event.title}</div>
                          </div>
                      ))}
                   </div>
                   
                   {dayObj.day && (
                       <Link 
                           href={`${pathname}?${(() => {
                               const params = new URLSearchParams(searchParams.toString());
                               params.set('new_appointment', 'true');
                               if (dayObj.date) {
                                   params.set('date', dayObj.date.toISOString().split('T')[0]);
                               }
                               return params.toString();
                           })()}`}
                           title="Add event" 
                           onClick={(e) => e.stopPropagation()}
                           className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-slate-50 hover:bg-secondary/10 text-slate-400 hover:text-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
                       >
                           <Plus className="w-4 h-4" />
                       </Link>
                   )}
                </div>
             )))}
          </div>
        </div>
      );
}
