Convert the below HTML/CSS code into React component. Do not include the global components as these already exist:

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
  <!-- Header -->
  <header id="header-mobile" class="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
          <i class="fa-solid fa-chart-line text-white text-lg"></i>
        </div>
        <div>
          <h1 class="text-xl font-bold text-gray-900">Goal Mind Map</h1>
          <p class="text-xs text-gray-500">Track your progress</p>
        </div>
      </div>
      <button class="relative w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
        <i class="fa-solid fa-user text-gray-700"></i>
        <span class="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </button>
    </div>
  </header>

  <!-- Main Content -->
  <main id="main-content" class="px-4 py-6 pb-24">
    <!-- Section Header -->
    <div id="section-header" class="mb-8">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-2xl font-bold text-gray-900">Your Charts</h2>
        <span class="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">3 Active</span>
      </div>
      <p class="text-gray-600 text-sm">Manage and track all your goal charts</p>
    </div>

    <!-- Create New Chart Card -->
    <div id="card-create" class="mb-6 p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow group">
      <div class="flex flex-col items-center justify-center py-8 text-white">
        <div class="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <i class="fa-solid fa-plus text-2xl"></i>
        </div>
        <h3 class="font-semibold text-lg">Create New Chart</h3>
        <p class="text-sm text-blue-100 mt-1">Start tracking a new goal</p>
      </div>
    </div>

    <!-- Charts Grid -->
    <div id="section-charts" class="grid grid-cols-1 gap-4">
      <!-- Chart Card 1 -->
      <div id="card-fitness" class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
        <div class="h-24 bg-gradient-to-r from-orange-400 to-red-500 relative">
          <div class="absolute top-3 right-3 flex gap-2">
            <button class="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg flex items-center justify-center transition-all" title="Rename">
              <i class="fa-solid fa-pen-to-square text-orange-600 text-sm"></i>
            </button>
            <button class="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg flex items-center justify-center transition-all" title="Delete">
              <i class="fa-solid fa-trash text-red-600 text-sm"></i>
            </button>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-bold text-gray-900 text-lg mb-1">Fitness Goals</h3>
          <p class="text-sm text-gray-600 mb-4">5 sub-goals • 60% complete</p>
          <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div class="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full" style="width: 60%"></div>
          </div>
          <button class="w-full py-2.5 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-xl hover:shadow-md transition-shadow text-sm">
            Open Chart
          </button>
        </div>
      </div>

      <!-- Chart Card 2 -->
      <div id="card-career" class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
        <div class="h-24 bg-gradient-to-r from-blue-400 to-cyan-500 relative">
          <div class="absolute top-3 right-3 flex gap-2">
            <button class="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg flex items-center justify-center transition-all" title="Rename">
              <i class="fa-solid fa-pen-to-square text-blue-600 text-sm"></i>
            </button>
            <button class="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg flex items-center justify-center transition-all" title="Delete">
              <i class="fa-solid fa-trash text-red-600 text-sm"></i>
            </button>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-bold text-gray-900 text-lg mb-1">Career Development</h3>
          <p class="text-sm text-gray-600 mb-4">8 sub-goals • 45% complete</p>
          <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div class="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full" style="width: 45%"></div>
          </div>
          <button class="w-full py-2.5 bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-md transition-shadow text-sm">
            Open Chart
          </button>
        </div>
      </div>

      <!-- Chart Card 3 -->
      <div id="card-personal" class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
        <div class="h-24 bg-gradient-to-r from-purple-400 to-pink-500 relative">
          <div class="absolute top-3 right-3 flex gap-2">
            <button class="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg flex items-center justify-center transition-all" title="Rename">
              <i class="fa-solid fa-pen-to-square text-purple-600 text-sm"></i>
            </button>
            <button class="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg flex items-center justify-center transition-all" title="Delete">
              <i class="fa-solid fa-trash text-red-600 text-sm"></i>
            </button>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-bold text-gray-900 text-lg mb-1">Personal Growth</h3>
          <p class="text-sm text-gray-600 mb-4">6 sub-goals • 75% complete</p>
          <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div class="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style="width: 75%"></div>
          </div>
          <button class="w-full py-2.5 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold rounded-xl hover:shadow-md transition-shadow text-sm">
            Open Chart
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State Message -->
    <div id="section-empty" class="hidden text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fa-solid fa-chart-pie text-gray-400 text-2xl"></i>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No charts yet</h3>
      <p class="text-gray-600 text-sm mb-6">Create your first goal chart to get started</p>
      <button class="px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
        Create Chart
      </button>
    </div>
  </main>

  <!-- Bottom Navigation -->
  <nav id="tab-bar" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center">
    <button class="flex flex-col items-center gap-1 py-2 px-4 text-blue-600">
      <i class="fa-solid fa-chart-line text-xl"></i>
      <span class="text-xs font-medium">Charts</span>
    </button>
    <button class="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-gray-900">
      <i class="fa-solid fa-list-check text-xl"></i>
      <span class="text-xs font-medium">Tasks</span>
    </button>
    <button class="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-gray-900">
      <i class="fa-solid fa-chart-bar text-xl"></i>
      <span class="text-xs font-medium">Analytics</span>
    </button>
    <button class="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-gray-900">
      <i class="fa-solid fa-gear text-xl"></i>
      <span class="text-xs font-medium">Settings</span>
    </button>
  </nav>
</div>