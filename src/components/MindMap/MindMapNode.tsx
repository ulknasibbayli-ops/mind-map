import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { MindMapNode as MindMapNodeType, NodeType } from '@/types/mindmap';

interface MindMapNodeProps {
  node: MindMapNodeType;
  isSelected: boolean;
  onSelect: () => void;
  onDragEnd: (position: { x: number; y: number }) => void;
  onDoubleClick: () => void;
}

const nodeTypeStyles: Record<NodeType, { bg: string; size: string }> = {
  goal: {
    bg: 'from-blue-500 to-blue-600',
    size: 'px-6 py-4 text-base font-semibold',
  },
  step: {
    bg: 'from-purple-400 to-purple-500',
    size: 'px-5 py-3 text-sm font-medium',
  },
  action: {
    bg: 'from-pink-400 to-pink-500',
    size: 'px-5 py-3 text-sm font-medium',
  },
  substep: {
    bg: 'from-indigo-400 to-indigo-500',
    size: 'px-4 py-2 text-sm',
  },
  subtask: {
    bg: 'from-cyan-400 to-cyan-500',
    size: 'px-4 py-2 text-sm',
  },
  microtask: {
    bg: 'from-teal-400 to-teal-500',
    size: 'px-3 py-2 text-xs',
  },
};

const nodeTypeEmojis: Record<NodeType, string> = {
  goal: '🎯',
  step: '📍',
  action: '⚡',
  substep: '◆',
  subtask: '✓',
  microtask: '•',
};

export default function MindMapNode({
  node,
  isSelected,
  onSelect,
  onDragEnd,
  onDoubleClick,
}: MindMapNodeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(node.position);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPosition(node.position);
  }, [node.position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    e.stopPropagation();
    onSelect();

    const rect = nodeRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDragOffset({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCurrentPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onDragEnd(currentPosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, currentPosition, onDragEnd]);

  const style = nodeTypeStyles[node.type];

  return (
    <div
      ref={nodeRef}
      className={cn(
        "absolute cursor-grab active:cursor-grabbing select-none",
        isSelected && "z-20",
        isDragging && "z-30"
      )}
      style={{
        left: currentPosition.x,
        top: currentPosition.y,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
    >
      <div
        className={cn(
          "bg-gradient-to-br text-white rounded-2xl shadow-lg min-w-max transition-all",
          style.bg,
          style.size,
          isSelected && "ring-4 ring-white ring-opacity-50 node-selected",
          node.completed && "opacity-60"
        )}
      >
        <div className="flex items-center gap-2">
          <span>{nodeTypeEmojis[node.type]}</span>
          <span className={cn(node.completed && "line-through")}>{node.label}</span>
        </div>
        {node.deadline && (
          <div className="text-xs opacity-80 mt-1">
            {new Date(node.deadline).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}
