import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { TodoItem } from '@/types/mindmap';

interface TodoRow {
  id: string;
  user_id: string;
  chart_id: string;
  node_id: string;
  label: string;
  completed: boolean;
}

function rowToTodo(row: TodoRow): TodoItem {
  return {
    id: row.id,
    label: row.label,
    completed: row.completed,
    sourceNodeId: row.node_id,
  };
}

export function useTodos(chartId: string | undefined) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ['todos', chartId],
    queryFn: async () => {
      if (!chartId || !user) return [];

      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('chart_id', chartId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return (data as TodoRow[]).map(rowToTodo);
    },
    enabled: !!chartId && !!user,
  });

  const createTodo = useMutation({
    mutationFn: async (todo: { label: string; sourceNodeId: string; chartId: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('todos')
        .insert({
          user_id: user.id,
          chart_id: todo.chartId,
          node_id: todo.sourceNodeId,
          label: todo.label,
          completed: false,
        })
        .select()
        .single();

      if (error) throw error;
      return rowToTodo(data as TodoRow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', chartId] });
    },
  });

  const updateTodo = useMutation({
    mutationFn: async (todo: Partial<TodoItem> & { id: string }) => {
      const updateData: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };

      if (todo.label !== undefined) updateData.label = todo.label;
      if (todo.completed !== undefined) updateData.completed = todo.completed;

      const { data, error } = await supabase
        .from('todos')
        .update(updateData)
        .eq('id', todo.id)
        .select()
        .single();

      if (error) throw error;
      return rowToTodo(data as TodoRow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', chartId] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', chartId] });
    },
  });

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    error: todosQuery.error,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}
