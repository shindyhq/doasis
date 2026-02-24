import { AnalyticsService } from '@/services/AnalyticsService';
import { RevenueChart } from '@/components/dashboard/admin/analytics/RevenueChart';
import { ClientGrowthChart } from '@/components/dashboard/admin/analytics/ClientGrowthChart';
import { SessionStats } from '@/components/dashboard/admin/analytics/SessionStats';
import { TopClientsTable } from '@/components/dashboard/admin/analytics/TopClientsTable';
import { Download } from 'lucide-react';
import { ComingSoonButton } from '@/components/ui/ComingSoonButton';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  // Fetch all analytics data in parallel
  const [revenueMetrics, clientGrowthMetrics, sessionStats, topClients] = await Promise.all([
    AnalyticsService.getRevenueMetrics(),
    AnalyticsService.getClientGrowthMetrics(),
    AnalyticsService.getSessionStats(),
    AnalyticsService.getTopClients(5)
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 font-display">Analytics & Insights</h1>
                <p className="text-slate-500 mt-1">Performance metrics and client engagement data.</p>
            </div>
            
            <ComingSoonButton 
                title="Export Report"
                className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
            >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
            </ComingSoonButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 space-y-6">
                <RevenueChart data={revenueMetrics} />
                <TopClientsTable clients={topClients} />
            </div>
            <div className="space-y-6">
                <ClientGrowthChart data={clientGrowthMetrics} />
                <SessionStats data={sessionStats} />
                
                {/* Additional Detailed Stats Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Focus Areas Analysis</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Anxiety & Stress', pct: 45, color: 'bg-primary' },
                            { label: 'Relationship Issues', pct: 28, color: 'bg-rose-400' },
                            { label: 'Career Guidance', pct: 15, color: 'bg-emerald-500' },
                            { label: 'Other', pct: 12, color: 'bg-slate-300' }
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <i className="font-medium text-slate-700 not-italic">{item.label}</i>
                                    <span className="text-slate-500">{item.pct}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className={`${item.color} h-2 rounded-full w-[var(--focus-width)]`} style={{ '--focus-width': `${item.pct}%` } as React.CSSProperties} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
