import { TrendingUp, Users } from 'lucide-react';

interface ClientGrowthChartProps {
    data: {
        labels: string[];
        values: number[];
        total: number;
        growth: number;
    };
}

export function ClientGrowthChart({ data }: ClientGrowthChartProps) {
  // Use data.values for the mini chart
  const hasData = data.values.length > 0;
  const maxVal = hasData ? Math.max(...data.values) : 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
       <div className="flex justify-between items-start mb-4">
          <div>
             <h3 className="text-lg font-semibold text-slate-900">Client Growth</h3>
             <p className="text-3xl font-bold text-slate-900 mt-2">{data.total}</p>
             <p className={`text-sm font-medium flex items-center gap-1 mt-1 ${data.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                <TrendingUp className={`w-4 h-4 ${data.growth < 0 ? 'rotate-180' : ''}`} />
                <span>{data.growth > 0 ? '+' : ''}{data.growth}% this month</span>
             </p>
          </div>
          <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
             <Users className="w-6 h-6" />
          </div>
       </div>

       {/* Simple Activity Line Mock (using bars for now as defined in service) */}
       <div className="h-32 flex items-end gap-1 mt-4">
            {hasData ? data.values.map((val, i) => (
                <div key={i} className="flex-1 bg-secondary/10 rounded-t-sm h-full relative overflow-hidden group">
                     {/* Show tooltip on hover */}
                     <div className="opacity-0 group-hover:opacity-100 absolute top-0 inset-x-0 bg-slate-800 text-white text-[10px] text-center py-1 transition-opacity z-10">
                        {val}
                     </div>
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-primary/20 border-t-2 border-primary transition-all duration-500 h-[var(--bar-height)]" 
                        style={{ '--bar-height': `${(val / maxVal) * 100}%` } as React.CSSProperties}
                    />
                </div>
            )) : (
                <div className="w-full flex items-center justify-center text-slate-400 text-sm bg-slate-50/50 h-full rounded">
                    No data
                </div>
            )}
       </div>
    </div>
  );
}
