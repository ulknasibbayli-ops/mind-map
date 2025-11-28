Convert the below HTML/CSS code into React component. Do not include the global components as these already exist:

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center px-4 py-8">
  <!-- Logo Section -->
  <div class="mb-12 text-center">
    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
      <span class="text-white font-bold text-2xl">GM</span>
    </div>
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Goal Mind Map</h1>
    <p class="text-gray-600 text-sm">Organize your goals, visualize your path</p>
  </div>

  <!-- Auth Card -->
  <div id="card-auth" class="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
    <!-- Welcome Text -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
      <p class="text-gray-600 text-sm">Sign in to access your goal charts and continue your journey</p>
    </div>

    <!-- Google OAuth Button -->
    <button id="google-signin-btn" class="w-full min-h-[48px] bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-900 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 mb-6 shadow-sm">
      <svg class="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <span>Continue with Google</span>
    </button>

    <!-- Divider -->
    <div class="flex items-center gap-3 mb-6">
      <div class="flex-1 h-px bg-gray-200"></div>
      <span class="text-xs text-gray-500 font-medium">OR</span>
      <div class="flex-1 h-px bg-gray-200"></div>
    </div>

    <!-- Email Input -->
    <div class="mb-4">
      <label class="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
      <input id="email-input" type="email" placeholder="you@example.com" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" />
    </div>

    <!-- Sign In Button -->
    <button id="email-signin-btn" class="w-full min-h-[48px] bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 mb-4">
      Sign In
    </button>

    <!-- Sign Up Link -->
    <p class="text-center text-sm text-gray-600">
      Don't have an account? 
      <button class="text-blue-600 font-semibold hover:text-blue-700">Create one</button>
    </p>
  </div>

  <!-- Email Confirmation Modal (Hidden) -->
  <div id="email-confirm-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
    <div class="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl">
      <div class="text-center mb-6">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fa-solid fa-check text-green-600 text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Confirm Your Email</h3>
        <p class="text-gray-600 text-sm">We've sent a confirmation link to <span id="confirm-email" class="font-semibold text-gray-900"></span></p>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p class="text-sm text-blue-900">Check your inbox and click the confirmation link to complete sign-up.</p>
      </div>

      <button id="confirm-continue-btn" class="w-full min-h-[48px] bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200">
        Continue
      </button>

      <button id="resend-email-btn" class="w-full min-h-[48px] text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors mt-2">
        Resend Email
      </button>
    </div>
  </div>

  <!-- Loading Overlay (Hidden) -->
  <div id="loading-overlay" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-8 flex flex-col items-center">
      <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-900 font-semibold">Authenticating...</p>
    </div>
  </div>
</div>

<script>
  const googleSigninBtn = document.getElementById('google-signin-btn');
  const emailSigninBtn = document.getElementById('email-signin-btn');
  const emailInput = document.getElementById('email-input');
  const emailConfirmModal = document.getElementById('email-confirm-modal');
  const confirmEmailSpan = document.getElementById('confirm-email');
  const confirmContinueBtn = document.getElementById('confirm-continue-btn');
  const loadingOverlay = document.getElementById('loading-overlay');

  googleSigninBtn.addEventListener('click', () => {
    loadingOverlay.classList.remove('hidden');
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
      window.location.href = '/charts';
    }, 2000);
  });

  emailSigninBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    if (email && email.includes('@')) {
      confirmEmailSpan.textContent = email;
      emailConfirmModal.classList.remove('hidden');
    }
  });

  confirmContinueBtn.addEventListener('click', () => {
    loadingOverlay.classList.remove('hidden');
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
      window.location.href = '/charts';
    }, 2000);
  });
</script>