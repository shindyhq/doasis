import { TrendingUp, Users, Mail } from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Growth & Outreach
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Marketing
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white/50 p-6 rounded-[32px] border border-primary/5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-2">New Leads</h3>
            <div className="text-4xl font-display font-bold text-primary">24</div>
            <div className="text-xs text-emerald-600 font-bold mt-2">+12% this month</div>
         </div>
         <div className="bg-white/50 p-6 rounded-[32px] border border-primary/5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-2">Email Open Rate</h3>
            <div className="text-4xl font-display font-bold text-primary">58%</div>
            <div className="text-xs text-emerald-600 font-bold mt-2">Top tier performance</div>
         </div>
         <div className="bg-white/50 p-6 rounded-[32px] border border-primary/5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-2">Active Campaigns</h3>
            <div className="text-4xl font-display font-bold text-primary">3</div>
         </div>
      </div>

      <div className="bg-white/50 border border-white/60 p-8 rounded-[32px] flex flex-col items-center justify-center text-center py-20">
         <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary/20 mb-6">
            <Mail size={40} />
         </div>
         <h3 className="font-display text-2xl font-medium text-primary mb-2">Email Campaigns</h3>
         <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors">
            Create New Campaign
         </button>
      </div>
    </div>
  );
}
