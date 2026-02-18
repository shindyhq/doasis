export type UserRole = 'admin' | 'client';

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  updated_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  scheduled_at: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'noshow';
  type: string;
  notes?: string | null;
  meeting_link?: string | null;
  created_at: string;
}

export interface SecurityLog {
  id: string;
  user_id: string | null;
  event_type: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  mood: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}
