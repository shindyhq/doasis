import { createClient, getUser } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Star 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default async function DashboardPage() {
  const { data: { user } } = await getUser();

  if (!user) {
    return redirect('/login');
  }

  const userDisplayName = user.user_metadata?.full_name || user.email?.split('@')[0];

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Peace be with you
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Welcome Home, <span className="font-serif italic">{userDisplayName}</span>
        </h1>
        <p className="mt-6 text-lg font-serif italic text-primary/60 max-w-2xl leading-relaxed">
          This is your quiet corner of the sanctuary. Here, your journey is honored, your story is safe, and your progress is celebrated in the stillness.
        </p>
      </section>

      {/* Quick Stats/Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Upcoming Session', value: 'Feb 15, 2:00 PM', icon: Calendar, color: 'text-accent' },
          { label: 'Completed Reflections', value: '8 Sessions', icon: BookOpen, color: 'text-secondary' },
          { label: 'Current Plan', value: 'The Becoming', icon: Star, color: 'text-primary' },
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[32px] border border-primary/5 flex flex-col gap-4">
            <div className={`p-3 rounded-2xl bg-white w-fit ${stat.color} shadow-sm`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="font-display text-[12px] uppercase tracking-widest font-bold text-primary/70 mb-1">
                {stat.label}
              </p>
              <p className="text-xl font-display font-bold text-primary">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Actions/Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        {/* Next Session Widget */}
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
                <p className="text-accent font-serif italic text-xl">Thursday Afternoon</p>
                <h4 className="text-4xl font-display font-medium tracking-tight">Grief & Identity Workshop</h4>
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

        {/* Recent Journal Entries */}
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
          <div className="space-y-4">
            {[
              { date: 'Feb 08', title: 'The Weight of Quiet', category: 'Reflections' },
              { date: 'Feb 01', title: 'Naming the Void', category: 'Identity' },
              { date: 'Jan 25', title: 'First Breath in the Desert', category: 'Grief' },
            ].map((entry, i) => (
              <button 
                key={i}
                className="w-full flex items-center gap-6 p-6 rounded-[24px] bg-white/50 hover:bg-white transition-all group border border-primary/5 hover:border-accent/20 hover:shadow-2xl hover:shadow-black/5 active:scale-[0.99] duration-500"
              >
                <div className="flex flex-col items-center justify-center min-w-[64px] h-[64px] bg-primary/5 rounded-2xl group-hover:bg-accent/10 transition-colors">
                  <span className="font-display text-[11px] uppercase tracking-widest font-bold text-primary/60">
                    {entry.date.split(' ')[0]}
                  </span>
                  <span className="font-display text-[13px] font-bold text-primary">
                    {entry.date.split(' ')[1]}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-display text-[11px] uppercase tracking-[0.3em] font-bold text-accent mb-2">
                    {entry.category}
                  </p>
                  <h5 className="font-display font-bold text-primary text-lg">
                    {entry.title}
                  </h5>
                </div>
                <ArrowRight size={18} className="text-primary/10 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add Link import
import Link from 'next/link';
