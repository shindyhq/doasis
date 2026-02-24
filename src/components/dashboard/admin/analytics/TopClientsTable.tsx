
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

interface TopClientsTableProps {
    clients: any[]; // Using any[] for now as inferred from service, but ideally typed
}

export function TopClientsTable({ clients }: TopClientsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Top Clients</h3>
            <button className="text-sm text-secondary hover:text-primary font-medium">View All</button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-slate-100">
                        <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Client</th>
                        <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Sessions</th>
                        <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Status</th>
                        <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {clients.length > 0 ? clients.map((item, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-3">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 shrink-0">
                                        {item.profile?.avatar_url ? (
                                            <Image src={item.profile.avatar_url} alt={item.profile.full_name || 'Client'} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-medium">
                                                {(item.profile?.full_name || 'U').charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{item.profile?.full_name || 'Unknown Client'}</p>
                                        <p className="text-xs text-slate-500">{item.profile?.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-3 text-sm text-slate-600 font-medium">
                                {item.count} sessions
                            </td>
                            <td className="py-3">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
                                    Active
                                </span>
                            </td>
                            <td className="py-3 text-right">
                                <button 
                                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors"
                                    aria-label="More options"
                                >
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={4} className="py-8 text-center text-slate-500 text-sm">
                                <p>No client data available yet.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}
