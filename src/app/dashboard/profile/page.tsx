import { createClient, getUser } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/dashboard/ProfileForm';
import { SecuritySection } from '@/components/dashboard/SecuritySection';
import { Settings, User, Shield } from 'lucide-react';

export default async function ProfilePage() {
  const { data: { user } } = await getUser();

  if (!user) {
    return redirect('/login');
  }

  const profileData = {
    full_name: user.user_metadata?.full_name || '',
    email: user.email || '',
    phone: user.user_metadata?.phone || '',
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section>
        <div className="flex items-center gap-3 text-accent mb-4">
          <Settings size={16} className="animate-spin-slow" />
          <p className="text-xs uppercase tracking-[0.4em] font-bold">
            Sanctuary Settings
          </p>
        </div>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Personal <span className="font-serif italic text-accent">Sanctuary</span>
        </h1>
        <p className="mt-6 text-lg font-serif italic text-primary/60 max-w-2xl leading-relaxed">
          Manage your personal information and sanctuary settings. Your data is protected within this sacred space.
        </p>
      </section>

      {/* Profile Section */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 border-b border-primary/5 pb-6">
          <div className="p-3 rounded-2xl bg-primary text-white">
            <User size={20} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-primary">Personal Information</h2>
            <p className="text-sm font-serif italic text-primary/50">Update your details and contact information</p>
          </div>
        </div>
        
        <ProfileForm initialData={profileData} />
      </section>

      {/* Security Section */}
      <section className="space-y-10 pt-8">
        <div className="flex items-center gap-4 border-b border-primary/5 pb-6">
          <div className="p-3 rounded-2xl bg-primary text-white">
            <Shield size={20} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-primary">Security & Protection</h2>
            <p className="text-sm font-serif italic text-primary/50">Manage your password and account security</p>
          </div>
        </div>

        <SecuritySection />
      </section>

      {/* Account Deletion / Support */}
      <section className="pt-12 border-t border-primary/5">
        <div className="glass p-10 rounded-[40px] border border-red-500/10 bg-red-500/[0.02] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-display font-bold text-primary mb-2">Need to leave the Sanctuary?</h3>
            <p className="text-sm font-serif italic text-primary/60">If you wish to deactivate or delete your account, please contact our support team for assistance.</p>
          </div>
          <button className="whitespace-nowrap px-8 py-4 rounded-2xl border border-red-500/20 text-red-500 font-display text-xs uppercase tracking-widest font-bold hover:bg-red-500 hover:text-white transition-all duration-300">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
}
