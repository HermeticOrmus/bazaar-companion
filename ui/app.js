// Bazaar Companion - Local App

// State
const state = {
  runs: JSON.parse(localStorage.getItem('bazaar-runs') || '[]'),
  milestones: JSON.parse(localStorage.getItem('bazaar-milestones') || '{}'),
  builds: JSON.parse(localStorage.getItem('bazaar-builds') || '[]'),
  notes: JSON.parse(localStorage.getItem('bazaar-notes') || '[]'),
  items: [],
  guides: [],
  currentGuide: null
};

// ==========================================
// META BUILD GUIDES DATA
// ==========================================

const metaGuides = [
  {
    id: 'mak-peacewrought',
    name: 'Peacewrought',
    hero: 'mak',
    tier: 's',
    overview: 'The strongest Mak build in the current meta. Centers around the legendary Peacewrought weapon which deals massive damage and heals you. Stack Haste and CDR to maximize weapon activations.',
    winCondition: 'Survive early, scale Peacewrought damage with Haste buffs, out-sustain opponents in late game.',
    early: [
      'Look for any healing/shield items to survive',
      'Potions are your friend - stack early economy',
      'Peacewrought can appear as early as Day 3',
      'Prioritize Gold generation for shop flexibility'
    ],
    mid: [
      'Peacewrought is your core - prioritize finding it',
      'Add Haste generators (potions, skills)',
      'Build CDR to activate Peacewrought more often',
      'Start removing weak early items'
    ],
    late: [
      'Stack multiple Haste sources',
      'Peacewrought should be carrying fights',
      'Add crit for massive damage spikes',
      'Position healing items to trigger consistently'
    ],
    coreItems: [
      { name: 'Peacewrought', tier: 'legendary', priority: 'must', desc: 'Build-defining weapon. Heals on hit.' },
      { name: 'Rainbow Staff', tier: 'gold', priority: 'core', desc: 'Haste generation for more activations' },
      { name: 'Vial Launcher', tier: 'silver', priority: 'core', desc: 'Potion synergy, extra damage' },
      { name: 'Foul Mushroom', tier: 'bronze', priority: 'good', desc: 'Early poison for chip damage' }
    ],
    synergies: [
      { items: ['Peacewrought', 'Haste buffs'], desc: 'More Haste = more Peacewrought swings = more healing and damage' },
      { items: ['Potions', 'Vial Launcher'], desc: 'Potions trigger Vial Launcher for bonus damage' },
      { items: ['CDR items', 'Peacewrought'], desc: 'Lower cooldown means more activations per fight' }
    ],
    boardLayout: [
      { name: 'Support', size: 'small' },
      { name: 'Haste', size: 'small' },
      { name: 'Peacewrought', size: 'large', filled: true },
      { name: 'Rainbow', size: 'medium', filled: true },
      { name: 'Vial', size: 'medium', filled: true },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Peacewrought heals you - prioritize staying alive early until you find it',
      'Haste is king for this build - stack as much as possible',
      'Dont be afraid to reroll shops aggressively for Peacewrought',
      'This build scales incredibly well - play for value early',
      'Position Peacewrought where it wont get frozen easily'
    ],
    counters: {
      bad: ['Heavy Freeze builds', 'Burst damage before Peacewrought activates'],
      weak: ['Early aggro if you dont find sustain', 'Anti-heal effects']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '🏗' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=mak', icon: '📊' },
      { name: 'Mobalytics Guide', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '📖' }
    ]
  },
  {
    id: 'pyg-jabalian-drum',
    name: 'Jabalian Drum',
    hero: 'pygmalien',
    tier: 's',
    overview: 'Shield-stacking powerhouse. Jabalian Drum converts your shields into damage, turning defense into offense. One of the most consistent builds in the game.',
    winCondition: 'Stack massive shields, let Jabalian Drum convert them to damage. Out-value opponents with economy.',
    early: [
      'Any shield items are good - start stacking early',
      'Business Card for gold generation',
      'Dont worry about damage yet',
      'Focus on surviving PvP with shields'
    ],
    mid: [
      'Jabalian Drum is your core piece',
      'Add more shield generators',
      'Showcase for economy scaling',
      'Start thinking about shield-to-damage conversion'
    ],
    late: [
      'Massive shield stacks = massive Drum damage',
      'Add CDR to cycle shields faster',
      'Consider crit for Drum damage multiplication',
      'Position shields to apply before Drum activates'
    ],
    coreItems: [
      { name: 'Jabalian Drum', tier: 'gold', priority: 'must', desc: 'Converts shields to damage' },
      { name: 'Business Card', tier: 'bronze', priority: 'core', desc: 'Economy engine' },
      { name: 'Showcase', tier: 'silver', priority: 'core', desc: 'Gold and shield synergy' },
      { name: 'Landscraper', tier: 'gold', priority: 'good', desc: 'Late game economy burst' }
    ],
    synergies: [
      { items: ['Jabalian Drum', 'Shield items'], desc: 'More shields = more damage from Drum' },
      { items: ['Business Card', 'Showcase'], desc: 'Gold generation engine for shop power' },
      { items: ['CDR', 'Shield generators'], desc: 'Faster shield cycling for more Drum procs' }
    ],
    boardLayout: [
      { name: 'Shield', size: 'small', filled: true },
      { name: 'Shield', size: 'small', filled: true },
      { name: 'Jabalian Drum', size: 'medium', filled: true },
      { name: 'Economy', size: 'medium', filled: true },
      { name: 'Showcase', size: 'medium', filled: true },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Shields apply before combat damage - position accordingly',
      'Business Card pays for itself quickly - get it early',
      'Jabalian Drum damage scales with total shield, not just new shields',
      'This build is very consistent - great for climbing',
      'Economy items let you see more shops = find pieces faster'
    ],
    counters: {
      bad: ['Shield-piercing effects', 'Burn damage (bypasses shields partially)'],
      weak: ['Very fast aggro before shields stack', 'Anti-shield tech']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '🏗' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=pygmalien', icon: '📊' },
      { name: 'Mobalytics Guide', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '📖' }
    ]
  },
  {
    id: 'van-powder-keg',
    name: 'Powder Keg',
    hero: 'vanessa',
    tier: 's',
    overview: 'Explosive burn damage build. Stack Powder Kegs and ignite them for massive burst. High risk, high reward - one of the most exciting builds to pilot.',
    winCondition: 'Set up multiple Powder Kegs, ignite them simultaneously for explosive burst damage.',
    early: [
      'Small weapons are fine early - dont force the build',
      'Look for any Burn synergy items',
      'Cannon and small weapons for tempo',
      'Tracer Fire skill is excellent'
    ],
    mid: [
      'Start collecting Powder Keg pieces',
      'Incendiary Rounds for Burn application',
      'Fuse items to connect Kegs',
      'CDR to cycle weapons faster'
    ],
    late: [
      'Multiple Powder Kegs = chain explosions',
      'Crit makes explosions devastating',
      'Lighthouse for Burn scaling (if you find it)',
      'Position Kegs to explode in sequence'
    ],
    coreItems: [
      { name: 'Powder Keg', tier: 'gold', priority: 'must', desc: 'Build-defining explosive' },
      { name: 'Cannon', tier: 'silver', priority: 'core', desc: 'Reliable damage, good CDR' },
      { name: 'Incendiary Rounds', tier: 'bronze', priority: 'core', desc: 'Burn application for Kegs' },
      { name: 'Tracer Fire', tier: 'silver', priority: 'good', desc: 'Skill for Burn synergy' },
      { name: 'Lighthouse', tier: 'diamond', priority: 'flex', desc: 'Ultimate Burn scaling (rare)' }
    ],
    synergies: [
      { items: ['Powder Keg', 'Burn effects'], desc: 'Kegs explode when Burn is applied' },
      { items: ['Incendiary Rounds', 'Fast weapons'], desc: 'Apply Burn quickly to trigger Kegs' },
      { items: ['Crit', 'Powder Keg'], desc: 'Crit explosions deal massive damage' },
      { items: ['Multiple Kegs', 'Chain reaction'], desc: 'One explosion can trigger others' }
    ],
    boardLayout: [
      { name: 'Keg', size: 'medium', filled: true },
      { name: 'Keg', size: 'medium', filled: true },
      { name: 'Cannon', size: 'medium', filled: true },
      { name: 'Ammo', size: 'small', filled: true },
      { name: 'CDR', size: 'small' },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Kegs explode when they take Burn damage - position them to chain',
      'Incendiary Rounds is cheap and enables the whole build',
      'Dont stack too many Kegs early - you need triggering mechanisms',
      'Crit is insane on this build - even 20% makes a huge difference',
      'Practice the timing - Kegs need to be loaded when Burn hits'
    ],
    counters: {
      bad: ['Freeze on your Kegs', 'Shield-heavy builds that absorb explosions'],
      weak: ['Fast Lifesteal builds that heal through burst', 'Spread damage instead of burst']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '🏗' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=vanessa', icon: '📊' },
      { name: 'Mobalytics Guide', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '📖' }
    ]
  },
  {
    id: 'mak-self-poison',
    name: 'Self Poison',
    hero: 'mak',
    tier: 'a',
    overview: 'Damage yourself to power up. Poison synergies turn self-damage into massive output. Requires careful health management.',
    winCondition: 'Apply poison to yourself to trigger powerful effects, heal back with Lifesteal.',
    early: [
      'Look for self-poison items',
      'Healing is critical - dont skip it',
      'Foul Mushroom is a great starter',
      'Build economy for flexibility'
    ],
    mid: [
      'Stack self-poison triggers',
      'Add Lifesteal to sustain',
      'CDR helps cycle poison faster',
      'Remove items that dont synergize'
    ],
    late: [
      'Massive poison stacks = massive damage',
      'Lifesteal should outpace self-damage',
      'Crit amplifies everything',
      'Position poison items to trigger in sequence'
    ],
    coreItems: [
      { name: 'Foul Mushroom', tier: 'bronze', priority: 'core', desc: 'Self-poison enabler' },
      { name: 'Rainbow Staff', tier: 'gold', priority: 'core', desc: 'Healing and Haste' },
      { name: 'Vial Launcher', tier: 'silver', priority: 'good', desc: 'Potion synergy' }
    ],
    synergies: [
      { items: ['Self-poison', 'Lifesteal'], desc: 'Heal back the damage you deal to yourself' },
      { items: ['Poison stacks', 'Damage scaling'], desc: 'More poison = more damage output' }
    ],
    boardLayout: [
      { name: 'Poison', size: 'small', filled: true },
      { name: 'Poison', size: 'small', filled: true },
      { name: 'Lifesteal', size: 'medium', filled: true },
      { name: 'Damage', size: 'medium', filled: true },
      { name: 'Flex', size: 'medium' }
    ],
    tips: [
      'Lifesteal is NOT healing - it bypasses anti-heal',
      'Dont kill yourself - manage your health carefully',
      'This build spikes in power mid-game',
      'Great counter to anti-heal builds'
    ],
    counters: {
      bad: ['Burst damage when youre low HP', 'Poison immunity'],
      weak: ['Early aggro before you stabilize']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '🏗' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=mak', icon: '📊' }
    ]
  },
  {
    id: 'van-slow-burn',
    name: 'Slow Burn',
    hero: 'vanessa',
    tier: 'a',
    overview: 'Sustained burn damage over time. Less explosive than Powder Keg but more consistent. Oni Mask is the key scaling piece.',
    winCondition: 'Stack Burn on enemies, let it tick them down while you sustain.',
    early: [
      'Any Burn items are good',
      'Small weapons for early tempo',
      'Look for Crit items',
      'Incendiary Rounds is core'
    ],
    mid: [
      'Oni Mask is your scaling piece',
      'Stack Crit to amplify Burn',
      'CDR for more Burn applications',
      'Tracer Fire skill synergizes well'
    ],
    late: [
      'Oni Mask + high Crit = insane Burn',
      'Lighthouse is the ultimate upgrade',
      'Consider multiple Burn sources',
      'Sustained damage wins long fights'
    ],
    coreItems: [
      { name: 'Oni Mask', tier: 'gold', priority: 'must', desc: 'Burn scaling with Crit' },
      { name: 'Incendiary Rounds', tier: 'bronze', priority: 'core', desc: 'Burn application' },
      { name: 'Sniper Rifle', tier: 'gold', priority: 'good', desc: 'High damage, good with Crit' },
      { name: 'Lighthouse', tier: 'diamond', priority: 'flex', desc: 'Ultimate Burn scaling' }
    ],
    synergies: [
      { items: ['Oni Mask', 'Crit'], desc: 'Crit Burn damage scales massively' },
      { items: ['Burn sources', 'Duration'], desc: 'More Burn = more total damage' }
    ],
    boardLayout: [
      { name: 'Weapon', size: 'medium', filled: true },
      { name: 'Oni Mask', size: 'medium', filled: true },
      { name: 'Ammo', size: 'small', filled: true },
      { name: 'Crit', size: 'small', filled: true },
      { name: 'Flex', size: 'medium' }
    ],
    tips: [
      'Oni Mask needs Crit to shine - dont skip Crit items',
      'Burn damage ticks down over time - reapply often',
      'This build is more forgiving than Powder Keg',
      'Can pivot into Lighthouse if you find it'
    ],
    counters: {
      bad: ['Shield (reduces Burn by 50%)', 'Fast burst that kills before Burn ticks'],
      weak: ['High healing that outraces Burn']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '🏗' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=vanessa', icon: '📊' }
    ]
  },
  {
    id: 'pyg-freeze',
    name: 'Freeze',
    hero: 'pygmalien',
    tier: 'a',
    overview: 'Control build that locks down enemy items. Freeze their key pieces while you out-value them.',
    winCondition: 'Freeze enemy core items, win the value game while they cant fight back.',
    early: [
      'Economy first - you need shop power',
      'Any Freeze items are valuable',
      'Shield for survival',
      'Dont worry about damage early'
    ],
    mid: [
      'Stack Freeze application',
      'Target enemy key items',
      'Add economy items',
      'Shields keep you alive while Freeze does work'
    ],
    late: [
      'Lock down multiple enemy items',
      'Economy advantage should be huge',
      'Add damage once control is established',
      'Positioning matters for Freeze targets'
    ],
    coreItems: [
      { name: 'Freeze items', tier: 'silver', priority: 'must', desc: 'Build-defining control' },
      { name: 'Business Card', tier: 'bronze', priority: 'core', desc: 'Economy engine' },
      { name: 'Shield items', tier: 'silver', priority: 'core', desc: 'Survival while freezing' }
    ],
    synergies: [
      { items: ['Freeze', 'Economy'], desc: 'Control while out-valuing' },
      { items: ['Multiple Freeze', 'Lockdown'], desc: 'More Freeze = more enemy items disabled' }
    ],
    boardLayout: [
      { name: 'Freeze', size: 'small', filled: true },
      { name: 'Freeze', size: 'small', filled: true },
      { name: 'Economy', size: 'medium', filled: true },
      { name: 'Shield', size: 'medium', filled: true },
      { name: 'Flex', size: 'medium' }
    ],
    tips: [
      'Freeze disables items completely - target their best piece',
      'This build wins through attrition',
      'Great against combo-dependent builds',
      'Poor early game - play conservative'
    ],
    counters: {
      bad: ['Multiple damage sources (cant freeze all)', 'Charge mechanics'],
      weak: ['Fast aggro before Freeze comes online']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '🏗' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=pygmalien', icon: '📊' }
    ]
  },
  {
    id: 'doo-friends',
    name: 'Friends',
    hero: 'dooley',
    tier: 'b',
    overview: 'Dooley companion build. Stack Friends that synergize with your Core for chain reactions.',
    winCondition: 'Build a board of Friends that trigger each other for massive chain combos.',
    early: [
      'Core is your foundation - pick the right one',
      'Friends are cheap early game',
      'Position matters immediately',
      'Tech items for utility'
    ],
    mid: [
      'Stack Friends that synergize',
      'Upgrade your Core',
      'CDR helps chain faster',
      'Remove non-synergistic items'
    ],
    late: [
      'Full board of synergistic Friends',
      'Chains should be dealing huge damage',
      'Core should be fully powered',
      'Positioning is critical'
    ],
    coreItems: [
      { name: 'Core', tier: 'bronze', priority: 'must', desc: 'Build foundation' },
      { name: 'Friends', tier: 'bronze', priority: 'core', desc: 'Chain reaction pieces' },
      { name: 'Tech items', tier: 'silver', priority: 'good', desc: 'Utility and CDR' }
    ],
    synergies: [
      { items: ['Core', 'Friends'], desc: 'Core buffs Friends to its right' },
      { items: ['Multiple Friends', 'Chain'], desc: 'Friends trigger each other' }
    ],
    boardLayout: [
      { name: 'Core', size: 'medium', filled: true },
      { name: 'Friend', size: 'small', filled: true },
      { name: 'Friend', size: 'small', filled: true },
      { name: 'Friend', size: 'small', filled: true },
      { name: 'Tech', size: 'medium' }
    ],
    tips: [
      'Core buffs items to its RIGHT - positioning is everything',
      'Different Cores enable different strategies',
      'Friends are cheap but powerful in numbers',
      'This build has a high skill ceiling'
    ],
    counters: {
      bad: ['AoE Freeze that hits multiple Friends', 'Burst before chains start'],
      weak: ['Disruption effects']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '🏗' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=dooley', icon: '📊' }
    ]
  }
];

state.guides = metaGuides;

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

// Item image URL from wiki.gg
// Pattern: https://thebazaar.wiki.gg/images/thumb/X/XX/Item_Name.png/SIZE-Item_Name.png
// Since we don't know the hash path, we use a direct approach
function getItemImageUrl(itemName, size = 64) {
  // Format item name for local file (lowercase, underscores)
  const filename = itemName.toLowerCase().replace(/\s+/g, '_') + '.png';
  // Use local assets first (downloaded from wiki.gg)
  return `assets/items/${filename}`;
}

// CDN fallback URL for items not downloaded locally
function getItemImageCDN(itemName) {
  const formatted = itemName.replace(/\s+/g, '_');
  return `https://thebazaar.wiki.gg/images/${formatted}.png`;
}

// Fallback: Generate placeholder for items without images
function getItemPlaceholder(itemName, tier) {
  const colors = {
    bronze: '#cd7f32',
    silver: '#c0c0c0',
    gold: '#ffd700',
    diamond: '#b9f2ff',
    legendary: '#ff6b6b'
  };
  const color = colors[tier] || '#666';
  const initial = itemName.charAt(0).toUpperCase();
  // Return a data URI for an SVG placeholder
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect width="64" height="64" fill="${color}" rx="8"/>
      <text x="32" y="40" font-family="Arial" font-size="24" fill="white" text-anchor="middle">${initial}</text>
    </svg>
  `)}`
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
      <img class="item-icon"
           src="${getItemImageUrl(item.name)}"
           onerror="this.src='${getItemPlaceholder(item.name, item.tier)}'"
           alt="${item.name}"
           loading="lazy">
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-meta">
          <span class="item-tier ${item.tier}">${item.tier}</span>
          <span class="item-size">${item.size}</span>
          <span class="hero-tag ${item.hero.slice(0,3)}">${capitalize(item.hero)}</span>
        </div>
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
            <button class="btn-icon" onclick="copyBuildToClipboard(${build.id})" title="Copy to clipboard">📋</button>
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

// Auto-tagging keywords for note categorization
const NOTE_TAGS = {
  heroes: {
    'vanessa': ['vanessa', 'van', 'burn', 'powder keg', 'cannon', 'ammo', 'tracer'],
    'pygmalien': ['pygmalien', 'pyg', 'shield', 'drum', 'jabalian', 'business card', 'showcase'],
    'dooley': ['dooley', 'doo', 'core', 'friends', 'tech', 'chain'],
    'mak': ['mak', 'potion', 'poison', 'peacewrought', 'rainbow staff', 'mushroom'],
    'stelle': ['stelle', 'vehicle', 'flying', 'ornithopter'],
    'jules': ['jules', 'food', 'cook', 'heated', 'chilled', 'pizza']
  },
  mechanics: {
    'economy': ['gold', 'economy', 'income', 'shop', 'reroll', 'xp'],
    'combat': ['damage', 'heal', 'shield', 'crit', 'haste', 'cdr', 'cooldown'],
    'strategy': ['tempo', 'value', 'pivot', 'transition', 'spike', 'power spike'],
    'builds': ['build', 'synergy', 'core item', 'must have', 'flex slot']
  },
  sentiment: {
    'insight': ['realized', 'learned', 'discovered', 'key insight', 'important'],
    'mistake': ['mistake', 'wrong', 'shouldnt have', 'bad play', 'misplay'],
    'success': ['worked', 'good', 'won', 'clutch', 'perfect']
  }
};

// Auto-tag a note based on content
function autoTagNote(content) {
  const lower = content.toLowerCase();
  const tags = [];

  // Check hero mentions
  for (const [hero, keywords] of Object.entries(NOTE_TAGS.heroes)) {
    if (keywords.some(kw => lower.includes(kw))) {
      tags.push({ type: 'hero', value: hero });
    }
  }

  // Check mechanic mentions
  for (const [mechanic, keywords] of Object.entries(NOTE_TAGS.mechanics)) {
    if (keywords.some(kw => lower.includes(kw))) {
      tags.push({ type: 'mechanic', value: mechanic });
    }
  }

  // Check sentiment
  for (const [sentiment, keywords] of Object.entries(NOTE_TAGS.sentiment)) {
    if (keywords.some(kw => lower.includes(kw))) {
      tags.push({ type: 'sentiment', value: sentiment });
    }
  }

  return tags;
}

const noteModal = document.getElementById('noteModal');
const closeNoteBtn = document.getElementById('closeNote');
const deleteNoteBtn = document.getElementById('deleteNote');
let currentNoteId = null;
let noteFilterTag = '';
let noteSearchQuery = '';

// Note search listener
document.getElementById('noteSearch')?.addEventListener('input', (e) => {
  noteSearchQuery = e.target.value.toLowerCase();
  renderNotes();
});

// ==========================================
// IN-BROWSER VOICE RECORDER
// ==========================================

let mediaRecorder = null;
let audioChunks = [];
let recordingStartTime = null;
let recordingTimer = null;
let currentAudioBlob = null;

const recordBtn = document.getElementById('recordBtn');
const recorderStatus = document.getElementById('recorderStatus');
const recordingTime = document.getElementById('recordingTime');
const recorderControls = document.getElementById('recorderControls');
const cancelRecordingBtn = document.getElementById('cancelRecording');
const saveRecordingBtn = document.getElementById('saveRecording');
const transcriptionPreview = document.getElementById('transcriptionPreview');
const transcriptionText = document.getElementById('transcriptionText');
const transcriptionStatus = document.getElementById('transcriptionStatus');

// Format time as M:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Start recording
async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      currentAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      stream.getTracks().forEach(track => track.stop());
    };

    mediaRecorder.start();
    recordingStartTime = Date.now();

    // Update UI
    recordBtn.classList.add('recording');
    recorderStatus.textContent = 'Recording...';
    recorderControls.style.display = 'flex';
    transcriptionPreview.style.display = 'none';

    // Start timer
    recordingTimer = setInterval(() => {
      const elapsed = (Date.now() - recordingStartTime) / 1000;
      recordingTime.textContent = formatTime(elapsed);
    }, 100);

  } catch (err) {
    console.error('Error accessing microphone:', err);
    recorderStatus.textContent = 'Microphone access denied';
  }
}

// Stop recording
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
  }
  clearInterval(recordingTimer);
  recordBtn.classList.remove('recording');
  recorderStatus.textContent = 'Recording stopped';
}

// Cancel recording
function cancelRecording() {
  stopRecording();
  audioChunks = [];
  currentAudioBlob = null;
  resetRecorder();
}

// Reset recorder UI
function resetRecorder() {
  recorderStatus.textContent = 'Click to record';
  recordingTime.textContent = '0:00';
  recorderControls.style.display = 'none';
  transcriptionPreview.style.display = 'none';
  transcriptionText.textContent = '';
  transcriptionStatus.textContent = '';
}

// Transcribe audio using local Whisper server or fallback
async function transcribeAudio(audioBlob) {
  transcriptionPreview.style.display = 'block';
  transcriptionText.textContent = '';
  transcriptionStatus.textContent = 'Transcribing with Whisper...';
  transcriptionStatus.className = 'transcription-status';

  // Save the audio file locally for Whisper processing
  const timestamp = Date.now();
  const filename = `recording_${timestamp}`;

  // Try local Whisper transcription server first
  try {
    // Convert webm to wav for Whisper (if we have a transcription endpoint)
    const formData = new FormData();
    formData.append('audio', audioBlob, `${filename}.webm`);

    // Try local transcription server (you'd need to run one)
    const response = await fetch('http://localhost:5000/transcribe', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const result = await response.json();
      transcriptionText.textContent = result.text;
      transcriptionStatus.textContent = 'Transcription complete';
      transcriptionStatus.className = 'transcription-status success';
      return result.text;
    }
  } catch (err) {
    // Server not available, fallback to manual
  }

  // Fallback: Let user type or use Web Speech API
  transcriptionStatus.textContent = 'Local Whisper server not running. Type your note below:';

  // Try Web Speech API as fallback (if available)
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    transcriptionStatus.textContent = 'Using browser speech recognition (less accurate)...';
    // Note: This would need the audio to be re-recorded with SpeechRecognition
  }

  // Allow manual input
  transcriptionText.contentEditable = 'true';
  transcriptionText.style.border = '1px dashed var(--accent)';
  transcriptionText.style.minHeight = '60px';
  transcriptionText.placeholder = 'Type your note here...';
  transcriptionStatus.textContent = 'Type your note, or run Whisper server for auto-transcription';

  return null;
}

// Save the note
async function saveNote() {
  let content = transcriptionText.textContent.trim();

  if (!content) {
    transcriptionStatus.textContent = 'Please add transcription text before saving';
    transcriptionStatus.className = 'transcription-status error';
    return;
  }

  const note = {
    id: Date.now(),
    date: new Date().toISOString(),
    content: content,
    tags: autoTagNote(content),
    hasAudio: currentAudioBlob !== null
  };

  state.notes.unshift(note);
  localStorage.setItem('bazaar-notes', JSON.stringify(state.notes));

  // Save audio blob if we have one (for future playback)
  if (currentAudioBlob) {
    // Could save to IndexedDB for audio playback later
  }

  renderNotes();
  resetRecorder();
  currentAudioBlob = null;

  // Show success feedback
  recorderStatus.textContent = 'Note saved!';
  setTimeout(() => {
    recorderStatus.textContent = 'Click to record';
  }, 2000);
}

// Event listeners
recordBtn?.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    stopRecording();
    transcribeAudio(currentAudioBlob);
  } else {
    startRecording();
  }
});

cancelRecordingBtn?.addEventListener('click', cancelRecording);
saveRecordingBtn?.addEventListener('click', saveNote);

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

  // Auto-tag notes that don't have tags yet
  state.notes.forEach(note => {
    if (!note.tags) {
      note.tags = autoTagNote(note.content);
    }
  });

  // Filter notes by tag and search
  let filteredNotes = state.notes;
  if (noteFilterTag) {
    filteredNotes = filteredNotes.filter(note =>
      note.tags?.some(t => t.value === noteFilterTag)
    );
  }
  if (noteSearchQuery) {
    filteredNotes = filteredNotes.filter(note =>
      note.content.toLowerCase().includes(noteSearchQuery)
    );
  }

  if (filteredNotes.length === 0) {
    list.innerHTML = noteFilterTag
      ? '<p class="empty-state">No notes match this filter. <a href="#" onclick="clearNoteFilter()">Show all</a></p>'
      : '<p class="empty-state">No voice notes yet. Click "Record Note" to start!</p>';
    return;
  }

  // Group notes by date
  const grouped = {};
  filteredNotes.forEach(note => {
    const dateKey = new Date(note.date).toLocaleDateString();
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(note);
  });

  let html = '';
  for (const [date, notes] of Object.entries(grouped)) {
    html += `<div class="notes-date-group">
      <div class="notes-date-header">${date}</div>
      ${notes.map(note => {
        const time = new Date(note.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const preview = note.content.slice(0, 120) + (note.content.length > 120 ? '...' : '');
        const tagHtml = (note.tags || []).slice(0, 3).map(t =>
          `<span class="note-tag tag-${t.type}" onclick="event.stopPropagation(); filterNotesByTag('${t.value}')">${t.value}</span>`
        ).join('');
        return `
          <div class="note-item" onclick="viewNote(${note.id})">
            <div class="note-time">${time}</div>
            <div class="note-body">
              <div class="note-preview">${preview}</div>
              <div class="note-tags">${tagHtml}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>`;
  }

  list.innerHTML = html;
}

window.filterNotesByTag = function(tag) {
  noteFilterTag = tag;
  document.getElementById('noteFilterActive')?.remove();
  const header = document.querySelector('#notes .section-header h2');
  if (header && tag) {
    header.insertAdjacentHTML('afterend',
      `<span id="noteFilterActive" class="filter-badge">Filtering: ${tag} <button onclick="clearNoteFilter()">&times;</button></span>`
    );
  }
  renderNotes();
};

window.clearNoteFilter = function() {
  noteFilterTag = '';
  document.getElementById('noteFilterActive')?.remove();
  renderNotes();
};

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
// GUIDES TAB
// ==========================================

// Render the dynamic tier list in Meta tab
function renderTierList() {
  const tierList = document.getElementById('tierList');
  if (!tierList) return;

  const tiers = {
    s: state.guides.filter(g => g.tier === 's'),
    a: state.guides.filter(g => g.tier === 'a'),
    b: state.guides.filter(g => g.tier === 'b')
  };

  tierList.innerHTML = `
    <div class="tier-row tier-s">
      <div class="tier-label">S</div>
      <div class="tier-builds">
        ${tiers.s.map(g => `
          <div class="build-tag hero-${g.hero.slice(0,3)}" data-guide-id="${g.id}">
            ${g.name}
          </div>
        `).join('')}
      </div>
    </div>
    <div class="tier-row tier-a">
      <div class="tier-label">A</div>
      <div class="tier-builds">
        ${tiers.a.map(g => `
          <div class="build-tag hero-${g.hero.slice(0,3)}" data-guide-id="${g.id}">
            ${g.name}
          </div>
        `).join('')}
      </div>
    </div>
    <div class="tier-row tier-b">
      <div class="tier-label">B</div>
      <div class="tier-builds">
        ${tiers.b.map(g => `
          <div class="build-tag hero-${g.hero.slice(0,3)}" data-guide-id="${g.id}">
            ${g.name}
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Add click handlers to build tags
  tierList.querySelectorAll('.build-tag[data-guide-id]').forEach(tag => {
    tag.addEventListener('click', () => {
      const guideId = tag.dataset.guideId;
      showGuideDetail(guideId);
      // Switch to guides tab
      document.querySelector('[data-tab="guides"]').click();
    });
  });
}

// Render guides grid in Guides tab
function renderGuidesGrid() {
  const grid = document.getElementById('guidesGrid');
  const guideDetail = document.getElementById('guideDetail');
  if (!grid) return;

  // Hide detail, show grid
  guideDetail?.classList.remove('active');
  grid.style.display = '';

  const heroFilter = document.getElementById('guideHeroFilter')?.value || '';
  const tierFilter = document.getElementById('guideTierFilter')?.value || '';

  let filtered = state.guides;
  if (heroFilter) {
    filtered = filtered.filter(g => g.hero === heroFilter);
  }
  if (tierFilter) {
    filtered = filtered.filter(g => g.tier === tierFilter);
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="empty-state">No guides match your filters</p>';
    return;
  }

  grid.innerHTML = filtered.map(guide => `
    <div class="guide-card tier-${guide.tier}" data-guide-id="${guide.id}">
      <div class="guide-card-header">
        <span class="guide-tier-badge tier-${guide.tier}">${guide.tier.toUpperCase()}</span>
        <span class="guide-hero-badge hero-${guide.hero.slice(0,3)}">${capitalize(guide.hero)}</span>
      </div>
      <div class="guide-card-name">${guide.name}</div>
      <div class="guide-card-overview">${guide.overview.slice(0, 100)}...</div>
      <div class="guide-card-footer">
        <span class="guide-core-count">${guide.coreItems.length} core items</span>
        <span class="guide-view-btn">View Guide →</span>
      </div>
    </div>
  `).join('');

  // Add click handlers
  grid.querySelectorAll('.guide-card').forEach(card => {
    card.addEventListener('click', () => {
      showGuideDetail(card.dataset.guideId);
    });
  });
}

// Show single guide detail
function showGuideDetail(guideId) {
  const guide = state.guides.find(g => g.id === guideId);
  if (!guide) return;

  state.currentGuide = guide;

  const grid = document.getElementById('guidesGrid');
  const detail = document.getElementById('guideDetail');
  if (!grid || !detail) return;

  // Hide grid, show detail
  grid.style.display = 'none';
  detail.classList.add('active');

  // Populate header
  document.getElementById('guideTitle').textContent = guide.name;
  document.getElementById('guideHero').textContent = capitalize(guide.hero);
  document.getElementById('guideHero').className = `guide-hero-tag hero-${guide.hero.slice(0,3)}`;
  document.getElementById('guideTier').textContent = guide.tier.toUpperCase() + '-Tier';
  document.getElementById('guideTier').className = `guide-tier-tag tier-${guide.tier}`;
  document.getElementById('guideOverview').textContent = guide.overview;
  document.getElementById('guideWinCondition').textContent = guide.winCondition;

  // Phases
  document.getElementById('earlyPhase').innerHTML = guide.early.map(tip => `<li>${tip}</li>`).join('');
  document.getElementById('midPhase').innerHTML = guide.mid.map(tip => `<li>${tip}</li>`).join('');
  document.getElementById('latePhase').innerHTML = guide.late.map(tip => `<li>${tip}</li>`).join('');

  // Core Items
  const itemsContainer = document.getElementById('guideItems');
  itemsContainer.innerHTML = guide.coreItems.map(item => `
    <div class="guide-item tier-${item.tier}">
      <img class="guide-item-icon"
           src="${getItemImageUrl(item.name)}"
           onerror="this.src='${getItemPlaceholder(item.name, item.tier)}'"
           alt="${item.name}"
           loading="lazy">
      <div class="guide-item-content">
        <div class="guide-item-header">
          <span class="guide-item-name">${item.name}</span>
          <span class="guide-item-priority priority-${item.priority}">${item.priority}</span>
        </div>
        <div class="guide-item-tier">${item.tier}</div>
        <div class="guide-item-desc">${item.desc}</div>
      </div>
    </div>
  `).join('');

  // Synergies
  const synergiesContainer = document.getElementById('guideSynergies');
  synergiesContainer.innerHTML = guide.synergies.map(syn => `
    <div class="synergy-item">
      <div class="synergy-items">${syn.items.join(' + ')}</div>
      <div class="synergy-desc">${syn.desc}</div>
    </div>
  `).join('');

  // Board Layout
  const boardContainer = document.getElementById('guideBoard');
  boardContainer.innerHTML = guide.boardLayout.map(slot => `
    <div class="board-slot size-${slot.size} ${slot.filled ? 'filled' : ''}">
      <span class="slot-name">${slot.name}</span>
    </div>
  `).join('');

  // Tips
  document.getElementById('guideTips').innerHTML = guide.tips.map(tip => `<li>${tip}</li>`).join('');

  // Counters
  document.getElementById('guideBadMatchups').innerHTML = guide.counters.bad.map(c => `<li>${c}</li>`).join('');
  document.getElementById('guideWeaknesses').innerHTML = guide.counters.weak.map(c => `<li>${c}</li>`).join('');

  // External Links
  const linksContainer = document.getElementById('guideLinks');
  linksContainer.innerHTML = guide.externalLinks.map(link => `
    <a href="${link.url}" target="_blank" class="external-link">
      <span class="link-icon">${link.icon}</span>
      <span class="link-name">${link.name}</span>
    </a>
  `).join('');
}

// Back to guides grid
window.backToGuides = function() {
  const grid = document.getElementById('guidesGrid');
  const detail = document.getElementById('guideDetail');
  if (grid) grid.style.display = '';
  if (detail) detail.classList.remove('active');
  state.currentGuide = null;
};

// Guide filter listeners
document.getElementById('guideHeroFilter')?.addEventListener('change', renderGuidesGrid);
document.getElementById('guideTierFilter')?.addEventListener('change', renderGuidesGrid);

// Back button
document.getElementById('backToGuides')?.addEventListener('click', backToGuides);

// ==========================================
// INIT
// ==========================================

// ==========================================
// HEROES TAB - SEARCH & FILTER
// ==========================================

function filterHeroes() {
  const search = document.getElementById('heroSearch')?.value.toLowerCase() || '';
  const difficultyFilter = document.getElementById('heroDifficultyFilter')?.value || '';
  const heroCards = document.querySelectorAll('.hero-card');

  heroCards.forEach(card => {
    const heroName = card.querySelector('h3').textContent.toLowerCase();
    const heroStyle = card.querySelector('.hero-style').textContent.toLowerCase();
    const heroDifficulty = card.querySelector('.hero-difficulty').textContent;
    const buildTags = Array.from(card.querySelectorAll('.build-tag')).map(tag => tag.textContent.toLowerCase());

    const matchesSearch = !search ||
      heroName.includes(search) ||
      heroStyle.includes(search) ||
      buildTags.some(tag => tag.includes(search));

    const matchesDifficulty = !difficultyFilter || heroDifficulty === difficultyFilter;

    card.style.display = (matchesSearch && matchesDifficulty) ? '' : 'none';
  });
}

// Hero search/filter listeners
document.getElementById('heroSearch')?.addEventListener('input', filterHeroes);
document.getElementById('heroDifficultyFilter')?.addEventListener('change', filterHeroes);

// ==========================================
// COPY TO CLIPBOARD FEATURES
// ==========================================

// Copy build to clipboard
window.copyBuildToClipboard = function(buildId) {
  const build = state.builds.find(b => b.id === buildId);
  if (!build) return;

  const text = `
**${build.name}** (${capitalize(build.hero)} • ${build.tier.toUpperCase()}-Tier)

Core Items: ${build.coreItems || 'None specified'}

Strategy:
${build.strategy || 'No strategy notes'}

Early Game:
${build.earlyGame || 'No notes'}

Late Game:
${build.lateGame || 'No notes'}

---
Created with Bazaar Companion
`.trim();

  navigator.clipboard.writeText(text).then(() => {
    showCopyFeedback('Build copied to clipboard!');
  }).catch(err => {
    console.error('Copy failed:', err);
  });
};

// Copy guide to clipboard
window.copyGuideToClipboard = function() {
  const guide = state.currentGuide;
  if (!guide) return;

  const text = `
**${guide.name}** - ${capitalize(guide.hero)} (${guide.tier.toUpperCase()}-Tier)

${guide.overview}

Win Condition: ${guide.winCondition}

Core Items:
${guide.coreItems.map(i => `- ${i.name} (${i.tier}): ${i.desc}`).join('\n')}

Early Game:
${guide.early.map(t => `- ${t}`).join('\n')}

Mid Game:
${guide.mid.map(t => `- ${t}`).join('\n')}

Late Game:
${guide.late.map(t => `- ${t}`).join('\n')}

---
From Bazaar Companion
`.trim();

  navigator.clipboard.writeText(text).then(() => {
    showCopyFeedback('Guide copied to clipboard!');
  }).catch(err => {
    console.error('Copy failed:', err);
  });
};

// Show copy feedback
function showCopyFeedback(message) {
  const feedback = document.createElement('div');
  feedback.className = 'copy-feedback';
  feedback.textContent = message;
  document.body.appendChild(feedback);

  setTimeout(() => {
    feedback.classList.add('show');
  }, 10);

  setTimeout(() => {
    feedback.classList.remove('show');
    setTimeout(() => feedback.remove(), 300);
  }, 2000);
}

// ==========================================
// EXPORT/IMPORT BUILDS
// ==========================================

document.getElementById('exportBuilds')?.addEventListener('click', () => {
  if (state.builds.length === 0) {
    showCopyFeedback('No builds to export');
    return;
  }

  const data = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    builds: state.builds
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bazaar-builds-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);

  showCopyFeedback(`Exported ${state.builds.length} builds`);
});

document.getElementById('importBuilds')?.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (!data.builds || !Array.isArray(data.builds)) {
          throw new Error('Invalid build file format');
        }

        // Merge with existing builds, updating IDs
        let imported = 0;
        data.builds.forEach(build => {
          const newBuild = {
            ...build,
            id: Date.now() + imported
          };
          state.builds.push(newBuild);
          imported++;
        });

        localStorage.setItem('bazaar-builds', JSON.stringify(state.builds));
        renderBuilds();
        showCopyFeedback(`Imported ${imported} builds`);
      } catch (err) {
        showCopyFeedback('Failed to import builds');
        console.error('Import error:', err);
      }
    };
    reader.readAsText(file);
  };

  input.click();
});

// ==========================================
// RECENT RUNS WIDGET
// ==========================================

function renderRecentRuns() {
  const container = document.getElementById('recentRunsList');
  if (!container) return;

  const recentRuns = state.runs.slice(0, 5);

  if (recentRuns.length === 0) {
    container.innerHTML = '<p class="empty-state">No runs tracked yet</p>';
    return;
  }

  container.innerHTML = recentRuns.map(run => `
    <div class="recent-run-item">
      <div class="recent-run-hero">
        <span class="hero-tag ${run.hero.slice(0,3)}">${capitalize(run.hero)}</span>
        ${run.build ? `<span class="run-build">${run.build}</span>` : ''}
      </div>
      <div class="recent-run-result">
        <span class="run-wins ${run.wins >= 8 ? 'high' : run.wins >= 5 ? 'mid' : 'low'}">${run.wins} wins</span>
        <span class="run-date">${new Date(run.date).toLocaleDateString()}</span>
      </div>
    </div>
  `).join('');
}

// Widget link click handler
document.querySelector('.widget-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  const tab = e.target.dataset.tab;
  if (tab) {
    document.querySelector(`.tab[data-tab="${tab}"]`).click();
  }
});

renderRuns();
updateStats();
loadMilestones();
renderItems();
renderBuilds();
renderNotes();
loadExternalNotes();
renderTierList();
renderGuidesGrid();
renderRecentRuns();
