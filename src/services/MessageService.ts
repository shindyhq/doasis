import { createClient } from '@/lib/supabase/client';
import { Message } from '@/types/custom';

export const MessageService = {
  async getConversations(userId: string) {
    const supabase = createClient();
    
    // Get all messages where user is sender OR receiver
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:sender_id(*), receiver:receiver_id(*)')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Message[];
  },

  async sendMessage(senderId: string, receiverId: string, content: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('messages')
      .insert({ sender_id: senderId, receiver_id: receiverId, content })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async markAsRead(messageIds: string[]) {
    const supabase = createClient();
    const { error } = await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .in('id', messageIds);

    if (error) throw error;
  }
};
