'use client';

import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { UserProfile, Resource } from '@/types/custom';
import { ClientActionModal } from '@/components/dashboard/admin/clients/ClientActionModal';

interface ClientsTableProps {
  data: any[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  resources: Resource[];
}

export function ClientsTable({ data, meta, resources }: ClientsTableProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [selectedClient, setSelectedClient] = useState<UserProfile | null>(null);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }
        params.set('page', '1'); // Reset to page 1 on search
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleStatusFilter = (status: string) => {
        const params = new URLSearchParams(searchParams);
        if (status && status !== 'All Current') {
             if (status === 'All') {
                 params.delete('status');
             } else {
                params.set('status', status);
             }
        } else {
            params.delete('status');
        }
        params.set('page', '1');
        router.replace(`${pathname}?${params.toString()}`);
    }

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                 {/* Toolbar */}
                 <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-900">All Clients</h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">{meta.total}</span>
                    </div>
                    
                    <div className="flex gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                              type="text" 
                              placeholder="Search clients..." 
                              onChange={(e) => handleSearch(e.target.value)}
                              defaultValue={searchParams.get('search')?.toString()}
                              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 w-full sm:w-64"
                            />
                        </div>
                         <div className="relative">
                            <select 
                                onChange={(e) => handleStatusFilter(e.target.value)}
                                defaultValue={searchParams.get('status') || 'All'}
                                aria-label="Filter by status"
                                className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 text-slate-600 cursor-pointer hover:bg-slate-50"
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                         </div>
                    </div>
                 </div>
    
                 {/* Table */}
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Client Name</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Last Session</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Next Session</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.length > 0 ? (
                                data.map((client) => (
                                    <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100">
                                                    {client.avatar_url && <Image src={client.avatar_url} alt={client.full_name || 'Client'} fill sizes="40px" className="object-cover" />}
                                                    {!client.avatar_url && <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-medium">{(client.full_name || 'C').charAt(0)}</div>}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{client.full_name}</div>
                                                    <div className="text-xs text-slate-500">{client.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                client.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                client.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                                {client.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 text-sm">{client.last_session || '-'}</td>
                                        <td className="px-6 py-4 text-slate-600 text-sm">{client.next_session || '-'}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                title="Manage Client" 
                                                onClick={() => setSelectedClient(client)}
                                                className="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-medium"
                                            >
                                                <Settings className="w-4 h-4" />
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No clients found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                 </div>
    
                 {/* Pagination */}
                 <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                        Showing <span className="font-medium">{Math.min(meta.total, (meta.page - 1) * meta.limit + 1)}</span> to <span className="font-medium">{Math.min(meta.total, meta.page * meta.limit)}</span> of <span className="font-medium">{meta.total}</span> results
                    </div>
                    <div className="flex gap-2">
                        <button 
                            title="Previous page"
                            onClick={() => handlePageChange(meta.page - 1)}
                            disabled={meta.page <= 1}
                            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-slate-600" />
                        </button>
                        <button 
                            title="Next page"
                            onClick={() => handlePageChange(meta.page + 1)}
                            disabled={meta.page >= meta.totalPages}
                            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-slate-600" />
                        </button>
                    </div>
                 </div>
            </div>

            <ClientActionModal 
                client={selectedClient} 
                isOpen={!!selectedClient} 
                onClose={() => setSelectedClient(null)} 
                resources={resources}
            />
        </>
    );
}
