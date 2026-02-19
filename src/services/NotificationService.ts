import { createClient } from '@/lib/supabase/client';
import { Notification } from '@/types/custom';

export const NotificationService = {
  async getUserNotifications(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Notification[];
  },

  async markAllAsRead(userId: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId);

    if (error) throw error;
  },

  async createNotification(userId: string, title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') {
    const supabase = createClient();
    const { error } = await supabase
      .from('notifications')
      .insert({ user_id: userId, title, message, type });

    if (error) throw error;
  }
};
