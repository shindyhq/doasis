import { createClient } from '@/lib/supabase/server';
import { JournalEntry } from '@/types/custom';

export class JournalService {
  static async getRecentEntries(userId: string, limit = 3) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching journal entries:', error);
      return [];
    }

    return data as JournalEntry[];
  }

  static async getStats(userId: string) {
    const supabase = await createClient();
    
    // Get total count
    const { count, error } = await supabase
      .from('journal_entries')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching journal stats:', error);
      return { totalEntries: 0, streak: 0 };
    }

    // Calculate streak
    const { data: entries } = await supabase
      .from('journal_entries')
      .select('created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    const streak = this.calculateStreak(entries?.map((e: { created_at: string }) => new Date(e.created_at)) || []);

    return {
      totalEntries: count || 0,
      streak
    };
  }

  private static calculateStreak(dates: Date[]): number {
    if (dates.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedDates = [...new Set(dates.map(d => {
      const copy = new Date(d);
      copy.setHours(0, 0, 0, 0);
      return copy.getTime();
    }))].sort((a, b) => b - a);

    let currentDate = sortedDates[0];
    const diff = Math.floor((today.getTime() - currentDate) / (1000 * 60 * 60 * 24));

    if (diff > 1) return 0;

    streak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = sortedDates[i-1];
        const thisDate = sortedDates[i];
        const dayDiff = Math.floor((prevDate - thisDate) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
  }
}
