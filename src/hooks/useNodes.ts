import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { MindMapNode, NodeType } from '@/types/mindmap';

interface NodeRow {
  id: string;
  chart_id: string;
  type: string;
  label: string;
  parent_id: string | null;
  completed: boolean;
  position_x: number;
  position_y: number;
  deadline: string | null;
  width: number | null;
  height: number | null;
}

function rowToNode(row: NodeRow): MindMapNode {
  return {
    id: row.id,
    type: row.type as NodeType,
    label: row.label,
    parentId: row.parent_id ?? undefined,
    completed: row.completed,
    position: { x: row.position_x, y: row.position_y },
    deadline: row.deadline ?? undefined,
    width: row.width ?? undefined,
    height: row.height ?? undefined,
  };
}

export function useNodes(chartId: string | undefined) {
  const queryClient = useQueryClient();

  const nodesQuery = useQuery({
    queryKey: ['nodes', chartId],
    queryFn: async () => {
      if (!chartId) return [];

      const { data, error } = await supabase
        .from('nodes')
        .select('*')
        .eq('chart_id', chartId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return (data as NodeRow[]).map(rowToNode);
    },
    enabled: !!chartId,
  });

  const createNode = useMutation({
    mutationFn: async (node: Omit<MindMapNode, 'id'> & { chartId: string }) => {
      const { data, error } = await supabase
        .from('nodes')
        .insert({
          chart_id: node.chartId,
          type: node.type,
          label: node.label,
          parent_id: node.parentId ?? null,
          completed: node.completed ?? false,
          position_x: node.position.x,
          position_y: node.position.y,
          deadline: node.deadline ?? null,
          width: node.width ?? null,
          height: node.height ?? null,
        })
        .select()
        .single();

      if (error) throw error;
      return rowToNode(data as NodeRow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nodes', chartId] });
    },
  });

  const updateNode = useMutation({
    mutationFn: async (node: Partial<MindMapNode> & { id: string }) => {
      const updateData: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };

      if (node.type !== undefined) updateData.type = node.type;
      if (node.label !== undefined) updateData.label = node.label;
      if (node.parentId !== undefined) updateData.parent_id = node.parentId;
      if (node.completed !== undefined) updateData.completed = node.completed;
      if (node.position !== undefined) {
        updateData.position_x = node.position.x;
        updateData.position_y = node.position.y;
      }
      if (node.deadline !== undefined) updateData.deadline = node.deadline;
      if (node.width !== undefined) updateData.width = node.width;
      if (node.height !== undefined) updateData.height = node.height;

      const { data, error } = await supabase
        .from('nodes')
        .update(updateData)
        .eq('id', node.id)
        .select()
        .single();

      if (error) throw error;
      return rowToNode(data as NodeRow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nodes', chartId] });
    },
  });

  const deleteNode = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('nodes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nodes', chartId] });
    },
  });

  return {
    nodes: nodesQuery.data ?? [],
    isLoading: nodesQuery.isLoading,
    error: nodesQuery.error,
    createNode,
    updateNode,
    deleteNode,
  };
}
