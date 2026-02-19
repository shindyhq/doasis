import { DollarSign, TrendingUp, Download } from 'lucide-react';

export default function FinancialsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Revenue & Expenses
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Financials
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-primary text-white p-8 rounded-[32px]">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Total Revenue (YTD)</h3>
            <div className="text-5xl font-display font-bold mb-4">$42,500</div>
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
               <TrendingUp size={16} /> +15% vs last year
            </div>
         </div>
         <div className="bg-white/50 border border-white/60 p-8 rounded-[32px]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-2">Outstanding Invoices</h3>
            <div className="text-5xl font-display font-bold text-primary mb-4">$1,200</div>
            <button className="text-xs font-bold uppercase tracking-widest text-accent underline">
               View Details
            </button>
         </div>
      </div>
      
      {/* Mock Transaction List */}
       <div className="bg-white/50 border border-white/60 rounded-[32px] overflow-hidden">
          <div className="p-6 border-b border-primary/5 flex justify-between items-center">
             <h3 className="font-display font-medium text-xl text-primary">Recent Transactions</h3>
             <button className="text-primary/40 hover:text-primary transition-colors">
                <Download size={18} />
             </button>
          </div>
          <div className="divide-y divide-primary/5">
             {[1,2,3,4,5].map(i => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-white/60 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                         $
                      </div>
                      <div>
                         <div className="font-bold text-primary text-sm">Main Session Payment</div>
                         <div className="text-[10px] text-primary/40 uppercase tracking-widest">Today, 2:30 PM</div>
                      </div>
                   </div>
                   <div className="font-mono font-bold text-primary">+$150.00</div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
