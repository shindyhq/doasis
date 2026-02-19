import { createClient, getUser } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { 
  BookOpen, 
  Search, 
  Filter,
  Download,
  FileText,
  ChevronRight
} from 'lucide-react';
import { JournalService } from '@/services/JournalService';
import { format } from 'date-fns';

export default async function JournalPage() {
  const { data: { user } } = await getUser();

  if (!user) {
    return redirect('/login');
  }

  const entries = await JournalService.getRecentEntries(user.id, 50); // Fetch up to 50 for now

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
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 glass rounded-[40px] border border-primary/5 text-center space-y-6">
          <div className="p-6 rounded-full bg-primary/5 text-primary/40">
            <BookOpen size={48} />
          </div>
          <div>
             <h3 className="text-2xl font-display font-medium text-primary">Your Journal is Quiet</h3>
             <p className="font-serif italic text-primary/60 mt-2 max-w-md mx-auto">
               The pages are waiting for your story. Entries will appear here once your journey begins.
             </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {entries.map((entry) => (
            <div key={entry.id} className="glass p-10 rounded-[40px] border border-primary/5 space-y-8 group hover:shadow-2xl hover:shadow-black/5 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-[11px] uppercase tracking-[0.3em] font-bold text-accent mb-2">
                    {entry.mood || 'Reflection'}
                  </p>
                  <h4 className="text-3xl font-display font-medium tracking-tight text-primary line-clamp-2">
                    {entry.title}
                  </h4>
                </div>
                <div className="p-3 bg-primary/5 rounded-2xl text-primary/40 group-hover:bg-accent group-hover:text-primary transition-colors duration-500">
                  <FileText size={20} />
                </div>
              </div>
              
              <p className="font-serif italic text-primary/60 leading-relaxed line-clamp-3">
                "{entry.content || 'No content provided...'}"
              </p>

              <div className="pt-4 border-t border-primary/5 flex items-center justify-between">
                <span className="font-display text-[11px] uppercase tracking-widest font-bold text-primary/60">
                  Recorded {format(new Date(entry.created_at), 'MMM dd, yyyy')}
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
      )}
    </div>
  );
}
