// Bazaar Companion - Local App

// State
const state = {
  runs: JSON.parse(localStorage.getItem('bazaar-runs') || '[]'),
  milestones: JSON.parse(localStorage.getItem('bazaar-milestones') || '{}')
};

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Tab Navigation
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === target);
    });
  });
});

// Run Modal
const runModal = document.getElementById('runModal');
const newRunBtn = document.getElementById('newRun');
const cancelRunBtn = document.getElementById('cancelRun');
const runForm = document.getElementById('runForm');

newRunBtn.addEventListener('click', () => {
  runModal.classList.add('active');
});

cancelRunBtn.addEventListener('click', () => {
  runModal.classList.remove('active');
  runForm.reset();
});

runModal.addEventListener('click', (e) => {
  if (e.target === runModal) {
    runModal.classList.remove('active');
    runForm.reset();
  }
});

// Save Run
runForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(runForm);
  const run = {
    id: Date.now(),
    date: new Date().toISOString(),
    hero: formData.get('hero'),
    wins: parseInt(formData.get('wins')),
    build: formData.get('build'),
    notes: formData.get('notes')
  };

  state.runs.unshift(run);
  localStorage.setItem('bazaar-runs', JSON.stringify(state.runs));

  renderRuns();
  updateStats();
  runModal.classList.remove('active');
  runForm.reset();
});

// Render Runs
function renderRuns() {
  const list = document.getElementById('runsList');

  if (state.runs.length === 0) {
    list.innerHTML = '<p class="empty-state">No runs logged yet. Start tracking your progress!</p>';
    return;
  }

  list.innerHTML = state.runs.map(run => {
    const winClass = run.wins >= 10 ? 'win-10' :
                     run.wins >= 7 ? 'win-high' :
                     run.wins >= 4 ? 'win-mid' : 'win-low';

    const date = new Date(run.date).toLocaleDateString();

    return `
      <div class="run-item">
        <div class="run-wins ${winClass}">${run.wins}</div>
        <div class="run-info">
          <div class="run-hero">${capitalize(run.hero)}</div>
          <div class="run-build">${run.build || 'No build noted'}</div>
        </div>
        <div class="run-date">${date}</div>
        <button class="btn-delete" onclick="deleteRun(${run.id})" title="Delete run">&times;</button>
      </div>
    `;
  }).join('');
}

// Delete Run
window.deleteRun = function(id) {
  state.runs = state.runs.filter(r => r.id !== id);
  localStorage.setItem('bazaar-runs', JSON.stringify(state.runs));
  renderRuns();
  updateStats();
};

// Update Stats
function updateStats() {
  const totalRuns = state.runs.length;
  const avgWins = totalRuns > 0
    ? (state.runs.reduce((sum, r) => sum + r.wins, 0) / totalRuns).toFixed(1)
    : 0;
  const bestRun = totalRuns > 0
    ? Math.max(...state.runs.map(r => r.wins))
    : 0;
  const tenWins = state.runs.filter(r => r.wins >= 10).length;

  document.getElementById('totalRuns').textContent = totalRuns;
  document.getElementById('avgWins').textContent = avgWins;
  document.getElementById('bestRun').textContent = bestRun;
  document.getElementById('tenWins').textContent = tenWins;

  // Auto-check milestones
  if (totalRuns > 0) checkMilestone('m1');
  if (bestRun >= 5) checkMilestone('m2');
  if (bestRun >= 10) checkMilestone('m3');

  const heroesPlayed = new Set(state.runs.map(r => r.hero));
  if (['vanessa', 'pygmalien', 'dooley'].every(h => heroesPlayed.has(h))) {
    checkMilestone('m4');
  }

  const recentRuns = state.runs.slice(0, 10);
  if (recentRuns.length >= 5) {
    const avgRecent = recentRuns.reduce((s, r) => s + r.wins, 0) / recentRuns.length;
    if (avgRecent >= 6) checkMilestone('m5');
  }
}

// Milestones
function checkMilestone(id) {
  const checkbox = document.getElementById(id);
  if (checkbox && !state.milestones[id]) {
    checkbox.checked = true;
    state.milestones[id] = true;
    localStorage.setItem('bazaar-milestones', JSON.stringify(state.milestones));
  }
}

function loadMilestones() {
  Object.keys(state.milestones).forEach(id => {
    const checkbox = document.getElementById(id);
    if (checkbox) checkbox.checked = state.milestones[id];
  });

  // Allow manual milestone toggling
  document.querySelectorAll('.milestone input').forEach(cb => {
    cb.addEventListener('change', () => {
      state.milestones[cb.id] = cb.checked;
      localStorage.setItem('bazaar-milestones', JSON.stringify(state.milestones));
    });
  });
}

// Utils
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Init
renderRuns();
updateStats();
loadMilestones();
