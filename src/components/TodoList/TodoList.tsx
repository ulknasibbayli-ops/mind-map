import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, ListTodo } from 'lucide-react';
import type { TodoItem } from '@/types/mindmap';
import { cn } from '@/lib/utils';

interface TodoListProps {
  todos: TodoItem[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  isMobile?: boolean;
}

const priorityColors = [
  'from-blue-50 to-blue-100',
  'from-purple-50 to-purple-100',
  'from-pink-50 to-pink-100',
  'from-green-50 to-green-100',
  'from-orange-50 to-orange-100',
];

export default function TodoList({ todos, onToggle, onDelete, isMobile }: TodoListProps) {
  return (
    <div className={cn("flex flex-col h-full", isMobile && "pb-4")}>
      {!isMobile && (
        <div className="px-5 py-4 border-b border-gray-200 gradient-card">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-blue-500" />
              Daily To-Do
            </h2>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {todos.length}
            </span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ListTodo className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No tasks yet</p>
            <p className="text-xs mt-1">Add nodes from the mind map</p>
          </div>
        ) : (
          todos.map((todo, index) => (
            <div
              key={todo.id}
              className={cn(
                "bg-gradient-to-r rounded-xl p-3 flex items-start gap-3 group hover:shadow-md transition-all",
                priorityColors[index % priorityColors.length]
              )}
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={(checked) => onToggle(todo.id, checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "font-medium text-gray-900 text-sm",
                    todo.completed && "line-through text-gray-500"
                  )}
                >
                  {todo.label}
                </p>
              </div>
              <button
                onClick={() => onDelete(todo.id)}
                className={cn(
                  "text-gray-400 hover:text-red-500 transition-all",
                  !isMobile && "opacity-0 group-hover:opacity-100"
                )}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <Button className="w-full gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
    </div>
  );
}
