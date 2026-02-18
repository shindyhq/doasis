'use client';

import { useState } from 'react';
import { Plus, CheckCircle2, Circle, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { TodoItem } from '@/lib/types/admin';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminTodoListProps {
  todos: TodoItem[];
  onAdd: (title: string, priority: 'low' | 'medium' | 'high') => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const AdminTodoList = ({ todos, onAdd, onToggle, onDelete, isLoading }: AdminTodoListProps) => {
  const [newTodo, setNewTodo] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    onAdd(newTodo, newPriority);
    setNewTodo('');
  };

  return (
    <div className="glass rounded-[40px] p-8 border border-primary/5 shadow-xl flex flex-col bg-white/40">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-display font-medium text-primary">Sanctuary <span className="font-serif italic text-secondary">Tasks</span></h3>
          <p className="font-serif italic text-xs text-primary/40 mt-1">Daily administrative focus</p>
        </div>
        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
           <AlertCircle size={20} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full bg-white border border-primary/5 rounded-2xl p-4 pr-12 font-display text-sm text-primary outline-none focus:border-accent transition-all shadow-sm"
          />
          <button 
            type="submit"
            title="Add Task"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-background rounded-xl hover:bg-accent hover:text-primary transition-all active:scale-90 touch-manipulation min-h-[44px] min-w-[44px]"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-4 px-2">
          <span className="font-display text-[9px] uppercase tracking-widest font-bold text-primary/30">Priority:</span>
          {['low', 'medium', 'high'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setNewPriority(p as any)}
              className={`
                px-3 py-1 rounded-full font-display text-[9px] uppercase tracking-widest font-bold transition-all border
                ${newPriority === p 
                  ? 'bg-primary text-background border-primary shadow-md' 
                  : 'bg-white text-primary/40 border-primary/5 hover:border-primary/20'}
              `}
            >
              {p}
            </button>
          ))}
        </div>
      </form>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-primary/20 gap-3">
            <Loader2 className="animate-spin" size={32} />
            <p className="font-display text-[10px] uppercase tracking-widest font-bold">Refining records...</p>
          </div>
        ) : todos.length > 0 ? (
          <AnimatePresence initial={false}>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`
                  group flex items-center justify-between p-4 rounded-2xl transition-all border
                  ${todo.completed 
                    ? 'bg-primary/[0.02] border-primary/5 opacity-50' 
                    : 'bg-white border-primary/5 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5'}
                `}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button 
                    onClick={() => onToggle(todo.id)}
                    className={`transition-colors ${todo.completed ? 'text-accent' : 'text-primary/10 hover:text-accent/40'}`}
                  >
                    {todo.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <div className="flex flex-col">
                    <span className={`font-display text-sm font-medium ${todo.completed ? 'line-through text-primary/40' : 'text-primary'}`}>
                      {todo.title}
                    </span>
                    <span className={`text-[9px] uppercase tracking-widest font-bold mt-1 ${
                      todo.priority === 'high' ? 'text-red-400' : todo.priority === 'medium' ? 'text-accent' : 'text-primary/30'
                    }`}>
                      {todo.priority} Priority
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(todo.id)}
                  className="p-2 text-primary/10 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                  title="Delete Task"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-primary/10 gap-3 border-2 border-dashed border-primary/5 rounded-[32px]">
            <CheckCircle2 size={32} />
            <p className="font-serif italic text-sm">All paths are clear in the sanctuary.</p>
          </div>
        )}
      </div>
    </div>
  );
};
