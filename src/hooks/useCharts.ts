import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Chart } from '@/types/mindmap';

export function useCharts() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const chartsQuery = useQuery({
    queryKey: ['charts', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('charts')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data as Chart[];
    },
    enabled: !!user,
  });

  const createChart = useMutation({
    mutationFn: async (name: string) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('charts')
        .insert({ name, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data as Chart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['charts', user?.id] });
    },
  });

  const updateChart = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { data, error } = await supabase
        .from('charts')
        .update({ name, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Chart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['charts', user?.id] });
    },
  });

  const deleteChart = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('charts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['charts', user?.id] });
    },
  });

  return {
    charts: chartsQuery.data ?? [],
    isLoading: chartsQuery.isLoading,
    error: chartsQuery.error,
    createChart,
    updateChart,
    deleteChart,
  };
}
