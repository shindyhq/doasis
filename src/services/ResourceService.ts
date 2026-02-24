import { createClient } from '@/lib/supabase/server';
import { Resource, ClientResource } from '@/types/custom';

export class ResourceService {
  /**
   * Get all resources
   */
  static async getResources() {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
        
    return (data || []) as Resource[];
  }

  /**
   * Get resources assigned to a client
   */
  static async getClientResources(userId: string) {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data } = await supabase
        .from('client_resources')
        .select('*, resource:resources(*)')
        .eq('user_id', userId);
        
    return (data || []) as ClientResource[];
  }

  /**
   * Create a new resource
   */
  static async createResource(resource: Partial<Resource>) {
      const supabase = await createClient();
      if (!supabase) throw new Error('Supabase client not available');

      const { data, error } = await supabase
          .from('resources')
          .insert(resource)
          .select()
          .single();

      if (error) throw error;
      return data;
  }
  /**
   * Update an existing resource
   */
  static async updateResource(id: string, updates: Partial<Resource>) {
    const supabase = await createClient();
    if (!supabase) throw new Error('Supabase client not available');

    const { data, error } = await supabase
      .from('resources')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Delete a resource
   */
  static async deleteResource(id: string) {
    const supabase = await createClient();
    if (!supabase) throw new Error('Supabase client not available');

    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
