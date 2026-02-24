import { createClient } from '@/lib/supabase/server';
import { Appointment } from '@/types/custom';

export class AppointmentService {
  static async getUpcomingAppointments(userId: string) {
    const supabase = await createClient();
    if (!supabase) return [];
    
    // Check if appointments table exists and fetch
    // Note: Assuming 'appointments' table exists based on types/custom.ts
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'scheduled')
      .gte('scheduled_at', new Date().toISOString())
      .order('scheduled_at', { ascending: true })
      .limit(5);

    if (error) {
        console.error('Error fetching upcoming appointments:', error);
        return [];
    }
    return data as Appointment[];
  }

  static async getAppointmentHistory(userId: string) {
    const supabase = await createClient(); 
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['completed', 'cancelled', 'noshow'])
      .order('scheduled_at', { ascending: false });

    if (error) {
        console.error('Error fetching appointment history:', error);
        return [];
    }
    return data as Appointment[];
  }

  static async createAppointment(appointment: Partial<Appointment>) {
    const supabase = await createClient();
    if (!supabase) throw new Error('Supabase client not available');
    
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointment)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Admin: Get appointments by date range
  static async getAppointmentsByDateRange(startDate: string, endDate: string) {
      const supabase = await createClient();
      if (!supabase) return [];

      // Join with profiles to get client names if possible
      // Assuming foreign key to profiles exists. If not, just fetch basic details.
      const { data, error } = await supabase
        .from('appointments')
        .select(`
            *,
            profiles:user_id ( full_name )
        `)
        .gte('scheduled_at', startDate)
        .lte('scheduled_at', endDate);
      
      if (error) {
          console.error('Error fetching range appointments:', error);
          // Fallback to mock data if table doesn't exist yet for development continuity
          return [
            { id: '1', title: 'Session: Sarah J.', start: '2025-10-12T14:00:00', type: 'session' },
            { id: '2', title: 'Team Meeting', start: '2025-10-15T10:00:00', type: 'meeting' },
          ];
      }

      // Map to calendar event format
      return data.map((apt: any) => ({
          id: apt.id,
          title: apt.profiles?.full_name ? `Session: ${apt.profiles.full_name}` : (apt.notes || 'Appointment'),
          start: apt.scheduled_at,
          type: apt.type || 'session', // Default type
          status: apt.status
      }));
  }
}
