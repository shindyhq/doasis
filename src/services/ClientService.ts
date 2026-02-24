import { createClient } from '@/lib/supabase/server';
import { UserProfile } from '@/types/custom';

export class ClientService {
  /**
   * Fetch current user profile
   */
  static async getProfile() {
    const supabase = await createClient();
    if (!supabase) return null;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
       console.error('Error fetching profile:', error);
       return null;
    }
    
    return data as UserProfile;
  }

  /**
   * Update user profile
   */
  static async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const supabase = await createClient();
    if (!supabase) throw new Error('Supabase client not available');

    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get all clients with filtering and pagination
   */
  static async getClients(params: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const supabase = await createClient();
    if (!supabase) return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };

    const page = params.page || 1;
    const limit = params.limit || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('role', 'client')
        .order('created_at', { ascending: false })
        .range(from, to);

    if (params.search) {
        query = query.ilike('full_name', `%${params.search}%`);
    }

    // Note: 'status' is not yet in UserProfile schema, assuming all clients are "Active" for now 
    // or filtering if status column exists in future.
    // if (params.status && params.status !== 'All') {
    //    query = query.eq('status', params.status.toLowerCase()); 
    // }

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching clients:', error);
        return { data: [], meta: { total: 0, page, limit, totalPages: 0 } };
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
        data: data as UserProfile[],
        meta: {
            total,
            page,
            limit,
            totalPages
        }
    };
  }
}
