import { ProfileSettings } from '@/components/dashboard/admin/settings/ProfileSettings';
import { NotificationSettings } from '@/components/dashboard/admin/settings/NotificationSettings';
import { SystemSettings } from '@/components/dashboard/admin/settings/SystemSettings';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-8 font-display">Settings</h1>
        
        <ProfileSettings />
        <NotificationSettings />
        <SystemSettings />
    </div>
  );
}
