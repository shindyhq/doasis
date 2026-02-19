'use client';

import { useState } from 'react';
import { Goal } from '@/types/custom';
import { GoalCard } from '@/components/dashboard/goals/GoalCard';
import { CreateGoalDialog } from '@/components/dashboard/goals/CreateGoalDialog';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface GoalsPageClientProps {
  initialGoals: Goal[];
}

export function GoalsPageClient({ initialGoals }: GoalsPageClientProps) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGoalCreated = (newGoal: Goal) => {
    setGoals([newGoal, ...goals]);
  };

  const handleGoalUpdate = (updatedGoal: Goal) => {
    setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
  };

  const handleGoalDelete = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-white/40 p-1 rounded-2xl w-fit">
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/10 group"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
             <Plus size={14} />
          </div>
          <span className="font-display font-medium text-sm tracking-wide">Set New Goal</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <GoalCard 
                goal={goal} 
                onUpdate={handleGoalUpdate}
                onDelete={handleGoalDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {goals.length === 0 && (
          <div className="col-span-full text-center py-20 flex flex-col items-center justify-center opacity-40">
            <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <Plus size={40} className="text-primary/20" />
            </div>
            <h3 className="font-display text-xl text-primary font-bold uppercase tracking-widest">No Goals Yet</h3>
            <p className="font-serif italic text-primary/60 mt-2">The journey of a thousand miles begins with a single step.</p>
          </div>
        )}
      </div>

      {/* Dialog */}
      <CreateGoalDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onGoalCreated={handleGoalCreated}
      />
    </div>
  );
}
