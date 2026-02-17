import { createClient, getUser } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { 
  CreditCard, 
  Download, 
  ExternalLink,
  Receipt,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default async function BillingPage() {
  const { data: { user } } = await getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
            Honorable Stewardship
          </p>
          <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
            Billing & <span className="font-serif italic text-secondary">Finances</span>
          </h1>
          <p className="mt-4 text-lg font-serif italic text-primary/60 max-w-xl">
            Manage your subscriptions, view invoices, and update payment methods with ease and transparency.
          </p>
        </div>
        <Button variant="primary" className="w-fit rounded-2xl px-10 py-5">
           Manage via Stripe Portal
           <ExternalLink size={16} className="ml-3" />
        </Button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Plan & Details */}
        <div className="lg:col-span-2 space-y-12">
          {/* Active Plan Card */}
          <section className="space-y-6">
            <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70 px-4">
              Current Plan
            </h3>
            <div className="glass p-10 rounded-[40px] border border-primary/5 relative overflow-hidden">
               <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start md:items-center">
                 <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary font-display text-[11px] uppercase tracking-widest font-bold rounded-lg leading-none">
                      Active Subscription
                    </div>
                    <h2 className="text-4xl font-display font-medium text-primary tracking-tight">
                      The Becoming <span className="text-2xl font-serif italic text-primary/40">— Bi-Weekly Coaching</span>
                    </h2>
                    <p className="font-serif italic text-primary/60 max-w-md">
                      Includes two 60-minute deep reflection sessions per month, plus full access to the resource sanctuary.
                    </p>
                 </div>
                 <div className="text-right">
                    <p className="text-3xl font-display font-bold text-primary">$350<span className="text-base text-primary/40 font-medium">/mo</span></p>
                    <p className="font-display text-[11px] uppercase tracking-widest font-bold text-primary/60 mt-1">Next Billing: Mar 01, 2026</p>
                 </div>
               </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="space-y-6">
            <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70 px-4">
              Payment Method
            </h3>
            <div className="bg-white border border-primary/5 rounded-[32px] p-8 flex items-center justify-between group cursor-pointer hover:border-accent/40 transition-colors">
               <div className="flex items-center gap-6">
                 <div className="w-16 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all">
                   <CreditCard size={24} />
                 </div>
                  <div>
                    <p className="font-display font-bold text-primary italic">Visa •••• 4242</p>
                    <p className="font-display text-[11px] uppercase tracking-widest font-bold text-primary/60">Expires 12/28</p>
                  </div>
               </div>
                <Button 
                  variant="ghost" 
                  className="px-4 py-2 text-[10px]"
                >
                  Edit Details
                </Button>
            </div>
          </section>
        </div>

        {/* Right Column: Invoices */}
        <div className="space-y-6">
           <h3 className="font-display font-bold uppercase tracking-widest text-[12px] text-primary/70 px-4">
             Invoice History
           </h3>
           <div className="space-y-4">
             {[
               { id: '458A-92', amount: '$350.00', date: 'Feb 01, 2026', status: 'Paid' },
               { id: '312C-44', amount: '$350.00', date: 'Jan 01, 2026', status: 'Paid' },
               { id: '129F-12', amount: '$350.00', date: 'Dec 01, 2025', status: 'Paid' },
               { id: '001B-01', amount: '$150.00', date: 'Nov 15, 2025', status: 'Paid' },
             ].map((inv, i) => (
                <div key={i} className="bg-white/50 border border-primary/5 rounded-[24px] p-6 flex flex-col gap-4 group hover:border-accent/20 transition-all hover:shadow-2xl hover:shadow-black/5 duration-500">
                  <div className="flex items-start justify-between">
                     <div className="p-2 bg-primary/5 rounded-xl text-primary/20 group-hover:text-primary/40 transition-colors">
                       <Receipt size={18} />
                     </div>
                     <span className="font-display text-[11px] uppercase tracking-widest font-bold text-green-700 flex items-center gap-1">
                       <CheckCircle2 size={12} /> {inv.status}
                     </span>
                  </div>
                   <div>
                     <p className="font-display text-[12px] uppercase tracking-widest font-bold text-primary/70 mb-1">Invoice #{inv.id}</p>
                     <div className="flex items-center justify-between">
                        <p className="font-display font-bold text-primary">{inv.amount}</p>
                        <p className="text-xs text-primary/40 font-bold uppercase tracking-tighter">{inv.date}</p>
                     </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full bg-primary/5 hover:bg-primary hover:text-background text-[11px] py-3.5"
                  >
                    <Download size={14} className="mr-2" /> Download PDF
                  </Button>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
