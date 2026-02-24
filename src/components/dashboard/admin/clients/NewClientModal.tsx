'use client';

import { X, Mail, User, Phone, Calendar, MessageSquare, AlertCircle, Bookmark } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { inviteClient } from '@/actions/clients';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="font-display px-8 py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-[0.25em] text-[10px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center gap-2 group border border-primary/20"
    >
      {pending ? 'Invoking System...' : 'Invite Client & Save info'}
    </button>
  );
}

export function NewClientModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const isOpen = searchParams.get('new_client') === 'true';

  if (!isOpen) return null;

  const closeModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('new_client');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">Add New Client</h2>
            <p className="text-slate-500 text-sm mt-1">Capture comprehensive details to personalize their experience.</p>
          </div>
          <button onClick={closeModal} className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-transparent hover:border-slate-100" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form action={inviteClient} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          
          {/* Section: Basic Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-secondary">
              <User className="w-5 h-5" />
              <h3 className="font-semibold uppercase tracking-wider text-xs">Essential Identity</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="full_name" className="text-sm font-medium text-slate-700 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    name="full_name" 
                    id="full_name" 
                    required
                    placeholder="e.g. Alexandra Smith"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    required
                    placeholder="alexandra@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-slate-700 ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="dob" className="text-sm font-medium text-slate-700 ml-1">Date of Birth</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="date" 
                    name="dob" 
                    id="dob" 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-sans"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Biography */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-secondary">
              <Bookmark className="w-5 h-5" />
              <h3 className="font-semibold uppercase tracking-wider text-xs">Client Biography</h3>
            </div>
            <div className="space-y-2">
              <textarea 
                name="bio" 
                id="bio" 
                rows={4}
                placeholder="Share a brief overview of the client's background, goals, or any specific notes that will help in providing personalized care..."
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-sans resize-none h-32"
              ></textarea>
            </div>
          </div>

          {/* Section: Communication & Emergency */}
          <div className="space-y-6 pt-4 border-t border-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Communication Preference */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-secondary">
                  <MessageSquare className="w-4 h-4" />
                  <h3 className="font-semibold uppercase tracking-wider text-xs">Communication</h3>
                </div>
                <div className="space-y-2">
                  <select 
                    name="preferred_communication" 
                    id="preferred_communication"
                    title="Preferred Communication Method"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-sans appearance-none"
                  >
                    <option value="email">Email Only</option>
                    <option value="phone">Phone Calls</option>
                    <option value="whatsapp">WhatsApp / Messaging</option>
                    <option value="any">Multi-channel</option>
                  </select>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-500">
                  <AlertCircle className="w-4 h-4" />
                  <h3 className="font-semibold uppercase tracking-wider text-xs">Emergency Contact</h3>
                </div>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    name="emergency_contact_name" 
                    placeholder="Contact Name"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300"
                  />
                  <input 
                    type="tel" 
                    name="emergency_contact_phone" 
                    placeholder="Contact Phone"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
            <button 
              type="button" 
              onClick={closeModal}
              className="px-6 py-3 text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
            >
              Discard Changes
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
