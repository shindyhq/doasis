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

export interface CheckIn {
  id: string;
  user_id: string;
  mood_score: number;
  note?: string | null;
  created_at: string;
}

export type GoalStatus = 'active' | 'completed' | 'paused';

export interface GoalMilestone {
  id: string;
  goal_id: string;
  title: string;
  is_completed: boolean;
  due_date?: string | null;
  created_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  status: GoalStatus;
  progress: number;
  target_date?: string | null;
  created_at: string;
  updated_at: string;
  milestones?: GoalMilestone[];
}

export type ResourceType = 'video' | 'audio' | 'pdf' | 'link';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  thumbnail_url?: string | null;
  category: string;
  is_published: boolean;
  duration?: string | null;
  created_at: string;
}

export interface ClientResource {
  id: string;
  user_id: string;
  resource_id: string;
  status: 'in_progress' | 'completed';
  last_accessed_at: string;
  resource?: Resource;
}

// GAP FILL INTERFACES

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
  sender?: UserProfile;
  receiver?: UserProfile;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  category: string;
}

export interface UserBadge {
  user_id: string;
  badge_id: string;
  awarded_at: string;
  badge?: Badge;
}

export interface CommunityPost {
  id: string;
  author_id: string;
  content: string;
  category: string;
  likes_count: number;
  created_at: string;
  author?: UserProfile;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  description: string | null;
  invoice_url: string | null;
  created_at: string;
}
