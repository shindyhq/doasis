'use client';

import { X, Calendar as CalendarIcon, Clock, User } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { createAppointment } from '@/actions/appointments'; // We'll create this next
import { useFormStatus } from 'react-dom';
import { UserProfile } from '@/types/custom';

interface NewAppointmentModalProps {
  clients: UserProfile[];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {pending ? 'Creating...' : 'Create Appointment'}
    </button>
  );
}

export function NewAppointmentModal({ clients }: NewAppointmentModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const isOpen = searchParams.get('new_appointment') === 'true';
  const prefillDate = searchParams.get('date') || new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  const closeModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('new_appointment');
    params.delete('date');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">New Appointment</h2>
          <button onClick={closeModal} className="text-slate-400 hover:text-slate-500 transition-colors" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form action={createAppointment} className="p-6 space-y-4">
          
          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Appointment Title</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              required
              placeholder="e.g. Weekly Session"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Client */}
          <div className="space-y-1">
            <label htmlFor="client_id" className="block text-sm font-medium text-slate-700">Client</label>
            <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  name="client_id" 
                  id="client_id"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none bg-white"
                >
                  <option value="" disabled selected>Select a client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.full_name || client.email}</option>
                  ))}
                </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
              {/* Date */}
              <div className="space-y-1">
                <label htmlFor="start_date" className="block text-sm font-medium text-slate-700">Date</label>
                <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="date" 
                      name="start_date" 
                      id="start_date"
                      required
                      defaultValue={prefillDate}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-sans"
                    />
                </div>
              </div>

              {/* Time */}
              <div className="space-y-1">
                <label htmlFor="start_time" className="block text-sm font-medium text-slate-700">Time</label>
                <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="time" 
                      name="start_time" 
                      id="start_time"
                      required
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-sans"
                    />
                </div>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
               {/* Duration */}
               <div className="space-y-1">
                <label htmlFor="duration" className="block text-sm font-medium text-slate-700">Duration</label>
                <select 
                  name="duration" 
                  id="duration"
                  defaultValue="60"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all bg-white"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              {/* Type */}
               <div className="space-y-1">
                <label htmlFor="type" className="block text-sm font-medium text-slate-700">Type</label>
                <select 
                  name="type" 
                  id="type"
                  defaultValue="session"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all bg-white"
                >
                  <option value="session">Session</option>
                  <option value="consultation">Consultation</option>
                  <option value="meeting">Meeting</option>
                  <option value="other">Other</option>
                </select>
              </div>
          </div>
          
          {/* Notes */}
          <div className="space-y-1">
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes (Optional)</label>
            <textarea 
              name="notes" 
              id="notes" 
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-400 resize-none"
              placeholder="Add any details..."
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
