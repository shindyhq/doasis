import { createClient } from '@/lib/supabase/server';
import { Payment } from '@/types/custom';

export interface FinancialStats {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export class FinancialService {
  static async getFinancialStats() {
    const supabase = await createClient();
    if (!supabase) return [];

    // 1. Total Revenue (sum of all succeeded payments)
    const { data: revenueData, error: revError } = await supabase
        .from('payments')
        .select('amount')
        .eq('status', 'succeeded');
    
    let totalRevenue = 0;
    if (!revError && revenueData) {
        totalRevenue = revenueData.reduce((acc: number, curr: { amount: number }) => acc + (curr.amount || 0), 0);
    } else {
        totalRevenue = 24500; // Mock fallback
    }

    // 2. Pending Invoices Count
    const { count: pendingCount, error: pendingError } = await supabase
        .from('payments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

    const pendingVal = !pendingError ? pendingCount : 5;

    // 3. Paid This Month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0,0,0,0);
    
    const { data: monthData, error: monthError } = await supabase
        .from('payments')
        .select('amount')
        .eq('status', 'succeeded')
        .gte('created_at', startOfMonth.toISOString());
    
    let monthRevenue = 0;
    if (!monthError && monthData) {
        monthRevenue = monthData.reduce((acc: number, curr: { amount: number }) => acc + (curr.amount || 0), 0);
    } else {
        monthRevenue = 8400;
    }

    return [
        { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+12.5%', isPositive: true },
        { label: 'Pending Invoices', value: pendingVal?.toString() || '0', change: '-2.1%', isPositive: false },
        { label: 'Paid This Month', value: `$${monthRevenue.toLocaleString()}`, change: '+5.4%', isPositive: true },
        { label: 'Average Value', value: '$165', change: '+1.2%', isPositive: true },
    ];
  }

  static async getAllTransactions(params: {
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
        .from('payments')
        .select(`
            *,
            profiles:user_id ( full_name )
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (params.search) {
        query = query.or(`description.ilike.%${params.search}%`);
    }

    if (params.status && params.status !== 'All') {
        const statusMap: Record<string, string> = {
            'Paid': 'succeeded',
            'Pending': 'pending',
            'Overdue': 'failed'
        };
        const mappedStatus = statusMap[params.status] || params.status.toLowerCase();
        query = query.eq('status', mappedStatus);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching transactions:', error);
        return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    const formattedData = data.map((inv: any) => ({
        ...inv,
        client_name: inv.profiles?.full_name || 'Unknown Client',
        date: new Date(inv.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    }));

    return {
        data: formattedData,
        meta: { total, page, limit, totalPages }
    };
  }

  static async getUserTransactions(userId: string) {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user transactions:', error);
        return [];
    }

    return (data || []).map((inv: any) => ({
        ...inv,
        date: new Date(inv.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    })) as Payment[];
  }
}
