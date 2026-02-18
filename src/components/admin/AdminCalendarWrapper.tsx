'use client';

import { useState } from 'react';
import { AdminCalendar } from '@/components/admin/AdminCalendar';
import { Session } from '@/lib/types/admin';

export const AdminCalendarWrapper = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);

  // Todo: Fetch real appointment data via Server Action or API
  
  return (
    <AdminCalendar 
      sessions={sessions}
      isLoading={loading}
      onDateSelect={(date) => console.log('Selected date:', date)}
    />
  );
};
