
'use client';

import { useState } from 'react';
import { Widget } from '@/components/admin/widgets/Widget';
import { TodoItem } from '@/lib/types/admin';
import { CheckCircle2, Circle, Plus, Trash2, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SanctuaryTasksWidgetProps {
  todos: TodoItem[];
  onAdd: (title: string, priority: 'low' | 'medium' | 'high') => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const SanctuaryTasksWidget = ({ todos, onAdd, onToggle, onDelete }: SanctuaryTasksWidgetProps) => {
  const [newTodo, setNewTodo] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAdd(newTodo, 'medium');
      setNewTodo('');
    }
  };

  return (
    <Widget className="h-full min-h-[400px]">
      <Widget.Header 
        title="Sanctuary Tasks" 
        subtitle="Daily Focus"
        icon={<ListTodo size={24} />}
      />
      
      <div className="p-6 pb-0">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full bg-white/50 border border-primary/5 rounded-2xl py-3 pl-4 pr-12 font-display text-sm focus:border-accent/30 outline-none transition-all"
          />
          <button 
            type="submit"
            aria-label="Add Task"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-background rounded-xl hover:bg-accent transition-colors"
          >
            <Plus size={16} />
          </button>
        </form>
      </div>

      <Widget.Content className="space-y-2 p-6">
        <AnimatePresence initial={false}>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className={`
                group flex items-center justify-between p-3 rounded-2xl border transition-all
                ${todo.completed ? 'bg-primary/[0.01] border-primary/5 opacity-50' : 'bg-white/40 border-primary/5 hover:border-accent/20 hover:bg-white/80'}
              `}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button 
                  onClick={() => onToggle(todo.id)}
                  aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                  className={`transition-colors ${todo.completed ? 'text-accent' : 'text-primary/10 hover:text-accent/40'}`}
                >
                  {todo.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
                <span className={`font-display text-sm truncate ${todo.completed ? 'line-through text-primary/40' : 'text-primary'}`}>
                  {todo.title}
                </span>
              </div>
              <button 
                onClick={() => onDelete(todo.id)}
                aria-label="Delete Task"
                className="text-primary/10 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </Widget.Content>
    </Widget>
  );
};
