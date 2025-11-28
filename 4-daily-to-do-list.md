Convert the below HTML/CSS code into React component. Do not include the global components as these already exist:

<div class="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100">
  <!-- Top Navigation -->
  <nav id="header-mobile" class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span class="text-white font-bold text-sm">GM</span>
      </div>
      <h1 class="text-lg font-bold text-gray-900">Goal Mind Map</h1>
    </div>
    <button class="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
      <i class="fa-solid fa-bars text-gray-700"></i>
    </button>
  </nav>

  <!-- Main Content -->
  <div class="flex flex-1 overflow-hidden">
    <!-- Canvas Area -->
    <div id="main-content" class="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-2xl shadow-md p-6 mb-4">
          <h2 class="text-xl font-bold text-gray-900 mb-2">Your Mind Map</h2>
          <p class="text-gray-600 text-sm">Drag tasks to the sidebar to add them to your daily to-do list</p>
        </div>
        <div class="space-y-3">
          <div class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500 cursor-move hover:shadow-md transition-shadow">
            <p class="font-medium text-gray-900">Complete project proposal</p>
            <p class="text-xs text-gray-500 mt-1">High Priority</p>
          </div>
          <div class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500 cursor-move hover:shadow-md transition-shadow">
            <p class="font-medium text-gray-900">Review team feedback</p>
            <p class="text-xs text-gray-500 mt-1">Medium Priority</p>
          </div>
          <div class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-pink-500 cursor-move hover:shadow-md transition-shadow">
            <p class="font-medium text-gray-900">Schedule client meeting</p>
            <p class="text-xs text-gray-500 mt-1">Low Priority</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Sidebar (hidden on mobile) -->
    <div id="panel-todo-desktop" class="hidden lg:flex lg:w-96 border-l border-gray-200 bg-white flex-col shadow-lg">
      <div class="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div class="flex items-center justify-between">
          <h2 class="font-bold text-gray-900 flex items-center gap-2">
            <i class="fa-solid fa-list-check text-blue-500"></i>
            Daily To-Do
          </h2>
          <span class="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">3</span>
        </div>
      </div>
      <div id="todo-list-desktop" class="flex-1 overflow-y-auto p-4 space-y-2 [&::-webkit-scrollbar]:thin [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full" style="scrollbar-width: thin; -ms-overflow-style: auto;">
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 flex items-start gap-3 group hover:shadow-md transition-all">
          <input type="checkbox" class="mt-1 w-5 h-5 rounded border-gray-300 text-blue-500 cursor-pointer">
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 text-sm">Complete project proposal</p>
            <p class="text-xs text-gray-600 mt-0.5">High Priority</p>
          </div>
          <button class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all">
            <i class="fa-solid fa-trash-2 text-sm"></i>
          </button>
        </div>
        <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-3 flex items-start gap-3 group hover:shadow-md transition-all">
          <input type="checkbox" class="mt-1 w-5 h-5 rounded border-gray-300 text-purple-500 cursor-pointer">
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 text-sm">Review team feedback</p>
            <p class="text-xs text-gray-600 mt-0.5">Medium Priority</p>
          </div>
          <button class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all">
            <i class="fa-solid fa-trash-2 text-sm"></i>
          </button>
        </div>
        <div class="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-3 flex items-start gap-3 group hover:shadow-md transition-all">
          <input type="checkbox" class="mt-1 w-5 h-5 rounded border-gray-300 text-pink-500 cursor-pointer">
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 text-sm">Schedule client meeting</p>
            <p class="text-xs text-gray-600 mt-0.5">Low Priority</p>
          </div>
          <button class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all">
            <i class="fa-solid fa-trash-2 text-sm"></i>
          </button>
        </div>
      </div>
      <div class="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <button class="w-full py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-sm transition-colors">
          <i class="fa-solid fa-plus mr-2"></i>Add Task
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Todo Drawer -->
  <div id="mobile-todo-drawer" class="lg:hidden fixed inset-0 bg-black/50 z-50 hidden transition-opacity duration-300">
    <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom">
      <div class="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-3xl flex items-center justify-between">
        <h2 class="font-bold text-gray-900 flex items-center gap-2">
          <i class="fa-solid fa-list-check text-blue-500"></i>
          Daily To-Do
        </h2>
        <button id="close-drawer" class="w-8 h-8 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors">
          <i class="fa-solid fa-xmark text-gray-600"></i>
        </button>
      </div>
      <div id="todo-list-mobile" class="flex-1 overflow-y-auto p-4 space-y-2 [&::-webkit-scrollbar]:thin [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full" style="scrollbar-width: thin; -ms-overflow-style: auto;">
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 flex items-start gap-3 group">
          <input type="checkbox" class="mt-1 w-5 h-5 rounded border-gray-300 text-blue-500 cursor-pointer">
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 text-sm">Complete project proposal</p>
            <p class="text-xs text-gray-600 mt-0.5">High Priority</p>
          </div>
          <button class="text-gray-400 hover:text-red-500 transition-colors">
            <i class="fa-solid fa-trash-2 text-sm"></i>
          </button>
        </div>
        <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-3 flex items-start gap-3 group">
          <input type="checkbox" class="mt-1 w-5 h-5 rounded border-gray-300 text-purple-500 cursor-pointer">
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 text-sm">Review team feedback</p>
            <p class="text-xs text-gray-600 mt-0.5">Medium Priority</p>
          </div>
          <button class="text-gray-400 hover:text-red-500 transition-colors">
            <i class="fa-solid fa-trash-2 text-sm"></i>
          </button>
        </div>
        <div class="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-3 flex items-start gap-3 group">
          <input type="checkbox" class="mt-1 w-5 h-5 rounded border-gray-300 text-pink-500 cursor-pointer">
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 text-sm">Schedule client meeting</p>
            <p class="text-xs text-gray-600 mt-0.5">Low Priority</p>
          </div>
          <button class="text-gray-400 hover:text-red-500 transition-colors">
            <i class="fa-solid fa-trash-2 text-sm"></i>
          </button>
        </div>
      </div>
      <div class="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-3xl">
        <button class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all">
          <i class="fa-solid fa-plus mr-2"></i>Add Task
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Todo Button -->
  <button id="open-drawer" class="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg flex items-center justify-center z-30 transition-all hover:scale-110">
    <i class="fa-solid fa-list-check text-xl"></i>
  </button>
</div>

<script>
  const drawer = document.getElementById('mobile-todo-drawer');
  const openBtn = document.getElementById('open-drawer');
  const closeBtn = document.getElementById('close-drawer');
  
  openBtn?.addEventListener('click', () => drawer.classList.remove('hidden'));
  closeBtn?.addEventListener('click', () => drawer.classList.add('hidden'));
  drawer?.addEventListener('click', (e) => {
    if (e.target === drawer) drawer.classList.add('hidden');
  });
</script>