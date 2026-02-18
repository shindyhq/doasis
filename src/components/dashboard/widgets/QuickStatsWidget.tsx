import { 
  Calendar, 
  BookOpen, 
  Star,
  LucideIcon 
} from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

interface QuickStatsWidgetProps {
  stats: StatItem[];
}

export const QuickStatsWidget = ({ stats }: QuickStatsWidgetProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="glass p-8 rounded-[32px] border border-primary/5 flex flex-col gap-4">
          <div className={`p-3 rounded-2xl bg-white w-fit ${stat.color} shadow-sm`}>
            <stat.icon size={22} />
          </div>
          <div>
            <p className="font-display text-[12px] uppercase tracking-widest font-bold text-primary/70 mb-1">
              {stat.label}
            </p>
            <p className="text-xl font-display font-bold text-primary">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
