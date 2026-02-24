'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function inviteClient(formData: FormData) {
  const supabase = await createClient();
  
  // Basic Info
  const email = formData.get('email') as string;
  const full_name = formData.get('full_name') as string;
  const phone = formData.get('phone') as string;
  const dob = formData.get('dob') as string;
  
  // Biography
  const bio = formData.get('bio') as string;
  
  // Communication & Emergency
  const preferred_communication = formData.get('preferred_communication') as string;
  const emergency_contact_name = formData.get('emergency_contact_name') as string;
  const emergency_contact_phone = formData.get('emergency_contact_phone') as string;

  if (!email || !full_name) {
      console.error('Email and Name are required for invitation');
      return;
  }

  // Strategy for comprehensive client creation:
  // 1. In a production environment with service role:
  //    await supabase.auth.admin.inviteUserByEmail(email, { 
  //      data: { full_name, role: 'client' },
  //      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
  //    });
  
  // 2. For this demonstration/prototype phase:
  // We log the comprehensive bio and data captured.
  console.log('--- COMPREHENSIVE CLIENT INVITE captured ---');
  console.log('Identity:', { full_name, email, phone, dob });
  console.log('Biography:', bio);
  console.log('Preferences:', { preferred_communication });
  console.log('Emergency:', { emergency_contact_name, emergency_contact_phone });
  console.log('-------------------------------------------');

  // Triggering revalidation so the UI can show success/updates
  revalidatePath('/dashboard/admin/clients');
  redirect('/dashboard/admin/clients?new_client=false&success=true');
}

export async function updateClientProfile(clientId: string, data: { meeting_url?: string }) {
    const supabase = await createClient();
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return; // Handle error

    const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', clientId);

    if (error) {
        console.error('Error updating client profile:', error);
        throw error;
    }

    revalidatePath('/dashboard/admin/clients');
}

export async function assignResourceToClient(clientId: string, resourceId: string) {
    const supabase = await createClient();
    
    // Check if user is admin
    
    // Insert into client_resources
    const { error } = await supabase
        .from('client_resources')
        .insert({
            user_id: clientId,
            resource_id: resourceId,
            status: 'in_progress',
            last_accessed_at: new Date().toISOString()
        });

    if (error) {
        console.error('Error assigning resource:', error);
        throw error;
    }

    revalidatePath('/dashboard/admin/clients');
}
