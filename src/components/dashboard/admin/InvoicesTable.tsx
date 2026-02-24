'use client';

import { Download, MoreVertical, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

interface InvoicesTableProps {
  data: any[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function InvoicesTable({ data, meta }: InvoicesTableProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) params.set('search', term);
        else params.delete('search');
        params.set('page', '1');
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleStatusFilter = (status: string) => {
        const params = new URLSearchParams(searchParams);
        if (status && status !== 'All Status') {
             if (status === 'All') params.delete('status');
             else params.set('status', status);
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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-8">
             {/* Toolbar */}
             <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-bold text-slate-900">Recent Invoices</h2>
                
                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="Search by client or ID..." 
                          onChange={(e) => handleSearch(e.target.value)}
                          defaultValue={searchParams.get('search')?.toString()}
                          className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 w-full sm:w-64"
                        />
                    </div>
                     <div className="relative">
                        <select 
                            onChange={(e) => handleStatusFilter(e.target.value)}
                            defaultValue={searchParams.get('status') || 'All'}
                            aria-label="Filter invoices by status"
                            className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 text-slate-600 cursor-pointer hover:bg-slate-50"
                        >
                            <option value="All">All Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Overdue">Overdue</option>
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
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Invoice ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Client</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.length > 0 ? (
                            data.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-slate-900 text-sm whitespace-nowrap">
                                        {invoice.id}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 text-sm">
                                        {invoice.client_name}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                                        {invoice.date}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-slate-900 text-sm">
                                        ${invoice.amount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                            invoice.status === 'succeeded' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            invoice.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            'bg-rose-50 text-rose-700 border-rose-100'
                                        }`}>
                                            {invoice.status === 'succeeded' ? 'Paid' : 
                                             invoice.status === 'pending' ? 'Pending' : 'Overdue'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button title="Download Invoice" className="p-2 text-slate-400 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors">
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button title="More Options" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                    No invoices found.
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
                        title="Previous Page"
                        onClick={() => handlePageChange(meta.page - 1)}
                        disabled={meta.page <= 1}
                        className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 text-slate-600" />
                    </button>
                    <button 
                         title="Next Page"
                        onClick={() => handlePageChange(meta.page + 1)}
                        disabled={meta.page >= meta.totalPages}
                        className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                    </button>
                </div>
             </div>
        </div>
    );
}
