'use client';

import { useState } from 'react';
import { Plus, ClipboardList, ChevronRight, MoreHorizontal, Users, Clock } from 'lucide-react';
import { NewFormModal } from '@/components/dashboard/admin/forms/NewFormModal';
import { Form, FormResponse } from '@/types/custom';
import { useRouter } from 'next/navigation';

interface FormsClientProps {
  initialForms: Form[];
  initialResponses: (FormResponse & { profile: any })[];
}

export function FormsClient({ initialForms, initialResponses }: FormsClientProps) {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Forms & Surveys</h1>
          <p className="text-slate-500 mt-1">Create, manage, and review client assessments, intake forms, and feedback surveys.</p>
        </div>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm hover:shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          Create New Form
        </button>
      </div>

      {/* Stats (Simplified for brevity, can be passed as props if needed) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-2xl font-bold text-slate-900 font-display">{initialForms.length}</p>
          <p className="text-sm font-semibold text-slate-700 mt-1">Total Forms</p>
          <p className="text-xs text-slate-400 mt-0.5">Active & Draft</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-2xl font-bold text-slate-900 font-display">{initialResponses.length}</p>
          <p className="text-sm font-semibold text-slate-700 mt-1">Total Responses</p>
          <p className="text-xs text-slate-400 mt-0.5">All time</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-2xl font-bold text-slate-900 font-display">92%</p>
          <p className="text-sm font-semibold text-slate-700 mt-1">Completion Rate</p>
          <p className="text-xs text-slate-400 mt-0.5">Avg completion</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-2xl font-bold text-slate-900 font-display">0</p>
          <p className="text-sm font-semibold text-slate-700 mt-1">Pending Review</p>
          <p className="text-xs text-slate-400 mt-0.5">Awaiting action</p>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Create New Card */}
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="h-48 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-secondary/5 transition-all group w-full"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-secondary/20 group-hover:text-secondary transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-semibold text-sm">Create New Form</span>
        </button>

        {/* Existing Forms */}
        {initialForms.map((form) => (
          <div
            key={form.id}
            className="h-48 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary group-hover:bg-secondary/20 transition-colors">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <button
                  title="More options"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">{form.title}</h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">{form.description}</p>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-2">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  form.is_published
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {form.is_published ? 'published' : 'draft'}
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 0</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(form.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Responses */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Responses</h2>
          <button
            title="View all responses"
            className="flex items-center gap-1 text-sm font-medium text-secondary hover:text-primary transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {initialResponses.length === 0 ? (
            <div className="px-6 py-8 text-center text-slate-400 text-sm">
              No responses received yet.
            </div>
          ) : initialResponses.map((r, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm">
                  {r.profile?.full_name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{r.profile?.full_name || 'Anonymous'}</p>
                  <p className="text-xs text-slate-500">Form Response</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{new Date(r.submitted_at).toLocaleDateString()}</span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500`}
                >
                  new
                </span>
                <button title="View response" className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-primary hover:text-white transition-all">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewFormModal 
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
