import { createClient, getUser } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { 
  BookOpen, 
  Search, 
  Filter,
  Download,
  FileText,
  ChevronRight
} from 'lucide-react';

export default async function JournalPage() {
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
            The Written Path
          </p>
          <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
            Session <span className="font-serif italic text-secondary">Journal</span>
          </h1>
          <p className="mt-4 text-lg font-serif italic text-primary/60 max-w-xl">
            Access your session records, summaries, and shared reflections. A sanctuary for your evolving story.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search your journey..." 
            className="w-full bg-white border border-primary/5 rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all outline-none text-primary"
          />
        </div>
        <button className="px-6 py-4 bg-white border border-primary/5 rounded-2xl flex items-center gap-3 font-display text-[12px] uppercase tracking-widest font-bold text-primary/70 hover:text-primary hover:border-accent transition-all">
          <Filter size={18} />
          All Categories
        </button>
      </div>

      {/* Journal entries grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { date: 'Feb 08, 2026', title: 'The Weight of Quiet', category: 'Grief', excerpt: 'Today we explored the silence that follows loss. Not as a void, but as a space for holding what remains...' },
          { date: 'Feb 01, 2026', title: 'Naming the Void', category: 'Identity', excerpt: 'When labels fall away, who is the woman that remains? We began mapping the landscape of the "in-between"...' },
          { date: 'Jan 25, 2026', title: 'First Breath in the Desert', category: 'General', excerpt: 'Setting the foundation for our work together. The desert is not empty; it is a place of profound clarity...' },
          { date: 'Jan 18, 2026', title: 'The Invitation to Rest', category: 'The Practice of Rest', excerpt: 'Reflecting on the distinction between exhaustion and the holy invitation to deep, cellular rest...' },
        ].map((entry, i) => (
          <div key={i} className="glass p-10 rounded-[40px] border border-primary/5 space-y-8 group hover:shadow-2xl hover:shadow-black/5 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.3em] font-bold text-accent mb-2">
                  {entry.category}
                </p>
                <h4 className="text-3xl font-display font-medium tracking-tight text-primary">
                  {entry.title}
                </h4>
              </div>
              <div className="p-3 bg-primary/5 rounded-2xl text-primary/40">
                <FileText size={20} />
              </div>
            </div>
            
            <p className="font-serif italic text-primary/60 leading-relaxed line-clamp-3">
              "{entry.excerpt}"
            </p>

            <div className="pt-4 border-t border-primary/5 flex items-center justify-between">
              <span className="font-display text-[11px] uppercase tracking-widest font-bold text-primary/60">
                Recorded {entry.date}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  title="Download Record"
                  className="p-3 rounded-xl hover:bg-primary hover:text-background text-primary/40 transition-all"
                >
                  <Download size={18} />
                </button>
                <button className="px-5 py-3 rounded-xl bg-primary text-background font-display text-[11px] uppercase tracking-widest font-bold hover:bg-accent hover:text-primary transition-all flex items-center gap-2">
                  Read Record
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
