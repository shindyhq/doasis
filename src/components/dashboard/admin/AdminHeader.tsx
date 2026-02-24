import { format } from 'date-fns';

interface AdminHeaderProps {
  userName: string;
}

export function AdminHeader({ userName }: AdminHeaderProps) {
  const currentDate = format(new Date(), 'MMMM d, yyyy • EEEE');

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-display font-semibold text-slate-900">
          Practitioner Control Center
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome back, {userName}. You have <span className="font-semibold text-secondary">3 pending tasks</span> today.
        </p>
      </div>
      <div className="text-right hidden md:block">
        <p className="text-sm font-medium text-slate-900">{currentDate}</p>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Sanctuary Schedule</p>
      </div>
    </div>
  );
}
