import { createClient } from '@/lib/supabase/server';
import { GoalsPageClient } from './GoalsPageClient';
import { Goal } from '@/types/custom';

export const dynamic = 'force-dynamic';

export default async function GoalsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in to view goals.</div>;
  }

  // Fetch initial data (server-side for SEO/Performance)
  const { data } = await supabase
    .from('goals')
    .select(`
      *,
      milestones:goal_milestones(*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Transform to match Goal type (sort milestones)
  const goals = (data || []).map((goal: any) => ({
    ...goal,
    milestones: (goal.milestones || []).sort((a: any, b: any) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
  })) as Goal[];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Your Journey
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Goals & Milestones
        </h1>
        <p className="mt-6 text-lg font-serif italic text-primary/60 max-w-2xl leading-relaxed">
          "Set your mind on things above, where your true life is hidden."
        </p>
      </header>
      
      <GoalsPageClient initialGoals={goals} />
    </div>
  );
}
