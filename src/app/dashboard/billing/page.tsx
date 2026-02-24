import { createClient } from '@/lib/supabase/server';
import { FinancialService } from '@/services/FinancialService';
import { CreditCard, Download, ShieldCheck, FileText as FileTextIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const transactions = user ? await FinancialService.getUserTransactions(user.id) : [];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Account & Finance
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Billing
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Plan */}
        <div className="bg-primary text-white p-8 rounded-[32px] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} />
           </div>
           <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Current Plan</h3>
           <div className="text-3xl font-display font-bold mb-6">The Becoming</div>
           <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold">$150</span>
              <span className="opacity-60">/ session</span>
           </div>
           <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Active
           </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white/50 border border-white/60 p-8 rounded-[32px] flex flex-col justify-center">
           <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-6">Payment Method</h3>
           <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-white text-[10px] font-bold tracking-widest">VISA</div>
              <div className="font-mono text-primary">•••• •••• •••• 4242</div>
           </div>
           <button className="w-full py-3 rounded-xl border border-primary/10 font-bold text-primary/60 hover:bg-white hover:text-primary transition-colors text-sm">
              Update Card
           </button>
        </div>
      </div>

      {/* Invoice History */}
      <section>
         <h2 className="text-xl font-display font-medium text-primary mb-6">Invoice History</h2>
         <div className="bg-white/50 border border-white/60 rounded-[32px] overflow-hidden">
            {transactions.length === 0 ? (
                <div className="p-6 text-center text-primary/40 border-b border-primary/5">
                   <p className="font-serif italic">No recent invoices.</p>
                </div>
            ) : (
                <div className="divide-y divide-primary/5">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-white/60 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/40">
                                    <FileTextIcon size={18} />
                                </div>
                                <div>
                                    <div className="font-bold text-primary text-sm">Invoice #{tx.id.slice(0,8).toUpperCase()}</div>
                                    <div className="text-xs text-primary/40">{tx.date}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-primary">${(tx.amount || 0).toLocaleString()}</span>
                                <button 
                                  title="Download Invoice"
                                  className="p-2 hover:bg-primary/5 rounded-full text-primary/40 hover:text-primary transition-colors"
                                >
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
         </div>
      </section>
    </div>
  );
}
