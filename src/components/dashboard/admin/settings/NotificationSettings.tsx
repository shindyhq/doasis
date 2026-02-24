'use client';

import { Bell, Mail, MessageSquare, Loader2 } from 'lucide-react';
import { updateNotifications } from '@/actions/settings';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/components/ui/Toast';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Preferences'}
    </button>
  );
}

export function NotificationSettings() {
  const { showToast } = useToast();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPreferences() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('preferred_communication')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          
          if (data) {
            setEmailEnabled(data.preferred_communication === 'email');
            setSmsEnabled(data.preferred_communication === 'sms');
          }
        }
      } catch (error) {
        console.error('Error loading notification preferences:', error);
        showToast("Error loading preferences", "info");
      } finally {
        setLoading(false);
      }
    }
    loadPreferences();
  }, [showToast]);

  const handleAction = async (formData: FormData) => {
    const result = await updateNotifications(formData);
    if (result.success) {
      showToast("Notification preferences updated", "success");
    } else {
      showToast(result.error || "Failed to update preferences", "info");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-6 flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-6">
       <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-secondary" />
          Notifications
       </h2>

       <form action={handleAction} className="space-y-6">
          <div className="space-y-4">
             <div className="flex items-start justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex gap-3">
                   <div className="mt-1 bg-white p-2 rounded-lg border border-slate-200 text-secondary">
                      <Mail className="w-4 h-4" />
                   </div>
                   <div>
                      <h3 className="font-medium text-slate-900">Email Notifications</h3>
                      <p className="text-sm text-slate-500 mt-1">Receive emails about new appointments and messages.</p>
                   </div>
                </div>
                <div className="flex items-center">
                   <label htmlFor="emailNotifs" className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="emailNotifs" 
                        name="emailNotifs" 
                        checked={emailEnabled}
                        onChange={(e) => setEmailEnabled(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                      <span className="sr-only">Toggle email notifications</span>
                   </label>
                </div>
             </div>

             <div className="flex items-start justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex gap-3">
                   <div className="mt-1 bg-white p-2 rounded-lg border border-slate-200 text-secondary">
                      <MessageSquare className="w-4 h-4" />
                   </div>
                   <div>
                      <h3 className="font-medium text-slate-900">SMS Notifications</h3>
                      <p className="text-sm text-slate-500 mt-1">Get text alerts for urgent updates and reminders.</p>
                   </div>
                </div>
                <div className="flex items-center">
                   <label htmlFor="smsNotifs" className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="smsNotifs" 
                        name="smsNotifs" 
                        checked={smsEnabled} 
                        onChange={(e) => setSmsEnabled(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/10 focus:border-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      <span className="sr-only">Toggle SMS notifications</span>
                   </label>
                </div>
             </div>
          </div>

          <div className="flex justify-end pt-4">
             <SubmitButton />
          </div>
       </form>
    </div>
  );
}
