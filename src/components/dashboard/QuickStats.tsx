import { Flame } from 'lucide-react';

interface QuickStatsProps {
  stats?: {
    totalEntries: number;
    streak?: number;
  };
}

export function QuickStats({ stats }: QuickStatsProps) {
  const totalEntries = stats?.totalEntries || 0;
  const streak = stats?.streak || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Journey Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-slate-900 font-medium mb-4 flex items-center justify-between">
          Journey Progress
          <span className="text-xs font-bold bg-teal-100 text-teal-700 px-2 py-1 rounded-full">65%</span>
        </h3>
        
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">Mindfulness Phase II</span>
            <span className="text-slate-400">4 modules left</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className="bg-teal-500 h-2.5 rounded-full w-[65%]"></div>
          </div>
        </div>
      </div>

      {/* Reflections / Streak */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 font-medium mb-1">Reflections Completed</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-light text-slate-900">{totalEntries}</span>
            <span className="text-sm font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">+3 this week</span>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-full text-orange-500 relative group">
            <Flame className={`w-8 h-8 ${streak > 0 ? 'text-orange-500 fill-orange-500' : 'text-slate-300'}`} />
            {streak > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {streak}
                </span>
            )}
        </div>
      </div>
    </div>
  );
}
