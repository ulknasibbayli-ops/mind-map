import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharts } from '@/hooks/useCharts';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Plus, Trash2, Pencil, TrendingUp, ListTodo, BarChart3, Settings, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Index() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { charts, isLoading, createChart, updateChart, deleteChart } = useCharts();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [newChartName, setNewChartName] = useState('');
  const [editingChart, setEditingChart] = useState<{ id: string; name: string } | null>(null);

  const handleCreateChart = async () => {
    if (!newChartName.trim()) return;
    try {
      const chart = await createChart.mutateAsync(newChartName.trim());
      setShowCreateDialog(false);
      setNewChartName('');
      navigate(`/chart/${chart.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create chart',
        variant: 'destructive',
      });
    }
  };

  const handleRenameChart = async () => {
    if (!editingChart || !newChartName.trim()) return;
    try {
      await updateChart.mutateAsync({ id: editingChart.id, name: newChartName.trim() });
      setShowRenameDialog(false);
      setEditingChart(null);
      setNewChartName('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to rename chart',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteChart = async (id: string) => {
    if (!confirm('Are you sure you want to delete this chart?')) return;
    try {
      await deleteChart.mutateAsync(id);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete chart',
        variant: 'destructive',
      });
    }
  };

  const gradients = [
    'from-orange-400 to-red-500',
    'from-blue-400 to-cyan-500',
    'from-purple-400 to-pink-500',
    'from-green-400 to-emerald-500',
    'from-indigo-400 to-purple-500',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header id="header-mobile" className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-md">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Goal Mind Map</h1>
              <p className="text-xs text-gray-500">Track your progress</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="relative w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <User className="text-gray-700 w-5 h-5" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="px-4 py-6 pb-24">
        {/* Section Header */}
        <div id="section-header" className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Your Charts</h2>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {charts.length} Active
            </span>
          </div>
          <p className="text-gray-600 text-sm">Manage and track all your goal charts</p>
        </div>

        {/* Create New Chart Card */}
        <div
          id="card-create"
          onClick={() => setShowCreateDialog(true)}
          className="mb-6 p-4 gradient-primary rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow group"
        >
          <div className="flex flex-col items-center justify-center py-8 text-white">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-7 h-7" />
            </div>
            <h3 className="font-semibold text-lg">Create New Chart</h3>
            <p className="text-sm text-blue-100 mt-1">Start tracking a new goal</p>
          </div>
        </div>

        {/* Charts Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : charts.length > 0 ? (
          <div id="section-charts" className="grid grid-cols-1 gap-4">
            {charts.map((chart, index) => (
              <Card
                key={chart.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                <div className={`h-24 bg-gradient-to-r ${gradients[index % gradients.length]} relative`}>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingChart(chart);
                        setNewChartName(chart.name);
                        setShowRenameDialog(true);
                      }}
                      className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg flex items-center justify-center transition-all"
                      title="Rename"
                    >
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChart(chart.id);
                      }}
                      className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg flex items-center justify-center transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{chart.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Updated {new Date(chart.updated_at).toLocaleDateString()}
                  </p>
                  <Button
                    onClick={() => navigate(`/chart/${chart.id}`)}
                    className={`w-full bg-gradient-to-r ${gradients[index % gradients.length]} text-white font-semibold rounded-xl hover:shadow-md transition-shadow text-sm`}
                  >
                    Open Chart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div id="section-empty" className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-gray-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No charts yet</h3>
            <p className="text-gray-600 text-sm mb-6">Create your first goal chart to get started</p>
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
            >
              Create Chart
            </Button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav id="tab-bar" className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center">
        <button className="flex flex-col items-center gap-1 py-2 px-4 text-blue-600">
          <TrendingUp className="w-5 h-5" />
          <span className="text-xs font-medium">Charts</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-gray-900">
          <ListTodo className="w-5 h-5" />
          <span className="text-xs font-medium">Tasks</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-gray-900">
          <BarChart3 className="w-5 h-5" />
          <span className="text-xs font-medium">Analytics</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-gray-900">
          <Settings className="w-5 h-5" />
          <span className="text-xs font-medium">Settings</span>
        </button>
      </nav>

      {/* Create Chart Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Chart</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter chart name..."
              value={newChartName}
              onChange={(e) => setNewChartName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateChart()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateChart} disabled={!newChartName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Chart Dialog */}
      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Chart</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter new name..."
              value={newChartName}
              onChange={(e) => setNewChartName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRenameChart()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRenameDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameChart} disabled={!newChartName.trim()}>
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
