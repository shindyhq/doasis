import { BarChart3, PieChart, TrendingUp, Users } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Insights & Data
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Analytics
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white/50 border border-white/60 p-8 rounded-[32px] h-80 flex items-center justify-center text-primary/20">
            <div className="text-center">
               <BarChart3 size={48} className="mx-auto mb-2 opacity-50" />
               <p className="font-display text-lg">Client Retention Chart</p>
            </div>
         </div>
         <div className="bg-white/50 border border-white/60 p-8 rounded-[32px] h-80 flex items-center justify-center text-primary/20">
            <div className="text-center">
               <TrendingUp size={48} className="mx-auto mb-2 opacity-50" />
               <p className="font-display text-lg">Revenue Growth</p>
            </div>
         </div>
      </div>

      <div className="bg-white/50 border border-white/60 p-8 rounded-[32px]">
         <h2 className="text-xl font-display font-medium text-primary mb-6">Key Metrics</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[ 
              { label: 'Avg Session Rating', value: '4.9/5' },
              { label: 'Client Churn Rate', value: '2.1%' },
              { label: 'New Inquiries', value: '15/mo' },
              { label: 'Website Visits', value: '1.2k' }
            ].map(stat => (
               <div key={stat.label}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">{stat.label}</p>
                  <p className="text-3xl font-display font-bold text-primary">{stat.value}</p>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
