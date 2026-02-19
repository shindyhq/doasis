import { createClient } from '@/lib/supabase/server';
import { User, Lock, Bell, Sliders } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Preferences
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Settings
        </h1>
      </header>
      
      <div className="space-y-6">
        {/* Personal Info */}
        <div className="bg-white/50 border border-white/60 p-8 rounded-[32px] flex items-start gap-6">
           <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
              <User size={24} />
           </div>
           <div className="flex-1">
              <h2 className="text-xl font-display font-medium text-primary mb-6">Personal Information</h2>
              <form action={async (formData) => {
                 'use server';
                 const fullName = formData.get('fullName') as string;
                 const supabase = await createClient();
                 await supabase.from('profiles').update({ full_name: fullName }).eq('id', user.id);
              }}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      name="fullName"
                      type="text" 
                      defaultValue={profile?.full_name || ''} 
                      placeholder="Full Name" 
                      className="p-4 bg-white/60 border border-primary/5 rounded-xl" 
                    />
                    <input 
                      type="email" 
                      disabled
                      defaultValue={user.email} 
                      className="p-4 bg-white/30 border border-primary/5 rounded-xl opacity-60 cursor-not-allowed" 
                    />
                 </div>
                 <button type="submit" className="mt-4 bg-primary text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">
                    Save Changes
                 </button>
              </form>
           </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/50 border border-white/60 p-8 rounded-[32px] flex items-start gap-6">
           <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
              <Bell size={24} />
           </div>
           <div className="flex-1">
              <h2 className="text-xl font-display font-medium text-primary mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                 {['Session Reminders', 'New Resources', 'Journal Prompts'].map(item => (
                   <div key={item} className="flex items-center justify-between p-4 bg-white/40 rounded-xl border border-primary/5">
                      <span className="font-medium text-primary">{item}</span>
                      <div className="w-10 h-6 bg-emerald-400 rounded-full relative cursor-pointer">
                         <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
