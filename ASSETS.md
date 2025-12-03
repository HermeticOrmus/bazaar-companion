# Game Assets

## Hero Portraits

**Source**: https://thebazaar.wiki.gg/wiki/Heroes
**Location**: `ui/assets/heroes/`
**Format**: JPG (180x180px)

| Hero | File | Size |
|------|------|------|
| Dooley | `dooley.jpg` | 9.5K |
| Jules | `jules.jpg` | 9.4K |
| Mak | `mak.jpg` | 7.2K |
| Pygmalien | `pygmalien.jpg` | 8.5K |
| Stelle | `stelle.jpg` | 8.5K |
| Vanessa | `vanessa.jpg` | 8.9K |

**Last Updated**: 2025-12-03

---

## Item Images

**Source**: BazaarDB item scraper (custom)
**Location**: `ui/assets/items/`
**Format**: PNG
**Count**: 98 items

**Coverage**: All legendary, gold, and core silver items

**Last Updated**: 2025-12-03

---

## Update Process

### Adding New Hero Portraits
```bash
cd ui/assets/heroes
wget -O <hero_name>.jpg "<wiki_url>"
```

### Adding New Item Images
Check BazaarDB for new items added in patches:
1. Visit https://bazaardb.gg/patchnotes/latest
2. Identify new items
3. Download PNG from BazaarDB item pages
4. Save to `ui/assets/items/<item_name>.png`

### Verifying Assets
```bash
# Count items
ls ui/assets/items/*.png | wc -l

# Check heroes
ls ui/assets/heroes/*.jpg
```
