import { Profile, Session, TodoItem } from '../types/admin';

// Mock Data for initial development
const MOCK_CLIENTS: Profile[] = [
  {
    id: '1',
    email: 'sarah@example.com',
    full_name: 'Sarah Jenkins',
    role: 'client',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'michael@example.com',
    full_name: 'Michael Chen',
    role: 'client',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'elena@example.com',
    full_name: 'Elena Rodriguez',
    role: 'client',
    created_at: new Date().toISOString(),
  }
];

const MOCK_TODOS: TodoItem[] = [
  { id: 't1', title: 'Follow up with Jordan on intake form', completed: false, priority: 'high', created_at: new Date().toISOString() },
  { id: 't2', title: 'Prepare notes for Grief & Identity workshop', completed: false, priority: 'medium', created_at: new Date().toISOString() },
  { id: 't3', title: 'Update Zoom link for Casey', completed: true, priority: 'low', created_at: new Date().toISOString() },
];

const MOCK_SESSIONS: Session[] = [
  { id: 's1', client_id: '1', client_name: 'Sarah Jenkins', title: 'Bi-Weekly Coaching', start_time: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(), end_time: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(), type: 'coaching', status: 'scheduled' },
  { id: 's2', client_id: '2', client_name: 'Michael Chen', title: 'Monthly Reflection', start_time: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), end_time: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), type: 'coaching', status: 'scheduled' },
  { id: 's3', client_id: '3', client_name: 'Elena Rodriguez', title: 'New Client Consult', start_time: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), end_time: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), type: 'consultation', status: 'scheduled' },
];

export const adminService = {
  async searchClients(query: string): Promise<Profile[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query) return MOCK_CLIENTS;
    
    const lowerQuery = query.toLowerCase();
    return MOCK_CLIENTS.filter(client => 
      client.full_name?.toLowerCase().includes(lowerQuery) || 
      client.email.toLowerCase().includes(lowerQuery)
    );
  },

  async getClientDetails(id: string): Promise<Profile | null> {
    return MOCK_CLIENTS.find(c => c.id === id) || null;
  },

  async assignService(clientId: string, serviceName: string, price?: number): Promise<boolean> {
    console.log(`Assigning ${serviceName} to client ${clientId} at $${price}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  },

  async assignLink(clientId: string, link: string): Promise<boolean> {
    console.log(`Assigning link ${link} to client ${clientId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  },

  async getSessions(month: number, year: number): Promise<Session[]> {
    return MOCK_SESSIONS;
  },

  async getTodos(): Promise<TodoItem[]> {
    return MOCK_TODOS;
  }
};
