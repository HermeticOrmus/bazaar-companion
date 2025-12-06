# Update Meta Skill

Update The Bazaar meta data for the Bazaar Companion app.

## Trigger

Use this skill when:
- User asks to update the meta
- New patch is released
- Meta feels outdated
- Adding new builds or heroes

## Data Sources (Check in Order)

1. **BazaarDB Patch Notes** - https://bazaardb.gg/patchnotes/{version}
   - Get exact patch version and release date
   - Extract all buffs, nerfs, new items, reworks

2. **Bazaar Builds (Last 48 hours)** - https://bazaar-builds.net/category/builds/
   - Check 10-win builds from last 2 days
   - Note which heroes/builds are winning

3. **Mobalytics Meta Builds** - https://mobalytics.gg/the-bazaar/guides/meta-builds
   - Official tier rankings per hero
   - Build names and descriptions

4. **The Bazaar Zone** - https://thebazaarzone.com/tier-list/
   - Community tier list
   - Cross-reference with other sources

5. **Bazaar Meta Report** - https://bazaarmeta.report/
   - Meta analysis and trends

## Update Checklist

### Step 1: Identify Current Patch
- [ ] Find latest patch number from BazaarDB
- [ ] Note release date
- [ ] Extract key changes (buffs/nerfs/new items)

### Step 2: Gather Build Data Per Hero
For EACH hero (Vanessa, Mak, Pygmalien, Dooley, Stelle, Jules):
- [ ] List ALL meta builds mentioned in sources
- [ ] Note tier ranking (S/A/B/C) from multiple sources
- [ ] Check recent 10-win builds (last 48h)
- [ ] Identify core items and synergies

### Step 3: Validate Against Current Data
- [ ] Read `mechanics/current-meta.md`
- [ ] Read `ui/app.js` metaGuides array
- [ ] Compare source builds vs our builds
- [ ] Flag missing builds
- [ ] Flag incorrect tiers
- [ ] Flag outdated item info

### Step 4: Cross-Check Hero Representation
**Critical**: If a hero is described as "top of meta" or "most versatile":
- [ ] They MUST have multiple S-tier builds (2-3 minimum)
- [ ] Count S-tier builds per hero
- [ ] Ensure representation matches meta claims

### Step 5: Update Files

**Update `mechanics/current-meta.md`:**
- Patch version in title
- S/A/B/C tier tables
- Hero summaries with patch changes
- New items section

**Update `ui/app.js` metaGuides:**
- Add missing builds with full data structure
- Update tier values ('s', 'a', 'b')
- Update core items and synergies
- Update external links

**Update `ui/sw.js`:**
- Bump CACHE_NAME version number

### Step 6: Verification
- [ ] Count S-tier builds: should match meta claims
- [ ] Each "meta-dominant" hero has 2+ S-tier builds
- [ ] All patch changes reflected in hero summaries
- [ ] New items documented
- [ ] External links valid

## Build Data Structure

When adding a new build to `ui/app.js`:

```javascript
{
  id: 'hero-build-name',        // lowercase, hyphenated
  name: 'Build Name',           // Display name
  hero: 'heroname',             // lowercase: vanessa, mak, pygmalien, dooley, stelle, jules
  tier: 's',                    // 's', 'a', or 'b'
  overview: 'Description...',   // 1-2 sentences
  winCondition: 'How to win...',
  early: ['tip1', 'tip2', ...], // 4 tips
  mid: ['tip1', 'tip2', ...],   // 4 tips
  late: ['tip1', 'tip2', ...],  // 4 tips
  coreItems: [
    { name: 'Item', tier: 'gold', priority: 'must', desc: '...' },
    // priority: 'must', 'core', 'good', 'flex'
  ],
  synergies: [
    { items: ['Item1', 'Item2'], desc: 'Why they synergize' }
  ],
  boardLayout: [
    { name: 'Slot', size: 'small', filled: true }
    // size: 'small', 'medium', 'large'
  ],
  tips: ['tip1', 'tip2', ...],  // 5 tips
  counters: {
    bad: ['Counter1', 'Counter2'],   // Hard counters
    weak: ['Weakness1', 'Weakness2'] // Soft counters
  },
  externalLinks: [
    { name: 'Link Name', url: 'https://...', icon: '📖' }
  ]
}
```

## MANDATORY: Item Verification Protocol

**NEVER trust memory or assumptions about item mechanics.**

Before writing ANY build that references a specific item:

### Step 1: Fetch Item Data
For EACH core item in a build:
```
WebFetch: https://bazaardb.gg/card/{item-id}/{item-name}
```
Or search: `BazaarDB {item-name} The Bazaar`

### Step 2: Verify These Fields
- [ ] **Effect text** - EXACT wording of what item does
- [ ] **Trigger** - What activates it (weapon use, shield, time, etc.)
- [ ] **Size** - small/medium/large (affects board layout)
- [ ] **Tags** - weapon, shield, economy, etc.
- [ ] **Tier scaling** - How effect changes bronze→diamond

### Step 3: Cross-Reference
If item mechanic sounds unusual:
- [ ] Check thebazaar.wiki.gg/wiki/{item-name}
- [ ] Verify on at least 2 sources before writing

### Item Description Rules
1. **Quote exact effect text** when possible
2. **Never invent mechanics** - if unsure, look it up
3. **Match tags to actual behavior** (e.g., weapon item = weapon tag, not shield)
4. **Size must match BazaarDB** - affects board layout accuracy

### Red Flags (Require Verification)
- "Converts X to Y" claims
- Complex trigger conditions
- Interactions between multiple items
- Anything that sounds "too good"

## Common Mistakes to Avoid

1. **Single S-tier for "best hero"** - If sources say hero is #1, they need 2-3 S-tier builds
2. **Missing new builds** - Always check Mobalytics for named builds
3. **Stale patch number** - Update in index.html, current-meta.md, and links
4. **Forgetting cache bump** - Always increment sw.js CACHE_NAME
5. **Not checking recent wins** - Last 48h builds show what's actually working
6. **FABRICATING ITEM MECHANICS** - Never describe item effects without verification
7. **Wrong item size** - Always verify size on BazaarDB before adding to boardLayout
8. **Assuming item tags** - Check actual tags, don't guess from name

## Quick Commands

```bash
# Check current patch in files
grep -r "Patch [0-9]" mechanics/ ui/index.html

# Count S-tier builds per hero
grep -B3 "tier: 's'" ui/app.js | grep "hero:" | sort | uniq -c

# Find all builds for a hero
grep -A2 "hero: 'vanessa'" ui/app.js | grep "name:"
```

## Post-Update Verification

After updating, run these checks:

1. **S-tier distribution makes sense:**
   - Vanessa (meta leader): 3+ S-tier builds
   - Other strong heroes: 1-2 S-tier builds
   - Weak heroes: 0-1 S-tier builds

2. **Patch version consistent:**
   - `mechanics/current-meta.md` title
   - `ui/index.html` badges
   - External links to BazaarDB

3. **Cache updated:**
   - `ui/sw.js` CACHE_NAME incremented

4. **Test locally:**
   - Ctrl+Shift+R to force refresh
   - Check Meta tab shows correct tier list
   - Click a build to verify data loads
