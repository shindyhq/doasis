import { createClient } from '@/lib/supabase/server';
import { Appointment } from '@/types/custom';

export class AppointmentService {
  static async getUpcomingAppointments(userId: string) {
    const supabase = await createClient();
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'scheduled')
      .gte('scheduled_at', new Date().toISOString())
      .order('scheduled_at', { ascending: true })
      .limit(5);

    if (error) throw error;
    return data;
  }

  static async getAppointmentHistory(userId: string) {
    const supabase = await createClient(); // Fixed: Added await
    
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['completed', 'cancelled', 'noshow'])
      .order('scheduled_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createAppointment(appointment: Partial<Appointment>) {
    const supabase = await createClient(); // Fixed: Added await
    
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointment)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
