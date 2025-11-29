import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Minus, Maximize, Wand2, Download, ListTodo } from 'lucide-react';
import MindMapNode from './MindMapNode';
import NodeDialog from './NodeDialog';
import type { MindMapNode as MindMapNodeType } from '@/types/mindmap';

interface MindMapCanvasProps {
  chartId: string;
  nodes: MindMapNodeType[];
  onCreateNode: (node: Omit<MindMapNodeType, 'id'>) => void;
  onUpdateNode: (node: Partial<MindMapNodeType> & { id: string }) => void;
  onDeleteNode: (id: string) => void;
  onAddToTodo: (node: MindMapNodeType) => void;
}

export default function MindMapCanvas({
  chartId: _chartId,
  nodes,
  onCreateNode,
  onUpdateNode,
  onDeleteNode,
  onAddToTodo,
}: MindMapCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<MindMapNodeType | null>(null);
  const [deadlineFilter, setDeadlineFilter] = useState('all');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // Handle zoom
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const handleFitToScreen = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Handle canvas panning
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).closest('svg')) {
      setSelectedNodeId(null);
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleCanvasMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isPanning) {
        setPan({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        });
      }
    },
    [isPanning, panStart]
  );

  const handleCanvasMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleCanvasMouseMove);
    window.addEventListener('mouseup', handleCanvasMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleCanvasMouseMove);
      window.removeEventListener('mouseup', handleCanvasMouseUp);
    };
  }, [handleCanvasMouseMove, handleCanvasMouseUp]);

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((z) => Math.min(Math.max(z + delta, 0.5), 2));
    }
  };

  // Add new node
  const handleAddNode = () => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    const centerX = (canvasRect.width / 2 - pan.x) / zoom;
    const centerY = (canvasRect.height / 2 - pan.y) / zoom;

    onCreateNode({
      type: nodes.length === 0 ? 'goal' : 'step',
      label: nodes.length === 0 ? 'Main Goal' : 'New Node',
      position: {
        x: centerX + (Math.random() - 0.5) * 100,
        y: centerY + (Math.random() - 0.5) * 100,
      },
      parentId: nodes.length > 0 ? nodes[0].id : undefined,
    });
  };

  // Calculate connections
  const connections = nodes
    .filter((node) => node.parentId)
    .map((node) => {
      const parent = nodes.find((n) => n.id === node.parentId);
      if (!parent) return null;
      return {
        id: `${parent.id}-${node.id}`,
        from: parent.position,
        to: node.position,
      };
    })
    .filter(Boolean);

  // Filter nodes by deadline
  const filteredNodes = nodes.filter((node) => {
    if (deadlineFilter === 'all') return true;
    if (!node.deadline) return deadlineFilter === 'no-deadline';

    const deadline = new Date(node.deadline);
    const now = new Date();
    const daysDiff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    switch (deadlineFilter) {
      case 'this-week':
        return daysDiff >= 0 && daysDiff <= 7;
      case 'this-month':
        return daysDiff >= 0 && daysDiff <= 30;
      case 'overdue':
        return daysDiff < 0;
      default:
        return true;
    }
  });

  const completedCount = nodes.filter((n) => n.completed).length;

  return (
    <div className="flex h-full">
      {/* Canvas */}
      <div
        ref={canvasRef}
        className="flex-1 relative bg-white overflow-hidden mind-map-canvas cursor-grab active:cursor-grabbing"
        onMouseDown={handleCanvasMouseDown}
        onWheel={handleWheel}
      >
        {/* SVG Canvas for connections */}
        <svg
          id="canvas-connections"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {connections.map((conn) => conn && (
              <line
                key={conn.id}
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                stroke="hsl(var(--border))"
                strokeWidth={2 / zoom}
                strokeDasharray="5,5"
              />
            ))}
          </g>
        </svg>

        {/* Nodes Container */}
        <div
          id="nodes-container"
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 2,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
        >
          {filteredNodes.map((node) => (
            <MindMapNode
              key={node.id}
              node={node}
              isSelected={node.id === selectedNodeId}
              onSelect={() => setSelectedNodeId(node.id)}
              onDragEnd={(position) => onUpdateNode({ id: node.id, position })}
              onDoubleClick={() => setEditingNode(node)}
            />
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
          <Button variant="outline" size="icon" onClick={handleZoomIn} className="bg-white shadow-md">
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut} className="bg-white shadow-md">
            <Minus className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleFitToScreen} className="bg-white shadow-md">
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        {/* Mini Map */}
        <div className="absolute bottom-6 left-6 w-24 h-24 bg-white border-2 border-gray-300 rounded-lg shadow-md z-20 overflow-hidden">
          <div className="w-full h-full gradient-card relative">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  left: `${(node.position.x / 1000) * 100}%`,
                  top: `${(node.position.y / 1000) * 100}%`,
                }}
              />
            ))}
            <div className="absolute inset-2 border border-blue-400 rounded opacity-60" />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Desktop Only */}
      <div className="hidden lg:flex w-80 border-l border-gray-200 bg-white flex-col shadow-sm">
        {/* Toolbar */}
        <div className="px-4 py-4 border-b border-gray-200 space-y-3">
          <Button onClick={handleAddNode} className="w-full gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1">
              <Wand2 className="w-4 h-4 mr-1" />
              Auto Layout
            </Button>
            <Button variant="secondary" size="sm" className="flex-1">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 py-3 border-b border-gray-200">
          <label className="text-xs font-semibold text-gray-600 block mb-2">
            Deadline Filter
          </label>
          <Select value={deadlineFilter} onValueChange={setDeadlineFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Deadlines" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Deadlines</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="no-deadline">No Deadline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Node Details */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <div id="panel-node-details">
            <h3 className="font-semibold text-gray-900 mb-3">Selected Node</h3>
            {selectedNode ? (
              <div className="gradient-card rounded-lg p-4 border border-blue-200">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {selectedNode.label}
                </div>
                {selectedNode.deadline && (
                  <div className="text-xs text-gray-600 mb-3">
                    Deadline: {new Date(selectedNode.deadline).toLocaleDateString()}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => setEditingNode(selectedNode)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => onAddToTodo(selectedNode)}
                  >
                    <ListTodo className="w-4 h-4 mr-1" />
                    Add to Todo
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full mt-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => {
                    if (confirm('Delete this node?')) {
                      onDeleteNode(selectedNode.id);
                      setSelectedNodeId(null);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">
                Click a node to select it
              </div>
            )}
          </div>

          {/* Stats */}
          <div id="panel-stats" className="space-y-2">
            <div className="text-xs font-semibold text-gray-600 uppercase">Stats</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-600">{nodes.length}</div>
                <div className="text-xs text-gray-600">Total Nodes</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-purple-600">{completedCount}</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Node Edit Dialog */}
      <NodeDialog
        node={editingNode}
        isOpen={!!editingNode}
        onClose={() => setEditingNode(null)}
        onSave={onUpdateNode}
        onDelete={onDeleteNode}
      />
    </div>
  );
}
