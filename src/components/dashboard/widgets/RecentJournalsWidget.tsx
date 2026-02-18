'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { JournalEntry } from '@/types/custom';
import { format } from 'date-fns';
import Link from 'next/link';

interface RecentJournalsWidgetProps {
  entries: JournalEntry[];
}

export const RecentJournalsWidget = ({ entries }: RecentJournalsWidgetProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-4">
        <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70">
          Recent Journal Records
        </h3>
        <Button 
          href="/dashboard/journal" 
          variant="ghost" 
          className="px-4 py-2 text-[10px]"
        >
          View All
        </Button>
      </div>
      
      {entries.length === 0 ? (
        <div className="p-10 rounded-[24px] bg-primary/5 text-center">
            <p className="text-primary/60 font-serif italic mb-4">Your journal is waiting for your story.</p>
            <Button href="/dashboard/journal/new" variant="outline" className="text-xs">
                Write First Entry
            </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Link 
              key={entry.id}
              href={`/dashboard/journal/${entry.id}`}
              className="w-full flex items-center gap-6 p-6 rounded-[24px] bg-white/50 hover:bg-white transition-all group border border-primary/5 hover:border-accent/20 hover:shadow-2xl hover:shadow-black/5 active:scale-[0.99] duration-500"
            >
              <div className="flex flex-col items-center justify-center min-w-[64px] h-[64px] bg-primary/5 rounded-2xl group-hover:bg-accent/10 transition-colors">
                <span className="font-display text-[11px] uppercase tracking-widest font-bold text-primary/60">
                  {format(new Date(entry.created_at), 'MMM')}
                </span>
                <span className="font-display text-[13px] font-bold text-primary">
                  {format(new Date(entry.created_at), 'd')}
                </span>
              </div>
              <div className="flex-1 text-left">
                {entry.mood && (
                   <p className="font-display text-[11px] uppercase tracking-[0.3em] font-bold text-accent mb-2">
                     {entry.mood}
                   </p>
                )}
                <h5 className="font-display font-bold text-primary text-lg line-clamp-1">
                  {entry.title}
                </h5>
              </div>
              <ArrowRight size={18} className="text-primary/10 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
