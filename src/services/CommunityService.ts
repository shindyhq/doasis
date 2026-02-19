import { createClient } from '@/lib/supabase/client';
import { CommunityPost } from '@/types/custom';

export const CommunityService = {
  async getPosts() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('community_posts')
      .select('*, author:author_id(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as CommunityPost[];
  },

  async createPost(authorId: string, content: string, category: string = 'General') {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('community_posts')
      .insert({ author_id: authorId, content, category })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async toggleLike(postId: string, currentLikes: number) {
    const supabase = createClient();
    // Simplified like logic (just incrementing for now, real app needs like table)
    const { error } = await supabase
      .from('community_posts')
      .update({ likes_count: currentLikes + 1 })
      .eq('id', postId);

    if (error) throw error;
  }
};
