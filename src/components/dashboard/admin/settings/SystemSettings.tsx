'use client';

import { Shield, Lock, Smartphone, Loader2 } from 'lucide-react';
import { updateSystem } from '@/actions/settings';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/components/ui/Toast';

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : label}
    </button>
  );
}

export function SystemSettings() {
  const { showToast } = useToast();

  const handlePasswordAction = async (formData: FormData) => {
    const result = await updateSystem(formData);
    if (result.success) {
      showToast("Password updated successfully", "success");
      // Optional: Clear form
    } else {
      showToast(result.error || "Failed to update password", "info");
    }
  };

  const handleMfaAction = async (e: React.FormEvent) => {
    e.preventDefault();
    showToast("2FA setup is coming soon", "info");
  };

  return (
    <div className="space-y-6 mt-6">
       {/* Security Section */}
       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
             <Shield className="w-5 h-5 text-primary" />
             Security Settings
          </h2>

          <div className="space-y-8">
             {/* Change Password */}
             <div>
                <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center gap-2">
                   <Lock className="w-4 h-4 text-slate-400" />
                   Change Password
                </h3>
                <form action={handlePasswordAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Current Password</label>
                      <input 
                        type="password" 
                        name="currentPassword"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                        placeholder="••••••••"
                        required
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">New Password</label>
                      <input 
                        type="password" 
                        name="newPassword"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                        placeholder="••••••••"
                        required
                      />
                   </div>
                   <div className="md:col-span-2 flex justify-end">
                      <SubmitButton label="Update Password" />
                   </div>
                </form>
             </div>

             <div className="h-px bg-slate-100" />

             {/* Two-Factor Authentication */}
             <div className="flex items-start justify-between">
                <div className="flex gap-3">
                   <div className="mt-1 bg-slate-50 p-2 rounded-lg border border-slate-200 text-slate-600">
                      <Smartphone className="w-4 h-4" />
                   </div>
                   <div>
                      <h3 className="font-medium text-slate-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-slate-500 mt-1">Add an extra layer of security to your account.</p>
                   </div>
                </div>
                <button 
                  onClick={handleMfaAction}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors"
                >
                   Enable 2FA
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}
