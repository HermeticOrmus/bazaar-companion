# Screenshot Guide

To create screenshots for the README:

## Required Screenshots

1. **hero-portraits.png** (1200x800)
   - Navigate to Heroes tab
   - Show all 6 hero cards with portraits
   - Capture the search/filter at top

2. **charts-progress.png** (1200x800)
   - Go to Progress tab
   - Make sure you have some runs logged first
   - Show both the win rate trend and hero performance charts

3. **builds-export.png** (1200x800)
   - Navigate to Builds tab
   - Create 2-3 sample builds
   - Show the Export/Import buttons

4. **meta-overview.png** (1200x800)
   - Go to Meta tab
   - Show tier list and recent runs widget side by side

5. **guides-detail.png** (1200x800)
   - Open a build guide (e.g., Peacewrought)
   - Show the copy button and guide content

## How to Capture

### Using Browser DevTools
1. Open http://localhost:8080
2. Press F12 → Toggle device toolbar (Ctrl+Shift+M)
3. Set to 1920x1080 desktop
4. Take screenshots with browser's screenshot tool

### Using Screenshot Tool
- **Linux**: Use `gnome-screenshot` or `flameshot`
- **Windows**: Use Snipping Tool or Win+Shift+S
- **Mac**: Use Cmd+Shift+4

### Optimize Images
```bash
# Install if needed
sudo apt install optipng

# Optimize all screenshots
optipng -o5 .github/screenshots/*.png
```

## Naming Convention
- Use lowercase with hyphens
- Be descriptive
- Keep under 1MB each

## Upload to Repo
```bash
git add .github/screenshots/
git commit -m "Add: Feature screenshots for README"
git push
```
