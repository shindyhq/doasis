import { createClient } from '@/lib/supabase/client';
import { Goal, GoalMilestone, GoalStatus } from '@/types/custom';

export const GoalService = {
  /**
   * Fetch all goals for the current user with their milestones
   */
  async getGoals() {
    const supabase = createClient();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('goals')
        .select(`
          *,
          milestones:goal_milestones(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Sort milestones by due date or created_at
      const goals = (data || []).map((goal: any) => ({
        ...goal,
        milestones: (goal.milestones || []).sort((a: any, b: any) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      }));

      return goals as Goal[];
    } catch (error) {
      console.error('Error fetching goals:', error);
      return [];
    }
  },

  /**
   * Create a new goal
   */
  async createGoal(title: string, description?: string, targetDate?: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('goals')
      .insert({
        user_id: user.id,
        title,
        description,
        target_date: targetDate,
        status: 'active',
        progress: 0
      })
      .select()
      .single();

    if (error) throw error;
    return data as Goal;
  },

  /**
   * Add a milestone to a goal
   */
  async addMilestone(goalId: string, title: string, dueDate?: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('goal_milestones')
      .insert({
        goal_id: goalId,
        title,
        due_date: dueDate,
        is_completed: false
      })
      .select()
      .single();

    if (error) throw error;
    
    // Recalculate progress
    await this.calculateProgress(goalId);
    
    return data as GoalMilestone;
  },

  /**
   * Toggle milestone completion status
   */
  async toggleMilestone(milestoneId: string, isCompleted: boolean) {
    const supabase = createClient();
    
    // Get the milestone first to find the goal_id
    const { data: milestone, error: fetchError } = await supabase
      .from('goal_milestones')
      .select('goal_id')
      .eq('id', milestoneId)
      .single();
      
    if (fetchError || !milestone) throw fetchError || new Error('Milestone not found');

    // Update status
    const { data, error } = await supabase
      .from('goal_milestones')
      .update({ is_completed: isCompleted })
      .eq('id', milestoneId)
      .select()
      .single();

    if (error) throw error;

    // Recalculate progress for the parent goal
    await this.calculateProgress(milestone.goal_id);

    return data as GoalMilestone;
  },

  /**
   * Internal: Recalculate and update goal progress percentage
   */
  async calculateProgress(goalId: string) {
    const supabase = createClient();
    
    // Fetch all milestones for this goal
    const { data: milestones } = await supabase
      .from('goal_milestones')
      .select('is_completed')
      .eq('goal_id', goalId);

    if (!milestones || milestones.length === 0) return;

    const total = milestones.length;
    const completed = milestones.filter(m => m.is_completed).length;
    const progress = Math.round((completed / total) * 100);

    // Update goal
    await supabase
      .from('goals')
      .update({ 
        progress,
        status: progress === 100 ? 'completed' : 'active'
      })
      .eq('id', goalId);
  },

  /**
   * Delete a goal
   */
  async deleteGoal(goalId: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', goalId);

    if (error) throw error;
  }
};
