import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [charts] = useState([
    { id: '1', name: 'Fitness Goals', progress: 60, color: 'from-orange-400 to-red-500', goals: 5 },
    { id: '2', name: 'Career Development', progress: 45, color: 'from-blue-400 to-cyan-500', goals: 8 },
    { id: '3', name: 'Personal Growth', progress: 75, color: 'from-purple-400 to-pink-500', goals: 6 },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fa-solid fa-chart-line text-white text-lg"></i>
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
            <i className="fa-solid fa-user text-gray-700"></i>
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {/* Section Header */}
        <div className="mb-8">
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
          className="mb-6 p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow group"
          onClick={() => {/* TODO: Create new chart */}}
        >
          <div className="flex flex-col items-center justify-center py-8 text-white">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-plus text-2xl"></i>
            </div>
            <h3 className="font-semibold text-lg">Create New Chart</h3>
            <p className="text-sm text-blue-100 mt-1">Start tracking a new goal</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-4">
          {charts.map((chart) => (
            <div
              key={chart.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <div className={`h-24 bg-gradient-to-r ${chart.color} relative`}>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg flex items-center justify-center transition-all">
                    <i className="fa-solid fa-pen-to-square text-gray-600 text-sm"></i>
                  </button>
                  <button className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg flex items-center justify-center transition-all">
                    <i className="fa-solid fa-trash text-red-600 text-sm"></i>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{chart.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {chart.goals} sub-goals &bull; {chart.progress}% complete
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className={`bg-gradient-to-r ${chart.color} h-2 rounded-full`}
                    style={{ width: `${chart.progress}%` }}
                  ></div>
                </div>
                <button
                  onClick={() => navigate(`/chart/${chart.id}`)}
                  className={`w-full py-2.5 bg-gradient-to-r ${chart.color} text-white font-semibold rounded-xl hover:shadow-md transition-shadow text-sm`}
                >
                  Open Chart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center">
        <button className="flex flex-col items-center gap-1 py-2 px-4 text-blue-600">
          <i className="fa-solid fa-chart-line text-xl"></i>
          <span className="text-xs font-medium">Charts</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-gray-900">
          <i className="fa-solid fa-list-check text-xl"></i>
          <span className="text-xs font-medium">Tasks</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-gray-900">
          <i className="fa-solid fa-chart-bar text-xl"></i>
          <span className="text-xs font-medium">Analytics</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-gray-900">
          <i className="fa-solid fa-gear text-xl"></i>
          <span className="text-xs font-medium">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default Index;
