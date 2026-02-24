import { ArrowRight } from 'lucide-react';

interface Task {
  title: string;
  subtitle: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface CriticalTasksProps {
  tasks?: Task[];
}

export function CriticalTasks({ tasks = [] }: CriticalTasksProps) {
  return (
    <div className="bg-slate-900 text-white rounded-[32px] shadow-lg p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] -mr-32 -mt-32 opacity-20 group-hover:opacity-30 transition-opacity"></div>
      
      <h2 className="text-xl font-display font-medium mb-8 flex items-center gap-3 relative z-10">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
        Critical Tasks
      </h2>

      <div className="space-y-4 relative z-10">
        {tasks.length === 0 ? (
          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-sm font-serif italic">All clear for now.</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="bg-white/5 p-5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group border border-white/5 hover:border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-100 group-hover:text-white transition-colors">{task.title}</h3>
                    {task.priority === 'High' && (
                      <span className="text-[10px] bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded uppercase tracking-widest font-bold">High</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 font-medium">{task.subtitle}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
        <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">
           <span className="text-secondary">Pro Tip:</span> Automation active for follow-ups.
        </p>
      </div>
    </div>
  );
}
