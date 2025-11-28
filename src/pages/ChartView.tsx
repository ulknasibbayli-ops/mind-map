import { useParams, useNavigate } from 'react-router-dom';

const ChartView = () => {
  const { chartId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fa-solid fa-arrow-left text-gray-700"></i>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Chart {chartId}</h1>
              <p className="text-xs text-gray-500">Mind Map View</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[60vh] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <i className="fa-solid fa-diagram-project text-6xl mb-4 text-gray-300"></i>
            <p className="text-lg font-medium">Mind Map Canvas</p>
            <p className="text-sm">Chart ID: {chartId}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChartView;
