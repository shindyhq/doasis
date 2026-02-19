import { Plus } from 'lucide-react';

export default function FormsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Assessments & Intake
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Forms
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Create New Card */}
         <button className="h-64 rounded-[32px] border-2 border-dashed border-primary/10 flex flex-col items-center justify-center gap-4 text-primary/40 hover:text-primary hover:border-primary/20 hover:bg-white/40 transition-all group">
            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
               <Plus size={32} />
            </div>
            <span className="font-display font-bold">Create New Form</span>
         </button>

         {/* Existing Forms */}
         {['Intake Questionnaire', 'Weekly Check-in', 'Feedback Survey'].map(form => (
            <div key={form} className="h-64 bg-white/50 border border-white/60 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer">
               <div>
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl mb-4" />
                  <h3 className="font-display font-bold text-xl text-primary">{form}</h3>
                  <p className="text-sm text-primary/60 mt-2">Last updated 2 days ago</p>
               </div>
               <div className="flex justify-between items-center border-t border-primary/5 pt-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Published</span>
                  <span className="text-xs font-bold text-primary/40">12 Responses</span>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
