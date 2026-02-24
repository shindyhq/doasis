import { Users, DollarSign, Calendar, CheckSquare } from 'lucide-react';

interface AdminStatsProps {
    stats: {
        activeClients: number;
        revenue: number;
        upcomingSessions: number;
        pendingTasks: number;
    }
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statItems = [
    {
      label: 'Total Active Clients',
      value: stats.activeClients.toString(),
      // change: '+12% from last month', // TODO: Calculate change
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Revenue (Total)',
      value: `$${stats.revenue.toLocaleString()}`,
      // change: '+8.5% from last month',
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Upcoming Sessions',
      value: stats.upcomingSessions.toString(),
      change: 'Next 7 Days',
      icon: Calendar,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Pending Tasks',
      value: stats.pendingTasks.toString(),
      change: 'Urgent',
      icon: CheckSquare,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            {stat.change && (
              <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            )}
          </div>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
