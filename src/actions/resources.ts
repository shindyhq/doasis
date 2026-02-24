'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createResource(data: any) {
  const supabase = await createClient();
  
  // Basic validation
  if (!data.title || !data.url) throw new Error('Missing fields');

  const { data: resource, error } = await supabase
    .from('resources')
    .insert({
        ...data,
        is_published: true,
        created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
      console.error('Error creating resource:', error);
      throw error;
  }

  revalidatePath('/dashboard/admin/clients');
  revalidatePath('/dashboard/library');
  
  return resource;
}

export async function markResourceComplete(resourceId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // Check if record exists
    const { data: existing } = await supabase
        .from('client_resources')
        .select('*')
        .eq('user_id', user.id)
        .eq('resource_id', resourceId)
        .single();

    let result;

    if (existing) {
        const { data, error } = await supabase
            .from('client_resources')
            .update({ status: 'completed', last_accessed_at: new Date().toISOString() })
            .eq('id', existing.id)
            .select()
            .single();
        if (error) throw error;
        result = data;
    } else {
        // Create new record if not assigned (auto-assign on complete?)
        // Ideally we only mark assigned resources, but for library self-study:
        const { data, error } = await supabase
            .from('client_resources')
            .insert({
                user_id: user.id,
                resource_id: resourceId,
                status: 'completed',
                last_accessed_at: new Date().toISOString()
            })
            .select()
            .single();
        if (error) throw error;
        result = data;
    }

    revalidatePath('/dashboard/library');
    return result;
}
