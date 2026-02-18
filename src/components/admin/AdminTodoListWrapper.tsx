'use client';

import { useState, useEffect } from 'react';
import { AdminTodoList } from '@/components/admin/AdminTodoList';
import { TodoItem } from '@/lib/types/admin';
import { createClient } from '@/lib/supabase/client';

export const AdminTodoListWrapper = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    // Mock fetching for now or generic query
    // In a real app, this would fetch from a 'todos' table
    // For now we simulate with local state or empty array
    // Since we didn't create a 'todos' table yet, we'll keep it client-side only or use a mock
    setIsLoading(false);
  };

  const handleAdd = (title: string, priority: 'low' | 'medium' | 'high') => {
    const newTodo: TodoItem = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      priority,
      completed: false,
      created_at: new Date().toISOString()
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggle = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <AdminTodoList 
      todos={todos}
      onAdd={handleAdd}
      onToggle={handleToggle}
      onDelete={handleDelete}
      // isLoading={isLoading} // Check if prop exists
    />
  );
};
