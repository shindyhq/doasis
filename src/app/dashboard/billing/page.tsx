import { CreditCard, Download, ShieldCheck } from 'lucide-react';

export default function BillingPage() {
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
            <div className="p-6 text-center text-primary/40 border-b border-primary/5">
               <p className="font-serif italic">No recent invoices.</p>
            </div>
            {/* Mock Row for visualization */}
            <div className="p-6 flex items-center justify-between hover:bg-white/60 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/40">
                     <FileText size={18} />
                  </div>
                  <div>
                     <div className="font-bold text-primary text-sm">Invoice #INV-2024-001</div>
                     <div className="text-xs text-primary/40">Jan 15, 2026</div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-primary">$150.00</span>
                  <button className="p-2 hover:bg-primary/5 rounded-full text-primary/40 hover:text-primary transition-colors">
                     <Download size={16} />
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

// Helper icon
function FileText({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" x2="8" y1="13" y2="13"/>
      <line x1="16" x2="8" y1="17" y2="17"/>
      <line x1="10" x2="8" y1="9" y2="9"/>
    </svg>
  )
}
