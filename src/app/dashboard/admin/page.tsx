import { getUser } from '@/lib/supabase/server';
import { AnalyticsService } from '@/services/AnalyticsService';
import { AppointmentService } from '@/services/AppointmentService';
import { ClientService } from '@/services/ClientService';
import { FormService } from '@/services/FormService';
import { AdminHeader } from '@/components/dashboard/admin/AdminHeader';
import { AdminStats } from '@/components/dashboard/admin/AdminStats';
import { AdminSchedule } from '@/components/dashboard/admin/AdminSchedule';
import { ActivityFeed } from '@/components/dashboard/admin/ActivityFeed';
import { CriticalTasks } from '@/components/dashboard/admin/CriticalTasks';
import { RevenueChart } from '@/components/dashboard/admin/analytics/RevenueChart';
import { ClientGrowthChart } from '@/components/dashboard/admin/analytics/ClientGrowthChart';
import { NewAppointmentModal } from '@/components/dashboard/admin/NewAppointmentModal';
import { formatDistanceToNow } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { data: { user: authUser } } = await getUser();
  // Mock user for dev - remove before production
  const user = authUser || {
      id: 'mock-admin-id',
      email: 'admin@doasis.com',
      user_metadata: { full_name: 'Admin User' }
  };

  // Fetch Data in Parallel
  const [
      revenueMetrics, 
      clientGrowthMetrics, 
      appointments,
      upcomingAppointments,
      clientsResult,
      forms,
      recentResponses
  ] = await Promise.all([
      AnalyticsService.getRevenueMetrics(),
      AnalyticsService.getClientGrowthMetrics(),
      // Fetch 7 days of appointments for the schedule view logic (simplified to get upcoming for now)
      AppointmentService.getAppointmentsByDateRange(new Date().toISOString(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()),
      AppointmentService.getUpcomingAppointments(user?.id || ''),
      ClientService.getClients({ limit: 100 }),
      FormService.getForms(),
      FormService.getRecentResponses(10)
  ]);

  // Aggregate stats
  // For now, we'll treat all recent responses as "Pending Review" if they are recent
  const pendingTasksCount = recentResponses.length;

  const stats = {
      activeClients: clientGrowthMetrics.total,
      revenue: revenueMetrics.total,
      upcomingSessions: appointments.length,
      pendingTasks: pendingTasksCount
  };

  // Create real critical tasks
  const criticalTasks = [
      ...(pendingTasksCount > 0 ? [{
          title: 'Review New Responses',
          subtitle: `${pendingTasksCount} recent form submissions`,
          priority: 'High' as const
      }] : []),
      {
          title: 'Upcoming Session',
          subtitle: `Prepare for ${appointments[0]?.profiles?.full_name || 'your next client'}`,
          priority: 'Medium' as const
      }
  ];

  // Process activities from recent data
  // Combine new clients and recent appointments into a unified feed
  const newClients = (await ClientService.getClients({ limit: 3 })).data; // Fetch simplified list for feed
  
  const activities = [
      ...appointments.slice(0, 3).map((apt: any) => ({
          id: apt.id,
          user: apt.profiles?.full_name || 'Client',
          action: 'has an upcoming session',
          detail: formatDistanceToNow(new Date(apt.scheduled_at), { addSuffix: true }),
          time: 'Upcoming',
          type: 'session' as const
      })),
      ...(newClients || []).slice(0, 2).map((client: any) => ({
          id: client.id,
          user: client.full_name || 'New User',
          action: 'joined the platform',
          detail: 'New client registration',
          time: formatDistanceToNow(new Date(client.created_at), { addSuffix: true }),
          type: 'client' as const
      }))
  ].slice(0, 5);


  const userDisplayName = user?.user_metadata?.full_name || 'Practitioner';
  const showNewAppointmentModal = searchParams?.new_appointment === 'true';

  return (
    <div className="min-h-screen bg-slate-50/50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AdminHeader userName={userDisplayName} />
          
          <AdminStats stats={stats} />
          
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
                <RevenueChart data={revenueMetrics} />
            </div>
            <div>
                <ClientGrowthChart data={clientGrowthMetrics} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Left Column - Schedule */}
             <div className="lg:col-span-2">
                <AdminSchedule appointments={appointments} />
             </div>
             
             {/* Right Column - Tasks & Feed */}
             <div className="space-y-8">
                <CriticalTasks tasks={criticalTasks} />
                <ActivityFeed activities={activities} />
             </div>
          </div>
       </div>

       <NewAppointmentModal 
          clients={clientsResult.data} 
       />
    </div>
  );
}
