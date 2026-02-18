'use client';

import { useEffect, useState } from 'react';
import { Shield, Clock, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface SecurityLog {
    id: string;
    event_type: string;
    created_at: string;
    metadata?: {
        ip_hint?: string;
        [key: string]: unknown;
    };
}

export const SecurityLogs = () => {
    const [logs, setLogs] = useState<SecurityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from('security_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);
            
            setLogs((data as SecurityLog[]) || []);
            setLoading(false);
        };

        fetchLogs();
    }, []);

    const getIcon = (type: string | undefined) => {
        if (!type) return <Shield className="text-primary/40" size={16} />;
        
        switch (type) {
            case 'login_success': return <CheckCircle className="text-green-500" size={16} />;
            case 'login_failure': return <AlertTriangle className="text-red-500" size={16} />;
            case 'mfa_enrollment': return <Smartphone className="text-accent" size={16} />;
            default: return <Shield className="text-primary/40" size={16} />;
        }
    };

    const formatLabel = (type: string | undefined) => {
        if (!type) return 'Unknown Event';
        return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 text-primary">
                <div className="p-2 rounded-xl bg-primary/5">
                    <Clock size={20} className="text-accent" />
                </div>
                <h3 className="font-display font-bold uppercase tracking-widest text-xs">
                    Recent Security Activity
                </h3>
            </div>

            <div className="glass p-6 md:p-8 rounded-[32px] border border-primary/5">
                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                    </div>
                ) : logs.length > 0 ? (
                    <div className="divide-y divide-primary/5">
                        {logs.map((log) => (
                            <div key={log.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-primary/5">
                                        {getIcon(log.event_type)}
                                    </div>
                                    <div>
                                        <p className="font-display font-bold text-[13px] text-primary">
                                            {formatLabel(log.event_type)}
                                        </p>
                                        <p className="text-[10px] font-display text-primary/30 uppercase tracking-widest">
                                            {log.created_at ? new Date(log.created_at).toLocaleString() : 'Date Unknown'}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                   <span className="text-[9px] uppercase tracking-widest font-bold text-accent/40 py-1 px-3 border border-accent/10 rounded-full">
                                      {log.metadata?.ip_hint || 'Secure Node'}
                                   </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 opacity-30">
                        <p className="text-sm font-serif italic">No recent activity found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
