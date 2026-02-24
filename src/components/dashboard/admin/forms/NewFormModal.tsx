'use client';

import { useState } from 'react';
import { X, ClipboardList, Info, AlertCircle, Loader2 } from 'lucide-react';
import { createFormAction } from '@/actions/admin-modules';
import { useToast } from '@/components/ui/Toast';

interface NewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function NewFormModal({ isOpen, onClose, onSuccess }: NewFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_published: false,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showToast("Form title is required", "info");
      return;
    }

    setIsSubmitting(true);
    try {
      await createFormAction({
        title: formData.title,
        description: formData.description,
        is_published: formData.is_published,
        schema: { fields: [] } // Default empty schema for now
      });
      
      showToast("Form created successfully", "success");
      onSuccess();
      onClose();
      setFormData({ title: '', description: '', is_published: false });
    } catch (error) {
      showToast("Failed to create form", "info");
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
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Create New Form</h2>
              <p className="text-sm text-slate-500">Define a new assessment or survey</p>
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
          {/* Title Identification */}
          <div className="space-y-2 group">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              Form Title
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                autoFocus
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Initial Intake Assessment"
                className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 group">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              Description
              <Info className="w-3.5 h-3.5 text-slate-400" />
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Briefly describe the purpose of this form..."
              rows={3}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Publishing Status */}
          <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl text-slate-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Publish immediately?</p>
                <p className="text-xs text-slate-500">Make this form accessible to clients now.</p>
              </div>
            </div>
            <label htmlFor="is-published" className="relative inline-flex items-center cursor-pointer">
              <input 
                id="is-published"
                type="checkbox" 
                title="Publish immediately"
                className="sr-only peer"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
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
                'Create Form'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
