# Verify Item Skill

**MANDATORY skill before writing ANY item data.**

## Trigger

Use this skill when:
- Adding a new item to the database
- Writing item descriptions in builds
- Describing item mechanics or synergies
- Updating existing item data
- Creating theorycrafting content

## Step 1: Search for Item

```
WebSearch: "BazaarDB {item name} The Bazaar game"
```

Find the BazaarDB card URL (format: `bazaardb.gg/card/{id}/{item-name}`)

## Step 2: Fetch Primary Source

```
WebFetch: https://bazaardb.gg/card/{id}/{item-name}
Prompt: "Extract EXACT item details: effect text at each tier, size, cooldown, trigger condition, tags"
```

## Step 3: Cross-Reference

```
WebFetch: https://thebazaar.wiki.gg/wiki/{Item_Name}
Prompt: "Verify item mechanics: effect text, size, trigger, tier scaling"
```

## Step 4: Document Verified Data

Fill out this template before writing any code:

```yaml
VERIFIED_ITEM:
  name: "{Item Name}"
  hero: "{hero or neutral}"
  size: "{small|medium|large}"
  tier: "{bronze|silver|gold|diamond|legendary}"
  cooldown: "{seconds or null if passive}"
  trigger: "{what activates it}"
  effect_text: "{EXACT quote from source}"
  tier_scaling:
    bronze: "{effect at bronze}"
    silver: "{effect at silver}"
    gold: "{effect at gold}"
    diamond: "{effect at diamond}"
  tags: ["{tag1}", "{tag2}"]
  sources:
    - "{BazaarDB URL}"
    - "{Wiki URL}"
  verified_date: "{YYYY-MM-DD}"
```

## Step 5: Write Code

Only AFTER verification, write the item data:

```javascript
{
  name: '{Item Name}',
  hero: '{hero}',
  tier: '{tier}',
  size: '{size}',
  tags: ['{tags}'],
  cooldown: {cooldown},
  effect: '{EXACT effect text}'
}
```

## Verification Checklist

Before writing any item reference:

- [ ] Searched BazaarDB for item
- [ ] Fetched and read item page
- [ ] Cross-referenced on wiki
- [ ] Documented in VERIFIED_ITEM template
- [ ] Effect text is EXACT quote (not paraphrased)
- [ ] Size is correct (small/medium/large)
- [ ] Tags match actual behavior
- [ ] Tier is correct

## Common Mistakes to AVOID

| Mistake | Example | Prevention |
|---------|---------|------------|
| Guessing mechanics | "Drum converts shields" | Always fetch first |
| Wrong size | "medium" when it's "large" | Check BazaarDB |
| Invented synergies | Making up combos | Verify on wiki |
| Paraphrasing effects | Changing wording | Quote exactly |
| Assuming from name | "Shield" item does shields | Verify trigger |

## Quick Verification Commands

For a single item:
```
WebSearch: "BazaarDB {item} The Bazaar"
```

For hero items:
```
WebFetch: https://thebazaar.wiki.gg/wiki/{Hero}_Items
```

For synergies:
```
WebSearch: "{item1} {item2} synergy The Bazaar build"
```

## Example: Verifying Jabalian Drum

**WRONG (from memory)**:
```javascript
{ name: 'Jabalian Drum', size: 'medium', tags: ['shield'],
  effect: 'Converts shields to damage' }
```

**CORRECT (after verification)**:
```javascript
{ name: 'Jabalian Drum', size: 'large', tags: ['weapon', 'haste'],
  effect: 'When you use a Weapon, your Weapons gain +5/+10 Damage for the fight. When you use a Weapon, Haste it 2s.' }
```

## When Sources Conflict

1. **BazaarDB** is authoritative for current patch
2. **Wiki** may have outdated info
3. **If conflict**: Note it in comments, use BazaarDB values
4. **If both seem wrong**: Ask user to verify in-game
