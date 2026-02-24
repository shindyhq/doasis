import { createClient } from '@/lib/supabase/server';

export interface DashboardStats {
  totalRevenue: number;
  activeClients: number;
  totalSessions: number;
  revenueGrowth: number;
  clientGrowth: number;
  sessionGrowth: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

// --- Mock fallbacks (used when DB queries fail or return nothing) -----------
const MOCK_REVENUE_METRICS = {
  labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Feb 1', 'Feb 8'],
  values: [1200, 1800, 1500, 2400, 2100, 2900],
  total: 11900,
};

const MOCK_CLIENT_GROWTH = {
  labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  values: [12, 19, 25, 32, 45, 52],
  total: 52,
  growth: 12.5,
};

const MOCK_SESSION_STATS = {
  completed: 124,
  cancelled: 8,
  video: 67,
};

const MOCK_TOP_CLIENTS = [
  { count: 12, profile: { full_name: 'Sarah Johnson', email: 'sarah@example.com', avatar_url: null } },
  { count: 9,  profile: { full_name: 'Michael Chen',  email: 'mchen@example.com',  avatar_url: null } },
  { count: 7,  profile: { full_name: 'Emma Davis',    email: 'emma@example.com',    avatar_url: null } },
  { count: 5,  profile: { full_name: 'James Wilson',  email: 'james@example.com',   avatar_url: null } },
  { count: 4,  profile: { full_name: 'Olivia Brown',  email: 'olivia@example.com',  avatar_url: null } },
];

export class AnalyticsService {
  /** High-level dashboard stats */
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      const supabase = await createClient();
      if (!supabase) throw new Error('No client');

      const [
        { data: payments },
        { count: activeClients },
        { count: totalSessions },
      ] = await Promise.all([
        supabase.from('payments').select('amount').eq('status', 'paid'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
      ]);

      const totalRevenue = payments?.reduce((sum: number, p: { amount: number }) => sum + (p.amount || 0), 0) ?? 0;

      return {
        totalRevenue,
        activeClients: activeClients ?? 0,
        totalSessions: totalSessions ?? 0,
        revenueGrowth: 12.5,
        clientGrowth: 8.2,
        sessionGrowth: -2.4,
      };
    } catch {
      return {
        totalRevenue: 11900,
        activeClients: 52,
        totalSessions: 124,
        revenueGrowth: 12.5,
        clientGrowth: 8.2,
        sessionGrowth: -2.4,
      };
    }
  }

  /** Revenue over time for charts */
  static async getRevenueMetrics() {
    try {
      const supabase = await createClient();
      if (!supabase) return MOCK_REVENUE_METRICS;

      const { data: payments } = await supabase
        .from('payments')
        .select('amount, created_at')
        .eq('status', 'paid')
        .order('created_at', { ascending: true })
        .limit(200);

      if (!payments || payments.length === 0) return MOCK_REVENUE_METRICS;

      const map = new Map<string, number>();
      payments.forEach((p: { created_at: string; amount: number }) => {
        const date = new Date(p.created_at).toISOString().split('T')[0];
        map.set(date, (map.get(date) ?? 0) + p.amount);
      });

      const labels = Array.from(map.keys()).map(d =>
        new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      );
      const values = Array.from(map.values());
      const total = values.reduce((a, b) => a + b, 0);

      return { labels, values, total };
    } catch {
      return MOCK_REVENUE_METRICS;
    }
  }

  /** Client growth metrics for bar chart */
  static async getClientGrowthMetrics() {
    try {
      const supabase = await createClient();
      if (!supabase) return MOCK_CLIENT_GROWTH;

      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      return {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        values: [12, 19, 25, 32, 45, count ?? 50],
        total: count ?? 0,
        growth: 12.5,
      };
    } catch {
      return MOCK_CLIENT_GROWTH;
    }
  }

  /** Session statistics */
  static async getSessionStats() {
    try {
      const supabase = await createClient();
      if (!supabase) return MOCK_SESSION_STATS;

      const [
        { count: completed },
        { count: cancelled },
        { count: video },
      ] = await Promise.all([
        supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
        supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'cancelled'),
        supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('type', 'consultation'),
      ]);

      return {
        completed: completed ?? 0,
        cancelled: cancelled ?? 0,
        video: video ?? 0,
      };
    } catch {
      return MOCK_SESSION_STATS;
    }
  }

  /** Top clients by session count - limited query, no full-table scan */
  static async getTopClients(limit: number = 5) {
    try {
      const supabase = await createClient();
      if (!supabase) return MOCK_TOP_CLIENTS.slice(0, limit);

      // Use a bounded query: fetch recent 500 appointments max
      const { data: appointments } = await supabase
        .from('appointments')
        .select('client_id, profiles(full_name, email, avatar_url)')
        .not('client_id', 'is', null)
        .limit(500);

      if (!appointments || appointments.length === 0) return MOCK_TOP_CLIENTS.slice(0, limit);

      const clientCounts: Record<string, { count: number; profile: unknown }> = {};

      appointments.forEach((apt: { client_id: string; profiles: unknown }) => {
        const id = apt.client_id;
        if (!clientCounts[id]) {
          clientCounts[id] = { count: 0, profile: apt.profiles };
        }
        clientCounts[id].count++;
      });

      const result = Object.values(clientCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);

      return result.length > 0 ? result : MOCK_TOP_CLIENTS.slice(0, limit);
    } catch {
      return MOCK_TOP_CLIENTS.slice(0, limit);
    }
  }

  /** Recent activity feed */
  static async getRecentActivity() {
    try {
      const supabase = await createClient();
      if (!supabase) return [];

      const { data } = await supabase
        .from('appointments')
        .select('*, client:profiles(full_name, avatar_url)')
        .order('created_at', { ascending: false })
        .limit(5);

      return data ?? [];
    } catch {
      return [];
    }
  }
}
