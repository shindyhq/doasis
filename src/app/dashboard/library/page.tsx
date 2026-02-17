import { createClient, getUser } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { 
  Video, 
  Play, 
  Clock, 
  Calendar,
  Search,
  ChevronRight,
  MonitorPlay
} from 'lucide-react';

export default async function LibraryPage() {
  const { data: { user } } = await getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
            Voices of Wisdom
          </p>
          <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
            Session <span className="font-serif italic text-secondary">Library</span>
          </h1>
          <p className="mt-4 text-lg font-serif italic text-primary/60 max-w-xl">
            Revisit your recorded sessions. Listen back to the insights and breakthroughs shared in the sanctuary.
          </p>
        </div>
      </section>

      {/* Featured Recording */}
      <section className="space-y-6">
        <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70 px-4">
          Latest Recording
        </h3>
        <div className="relative aspect-[21/9] w-full bg-primary overflow-hidden rounded-[40px] group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent z-10" />
          {/* Placeholder for Video Thumbnail */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-xl scale-110">
             <Video size={300} className="text-white" />
          </div>
          
          <div className="absolute bottom-10 left-10 z-20 space-y-6 max-w-2xl px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent text-primary font-display text-[11px] uppercase tracking-widest font-bold rounded-lg shadow-xl shadow-black/20">
              <MonitorPlay size={14} />
              Featured Recording
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-none mb-4">
                The Weight of Quiet
              </h2>
              <div className="flex items-center gap-6 text-white/85 font-display text-[11px] uppercase tracking-[0.25em] font-bold">
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-accent" /> Feb 08, 2026
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-accent" /> 58 Minutes
                </span>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
              <Play size={32} fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* Recording Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        {[
          { title: 'Naming the Void', date: 'Feb 01, 2026', duration: '62m', thumbnail: 'Identity' },
          { title: 'First Breath in the Desert', date: 'Jan 25, 2026', duration: '45m', thumbnail: 'General' },
          { title: 'The Invitation to Rest', date: 'Jan 18, 2026', duration: '55m', thumbnail: 'Practice of Rest' },
        ].map((video, i) => (
          <div key={i} className="group cursor-pointer space-y-4">
            <div className="aspect-video bg-white/50 border border-primary/5 rounded-[32px] overflow-hidden relative">
               <div className="absolute inset-0 flex items-center justify-center opacity-5 text-primary">
                 <Video size={100} />
               </div>
               <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500" />
               <div className="absolute bottom-4 right-4 font-display text-[11px] uppercase tracking-widest font-bold bg-white/90 backdrop-blur px-3 py-1 rounded-md text-primary">
                 {video.duration}
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                    <Play size={20} fill="currentColor" className="ml-1" />
                  </div>
               </div>
            </div>
            <div className="px-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-display text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
                    {video.thumbnail}
                  </p>
                  <span className="font-display text-[11px] uppercase tracking-widest font-bold text-primary/60">
                    {video.date}
                  </span>
                </div>
               <h5 className="font-display font-bold text-primary group-hover:text-accent transition-colors">
                 {video.title}
               </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
