'use client';

import { useState } from 'react';
import { User, Mail, Phone, ChevronRight } from 'lucide-react';

interface ProfileFormProps {
  initialData: {
    full_name: string;
    email: string;
    phone?: string;
  };
}

export const ProfileForm = ({ initialData }: ProfileFormProps) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for updating profile in Supabase would go here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Full Name */}
        <div className="space-y-3">
          <label htmlFor="full_name" className="font-display text-[10px] uppercase tracking-[0.3em] font-bold text-primary/50 ml-1">
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors">
              <User size={18} />
            </div>
            <input 
              id="full_name"
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full bg-white/50 border border-primary/5 rounded-2xl py-4 pl-14 pr-6 font-display text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-3">
          <label htmlFor="email" className="font-display text-[10px] uppercase tracking-[0.3em] font-bold text-primary/50 ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors">
              <Mail size={18} />
            </div>
            <input 
              id="email"
              type="email"
              value={formData.email}
              disabled
              className="w-full bg-primary/5 border border-primary/5 rounded-2xl py-4 pl-14 pr-6 font-display text-sm text-primary/40 cursor-not-allowed"
            />
          </div>
          <p className="text-[10px] font-serif italic text-primary/40 ml-1">
            Contact support to change your email
          </p>
        </div>

        {/* Phone */}
        <div className="space-y-3">
          <label htmlFor="phone" className="font-display text-[10px] uppercase tracking-[0.3em] font-bold text-primary/50 ml-1">
            Phone Number (Optional)
          </label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors">
              <Phone size={18} />
            </div>
            <input 
              id="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-white/50 border border-primary/5 rounded-2xl py-4 pl-14 pr-6 font-display text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all placeholder:text-primary/20"
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit"
        className="w-full md:w-fit group"
      >
        Update Information
        <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
};

import { Button } from '@/components/ui/Button';
