Convert the below HTML/CSS code into React component. Do not include the global components as these already exist:

<div class="fixed inset-0 bg-black/50 flex items-end z-50" id="node-editor-modal">
  <!-- Modal Container -->
  <div class="w-full bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto" style="scrollbar-width: thin; -ms-overflow-style: auto;" class="[&::-webkit-scrollbar]:thin [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
    
    <!-- Header -->
    <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
      <h2 class="text-xl font-bold text-gray-900">Edit Node</h2>
      <button class="text-gray-400 hover:text-gray-600 text-2xl font-light">×</button>
    </div>

    <!-- Content -->
    <div class="px-6 py-6 space-y-6">
      
      <!-- Label Field -->
      <div id="form-node-label" class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900">Node Label</label>
        <input type="text" placeholder="Enter node name..." class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400" value="Complete Project Proposal">
      </div>

      <!-- Type Selection -->
      <div id="form-node-type" class="space-y-3">
        <label class="block text-sm font-semibold text-gray-900">Node Type</label>
        <div class="grid grid-cols-2 gap-3">
          <!-- Goal -->
          <button class="p-3 border-2 border-blue-500 bg-blue-50 rounded-xl text-center transition-all">
            <div class="text-2xl mb-1">🎯</div>
            <div class="text-xs font-semibold text-gray-900">Goal</div>
          </button>
          <!-- Step -->
          <button class="p-3 border-2 border-gray-300 bg-white rounded-xl text-center hover:border-gray-400 transition-all">
            <div class="text-2xl mb-1">📍</div>
            <div class="text-xs font-semibold text-gray-900">Step</div>
          </button>
          <!-- Action -->
          <button class="p-3 border-2 border-gray-300 bg-white rounded-xl text-center hover:border-gray-400 transition-all">
            <div class="text-2xl mb-1">⚡</div>
            <div class="text-xs font-semibold text-gray-900">Action</div>
          </button>
          <!-- Task -->
          <button class="p-3 border-2 border-gray-300 bg-white rounded-xl text-center hover:border-gray-400 transition-all">
            <div class="text-2xl mb-1">✓</div>
            <div class="text-xs font-semibold text-gray-900">Task</div>
          </button>
          <!-- Subtask -->
          <button class="p-3 border-2 border-gray-300 bg-white rounded-xl text-center hover:border-gray-400 transition-all">
            <div class="text-2xl mb-1">◆</div>
            <div class="text-xs font-semibold text-gray-900">Subtask</div>
          </button>
          <!-- Microtask -->
          <button class="p-3 border-2 border-gray-300 bg-white rounded-xl text-center hover:border-gray-400 transition-all">
            <div class="text-2xl mb-1">•</div>
            <div class="text-xs font-semibold text-gray-900">Microtask</div>
          </button>
        </div>
      </div>

      <!-- Deadline Picker -->
      <div id="form-node-deadline" class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900">Deadline</label>
        <div class="flex gap-2">
          <input type="date" class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" value="2025-03-15">
          <button class="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium transition-colors">Clear</button>
        </div>
        <p class="text-xs text-gray-500">Due in 12 days</p>
      </div>

      <!-- Completion Status -->
      <div id="form-node-status" class="space-y-3">
        <label class="block text-sm font-semibold text-gray-900">Status</label>
        <div class="space-y-2">
          <!-- Not Started -->
          <label class="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="status" class="w-4 h-4 text-blue-500" value="not-started">
            <span class="ml-3 text-sm font-medium text-gray-900">Not Started</span>
            <span class="ml-auto text-xs text-gray-400">○</span>
          </label>
          <!-- In Progress -->
          <label class="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="status" class="w-4 h-4 text-blue-500" value="in-progress" checked>
            <span class="ml-3 text-sm font-medium text-gray-900">In Progress</span>
            <span class="ml-auto text-xs text-blue-500">◐</span>
          </label>
          <!-- Completed -->
          <label class="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="status" class="w-4 h-4 text-blue-500" value="completed">
            <span class="ml-3 text-sm font-medium text-gray-900">Completed</span>
            <span class="ml-auto text-xs text-green-500">✓</span>
          </label>
          <!-- Blocked -->
          <label class="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="status" class="w-4 h-4 text-blue-500" value="blocked">
            <span class="ml-3 text-sm font-medium text-gray-900">Blocked</span>
            <span class="ml-auto text-xs text-red-500">⊘</span>
          </label>
        </div>
      </div>

      <!-- Description (Optional) -->
      <div id="form-node-description" class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900">Description (Optional)</label>
        <textarea placeholder="Add notes or details..." class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 resize-none" rows="3"></textarea>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-4">
        <button class="flex-1 px-4 py-3 border border-gray-300 text-gray-900 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
        <button class="flex-1 px-4 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">Save Node</button>
      </div>

      <!-- Delete Option -->
      <button class="w-full px-4 py-3 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-colors text-sm">Delete Node</button>

    </div>
  </div>
</div>

<style>
  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
</style>