export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'admin' | 'client';
  created_at: string;
}

export interface ClientService {
  id: string;
  client_id: string;
  service_name: string;
  status: 'active' | 'completed' | 'pending';
  zoom_link?: string;
  notes?: string;
  created_at: string;
}

export interface SessionDocument {
  id: string;
  client_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  uploaded_at: string;
}

export interface Session {
  id: string;
  client_id: string;
  client_name?: string;
  title: string;
  start_time: string;
  end_time: string;
  type: 'coaching' | 'consultation' | 'workshop';
  status: 'scheduled' | 'cancelled' | 'completed';
}

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}
