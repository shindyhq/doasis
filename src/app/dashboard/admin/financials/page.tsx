import { InvoiceStats } from '@/components/dashboard/admin/InvoiceStats';
import { InvoicesTable } from '@/components/dashboard/admin/InvoicesTable';
import { FinancialService } from '@/services/FinancialService';
import { Upload } from 'lucide-react';
import { ComingSoonButton } from '@/components/ui/ComingSoonButton';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function FinancialsPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || '';
  const status = searchParams.status || 'All';

  const stats = await FinancialService.getFinancialStats();
  const { data, meta } = await FinancialService.getAllTransactions({ search, status, page });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       {/* Header */}
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-display">Invoices & Payments</h1>
            <p className="text-slate-500 mt-1">Track revenue, manage invoices, and view payment history.</p>
          </div>
          
          <ComingSoonButton 
            title="Export Report"
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm hover:shadow-md"
          >
             <Upload className="w-4 h-4" />
             <span>Export Report</span>
          </ComingSoonButton>
       </div>

       {/* Stats Grid */}
       <InvoiceStats stats={stats} />

       {/* Invoices Table */}
       <InvoicesTable data={data} meta={meta} />
    </div>
  );
}
