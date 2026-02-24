import { createClient } from '@/lib/supabase/server';

export interface MarketingCampaign {
  id: string;
  name: string;
  type: 'Email' | 'Automated' | 'SMS' | 'Newsletter';
  status: 'active' | 'draft' | 'archived' | 'scheduled';
  sent_count: number;
  opened_count: number;
  clicked_count: number;
  scheduled_at?: string;
  created_at: string;
  created_by?: string;
}

export class MarketingService {
  static async getCampaigns() {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('marketing_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Gracefully handle missing table during initial setup
      if (error.code === '42P01') {
        console.warn('Marketing campaigns table not found. Returning empty list.');
        return [];
      }
      console.error('Error fetching campaigns:', error);
      return [];
    }
    return data as MarketingCampaign[] || [];
  }

  static async createCampaign(campaign: Partial<MarketingCampaign>) {
    const supabase = await createClient();
    if (!supabase) throw new Error('Supabase client not available');

    const { data, error } = await supabase
      .from('marketing_campaigns')
      .insert(campaign)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateCampaign(id: string, updates: Partial<MarketingCampaign>) {
    const supabase = await createClient();
    if (!supabase) throw new Error('Supabase client not available');

    const { data, error } = await supabase
      .from('marketing_campaigns')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteCampaign(id: string) {
    const supabase = await createClient();
    if (!supabase) throw new Error('Supabase client not available');

    const { error } = await supabase
      .from('marketing_campaigns')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async getMarketingStats() {
    const campaigns = await this.getCampaigns();
    
    const totalSent = campaigns.reduce((sum, c) => sum + (c.sent_count || 0), 0);
    const totalOpened = campaigns.reduce((sum, c) => sum + (c.opened_count || 0), 0);
    const totalClicked = campaigns.reduce((sum, c) => sum + (c.clicked_count || 0), 0);

    const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
    const clickRate = totalSent > 0 ? (totalClicked / totalSent) * 100 : 0;

    return {
      totalSent,
      totalOpened,
      totalClicked,
      openRate,
      clickRate,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length
    };
  }
}
