import { useParams, useNavigate } from 'react-router-dom';
import { useCharts } from '@/hooks/useCharts';
import { useNodes } from '@/hooks/useNodes';
import { useTodos } from '@/hooks/useTodos';
import MindMapCanvas from '@/components/MindMap/MindMapCanvas';
import TodoList from '@/components/TodoList/TodoList';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, MoreVertical } from 'lucide-react';

export default function ChartView() {
  const { chartId } = useParams<{ chartId: string }>();
  const navigate = useNavigate();
  const { charts } = useCharts();
  const { nodes, isLoading: nodesLoading, createNode, updateNode, deleteNode } = useNodes(chartId);
  const { todos, createTodo, updateTodo, deleteTodo } = useTodos(chartId);

  const chart = charts.find((c) => c.id === chartId);

  if (!chartId) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header id="header-mobile" className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GM</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900 truncate max-w-[150px]">
            {chart?.name || 'Mind Map'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <div id="main-content" className="flex-1 relative">
          {nodesLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <MindMapCanvas
              chartId={chartId}
              nodes={nodes}
              onCreateNode={(node) => createNode.mutate({ ...node, chartId })}
              onUpdateNode={(node) => updateNode.mutate(node)}
              onDeleteNode={(id) => deleteNode.mutate(id)}
              onAddToTodo={(node) => {
                createTodo.mutate({
                  label: node.label,
                  sourceNodeId: node.id,
                  chartId,
                });
              }}
            />
          )}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-80 border-l border-gray-200 bg-white flex-col shadow-sm">
          <TodoList
            todos={todos}
            onToggle={(id, completed) => updateTodo.mutate({ id, completed })}
            onDelete={(id) => deleteTodo.mutate(id)}
          />
        </div>
      </div>

      {/* Mobile Todo Button */}
      <MobileTodoDrawer
        todos={todos}
        onToggle={(id, completed) => updateTodo.mutate({ id, completed })}
        onDelete={(id) => deleteTodo.mutate(id)}
      />
    </div>
  );
}

// Mobile Todo Drawer Component
import { useState } from 'react';
import { ListTodo, X } from 'lucide-react';
import type { TodoItem } from '@/types/mindmap';

function MobileTodoDrawer({
  todos,
  onToggle,
  onDelete,
}: {
  todos: TodoItem[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Todo Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 gradient-primary text-white rounded-full shadow-lg flex items-center justify-center z-30 transition-all hover:scale-110"
      >
        <ListTodo className="w-6 h-6" />
        {todos.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {todos.length}
          </span>
        )}
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          id="mobile-todo-drawer"
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="px-5 py-4 border-b border-gray-200 gradient-card rounded-t-3xl flex items-center justify-between">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-blue-500" />
                Daily To-Do
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <TodoList
                todos={todos}
                onToggle={onToggle}
                onDelete={onDelete}
                isMobile
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
