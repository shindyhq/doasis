import { createClient } from '@/lib/supabase/client';
import { CheckIn } from '@/types/custom';

export const CheckInService = {
  /**
   * Log a new check-in or update today's existing check-in
   */
  async logCheckIn(moodScore: number, note?: string) {
    const supabase = createClient();
    
    try {
      // 1. Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // 2. Check if a check-in already exists for today (in UTC)
      const today = new Date();
      const startOfDay = new Date(today.setUTCHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(today.setUTCHours(23, 59, 59, 999)).toISOString();

      const { data: existing } = await supabase
        .from('check_ins')
        .select('id')
        .eq('user_id', user.id)
        .gte('created_at', startOfDay)
        .lte('created_at', endOfDay)
        .single();

      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from('check_ins')
          .update({ mood_score: moodScore, note })
          .eq('id', existing.id)
          .select()
          .single();
          
        if (error) throw error;
        return data as CheckIn;
      } else {
        // Create new
        const { data, error } = await supabase
          .from('check_ins')
          .insert({
            user_id: user.id,
            mood_score: moodScore,
            note
          })
          .select()
          .single();

        if (error) throw error;
        return data as CheckIn;
      }
    } catch (error) {
      console.error('Error logging check-in:', error);
      throw error;
    }
  },

  /**
   * Get today's check-in for the current user
   */
  async getTodayCheckIn() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    try {
      const today = new Date();
      const startOfDay = new Date(today.setUTCHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(today.setUTCHours(23, 59, 59, 999)).toISOString();

      const { data, error } = await supabase
        .from('check_ins')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', startOfDay)
        .lte('created_at', endOfDay)
        .maybeSingle();

      if (error) throw error;
      return data as CheckIn | null;
    } catch (error) {
      console.error('Error fetching today check-in:', error);
      return null;
    }
  }
};
