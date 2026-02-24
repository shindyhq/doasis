interface RevenueChartProps {
  data: {
    labels: string[];
    values: number[];
    total: number;
  };
}

export function RevenueChart({ data }: RevenueChartProps) {
  // If no data, fall back to empty state or mock for layout stability
  const hasData = data.values.length > 0 && data.values.some(v => v > 0);
  const maxVal = Math.max(...data.values, 100); // Avoid division by zero

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h3 className="text-lg font-semibold text-slate-900">Revenue Overview</h3>
            <p className="text-sm text-slate-500">Total: ${data.total.toLocaleString()}</p>
        </div>
        <select 
            aria-label="Filter revenue period"
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
        >
           <option>Last 12 Months</option>
           <option>This Year</option>
        </select>
      </div>

      <div className="h-64 flex items-end justify-between gap-2">
         {hasData ? data.values.map((val, i) => (
             <div key={i} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                 <div 
                   className="w-full bg-secondary/20 rounded-t-sm group-hover:bg-primary transition-colors relative h-[var(--bar-height)]"
                   style={{ '--bar-height': `${(val / maxVal) * 100}%` } as React.CSSProperties}
                 >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap z-10">
                       ${val.toLocaleString()}
                    </div>
                 </div>
                 <span className="text-xs text-slate-400 font-medium">{data.labels[i]}</span>
             </div>
         )) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm bg-slate-50 rounded-lg border border-dashed border-slate-200">
                No revenue data available
            </div>
         )}
      </div>
    </div>
  );
}
