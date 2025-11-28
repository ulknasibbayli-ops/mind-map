export type NodeType = "goal" | "action" | "step" | "substep" | "subtask" | "microtask";

export interface MindMapNode {
  id: string;
  type: NodeType;
  label: string;
  parentId?: string;
  completed?: boolean;
  position: { x: number; y: number };
  deadline?: string;
  width?: number;
  height?: number;
}

export interface TodoItem {
  id: string;
  label: string;
  completed: boolean;
  sourceNodeId: string;
}
