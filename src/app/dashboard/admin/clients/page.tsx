import { AdminHeader } from '@/components/dashboard/admin/AdminHeader';
import { ClientsTable } from '@/components/dashboard/admin/ClientsTable';
import { ClientService } from '@/services/ClientService';
import { ResourceService } from '@/services/ResourceService';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';
import { NewClientModal } from '@/components/dashboard/admin/clients/NewClientModal';
import { ResourceLibraryModal } from '@/components/dashboard/admin/clients/ResourceLibraryModal';
import { BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
    new_client?: string;
  }>;
}

export default async function ClientsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const search = searchParams.search || '';
  const status = searchParams.status || 'All';
  const showNewClientModal = searchParams.new_client === 'true';

  const [clientsResult, resources] = await Promise.all([
      ClientService.getClients({ search, status, page, limit }),
      ResourceService.getResources()
  ]);

  const { data, meta } = clientsResult;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       {/* Header with Action */}
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-display">My Clients</h1>
            <p className="text-slate-500 mt-1">Manage client profiles, treatment plans, and sessions.</p>
          </div>
          
          <div className="flex gap-3">
             <Link 
                href="?library=true" 
                scroll={false}
                className="flex items-center gap-2 bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
            >
                 <BookOpen className="w-4 h-4" />
                 <span>Library</span>
            </Link>

            <Link 
                href="?new_client=true" 
                scroll={false}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm hover:shadow-md"
            >
                 <UserPlus className="w-4 h-4" />
                 <span>Add New Client</span>
            </Link>
          </div>
       </div>

       {/* Main Content */}
       <ClientsTable data={data} meta={meta} resources={resources} />
       
       <NewClientModal />
       <ResourceLibraryModal resources={resources} />
    </div>
  );
}
