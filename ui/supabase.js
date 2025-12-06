// Supabase Configuration and Auth Manager
const SUPABASE_URL = 'https://ulyrkaexhltkbcfclvff.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseXJrYWV4aGx0a2JjZmNsdmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDk3MDIsImV4cCI6MjA4MDU4NTcwMn0.20wz-ONF2SjNUqOmXkLFqNqymMVAKKRJJJbNEe0XZkI';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth state
let currentUser = null;

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', async () => {
  // Check if user is already logged in
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (session) {
    currentUser = session.user;
    updateAuthUI(true);
  } else {
    updateAuthUI(false);
  }

  // Listen for auth state changes
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      currentUser = session.user;
      updateAuthUI(true);
      syncDataToCloud();
    } else if (event === 'SIGNED_OUT') {
      currentUser = null;
      updateAuthUI(false);
    }
  });

  // Set up event listeners
  setupAuthListeners();
});

// Update UI based on auth state
function updateAuthUI(isLoggedIn) {
  const authButton = document.getElementById('authButton');
  const userProfile = document.getElementById('userProfile');

  if (isLoggedIn) {
    authButton.style.display = 'none';
    userProfile.style.display = 'flex';
    document.getElementById('userEmail').textContent = currentUser.email;
  } else {
    authButton.style.display = 'block';
    userProfile.style.display = 'none';
  }
}

// Set up auth event listeners
function setupAuthListeners() {
  // Auth button
  document.getElementById('authButton')?.addEventListener('click', () => {
    document.getElementById('authModal').classList.add('active');
    showAuthTab('login');
  });

  // Close modal
  document.getElementById('closeAuthModal')?.addEventListener('click', () => {
    document.getElementById('authModal').classList.remove('active');
  });

  // Switch between login and signup
  document.getElementById('showSignup')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAuthTab('signup');
  });

  document.getElementById('showLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAuthTab('login');
  });

  // Handle login form
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const loginBtn = document.querySelector('#loginForm button[type="submit"]');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert('Login failed: ' + error.message);
      loginBtn.textContent = originalText;
      loginBtn.disabled = false;
    } else {
      document.getElementById('authModal').classList.remove('active');
      document.getElementById('loginForm').reset();
    }
  });

  // Handle signup form
  document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    const signupBtn = document.querySelector('#signupForm button[type="submit"]');
    const originalText = signupBtn.textContent;
    signupBtn.textContent = 'Creating account...';
    signupBtn.disabled = true;

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password
    });

    if (error) {
      alert('Signup failed: ' + error.message);
      signupBtn.textContent = originalText;
      signupBtn.disabled = false;
    } else {
      alert('Account created! Check your email to confirm your account.');
      document.getElementById('authModal').classList.remove('active');
      document.getElementById('signupForm').reset();
    }
  });

  // Handle logout
  document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
    }
  });

  // OAuth providers
  document.getElementById('googleSignIn')?.addEventListener('click', () => signInWithOAuth('google'));
  document.getElementById('twitchSignIn')?.addEventListener('click', () => signInWithOAuth('twitch'));
  document.getElementById('discordSignIn')?.addEventListener('click', () => signInWithOAuth('discord'));
}

// OAuth sign-in function
async function signInWithOAuth(provider) {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: window.location.origin
    }
  });

  if (error) {
    console.error(`${provider} sign-in error:`, error);
    alert(`Failed to sign in with ${provider}: ` + error.message);
  }
}

// Show login or signup tab
function showAuthTab(tab) {
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');

  if (tab === 'login') {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  } else {
    loginTab.classList.remove('active');
    signupTab.classList.add('active');
  }
}

// Sync local data to cloud (runs after login)
async function syncDataToCloud() {
  if (!currentUser) return;

  // Get local data
  const runs = JSON.parse(localStorage.getItem('runs') || '[]');
  const builds = JSON.parse(localStorage.getItem('builds') || '[]');
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  const learningProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');

  // Upload to Supabase
  try {
    // Sync runs
    if (runs.length > 0) {
      const { error: runsError } = await supabaseClient
        .from('runs')
        .upsert(runs.map(run => ({
          ...run,
          user_id: currentUser.id
        })));

      if (runsError) console.error('Error syncing runs:', runsError);
    }

    // Sync builds
    if (builds.length > 0) {
      const { error: buildsError } = await supabaseClient
        .from('builds')
        .upsert(builds.map(build => ({
          ...build,
          user_id: currentUser.id
        })));

      if (buildsError) console.error('Error syncing builds:', buildsError);
    }

    // Sync notes
    if (notes.length > 0) {
      const { error: notesError } = await supabaseClient
        .from('notes')
        .upsert(notes.map(note => ({
          ...note,
          user_id: currentUser.id
        })));

      if (notesError) console.error('Error syncing notes:', notesError);
    }

    // Sync learning progress
    if (Object.keys(learningProgress).length > 0) {
      const { error: progressError } = await supabaseClient
        .from('learning_progress')
        .upsert(Object.entries(learningProgress).map(([hero, progress]) => ({
          user_id: currentUser.id,
          hero,
          progress: JSON.stringify(progress)
        })));

      if (progressError) console.error('Error syncing learning progress:', progressError);
    }

    console.log('Data synced to cloud successfully');
  } catch (err) {
    console.error('Sync error:', err);
  }
}

// Load data from cloud (call this after login)
async function loadDataFromCloud() {
  if (!currentUser) return;

  try {
    // Load runs
    const { data: runs, error: runsError } = await supabaseClient
      .from('runs')
      .select('*')
      .eq('user_id', currentUser.id);

    if (!runsError && runs) {
      localStorage.setItem('runs', JSON.stringify(runs));
    }

    // Load builds
    const { data: builds, error: buildsError } = await supabaseClient
      .from('builds')
      .select('*')
      .eq('user_id', currentUser.id);

    if (!buildsError && builds) {
      localStorage.setItem('builds', JSON.stringify(builds));
    }

    // Load notes
    const { data: notes, error: notesError } = await supabaseClient
      .from('notes')
      .select('*')
      .eq('user_id', currentUser.id);

    if (!notesError && notes) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Load learning progress
    const { data: progress, error: progressError } = await supabaseClient
      .from('learning_progress')
      .select('*')
      .eq('user_id', currentUser.id);

    if (!progressError && progress) {
      const learningProgress = {};
      progress.forEach(p => {
        learningProgress[p.hero] = JSON.parse(p.progress);
      });
      localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
    }

    console.log('Data loaded from cloud successfully');
  } catch (err) {
    console.error('Load error:', err);
  }
}
