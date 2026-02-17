'use client';

import { ReactNode, useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardMobileHeader } from '@/components/dashboard/DashboardMobileHeader';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-primary selection:bg-accent/20">
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
