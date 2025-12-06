# Bazaar Companion - Claude Instructions

## Project Identity

Personal mastery companion for The Bazaar game. Three pillars:
1. **Meta Reference** - Current patch tier lists, builds, resources
2. **Personal Tracking** - Runs, mastery, performance analytics
3. **Skill Development** - Learning checklists, opportunity recognition

## CRITICAL: Data Accuracy Protocol

**NEVER write item mechanics from memory.** The Jabalian Drum incident (Dec 2024) proved AI can completely fabricate item effects. Every item description MUST be verified.

### Before Writing ANY Item Data:
1. **Fetch from BazaarDB**: `https://bazaardb.gg/card/{id}/{item-name}`
2. **Cross-reference**: `https://thebazaar.wiki.gg/wiki/{Item_Name}`
3. **Verify these fields**:
   - Effect text (EXACT wording)
   - Trigger condition
   - Size (small/medium/large)
   - Tags
   - Tier scaling

### Red Flags Requiring Extra Verification:
- "Converts X to Y" mechanics
- Complex trigger conditions
- Multi-item interactions
- Anything that sounds powerful/unique

### If Unsure About an Item:
```
DO: WebSearch "BazaarDB {item name} The Bazaar"
DO: Fetch the wiki page
DO: Quote exact effect text

DON'T: Guess based on item name
DON'T: Assume mechanics from similar items
DON'T: Write descriptions without source
```

## Key Files

| File | Purpose |
|------|---------|
| `ui/app.js` | Main app logic, **metaGuides array contains all build data** |
| `ui/index.html` | UI structure, patch badges |
| `ui/styles.css` | Styling |
| `ui/sw.js` | Service worker, **bump CACHE_NAME after changes** |
| `mechanics/current-meta.md` | Meta documentation, tier lists |

## Skills

| Skill | Location | Use When |
|-------|----------|----------|
| Update Meta | `.claude/skills/update-meta.md` | Patch updates, new builds |
| Verify Item | `.claude/skills/verify-item.md` | ANY item data entry |

## Quick Reference

### Add a New Build
1. **VERIFY all core items first** (use verify-item skill)
2. Add to `metaGuides` array in `ui/app.js`
3. Follow the build data structure in update-meta skill
4. Bump `CACHE_NAME` in `ui/sw.js`

### Add/Edit Item Data
1. **MANDATORY**: Run verify-item skill first
2. Use exact effect text from source
3. Correct size (affects board layout)
4. Correct tags (affects search/filter)

### Update Patch Version
1. `ui/index.html` - badge text
2. `mechanics/current-meta.md` - title and content
3. External links to BazaarDB

### Check S-Tier Distribution
```bash
grep -B3 "tier: 's'" ui/app.js | grep "hero:" | sort | uniq -c
```

### Local Development
```bash
cd ui && python3 -m http.server 8080
# Open http://localhost:8080
# Ctrl+Shift+R to force refresh after changes
```

## Authoritative Data Sources

| Priority | Source | URL | Use For |
|----------|--------|-----|---------|
| 1 | BazaarDB | bazaardb.gg | Item stats, effects, exact mechanics |
| 2 | Wiki.gg | thebazaar.wiki.gg | Cross-reference, tier scaling |
| 3 | Mobalytics | mobalytics.gg/the-bazaar | Build guides, meta tier lists |
| 4 | Bazaar Builds | bazaar-builds.net | Recent winning builds |

## Meta Update Triggers

Run the update-meta skill when:
- User mentions new patch
- User says meta is outdated
- Adding new heroes or builds
- Major balance changes announced

## Caching

The app uses a service worker with cache-first for images, network-first for HTML/JS/CSS.

**After ANY code change:**
1. Increment version in `ui/sw.js`: `CACHE_NAME = 'bazaar-companion-vN'`
2. User needs Ctrl+Shift+R once to get new service worker

## Lessons Learned

### Jabalian Drum Incident (Dec 2024)
- **Problem**: Item described as "shield → damage" when it actually buffs weapons
- **Cause**: AI hallucination, no verification step
- **Fix**: Mandatory verification protocol, verify-item skill
- **Prevention**: NEVER trust memory for item mechanics
