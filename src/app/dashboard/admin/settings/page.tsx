import { Button } from '@/components/ui/Button';
import { Sliders, Clock, CreditCard, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Configuration
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Settings
        </h1>
      </header>

      <div className="space-y-6">
        {/* Practice Info */}
        <section className="bg-white/50 border border-white/60 p-8 rounded-[32px]">
           <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                 <Shield size={24} />
              </div>
              <div className="flex-1">
                 <h2 className="text-xl font-display font-medium text-primary mb-2">Practice Information</h2>
                 <p className="text-sm text-primary/60 mb-6 max-w-lg">
                    Manage your public profile, contact details, and branding settings visible to clients.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Practice Name</label>
                       <input type="text" defaultValue="D'Oasis" className="w-full p-3 rounded-xl border border-primary/10 bg-white" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Email</label>
                       <input type="email" defaultValue="admin@doasis.com" className="w-full p-3 rounded-xl border border-primary/10 bg-white" />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Availability */}
        <section className="bg-white/50 border border-white/60 p-8 rounded-[32px]">
           <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                 <Clock size={24} />
              </div>
              <div className="flex-1">
                 <h2 className="text-xl font-display font-medium text-primary mb-2">Availability Rules</h2>
                 <p className="text-sm text-primary/60 mb-6 max-w-lg">
                    Set your working hours, buffer times between sessions, and maximum daily appointments.
                 </p>
                 <div className="flex gap-4">
                    <Button variant="outline">Connect Google Calendar</Button>
                    <Button variant="outline">Edit Default Hours</Button>
                 </div>
              </div>
           </div>
        </section>

        {/* Integration */}
         <section className="bg-white/50 border border-white/60 p-8 rounded-[32px]">
           <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                 <Sliders size={24} />
              </div>
              <div className="flex-1">
                 <h2 className="text-xl font-display font-medium text-primary mb-2">System Integrations</h2>
                 <p className="text-sm text-primary/60 mb-6 max-w-lg">
                    Manage connections with third-party services like Stripe, Zoom, and SendGrid.
                 </p>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-primary/5">
                       <span className="font-bold text-sm text-primary">Stripe Payments</span>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Connected</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-primary/5">
                       <span className="font-bold text-sm text-primary">Zoom Video</span>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40 bg-primary/5 px-2 py-1 rounded">Disconnected</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
