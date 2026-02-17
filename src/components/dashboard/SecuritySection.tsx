'use client';

import { Shield, Lock, ExternalLink, Key } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export const SecuritySection = () => {
  const handlePasswordReset = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user?.email) {
      await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/profile`,
      });
      alert('Password reset link sent to your email.');
    }
  };

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Password Management */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <div className="p-2 rounded-xl bg-primary/5">
              <Lock size={20} className="text-accent" />
            </div>
            <h3 className="font-display font-bold uppercase tracking-widest text-xs">
              Password & Authentication
            </h3>
          </div>
          
          <div className="glass p-8 rounded-[32px] border border-primary/5 space-y-6">
            <p className="font-serif italic text-primary/60 text-sm leading-relaxed">
              To ensure the highest level of security for your journey, we use secure magic links and encrypted password management. 
            </p>
            <button 
              onClick={handlePasswordReset}
              className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/50 border border-primary/5 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all group active:scale-[0.98] duration-500"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-accent text-primary group-hover:scale-110 transition-transform duration-500">
                  <Key size={18} />
                </div>
                <div className="text-left">
                  <p className="font-display font-bold text-[13px] text-primary">Reset Password</p>
                  <p className="text-[11px] font-display text-primary/40 uppercase tracking-[0.2em] font-bold">Send secure link to email</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-primary/20 group-hover:text-accent transition-colors duration-500" />
            </button>
          </div>
        </div>

        {/* Security Overview */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <div className="p-2 rounded-xl bg-primary/5">
              <Shield size={20} className="text-accent" />
            </div>
            <h3 className="font-display font-bold uppercase tracking-widest text-xs">
              Sanctuary Protection
            </h3>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Data Encryption', status: 'Active (AES-256)', icon: Shield },
              { label: 'Session Status', status: 'Secure Connection', icon: Lock },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-primary/5">
                <div className="p-2 rounded-lg bg-primary/5 text-primary/40">
                  <item.icon size={16} />
                </div>
                <div>
                  <p className="font-display text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-0.5">
                    {item.label}
                  </p>
                  <p className="font-display font-bold text-sm text-primary">
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
