import { CalendarView } from '@/components/dashboard/admin/CalendarView';
import { UpcomingAppointmentsList } from '@/components/dashboard/admin/UpcomingAppointmentsList';
import { AppointmentService } from '@/services/AppointmentService';
import { ClientService } from '@/services/ClientService';
import { NewAppointmentModal } from '@/components/dashboard/admin/NewAppointmentModal';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    month?: string;
    year?: string;
    new_appointment?: string;
    date?: string;
  }>;
}

export default async function CalendarPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const now = new Date();
  const currentMonth = searchParams.month ? parseInt(searchParams.month) : now.getMonth();
  const currentYear = searchParams.year ? parseInt(searchParams.year) : now.getFullYear();

  // Calculate start/end dates for fetching (simplified to fetch whole month window)
  const startDate = new Date(currentYear, currentMonth, 1).toISOString();
  const endDate = new Date(currentYear, currentMonth + 1, 0).toISOString();

  const [events, clients] = await Promise.all([
    AppointmentService.getAppointmentsByDateRange(startDate, endDate),
    ClientService.getClients({ limit: 100 })
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-theme(spacing.16))] flex flex-col">
       {/* Modal */}
       <NewAppointmentModal clients={clients.data} />

       {/* Header */}
       <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-display">Calendar</h1>
            <p className="text-slate-500">Manage appointments and availability.</p>
          </div>
          
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                Sync Calendar
             </button>
             <Link 
                href="?new_appointment=true"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
             >
                <Plus className="w-4 h-4" />
                <span>New Event</span>
             </Link>
          </div>
       </div>

       {/* Content Grid */}
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          {/* Main Calendar Area */}
          <div className="lg:col-span-3 h-full overflow-y-auto">
             <CalendarView month={currentMonth} year={currentYear} events={events} />
          </div>
          
          {/* Sidebar Area */}
          <div className="hidden lg:block h-full overflow-y-auto">
             <UpcomingAppointmentsList appointments={events} />
          </div>
       </div>
    </div>
  );
}
