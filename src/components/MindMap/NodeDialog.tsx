import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { MindMapNode, NodeType } from '@/types/mindmap';

interface NodeDialogProps {
  node: MindMapNode | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (node: Partial<MindMapNode> & { id: string }) => void;
  onDelete: (id: string) => void;
}

const nodeTypes: { type: NodeType; emoji: string; label: string }[] = [
  { type: 'goal', emoji: '🎯', label: 'Goal' },
  { type: 'step', emoji: '📍', label: 'Step' },
  { type: 'action', emoji: '⚡', label: 'Action' },
  { type: 'substep', emoji: '◆', label: 'Substep' },
  { type: 'subtask', emoji: '✓', label: 'Subtask' },
  { type: 'microtask', emoji: '•', label: 'Microtask' },
];

const statusOptions = [
  { value: false, label: 'Not Started', icon: '○' },
  { value: 'in-progress', label: 'In Progress', icon: '◐' },
  { value: true, label: 'Completed', icon: '✓' },
];

export default function NodeDialog({
  node,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: NodeDialogProps) {
  const [label, setLabel] = useState('');
  const [type, setType] = useState<NodeType>('goal');
  const [deadline, setDeadline] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (node) {
      setLabel(node.label);
      setType(node.type);
      setDeadline(node.deadline || '');
      setCompleted(node.completed || false);
    } else {
      setLabel('');
      setType('goal');
      setDeadline('');
      setCompleted(false);
    }
  }, [node]);

  const handleSave = () => {
    if (!node || !label.trim()) return;
    onSave({
      id: node.id,
      label: label.trim(),
      type,
      deadline: deadline || undefined,
      completed,
    });
    onClose();
  };

  const handleDelete = () => {
    if (!node) return;
    if (confirm('Are you sure you want to delete this node?')) {
      onDelete(node.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Node</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Label Field */}
          <div className="space-y-2">
            <Label htmlFor="node-label">Node Label</Label>
            <Input
              id="node-label"
              placeholder="Enter node name..."
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          {/* Type Selection */}
          <div className="space-y-3">
            <Label>Node Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {nodeTypes.map((nt) => (
                <button
                  key={nt.type}
                  onClick={() => setType(nt.type)}
                  className={cn(
                    "p-3 border-2 rounded-xl text-center transition-all",
                    type === nt.type
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  )}
                >
                  <div className="text-2xl mb-1">{nt.emoji}</div>
                  <div className="text-xs font-semibold text-gray-900">{nt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Deadline Picker */}
          <div className="space-y-2">
            <Label htmlFor="node-deadline">Deadline</Label>
            <div className="flex gap-2">
              <Input
                id="node-deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => setDeadline('')}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-3">
            <Label>Status</Label>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <label
                  key={String(status.value)}
                  className={cn(
                    "flex items-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors",
                    completed === status.value && "border-blue-500 bg-blue-50"
                  )}
                >
                  <input
                    type="radio"
                    name="status"
                    checked={completed === status.value}
                    onChange={() => setCompleted(status.value as boolean)}
                    className="w-4 h-4 text-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {status.label}
                  </span>
                  <span
                    className={cn(
                      "ml-auto text-xs",
                      status.value === true && "text-green-500",
                      status.value === 'in-progress' && "text-blue-500",
                      status.value === false && "text-gray-400"
                    )}
                  >
                    {status.icon}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-3 sm:flex-col">
          <div className="flex gap-3 w-full">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Node
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            Delete Node
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
