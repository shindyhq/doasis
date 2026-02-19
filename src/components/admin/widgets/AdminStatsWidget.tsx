import { LucideIcon } from 'lucide-react';

export interface Stat {
  label: string;
  value: string;
  subtext?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

interface AdminStatsWidgetProps {
  stats: Stat[];
}

export function AdminStatsWidget({ stats }: AdminStatsWidgetProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div 
            key={idx}
            className="bg-white/40 backdrop-blur-sm border border-white/50 p-6 rounded-[32px] hover:bg-white/60 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute -bottom-6 -right-6 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform scale-150 rotate-12">
               <Icon size={96} className="text-secondary" />
            </div>

            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="p-3 bg-white/50 rounded-2xl text-primary group-hover:scale-110 transition-transform duration-500 shadow-sm border border-white/50">
                <Icon size={20} className="text-secondary" />
              </div>
              {stat.trend && (
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border bg-white/40 backdrop-blur-sm ${
                  stat.trend === 'up' ? 'text-green-700 border-green-200' : 
                  stat.trend === 'down' ? 'text-red-700 border-red-200' : 'text-primary/40 border-primary/10'
                }`}>
                  {stat.trend === 'up' ? '↑ Trending' : stat.trend === 'down' ? '↓ Trending' : 'Stable'}
                </span>
              )}
            </div>
            
            <div className="space-y-1 relative z-10">
              <h4 className="text-4xl font-display font-medium text-primary tracking-tight">
                {stat.value}
              </h4>
              <p className="font-display text-[11px] font-bold uppercase tracking-widest text-primary/40">
                {stat.label}
              </p>
              {stat.subtext && (
                <p className="text-xs font-serif italic text-primary/60 mt-4 pt-4 border-t border-primary/5">
                  {stat.subtext}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
