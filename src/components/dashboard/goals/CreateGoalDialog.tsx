'use client';

import { useState } from 'react';
import { GoalService } from '@/services/GoalService';
import { Goal } from '@/types/custom';
import { X, Plus, Loader2, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CreateGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGoalCreated: (goal: Goal) => void;
}

export function CreateGoalDialog({ isOpen, onClose, onGoalCreated }: CreateGoalDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [milestones, setMilestones] = useState([{ title: '', dueDate: '' }]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAddMilestone = () => {
    setMilestones([...milestones, { title: '', dueDate: '' }]);
  };

  const handleMilestoneChange = (index: number, field: 'title' | 'dueDate', value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setMilestones(newMilestones);
  };

  const cleanMilestones = milestones.filter(m => m.title.trim() !== '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setLoading(true);
    try {
      // 1. Create Goal
      const newGoal = await GoalService.createGoal(
        title, 
        description || undefined, 
        targetDate || undefined
      );

      // 2. Add Milestones
      const createdMilestones = [];
      for (const m of cleanMilestones) {
        if (m.title.trim()) {
           const cm = await GoalService.addMilestone(newGoal.id, m.title, m.dueDate || undefined);
           createdMilestones.push(cm);
        }
      }

      // 3. Update callback
      onGoalCreated({
        ...newGoal,
        milestones: createdMilestones
      });

      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setTargetDate('');
      setMilestones([{ title: '', dueDate: '' }]);
    } catch (error) {
      console.error('Failed to create goal', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-primary/20 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative bg-[#F5F2EB] w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-white/50 p-6 flex justify-between items-center border-b border-primary/5">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
               <Target size={20} />
             </div>
             <h2 className="text-xl font-display font-bold text-primary">New Goal</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-primary/40 hover:bg-red-50 hover:text-red-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-primary/40 mb-1 block">
                Goal Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Read 5 Books"
                className="w-full bg-white border border-primary/10 rounded-xl px-4 py-3 text-primary font-display font-medium outline-none focus:border-accent transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-primary/40 mb-1 block">
                  Target Date
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-white border border-primary/10 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-primary/40 mb-1 block">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Why is this important?"
                className="w-full bg-white border border-primary/10 rounded-xl px-4 py-3 text-primary text-sm outline-none focus:border-accent transition-colors h-20 resize-none"
              />
            </div>
          </div>

          <div className="border-t border-primary/5 pt-6">
            <div className="flex justify-between items-center mb-4">
               <label className="text-[10px] uppercase font-bold tracking-widest text-primary/40 block">
                 Milestones
               </label>
               <button
                 type="button"
                 onClick={handleAddMilestone}
                 className="text-[10px] uppercase font-bold tracking-widest text-accent hover:text-primary transition-colors flex items-center gap-1"
               >
                 <Plus size={12} /> Add Step
               </button>
            </div>
            
            <div className="space-y-3">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={milestone.title}
                    onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                    placeholder={`Step ${idx + 1}`}
                    className="flex-1 bg-white border border-primary/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
                  />
                  <input
                    type="date"
                    value={milestone.dueDate}
                    onChange={(e) => handleMilestoneChange(idx, 'dueDate', e.target.value)}
                    className="w-32 bg-white border border-primary/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-accent text-primary/60"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-6">
            <Button 
              type="submit" 
              className="w-full py-4 rounded-xl flex items-center justify-center gap-2"
              variant="secondary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Goal'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
