'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';

export async function updateProfile(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: 'Database connection failed' };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const bio = formData.get('bio') as string;
  const location = formData.get('location') as string;
  const avatarUrl = formData.get('avatarUrl') as string;

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      full_name: fullName,
      phone: phone,
      bio: bio,
      location: location,
      updated_at: new Date().toISOString(),
      avatar_url: avatarUrl || undefined
    }, { onConflict: 'id' });

  if (error) {
    console.error('Update profile error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard/admin/settings');
  return { success: true };
}

export async function uploadAvatarAction(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: 'Database connection failed' };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const file = formData.get('file') as File;
  if (!file) return { success: false, error: 'No file provided' };

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}/${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return { success: false, error: uploadError.message };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  // Update profile with new avatar URL
  const { error: updateError } = await supabase
    .from('profiles')
    .upsert({ 
      id: user.id, 
      avatar_url: publicUrl,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });

  if (updateError) {
    console.error('Update profile with avatar error:', updateError);
    return { success: false, error: updateError.message };
  }

  revalidatePath('/dashboard/admin/settings');
  return { success: true, url: publicUrl };
}

export async function updateNotifications(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: 'Database connection failed' };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const emailNotifs = formData.get('emailNotifs') === 'on';
  const smsNotifs = formData.get('smsNotifs') === 'on';

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      preferred_communication: emailNotifs ? 'email' : (smsNotifs ? 'sms' : 'none'),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });

  if (error) {
    console.error('Update notifications error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard/admin/settings');
  return { success: true };
}

export async function updateSystem(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: 'Database connection failed' };

  const newPassword = formData.get('newPassword') as string;

  if (newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      console.error('Password update failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  revalidatePath('/dashboard/admin/settings');
  return { success: true };
}
