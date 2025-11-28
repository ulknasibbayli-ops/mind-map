const Install = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <i className="fa-solid fa-download text-white text-2xl"></i>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Install App</h1>
        <p className="text-gray-600 text-sm mb-6">
          Install Goal Mind Map on your device for the best experience
        </p>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 mb-2">iOS</h3>
            <p className="text-sm text-blue-800">
              Tap the Share button, then &quot;Add to Home Screen&quot;
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <h3 className="font-semibold text-purple-900 mb-2">Android</h3>
            <p className="text-sm text-purple-800">
              Tap the menu button, then &quot;Install App&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Install;
