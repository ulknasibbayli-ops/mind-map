Convert the below HTML/CSS code into React component. Do not include the global components as these already exist:

<div class="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
  <!-- Header -->
  <header id="header-mobile" class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <i class="fa-solid fa-sitemap text-white text-sm"></i>
      </div>
      <h1 class="text-lg font-bold text-gray-900">Mind Map</h1>
    </div>
    <div class="flex items-center gap-2">
      <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <i class="fa-solid fa-sliders text-gray-600"></i>
      </button>
      <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <i class="fa-solid fa-ellipsis-v text-gray-600"></i>
      </button>
    </div>
  </header>

  <!-- Main Canvas Area -->
  <div class="flex-1 flex overflow-hidden">
    <!-- Canvas -->
    <div id="main-content" class="flex-1 relative bg-white overflow-hidden">
      <!-- SVG Canvas for connections -->
      <svg id="canvas-connections" class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1;"></svg>
      
      <!-- Nodes Container -->
      <div id="nodes-container" class="absolute inset-0 w-full h-full" style="z-index: 2;">
        <!-- Central Node -->
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing" style="z-index: 10;">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl px-6 py-4 shadow-lg min-w-max font-semibold text-center">
            <div class="text-sm">Main Goal</div>
            <div class="text-xs opacity-90 mt-1">Q1 2025</div>
          </div>
        </div>

        <!-- Child Nodes -->
        <div class="absolute top-1/4 left-1/4 cursor-grab active:cursor-grabbing">
          <div class="bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-xl px-5 py-3 shadow-md min-w-max font-medium text-sm">
            Strategy
          </div>
        </div>

        <div class="absolute top-1/4 right-1/4 cursor-grab active:cursor-grabbing">
          <div class="bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-xl px-5 py-3 shadow-md min-w-max font-medium text-sm">
            Execution
          </div>
        </div>

        <div class="absolute bottom-1/4 left-1/3 cursor-grab active:cursor-grabbing">
          <div class="bg-gradient-to-br from-indigo-400 to-indigo-500 text-white rounded-xl px-5 py-3 shadow-md min-w-max font-medium text-sm">
            Resources
          </div>
        </div>

        <div class="absolute bottom-1/4 right-1/3 cursor-grab active:cursor-grabbing">
          <div class="bg-gradient-to-br from-cyan-400 to-cyan-500 text-white rounded-xl px-5 py-3 shadow-md min-w-max font-medium text-sm">
            Timeline
          </div>
        </div>
      </div>

      <!-- Zoom Controls -->
      <div class="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
        <button class="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 shadow-md transition-colors">
          <i class="fa-solid fa-plus text-gray-700"></i>
        </button>
        <button class="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 shadow-md transition-colors">
          <i class="fa-solid fa-minus text-gray-700"></i>
        </button>
        <button class="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 shadow-md transition-colors">
          <i class="fa-solid fa-expand text-gray-700"></i>
        </button>
      </div>

      <!-- Mini Map -->
      <div class="absolute bottom-6 left-6 w-24 h-24 bg-white border-2 border-gray-300 rounded-lg shadow-md z-20 overflow-hidden">
        <div class="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 relative">
          <div class="absolute inset-1 border border-blue-400 rounded opacity-60"></div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="w-80 border-l border-gray-200 bg-white flex flex-col shadow-sm">
      <!-- Toolbar -->
      <div class="px-4 py-4 border-b border-gray-200 space-y-3">
        <button class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg py-3 font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow">
          <i class="fa-solid fa-plus"></i>
          Add Goal
        </button>
        
        <div class="flex gap-2">
          <button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-sm font-medium transition-colors">
            <i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Auto Layout
          </button>
          <button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-sm font-medium transition-colors">
            <i class="fa-solid fa-download mr-1"></i>Export
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="px-4 py-3 border-b border-gray-200">
        <label class="text-xs font-semibold text-gray-600 block mb-2">Deadline Filter</label>
        <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Deadlines</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Quarter</option>
          <option>Overdue</option>
        </select>
      </div>

      <!-- Chart Selector -->
      <div class="px-4 py-3 border-b border-gray-200">
        <label class="text-xs font-semibold text-gray-600 block mb-2">Chart</label>
        <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>My First Goal Chart</option>
          <option>Q1 Objectives</option>
          <option>Personal Growth</option>
        </select>
      </div>

      <!-- Node Details -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div id="panel-node-details">
          <h3 class="font-semibold text-gray-900 mb-3">Selected Node</h3>
          <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <div class="text-sm font-medium text-gray-700 mb-2">Main Goal</div>
            <div class="text-xs text-gray-600 mb-3">Deadline: Mar 31, 2025</div>
            <div class="flex gap-2">
              <button class="flex-1 bg-blue-500 text-white text-xs py-2 rounded-lg hover:bg-blue-600 transition-colors">Edit</button>
              <button class="flex-1 bg-red-100 text-red-600 text-xs py-2 rounded-lg hover:bg-red-200 transition-colors">Delete</button>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div id="panel-stats" class="space-y-2">
          <div class="text-xs font-semibold text-gray-600 uppercase">Stats</div>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <div class="text-lg font-bold text-blue-600">5</div>
              <div class="text-xs text-gray-600">Total Nodes</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <div class="text-lg font-bold text-purple-600">2</div>
              <div class="text-xs text-gray-600">Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Bottom Sheet (hidden on desktop) -->
  <div id="mobile-sheet" class="sm:hidden fixed inset-0 bg-black/50 z-50 hidden">
    <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-96 flex flex-col">
      <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 class="font-semibold text-gray-900">Node Details</h2>
        <button class="text-gray-500 text-2xl">×</button>
      </div>
      <div class="flex-1 overflow-auto p-4 space-y-3">
        <button class="w-full bg-blue-500 text-white rounded-lg py-3 font-semibold">Edit Node</button>
        <button class="w-full bg-gray-100 text-gray-700 rounded-lg py-3 font-semibold">Delete Node</button>
      </div>
    </div>
  </div>
</div>