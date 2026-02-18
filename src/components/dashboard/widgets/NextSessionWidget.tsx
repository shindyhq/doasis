'use client';

import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Appointment } from '@/types/custom';

interface NextSessionWidgetProps {
  appointment: Appointment | null;
}

export const NextSessionWidget = ({ appointment }: NextSessionWidgetProps) => {
  if (!appointment) {
    return (
     <div className="space-y-8">
        <div className="flex items-center justify-between px-4">
          <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70">
            Your Next Reflection
          </h3>
          <Button 
            href="/dashboard/appointments" 
            variant="ghost" 
            className="px-4 py-2 text-[10px]"
          >
            Schedule
          </Button>
        </div>
        <div className="bg-primary/5 rounded-[40px] p-10 flex items-center justify-center min-h-[300px]">
          <p className="text-primary/60 font-serif italic text-lg">No upcoming sessions scheduled.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-4">
        <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70">
          Your Next Reflection
        </h3>
        <Button 
          href="/dashboard/appointments" 
          variant="ghost" 
          className="px-4 py-2 text-[10px]"
        >
          Reschedule
        </Button>
      </div>
      <div className="bg-primary text-background rounded-[40px] p-10 relative overflow-hidden group shadow-2xl shadow-primary/20">
        <div className="relative z-10 flex flex-col h-full justify-between gap-12">
          <div className="space-y-2">
            <p className="text-accent font-serif italic text-xl">
              {/* TODO: Format relative time, e.g., "Thursday Afternoon" */}
              Upcoming Session
            </p>
            <h4 className="text-4xl font-display font-medium tracking-tight">
              {appointment.type || 'Coaching Session'}
            </h4>
            <div className="flex items-center gap-3 text-background/70 text-[11px] mt-6 font-display font-bold uppercase tracking-widest">
              <Clock size={16} />
              <span>60 Minutes • Zoom Sanctuary</span>
            </div>
          </div>
          <Button variant="secondary" className="w-fit px-8 py-4 group">
            Enter Waiting Room
            <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        {/* Abstract Background Element */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 blur-[80px] rounded-full" />
      </div>
    </div>
  );
};
