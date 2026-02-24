import { CheckCircle2, DollarSign, Calendar, AlertCircle, UserPlus, Clock } from 'lucide-react';

interface ActivityFeedProps {
    activities: {
        id: string;
        user: string;
        action: string;
        detail: string;
        time: string;
        type: 'session' | 'payment' | 'client' | 'alert' | 'other';
    }[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  
  const getIcon = (type: string) => {
      switch(type) {
          case 'session': return Calendar;
          case 'payment': return DollarSign;
          case 'client': return UserPlus;
          case 'alert': return AlertCircle;
          default: return CheckCircle2;
      }
  }

  const getColor = (type: string) => {
      switch(type) {
          case 'session': return 'text-blue-500 bg-blue-50';
          case 'payment': return 'text-emerald-500 bg-emerald-50';
          case 'client': return 'text-secondary bg-secondary/10';
          case 'alert': return 'text-rose-500 bg-rose-50';
          default: return 'text-slate-500 bg-slate-50';
      }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Activity Feed</h2>
      <div className="space-y-6">
        {activities.length > 0 ? activities.map((item, index) => {
          const Icon = getIcon(item.type);
          return (
            <div key={index} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getColor(item.type)}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-sm text-slate-900">
                    <span className="font-medium">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">{item.time}</p>
                </div>
            </div>
          );
        }) : (
           <div className="text-center py-8 text-slate-400 text-sm">
               <Clock className="w-8 h-8 mx-auto mb-2 opacity-20" />
               <p>No recent activity</p>
           </div> 
        )}
      </div>
    </div>
  );
}
