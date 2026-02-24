import { createClient } from '@/lib/supabase/server';
import { Form, FormResponse } from '@/types/custom';

export class FormService {
  /**
   * Get all forms
   */
  static async getForms(options: { publishedOnly?: boolean } = {}) {
    const supabase = await createClient();
    if (!supabase) return [];

    let query = supabase.from('forms').select('*');
    if (options.publishedOnly) {
      query = query.eq('is_published', true);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching forms:', error);
      return [];
    }
    return data as Form[];
  }

  /**
   * Get responses for a specific form
   */
  static async getFormResponses(formId: string) {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('form_responses')
      .select('*, profile:profiles(full_name, email, avatar_url)')
      .eq('form_id', formId)
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching responses:', error);
      return [];
    }
    return data;
  }

  /**
   * Get recent responses across all forms
   */
  static async getRecentResponses(limit: number = 5) {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('form_responses')
      .select('*, profile:profiles(full_name, email, avatar_url)')
      .order('submitted_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent responses:', error);
      return [];
    }
    return data as (FormResponse & { profile: any })[];
  }

  /**
   * Create a form response
   */
  static async submitResponse(response: Partial<FormResponse>) {
    const supabase = await createClient();
    if (!supabase) throw new Error('Supabase client not available');

    const { data, error } = await supabase
      .from('form_responses')
      .insert(response)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Create a new form
   */
  static async createForm(form: Partial<Form>) {
    const supabase = await createClient();
    if (!supabase) throw new Error('Supabase client not available');

    const { data, error } = await supabase
      .from('forms')
      .insert(form)
      .select()
      .single();

    if (error) throw error;
    return data as Form;
  }

  /**
   * Update an existing form
   */
  static async updateForm(id: string, updates: Partial<Form>) {
    const supabase = await createClient();
    if (!supabase) throw new Error('Supabase client not available');

    const { data, error } = await supabase
      .from('forms')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Form;
  }

  /**
   * Delete a form
   */
  static async deleteForm(id: string) {
    const supabase = await createClient();
    if (!supabase) throw new Error('Supabase client not available');

    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
