'use client';

import { useState } from 'react';
import { X, Send, Info, Calendar, Loader2 } from 'lucide-react';
import { createCampaignAction } from '@/actions/admin-modules';
import { useToast } from '@/components/ui/Toast';

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function NewCampaignModal({ isOpen, onClose, onSuccess }: NewCampaignModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Email' as 'Email' | 'Automated' | 'SMS' | 'Newsletter',
    status: 'draft' as 'active' | 'draft' | 'scheduled',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      showToast("Campaign name is required", "info");
      return;
    }

    setIsSubmitting(true);
    try {
      await createCampaignAction({
        name: formData.name,
        type: formData.type,
        status: formData.status,
        sent_count: 0,
        opened_count: 0,
        clicked_count: 0,
      });
      
      showToast("Campaign created successfully", "success");
      onSuccess();
      onClose();
      setFormData({ name: '', type: 'Email', status: 'draft' });
    } catch (error) {
      showToast("Failed to create campaign", "info");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">New Campaign</h2>
              <p className="text-sm text-slate-500">Create a new outreach initiative</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            title="Close modal"
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Campaign Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              Campaign Name
              <span className="text-rose-500">*</span>
            </label>
            <input
              autoFocus
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Monthly Soul Sanctuary Update"
              className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Campaign Type */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Campaign Type
            </label>
            <select
              id="campaign-type"
              title="Select campaign type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-900"
            >
              <option value="Email">Email Broadcast</option>
              <option value="Newsletter">Monthly Newsletter</option>
              <option value="Automated">Automated Sequence</option>
              <option value="SMS">SMS Campaign</option>
            </select>
          </div>

          {/* Initial Status */}
          <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl text-slate-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Set as Draft?</p>
                <p className="text-xs text-slate-500">Save now and schedule later.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                id="is-draft"
                type="checkbox" 
                title="Set as draft"
                className="sr-only peer"
                checked={formData.status === 'draft'}
                onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'draft' : 'active' })}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm" />
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl text-slate-600 font-bold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Campaign'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
