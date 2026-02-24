'use client';

import { useState } from 'react';
import { X, UploadCloud, Info, Link as LinkIcon, FileText, Music, Video, Loader2 } from 'lucide-react';
import { createResourceAction } from '@/actions/admin-modules';
import { useToast } from '@/components/ui/Toast';
import { ResourceType } from '@/types/custom';

interface ResourceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ResourceUploadModal({ isOpen, onClose, onSuccess }: ResourceUploadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'pdf' as ResourceType,
    url: '',
    category: 'General',
    is_published: true,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) {
      showToast("Title and URL are required", "info");
      return;
    }

    setIsSubmitting(true);
    try {
      await createResourceAction({
        ...formData,
      });
      
      showToast("Resource uploaded successfully", "success");
      onSuccess();
      onClose();
      setFormData({ 
        title: '', 
        description: '', 
        type: 'pdf', 
        url: '', 
        category: 'General',
        is_published: true 
      });
    } catch (error) {
      showToast("Failed to upload resource", "info");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Music;
      case 'pdf': return FileText;
      default: return LinkIcon;
    }
  };

  const SelectedIcon = getTypeIcon(formData.type);

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
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Upload Resource</h2>
              <p className="text-sm text-slate-500">Add a new file or link to the library</p>
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

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Resource Title <span className="text-rose-500">*</span>
            </label>
            <input
              autoFocus
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Guide to Inner Stillness"
              className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Type and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Type</label>
              <div className="relative">
                <select
                  id="resource-type"
                  title="Select resource type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ResourceType })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="video">Video Masterclass</option>
                  <option value="audio">Audio Session</option>
                  <option value="link">External Link</option>
                </select>
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <SelectedIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Meditation"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* URL */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Source URL <span className="text-rose-500">*</span>
            </label>
            <div className="relative group/field">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-primary transition-colors">
                <LinkIcon className="w-4 h-4" />
              </div>
              <input
                type="url"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              Description
              <Info className="w-3.5 h-3.5 text-slate-400" />
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What is this resource about?"
              rows={2}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
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
                  Uploading...
                </>
              ) : (
                'Upload Resource'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
