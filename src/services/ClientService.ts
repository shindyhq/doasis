import { createClient } from '@/lib/supabase/server';
import { UserProfile } from '@/types/custom';

export class ClientService {
  static async getProfile(userId: string) {
    const supabase = await createClient(); // createClient is async
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const supabase = await createClient(); // Fixed: Added await
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Admin: Get all clients
  static async getAllClients() {
    const supabase = await createClient(); // Fixed: Added await
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'client')
      .order('full_name', { ascending: true });

    if (error) throw error;
    return data;
  }
}
