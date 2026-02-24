'use client';

import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardMobileHeader } from '@/components/dashboard/DashboardMobileHeader';
import { AdminNavbar } from '@/components/dashboard/admin/AdminNavbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/dashboard/admin');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 font-display [&_p]:font-display">
        <AdminNavbar />
        <main className="pt-16 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            {children}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-primary selection:bg-accent/20 font-display [&_p]:font-display">
      <DashboardMobileHeader 
        isOpen={isSidebarOpen} 
        toggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="flex-1 flex flex-col pt-36 pb-12 px-6 md:px-12 lg:pt-12 lg:p-16 w-full relative">
        {/* Grain Background */}
        <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none" />
        
        <div className="flex-1 relative z-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
