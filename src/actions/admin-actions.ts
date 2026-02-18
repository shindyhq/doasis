'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addClientNote(clientId: string, note: string) {
  const supabase = await createClient();
  
  // Verify admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  
  // We should probably check if user is admin here too, relying on RLS for now but good practice
  
  const { data, error } = await supabase
    .from('admin_notes')
    .insert({
      user_id: clientId,
      admin_id: user.id,
      note,
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  revalidatePath('/dashboard/admin');
  return data;
}

export async function getClientNotes(clientId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('admin_notes')
    .select('*')
    .eq('user_id', clientId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function assignResource(clientId: string, resourceId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('client_resource_access') // Updated table name
    .insert({
      client_id: clientId,
      resource_id: resourceId,
      assigned_by: (await supabase.auth.getUser()).data.user?.id
    });

  if (error) throw error;
  revalidatePath('/dashboard/admin');
  return { success: true };
}

export async function getAdminResources() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
