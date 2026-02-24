import { Video, UserCheck, XCircle } from 'lucide-react';

interface SessionStatsProps {
    data: {
        completed: number;
        video: number;
        cancelled: number;
    }
}

export function SessionStats({ data }: SessionStatsProps) {
    const stats = [
        { label: 'Completed Sessions', value: data.completed.toLocaleString(), icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Video Consultations', value: data.video.toLocaleString(), icon: Video, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Cancellations', value: data.cancelled.toLocaleString(), icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    // Calculate retention (simplified: 100 - cancellation rate)
    const totalSessions = data.completed + data.cancelled;
    const cancellationRate = totalSessions > 0 ? (data.cancelled / totalSessions) * 100 : 0;
    const retentionRate = 100 - cancellationRate;

    return (
        <div className="grid grid-cols-1 gap-4">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                        <h4 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h4>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                    </div>
                </div>
            ))}
            
            {/* Retention Card */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg mt-2">
                <h4 className="font-semibold mb-1">Session Completion Rate</h4>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{Math.round(retentionRate)}%</span>
                    <span className="text-slate-400 text-sm mb-1">avg.</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                    <div 
                        className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000 w-[var(--retention-width)]" 
                        style={{ '--retention-width': `${retentionRate}%` } as React.CSSProperties}
                    />
                </div>
            </div>
        </div>
    );
}
