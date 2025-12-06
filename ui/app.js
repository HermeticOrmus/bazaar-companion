// Bazaar Companion - Local App

// State
const state = {
  runs: JSON.parse(localStorage.getItem('bazaar-runs') || '[]'),
  milestones: JSON.parse(localStorage.getItem('bazaar-milestones') || '{}'),
  builds: JSON.parse(localStorage.getItem('bazaar-builds') || '[]'),
  notes: JSON.parse(localStorage.getItem('bazaar-notes') || '[]'),
  items: [],
  guides: [],
  currentGuide: null,
  heroMastery: JSON.parse(localStorage.getItem('bazaar-hero-mastery') || '{}'),
  learningProgress: JSON.parse(localStorage.getItem('bazaar-learning-progress') || '{}')
};

// ==========================================
// META BUILD GUIDES DATA
// ==========================================

const metaGuides = [
  {
    id: 'mak-poppy-field',
    name: 'Poppy Field',
    hero: 'mak',
    tier: 's',
    overview: 'The strongest Mak build in Season 9. Poppy Field creates infinite weapon loops with Spider Mace. Each weapon poison triggers Poppy Field, which charges Spider Mace, creating devastating chain reactions.',
    winCondition: 'Assemble Poppy Field + Spider Mace core, add Heavy enchantment for infinite loops, outpace all enemies.',
    early: [
      'Look for any poison weapons (Floor Spike, Spider Mace)',
      'Foul Mushroom for early poison application',
      'Runic Potion is essential for Lifesteal on weapons',
      'Economy for shop flexibility'
    ],
    mid: [
      'Poppy Field is your MUST item - reroll aggressively',
      'Spider Mace + Floor Spike are core weapons',
      'Heavy enchantment on Poppy Field = infinite loops',
      'Add second Spider Mace if available'
    ],
    late: [
      'Double Spider Mace + Heavy Poppy Field = unstoppable',
      'Barbed Claws for Regen scaling',
      'Fungal Spores doubles damage with poison',
      'Shard of Obsidian kickstarts the combo'
    ],
    coreItems: [
      { name: 'Poppy Field', tier: 'gold', priority: 'must', desc: 'Build-defining. Poisons when weapons hit, charges weapons.' },
      { name: 'Spider Mace', tier: 'silver', priority: 'must', desc: 'Charges via Slow/Poison. Small slot = huge value.' },
      { name: 'Floor Spike', tier: 'bronze', priority: 'core', desc: 'Poison weapon, works in multiples' },
      { name: 'Runic Potion', tier: 'silver', priority: 'core', desc: 'Guarantees Lifesteal on any weapon' },
      { name: 'Barbed Claws', tier: 'gold', priority: 'good', desc: 'Damage per Regen scaling' }
    ],
    synergies: [
      { items: ['Poppy Field', 'Spider Mace'], desc: 'Spider Mace poisons → Poppy Field triggers → charges Spider Mace → infinite loop' },
      { items: ['Heavy enchantment', 'Poppy Field'], desc: 'Heavy Poppy Field with 2 Spider Maces = true infinite' },
      { items: ['Fungal Spores', 'Poison weapons'], desc: 'Fungal Spores damages twice, scales with poison stacks' }
    ],
    boardLayout: [
      { name: 'Spider Mace', size: 'small', filled: true },
      { name: 'Spider Mace', size: 'small', filled: true },
      { name: 'Poppy Field', size: 'large', filled: true },
      { name: 'Runic Potion', size: 'small', filled: true },
      { name: 'Floor Spike', size: 'small', filled: true },
      { name: 'Flex', size: 'medium' }
    ],
    tips: [
      'Poppy Field + Spider Mace is the core - prioritize this combo above all',
      'Heavy enchantment on Poppy Field is game-winning',
      'Runic Potion guarantees Lifesteal - never skip it',
      'This build destroys Shield builds and outpaces Burn',
      'Shard of Obsidian as fast weapon kickstarts the loop'
    ],
    counters: {
      bad: ['Heavy Freeze (stops weapon loops)', 'Burst before loop starts'],
      weak: ['Early aggro before Poppy Field online']
    },
    externalLinks: [
      { name: 'Kripp Poppy Field', url: 'https://mobalytics.gg/the-bazaar/builds/poppy-field-mak-kripp', icon: '⚐' },
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/mak-builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=mak', icon: '▤' }
    ]
  },
  {
    id: 'mak-magnus-femur',
    name: 'Magnus Femur',
    hero: 'mak',
    tier: 'a',
    overview: 'Slow-based weapon scaling. Magnus Femur gains +25 damage per tier each time you Slow, with built-in self-charging. Stack Slow triggers for devastating hits.',
    winCondition: 'Find Magnus Femur before Day 7, stack Slow triggers with Incense/Amber, scale damage exponentially.',
    early: [
      'Look for any Slow items (Incense, Amber, Sleeping Potion)',
      'Energy Potion for early Haste kickstart',
      'Economy for shop flexibility',
      'Magnus Femur can carry from Silver tier'
    ],
    mid: [
      'Magnus Femur MUST be found before Day 7',
      'Upgrade Magnus Femur to Gold ASAP (+25 damage per tier)',
      'Incense is core - 4 Slow triggers at Diamond',
      'Amber extends Slow duration'
    ],
    late: [
      'Goggles for 100% Crit chance quickly',
      'Hourglass for CDR on Magnus Femur + Incense',
      'Runic Potion for guaranteed Lifesteal',
      'Invulnerability Potion as failsafe'
    ],
    coreItems: [
      { name: 'Magnus Femur', tier: 'legendary', priority: 'must', desc: 'Gains damage per Slow, self-charges' },
      { name: 'Incense', tier: 'silver', priority: 'must', desc: '4 Slow triggers at Diamond, small slot' },
      { name: 'Amber', tier: 'bronze', priority: 'core', desc: 'Extends Slow duration, decent Slow itself' },
      { name: 'Runic Potion', tier: 'silver', priority: 'core', desc: 'Guarantees Lifesteal on Magnus Femur' },
      { name: 'Hourglass', tier: 'gold', priority: 'good', desc: 'CDR for adjacent items' }
    ],
    synergies: [
      { items: ['Magnus Femur', 'Incense'], desc: 'Each Incense tick charges Magnus Femur' },
      { items: ['Amber', 'All Slow items'], desc: 'Extended Slow duration = more damage time' },
      { items: ['Goggles', 'Magnus Femur'], desc: 'Quick 100% Crit on a scaling weapon' }
    ],
    boardLayout: [
      { name: 'Incense', size: 'small', filled: true },
      { name: 'Amber', size: 'small', filled: true },
      { name: 'Magnus Femur', size: 'large', filled: true },
      { name: 'Hourglass', size: 'medium', filled: true },
      { name: 'Runic Potion', size: 'small', filled: true },
      { name: 'Flex', size: 'medium' }
    ],
    tips: [
      'Commit to Magnus Femur BEFORE Day 7 for guaranteed Gold upgrade',
      'Upgrade Magnus Femur tier ASAP - +25 damage scaling difference is huge',
      'Incense is the most reliable Slow source - fits in small slot',
      'Heavy Energy Potion kickstarts the build - first seconds matter most',
      'Holsters can help with initial weapon activation'
    ],
    counters: {
      bad: ['Cleanse effects', 'Slow immunity'],
      weak: ['Fast burst before Magnus Femur ramps']
    },
    externalLinks: [
      { name: 'Kripp Magnus Femur', url: 'https://mobalytics.gg/the-bazaar/builds/magnus-femur-mak-kripp', icon: '⚐' },
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/mak-builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=mak', icon: '▤' }
    ]
  },
  {
    id: 'mak-peacewrought',
    name: 'Peacewrought',
    hero: 'mak',
    tier: 'a',
    overview: 'Sacrifice items to stack Regen. Peacewrought destroys items to gain permanent Regen, then heals massively. Requires economy to feed items and strong enchantment at level 10.',
    winCondition: 'Build economy to sacrifice items, stack Regen on Peacewrought, add Staff of the Moose for 2x Regen.',
    early: [
      'Economy is critical - you need gold to sacrifice items',
      'Catalyst generators (Aludel, Mortar & Pestle) farm gold passively',
      'Peacewrought can appear as early as Day 3',
      'Any cheap items work as sacrifice fodder'
    ],
    mid: [
      'Upgrade Peacewrought to Silver ASAP',
      'Feed items regularly to stack Regen',
      'Staff of the Moose doubles your Regen',
      'Strong enchantment at level 10 is key'
    ],
    late: [
      'Massive Regen stacks = unkillable',
      'Barbed Claws converts Regen to damage',
      'Shard of Obsidian for fast activation',
      'Hourglass for CDR'
    ],
    coreItems: [
      { name: 'Peacewrought', tier: 'legendary', priority: 'must', desc: 'Destroys left item for Regen, heals on hit' },
      { name: 'Staff of the Moose', tier: 'diamond', priority: 'must', desc: '2x Regen multiplier' },
      { name: 'Barbed Claws', tier: 'gold', priority: 'core', desc: 'Damage per Regen' },
      { name: 'Aludel', tier: 'silver', priority: 'good', desc: 'Catalyst generator for passive gold' },
      { name: 'Energy Potion', tier: 'bronze', priority: 'good', desc: 'Haste + cheap sacrifice fodder' }
    ],
    synergies: [
      { items: ['Peacewrought', 'Staff of the Moose'], desc: '2x Regen = 2x healing = unkillable' },
      { items: ['Peacewrought', 'Catalyst generators'], desc: 'Farm gold while scaling Regen' },
      { items: ['Barbed Claws', 'Regen stacks'], desc: 'Convert defense into offense' }
    ],
    boardLayout: [
      { name: 'Fodder', size: 'small' },
      { name: 'Peacewrought', size: 'large', filled: true },
      { name: 'Staff of Moose', size: 'large', filled: true },
      { name: 'Barbed Claws', size: 'medium', filled: true },
      { name: 'Aludel', size: 'small', filled: true },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Economy first - you need gold to sacrifice items',
      'Upgrade Peacewrought to Silver before feeding aggressively',
      'Staff of the Moose is the second must-have piece',
      'Chunk of Lead was removed - build economy instead',
      'Strong enchantment at level 10 can carry the build'
    ],
    counters: {
      bad: ['Heavy Freeze builds', 'Burst before Regen stacks'],
      weak: ['Early aggro if economy slow', 'Anti-heal effects']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/mak-builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=mak', icon: '▤' },
      { name: 'Mobalytics Guide', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '⚐' }
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
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=pygmalien', icon: '▤' },
      { name: 'Mobalytics Guide', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '⚐' }
    ]
  },
  {
    id: 'van-gunslinger-aggro',
    name: 'Gunslinger Aggro',
    hero: 'vanessa',
    tier: 's',
    overview: 'Vanessa\'s fastest and most explosive build. Deals insane burst damage that acts like a one-shot build. Sharkclaws + Trebuchet + Zoarcid is one of the most OP early tempo starts in the game.',
    winCondition: 'Burst enemies down before they can respond. Fast weapons with Crit and damage scaling.',
    early: [
      'Sharkclaws/Trebuchet/Zoarcid combo is broken early',
      'Orange Julian is HIGHEST priority - scales single weapon',
      'Any fast small weapons work',
      'Look for Crit items immediately'
    ],
    mid: [
      'Commit to single weapon or multi-weapon',
      'Stack Crit chance aggressively',
      'CDR to cycle weapons faster',
      'Damage enchantments are key'
    ],
    late: [
      'One-shot potential with stacked Crit',
      'Orange Julian + scaled weapon = instant kills',
      'Railgun as ultimate finisher',
      'Position for maximum burst'
    ],
    coreItems: [
      { name: 'Orange Julian', tier: 'gold', priority: 'must', desc: 'Scales single weapon massively' },
      { name: 'Sharkclaws', tier: 'silver', priority: 'core', desc: 'Fast damage, great early' },
      { name: 'Trebuchet', tier: 'silver', priority: 'core', desc: 'High burst potential' },
      { name: 'Zoarcid', tier: 'bronze', priority: 'core', desc: 'Cheap, fast, synergizes' },
      { name: 'Railgun', tier: 'diamond', priority: 'flex', desc: '150 dmg, ignores Shield, 100% Crit' }
    ],
    synergies: [
      { items: ['Orange Julian', 'Single weapon'], desc: 'Julian scales one weapon to absurd damage' },
      { items: ['Sharkclaws', 'Trebuchet', 'Zoarcid'], desc: 'The holy trinity of early aggro' },
      { items: ['Crit items', 'Fast weapons'], desc: 'More crits = more burst = faster kills' }
    ],
    boardLayout: [
      { name: 'Julian', size: 'medium', filled: true },
      { name: 'Main Wpn', size: 'large', filled: true },
      { name: 'Sharkclaws', size: 'small', filled: true },
      { name: 'Crit', size: 'small', filled: true },
      { name: 'CDR', size: 'small' },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Orange Julian is the #1 priority item - reroll aggressively',
      'Sharkclaws/Trebuchet/Zoarcid is the best early start in the game',
      'Single weapon builds depend on finding Orange Julian early',
      'This build ends games fast - you either win quick or lose',
      'Crit chance is everything - stack it relentlessly'
    ],
    counters: {
      bad: ['Heavy Shield builds that absorb burst', 'Freeze on your main weapon'],
      weak: ['Sustain builds that survive initial burst']
    },
    externalLinks: [
      { name: 'Kripp Gunslinger', url: 'https://mobalytics.gg/the-bazaar/builds/gunslinger-aggro-vanessa', icon: '⚐' },
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/vanessa-builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=vanessa', icon: '▤' }
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
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=vanessa', icon: '▤' },
      { name: 'Mobalytics Guide', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '⚐' }
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
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=mak', icon: '▤' }
    ]
  },
  {
    id: 'van-slow-burn',
    name: 'Slow Burn',
    hero: 'vanessa',
    tier: 's',
    overview: 'The most consistent Vanessa build. Oni Mask offers the strongest Burn scaling in the game when paired with reliable Crit. Stack burn and watch enemies melt.',
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
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=vanessa', icon: '▤' }
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
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=pygmalien', icon: '▤' }
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
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=dooley', icon: '▤' }
    ]
  },
  // Stelle Builds
  {
    id: 'stelle-lightning-rod',
    name: 'Lightning Rod',
    hero: 'stelle',
    tier: 's',
    overview: 'Top tier Stelle build. Lightning Rod chains lightning between your vehicles, dealing massive AoE damage. Excellent scaling into late game.',
    winCondition: 'Stack vehicles, let Lightning Rod chain between them for devastating AoE damage.',
    early: [
      'Any small vehicles are fine',
      'Look for Lightning synergy items',
      'Economy to see more shops',
      'Dont force the build too early'
    ],
    mid: [
      'Lightning Rod is your core piece',
      'Add more vehicles for chains',
      'Ornithopter for mobility',
      'CDR helps cycle faster'
    ],
    late: [
      'Full vehicle board = maximum chains',
      'Lightning damage should be insane',
      'Crit amplifies chain damage',
      'Position vehicles to maximize chains'
    ],
    coreItems: [
      { name: 'Lightning Rod', tier: 'gold', priority: 'must', desc: 'Build-defining chain lightning' },
      { name: 'Ornithopter', tier: 'silver', priority: 'core', desc: 'Fast vehicle, good utility' },
      { name: 'Flycycle', tier: 'bronze', priority: 'core', desc: 'Cheap vehicle for chains' },
      { name: 'Helicopter', tier: 'gold', priority: 'good', desc: 'Strong late game vehicle' }
    ],
    synergies: [
      { items: ['Lightning Rod', 'Multiple vehicles'], desc: 'More vehicles = more chain targets' },
      { items: ['Fast vehicles', 'CDR'], desc: 'More activations = more lightning procs' }
    ],
    boardLayout: [
      { name: 'L. Rod', size: 'medium', filled: true },
      { name: 'Vehicle', size: 'small', filled: true },
      { name: 'Vehicle', size: 'small', filled: true },
      { name: 'Vehicle', size: 'medium', filled: true },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Lightning chains between YOUR vehicles - stack them',
      'Position is less critical than quantity for this build',
      'Great AoE damage against wide boards',
      'Can pivot into other Stelle builds if needed'
    ],
    counters: {
      bad: ['Single-target focused builds', 'Anti-vehicle effects'],
      weak: ['Freeze on Lightning Rod itself']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=stelle', icon: '▤' }
    ]
  },
  {
    id: 'stelle-space-laser',
    name: 'Space Laser',
    hero: 'stelle',
    tier: 'a',
    overview: 'Charge up the Space Laser for devastating burst. Slower but hits incredibly hard when it fires.',
    winCondition: 'Survive while charging Space Laser, then obliterate opponents with massive beam.',
    early: [
      'Shields and sustain are priority',
      'Any vehicle that generates charge',
      'Dont rush Space Laser',
      'Economy for shop flexibility'
    ],
    mid: [
      'Space Laser is your win condition',
      'Add charge generators',
      'Shields while you charge up',
      'Position for survival'
    ],
    late: [
      'Space Laser should be fully charged',
      'One shot potential is real',
      'CDR for faster recharge',
      'Crit on the beam is devastating'
    ],
    coreItems: [
      { name: 'Space Laser', tier: 'diamond', priority: 'must', desc: 'Build-defining burst weapon' },
      { name: 'Drone Workshop', tier: 'gold', priority: 'core', desc: 'Generates drones for charge' },
      { name: 'Vortex Cannon', tier: 'gold', priority: 'good', desc: 'Alternative damage source' }
    ],
    synergies: [
      { items: ['Space Laser', 'Charge sources'], desc: 'Faster charging = more lasers' },
      { items: ['Shields', 'Stall'], desc: 'Survive while charging up' }
    ],
    boardLayout: [
      { name: 'Laser', size: 'large', filled: true },
      { name: 'Drone', size: 'small', filled: true },
      { name: 'Shield', size: 'medium', filled: true },
      { name: 'Charge', size: 'small' },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Space Laser has a charge-up time - protect it',
      'The beam hits HARD when it fires',
      'Great against single-target builds',
      'Requires more setup than Lightning Rod'
    ],
    counters: {
      bad: ['Fast aggro that kills before laser fires', 'Freeze on Space Laser'],
      weak: ['Wide boards that spread damage']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=stelle', icon: '▤' }
    ]
  },
  // Jules Builds
  {
    id: 'jules-burn',
    name: 'Burn Jules',
    hero: 'jules',
    tier: 's',
    overview: 'Jules can deal burn damage through cooking items. Grill and heat-based items stack burn while providing sustain through food.',
    winCondition: 'Apply Burn through cooking, heal through food effects, outlast opponents.',
    early: [
      'Grill is your early Burn source',
      'Food items for sustain',
      'Spices for damage amp',
      'Chocolate early is good'
    ],
    mid: [
      'Stack Burn application',
      'Oven for bigger food items',
      'CDR helps cycle cooking faster',
      'Start removing non-synergistic items'
    ],
    late: [
      'Multiple Burn sources ticking',
      'Food healing should keep you alive',
      'Crit amplifies Burn damage',
      'Kitchen should be fully optimized'
    ],
    coreItems: [
      { name: 'Grill', tier: 'silver', priority: 'must', desc: 'Core Burn application' },
      { name: 'Oven', tier: 'gold', priority: 'core', desc: 'Bigger food, more effects' },
      { name: 'Spices', tier: 'bronze', priority: 'core', desc: 'Damage amplification' },
      { name: 'Curry', tier: 'silver', priority: 'good', desc: 'Burn synergy food' }
    ],
    synergies: [
      { items: ['Grill', 'Burn items'], desc: 'Cooking applies Burn to enemies' },
      { items: ['Food', 'Healing'], desc: 'Sustain while Burn ticks' }
    ],
    boardLayout: [
      { name: 'Grill', size: 'medium', filled: true },
      { name: 'Oven', size: 'medium', filled: true },
      { name: 'Food', size: 'small', filled: true },
      { name: 'Spice', size: 'small', filled: true },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Jules Burn is different from Vanessa - its sustained',
      'Food healing keeps you in long fights',
      'Spices make everything hit harder',
      'Great counter to builds that cant heal'
    ],
    counters: {
      bad: ['Shield-heavy builds', 'Fast burst before Burn stacks'],
      weak: ['Anti-heal against your food']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=jules', icon: '▤' }
    ]
  },
  {
    id: 'jules-giant-lollipop',
    name: 'Giant Lollipop',
    hero: 'jules',
    tier: 'a',
    overview: 'Scale a Giant Lollipop to massive size. Sweet synergies provide healing while the Lollipop grows into a devastating weapon.',
    winCondition: 'Grow the Giant Lollipop, use sweet items for sustain, smash opponents late game.',
    early: [
      'Any sweet items are good',
      'Chocolate Bar for early scaling',
      'Economy to find pieces',
      'Dont force Lollipop too early'
    ],
    mid: [
      'Giant Lollipop starts growing',
      'Add more sweet synergies',
      'Healing through candy',
      'CDR to swing Lollipop faster'
    ],
    late: [
      'Lollipop should be HUGE',
      'One swing = massive damage',
      'Sweet healing sustains you',
      'Crit on a big Lollipop is insane'
    ],
    coreItems: [
      { name: 'Giant Lollipop', tier: 'gold', priority: 'must', desc: 'Build-defining scaling weapon' },
      { name: 'Chocolate Bar', tier: 'bronze', priority: 'core', desc: 'Sweet synergy, early scaling' },
      { name: 'Truffles', tier: 'silver', priority: 'good', desc: 'Premium sweet item' }
    ],
    synergies: [
      { items: ['Giant Lollipop', 'Sweet items'], desc: 'Sweets make Lollipop grow' },
      { items: ['Candy', 'Healing'], desc: 'Sweet items provide sustain' }
    ],
    boardLayout: [
      { name: 'Lollipop', size: 'large', filled: true },
      { name: 'Sweet', size: 'small', filled: true },
      { name: 'Sweet', size: 'small', filled: true },
      { name: 'CDR', size: 'medium' },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Lollipop grows over time - patience is key',
      'Sweet items both scale and sustain',
      'Late game Lollipop hits like a truck',
      'Position sweets to trigger before Lollipop swings'
    ],
    counters: {
      bad: ['Early aggro before Lollipop grows', 'Freeze on Lollipop'],
      weak: ['Burst that ignores your healing']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=jules', icon: '▤' }
    ]
  },
  {
    id: 'jules-freezer',
    name: 'Freezer Build',
    hero: 'jules',
    tier: 'a',
    overview: 'Control build using Jules Freezer mechanics. Lock down enemy items while your kitchen deals sustained damage.',
    winCondition: 'Freeze enemy key items, out-value them with sustained food damage.',
    early: [
      'Freezer items for control',
      'Food for sustain',
      'Economy is important',
      'Dont worry about damage early'
    ],
    mid: [
      'Stack Freeze application',
      'Target enemy win conditions',
      'Add damage through cooking',
      'CDR for more Freeze uptime'
    ],
    late: [
      'Multiple items frozen',
      'Kitchen dealing consistent damage',
      'Control should be oppressive',
      'Win the value game'
    ],
    coreItems: [
      { name: 'Dishwasher', tier: 'silver', priority: 'core', desc: 'Freeze application' },
      { name: 'Rice Cooker', tier: 'bronze', priority: 'core', desc: 'Consistent damage' },
      { name: 'Wok', tier: 'silver', priority: 'good', desc: 'Fast cooking, good damage' }
    ],
    synergies: [
      { items: ['Freeze', 'Control'], desc: 'Lock down enemy board' },
      { items: ['Kitchen', 'Damage'], desc: 'Consistent damage while controlling' }
    ],
    boardLayout: [
      { name: 'Freeze', size: 'medium', filled: true },
      { name: 'Kitchen', size: 'medium', filled: true },
      { name: 'Food', size: 'small', filled: true },
      { name: 'CDR', size: 'small' },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Freeze their best items first',
      'Jules Freeze is more utility than Pygmalien',
      'Great for disrupting combo builds',
      'Can pivot into Burn if Freeze pieces dont come'
    ],
    counters: {
      bad: ['Builds with many redundant items', 'Freeze immunity'],
      weak: ['Fast aggro before control establishes']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=jules', icon: '▤' }
    ]
  },
  // Additional Vanessa builds from current meta
  {
    id: 'van-saloon-friends',
    name: 'Saloon Friends',
    hero: 'vanessa',
    tier: 'a',
    overview: 'Vanessa friend-based build. Stack small weapon friends that synergize together for chain effects.',
    winCondition: 'Build a board of synergistic small weapons that chain-trigger each other.',
    early: [
      'Small weapons are your friends',
      'Pistol, Cutlass early game',
      'Look for weapon synergies',
      'Ammo items help cycle'
    ],
    mid: [
      'Add more synergistic weapons',
      'CDR to chain faster',
      'Ammo management is key',
      'Start seeing chain reactions'
    ],
    late: [
      'Full board of friends chaining',
      'Crit amplifies everything',
      'Chains should be devastating',
      'Position for maximum triggers'
    ],
    coreItems: [
      { name: 'Pistol', tier: 'bronze', priority: 'core', desc: 'Fast, cheap weapon' },
      { name: 'Cutlass', tier: 'bronze', priority: 'core', desc: 'Good early friend' },
      { name: 'Double Barrel', tier: 'silver', priority: 'good', desc: 'Strong upgrade' }
    ],
    synergies: [
      { items: ['Multiple weapons', 'Ammo'], desc: 'Weapons share ammo synergies' },
      { items: ['Small weapons', 'Chains'], desc: 'Friends trigger each other' }
    ],
    boardLayout: [
      { name: 'Weapon', size: 'small', filled: true },
      { name: 'Weapon', size: 'small', filled: true },
      { name: 'Weapon', size: 'small', filled: true },
      { name: 'Ammo', size: 'small', filled: true },
      { name: 'CDR', size: 'medium' }
    ],
    tips: [
      'More friends = more chains',
      'Positioning matters for trigger order',
      'Great tempo build - strong early and mid',
      'Can pivot into Burn if you find pieces'
    ],
    counters: {
      bad: ['AoE Freeze', 'Board wipes'],
      weak: ['Single large item that tanks everything']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=vanessa', icon: '▤' }
    ]
  },
  {
    id: 'van-tortuga',
    name: 'Tortuga',
    hero: 'vanessa',
    tier: 'b',
    overview: 'Defensive Vanessa build. Use Anchor and nautical items for shield and sustain while dealing steady damage.',
    winCondition: 'Anchor provides defense, weapons provide offense. Balanced approach.',
    early: [
      'Anchor is core - find it early',
      'Any weapons for damage',
      'Shield items help survive',
      'Economy for flexibility'
    ],
    mid: [
      'Anchor should be online',
      'Add weapon damage',
      'More nautical synergies',
      'CDR helps both shield and damage'
    ],
    late: [
      'Tanky with good damage',
      'Anchor shield stacking',
      'Balanced build - not specialized',
      'Win through consistency'
    ],
    coreItems: [
      { name: 'Anchor', tier: 'silver', priority: 'must', desc: 'Shield and slow' },
      { name: 'Cannon', tier: 'silver', priority: 'core', desc: 'Reliable damage' },
      { name: 'Harpoon', tier: 'bronze', priority: 'good', desc: 'Nautical synergy' }
    ],
    synergies: [
      { items: ['Anchor', 'Nautical'], desc: 'Nautical items synergize together' },
      { items: ['Shield', 'Damage'], desc: 'Balanced offense and defense' }
    ],
    boardLayout: [
      { name: 'Anchor', size: 'medium', filled: true },
      { name: 'Cannon', size: 'medium', filled: true },
      { name: 'Weapon', size: 'small', filled: true },
      { name: 'Shield', size: 'small' },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Anchor makes you tanky - use it',
      'Not as explosive as other Vanessa builds',
      'Good for learning the hero',
      'Can pivot into other builds if pieces come'
    ],
    counters: {
      bad: ['Shield-piercing effects', 'Burst that ignores Anchor'],
      weak: ['Builds that scale harder late game']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=vanessa', icon: '▤' }
    ]
  },
  // Dooley additional builds
  {
    id: 'doo-weaponized-core',
    name: 'Weaponized Core',
    hero: 'dooley',
    tier: 'a',
    overview: 'Aggressive Dooley build focusing on Core damage output. Combat Core or Critical Core as your foundation.',
    winCondition: 'Core and attached items deal massive damage. Win through aggression.',
    early: [
      'Combat Core or Critical Core',
      'Attach damage items to Core',
      'CDR is always good',
      'Position Core carefully'
    ],
    mid: [
      'Core should be dealing real damage',
      'Add Crit for scaling',
      'GPU for crit consistency',
      'More attachments = more power'
    ],
    late: [
      'Core is a murder machine',
      'Crit should be high',
      'One-shot potential exists',
      'Position to protect Core'
    ],
    coreItems: [
      { name: 'Combat Core', tier: 'silver', priority: 'must', desc: 'Damage-focused Core' },
      { name: 'Critical Core', tier: 'gold', priority: 'alt', desc: 'Alternative - crit focused' },
      { name: 'GPU', tier: 'silver', priority: 'core', desc: 'Crit chance for Core' }
    ],
    synergies: [
      { items: ['Core', 'Damage attachments'], desc: 'Attachments multiply Core damage' },
      { items: ['Crit', 'Core'], desc: 'Crit Core hits are devastating' }
    ],
    boardLayout: [
      { name: 'Core', size: 'medium', filled: true },
      { name: 'Attach', size: 'small', filled: true },
      { name: 'Attach', size: 'small', filled: true },
      { name: 'GPU', size: 'medium', filled: true },
      { name: 'Flex', size: 'small' }
    ],
    tips: [
      'Core buffs items to its RIGHT',
      'Combat Core is more aggressive than Friends Core',
      'Great early tempo build',
      'Can pivot into Friends if needed'
    ],
    counters: {
      bad: ['Freeze on Core', 'Disruption effects'],
      weak: ['Builds that outscale late']
    },
    externalLinks: [
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/category/builds/', icon: '⚒' },
      { name: 'BazaarDB Items', url: 'https://bazaardb.gg/?hero=dooley', icon: '▤' }
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

function switchTab(target) {
  tabs.forEach(t => t.classList.remove('active'));
  const targetTab = document.querySelector(`.tab[data-tab="${target}"]`);
  if (targetTab) targetTab.classList.add('active');

  tabContents.forEach(content => {
    content.classList.toggle('active', content.id === target);
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    switchTab(tab.dataset.tab);
  });
});

// Landing page buttons
document.querySelectorAll('.landing-btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
  });
});

// Update home stats from runs data
function updateHomeStats() {
  const runs = JSON.parse(localStorage.getItem('bazaarRuns') || '[]');
  const totalRuns = runs.length;
  const tenWins = runs.filter(r => r.wins === 10).length;
  const avgWins = totalRuns > 0 ? (runs.reduce((sum, r) => sum + r.wins, 0) / totalRuns).toFixed(1) : '—';
  const bestRun = totalRuns > 0 ? Math.max(...runs.map(r => r.wins)) : '—';

  const homeRunCount = document.getElementById('homeRunCount');
  const homeAvgWins = document.getElementById('homeAvgWins');
  const homeBestRun = document.getElementById('homeBestRun');
  const homeTenWins = document.getElementById('homeTenWins');

  if (homeRunCount) homeRunCount.textContent = totalRuns;
  if (homeAvgWins) homeAvgWins.textContent = avgWins;
  if (homeBestRun) homeBestRun.textContent = bestRun;
  if (homeTenWins) homeTenWins.textContent = tenWins;
}

// Call on load
updateHomeStats();

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

  // Update hero mastery
  calculateHeroMastery(run.hero);
  saveMastery();

  renderRuns();
  updateStats();
  renderHeroGrid(); // Re-render hero grid to update mastery badges
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

// Comprehensive items database with full tooltip data
const sampleItems = [
  // ========== VANESSA ITEMS ==========
  { name: 'Powder Keg', hero: 'vanessa', tier: 'gold', size: 'medium', tags: ['weapon', 'burn'],
    cooldown: 6, damage: 45, effect: 'Deal damage and apply 3 Burn to enemy. When destroyed, explodes for 60 damage to all enemies.' },
  { name: 'Cannon', hero: 'vanessa', tier: 'silver', size: 'medium', tags: ['weapon'],
    cooldown: 5, damage: 35, effect: 'Deal damage. Gains +10 damage for each Ammo item you own.' },
  { name: 'Sniper Rifle', hero: 'vanessa', tier: 'gold', size: 'large', tags: ['weapon'],
    cooldown: 8, damage: 80, effect: 'Deal damage. 50% Crit Chance. Crits deal triple damage.' },
  { name: 'Incendiary Rounds', hero: 'vanessa', tier: 'bronze', size: 'small', tags: ['ammo'],
    effect: 'Passive: Your weapons apply +1 Burn on hit.' },
  { name: 'Lighthouse', hero: 'vanessa', tier: 'diamond', size: 'large', tags: ['burn'],
    cooldown: 10, damage: 20, effect: 'Deal damage for each stack of Burn on enemy. Apply 5 Burn.' },
  { name: 'Bayonet', hero: 'vanessa', tier: 'bronze', size: 'small', tags: ['weapon'],
    cooldown: 3, damage: 20, effect: 'Deal damage. When your weapon crits, this triggers.' },
  { name: 'Blunderbuss', hero: 'vanessa', tier: 'silver', size: 'medium', tags: ['weapon'],
    cooldown: 5, damage: 30, effect: 'Deal damage to all enemies. Gains +5 damage per Ammo.' },
  { name: 'Cutlass', hero: 'vanessa', tier: 'bronze', size: 'small', tags: ['weapon'],
    cooldown: 3, damage: 15, effect: 'Deal damage. If enemy is Burning, deal double damage.' },
  { name: 'Musket', hero: 'vanessa', tier: 'silver', size: 'medium', tags: ['weapon'],
    cooldown: 6, damage: 50, effect: 'Deal damage. 25% Crit Chance.' },
  { name: 'Gunpowder', hero: 'vanessa', tier: 'bronze', size: 'small', tags: ['ammo'],
    effect: 'Passive: Your weapons deal +5 damage.' },
  { name: 'Cannonball', hero: 'vanessa', tier: 'silver', size: 'small', tags: ['ammo'],
    effect: 'Passive: Your Cannons deal +15 damage and apply 1 Burn.' },
  { name: 'Double Barrel', hero: 'vanessa', tier: 'gold', size: 'medium', tags: ['weapon'],
    cooldown: 4, damage: 25, effect: 'Deal damage twice. Each shot can crit independently.' },
  { name: 'Rocket Launcher', hero: 'vanessa', tier: 'diamond', size: 'large', tags: ['weapon', 'burn'],
    cooldown: 10, damage: 100, effect: 'Deal massive damage and apply 5 Burn. Destroys a random enemy item.' },
  { name: 'Thermal Lance', hero: 'vanessa', tier: 'gold', size: 'large', tags: ['weapon', 'burn'],
    cooldown: 7, damage: 40, effect: 'Deal damage. Apply Burn equal to damage dealt divided by 10.' },
  { name: 'Railgun', hero: 'vanessa', tier: 'diamond', size: 'large', tags: ['weapon', 'tech'],
    cooldown: 12, damage: 150, effect: 'Deal massive damage. Ignores Shield. 100% Crit Chance.' },
  { name: 'Flamethrower', hero: 'vanessa', tier: 'silver', size: 'medium', tags: ['weapon', 'burn'],
    cooldown: 3, damage: 15, effect: 'Deal damage and apply 2 Burn. Triggers 3 times.' },

  // ========== PYGMALIEN ITEMS ==========
  { name: 'Business Card', hero: 'pygmalien', tier: 'bronze', size: 'small', tags: ['gold'],
    cooldown: 3, effect: 'Gain 5 Gold. When sold, gain 15 Gold.' },
  { name: 'Jabalian Drum', hero: 'pygmalien', tier: 'gold', size: 'medium', tags: ['shield', 'weapon'],
    cooldown: 6, shield: 30, effect: 'Gain Shield. Deal damage equal to your current Shield.' },
  { name: 'Showcase', hero: 'pygmalien', tier: 'silver', size: 'medium', tags: ['gold'],
    effect: 'Passive: At the start of each fight, gain 2 Gold for each item you own.' },
  { name: 'Landscraper', hero: 'pygmalien', tier: 'gold', size: 'large', tags: ['gold', 'weapon'],
    cooldown: 8, damage: 25, effect: 'Deal damage. Gain Gold equal to damage dealt.' },
  { name: 'Safe', hero: 'pygmalien', tier: 'silver', size: 'medium', tags: ['gold', 'shield'],
    cooldown: 5, shield: 20, effect: 'Gain Shield. Store 10 Gold. When destroyed, gain stored Gold.' },
  { name: 'Cash Cannon', hero: 'pygmalien', tier: 'gold', size: 'medium', tags: ['weapon', 'gold'],
    cooldown: 5, damage: 10, effect: 'Deal damage. Spend up to 20 Gold to deal that much extra damage.' },
  { name: 'ATM', hero: 'pygmalien', tier: 'silver', size: 'medium', tags: ['gold'],
    cooldown: 8, effect: 'Gain 15 Gold. At end of day, gain interest on your Gold (10%).' },
  { name: 'Bar of Gold', hero: 'pygmalien', tier: 'gold', size: 'medium', tags: ['gold'],
    effect: 'Passive: +50 Gold at start of run. Worth 100 Gold when sold.' },
  { name: 'Chunk of Gold', hero: 'pygmalien', tier: 'silver', size: 'small', tags: ['gold'],
    effect: 'Passive: +20 Gold at start of run. Worth 40 Gold when sold.' },
  { name: 'Bag of Jewels', hero: 'pygmalien', tier: 'gold', size: 'medium', tags: ['gold'],
    effect: 'Passive: Gain 5 Gold whenever you gain Shield.' },
  { name: 'Cash Register', hero: 'pygmalien', tier: 'silver', size: 'medium', tags: ['gold'],
    cooldown: 6, effect: 'Gain 3 Gold for each item that triggered this fight.' },
  { name: 'Briefcase', hero: 'pygmalien', tier: 'gold', size: 'medium', tags: ['gold', 'shield'],
    cooldown: 7, shield: 40, effect: 'Gain Shield. Gain 1 Gold for each 10 Shield you have.' },
  { name: 'Spiky Shield', hero: 'pygmalien', tier: 'silver', size: 'medium', tags: ['shield', 'weapon'],
    cooldown: 4, shield: 15, damage: 10, effect: 'Gain Shield. Deal damage to attacker when hit.' },
  { name: 'Force Field', hero: 'pygmalien', tier: 'diamond', size: 'large', tags: ['shield'],
    cooldown: 10, shield: 100, effect: 'Gain massive Shield. Shield does not decay this fight.' },

  // ========== DOOLEY ITEMS ==========
  { name: 'Combat Core', hero: 'dooley', tier: 'silver', size: 'medium', tags: ['core', 'weapon'],
    cooldown: 5, damage: 30, effect: 'Deal damage. Core: Gains +5 damage each time it triggers.' },
  { name: 'Critical Core', hero: 'dooley', tier: 'gold', size: 'medium', tags: ['core', 'crit'],
    effect: 'Passive: +25% Crit Chance. Core: Crits deal +50% damage.' },
  { name: 'Companion Core', hero: 'dooley', tier: 'silver', size: 'medium', tags: ['core'],
    cooldown: 6, effect: 'Summon a drone that deals 15 damage per second. Core: Drone lasts longer.' },
  { name: 'Armored Core', hero: 'dooley', tier: 'silver', size: 'medium', tags: ['core', 'shield'],
    cooldown: 5, shield: 25, effect: 'Gain Shield. Core: +10 Max Health.' },
  { name: 'Fiber Optics', hero: 'dooley', tier: 'silver', size: 'small', tags: ['tech'],
    effect: 'Passive: Your Tech items have -1 second cooldown.' },
  { name: 'Dooltron', hero: 'dooley', tier: 'gold', size: 'large', tags: ['tech', 'weapon'],
    cooldown: 8, damage: 60, effect: 'Deal damage. Gains +10 damage for each Core you own.' },
  { name: 'Dooltron Mainframe', hero: 'dooley', tier: 'legendary', size: 'large', tags: ['tech', 'core'],
    cooldown: 10, damage: 80, effect: 'Deal damage. All Cores trigger when this triggers. Gains stats from all Cores.' },
  { name: 'GPU', hero: 'dooley', tier: 'silver', size: 'small', tags: ['tech'],
    effect: 'Passive: Your Tech items deal +10 damage.' },
  { name: 'Memory Card', hero: 'dooley', tier: 'bronze', size: 'small', tags: ['tech'],
    effect: 'Passive: At start of fight, reduce all cooldowns by 1 second.' },
  { name: 'Battery', hero: 'dooley', tier: 'bronze', size: 'small', tags: ['tech'],
    cooldown: 4, effect: 'Reduce the cooldown of a random Tech item by 2 seconds.' },
  { name: 'Capacitor', hero: 'dooley', tier: 'silver', size: 'small', tags: ['tech'],
    effect: 'Passive: When a Tech item triggers, 25% chance to trigger again.' },
  { name: 'Motherboard', hero: 'dooley', tier: 'gold', size: 'large', tags: ['tech'],
    effect: 'Passive: All Tech items have +1 trigger. Your Cores count as Tech.' },
  { name: 'Monitor Lizard', hero: 'dooley', tier: 'gold', size: 'medium', tags: ['tech', 'weapon'],
    cooldown: 5, damage: 25, effect: 'Deal damage. If you have 3+ Tech items, deal double damage.' },
  { name: 'Cool LEDs', hero: 'dooley', tier: 'bronze', size: 'small', tags: ['tech'],
    effect: 'Passive: Your Tech items have +10% Crit Chance.' },
  { name: 'Charging Station', hero: 'dooley', tier: 'silver', size: 'medium', tags: ['tech', 'heal'],
    cooldown: 6, heal: 20, effect: 'Heal. Heals +5 for each Tech item you own.' },
  { name: '3D Printer', hero: 'dooley', tier: 'gold', size: 'large', tags: ['tech'],
    cooldown: 15, effect: 'Create a copy of a random Tech item you own. Once per fight.' },

  // ========== MAK ITEMS ==========
  { name: 'Peacewrought', hero: 'mak', tier: 'legendary', size: 'large', tags: ['weapon', 'regen'],
    cooldown: 7, damage: 60, effect: 'Deal damage. Destroy item to left, gain Regen equal to its tier. Heal for Regen.' },
  { name: 'Poppy Field', hero: 'mak', tier: 'gold', size: 'large', tags: ['weapon', 'poison'],
    cooldown: 6, damage: 35, effect: 'When your weapons deal damage, apply Poison. When you apply Poison, charge your weapons.' },
  { name: 'Spider Mace', hero: 'mak', tier: 'silver', size: 'small', tags: ['weapon', 'slow', 'poison'],
    cooldown: 4, damage: 25, effect: 'Deal damage and apply Slow. Charges when you apply Slow or Poison.' },
  { name: 'Magnus Femur', hero: 'mak', tier: 'legendary', size: 'large', tags: ['weapon', 'slow'],
    cooldown: 8, damage: 40, effect: 'Deal damage. Gains +5 damage per Slow stack on enemy. Self-charges via Slow.' },
  { name: 'Staff of the Moose', hero: 'mak', tier: 'diamond', size: 'large', tags: ['regen', 'heal'],
    effect: 'Passive: Double your Regen. When adjacent weapon deals damage, heal for your Regen.' },
  { name: 'Runic Potion', hero: 'mak', tier: 'silver', size: 'small', tags: ['potion', 'weapon'],
    cooldown: 5, effect: 'Enchant adjacent weapon with a random buff. Weapon gains +15 damage.' },
  { name: 'Floor Spike', hero: 'mak', tier: 'bronze', size: 'small', tags: ['weapon', 'slow'],
    cooldown: 3, damage: 15, effect: 'Deal damage and apply 1 Slow.' },
  { name: 'Barbed Claws', hero: 'mak', tier: 'gold', size: 'medium', tags: ['weapon', 'regen'],
    cooldown: 5, damage: 20, effect: 'Deal damage. Deal bonus damage equal to your Regen.' },
  { name: 'Incense', hero: 'mak', tier: 'bronze', size: 'small', tags: ['slow', 'burn'],
    cooldown: 3, effect: 'Apply 2 Slow and 1 Burn to enemy.' },
  { name: 'Vial Launcher', hero: 'mak', tier: 'silver', size: 'medium', tags: ['potion', 'weapon'],
    cooldown: 5, damage: 20, effect: 'Deal damage. When you use a Potion, deal 15 bonus damage.' },
  { name: 'Alembic', hero: 'mak', tier: 'silver', size: 'medium', tags: ['potion'],
    cooldown: 8, effect: 'Double the effect of your next Potion.' },
  { name: 'Cauldron', hero: 'mak', tier: 'gold', size: 'large', tags: ['potion'],
    cooldown: 10, effect: 'Create a random Potion. Potions you create are enhanced.' },
  { name: 'Apothecary', hero: 'mak', tier: 'diamond', size: 'large', tags: ['potion'],
    effect: 'Passive: Your Potions trigger twice. Start each fight with a random Potion effect.' },
  { name: 'Laboratory', hero: 'mak', tier: 'gold', size: 'large', tags: ['potion'],
    effect: 'Passive: At start of day, create 2 random Potions in your inventory.' },
  { name: 'Regeneration Potion', hero: 'mak', tier: 'silver', size: 'small', tags: ['potion', 'heal'],
    cooldown: 5, heal: 10, effect: 'Heal. Heal 5 more each second for 3 seconds.' },
  { name: 'Energy Potion', hero: 'mak', tier: 'silver', size: 'small', tags: ['potion', 'haste'],
    cooldown: 4, effect: 'Gain 2 Haste. Reduce all cooldowns by 1 second.' },
  { name: 'Foul Mushroom', hero: 'mak', tier: 'bronze', size: 'small', tags: ['poison'],
    cooldown: 3, effect: 'Apply 3 Poison to enemy.' },
  { name: 'Aludel', hero: 'mak', tier: 'silver', size: 'small', tags: ['catalyst'],
    cooldown: 4, effect: 'Create a Catalyst. Catalysts can be destroyed by Peacewrought for Regen.' },
  { name: 'Library', hero: 'mak', tier: 'gold', size: 'large', tags: ['potion'],
    effect: 'Passive: At start of fight, create a random Potion. Your Potions cost 0.' },

  // ========== STELLE ITEMS ==========
  { name: 'Lightning Rod', hero: 'stelle', tier: 'gold', size: 'medium', tags: ['weapon', 'electric'],
    cooldown: 5, damage: 30, effect: 'Deal damage. Chain to another enemy for 50% damage. More vehicles = more chains.' },
  { name: 'Space Laser', hero: 'stelle', tier: 'diamond', size: 'large', tags: ['weapon', 'tech'],
    cooldown: 10, damage: 100, effect: 'Deal massive damage. Ignores Shield. Burns target for 5.' },
  { name: 'Stellar Swallowtail', hero: 'stelle', tier: 'legendary', size: 'large', tags: ['vehicle', 'flying'],
    cooldown: 6, damage: 45, effect: 'Deal damage. Gain Flying. While Flying, your vehicles deal +20% damage.' },
  { name: 'Skyliner', hero: 'stelle', tier: 'gold', size: 'large', tags: ['vehicle', 'flying'],
    cooldown: 7, damage: 40, effect: 'Deal damage. When you gain Flying, trigger all Flying vehicles.' },
  { name: 'Caracara', hero: 'stelle', tier: 'silver', size: 'small', tags: ['vehicle', 'flying'],
    cooldown: 3, damage: 20, effect: 'Deal damage. Fast opener. Gains Haste when you gain Flying.' },
  { name: 'Aerial Turret', hero: 'stelle', tier: 'silver', size: 'medium', tags: ['weapon', 'flying'],
    cooldown: 4, damage: 25, effect: 'Deal damage. Flying: Gains +10 damage.' },
  { name: 'Gyro Gunsight', hero: 'stelle', tier: 'gold', size: 'medium', tags: ['weapon', 'crit'],
    cooldown: 5, damage: 35, effect: 'Deal damage. +25% Crit Chance. Flying: +50% Crit Chance.' },
  { name: 'Headset', hero: 'stelle', tier: 'bronze', size: 'small', tags: ['tech'],
    effect: 'Passive: When you gain Flying, kickstart all items by 1 second.' },
  { name: 'Clockwork Disc', hero: 'stelle', tier: 'gold', size: 'medium', tags: ['weapon', 'scaling'],
    cooldown: 6, damage: 25, effect: 'Deal damage. Gains +5 permanent damage each time it triggers.' },
  { name: 'Ornithopter', hero: 'stelle', tier: 'silver', size: 'medium', tags: ['vehicle', 'flying'],
    cooldown: 5, damage: 25, effect: 'Deal damage. Flying: Cannot be targeted by melee weapons.' },
  { name: 'Balloon Bot', hero: 'stelle', tier: 'bronze', size: 'small', tags: ['vehicle', 'flying'],
    cooldown: 4, damage: 15, effect: 'Deal damage. Flying: Takes no damage from ground effects.' },
  { name: 'Angry Balloon Bot', hero: 'stelle', tier: 'silver', size: 'medium', tags: ['vehicle', 'flying'],
    cooldown: 5, damage: 30, effect: 'Deal damage. When destroyed, deal 40 damage to enemy.' },
  { name: 'Battle Balloon', hero: 'stelle', tier: 'gold', size: 'large', tags: ['vehicle', 'flying'],
    cooldown: 7, damage: 50, effect: 'Deal damage to all enemies. Flying: Immune to Burn.' },

  // ========== JULES ITEMS ==========
  { name: 'Hot Box', hero: 'jules', tier: 'gold', size: 'medium', tags: ['food', 'burn'],
    cooldown: 5, damage: 30, effect: 'Deal damage and apply Burn. Heated: Deal double Burn.' },
  { name: 'Imu', hero: 'jules', tier: 'diamond', size: 'large', tags: ['food', 'burn'],
    cooldown: 8, damage: 50, effect: 'Deal damage. Apply Burn equal to your Heated stacks.' },
  { name: 'Giant Lollipop', hero: 'jules', tier: 'legendary', size: 'large', tags: ['food', 'heal'],
    cooldown: 7, heal: 40, effect: 'Heal. When Heated, heal double. Gain 1 Heated.' },
  { name: 'Freezer', hero: 'jules', tier: 'gold', size: 'large', tags: ['tool', 'chill'],
    cooldown: 6, effect: 'Apply 3 Chill to enemy. Your Chilled items deal +20% damage.' },
  { name: 'Stove', hero: 'jules', tier: 'bronze', size: 'small', tags: ['tool', 'heat'],
    effect: 'Socket: Items in this socket become Heated. Heated items deal Burn.' },
  { name: 'Cooler', hero: 'jules', tier: 'bronze', size: 'small', tags: ['tool', 'chill'],
    effect: 'Socket: Items in this socket become Chilled. Chilled items apply Slow.' },
  { name: 'Grill', hero: 'jules', tier: 'silver', size: 'medium', tags: ['food', 'burn'],
    cooldown: 4, damage: 20, effect: 'Deal damage. Apply 2 Burn. Heated: Apply 4 Burn.' },
  { name: 'Feast', hero: 'jules', tier: 'gold', size: 'large', tags: ['food', 'heal'],
    cooldown: 8, heal: 30, effect: 'Heal. Trigger all Food items.' },
  { name: 'Gingerbread House', hero: 'jules', tier: 'gold', size: 'large', tags: ['food', 'shield'],
    cooldown: 7, shield: 40, effect: 'Gain Shield. Create a random Food item.' },
  { name: 'Dishwasher', hero: 'jules', tier: 'silver', size: 'medium', tags: ['tool'],
    cooldown: 6, effect: 'Reset the cooldown of all Food items. Clean foods are enhanced.' },
  { name: 'Spices', hero: 'jules', tier: 'bronze', size: 'small', tags: ['food'],
    effect: 'Passive: Your Food items heal +5 more.' },
  { name: 'Curry', hero: 'jules', tier: 'silver', size: 'medium', tags: ['food', 'burn'],
    cooldown: 5, heal: 15, effect: 'Heal. Apply 3 Burn to enemy. Cooked: Heal 25, apply 5 Burn.' },
  { name: 'Chocolate Bar', hero: 'jules', tier: 'bronze', size: 'small', tags: ['food'],
    cooldown: 3, heal: 10, effect: 'Heal. Gain 1 Haste.' },
  { name: 'Truffles', hero: 'jules', tier: 'gold', size: 'small', tags: ['food'],
    cooldown: 6, heal: 30, effect: 'Heal. Gain 10 Gold. One of the most valuable foods.' },
  { name: 'Butter', hero: 'jules', tier: 'bronze', size: 'small', tags: ['food'],
    effect: 'Passive: Your Food cooldowns are reduced by 1 second.' },

  // ========== COMMON/NEUTRAL ITEMS ==========
  { name: 'Bandages', hero: 'common', tier: 'bronze', size: 'small', tags: ['heal'],
    cooldown: 4, heal: 15, effect: 'Heal. Simple but reliable healing.' },
  { name: 'Brick Buddy', hero: 'common', tier: 'bronze', size: 'small', tags: ['shield'],
    cooldown: 3, shield: 10, effect: 'Gain Shield. Your most loyal companion.' },
  { name: 'Duct Tape', hero: 'common', tier: 'bronze', size: 'small', tags: ['utility'],
    effect: 'Passive: Prevent the next item destruction. Consumed when triggered.' },
  { name: 'Bootstraps', hero: 'common', tier: 'bronze', size: 'small', tags: ['haste'],
    effect: 'Passive: +1 Haste at start of fight.' },
  { name: 'Belt', hero: 'common', tier: 'bronze', size: 'small', tags: ['utility'],
    effect: 'Passive: +1 item slot.' },
  { name: 'Claws', hero: 'common', tier: 'bronze', size: 'small', tags: ['weapon'],
    cooldown: 2, damage: 10, effect: 'Deal damage. Fast but weak.' },
  { name: 'Brass Knuckles', hero: 'common', tier: 'bronze', size: 'small', tags: ['weapon'],
    cooldown: 3, damage: 15, effect: 'Deal damage. 10% Crit Chance.' },
  { name: 'Boomerang', hero: 'common', tier: 'silver', size: 'small', tags: ['weapon'],
    cooldown: 4, damage: 20, effect: 'Deal damage. Returns to deal 10 damage again.' },
  { name: 'Slingshot', hero: 'common', tier: 'bronze', size: 'small', tags: ['weapon'],
    cooldown: 3, damage: 12, effect: 'Deal damage. Cheap and cheerful.' },
  { name: 'Ballista', hero: 'common', tier: 'gold', size: 'large', tags: ['weapon'],
    cooldown: 8, damage: 70, effect: 'Deal massive damage. Pierces Shield.' },
  { name: 'Arbalest', hero: 'common', tier: 'silver', size: 'medium', tags: ['weapon'],
    cooldown: 6, damage: 45, effect: 'Deal damage. 20% Crit Chance.' },
  { name: 'Trebuchet', hero: 'common', tier: 'gold', size: 'large', tags: ['weapon'],
    cooldown: 10, damage: 90, effect: 'Deal damage. Destroys enemy Shield before dealing damage.' },

  // ========== ECONOMY ITEMS ==========
  { name: 'Abacus', hero: 'common', tier: 'silver', size: 'small', tags: ['gold'],
    effect: 'Passive: Gain 1 Gold whenever an item triggers.' },
  { name: 'Astrolabe', hero: 'common', tier: 'gold', size: 'medium', tags: ['utility'],
    effect: 'Passive: See 1 extra item in shops. Items cost 10% less.' },
  { name: 'Loupe', hero: 'common', tier: 'silver', size: 'small', tags: ['utility'],
    effect: 'Passive: See item stats before purchasing.' },
  { name: 'Pearl', hero: 'common', tier: 'silver', size: 'small', tags: ['gold'],
    effect: 'Passive: Worth 30 Gold when sold. Gains +5 sell value each day.' },
  { name: 'Emerald', hero: 'common', tier: 'gold', size: 'small', tags: ['gold'],
    effect: 'Passive: Worth 60 Gold when sold. Gains +10 sell value each day.' },
  { name: 'Amber', hero: 'common', tier: 'silver', size: 'small', tags: ['gold', 'utility'],
    effect: 'Passive: When you sell an item, gain 20% extra Gold.' },

  // ========== DEFENSE ITEMS ==========
  { name: 'Bunker', hero: 'common', tier: 'gold', size: 'large', tags: ['shield'],
    cooldown: 8, shield: 60, effect: 'Gain massive Shield. Adjacent items take 50% less damage.' },
  { name: 'Fort', hero: 'common', tier: 'diamond', size: 'large', tags: ['shield'],
    cooldown: 10, shield: 100, effect: 'Gain massive Shield. All items take 25% less damage.' },

  // ========== TECH WEAPONS ==========
  { name: 'Laser Pistol', hero: 'common', tier: 'silver', size: 'small', tags: ['weapon', 'tech'],
    cooldown: 3, damage: 18, effect: 'Deal damage. Tech: Gains +2 damage each trigger.' },
  { name: 'Arc Blaster', hero: 'common', tier: 'gold', size: 'medium', tags: ['weapon', 'tech'],
    cooldown: 5, damage: 35, effect: 'Deal damage. Chains to hit 2 additional enemies for half damage.' },
  { name: 'Omega Ray', hero: 'common', tier: 'diamond', size: 'large', tags: ['weapon', 'tech'],
    cooldown: 12, damage: 120, effect: 'Deal massive damage. Ignores all damage reduction.' },
  { name: 'Alpha Ray', hero: 'common', tier: 'gold', size: 'medium', tags: ['weapon', 'tech'],
    cooldown: 6, damage: 50, effect: 'Deal damage. First hit each fight deals double.' },
  { name: 'Beta Ray', hero: 'common', tier: 'silver', size: 'medium', tags: ['weapon', 'tech'],
    cooldown: 5, damage: 30, effect: 'Deal damage. Gains +5 damage for each Tech item.' },

  // ========== MELEE WEAPONS ==========
  { name: 'Katana', hero: 'common', tier: 'gold', size: 'medium', tags: ['weapon'],
    cooldown: 4, damage: 40, effect: 'Deal damage. 30% Crit Chance. Crits apply Bleed.' },
  { name: 'Cleaver', hero: 'common', tier: 'silver', size: 'medium', tags: ['weapon'],
    cooldown: 5, damage: 35, effect: 'Deal damage. Deals +20 damage to enemies below 50% health.' },
  { name: 'Handaxe', hero: 'common', tier: 'bronze', size: 'small', tags: ['weapon'],
    cooldown: 3, damage: 18, effect: 'Deal damage. Can be thrown for +10 damage (destroys item).' },

  // ========== VEHICLE/NAUTICAL ==========
  { name: 'Crane', hero: 'common', tier: 'silver', size: 'large', tags: ['vehicle'],
    cooldown: 8, effect: 'Move an item to a different slot. That item triggers immediately.' },
  { name: 'Submarine', hero: 'common', tier: 'gold', size: 'large', tags: ['vehicle'],
    cooldown: 10, damage: 60, effect: 'Deal damage. Submerge: Untargetable for 3 seconds after triggering.' },
  { name: 'Torpedo', hero: 'common', tier: 'silver', size: 'medium', tags: ['weapon'],
    cooldown: 7, damage: 55, effect: 'Deal damage. If enemy has Shield, deal double damage.' },
  { name: 'Anchor', hero: 'common', tier: 'silver', size: 'medium', tags: ['weapon', 'slow'],
    cooldown: 6, damage: 30, effect: 'Deal damage. Slow enemy items by 1 second.' },
  { name: 'Fishing Net', hero: 'common', tier: 'bronze', size: 'small', tags: ['utility', 'slow'],
    cooldown: 5, effect: 'Slow a random enemy item by 2 seconds.' },
  { name: 'Harpoon', hero: 'common', tier: 'silver', size: 'medium', tags: ['weapon'],
    cooldown: 5, damage: 35, effect: 'Deal damage. Pull the target item 1 slot closer.' },
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

  grid.innerHTML = filtered.map((item, idx) => `
    <div class="item-card" data-item-idx="${idx}" data-item-name="${item.name}">
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

  // Attach tooltip handlers
  attachItemTooltips();
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
    <div class="guide-card tier-${guide.tier}${hasDeepDive(guide.id) ? ' has-deep-dive' : ''}" data-guide-id="${guide.id}">
      <div class="guide-card-header">
        <span class="guide-tier-badge tier-${guide.tier}">${guide.tier.toUpperCase()}</span>
        <span class="guide-hero-badge hero-${guide.hero.slice(0,3)}">${capitalize(guide.hero)}</span>
        ${hasDeepDive(guide.id) ? '<span class="deep-dive-badge">DEEP DIVE</span>' : ''}
      </div>
      <div class="guide-card-name">${guide.name}</div>
      <div class="guide-card-overview">${guide.overview.slice(0, 100)}...</div>
      <div class="guide-card-footer">
        <span class="guide-core-count">${guide.coreItems.length} core items</span>
        <span class="guide-view-btn">${hasDeepDive(guide.id) ? 'Explore Mastery →' : 'View Guide →'}</span>
      </div>
    </div>
  `).join('');

  // Add click handlers
  grid.querySelectorAll('.guide-card').forEach(card => {
    card.addEventListener('click', () => {
      const guideId = card.dataset.guideId;
      if (hasDeepDive(guideId)) {
        showPeacewroughtDeepDive();
      } else {
        showGuideDetail(guideId);
      }
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
  const filledCount = guide.boardLayout.filter(s => s.filled).length;
  const totalCount = guide.boardLayout.length;

  boardContainer.innerHTML = `
    <div class="board-slots">
      ${guide.boardLayout.map(slot => `
        <div class="board-slot size-${slot.size} ${slot.filled ? 'filled' : ''}">
          <span class="slot-name">${slot.name}</span>
          <span class="slot-size">${slot.size}</span>
        </div>
      `).join('')}
    </div>
    <div class="board-legend">
      <span><div class="legend-filled"></div> Filled (${filledCount})</span>
      <span><div class="legend-empty"></div> Empty (${totalCount - filledCount})</span>
    </div>
    <div class="board-note">Board slots: ${filledCount}/${totalCount} filled</div>
  `;

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
  const deepDive = document.getElementById('peacewroughtDeepDive');
  if (grid) grid.style.display = '';
  if (detail) detail.classList.remove('active');
  if (deepDive) deepDive.classList.remove('active');
  state.currentGuide = null;
};

// ==========================================
// PEACEWROUGHT DEEP DIVE
// ==========================================

// Show/hide the Peacewrought deep dive guide
function showPeacewroughtDeepDive() {
  const grid = document.getElementById('guidesGrid');
  const detail = document.getElementById('guideDetail');
  const deepDive = document.getElementById('peacewroughtDeepDive');

  if (grid) grid.style.display = 'none';
  if (detail) detail.classList.remove('active');
  if (deepDive) deepDive.classList.add('active');
}

function hidePeacewroughtDeepDive() {
  const grid = document.getElementById('guidesGrid');
  const deepDive = document.getElementById('peacewroughtDeepDive');

  if (grid) grid.style.display = '';
  if (deepDive) deepDive.classList.remove('active');
}

// Back from deep dive button
document.getElementById('backFromDeepDive')?.addEventListener('click', hidePeacewroughtDeepDive);

// Check if a guide has a deep dive available
function hasDeepDive(guideId) {
  return guideId === 'mak-peacewrought';
}

// Guide filter listeners
document.getElementById('guideHeroFilter')?.addEventListener('change', renderGuidesGrid);
document.getElementById('guideTierFilter')?.addEventListener('change', renderGuidesGrid);

// Back button
document.getElementById('backToGuides')?.addEventListener('click', backToGuides);

// ==========================================
// PATCH NOTES TAB
// ==========================================

// Patch data with meta impact predictions
const patchData = {
  '8.0': {
    version: '8.0',
    date: '2024-12-01',
    metaImpacts: [
      {
        title: 'Burn Vanessa Rising',
        trend: 'up',
        reason: 'Powder Keg damage buff (+15) combined with Fuse CDR reduction makes burn builds significantly stronger in early game.',
        hero: 'Vanessa',
        type: 'rising'
      },
      {
        title: 'Shield Pygmalien Falling',
        trend: 'down',
        reason: 'Safe nerf (-20 shield) and Spiky Shield rework reduces passive shield stacking viability.',
        hero: 'Pygmalien',
        type: 'falling'
      },
      {
        title: 'Tech Dooley Stable',
        trend: 'stable',
        reason: 'Core item adjustments balanced out - GPU buff offset by Motherboard nerf.',
        hero: 'Dooley',
        type: 'stable'
      },
      {
        title: 'Potion Mak Emerging',
        trend: 'new',
        reason: 'New Vial Launcher item enables hybrid potion/damage builds previously not viable.',
        hero: 'Mak',
        type: 'new'
      }
    ],
    winners: [
      { name: 'Powder Keg', change: '+15 damage' },
      { name: 'Fuse', change: '-0.5s cooldown' },
      { name: 'GPU', change: '+10% crit' },
      { name: 'Vial Launcher', change: 'NEW ITEM' },
      { name: 'Katana', change: '+5 damage' }
    ],
    losers: [
      { name: 'Safe', change: '-20 shield' },
      { name: 'Motherboard', change: '-5% CDR' },
      { name: 'Spiky Shield', change: 'Reworked' },
      { name: 'Tower Shield', change: '-15 shield' },
      { name: 'ATM', change: '-10 gold/trigger' }
    ],
    changes: [
      {
        name: 'Powder Keg',
        hero: 'Vanessa',
        type: 'buff',
        description: 'Base damage increased',
        oldValue: '45 damage',
        newValue: '60 damage',
        metaImpact: 'Core burn item now viable in Day 1-3. Expect more aggressive Vanessa openings.'
      },
      {
        name: 'Fuse',
        hero: 'Vanessa',
        type: 'buff',
        description: 'Cooldown reduced',
        oldValue: '4.0s cooldown',
        newValue: '3.5s cooldown',
        metaImpact: 'Faster Burn application synergizes with Powder Keg buff. Burn Vanessa top tier.'
      },
      {
        name: 'Cannon',
        hero: 'Vanessa',
        type: 'nerf',
        description: 'Slow effect reduced',
        oldValue: '30% slow',
        newValue: '20% slow',
        metaImpact: 'Control builds slightly weaker. Direct damage still viable.'
      },
      {
        name: 'Safe',
        hero: 'Pygmalien',
        type: 'nerf',
        description: 'Shield value decreased',
        oldValue: '80 shield',
        newValue: '60 shield',
        metaImpact: 'Shield stacking less oppressive. Forces more active play from Pygmalien.'
      },
      {
        name: 'Spiky Shield',
        hero: 'Pygmalien',
        type: 'rework',
        description: 'Now reflects damage instead of flat thorns',
        oldValue: '10 thorns damage',
        newValue: '15% damage reflection',
        metaImpact: 'Scales better late game but weaker early. Build order matters more.'
      },
      {
        name: 'GPU',
        hero: 'Dooley',
        type: 'buff',
        description: 'Crit chance increased',
        oldValue: '15% crit',
        newValue: '25% crit',
        metaImpact: 'Crit Dooley builds more consistent. GPU now must-pick in tech builds.'
      },
      {
        name: 'Motherboard',
        hero: 'Dooley',
        type: 'nerf',
        description: 'CDR bonus reduced',
        oldValue: '15% CDR',
        newValue: '10% CDR',
        metaImpact: 'Still core but less dominant. Opens space for alternative tech paths.'
      },
      {
        name: 'Vial Launcher',
        hero: 'Mak',
        type: 'new',
        description: 'New item: Throws potions at enemies dealing damage and applying effects',
        oldValue: null,
        newValue: '25 damage + potion effect',
        metaImpact: 'Enables aggressive Mak builds. Potion effects now offensive option.'
      },
      {
        name: 'Health Potion',
        hero: 'Mak',
        type: 'buff',
        description: 'Heal amount increased',
        oldValue: '30 heal',
        newValue: '40 heal',
        metaImpact: 'Sustain Mak stronger. Better survival in long fights.'
      },
      {
        name: 'Katana',
        hero: 'Common',
        type: 'buff',
        description: 'Base damage increased',
        oldValue: '20 damage',
        newValue: '25 damage',
        metaImpact: 'Universal buff to weapon builds. Good early pickup for any hero.'
      },
      {
        name: 'Tower Shield',
        hero: 'Common',
        type: 'nerf',
        description: 'Shield value reduced',
        oldValue: '50 shield',
        newValue: '35 shield',
        metaImpact: 'Defensive items across the board weaker. Meta shifting towards aggression.'
      },
      {
        name: 'ATM',
        hero: 'Pygmalien',
        type: 'nerf',
        description: 'Gold generation reduced',
        oldValue: '25 gold/trigger',
        newValue: '15 gold/trigger',
        metaImpact: 'Economy Pygmalien slower to scale. More balanced power curve.'
      }
    ]
  },
  '7.5': {
    version: '7.5',
    date: '2024-11-15',
    metaImpacts: [
      {
        title: 'Shield Meta Dominant',
        trend: 'up',
        reason: 'Pre-nerf Safe and Tower Shield made defensive builds extremely strong.',
        hero: 'Pygmalien',
        type: 'rising'
      },
      {
        title: 'Burn Vanessa Weak',
        trend: 'down',
        reason: 'Burn items undertuned compared to shield counterplay.',
        hero: 'Vanessa',
        type: 'falling'
      }
    ],
    winners: [
      { name: 'Safe', change: 'Dominant' },
      { name: 'Tower Shield', change: 'Core defensive' },
      { name: 'ATM', change: 'Strong econ' }
    ],
    losers: [
      { name: 'Powder Keg', change: 'Undertuned' },
      { name: 'Fuse', change: 'Too slow' }
    ],
    changes: [
      {
        name: 'Safe',
        hero: 'Pygmalien',
        type: 'buff',
        description: 'Shield value was very high this patch',
        oldValue: '60 shield',
        newValue: '80 shield',
        metaImpact: 'Defined the shield meta. Every Pygmalien ran this.'
      }
    ]
  },
  '7.0': {
    version: '7.0',
    date: '2024-11-01',
    metaImpacts: [
      {
        title: 'Launch Balance',
        trend: 'stable',
        reason: 'Initial release balance - all heroes viable with different strengths.',
        hero: 'All',
        type: 'stable'
      }
    ],
    winners: [
      { name: 'Core Items', change: 'Baseline' }
    ],
    losers: [],
    changes: [
      {
        name: 'Game Launch',
        hero: 'All',
        type: 'new',
        description: 'Initial release with all base heroes and items',
        oldValue: null,
        newValue: 'Launch state',
        metaImpact: 'Starting point for all future balance.'
      }
    ]
  }
};

let currentPatchVersion = '8.0';
let currentPatchFilter = 'all';

function renderPatchNotes() {
  const patch = patchData[currentPatchVersion];
  if (!patch) return;

  // Update badge
  const badge = document.getElementById('currentPatchBadge');
  if (badge) badge.textContent = patch.version;

  // Render meta impact cards
  renderMetaImpacts(patch.metaImpacts);

  // Render winners/losers
  renderWinnersLosers(patch.winners, patch.losers);

  // Render detailed changes
  renderPatchChanges(patch.changes);
}

function renderMetaImpacts(impacts) {
  const container = document.getElementById('metaImpactCards');
  if (!container) return;

  container.innerHTML = impacts.map(impact => `
    <div class="impact-card ${impact.type}">
      <div class="impact-header">
        <span class="impact-title">${impact.title}</span>
        <span class="impact-trend ${impact.trend}">${getTrendIcon(impact.trend)} ${impact.trend.toUpperCase()}</span>
      </div>
      <p class="impact-reason">${impact.reason}</p>
      <span class="impact-hero">${impact.hero}</span>
    </div>
  `).join('');
}

function getTrendIcon(trend) {
  switch(trend) {
    case 'up': return '↑';
    case 'down': return '↓';
    case 'stable': return '→';
    case 'new': return '★';
    default: return '';
  }
}

function renderWinnersLosers(winners, losers) {
  const winnersContainer = document.getElementById('patchWinners');
  const losersContainer = document.getElementById('patchLosers');

  if (winnersContainer) {
    winnersContainer.innerHTML = winners.length ? winners.map(w => `
      <div class="winner-item">
        <span class="item-name">${w.name}</span>
        <span class="change-value">${w.change}</span>
      </div>
    `).join('') : '<p class="empty-state">No major winners</p>';
  }

  if (losersContainer) {
    losersContainer.innerHTML = losers.length ? losers.map(l => `
      <div class="loser-item">
        <span class="item-name">${l.name}</span>
        <span class="change-value">${l.change}</span>
      </div>
    `).join('') : '<p class="empty-state">No major nerfs</p>';
  }
}

function renderPatchChanges(changes) {
  const container = document.getElementById('patchChanges');
  if (!container) return;

  // Filter changes
  let filtered = changes;
  if (currentPatchFilter !== 'all') {
    filtered = changes.filter(c => {
      if (currentPatchFilter === 'buffs') return c.type === 'buff';
      if (currentPatchFilter === 'nerfs') return c.type === 'nerf';
      if (currentPatchFilter === 'reworks') return c.type === 'rework';
      if (currentPatchFilter === 'new') return c.type === 'new';
      return true;
    });
  }

  // Group by hero
  const grouped = {};
  filtered.forEach(change => {
    if (!grouped[change.hero]) grouped[change.hero] = [];
    grouped[change.hero].push(change);
  });

  if (Object.keys(grouped).length === 0) {
    container.innerHTML = '<p class="empty-state">No changes match this filter</p>';
    return;
  }

  container.innerHTML = Object.entries(grouped).map(([hero, heroChanges]) => `
    <div class="change-section">
      <div class="change-section-header">
        <h4>${hero}</h4>
        <span class="change-count">${heroChanges.length} change${heroChanges.length !== 1 ? 's' : ''}</span>
      </div>
      ${heroChanges.map(change => `
        <div class="change-item ${change.type}">
          <div class="change-header">
            <span class="change-name">${change.name}</span>
            <span class="change-type ${change.type}">${change.type}</span>
          </div>
          <p class="change-details">${change.description}</p>
          ${change.oldValue ? `<div class="change-old">${change.oldValue}</div>` : ''}
          ${change.newValue ? `<div class="change-new">${change.newValue}</div>` : ''}
          ${change.metaImpact ? `<div class="change-meta-impact">${change.metaImpact}</div>` : ''}
        </div>
      `).join('')}
    </div>
  `).join('');
}

// Patch category filter
document.querySelectorAll('.patch-category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.patch-category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPatchFilter = btn.dataset.category;
    renderPatchNotes();
  });
});

// Patch version selector
document.getElementById('patchVersionSelect')?.addEventListener('change', (e) => {
  currentPatchVersion = e.target.value;
  renderPatchNotes();
});

// Refresh button
document.getElementById('refreshPatchBtn')?.addEventListener('click', () => {
  renderPatchNotes();
});

// Initialize patch notes when tab is shown
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.tab === 'patch') {
      renderPatchNotes();
    }
  });
});

// ==========================================
// INIT
// ==========================================

// ==========================================
// HEROES TAB - DATA & FUNCTIONALITY
// ==========================================

const heroData = {
  vanessa: {
    id: 'vanessa',
    name: 'Vanessa',
    style: 'Aggression & Damage',
    difficulty: 'Beginner',
    portrait: 'assets/heroes/vanessa.jpg',
    description: 'A gunslinger pirate captain who excels at dealing damage through weapons and burn effects. The most versatile hero with many viable build paths from aggro to burn to control.',
    playstyle: 'Vanessa is the quintessential aggressive hero. She wants to deal damage fast and often, leveraging weapons, ammo synergies, and burn effects. Most of her builds revolve around stacking damage multipliers through Crit, CDR, and burn scaling. She has excellent early game tempo and can pivot between several win conditions depending on what items she finds.',
    strengths: [
      'Strong early game tempo',
      'Multiple viable build paths',
      'Great damage scaling with Crit',
      'Burn effects bypass some defenses',
      'Good synergy between items'
    ],
    weaknesses: [
      'Can be countered by heavy shields',
      'Burn builds need setup time',
      'Some builds require specific items',
      'Less sustain than other heroes'
    ],
    stats: [
      { name: 'CDR', desc: 'More weapon activations' },
      { name: 'Crit', desc: 'Multiplies all damage' },
      { name: 'Burn', desc: 'Sustained damage' }
    ],
    tips: [
      'Dont force a build early - adapt to what you find',
      'Incendiary Rounds enables most burn builds cheaply',
      'Position weapons to chain with ammo items',
      'Crit is strong on almost every Vanessa build',
      'Powder Keg needs burn triggers - dont stack too many without enablers'
    ],
    patchNotes: {
      version: '9.0',
      tier: 'S-Tier',
      topBuilds: ['Powder Keg', 'Slow Burn / Oni Mask', 'Full Ammo Aggro'],
      newItems: ['Flame Signal', 'Hate Leech', 'Scimitar of the Deep', 'Vampire Squid'],
      buffs: [
        'Chum: Crit 4-10% → 3-12%',
        'Honing Steel: CD 5→4, Damage 8-20 → 6-24',
        'Ramrod: +10-30% Crit on reload, CD 5→3',
        'Slumbering Primordial: Multicast 1→4'
      ],
      nerfs: [
        'Port: Cost doubled',
        'Shot Glasses: Ammo 2-4 → 1-3',
        'Switchblade: Poison/Burn bonus +3 → +1'
      ]
    },
    links: [
      { name: 'BazaarDB', url: 'https://bazaardb.gg/?hero=vanessa', icon: '▤' },
      { name: 'Mobalytics', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '⚐' },
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/', icon: '⚒' }
    ]
  },
  pygmalien: {
    id: 'pygmalien',
    name: 'Pygmalien',
    style: 'Shield & Economy',
    difficulty: 'Intermediate',
    portrait: 'assets/heroes/pygmalien.jpg',
    description: 'A wealthy merchant who converts gold and shields into power. Excels at economy generation and outlasting opponents through massive shield stacking.',
    playstyle: 'Pygmalien plays the value game. Generate gold, build shields, and convert your economic advantage into combat power. Jabalian Drum turns shields into damage, while items like Safe and Business Card build your wealth. Pygmalien is patient - you dont need to win fights early, just survive and scale.',
    strengths: [
      'Excellent economy generation',
      'Strong shield stacking',
      'Great late game scaling',
      'Consistent win conditions',
      'Good against aggressive builds'
    ],
    weaknesses: [
      'Slow early game',
      'Vulnerable to shield-piercing',
      'Needs specific items to come online',
      'Burn damage reduces shield effectiveness'
    ],
    stats: [
      { name: 'Shield', desc: 'Core defensive stat' },
      { name: 'Gold', desc: 'Economy generation' },
      { name: 'CDR', desc: 'More shield cycles' }
    ],
    tips: [
      'Business Card pays for itself quickly - get it early',
      'Shields apply before combat damage',
      'Jabalian Drum converts shields to damage',
      'Economy items let you see more shops',
      'You can afford to lose early fights - play for value'
    ],
    patchNotes: {
      version: '9.0',
      tier: 'B+',
      topBuilds: ['Cash Cannon', 'Heal', 'Lemonade Stand', 'Jabalian Drum'],
      newItems: [],
      buffs: [
        'Abacus: +20-40 combat value',
        'ATM: Shield multiplier doubled',
        'Boomerang: Damage 20-50 → 20-80',
        'Gavel: 200 → 100-300',
        'Hatchet: CD 6→4'
      ],
      nerfs: [
        'Showcase: Damage 20-60 → 10-40',
        'Streaming Setup: Reworked to +1 Toys multicast'
      ]
    },
    links: [
      { name: 'BazaarDB', url: 'https://bazaardb.gg/?hero=pygmalien', icon: '▤' },
      { name: 'Mobalytics', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '⚐' },
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/', icon: '⚒' }
    ]
  },
  dooley: {
    id: 'dooley',
    name: 'Dooley',
    style: 'Chain Reactions',
    difficulty: 'Advanced',
    portrait: 'assets/heroes/dooley.jpg',
    description: 'A tech-savvy robot engineer who builds chain reactions between items. High skill ceiling with positioning being crucial for success.',
    playstyle: 'Dooley is all about chain reactions and positioning. Your Core buffs items to its right, and your Friends trigger each other in sequence. Mastering Dooley means understanding exactly how your items will interact and positioning them optimally. The skill ceiling is high but so is the payoff.',
    strengths: [
      'Extremely high damage potential',
      'Chain reactions can snowball',
      'Cheap Friends add up quickly',
      'Multiple build paths (Core, Friends, Tech)',
      'Strong mid-game spike'
    ],
    weaknesses: [
      'Requires precise positioning',
      'Vulnerable to AoE Freeze',
      'High skill ceiling',
      'Setup can be disrupted'
    ],
    stats: [
      { name: 'CDR', desc: 'More chain activations' },
      { name: 'Crit', desc: 'Chain crits devastating' },
      { name: 'Tech', desc: 'Core synergies' }
    ],
    tips: [
      'Core buffs items to its RIGHT - positioning is everything',
      'Friends are cheap but powerful in numbers',
      'GPU is almost always good for crit builds',
      'Watch for AoE Freeze - it can shut down your chains',
      'Practice positioning in early runs'
    ],
    patchNotes: {
      version: '9.0',
      tier: 'B-Tier',
      topBuilds: ['Dooltron', 'Critical Core', 'Launcher Core'],
      newItems: ['Micro Mach'],
      buffs: [
        'Combat Core: Damage/Shield 50-75 → 50-100',
        'Ice 9000: Poison 20-30 → 20-40',
        'Weakpoint Detector: 5-20 → 5-40'
      ],
      nerfs: [
        'Cool LEDs: Bronze→Silver',
        'Temporal Navigator: CD 6→9-6, Haste 1-4 → 2 fixed'
      ],
      metaNote: 'Core rework knocked Dooltron from S-tier. Philosophy shift: in-combat scaling instead of permanent scaling.'
    },
    links: [
      { name: 'BazaarDB', url: 'https://bazaardb.gg/?hero=dooley', icon: '▤' },
      { name: 'Mobalytics', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '⚐' },
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/', icon: '⚒' }
    ]
  },
  mak: {
    id: 'mak',
    name: 'Mak',
    style: 'Potion & Poison',
    difficulty: 'Intermediate',
    portrait: 'assets/heroes/mak.jpg',
    description: 'An alchemist who uses potions and poison effects. Can heal, deal damage over time, and even damage himself for power.',
    playstyle: 'Mak now has multiple A-tier build paths. Poppy Field focuses on poison scaling through self-poison mechanics. Magnus\' Femur leverages new Patch 9.0 items for powerful synergies. Potions build was nerfed to C-tier post-Catalyst rework. Self-poison bypasses anti-heal, making it a unique defensive mechanic.',
    strengths: [
      'Multiple A-tier build options',
      'Self-poison bypasses anti-heal',
      'Poppy Field provides strong scaling',
      'Magnus\' Femur synergies are powerful',
      'Versatile playstyle options'
    ],
    weaknesses: [
      'Potions build is weaker now (C-tier)',
      'Self-poison requires careful management',
      'Build commitment needed by Day 4-5',
      'Early game can be rough'
    ],
    stats: [
      { name: 'Poison', desc: 'Core scaling mechanic' },
      { name: 'Heal', desc: 'Sustain through fights' },
      { name: 'CDR', desc: 'Faster potion cycling' }
    ],
    tips: [
      'Prioritize Poppy Field and Magnus\' Femur (A-tier builds)',
      'AVOID forcing Potions build - it\'s C-tier now',
      'Self-poison is NOT healing - bypasses anti-heal',
      'Poppy Field + Switchblade = strong poison scaling',
      'Commit to your build by Day 4-5 based on shop offers'
    ],
    patchNotes: {
      version: '9.0',
      tier: 'A-Tier',
      topBuilds: ['Poppy Field (A)', 'Magnus\' Femur (A)', 'Potions (C - Post-Nerf)'],
      newItems: ['Book of Secrets', 'Spider Fern'],
      buffs: [
        'Athanor: Burn 12-20 → 15-25',
        'Ice Claw: Expanded to Silver, Damage 50-100 → 30-120'
      ],
      nerfs: [
        'Runic Great Axe: Silver/Gold only, Lifesteal Crit 100% → 50-100%',
        'Tome of Yyahan: Enchantments removed'
      ],
      metaNote: 'Poppy Field and Magnus\' Femur are now A-tier. Potions dropped to C-tier after Catalyst rework.'
    },
    links: [
      { name: 'BazaarDB', url: 'https://bazaardb.gg/?hero=mak', icon: '▤' },
      { name: 'Mobalytics', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '⚐' },
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/', icon: '⚒' }
    ]
  },
  stelle: {
    id: 'stelle',
    name: 'Stelle',
    style: 'Vehicle & Flying',
    difficulty: 'DLC',
    portrait: 'assets/heroes/stelle.jpg',
    description: 'A pilot who commands an army of vehicles and drones. Lightning Rod chains devastate wide boards while Space Laser offers single-target burst.',
    playstyle: 'Stelle builds armies of vehicles that work together. Lightning Rod is her strongest S-tier build, chaining lightning between your vehicles for massive AoE damage. Stellar Swallowtail (A-tier) offers a Flying archetype path. Space Laser provides burst damage. Both require stacking vehicles and managing positioning.',
    strengths: [
      'Lightning Rod is S-tier (consistent AoE)',
      'Strong scaling with more vehicles',
      'Flying archetype with Stellar Swallowtail',
      'Multiple A-tier build options',
      'Unique playstyle'
    ],
    weaknesses: [
      'DLC hero (requires purchase)',
      'Needs multiple vehicles to function',
      'Can be slow to set up',
      'Single-target builds vulnerable to wide boards'
    ],
    stats: [
      { name: 'CDR', desc: 'More vehicle activations' },
      { name: 'Crit', desc: 'Lightning crits chain' },
      { name: 'Vehicles', desc: 'More chain targets' }
    ],
    tips: [
      'Lightning Rod chains between YOUR vehicles - stack them',
      'Stellar Swallowtail enables Flying archetype (A-tier)',
      'Caracara + Aerial Turret opener for speed/damage',
      'Headset kickstarts items when gaining Flying',
      'Clockwork Disc for long-term scaling'
    ],
    patchNotes: {
      version: '9.0',
      tier: 'A-Tier',
      topBuilds: ['Lightning Rod (S)', 'Stellar Swallowtail (A)', 'Space Laser (A)', 'Drone Workshop (C)'],
      newItems: [],
      buffs: [],
      nerfs: [],
      metaNote: 'Lightning Rod is S-tier. Flying archetype with Stellar Swallowtail is strong (A-tier).'
    },
    links: [
      { name: 'BazaarDB', url: 'https://bazaardb.gg/?hero=stelle', icon: '▤' },
      { name: 'Mobalytics', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '⚐' },
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/', icon: '⚒' }
    ]
  },
  jules: {
    id: 'jules',
    name: 'Jules',
    style: 'Food & Cooking',
    difficulty: 'DLC',
    portrait: 'assets/heroes/jules.jpg',
    description: 'A chef who uses cooking mechanics for damage and sustain. Burn through grilling, freeze through refrigeration, or scale sweets like Giant Lollipop.',
    playstyle: 'Jules turns cooking into combat. Burn builds (S-tier) use Hot Box + Imu or food spam via Grill/Feast/Gingerbread House - requires 2nd Stove at Level 9. Giant Lollipop (A-tier) scales with Dishwasher synergy. Freezer builds (B-tier) lock down enemies. Jules has excellent sustain through 60+ food items.',
    strengths: [
      'Burn build is S-tier (requires Level 9)',
      'Great sustain through food',
      'Multiple build paths (Burn, Lollipop, Freeze)',
      'Giant Lollipop scales hard',
      'Good against non-healing builds'
    ],
    weaknesses: [
      'DLC hero (requires purchase)',
      'Burn needs 2nd Stove (Level 9)',
      'Stove/Cooler socket RNG affects viability',
      'Extremely contextual positioning',
      'Anti-heal counters food sustain'
    ],
    stats: [
      { name: 'CDR', desc: 'More cooking cycles' },
      { name: 'Burn', desc: 'Grill damage' },
      { name: 'Heal', desc: 'Food sustain' }
    ],
    tips: [
      'Burn: Requires 2nd Stove at Level 9 (Hot Box + Imu core)',
      'Giant Lollipop: Use Dishwasher for burst, Excellent Vintage for quest',
      'Food healing keeps you in long fights',
      'Stove/Cooler RNG heavily affects build viability',
      'Positioning is extremely contextual due to socket RNG'
    ],
    patchNotes: {
      version: '9.0',
      tier: 'A-Tier',
      topBuilds: ['Burn (S - needs 2nd Stove Lv9)', 'Giant Lollipop (A)', 'Freezer (B)'],
      newItems: [],
      buffs: [],
      nerfs: [],
      metaNote: 'Newest hero. Burn is S-tier but requires 2nd Stove at Level 9. 60+ food/cooking items available.'
    },
    links: [
      { name: 'BazaarDB', url: 'https://bazaardb.gg/?hero=jules', icon: '▤' },
      { name: 'Mobalytics', url: 'https://mobalytics.gg/the-bazaar/guides', icon: '⚐' },
      { name: 'Bazaar Builds', url: 'https://bazaar-builds.net/', icon: '⚒' }
    ]
  }
};

let currentHero = null;

// ==========================================
// HERO MATCHUP DATA (win rates hero vs hero)
// ==========================================
const heroMatchups = {
  vanessa: { pygmalien: 0.55, dooley: 0.50, mak: 0.60, stelle: 0.52, jules: 0.58 },
  pygmalien: { vanessa: 0.45, dooley: 0.65, mak: 0.48, stelle: 0.60, jules: 0.52 },
  dooley: { vanessa: 0.50, pygmalien: 0.35, mak: 0.55, stelle: 0.45, jules: 0.48 },
  mak: { vanessa: 0.40, pygmalien: 0.52, dooley: 0.45, stelle: 0.50, jules: 0.55 },
  stelle: { vanessa: 0.48, pygmalien: 0.40, dooley: 0.55, mak: 0.50, jules: 0.52 },
  jules: { vanessa: 0.42, pygmalien: 0.48, dooley: 0.52, mak: 0.45, stelle: 0.48 }
};

// ==========================================
// HERO MASTERY UTILITIES
// ==========================================

function getHeroMastery(heroId) {
  if (!state.heroMastery[heroId]) {
    state.heroMastery[heroId] = {
      plays: 0,
      wins: 0,
      totalWins: 0,
      bestRun: 0,
      level: 0,
      xp: 0
    };
  }
  return state.heroMastery[heroId];
}

function calculateHeroMastery(heroId) {
  const heroRuns = state.runs.filter(r => r.hero === heroId);
  const mastery = getHeroMastery(heroId);

  mastery.plays = heroRuns.length;
  mastery.totalWins = heroRuns.reduce((sum, r) => sum + r.wins, 0);
  mastery.wins = heroRuns.filter(r => r.wins >= 10).length;
  mastery.bestRun = Math.max(0, ...heroRuns.map(r => r.wins));

  // XP calculation: 1 XP per game played, 5 XP per win achieved, 50 XP for 10-win
  mastery.xp = mastery.plays + (mastery.totalWins * 5) + (mastery.wins * 50);

  // Level calculation: Level up every 100 XP
  mastery.level = Math.floor(mastery.xp / 100);

  return mastery;
}

function saveMastery() {
  localStorage.setItem('bazaar-hero-mastery', JSON.stringify(state.heroMastery));
}

function getMasteryBadge(level) {
  if (level >= 20) return { name: 'Master', color: '#FFD700', icon: '◆' };
  if (level >= 15) return { name: 'Expert', color: '#E5E4E2', icon: '◇' };
  if (level >= 10) return { name: 'Veteran', color: '#CD7F32', icon: '⭐' };
  if (level >= 5) return { name: 'Skilled', color: '#16C79A', icon: '✦' };
  if (level >= 2) return { name: 'Apprentice', color: '#6C63FF', icon: '⚐' };
  return { name: 'Novice', color: '#888', icon: '○' };
}

// Build progression timeline data for each hero
const heroProgression = {
  vanessa: {
    early: [
      { name: 'Incendiary Rounds', priority: 'must', reason: 'Enables burn builds' },
      { name: 'Any weapon', priority: 'good', reason: 'Start dealing damage' },
      { name: 'Crit items', priority: 'flex', reason: 'Scales all damage' }
    ],
    mid: [
      { name: 'Powder Keg', priority: 'must', reason: 'Core burn scaling' },
      { name: 'Additional weapons', priority: 'core', reason: 'Multi-weapon synergy' },
      { name: 'CDR sources', priority: 'good', reason: 'More activations' }
    ],
    late: [
      { name: 'Flamethrower', priority: 'must', reason: 'AoE burn application' },
      { name: 'Crit multipliers', priority: 'core', reason: 'Massive damage spikes' },
      { name: 'Burn amplifiers', priority: 'good', reason: 'Close out games' }
    ]
  },
  pygmalien: {
    early: [
      { name: 'Business Card', priority: 'must', reason: 'Economy engine' },
      { name: 'Shield items', priority: 'core', reason: 'Early defense' },
      { name: 'Safe', priority: 'good', reason: 'Gold scaling' }
    ],
    mid: [
      { name: 'Jabalian Drum', priority: 'must', reason: 'Shield → Damage' },
      { name: 'Showcase', priority: 'core', reason: 'Economy scaling' },
      { name: 'More shields', priority: 'good', reason: 'Feed the drum' }
    ],
    late: [
      { name: 'Massive shields', priority: 'must', reason: 'Max drum damage' },
      { name: 'Diamond items', priority: 'core', reason: 'Luxury scaling' },
      { name: 'CDR', priority: 'good', reason: 'Shield cycling' }
    ]
  },
  dooley: {
    early: [
      { name: 'Friends (small)', priority: 'must', reason: 'Cheap synergy' },
      { name: 'Core', priority: 'core', reason: 'Buffs right items' },
      { name: 'Tech items', priority: 'good', reason: 'Early power' }
    ],
    mid: [
      { name: 'GPU', priority: 'must', reason: 'Crit scaling' },
      { name: 'More Friends', priority: 'core', reason: 'Chain reactions' },
      { name: 'Positioning items', priority: 'good', reason: 'Optimize chains' }
    ],
    late: [
      { name: 'Optimized board', priority: 'must', reason: 'Perfect chains' },
      { name: 'CDR stacking', priority: 'core', reason: 'Rapid chains' },
      { name: 'Crit multipliers', priority: 'good', reason: 'Chain crits' }
    ]
  },
  mak: {
    early: [
      { name: 'Potions', priority: 'must', reason: 'Sustain & synergy' },
      { name: 'Healing items', priority: 'core', reason: 'Survive early' },
      { name: 'Gold generation', priority: 'good', reason: 'Shop flexibility' }
    ],
    mid: [
      { name: 'Peacewrought', priority: 'must', reason: 'Build-defining' },
      { name: 'Haste sources', priority: 'core', reason: 'More swings' },
      { name: 'Vial Launcher', priority: 'good', reason: 'Potion synergy' }
    ],
    late: [
      { name: 'Rainbow Staff', priority: 'must', reason: 'Haste generation' },
      { name: 'Crit items', priority: 'core', reason: 'Massive crits' },
      { name: 'Library', priority: 'good', reason: 'Infinite potions' }
    ]
  },
  stelle: {
    early: [
      { name: 'Small vehicles', priority: 'must', reason: 'Early chains' },
      { name: 'Flycycle', priority: 'core', reason: 'Cheap vehicle' },
      { name: 'Any vehicles', priority: 'good', reason: 'Build quantity' }
    ],
    mid: [
      { name: 'Lightning Rod', priority: 'must', reason: 'Chain lightning' },
      { name: 'More vehicles', priority: 'core', reason: 'More chains' },
      { name: 'Ornithopter', priority: 'good', reason: 'Great vehicle' }
    ],
    late: [
      { name: 'Vehicle army', priority: 'must', reason: 'Max chains' },
      { name: 'CDR', priority: 'core', reason: 'Rapid chains' },
      { name: 'Crit', priority: 'good', reason: 'Chain crits' }
    ]
  },
  jules: {
    early: [
      { name: 'Food items', priority: 'must', reason: 'Sustain' },
      { name: 'Grill', priority: 'core', reason: 'Burn application' },
      { name: 'Spices', priority: 'good', reason: 'Damage boost' }
    ],
    mid: [
      { name: 'Giant Lollipop', priority: 'must', reason: 'Scaling weapon' },
      { name: 'Sweet items', priority: 'core', reason: 'Feed lollipop' },
      { name: 'Freezer', priority: 'good', reason: 'Control option' }
    ],
    late: [
      { name: 'Max sweets', priority: 'must', reason: 'Lollipop damage' },
      { name: 'Burn/Freeze', priority: 'core', reason: 'Win condition' },
      { name: 'CDR', priority: 'good', reason: 'More cooking' }
    ]
  }
};

// Comprehensive item knowledge base for each hero
const heroItemKnowledge = {
  vanessa: {
    items: [
      {
        name: 'Incendiary Rounds',
        tier: { early: 'S', mid: 'A', late: 'B' },
        tags: ['weapon', 'burn', 'core'],
        description: 'Enables burn-based builds. Your weapons apply burn on hit.',
        synergies: ['Powder Keg', 'Flamethrower', 'Grill', 'Any Weapon'],
        combos: [
          { items: ['Incendiary Rounds', 'Powder Keg'], effect: 'Burn stacking becomes your primary win condition' },
          { items: ['Incendiary Rounds', 'Flamethrower'], effect: 'Massive AoE burn application' }
        ]
      },
      {
        name: 'Powder Keg',
        tier: { early: 'A', mid: 'S', late: 'S' },
        tags: ['burn', 'scaling', 'core'],
        description: 'Scales burn damage exponentially. Essential for burn builds.',
        synergies: ['Incendiary Rounds', 'Grill', 'Flamethrower', 'Any burn source'],
        combos: [
          { items: ['Powder Keg', 'Incendiary Rounds', 'Grill'], effect: 'Triple burn stacking for maximum damage' }
        ]
      },
      {
        name: 'Flamethrower',
        tier: { early: 'C', mid: 'B', late: 'S' },
        tags: ['weapon', 'burn', 'aoe'],
        description: 'AoE weapon that applies burn. Game-ending in late game.',
        synergies: ['Incendiary Rounds', 'Powder Keg', 'Crit items'],
        combos: [
          { items: ['Flamethrower', 'Powder Keg', 'Crit Multiplier'], effect: 'Wipe entire boards with crit burns' }
        ]
      },
      {
        name: 'Ray Gun',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['weapon', 'burn'],
        description: 'Consistent weapon with burn synergy.',
        synergies: ['Incendiary Rounds', 'Powder Keg', 'CDR sources'],
        combos: []
      },
      {
        name: 'Aquarium',
        tier: { early: 'S', mid: 'A', late: 'B' },
        tags: ['economy', 'multiweapon'],
        description: 'Each weapon gives gold. Enables economic advantage and multiweapon builds.',
        synergies: ['Multiple weapons', 'Board expansion items'],
        combos: [
          { items: ['Aquarium', '3+ Weapons'], effect: 'Massive gold generation for scaling' }
        ]
      },
      {
        name: 'Crit Items',
        tier: { early: 'A', mid: 'A', late: 'S' },
        tags: ['crit', 'scaling'],
        description: 'Crit chance and multiplier items. Scales all damage output.',
        synergies: ['Any weapon', 'Flamethrower', 'Burn builds'],
        combos: [
          { items: ['Crit', 'Flamethrower', 'Powder Keg'], effect: 'One-shot potential with crit burns' }
        ]
      },
      {
        name: 'Grill',
        tier: { early: 'A', mid: 'S', late: 'A' },
        tags: ['burn', 'food'],
        description: 'Food items apply burn. Works with Jules synergy or food-heavy boards.',
        synergies: ['Incendiary Rounds', 'Powder Keg', 'Food items'],
        combos: []
      },
      {
        name: 'CDR Items',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['cooldown', 'scaling'],
        description: 'Cooldown reduction for more weapon activations.',
        synergies: ['Multiple weapons', 'Active items'],
        combos: []
      },
      {
        name: 'Cannon',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['weapon', 'reliable'],
        description: 'Reliable damage weapon with good CDR. Solid choice for weapon builds.',
        synergies: ['Aquarium', 'CDR', 'Multiweapon builds'],
        combos: []
      },
      {
        name: 'Oni Mask',
        tier: { early: 'C', mid: 'S', late: 'S' },
        tags: ['burn', 'crit', 'core'],
        description: 'Burn scaling with Crit. S-tier for burn+crit hybrid builds.',
        synergies: ['Incendiary Rounds', 'Crit items', 'Burn sources'],
        combos: [
          { items: ['Oni Mask', 'Crit', 'Burn'], effect: 'Critical burn damage scales massively' }
        ]
      },
      {
        name: 'Lighthouse',
        tier: { early: 'D', mid: 'B', late: 'S' },
        tags: ['burn', 'scaling', 'ultimate'],
        description: 'Ultimate burn scaling item. Rare but game-winning.',
        synergies: ['Powder Keg', 'Oni Mask', 'All burn sources'],
        combos: []
      },
      {
        name: 'Sniper Rifle',
        tier: { early: 'C', mid: 'A', late: 'A' },
        tags: ['weapon', 'damage'],
        description: 'High damage weapon. Good with crit builds.',
        synergies: ['Crit items', 'Burn builds'],
        combos: []
      }
    ]
  },
  pygmalien: {
    items: [
      {
        name: 'Business Card',
        tier: { early: 'S', mid: 'A', late: 'B' },
        tags: ['economy', 'core'],
        description: 'Early game economy engine. +1 gold per turn.',
        synergies: ['Safe', 'Showcase', 'Economy items'],
        combos: [
          { items: ['Business Card', 'Safe'], effect: 'Compound gold generation' }
        ]
      },
      {
        name: 'Jabalian Drum',
        tier: { early: 'B', mid: 'S', late: 'S' },
        tags: ['shield', 'damage', 'core'],
        description: 'Converts shield into damage. Build-defining item.',
        synergies: ['Shield items', 'CDR', 'Board expansion'],
        combos: [
          { items: ['Jabalian Drum', 'Massive Shield Stack'], effect: 'Deal damage equal to total shield' }
        ]
      },
      {
        name: 'Shield Items',
        tier: { early: 'A', mid: 'S', late: 'S' },
        tags: ['shield', 'defense'],
        description: 'Any shield-granting items. Feed the Drum.',
        synergies: ['Jabalian Drum', 'CDR'],
        combos: []
      },
      {
        name: 'Showcase',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['economy', 'scaling'],
        description: 'Scales with expensive items. Economy engine.',
        synergies: ['Diamond items', 'Expensive items'],
        combos: []
      },
      {
        name: 'Safe',
        tier: { early: 'A', mid: 'B', late: 'C' },
        tags: ['economy', 'gold'],
        description: 'Generates interest on gold. Early scaling.',
        synergies: ['Business Card', 'Economy items'],
        combos: []
      },
      {
        name: 'Diamond Items',
        tier: { early: 'C', mid: 'B', late: 'A' },
        tags: ['luxury', 'expensive'],
        description: 'High-cost luxury items. Scale with wealth.',
        synergies: ['Showcase', 'Economy items'],
        combos: []
      },
      {
        name: 'ATM',
        tier: { early: 'C', mid: 'A', late: 'A' },
        tags: ['economy', 'gold'],
        description: 'Generates gold from shields. Shield build economy engine.',
        synergies: ['Shield items', 'Jabalian Drum'],
        combos: []
      },
      {
        name: 'Landscraper',
        tier: { early: 'D', mid: 'B', late: 'S' },
        tags: ['economy', 'burst'],
        description: 'Late game economy burst. Massive gold generation.',
        synergies: ['Business Card', 'Showcase', 'Gold builds'],
        combos: []
      }
    ]
  },
  dooley: {
    items: [
      {
        name: 'Friends (Small)',
        tier: { early: 'S', mid: 'A', late: 'B' },
        tags: ['tech', 'adjacent', 'core'],
        description: 'Cheap items that benefit from adjacency. Core for chains.',
        synergies: ['Core', 'GPU', 'Tech items'],
        combos: [
          { items: ['Friends', 'Core'], effect: 'Buffed cheap items create value chains' }
        ]
      },
      {
        name: 'Core',
        tier: { early: 'A', mid: 'S', late: 'A' },
        tags: ['tech', 'buff', 'core'],
        description: 'Buffs adjacent tech items. Enables positioning strategies.',
        synergies: ['Friends', 'GPU', 'Tech items'],
        combos: []
      },
      {
        name: 'GPU',
        tier: { early: 'B', mid: 'S', late: 'S' },
        tags: ['tech', 'crit', 'core'],
        description: 'Crit scaling for tech items. Explosive damage potential.',
        synergies: ['Core', 'Friends', 'Tech items'],
        combos: [
          { items: ['GPU', 'Core', 'Tech Board'], effect: 'Critical hits across all tech items' }
        ]
      },
      {
        name: 'Tech Items',
        tier: { early: 'A', mid: 'A', late: 'A' },
        tags: ['tech'],
        description: 'Any tech-tagged items for Dooley synergies.',
        synergies: ['Core', 'GPU'],
        combos: []
      },
      {
        name: 'Positioning Items',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['utility', 'positioning'],
        description: 'Items that let you rearrange board for optimal chains.',
        synergies: ['Core', 'Adjacent synergies'],
        combos: []
      },
      {
        name: 'CDR Stacking',
        tier: { early: 'C', mid: 'B', late: 'S' },
        tags: ['cooldown', 'scaling'],
        description: 'Stack cooldown reduction for rapid chain activations.',
        synergies: ['All items'],
        combos: []
      }
    ]
  },
  mak: {
    items: [
      {
        name: 'Potions',
        tier: { early: 'S', mid: 'A', late: 'A' },
        tags: ['potion', 'sustain', 'core'],
        description: 'Any potion items. Trigger Mak passive and provide sustain.',
        synergies: ['Vial Launcher', 'Library', 'Healing items'],
        combos: []
      },
      {
        name: 'Peacewrought',
        tier: { early: 'B', mid: 'S', late: 'S' },
        tags: ['weapon', 'healing', 'core'],
        description: 'Build-defining weapon. Scales with healing.',
        synergies: ['Potions', 'Healing items', 'Haste'],
        combos: [
          { items: ['Peacewrought', 'Rainbow Staff'], effect: 'Infinite haste scaling with healing' }
        ]
      },
      {
        name: 'Rainbow Staff',
        tier: { early: 'C', mid: 'B', late: 'S' },
        tags: ['haste', 'scaling', 'core'],
        description: 'Generates haste. Game-ending when stacked.',
        synergies: ['Peacewrought', 'Potions'],
        combos: []
      },
      {
        name: 'Vial Launcher',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['potion', 'weapon'],
        description: 'Weaponizes potions. Good potion synergy.',
        synergies: ['Potions', 'Library'],
        combos: []
      },
      {
        name: 'Library',
        tier: { early: 'C', mid: 'B', late: 'A' },
        tags: ['potion', 'generation'],
        description: 'Generates potions. Infinite resource late game.',
        synergies: ['Potions', 'Vial Launcher'],
        combos: []
      },
      {
        name: 'Healing Items',
        tier: { early: 'A', mid: 'A', late: 'B' },
        tags: ['healing', 'sustain'],
        description: 'Any healing sources. Survive early, scale Peacewrought.',
        synergies: ['Peacewrought', 'Potions'],
        combos: []
      },
      {
        name: 'Haste Sources',
        tier: { early: 'B', mid: 'A', late: 'S' },
        tags: ['haste', 'scaling'],
        description: 'Items that grant haste. More weapon swings.',
        synergies: ['Peacewrought', 'Rainbow Staff'],
        combos: []
      },
      {
        name: 'Crit Items',
        tier: { early: 'B', mid: 'A', late: 'S' },
        tags: ['crit', 'damage'],
        description: 'Crit scaling for massive damage spikes.',
        synergies: ['Peacewrought', 'Haste'],
        combos: []
      },
      {
        name: 'Staff of the Moose',
        tier: { early: 'C', mid: 'A', late: 'S' },
        tags: ['regen', 'scaling', 'core'],
        description: 'Doubles Regen. Build-defining with Peacewrought.',
        synergies: ['Peacewrought', 'Barbed Claws', 'Healing items'],
        combos: [
          { items: ['Staff of the Moose', 'Peacewrought'], effect: '2x Regen = 2x healing = unkillable sustain' },
          { items: ['Staff of the Moose', 'Barbed Claws'], effect: 'Doubled Regen means doubled damage from Claws' }
        ]
      },
      {
        name: 'Barbed Claws',
        tier: { early: 'C', mid: 'A', late: 'S' },
        tags: ['damage', 'regen', 'scaling'],
        description: 'Adds damage per Regen. Scales infinitely with Regen stacking.',
        synergies: ['Peacewrought', 'Staff of the Moose', 'Regen sources'],
        combos: [
          { items: ['Barbed Claws', 'Peacewrought', 'Staff of the Moose'], effect: 'Massive damage scaling from Regen doubling' }
        ]
      },
      {
        name: 'Aludel',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['catalyst', 'generation', 'economy'],
        description: 'Generates catalysts. Feed to Peacewrought for passive gold.',
        synergies: ['Peacewrought', 'Mortar & Pestle'],
        combos: [
          { items: ['Aludel', 'Peacewrought'], effect: 'Infinite catalyst feeding for gold generation' }
        ]
      },
      {
        name: 'Poppy Field',
        tier: { early: 'C', mid: 'S', late: 'S' },
        tags: ['poison', 'weapon', 'core'],
        description: 'Poisons when weapons hit. Charges weapons. S-tier poison build.',
        synergies: ['Spider Mace', 'Floor Spike', 'Poison weapons'],
        combos: [
          { items: ['Poppy Field', 'Spider Mace'], effect: 'Spider Mace poison charges from Poppy Field triggers = infinite loop' },
          { items: ['Poppy Field', 'Heavy enchantment'], effect: 'Heavy Poppy Field with 2 Spider Maces = true infinite damage' }
        ]
      },
      {
        name: 'Spider Mace',
        tier: { early: 'B', mid: 'S', late: 'S' },
        tags: ['poison', 'weapon', 'slow'],
        description: 'Charges via Slow/Poison. Small slot with huge value in poison builds.',
        synergies: ['Poppy Field', 'Floor Spike', 'Slow items'],
        combos: []
      },
      {
        name: 'Floor Spike',
        tier: { early: 'A', mid: 'A', late: 'B' },
        tags: ['poison', 'weapon'],
        description: 'Poison weapon. Works well in multiples for poison stacking.',
        synergies: ['Poppy Field', 'Spider Mace', 'Poison builds'],
        combos: []
      },
      {
        name: 'Runic Potion',
        tier: { early: 'A', mid: 'A', late: 'A' },
        tags: ['potion', 'lifesteal'],
        description: 'Guarantees Lifesteal on any weapon. Essential for weapon sustain.',
        synergies: ['Peacewrought', 'Spider Mace', 'Any weapon'],
        combos: []
      },
      {
        name: 'Foul Mushroom',
        tier: { early: 'S', mid: 'A', late: 'B' },
        tags: ['poison', 'self-poison'],
        description: 'Self-poison enabler. Triggers damage scaling from poison stacks.',
        synergies: ['Rainbow Staff', 'Lifesteal', 'Poison scaling'],
        combos: [
          { items: ['Foul Mushroom', 'Lifesteal'], effect: 'Self-poison damage + lifesteal = net healing + damage scaling' }
        ]
      },
      {
        name: 'Energy Potion',
        tier: { early: 'S', mid: 'A', late: 'B' },
        tags: ['potion', 'haste', 'cheap'],
        description: 'Haste + cheap sacrifice fodder for Peacewrought.',
        synergies: ['Peacewrought', 'Haste builds'],
        combos: []
      },
      {
        name: 'Magnus Femur',
        tier: { early: 'C', mid: 'A', late: 'S' },
        tags: ['weapon', 'slow', 'core'],
        description: 'Gains +25 damage per tier each Slow. Self-charges. Slow-based S-tier build.',
        synergies: ['Incense', 'Amber', 'Slow sources'],
        combos: [
          { items: ['Magnus Femur', 'Incense'], effect: 'Each Incense tick charges Magnus Femur for massive damage' }
        ]
      },
      {
        name: 'Incense',
        tier: { early: 'B', mid: 'A', late: 'S' },
        tags: ['slow', 'trigger'],
        description: '4 Slow triggers at Diamond. Small slot, huge value for Slow builds.',
        synergies: ['Magnus Femur', 'Amber', 'Slow builds'],
        combos: []
      },
      {
        name: 'Amber',
        tier: { early: 'A', mid: 'A', late: 'A' },
        tags: ['slow', 'duration'],
        description: 'Extends Slow duration. Decent Slow itself.',
        synergies: ['Magnus Femur', 'Incense', 'Slow builds'],
        combos: []
      }
    ]
  },
  stelle: {
    items: [
      {
        name: 'Lightning Rod',
        tier: { early: 'B', mid: 'S', late: 'S' },
        tags: ['vehicle', 'chain', 'core'],
        description: 'Chain lightning across vehicles. Build-defining.',
        synergies: ['Vehicles', 'CDR', 'Ornithopter'],
        combos: [
          { items: ['Lightning Rod', '5+ Vehicles'], effect: 'Chain lightning across entire board' }
        ]
      },
      {
        name: 'Flycycle',
        tier: { early: 'S', mid: 'A', late: 'B' },
        tags: ['vehicle', 'cheap'],
        description: 'Cheap vehicle for early chains. Good early value.',
        synergies: ['Lightning Rod', 'More vehicles'],
        combos: []
      },
      {
        name: 'Ornithopter',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['vehicle', 'flying'],
        description: 'Strong vehicle with good stats and synergy.',
        synergies: ['Lightning Rod', 'Vehicles'],
        combos: []
      },
      {
        name: 'Small Vehicles',
        tier: { early: 'S', mid: 'A', late: 'B' },
        tags: ['vehicle', 'cheap'],
        description: 'Low-cost vehicles to start chains early.',
        synergies: ['Lightning Rod'],
        combos: []
      },
      {
        name: 'Vehicle Army',
        tier: { early: 'B', mid: 'A', late: 'S' },
        tags: ['vehicle', 'scaling'],
        description: 'Stack as many vehicles as possible. Late game power.',
        synergies: ['Lightning Rod', 'CDR'],
        combos: []
      },
      {
        name: 'CDR',
        tier: { early: 'C', mid: 'A', late: 'S' },
        tags: ['cooldown'],
        description: 'Cooldown reduction for rapid chain activations.',
        synergies: ['Lightning Rod', 'Vehicles'],
        combos: []
      },
      {
        name: 'Crit',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['crit', 'damage'],
        description: 'Crit for chain damage spikes.',
        synergies: ['Lightning Rod', 'Vehicles'],
        combos: []
      },
      {
        name: 'Helicopter',
        tier: { early: 'C', mid: 'A', late: 'S' },
        tags: ['vehicle', 'strong'],
        description: 'Strong late game vehicle with good stats.',
        synergies: ['Lightning Rod', 'Other vehicles'],
        combos: []
      },
      {
        name: 'Space Laser',
        tier: { early: 'D', mid: 'B', late: 'S' },
        tags: ['weapon', 'burst', 'charge'],
        description: 'Build-defining burst weapon. Charges from items.',
        synergies: ['Drone Workshop', 'Charge sources', 'Shields'],
        combos: [
          { items: ['Space Laser', 'Drone Workshop'], effect: 'Drones charge laser faster for burst damage' }
        ]
      },
      {
        name: 'Drone Workshop',
        tier: { early: 'C', mid: 'A', late: 'A' },
        tags: ['generation', 'charge'],
        description: 'Generates drones. Charges Space Laser and other items.',
        synergies: ['Space Laser', 'Charge items'],
        combos: []
      }
    ]
  },
  jules: {
    items: [
      {
        name: 'Giant Lollipop',
        tier: { early: 'C', mid: 'S', late: 'S' },
        tags: ['weapon', 'sweet', 'core'],
        description: 'Scales with sweets consumed. Build-defining weapon.',
        synergies: ['Sweet items', 'Food items'],
        combos: [
          { items: ['Giant Lollipop', 'Max Sweets'], effect: 'Massive weapon damage from sweets scaling' }
        ]
      },
      {
        name: 'Grill',
        tier: { early: 'A', mid: 'A', late: 'A' },
        tags: ['food', 'burn', 'core'],
        description: 'Food items apply burn. Strong with food builds.',
        synergies: ['Food items', 'Burn amplifiers'],
        combos: []
      },
      {
        name: 'Freezer',
        tier: { early: 'B', mid: 'A', late: 'S' },
        tags: ['food', 'freeze', 'control'],
        description: 'Food items apply freeze. Control and damage.',
        synergies: ['Food items', 'Freeze amplifiers'],
        combos: [
          { items: ['Freezer', 'Food Board', 'Grill'], effect: 'Apply burn and freeze simultaneously' }
        ]
      },
      {
        name: 'Food Items',
        tier: { early: 'S', mid: 'A', late: 'A' },
        tags: ['food', 'sustain'],
        description: 'Any food items. Trigger Jules passive and Grill/Freezer.',
        synergies: ['Grill', 'Freezer', 'Giant Lollipop'],
        combos: []
      },
      {
        name: 'Sweet Items',
        tier: { early: 'B', mid: 'A', late: 'S' },
        tags: ['sweet', 'scaling'],
        description: 'Sweet-tagged items to feed Giant Lollipop.',
        synergies: ['Giant Lollipop'],
        combos: []
      },
      {
        name: 'Spices',
        tier: { early: 'A', mid: 'A', late: 'B' },
        tags: ['food', 'damage'],
        description: 'Spices boost food damage. Good early scaling.',
        synergies: ['Food items', 'Grill'],
        combos: []
      },
      {
        name: 'Oven',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['food', 'size'],
        description: 'Makes bigger food items with more powerful effects.',
        synergies: ['Food items', 'Grill', 'Freezer'],
        combos: []
      },
      {
        name: 'Chocolate Bar',
        tier: { early: 'S', mid: 'A', late: 'B' },
        tags: ['sweet', 'cheap'],
        description: 'Cheap sweet for early scaling. Feeds Giant Lollipop.',
        synergies: ['Giant Lollipop', 'Sweet items'],
        combos: []
      },
      {
        name: 'Truffles',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['sweet', 'premium'],
        description: 'Premium sweet item. Good Lollipop scaling.',
        synergies: ['Giant Lollipop', 'Sweet items'],
        combos: []
      },
      {
        name: 'Dishwasher',
        tier: { early: 'B', mid: 'A', late: 'S' },
        tags: ['food', 'freeze', 'control'],
        description: 'Applies Freeze via cooking. Control build enabler.',
        synergies: ['Freezer', 'Food items', 'Control'],
        combos: [
          { items: ['Dishwasher', 'Freezer', 'Food Board'], effect: 'Freeze lockdown with food synergy' }
        ]
      },
      {
        name: 'Wok',
        tier: { early: 'B', mid: 'A', late: 'A' },
        tags: ['food', 'fast'],
        description: 'Fast cooking with good damage output.',
        synergies: ['Food items', 'CDR'],
        combos: []
      },
      {
        name: 'Curry',
        tier: { early: 'A', mid: 'A', late: 'A' },
        tags: ['food', 'burn'],
        description: 'Food with burn synergy. Works with Grill.',
        synergies: ['Grill', 'Burn builds'],
        combos: []
      }
    ]
  }
};

function renderHeroGrid() {
  const grid = document.getElementById('heroGrid');
  const detail = document.getElementById('heroDetail');
  if (!grid) return;

  // Hide detail, show grid
  if (detail) detail.classList.remove('active');
  grid.style.display = '';

  grid.innerHTML = Object.values(heroData).map(hero => {
    const mastery = calculateHeroMastery(hero.id);
    const badge = getMasteryBadge(mastery.level);
    const avgWins = mastery.plays > 0 ? (mastery.totalWins / mastery.plays).toFixed(1) : '0.0';
    const winRate = mastery.plays > 0 ? ((mastery.wins / mastery.plays) * 100).toFixed(0) : '0';

    return `
      <div class="hero-card ${hero.id}" data-hero="${hero.id}">
        <div class="hero-mastery-badge" style="background: ${badge.color}">
          <span class="mastery-icon">${badge.icon}</span>
          <span class="mastery-level">Lv ${mastery.level}</span>
        </div>
        <div class="hero-header">
          <img src="${hero.portrait}" alt="${hero.name}" class="hero-portrait">
          <div class="hero-info">
            <h3>${hero.name}</h3>
            <p class="hero-style">${hero.style}</p>
            <p class="hero-difficulty">${hero.difficulty}</p>
          </div>
        </div>
        <div class="hero-stats-mini">
          <div class="stat-mini">
            <span class="stat-mini-value">${mastery.plays}</span>
            <span class="stat-mini-label">Runs</span>
          </div>
          <div class="stat-mini">
            <span class="stat-mini-value">${avgWins}</span>
            <span class="stat-mini-label">Avg</span>
          </div>
          <div class="stat-mini">
            <span class="stat-mini-value">${mastery.wins}</span>
            <span class="stat-mini-label">10W</span>
          </div>
        </div>
        <div class="hero-builds">
          ${getHeroBuilds(hero.id).slice(0, 3).map(b => `
            <span class="build-tag">${b.name}</span>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Add click handlers
  grid.querySelectorAll('.hero-card').forEach(card => {
    card.addEventListener('click', () => showHeroDetail(card.dataset.hero));
  });

  // Re-apply filters
  filterHeroes();
}

function getHeroBuilds(heroId) {
  return state.guides.filter(g => g.hero === heroId);
}

function showHeroDetail(heroId) {
  const hero = heroData[heroId];
  if (!hero) return;

  currentHero = heroId;

  const grid = document.getElementById('heroGrid');
  const detail = document.getElementById('heroDetail');

  if (grid) grid.style.display = 'none';
  if (detail) detail.classList.add('active');

  // Populate hero info
  document.getElementById('heroDetailPortrait').src = hero.portrait;
  document.getElementById('heroDetailPortrait').alt = hero.name;
  document.getElementById('heroDetailName').textContent = hero.name;
  document.getElementById('heroDetailStyle').textContent = hero.style;
  document.getElementById('heroDetailDifficulty').textContent = hero.difficulty;
  document.getElementById('heroDetailDesc').textContent = hero.description;
  document.getElementById('heroDetailPlaystyle').textContent = hero.playstyle;

  // Strengths
  document.getElementById('heroDetailStrengths').innerHTML =
    hero.strengths.map(s => `<li>${s}</li>`).join('');

  // Weaknesses
  document.getElementById('heroDetailWeaknesses').innerHTML =
    hero.weaknesses.map(w => `<li>${w}</li>`).join('');

  // Stats
  document.getElementById('heroDetailStats').innerHTML =
    hero.stats.map((s, i) => `
      <div class="hero-stat-item">
        <span class="hero-stat-rank">${i + 1}</span>
        <span class="hero-stat-name">${s.name}</span>
        <span class="hero-stat-desc">${s.desc}</span>
      </div>
    `).join('');

  // Meta Builds
  const builds = getHeroBuilds(heroId);
  document.getElementById('heroDetailBuilds').innerHTML = builds.length ?
    builds.map(b => `
      <div class="hero-build-card" data-guide-id="${b.id}">
        <div class="hero-build-header">
          <span class="hero-build-name">${b.name}</span>
          <span class="hero-build-tier tier-${b.tier}">${b.tier.toUpperCase()}-Tier</span>
        </div>
        <p class="hero-build-desc">${b.winCondition || b.overview.slice(0, 100)}...</p>
      </div>
    `).join('') : '<p class="empty-state">No builds available for this hero yet</p>';

  // Add click handlers to builds
  document.querySelectorAll('#heroDetailBuilds .hero-build-card').forEach(card => {
    card.addEventListener('click', () => {
      const guideId = card.dataset.guideId;
      showGuideDetail(guideId);
      document.querySelector('[data-tab="guides"]').click();
    });
  });

  // Tips
  document.getElementById('heroDetailTips').innerHTML =
    hero.tips.map(t => `<li>${t}</li>`).join('');

  // LEARNING CHECKLIST
  const checklist = heroLearningChecklists[heroId];
  const progress = getLearningProgress(heroId);
  const percentage = calculateLearningPercentage(heroId);

  document.getElementById('learningPercentage').textContent = `${percentage}%`;

  if (checklist) {
    document.getElementById('heroLearningChecklist').innerHTML = checklist.categories.map((category, catIndex) => `
      <div class="learning-category">
        <div class="learning-category-header">
          <span class="category-icon">${category.icon}</span>
          <h4>${category.name}</h4>
          <span class="category-progress">${category.items.filter((_, i) => progress[`${catIndex}-${i}`]).length}/${category.items.length}</span>
        </div>
        <div class="learning-items">
          ${category.items.map((item, itemIndex) => {
            const key = `${catIndex}-${itemIndex}`;
            const isChecked = progress[key] || false;
            return `
              <label class="learning-item ${isChecked ? 'checked' : ''}">
                <input type="checkbox"
                       data-hero="${heroId}"
                       data-category="${catIndex}"
                       data-item="${itemIndex}"
                       ${isChecked ? 'checked' : ''}
                       class="learning-checkbox">
                <span class="learning-item-text">${item}</span>
              </label>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    // Add event listeners to checkboxes
    document.querySelectorAll('.learning-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const heroId = e.target.dataset.hero;
        const catIndex = parseInt(e.target.dataset.category);
        const itemIndex = parseInt(e.target.dataset.item);

        toggleLearningItem(heroId, catIndex, itemIndex);

        // Update progress display
        const newPercentage = calculateLearningPercentage(heroId);
        document.getElementById('learningPercentage').textContent = `${newPercentage}%`;

        // Update category progress
        const progress = getLearningProgress(heroId);
        const categoryProgress = checklist.categories[catIndex].items.filter((_, i) =>
          progress[`${catIndex}-${i}`]
        ).length;

        e.target.closest('.learning-category').querySelector('.category-progress').textContent =
          `${categoryProgress}/${checklist.categories[catIndex].items.length}`;

        // Toggle checked class on parent label
        e.target.closest('.learning-item').classList.toggle('checked', e.target.checked);
      });
    });
  }

  // Links
  document.getElementById('heroDetailLinks').innerHTML =
    hero.links.map(l => `
      <a href="${l.url}" target="_blank" class="hero-link">
        <span>${l.icon}</span>
        <span>${l.name}</span>
      </a>
    `).join('');

  // PATCH NOTES
  if (hero.patchNotes) {
    const pn = hero.patchNotes;
    const patchNotesHtml = `
      <div class="patch-notes-container">
        <div class="patch-notes-header">
          <h3>📋 Patch ${pn.version} - Current Meta</h3>
          <span class="patch-tier ${pn.tier.toLowerCase().replace(/[^a-z]/g, '')}">${pn.tier}</span>
        </div>

        ${pn.topBuilds && pn.topBuilds.length > 0 ? `
          <div class="patch-section">
            <h4>🏆 Top Builds</h4>
            <div class="build-tags">
              ${pn.topBuilds.map(b => `<span class="build-tag">${b}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        ${pn.newItems && pn.newItems.length > 0 ? `
          <div class="patch-section">
            <h4>◈ New Items</h4>
            <ul class="patch-list new-items">
              ${pn.newItems.map(i => `<li>${i}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${pn.buffs && pn.buffs.length > 0 ? `
          <div class="patch-section">
            <h4>▲ Buffs</h4>
            <ul class="patch-list buffs">
              ${pn.buffs.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${pn.nerfs && pn.nerfs.length > 0 ? `
          <div class="patch-section">
            <h4>▼ Nerfs</h4>
            <ul class="patch-list nerfs">
              ${pn.nerfs.map(n => `<li>${n}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${pn.metaNote ? `
          <div class="patch-section">
            <div class="meta-note">
              <strong>Meta Analysis:</strong> ${pn.metaNote}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Insert after links section in hero detail page
    const linksContainer = document.getElementById('heroDetailLinks').parentElement;
    let patchNotesEl = document.getElementById('heroPatchNotes');
    if (!patchNotesEl) {
      patchNotesEl = document.createElement('div');
      patchNotesEl.id = 'heroPatchNotes';
      patchNotesEl.className = 'hero-section hero-patch-notes-section';
      linksContainer.parentElement.insertBefore(patchNotesEl, linksContainer.nextSibling);
    }
    patchNotesEl.innerHTML = patchNotesHtml;
  }

  // MASTERY DISPLAY
  const mastery = calculateHeroMastery(heroId);
  const badge = getMasteryBadge(mastery.level);
  const avgWins = mastery.plays > 0 ? (mastery.totalWins / mastery.plays).toFixed(1) : '0.0';
  const nextLevelXP = (mastery.level + 1) * 100;
  const xpProgress = ((mastery.xp % 100) / 100 * 100).toFixed(0);

  document.getElementById('heroMasteryDisplay').innerHTML = `
    <div class="mastery-banner">
      <div class="mastery-badge-large" style="background: ${badge.color}">
        <span class="mastery-icon-large">${badge.icon}</span>
        <div class="mastery-rank">${badge.name}</div>
        <div class="mastery-level-large">Level ${mastery.level}</div>
      </div>
      <div class="mastery-stats-grid">
        <div class="mastery-stat">
          <div class="mastery-stat-value">${mastery.plays}</div>
          <div class="mastery-stat-label">Games Played</div>
        </div>
        <div class="mastery-stat">
          <div class="mastery-stat-value">${avgWins}</div>
          <div class="mastery-stat-label">Avg Wins</div>
        </div>
        <div class="mastery-stat">
          <div class="mastery-stat-value">${mastery.bestRun}</div>
          <div class="mastery-stat-label">Best Run</div>
        </div>
        <div class="mastery-stat">
          <div class="mastery-stat-value">${mastery.wins}</div>
          <div class="mastery-stat-label">10-Win Runs</div>
        </div>
      </div>
    </div>
    <div class="mastery-progress-container">
      <div class="mastery-progress-label">
        <span>Progress to Level ${mastery.level + 1}</span>
        <span>${mastery.xp % 100} / 100 XP</span>
      </div>
      <div class="mastery-progress-bar">
        <div class="mastery-progress-fill" style="width: ${xpProgress}%"></div>
      </div>
    </div>
  `;

  // BUILD PROGRESSION TIMELINE
  const progression = heroProgression[heroId];
  if (progression) {
    document.getElementById('heroProgressionTimeline').innerHTML = `
      <div class="progression-phases">
        <div class="progression-phase early-phase">
          <div class="phase-header">
            <span class="phase-icon">◐</span>
            <span class="phase-name">Early Game</span>
            <span class="phase-days">Days 1-3</span>
          </div>
          <div class="phase-items">
            ${progression.early.map(item => `
              <div class="progression-item priority-${item.priority}">
                <div class="progression-item-header">
                  <span class="progression-item-name">${item.name}</span>
                  <span class="progression-priority ${item.priority}">${item.priority.toUpperCase()}</span>
                </div>
                <p class="progression-item-reason">${item.reason}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="progression-connector">→</div>

        <div class="progression-phase mid-phase">
          <div class="phase-header">
            <span class="phase-icon">☀</span>
            <span class="phase-name">Mid Game</span>
            <span class="phase-days">Days 4-6</span>
          </div>
          <div class="phase-items">
            ${progression.mid.map(item => `
              <div class="progression-item priority-${item.priority}">
                <div class="progression-item-header">
                  <span class="progression-item-name">${item.name}</span>
                  <span class="progression-priority ${item.priority}">${item.priority.toUpperCase()}</span>
                </div>
                <p class="progression-item-reason">${item.reason}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="progression-connector">→</div>

        <div class="progression-phase late-phase">
          <div class="phase-header">
            <span class="phase-icon">☽</span>
            <span class="phase-name">Late Game</span>
            <span class="phase-days">Days 7+</span>
          </div>
          <div class="phase-items">
            ${progression.late.map(item => `
              <div class="progression-item priority-${item.priority}">
                <div class="progression-item-header">
                  <span class="progression-item-name">${item.name}</span>
                  <span class="progression-priority ${item.priority}">${item.priority.toUpperCase()}</span>
                </div>
                <p class="progression-item-reason">${item.reason}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ITEM KNOWLEDGE BASE
  const itemKnowledge = heroItemKnowledge[heroId];
  if (itemKnowledge) {
    const getTierClass = (tier) => {
      return `tier-${tier.toLowerCase()}`;
    };

    const getTierBadge = (tier) => {
      const badges = { 'S': '◆', 'A': '▲', 'B': '▼', 'C': '○', 'D': '◌' };
      return badges[tier] || tier;
    };

    document.getElementById('heroItemKnowledge').innerHTML = `
      <div class="item-knowledge-header">
        <h3>Item Knowledge Base</h3>
        <div class="knowledge-filters">
          <button class="knowledge-filter active" data-stage="all">All Stages</button>
          <button class="knowledge-filter" data-stage="early">Early</button>
          <button class="knowledge-filter" data-stage="mid">Mid</button>
          <button class="knowledge-filter" data-stage="late">Late</button>
        </div>
      </div>

      <div class="item-knowledge-grid">
        ${itemKnowledge.items.map(item => `
          <div class="knowledge-item-card" data-tags="${item.tags.join(' ')}" data-early-tier="${item.tier.early}" data-mid-tier="${item.tier.mid}" data-late-tier="${item.tier.late}">
            <div class="knowledge-item-header">
              <h4 class="knowledge-item-name">${item.name}</h4>
              <div class="knowledge-item-tiers">
                <span class="tier-badge ${getTierClass(item.tier.early)}" title="Early Game">
                  <span class="tier-label">E</span> ${getTierBadge(item.tier.early)}
                </span>
                <span class="tier-badge ${getTierClass(item.tier.mid)}" title="Mid Game">
                  <span class="tier-label">M</span> ${getTierBadge(item.tier.mid)}
                </span>
                <span class="tier-badge ${getTierClass(item.tier.late)}" title="Late Game">
                  <span class="tier-label">L</span> ${getTierBadge(item.tier.late)}
                </span>
              </div>
            </div>

            <div class="knowledge-item-tags">
              ${item.tags.map(tag => `<span class="item-tag tag-${tag}">${tag}</span>`).join('')}
            </div>

            <p class="knowledge-item-desc">${item.description}</p>

            ${item.synergies.length > 0 ? `
              <div class="knowledge-synergies">
                <div class="synergy-label">Synergies:</div>
                <div class="synergy-list">
                  ${item.synergies.map(syn => `<span class="synergy-item">${syn}</span>`).join('')}
                </div>
              </div>
            ` : ''}

            ${item.combos.length > 0 ? `
              <div class="knowledge-combos">
                ${item.combos.map(combo => `
                  <div class="combo-item">
                    <div class="combo-items">${combo.items.join(' + ')}</div>
                    <div class="combo-effect">${combo.effect}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;

    // Add filter functionality
    const filters = document.querySelectorAll('.knowledge-filter');
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Update active filter
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        const stage = filter.dataset.stage;
        const cards = document.querySelectorAll('.knowledge-item-card');

        cards.forEach(card => {
          if (stage === 'all') {
            card.style.display = '';
          } else {
            const tierKey = `${stage}Tier`;
            const tier = card.dataset[tierKey];
            // Show items that are A or S tier for the selected stage
            if (tier === 'S' || tier === 'A') {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // MATCHUP MATRIX
  const matchups = heroMatchups[heroId] || {};
  const allHeroes = Object.keys(heroData);
  document.getElementById('heroMatchupGrid').innerHTML = `
    <div class="matchup-cards">
      ${allHeroes.filter(h => h !== heroId).map(opponentId => {
        const winRate = matchups[opponentId] || 0.50;
        const winRatePercent = (winRate * 100).toFixed(0);
        const matchupClass = winRate >= 0.55 ? 'favorable' : winRate >= 0.45 ? 'even' : 'unfavorable';
        const opponent = heroData[opponentId];

        return `
          <div class="matchup-card ${matchupClass}">
            <div class="matchup-header">
              <img src="${opponent.portrait}" alt="${opponent.name}" class="matchup-portrait">
              <div class="matchup-info">
                <div class="matchup-name">${opponent.name}</div>
                <div class="matchup-style">${opponent.style}</div>
              </div>
            </div>
            <div class="matchup-winrate">
              <div class="matchup-percentage">${winRatePercent}%</div>
              <div class="matchup-bar">
                <div class="matchup-bar-fill ${matchupClass}" style="width: ${winRatePercent}%"></div>
              </div>
              <div class="matchup-label">${matchupClass.toUpperCase()}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // PERFORMANCE COMPARISON
  const globalAvg = state.runs.length > 0 ?
    (state.runs.reduce((sum, r) => sum + r.wins, 0) / state.runs.length).toFixed(1) : '0.0';
  const heroAvg = avgWins;
  const trend = mastery.plays >= 5 ?
    (mastery.totalWins / mastery.plays) > parseFloat(globalAvg) ? 'trending-up' : 'trending-down' : 'stable';

  document.getElementById('heroPerformanceStats').innerHTML = `
    <div class="performance-comparison">
      <div class="performance-card your-performance">
        <div class="performance-hero-icon">
          <img src="${hero.portrait}" alt="${hero.name}">
        </div>
        <div class="performance-data">
          <div class="performance-value ${trend}">${heroAvg}</div>
          <div class="performance-label">Your Avg with ${hero.name}</div>
          ${trend !== 'stable' ? `<div class="performance-trend ${trend}">
            ${trend === 'trending-up' ? '📈 Above average' : '📉 Below average'}
          </div>` : ''}
        </div>
      </div>

      <div class="performance-divider">vs</div>

      <div class="performance-card global-performance">
        <div class="performance-icon">🌐</div>
        <div class="performance-data">
          <div class="performance-value">${globalAvg}</div>
          <div class="performance-label">Your Overall Avg</div>
          <div class="performance-subtext">${state.runs.length} total runs</div>
        </div>
      </div>
    </div>

    ${mastery.plays < 5 ? `
      <div class="performance-tip">
        <span class="tip-icon">💡</span>
        <span>Play ${5 - mastery.plays} more games with ${hero.name} to unlock performance trends</span>
      </div>
    ` : ''}

    <div class="performance-recommendations">
      <h4>Recommendations</h4>
      <div class="recommendation-list">
        ${mastery.plays === 0 ? `
          <div class="recommendation">
            <span class="rec-icon">🎮</span>
            <span>Try your first game with ${hero.name} to start tracking mastery</span>
          </div>
        ` : ''}
        ${mastery.plays > 0 && mastery.plays < 10 ? `
          <div class="recommendation">
            <span class="rec-icon">📊</span>
            <span>Play ${10 - mastery.plays} more games to establish reliable stats</span>
          </div>
        ` : ''}
        ${trend === 'trending-down' ? `
          <div class="recommendation">
            <span class="rec-icon">📚</span>
            <span>Review build guides and progression timeline above for optimization</span>
          </div>
        ` : ''}
        ${mastery.wins === 0 && mastery.plays > 5 ? `
          <div class="recommendation">
            <span class="rec-icon">⚡</span>
            <span>Try focusing on builds marked as "MUST" in the progression guide</span>
          </div>
        ` : ''}
        ${trend === 'trending-up' ? `
          <div class="recommendation">
            <span class="rec-icon">🌟</span>
            <span>You're performing well! Keep practicing to reach Level ${mastery.level + 5}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function backToHeroGrid() {
  const grid = document.getElementById('heroGrid');
  const detail = document.getElementById('heroDetail');
  if (grid) grid.style.display = '';
  if (detail) detail.classList.remove('active');
  currentHero = null;
}

// Back button
document.getElementById('backToHeroes')?.addEventListener('click', backToHeroGrid);

function filterHeroes() {
  const search = document.getElementById('heroSearch')?.value.toLowerCase() || '';
  const difficultyFilter = document.getElementById('heroDifficultyFilter')?.value || '';
  const heroCards = document.querySelectorAll('.hero-card');

  heroCards.forEach(card => {
    const heroName = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const heroStyle = card.querySelector('.hero-style')?.textContent.toLowerCase() || '';
    const heroDifficulty = card.querySelector('.hero-difficulty')?.textContent || '';
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

// Initialize hero grid on page load
renderHeroGrid();

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

// ==========================================
// CHARTS
// ==========================================

function renderCharts() {
  renderWinRateChart();
  renderHeroPerformanceChart();
}

function renderWinRateChart() {
  const container = document.getElementById('winRateChart');
  if (!container || state.runs.length < 2) return;

  // Take last 10 runs for trend
  const recentRuns = state.runs.slice(-10);
  const maxWins = Math.max(...recentRuns.map(r => r.wins), 10);

  container.innerHTML = `
    <div class="bar-chart">
      ${recentRuns.map((run, index) => {
        const height = (run.wins / maxWins) * 100;
        const colorClass = run.wins >= 8 ? 'high' : run.wins >= 5 ? 'mid' : 'low';
        return `
          <div class="bar-wrapper">
            <div class="bar ${colorClass}" style="height: ${height}%" title="${run.hero}: ${run.wins} wins">
              <span class="bar-label">${run.wins}</span>
            </div>
            <span class="bar-date">${index + 1}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderHeroPerformanceChart() {
  const container = document.getElementById('heroPerformanceChart');
  if (!container || state.runs.length === 0) return;

  // Calculate average wins per hero
  const heroStats = {};
  state.runs.forEach(run => {
    if (!heroStats[run.hero]) {
      heroStats[run.hero] = { total: 0, count: 0 };
    }
    heroStats[run.hero].total += run.wins;
    heroStats[run.hero].count += 1;
  });

  const heroData = Object.entries(heroStats).map(([hero, stats]) => ({
    hero,
    avg: stats.total / stats.count,
    count: stats.count
  })).sort((a, b) => b.avg - a.avg);

  const maxAvg = Math.max(...heroData.map(h => h.avg), 10);

  container.innerHTML = `
    <div class="hero-bars">
      ${heroData.map(data => {
        const width = (data.avg / maxAvg) * 100;
        const colorClass = data.avg >= 8 ? 'high' : data.avg >= 5 ? 'mid' : 'low';
        return `
          <div class="hero-bar-row">
            <span class="hero-bar-label">${capitalize(data.hero)}</span>
            <div class="hero-bar-track">
              <div class="hero-bar ${colorClass}" style="width: ${width}%">
                <span class="hero-bar-value">${data.avg.toFixed(1)} avg (${data.count} runs)</span>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

renderCharts();

// ==========================================
// GLOBAL SMART SEARCH
// ==========================================

const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('smartSearchInput');
const searchResults = document.getElementById('searchResults');
const searchTrigger = document.getElementById('searchTrigger');
const searchBackdrop = document.getElementById('searchBackdrop');

// Debug: Log search elements
console.log('Smart Search Init:', {
  modal: !!searchModal,
  input: !!searchInput,
  results: !!searchResults,
  trigger: !!searchTrigger
});

let selectedResultIndex = -1;
let currentResults = [];

// Hero data for search (simplified version)
const searchHeroData = [
  { name: 'Vanessa', style: 'Burn & Burst', difficulty: 'Medium', id: 'vanessa' },
  { name: 'Pygmalien', style: 'Shield & Economy', difficulty: 'Easy', id: 'pygmalien' },
  { name: 'Dooley', style: 'Tech & Cores', difficulty: 'Hard', id: 'dooley' },
  { name: 'Mak', style: 'Potions & Healing', difficulty: 'Medium', id: 'mak' },
  { name: 'Stelle', style: 'Vehicles & Bots', difficulty: 'Medium', id: 'stelle' },
  { name: 'Jules', style: 'Food & Buffs', difficulty: 'Easy', id: 'jules' }
];

// Open search modal
function openSearch() {
  if (!searchModal || !searchInput) return;
  searchModal.classList.add('active');
  searchInput.value = '';
  searchInput.focus();
  selectedResultIndex = -1;
  renderSearchHint();
}

// Close search modal
function closeSearch() {
  if (!searchModal) return;
  searchModal.classList.remove('active');
  if (searchInput) searchInput.value = '';
}

// Render initial hint
function renderSearchHint() {
  if (!searchResults) return;
  searchResults.innerHTML = `
    <div class="search-hint">
      <p>Search everything - local and external</p>
      <div class="search-shortcuts">
        <div class="shortcuts-section">
          <strong>Local Filters</strong>
          <span><code>item:</code> Items</span>
          <span><code>hero:</code> Heroes</span>
          <span><code>build:</code> Builds</span>
          <span><code>guide:</code> Guides</span>
        </div>
        <div class="shortcuts-section">
          <strong>Instant External Search</strong>
          <span><code>db:</code> BazaarDB</span>
          <span><code>reddit:</code> Community</span>
          <span><code>wiki:</code> Wiki</span>
          <span><code>mob:</code> Mobalytics</span>
          <span><code>builds:</code> Builds Site</span>
        </div>
      </div>
    </div>
  `;
}

// Perform search across all content
function performSearch(query) {
  if (!searchResults) return;
  if (!query.trim()) {
    renderSearchHint();
    currentResults = [];
    return;
  }

  const q = query.toLowerCase().trim();
  let filter = null;
  let searchTerm = q;

  // Check for external site prefix (instant redirect)
  if (q.startsWith('db:')) {
    const dbQuery = encodeURIComponent(q.slice(3).trim());
    window.open(`https://bazaardb.gg/?search=${dbQuery}`, '_blank');
    closeSearch();
    return;
  } else if (q.startsWith('reddit:')) {
    const redditQuery = encodeURIComponent(q.slice(7).trim());
    window.open(`https://www.reddit.com/r/PlayTheBazaar/search/?q=${redditQuery}`, '_blank');
    closeSearch();
    return;
  } else if (q.startsWith('wiki:')) {
    const wikiQuery = encodeURIComponent(q.slice(5).trim());
    window.open(`https://thebazaar.wiki.gg/index.php?search=${wikiQuery}`, '_blank');
    closeSearch();
    return;
  } else if (q.startsWith('mobalytics:') || q.startsWith('mob:')) {
    const offset = q.startsWith('mobalytics:') ? 11 : 4;
    const mobQuery = encodeURIComponent(q.slice(offset).trim());
    window.open(`https://mobalytics.gg/the-bazaar/search?query=${mobQuery}`, '_blank');
    closeSearch();
    return;
  } else if (q.startsWith('builds:')) {
    const buildsQuery = encodeURIComponent(q.slice(7).trim());
    window.open(`https://bazaar-builds.net/?s=${buildsQuery}`, '_blank');
    closeSearch();
    return;
  }

  // Check for local filter prefix
  if (q.startsWith('item:')) {
    filter = 'item';
    searchTerm = q.slice(5).trim();
  } else if (q.startsWith('hero:')) {
    filter = 'hero';
    searchTerm = q.slice(5).trim();
  } else if (q.startsWith('build:')) {
    filter = 'build';
    searchTerm = q.slice(6).trim();
  } else if (q.startsWith('guide:')) {
    filter = 'guide';
    searchTerm = q.slice(6).trim();
  }

  const results = {
    items: [],
    heroes: [],
    builds: [],
    guides: []
  };

  // Search items
  if (!filter || filter === 'item') {
    results.items = state.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.tags.some(t => t.toLowerCase().includes(searchTerm)) ||
      item.hero.toLowerCase().includes(searchTerm)
    ).slice(0, 8);
  }

  // Search heroes
  if (!filter || filter === 'hero') {
    results.heroes = searchHeroData.filter(hero =>
      hero.name.toLowerCase().includes(searchTerm) ||
      hero.style.toLowerCase().includes(searchTerm)
    );
  }

  // Search saved builds
  if (!filter || filter === 'build') {
    results.builds = state.builds.filter(build =>
      build.name.toLowerCase().includes(searchTerm) ||
      build.hero.toLowerCase().includes(searchTerm) ||
      (build.coreItems && build.coreItems.toLowerCase().includes(searchTerm))
    ).slice(0, 5);
  }

  // Search meta guides
  if (!filter || filter === 'guide') {
    results.guides = metaGuides.filter(guide =>
      guide.name.toLowerCase().includes(searchTerm) ||
      guide.hero.toLowerCase().includes(searchTerm) ||
      guide.overview.toLowerCase().includes(searchTerm)
    ).slice(0, 5);
  }

  renderSearchResults(results, searchTerm);
}

// Render search results
function renderSearchResults(results, query) {
  const hasResults = results.items.length || results.heroes.length ||
                     results.builds.length || results.guides.length;

  if (!hasResults) {
    searchResults.innerHTML = `
      <div class="search-no-results">
        <p>No results for "${query}"</p>
        <span>Try a different search term</span>
      </div>
    `;
    currentResults = [];
    return;
  }

  let html = '';
  currentResults = [];

  // Guides section
  if (results.guides.length) {
    html += '<div class="search-category">Guides</div>';
    results.guides.forEach(guide => {
      currentResults.push({ type: 'guide', data: guide });
      html += `
        <div class="search-result-item" data-type="guide" data-id="${guide.id}">
          <div class="search-result-icon">
            <img src="${getItemImageUrl(guide.coreItems[0]?.name || guide.name)}"
                 onerror="this.parentElement.innerHTML='<span class=\\'emoji\\'>📖</span>'"
                 alt="${guide.name}">
          </div>
          <div class="search-result-info">
            <div class="search-result-name">${highlightMatch(guide.name, query)}</div>
            <div class="search-result-meta">
              <span class="search-result-tag tier-${guide.tier}">${guide.tier.toUpperCase()}</span>
              <span>${capitalize(guide.hero)}</span>
            </div>
          </div>
          <span class="search-result-enter">↵</span>
        </div>
      `;
    });
  }

  // Items section
  if (results.items.length) {
    html += '<div class="search-category">Items</div>';
    results.items.forEach(item => {
      currentResults.push({ type: 'item', data: item });
      html += `
        <div class="search-result-item" data-type="item" data-name="${item.name}">
          <div class="search-result-icon">
            <img src="${getItemImageUrl(item.name)}"
                 onerror="this.src='${getItemPlaceholder(item.name, item.tier)}'"
                 alt="${item.name}">
          </div>
          <div class="search-result-info">
            <div class="search-result-name">${highlightMatch(item.name, query)}</div>
            <div class="search-result-meta">
              <span class="search-result-tag ${item.tier}">${item.tier}</span>
              <span>${capitalize(item.hero)}</span>
              <span>${item.size}</span>
            </div>
          </div>
          <span class="search-result-enter">↵</span>
        </div>
      `;
    });
  }

  // Heroes section
  if (results.heroes.length) {
    html += '<div class="search-category">Heroes</div>';
    results.heroes.forEach(hero => {
      currentResults.push({ type: 'hero', data: hero });
      html += `
        <div class="search-result-item" data-type="hero" data-id="${hero.id}">
          <div class="search-result-icon">
            <span class="emoji">${getHeroEmoji(hero.id)}</span>
          </div>
          <div class="search-result-info">
            <div class="search-result-name">${highlightMatch(hero.name, query)}</div>
            <div class="search-result-meta">
              <span>${hero.style}</span>
              <span>${hero.difficulty}</span>
            </div>
          </div>
          <span class="search-result-enter">↵</span>
        </div>
      `;
    });
  }

  // Saved builds section
  if (results.builds.length) {
    html += '<div class="search-category">My Builds</div>';
    results.builds.forEach(build => {
      currentResults.push({ type: 'build', data: build });
      html += `
        <div class="search-result-item" data-type="build" data-id="${build.id}">
          <div class="search-result-icon">
            <span class="emoji">🏗</span>
          </div>
          <div class="search-result-info">
            <div class="search-result-name">${highlightMatch(build.name, query)}</div>
            <div class="search-result-meta">
              <span class="search-result-tag tier-${build.tier}">${build.tier.toUpperCase()}</span>
              <span>${capitalize(build.hero)}</span>
            </div>
          </div>
          <span class="search-result-enter">↵</span>
        </div>
      `;
    });
  }

  // External Resources Section (always show if there's a query)
  if (query && query.trim()) {
    const encodedQuery = encodeURIComponent(query.trim());
    html += `
      <div class="search-category search-external-header">
        <span>🔗 Search External Sites</span>
        <span class="search-external-hint">Open in new tab</span>
      </div>
      <div class="search-external-links">
        <a href="https://bazaardb.gg/?search=${encodedQuery}" target="_blank" class="search-external-link">
          <span class="external-icon">📊</span>
          <span class="external-name">BazaarDB</span>
          <span class="external-desc">Items, stats, enchants</span>
        </a>
        <a href="https://mobalytics.gg/the-bazaar/search?query=${encodedQuery}" target="_blank" class="search-external-link">
          <span class="external-icon">📖</span>
          <span class="external-name">Mobalytics</span>
          <span class="external-desc">Guides & meta builds</span>
        </a>
        <a href="https://bazaar-builds.net/?s=${encodedQuery}" target="_blank" class="search-external-link">
          <span class="external-icon">🏗️</span>
          <span class="external-name">Bazaar Builds</span>
          <span class="external-desc">10-win builds</span>
        </a>
        <a href="https://www.reddit.com/r/PlayTheBazaar/search/?q=${encodedQuery}" target="_blank" class="search-external-link">
          <span class="external-icon">💬</span>
          <span class="external-name">Reddit</span>
          <span class="external-desc">Community discussions</span>
        </a>
        <a href="https://thebazaar.wiki.gg/index.php?search=${encodedQuery}" target="_blank" class="search-external-link">
          <span class="external-icon">📚</span>
          <span class="external-name">Wiki</span>
          <span class="external-desc">Game info & mechanics</span>
        </a>
        <a href="https://discord.com/invite/playthebazaar" target="_blank" class="search-external-link">
          <span class="external-icon">💬</span>
          <span class="external-name">Discord</span>
          <span class="external-desc">Ask the community</span>
        </a>
      </div>
    `;
  }

  searchResults.innerHTML = html;
  selectedResultIndex = -1;

  // Add click handlers
  searchResults.querySelectorAll('.search-result-item').forEach((el, idx) => {
    el.addEventListener('click', () => selectResult(idx));
  });
}

// Highlight matching text
function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Get hero emoji
function getHeroEmoji(heroId) {
  const emojis = {
    vanessa: '▲',
    pygmalien: '◈',
    dooley: '⚙',
    mak: '⚗',
    stelle: '✈',
    jules: '◉'
  };
  return emojis[heroId] || '◆';
}

// Select a result
function selectResult(index) {
  if (index < 0 || index >= currentResults.length) return;

  const result = currentResults[index];
  closeSearch();

  switch (result.type) {
    case 'guide':
      document.querySelector('.tab[data-tab="guides"]').click();
      setTimeout(() => showGuideDetail(result.data.id), 100);
      break;
    case 'item':
      document.querySelector('.tab[data-tab="items"]').click();
      setTimeout(() => {
        const itemSearch = document.getElementById('itemSearch');
        if (itemSearch) {
          itemSearch.value = result.data.name;
          renderItems();
        }
      }, 100);
      break;
    case 'hero':
      document.querySelector('.tab[data-tab="heroes"]').click();
      setTimeout(() => {
        const heroSearch = document.getElementById('heroSearch');
        if (heroSearch) {
          heroSearch.value = result.data.name;
          filterHeroes();
        }
      }, 100);
      break;
    case 'build':
      document.querySelector('.tab[data-tab="builds"]').click();
      break;
  }
}

// Keyboard navigation
function handleSearchKeydown(e) {
  const items = searchResults.querySelectorAll('.search-result-item');

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      selectedResultIndex = Math.min(selectedResultIndex + 1, items.length - 1);
      updateSelectedResult(items);
      break;
    case 'ArrowUp':
      e.preventDefault();
      selectedResultIndex = Math.max(selectedResultIndex - 1, 0);
      updateSelectedResult(items);
      break;
    case 'Enter':
      e.preventDefault();
      if (selectedResultIndex >= 0) {
        selectResult(selectedResultIndex);
      }
      break;
    case 'Escape':
      closeSearch();
      break;
  }
}

function updateSelectedResult(items) {
  items.forEach((el, idx) => {
    el.classList.toggle('selected', idx === selectedResultIndex);
    if (idx === selectedResultIndex) {
      el.scrollIntoView({ block: 'nearest' });
    }
  });
}

// Event listeners
searchTrigger?.addEventListener('click', openSearch);
searchBackdrop?.addEventListener('click', closeSearch);
searchInput?.addEventListener('input', (e) => performSearch(e.target.value));
searchInput?.addEventListener('keydown', handleSearchKeydown);

// Global keyboard shortcut: Ctrl+K
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (searchModal && searchModal.classList.contains('active')) {
      closeSearch();
    } else {
      openSearch();
    }
  }
});

// Auto-open search when typing anywhere (like BazaarDB)
document.addEventListener('keydown', (e) => {
  // Skip if search elements don't exist
  if (!searchModal || !searchInput) {
    console.log('Search elements missing');
    return;
  }

  // Skip if search is already open
  if (searchModal.classList.contains('active')) return;

  // Skip if user is in an input, textarea, or contenteditable
  const target = e.target;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' || target.isContentEditable) return;

  // Skip modifier keys, function keys, navigation keys
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key.length !== 1) return; // Only single printable characters

  // Skip non-printable characters
  if (!/^[a-zA-Z0-9]$/.test(e.key)) return;

  // Open search and pass the typed character
  console.log('Opening search with key:', e.key);
  e.preventDefault();
  openSearch();
  searchInput.value = e.key;
  performSearch(e.key);
});

// ==========================================
// ITEM TOOLTIP SYSTEM
// ==========================================

let tooltipEl = null;
let tooltipTimeout = null;

// Create tooltip element
function createTooltip() {
  if (tooltipEl) return;
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'item-tooltip';
  tooltipEl.style.display = 'none';
  document.body.appendChild(tooltipEl);
}

// Show tooltip for an item
function showItemTooltip(item, targetEl) {
  if (!tooltipEl) createTooltip();

  // Build tooltip content
  const statsHtml = [];
  if (item.damage) statsHtml.push(`<span class="tooltip-stat damage">${item.damage} Damage</span>`);
  if (item.heal) statsHtml.push(`<span class="tooltip-stat heal">${item.heal} Heal</span>`);
  if (item.shield) statsHtml.push(`<span class="tooltip-stat shield">${item.shield} Shield</span>`);
  if (item.cooldown) statsHtml.push(`<span class="tooltip-stat cooldown">${item.cooldown}s Cooldown</span>`);

  tooltipEl.innerHTML = `
    <div class="tooltip-header tier-${item.tier}">
      <img class="tooltip-icon"
           src="${getItemImageUrl(item.name)}"
           onerror="this.src='${getItemPlaceholder(item.name, item.tier)}'"
           alt="${item.name}">
      <div class="tooltip-title">
        <div class="tooltip-name">${item.name}</div>
        <div class="tooltip-meta">
          <span class="tooltip-tier ${item.tier}">${capitalize(item.tier)}</span>
          <span class="tooltip-size">${capitalize(item.size)}</span>
          <span class="tooltip-hero">${capitalize(item.hero)}</span>
        </div>
      </div>
    </div>
    ${statsHtml.length ? `<div class="tooltip-stats">${statsHtml.join('')}</div>` : ''}
    <div class="tooltip-effect">${item.effect || 'No effect description available.'}</div>
    <div class="tooltip-tags">${item.tags.map(t => `<span class="tooltip-tag">${t}</span>`).join('')}</div>
  `;

  // Position tooltip
  const rect = targetEl.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();

  let left = rect.right + 12;
  let top = rect.top;

  // If tooltip would go off right edge, show on left
  if (left + 320 > window.innerWidth) {
    left = rect.left - 320 - 12;
  }

  // If tooltip would go off bottom, adjust up
  if (top + 200 > window.innerHeight) {
    top = window.innerHeight - 220;
  }

  // If still off screen (left), center it below
  if (left < 0) {
    left = Math.max(10, rect.left + rect.width / 2 - 160);
    top = rect.bottom + 12;
  }

  tooltipEl.style.left = `${left}px`;
  tooltipEl.style.top = `${top}px`;
  tooltipEl.style.display = 'block';
}

// Hide tooltip
function hideItemTooltip() {
  if (tooltipEl) {
    tooltipEl.style.display = 'none';
  }
}

// Attach tooltip handlers to item cards
function attachItemTooltips() {
  const itemCards = document.querySelectorAll('.item-card[data-item-name]');

  itemCards.forEach(card => {
    const itemName = card.dataset.itemName;
    const item = state.items.find(i => i.name === itemName);
    if (!item) return;

    card.addEventListener('mouseenter', () => {
      clearTimeout(tooltipTimeout);
      tooltipTimeout = setTimeout(() => showItemTooltip(item, card), 150);
    });

    card.addEventListener('mouseleave', () => {
      clearTimeout(tooltipTimeout);
      tooltipTimeout = setTimeout(hideItemTooltip, 100);
    });
  });
}

// Initialize tooltip element
createTooltip();

// ==========================================
// HERO LEARNING CHECKLISTS
// ==========================================

const heroLearningChecklists = {
  vanessa: {
    name: 'Vanessa',
    categories: [
      {
        name: 'Core Items Recognition',
        icon: '🎯',
        items: [
          'Spot Incendiary Rounds instantly (burn enabler)',
          'Know when to buy Powder Keg (after Incendiary)',
          'Recognize Oni Mask value (Burn + Crit)',
          'Prioritize Tracer Fire for ammo spam',
          'Identify Flame Signal burn amplifier',
          'Understand Ramrod buffed CD (5→3)',
          'Spot Lighthouse pivot potential',
          'Distinguish burn appliers vs burn scalers'
        ]
      },
      {
        name: 'Synergy Patterns',
        icon: '⚯',
        items: [
          'Burn chain: Incendiary → Keg → Oni → Signal',
          'Crit multiplies burn damage',
          'CDR = more burn application',
          'Spot burn-to-ammo pivot moments',
          'Multi-weapon vs single-weapon awareness',
          'Understand Powder Keg explosion stacks'
        ]
      },
      {
        name: 'Encounter Decisions',
        icon: '⚔️',
        items: [
          'Accept weak early game',
          'Farm slow monsters (stack burn)',
          'Avoid burst before sustain',
          'Calculate Prestige loss (= day number)',
          'Know when burn is online',
          'Recognize favorable burn matchups'
        ]
      },
      {
        name: 'Win Condition Setup',
        icon: '🏆',
        items: [
          'Late-game needs Keg + Oni + Crit',
          'Position burn applicators optimally',
          'Have backup damage option',
          'Recognize unstoppable burn stacks',
          'Add Freeze/Control when ahead'
        ]
      },
      {
        name: 'Common Mistakes',
        icon: '⚠️',
        items: [
          'AVOID: Powder Keg without burn enabler',
          'AVOID: Forcing burn if no Incendiary',
          'AVOID: Skipping Crit items',
          'AVOID: Fighting freeze when burn-dependent',
          'REMEMBER: Ammo-aggro is viable alternative'
        ]
      }
    ]
  },
  
  mak: {
    name: 'Mak',
    categories: [
      {
        name: 'Build Path Recognition',
        icon: '🛤️',
        items: [
          'Know Mak has 3+ viable builds (not just Peacewrought!)',
          'Recognize Poppy Field is A-tier (poison focus)',
          'Know Magnus\' Femur is A-tier (Patch 9.0 synergies)',
          'Understand Potions dropped to C-tier (post-Catalyst rework)',
          'Identify which build is appearing in shops',
          'Know when to commit vs stay flexible (Days 4-5)',
          'Build priority: Poppy Field > Magnus\' Femur > others'
        ]
      },
      {
        name: 'Core Items (All Builds)',
        icon: '🎯',
        items: [
          'POPPY FIELD: Spot as core poison piece',
          'POPPY FIELD: Recognize poison applicators (self-poison)',
          'POPPY FIELD: Know Switchblade (+1 per stack post-nerf)',
          'MAGNUS\' FEMUR: Recognize as A-tier core',
          'MAGNUS\' FEMUR: Spot Book of Secrets synergies',
          'MAGNUS\' FEMUR: Identify Spider Fern opportunities',
          'POTIONS: Know it\'s C-tier now (only if forced)',
          'PEACEWROUGHT: Understand viability is unknown'
        ]
      },
      {
        name: 'Synergy Patterns',
        icon: '⚯',
        items: [
          'Poppy Field: Self-poison → Poppy → Scalers',
          'Poppy Field: Self-poison ≠ healing (bypasses anti-heal)',
          'Magnus\' Femur: Femur → Book of Secrets → Spider Fern',
          'Potions: Vial → Library loop (weaker now)',
          'Peacewrought: Potions → Vial → Rainbow → Moose (if viable)',
          'Know which items work across builds',
          'Recognize build commitment points (Day 4-6)'
        ]
      },
      {
        name: 'Build Selection & Pivoting',
        icon: '🔄',
        items: [
          'Identify which build is forming (Days 1-4)',
          'Commit to A-tier builds (Poppy/Magnus)',
          'AVOID committing to Potions (C-tier)',
          'Recognize when to pivot (missing pieces Day 5)',
          'Understand which build fits current items',
          'Adapt to what the game offers'
        ]
      },
      {
        name: 'Common Mistakes',
        icon: '⚠️',
        items: [
          'CRITICAL: Don\'t force Potions build (it\'s C-tier now!)',
          'CRITICAL: Don\'t ignore Poppy Field & Magnus\' Femur (A-tier!)',
          'AVOID: Assuming Peacewrought is still S-tier',
          'AVOID: Not recognizing new Patch 9.0 items',
          'AVOID: Mixing poison and potion randomly',
          'REMEMBER: Self-poison ≠ healing (different mechanic)',
          'REMEMBER: Poppy Field and Magnus\' Femur are CURRENT A-tier'
        ]
      }
    ]
  },

  pygmalien: {
    name: 'Pygmalien',
    categories: [
      {
        name: 'Core Items Recognition',
        icon: '🎯',
        items: [
          'Spot Business Card instantly (economy)',
          'Know Jabalian Drum (shield → damage)',
          'Recognize Showcase (economy scaling)',
          'Prioritize Safe (gold accumulation)',
          'Understand ATM buffed (shield x2)',
          'Know shield items by tier',
          'Identify Lemonade Stand build',
          'Recognize Cash Cannon scaling'
        ]
      },
      {
        name: 'Synergy Patterns',
        icon: '⚯',
        items: [
          'Shield Stack: Business Card → Shields → Drum → ATM',
          'Economy = more shop options',
          'Shield cycling with CDR',
          'Shields apply before damage',
          'Damage conversion timing (Drum)',
          'Luxury items scale with gold'
        ]
      },
      {
        name: 'Encounter Decisions',
        icon: '⚔️',
        items: [
          'Accept slow early (economy build)',
          'Can afford early losses (building value)',
          'Avoid fighting without shield cycles',
          'Know when Drum online (shield stacks)',
          'Trade Prestige early for gold'
        ]
      },
      {
        name: 'Win Condition Setup',
        icon: '🏆',
        items: [
          'Late: Massive shields + Drum + ATM',
          'Economy affords Diamond items',
          'CDR stacking for shield cycles',
          'Out-value with economy advantage',
          'Scaled past enemy damage'
        ]
      },
      {
        name: 'Common Mistakes',
        icon: '⚠️',
        items: [
          'NEVER skip Business Card early',
          'AVOID: Drum without shields',
          'AVOID: Fighting early (build economy)',
          'REMEMBER: Burn bypasses shields',
          'AVOID: No CDR (shields need cycling)'
        ]
      }
    ]
  },

  dooley: {
    name: 'Dooley',
    categories: [
      {
        name: 'Core Items Recognition',
        icon: '🎯',
        items: [
          'Spot Friends instantly (small Bronze)',
          'Know Core buffs RIGHT items',
          'Recognize GPU (crit king)',
          'Prioritize cheap Friends',
          'Understand Combat Core buff (50-100)',
          'Know Weakpoint buff (5-40)',
          'Identify Dooltron pieces',
          'Launcher vs Critical Core paths'
        ]
      },
      {
        name: 'Synergy Patterns',
        icon: '⚯',
        items: [
          'Chain: Core → Friends → GPU → CDR',
          'Positioning is EVERYTHING (Core buffs RIGHT)',
          'Friends trigger in sequence',
          'Crit chains = exponential damage',
          'Chain crits together',
          'In-combat scaling (post-rework)'
        ]
      },
      {
        name: 'Encounter Decisions',
        icon: '⚔️',
        items: [
          'Mid-game spike (chains online)',
          'AVOID AoE freeze (shuts down chains)',
          'Farm when positioned correctly',
          'Know when Core online (have Friends)',
          'Optimal chain length (not too long)'
        ]
      },
      {
        name: 'Win Condition Setup',
        icon: '🏆',
        items: [
          'Late: Core + 3+ Friends + GPU + CDR',
          'Optimal positioning (Core buffs right)',
          'Fast chain cycles (CDR)',
          'Crit multiplication added',
          'Chains oneshot enemies'
        ]
      },
      {
        name: 'Common Mistakes',
        icon: '⚠️',
        items: [
          'CRITICAL: Core buffs RIGHT not left!',
          'AVOID: Skipping cheap Friends',
          'AVOID: No GPU when building crit',
          'AVOID: Fighting AoE freeze',
          'AVOID: Over-extending chains'
        ]
      }
    ]
  },

  stelle: {
    name: 'Stelle',
    categories: [
      {
        name: 'Core Items Recognition',
        icon: '🎯',
        items: [
          'Spot small vehicles (Flycycle cheap)',
          'Know Lightning Rod is MUST',
          'Recognize Stellar Swallowtail (Flying)',
          'Prioritize Caracara + Aerial Turret',
          'Understand Ornithopter value',
          'Know Gyro Gunsight adds damage',
          'Recognize Clockwork Disc scaling',
          'Identify Space Laser alternative'
        ]
      },
      {
        name: 'Synergy Patterns',
        icon: '⚯',
        items: [
          'Lightning chains between YOUR vehicles',
          'More vehicles = more targets',
          'CDR speeds chains',
          'Crit makes chains devastating',
          'Wide (vehicles) vs Tall (Space Laser)',
          'Flying synergies with Headset'
        ]
      },
      {
        name: 'Encounter Decisions',
        icon: '⚔️',
        items: [
          'Good early tempo (cheap vehicles)',
          'Farm for vehicle drops',
          'AVOID AoE freeze (all vehicles down)',
          'Lightning Rod online at 3+ vehicles',
          'Fight when chain setup ready'
        ]
      },
      {
        name: 'Win Condition Setup',
        icon: '🏆',
        items: [
          'Late: 5+ vehicles for max chains',
          'Position vehicles for optimal chains',
          'CDR for rapid cycles',
          'Crit for chain multiplication',
          'Unstoppable chain setup'
        ]
      },
      {
        name: 'Common Mistakes',
        icon: '⚠️',
        items: [
          'AVOID: Lightning Rod without 3+ vehicles',
          'AVOID: Skipping cheap vehicles',
          'AVOID: AoE freeze builds',
          'REMEMBER: CDR critical for chains',
          'AVOID: Mixing Flying/non-Flying randomly'
        ]
      }
    ]
  },

  jules: {
    name: 'Jules',
    categories: [
      {
        name: 'Core Items Recognition',
        icon: '🎯',
        items: [
          'Spot Grill instantly (burn app)',
          'Know Giant Lollipop scales with sweets',
          'Recognize Dishwasher + Lollipop synergy',
          'Prioritize food for sustain',
          'Understand Stove/Cooler RNG matters',
          'Know Hot Box + Imu (2nd Stove Day 9)',
          'Identify Freezer (Chilled builds)',
          'Recognize spices amplify damage'
        ]
      },
      {
        name: 'Synergy Patterns',
        icon: '⚯',
        items: [
          'Burn: Grill → Food spam → Hot Box + Imu',
          'Lollipop: Dishwasher → Sweets → Excellent Vintage',
          'Heated/Chilled mechanics',
          'Food = sustain advantage',
          'Commit to burn vs freeze',
          'Socket RNG requires flexibility'
        ]
      },
      {
        name: 'Encounter Decisions',
        icon: '⚔️',
        items: [
          'Good sustain (food heals)',
          'Farm when food keeps alive',
          'Avoid anti-heal if food-dependent',
          'Know when Lollipop online (sweets)',
          'Grill needs time to stack burn'
        ]
      },
      {
        name: 'Win Condition Setup',
        icon: '🏆',
        items: [
          'Lollipop: Max sweets + Dishwasher',
          'Burn: 2nd Stove + Hot Box + Imu',
          'Position Grill for max burn',
          'Sustain outlasts (food heals)',
          'Lollipop damage > enemy HP'
        ]
      },
      {
        name: 'Common Mistakes',
        icon: '⚠️',
        items: [
          'AVOID: Burn before Day 9 (no 2nd Stove)',
          'AVOID: Lollipop without sweets',
          'REMEMBER: Socket RNG matters!',
          'REMEMBER: Food sustain advantage',
          'AVOID: Mixing Heated/Chilled randomly'
        ]
      }
    ]
  }
};

// Learning progress functions
function getLearningProgress(heroId) {
  if (!state.learningProgress[heroId]) {
    state.learningProgress[heroId] = {};
  }
  return state.learningProgress[heroId];
}

function toggleLearningItem(heroId, categoryIndex, itemIndex) {
  const progress = getLearningProgress(heroId);
  const key = `${categoryIndex}-${itemIndex}`;
  progress[key] = !progress[key];
  saveLearningProgress();
}

function saveLearningProgress() {
  localStorage.setItem('bazaar-learning-progress', JSON.stringify(state.learningProgress));
}

function calculateLearningPercentage(heroId) {
  const checklist = heroLearningChecklists[heroId];
  if (!checklist) return 0;
  
  const totalItems = checklist.categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const progress = getLearningProgress(heroId);
  const checkedItems = Object.values(progress).filter(v => v === true).length;
  
  return totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
}

