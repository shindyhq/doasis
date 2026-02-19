'use client';

import { useState } from 'react';
import { Goal, GoalMilestone } from '@/types/custom';
import { GoalService } from '@/services/GoalService';
import { Check, ChevronDown, ChevronUp, Trash2, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface GoalCardProps {
  goal: Goal;
  onUpdate: (updatedGoal: Goal) => void;
  onDelete: (goalId: string) => void;
}

export function GoalCard({ goal, onUpdate, onDelete }: GoalCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const completedMilestones = goal.milestones?.filter(m => m.is_completed).length || 0;
  const totalMilestones = goal.milestones?.length || 0;
  const progressColor = goal.progress === 100 ? 'bg-secondary' : 'bg-accent';

  const handleToggleMilestone = async (milestone: GoalMilestone) => {
    setLoadingId(milestone.id);
    try {
      const updatedMilestone = await GoalService.toggleMilestone(milestone.id, !milestone.is_completed);
      
      // Calculate new progress locally for immediate feedback
      const updatedMilestones = goal.milestones?.map(m => 
        m.id === updatedMilestone.id ? updatedMilestone : m
      );
      
      const newCompleted = updatedMilestones?.filter(m => m.is_completed).length || 0;
      const newTotal = updatedMilestones?.length || 0;
      const newProgress = newTotal > 0 ? Math.round((newCompleted / newTotal) * 100) : 0;

      onUpdate({
        ...goal,
        milestones: updatedMilestones,
        progress: newProgress,
        status: newProgress === 100 ? 'completed' : 'active'
      });
    } catch (error) {
      console.error('Failed to toggle milestone', error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this goal?')) return;
    try {
      await GoalService.deleteGoal(goal.id);
      onDelete(goal.id);
    } catch (error) {
      console.error('Failed to delete goal', error);
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-white/60 p-6 rounded-[32px] hover:shadow-lg transition-all group relative overflow-hidden">
      {/* Progress Bar Background */}
      <div className="absolute top-0 left-0 h-1 bg-primary/5 w-full">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${progressColor}`} 
          style={{ width: `${goal.progress}%` }} 
        />
      </div>

      <div className="flex justify-between items-start mb-4 mt-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${goal.status === 'completed' ? 'bg-secondary/10 text-secondary' : 'bg-primary/5 text-primary/60'}`}>
              {goal.status}
            </span>
            {goal.target_date && (
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-primary/40">
                <CalendarIcon size={10} />
                {format(new Date(goal.target_date), 'MMM d')}
              </span>
            )}
          </div>
          <h3 className="text-xl font-display font-medium text-primary">{goal.title}</h3>
          {goal.description && <p className="text-sm text-primary/60 font-serif italic mt-1">{goal.description}</p>}
        </div>
        
        <button 
          onClick={handleDelete}
          className="text-primary/20 hover:text-red-400 transition-colors p-2"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Progress Stats */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-4xl font-display font-bold text-primary">{goal.progress}%</span>
          <span className="text-xs font-serif italic text-primary/50 ml-2">completed</span>
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-primary/40">
          {completedMilestones} / {totalMilestones} Milestones
        </div>
      </div>

      {/* Milestones Section */}
      <div className="border-t border-primary/5 pt-4">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/50 hover:text-accent transition-colors w-full"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Hide Milestones' : 'View Milestones'}
        </button>

        {expanded && (
          <div className="mt-4 space-y-2">
            {goal.milestones?.map((milestone) => (
              <div 
                key={milestone.id} 
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${milestone.is_completed ? 'bg-secondary/5' : 'bg-white/40 hover:bg-white/80'}`}
              >
                <button
                  onClick={() => handleToggleMilestone(milestone)}
                  disabled={!!loadingId}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${milestone.is_completed 
                      ? 'bg-secondary border-secondary text-white' 
                      : 'border-primary/20 hover:border-accent text-transparent'
                    }
                  `}
                >
                  {loadingId === milestone.id ? (
                    <Loader2 size={12} className="animate-spin text-primary/40" />
                  ) : (
                    <Check size={12} />
                  )}
                </button>
                <span className={`text-sm font-medium ${milestone.is_completed ? 'text-primary/40 line-through decoration-primary/20' : 'text-primary'}`}>
                  {milestone.title}
                </span>
                {milestone.due_date && (
                  <span className="ml-auto text-[10px] text-primary/30 uppercase tracking-widest">
                    {format(new Date(milestone.due_date), 'MMM d')}
                  </span>
                )}
              </div>
            ))}
            {totalMilestones === 0 && (
              <p className="text-xs text-primary/40 italic text-center py-2">No milestones yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
