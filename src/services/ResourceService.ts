import { createClient } from '@/lib/supabase/client';
import { Resource, ClientResource } from '@/types/custom';

export const ResourceService = {
  /**
   * Fetch all published resources, including user's specific progress
   */
  async getResources() {
    const supabase = createClient();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // 1. Fetch all published resources
      const { data: resources, error: resourceError } = await supabase
        .from('resources')
        .select('*')
        .eq('is_published', true)
        .order('category', { ascending: true });

      if (resourceError) throw resourceError;
      if (!resources) return [];

      let clientResourcesMap: Record<string, ClientResource> = {};

      // 2. If user exists, fetch their progress
      if (user) {
        const { data: clientResources, error: clientError } = await supabase
          .from('client_resources')
          .select('*')
          .eq('user_id', user.id);
          
        if (!clientError && clientResources) {
          clientResources.forEach((cr: any) => {
            clientResourcesMap[cr.resource_id] = cr;
          });
        }
      }

      // 3. Merge data
      return resources.map((res: any) => ({
        ...res,
        clientStatus: clientResourcesMap[res.id] || null
      }));

    } catch (error) {
      console.error('Error fetching resources:', error);
      return [];
    }
  },

  /**
   * Mark a resource as completed or update access time
   */
  async markAsAccessed(resourceId: string, isCompleted: boolean = false) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    try {
      // Check if exists
      const { data: existing } = await supabase
        .from('client_resources')
        .select('id')
        .eq('user_id', user.id)
        .eq('resource_id', resourceId)
        .single();

      if (existing) {
        const { data, error } = await supabase
          .from('client_resources')
          .update({
             last_accessed_at: new Date().toISOString(),
             status: isCompleted ? 'completed' : 'in_progress'
          })
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        return data as ClientResource;
      } else {
        const { data, error } = await supabase
          .from('client_resources')
          .insert({
            user_id: user.id,
            resource_id: resourceId,
            status: isCompleted ? 'completed' : 'in_progress',
            last_accessed_at: new Date().toISOString()
          })
          .select()
          .single();
        if (error) throw error;
        return data as ClientResource;
      }
    } catch (error) {
      console.error('Error updating resource status:', error);
      throw error;
    }
  }
};
