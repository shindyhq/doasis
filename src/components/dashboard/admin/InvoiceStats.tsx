import { DollarSign, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

interface InvoiceStat {
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
}

interface InvoiceStatsProps {
    stats: InvoiceStat[];
}

export function InvoiceStats({ stats }: InvoiceStatsProps) {
  
  // Helper to get icon and color based on index or label
  const getIconAndColor = (index: number) => {
      const styles = [
          { icon: DollarSign, color: 'bg-secondary/10 text-secondary' },
          { icon: AlertCircle, color: 'bg-amber-50 text-amber-600' },
          { icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
          { icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
      ];
      return styles[index % styles.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
       {stats.map((stat, index) => {
          const { icon: Icon, color } = getIconAndColor(index);
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                    <div className="flex items-center gap-1 mt-1">
                        <span className={`text-xs font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {stat.change}
                        </span>
                        <span className="text-xs text-slate-400">vs last month</span>
                    </div>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
          );
       })}
    </div>
  );
}
