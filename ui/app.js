// Bazaar Companion - Local App

// State
const state = {
  runs: JSON.parse(localStorage.getItem('bazaar-runs') || '[]'),
  milestones: JSON.parse(localStorage.getItem('bazaar-milestones') || '{}'),
  builds: JSON.parse(localStorage.getItem('bazaar-builds') || '[]'),
  notes: JSON.parse(localStorage.getItem('bazaar-notes') || '[]'),
  items: []
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

// ==========================================
// ITEMS TAB
// ==========================================

// Sample items data (static since we can't fetch from bazaardb.gg directly)
const sampleItems = [
  { name: 'Powder Keg', hero: 'vanessa', tier: 'gold', size: 'medium', tags: ['weapon', 'burn'] },
  { name: 'Cannon', hero: 'vanessa', tier: 'silver', size: 'medium', tags: ['weapon'] },
  { name: 'Sniper Rifle', hero: 'vanessa', tier: 'gold', size: 'large', tags: ['weapon'] },
  { name: 'Tracer Fire', hero: 'vanessa', tier: 'silver', size: 'small', tags: ['skill'] },
  { name: 'Incendiary Rounds', hero: 'vanessa', tier: 'bronze', size: 'small', tags: ['ammo'] },
  { name: 'Oni Mask', hero: 'vanessa', tier: 'gold', size: 'medium', tags: ['burn', 'crit'] },
  { name: 'Lighthouse', hero: 'vanessa', tier: 'diamond', size: 'large', tags: ['burn'] },
  { name: 'Business Card', hero: 'pygmalien', tier: 'bronze', size: 'small', tags: ['gold'] },
  { name: 'Jabalian Drum', hero: 'pygmalien', tier: 'gold', size: 'medium', tags: ['shield'] },
  { name: 'Showcase', hero: 'pygmalien', tier: 'silver', size: 'medium', tags: ['gold'] },
  { name: 'Landscraper', hero: 'pygmalien', tier: 'gold', size: 'large', tags: ['gold'] },
  { name: 'Core', hero: 'dooley', tier: 'bronze', size: 'medium', tags: ['core'] },
  { name: 'Fiber Optics', hero: 'dooley', tier: 'silver', size: 'small', tags: ['tech'] },
  { name: 'Ray Gun', hero: 'dooley', tier: 'gold', size: 'medium', tags: ['weapon', 'tech'] },
  { name: 'Flamethrower', hero: 'dooley', tier: 'silver', size: 'medium', tags: ['weapon', 'burn'] },
  { name: 'Peacewrought', hero: 'mak', tier: 'legendary', size: 'large', tags: ['weapon'] },
  { name: 'Foul Mushroom', hero: 'mak', tier: 'bronze', size: 'small', tags: ['poison'] },
  { name: 'Rainbow Staff', hero: 'mak', tier: 'gold', size: 'medium', tags: ['potion'] },
  { name: 'Vial Launcher', hero: 'mak', tier: 'silver', size: 'medium', tags: ['potion'] },
  { name: 'Flycycle', hero: 'stelle', tier: 'gold', size: 'medium', tags: ['vehicle'] },
  { name: 'Ornithopter', hero: 'stelle', tier: 'silver', size: 'medium', tags: ['vehicle', 'flying'] },
  { name: 'Boom Boom Bot', hero: 'stelle', tier: 'bronze', size: 'small', tags: ['tech'] },
  { name: 'Pizza', hero: 'jules', tier: 'bronze', size: 'small', tags: ['food'] },
  { name: 'Rice Cooker', hero: 'jules', tier: 'silver', size: 'medium', tags: ['tool', 'food'] },
  { name: 'Grill', hero: 'jules', tier: 'gold', size: 'large', tags: ['tool', 'heated'] },
];

state.items = sampleItems;

function renderItems() {
  const grid = document.getElementById('itemsGrid');
  const search = document.getElementById('itemSearch')?.value.toLowerCase() || '';
  const heroFilter = document.getElementById('heroFilter')?.value || '';
  const tierFilter = document.getElementById('tierFilter')?.value || '';
  const sizeFilter = document.getElementById('sizeFilter')?.value || '';

  const filtered = state.items.filter(item => {
    if (search && !item.name.toLowerCase().includes(search) &&
        !item.tags.some(t => t.includes(search))) return false;
    if (heroFilter && item.hero !== heroFilter) return false;
    if (tierFilter && item.tier !== tierFilter) return false;
    if (sizeFilter && item.size !== sizeFilter) return false;
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="empty-state">No items match your filters</p>';
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="item-card">
      <div class="item-name">${item.name}</div>
      <div class="item-meta">
        <span class="item-tier ${item.tier}">${item.tier}</span>
        <span class="item-size">${item.size}</span>
        <span class="hero-tag ${item.hero.slice(0,3)}">${capitalize(item.hero)}</span>
      </div>
    </div>
  `).join('');
}

// Item search/filter listeners
document.getElementById('itemSearch')?.addEventListener('input', renderItems);
document.getElementById('heroFilter')?.addEventListener('change', renderItems);
document.getElementById('tierFilter')?.addEventListener('change', renderItems);
document.getElementById('sizeFilter')?.addEventListener('change', renderItems);

// ==========================================
// BUILDS TAB
// ==========================================

const buildModal = document.getElementById('buildModal');
const newBuildBtn = document.getElementById('newBuild');
const cancelBuildBtn = document.getElementById('cancelBuild');
const buildForm = document.getElementById('buildForm');

newBuildBtn?.addEventListener('click', () => {
  document.getElementById('buildModalTitle').textContent = 'New Build';
  document.getElementById('buildId').value = '';
  buildForm.reset();
  buildModal.classList.add('active');
});

cancelBuildBtn?.addEventListener('click', () => {
  buildModal.classList.remove('active');
  buildForm.reset();
});

buildModal?.addEventListener('click', (e) => {
  if (e.target === buildModal) {
    buildModal.classList.remove('active');
    buildForm.reset();
  }
});

buildForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(buildForm);
  const existingId = formData.get('buildId');

  const build = {
    id: existingId ? parseInt(existingId) : Date.now(),
    name: formData.get('buildName'),
    hero: formData.get('buildHero'),
    tier: formData.get('buildTier'),
    coreItems: formData.get('coreItems'),
    strategy: formData.get('strategy'),
    earlyGame: formData.get('earlyGame'),
    lateGame: formData.get('lateGame'),
    created: existingId ? state.builds.find(b => b.id === parseInt(existingId))?.created : new Date().toISOString()
  };

  if (existingId) {
    const idx = state.builds.findIndex(b => b.id === parseInt(existingId));
    if (idx !== -1) state.builds[idx] = build;
  } else {
    state.builds.unshift(build);
  }

  localStorage.setItem('bazaar-builds', JSON.stringify(state.builds));
  renderBuilds();
  buildModal.classList.remove('active');
  buildForm.reset();
});

function renderBuilds() {
  const list = document.getElementById('buildsList');
  if (!list) return;

  if (state.builds.length === 0) {
    list.innerHTML = '<p class="empty-state">No builds saved yet. Create your first build!</p>';
    return;
  }

  list.innerHTML = state.builds.map(build => {
    const items = build.coreItems ? build.coreItems.split(',').map(i => i.trim()).filter(Boolean) : [];
    return `
      <div class="saved-build tier-${build.tier}">
        <div class="saved-build-header">
          <div class="saved-build-name">${build.name}</div>
          <div class="saved-build-actions">
            <button class="btn-icon" onclick="editBuild(${build.id})" title="Edit">✎</button>
            <button class="btn-icon danger" onclick="deleteBuild(${build.id})" title="Delete">✕</button>
          </div>
        </div>
        <div class="saved-build-hero">${capitalize(build.hero)} • ${build.tier.toUpperCase()}-Tier</div>
        ${items.length > 0 ? `
          <div class="saved-build-items">
            ${items.map(item => `<span class="core-item">${item}</span>`).join('')}
          </div>
        ` : ''}
        ${build.strategy ? `<div class="saved-build-strategy">${build.strategy}</div>` : ''}
      </div>
    `;
  }).join('');
}

window.editBuild = function(id) {
  const build = state.builds.find(b => b.id === id);
  if (!build) return;

  document.getElementById('buildModalTitle').textContent = 'Edit Build';
  document.getElementById('buildId').value = build.id;
  buildForm.buildName.value = build.name;
  buildForm.buildHero.value = build.hero;
  buildForm.buildTier.value = build.tier;
  buildForm.coreItems.value = build.coreItems || '';
  buildForm.strategy.value = build.strategy || '';
  buildForm.earlyGame.value = build.earlyGame || '';
  buildForm.lateGame.value = build.lateGame || '';
  buildModal.classList.add('active');
};

window.deleteBuild = function(id) {
  if (!confirm('Delete this build?')) return;
  state.builds = state.builds.filter(b => b.id !== id);
  localStorage.setItem('bazaar-builds', JSON.stringify(state.builds));
  renderBuilds();
};

// ==========================================
// NOTES TAB (Voice Transcriptions)
// ==========================================

const noteModal = document.getElementById('noteModal');
const recordNoteBtn = document.getElementById('recordNote');
const closeNoteBtn = document.getElementById('closeNote');
const deleteNoteBtn = document.getElementById('deleteNote');
let currentNoteId = null;

recordNoteBtn?.addEventListener('click', () => {
  alert('To record a voice note:\n\n1. Open a terminal\n2. Run: ~/projects/01-ACTIVE/bazaar-companion/scripts/record-note.sh\n3. Speak your insights\n4. Press Ctrl+C to stop\n5. Refresh this page to see your note');
  document.getElementById('recordingStatus').style.display = 'flex';
});

closeNoteBtn?.addEventListener('click', () => {
  noteModal.classList.remove('active');
  currentNoteId = null;
});

deleteNoteBtn?.addEventListener('click', () => {
  if (currentNoteId && confirm('Delete this note?')) {
    state.notes = state.notes.filter(n => n.id !== currentNoteId);
    localStorage.setItem('bazaar-notes', JSON.stringify(state.notes));
    renderNotes();
    noteModal.classList.remove('active');
    currentNoteId = null;
  }
});

function renderNotes() {
  const list = document.getElementById('notesList');
  if (!list) return;

  if (state.notes.length === 0) {
    list.innerHTML = '<p class="empty-state">No voice notes yet. Click "Record Note" to start!</p>';
    return;
  }

  list.innerHTML = state.notes.map(note => {
    const date = new Date(note.date).toLocaleString();
    const preview = note.content.slice(0, 150) + (note.content.length > 150 ? '...' : '');
    return `
      <div class="note-item" onclick="viewNote(${note.id})">
        <div class="note-preview">${preview}</div>
        <div class="note-date">${date}</div>
      </div>
    `;
  }).join('');
}

window.viewNote = function(id) {
  const note = state.notes.find(n => n.id === id);
  if (!note) return;

  currentNoteId = id;
  document.getElementById('noteContent').textContent = note.content;
  document.getElementById('noteMeta').textContent = `Recorded: ${new Date(note.date).toLocaleString()}`;
  noteModal.classList.add('active');
};

// Function to add note from external script
window.addVoiceNote = function(content) {
  const note = {
    id: Date.now(),
    date: new Date().toISOString(),
    content: content
  };
  state.notes.unshift(note);
  localStorage.setItem('bazaar-notes', JSON.stringify(state.notes));
  renderNotes();
  document.getElementById('recordingStatus').style.display = 'none';
};

// ==========================================
// LOAD EXTERNAL NOTES (from Whisper script)
// ==========================================

async function loadExternalNotes() {
  try {
    const response = await fetch('notes-storage.json?' + Date.now());
    if (response.ok) {
      const externalNotes = await response.json();
      // Merge with localStorage notes, avoiding duplicates
      const existingIds = new Set(state.notes.map(n => n.id));
      const newNotes = externalNotes.filter(n => !existingIds.has(n.id));
      if (newNotes.length > 0) {
        state.notes = [...newNotes, ...state.notes];
        localStorage.setItem('bazaar-notes', JSON.stringify(state.notes));
        renderNotes();
      }
    }
  } catch (e) {
    // File doesn't exist yet, that's fine
  }
}

// ==========================================
// INIT
// ==========================================

renderRuns();
updateStats();
loadMilestones();
renderItems();
renderBuilds();
renderNotes();
loadExternalNotes();
