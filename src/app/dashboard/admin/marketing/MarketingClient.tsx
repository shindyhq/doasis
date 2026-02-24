'use client';

import { useState } from 'react';
import {
  TrendingUp,
  Mail,
  Plus,
  Users,
  MousePointerClick,
  BarChart2,
  Send,
  Eye,
  ChevronRight,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import { MarketingCampaign } from '@/services/MarketingService';
import { NewCampaignModal } from '@/components/dashboard/admin/marketing/NewCampaignModal';
import { useRouter } from 'next/navigation';

interface MarketingClientProps {
  initialCampaigns: MarketingCampaign[];
  stats: {
    totalSent: number;
    openRate: number;
    clickRate: number;
    activeCampaigns: number;
  };
}

const QUICK_ACTIONS = [
  { label: 'Broadcast Email', sub: 'Send to all clients now', Icon: Send, cta: 'Compose' },
  { label: 'Automations', sub: 'Set up triggered sequences', Icon: Sparkles, cta: 'Configure' },
  { label: 'Subscriber List', sub: 'Manage your audience', Icon: Users, cta: 'View List' },
];

export function MarketingClient({ initialCampaigns, stats }: MarketingClientProps) {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh();
  };

  const STATS = [
    { label: 'Total Sent', value: stats.totalSent.toString(), sub: 'Across all time', Icon: Users, trend: 'up' },
    { label: 'Email Open Rate', value: `${Math.round(stats.openRate)}%`, sub: 'Average performance', Icon: Eye, trend: 'up' },
    { label: 'Click-Through Rate', value: `${Math.round(stats.clickRate)}%`, sub: 'Interaction rate', Icon: MousePointerClick, trend: 'up' },
    { label: 'Active Campaigns', value: stats.activeCampaigns.toString(), sub: 'Currently running', Icon: Send, trend: null },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Marketing & Campaigns</h1>
          <p className="text-slate-500 mt-1">Reach your community with intentional messaging. Track every campaign and grow with purpose.</p>
        </div>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm hover:shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(({ label, value, sub, Icon, trend }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary group-hover:bg-secondary/20 transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              {trend === 'up' && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <TrendingUp className="w-3 h-3" /> Up
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-slate-900 font-display">{value}</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">{label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Campaigns</h2>
          <button
            title="View analytics"
            className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary transition-colors"
          >
            <BarChart2 className="w-4 h-4" /> Analytics
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {initialCampaigns.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-400">
              No campaigns found. Start by creating your first one.
            </div>
          ) : initialCampaigns.map((c) => {
            const opRate = c.sent_count > 0 ? Math.round((c.opened_count / c.sent_count) * 100) : 0;
            const clRate = c.sent_count > 0 ? Math.round((c.clicked_count / c.sent_count) * 100) : 0;
            return (
              <div key={c.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary group-hover:bg-secondary/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.type} · {new Date(c.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center hidden md:block">
                    <p className="font-bold text-slate-900">{c.sent_count}</p>
                    <p className="text-xs text-slate-400">Sent</p>
                  </div>
                  <div className="text-center hidden md:block">
                    <p className="font-bold text-slate-900">{opRate}%</p>
                    <p className="text-xs text-slate-400">Opened</p>
                  </div>
                  <div className="text-center hidden md:block">
                    <p className="font-bold text-slate-900">{clRate}%</p>
                    <p className="text-xs text-slate-400">Clicked</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                      c.status === 'active' || c.status === 'scheduled'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {c.status}
                  </span>
                  <button title="View campaign" className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-primary hover:text-white transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {QUICK_ACTIONS.map(({ label, sub, Icon, cta }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-all shadow-sm group">
            <div className="p-3 bg-secondary/10 rounded-xl text-secondary w-fit group-hover:bg-secondary/20 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{label}</h3>
              <p className="text-sm text-slate-500 mt-1">{sub}</p>
            </div>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="self-start flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              {cta} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <NewCampaignModal 
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
