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
      return { totalEntries: 0 };
    }

    return {
      totalEntries: count || 0
    };
  }
}
