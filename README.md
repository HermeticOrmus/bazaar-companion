# Bazaar Companion

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/HermeticOrmus/bazaar-companion)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
![GitHub Stars](https://img.shields.io/github/stars/HermeticOrmus/bazaar-companion?style=social)

**Your personal companion for mastering [The Bazaar](https://playthebazaar.com/)** 🎮

Community-driven learning and progression tracker with hero guides, performance charts, build planning, and run analytics.

Track your runs, analyze builds, record voice notes, and master all 6 heroes with an elegant web interface inspired by BazaarDB.

![Bazaar Companion](https://via.placeholder.com/1200x600/1a1a2e/16C79A?text=Bazaar+Companion+Screenshot)
*Screenshot coming soon - see `.github/SCREENSHOTS.md` for guide*

## ✨ Features at a Glance

### 📊 Progress Tracking
- **Win Rate Trends**: Visual charts showing your last 10 runs
- **Hero Performance**: Compare average wins across all heroes
- **Statistics Dashboard**: Total runs, avg wins, best run, 10-win count
- **Milestone Tracking**: Unlock achievements as you improve

### 🎮 Hero Mastery
- **6 Hero Profiles**: Vanessa, Pygmalien, Dooley, Mak, Stelle, Jules
- **Official Portraits**: High-quality hero images
- **Build Recommendations**: Meta builds for each hero
- **Search & Filter**: Find builds by name, style, or difficulty

### 🔧 Build Planning
- **Create Custom Builds**: Save your winning strategies
- **Export/Import**: Share builds as JSON files
- **Copy to Clipboard**: Quick sharing with formatted text
- **Tier Ratings**: S/A/B tier classification

### 📝 Run Tracking
- **Detailed Logs**: Hero, build, wins, date for every run
- **Recent Runs Widget**: Quick overview on Meta tab
- **Statistics**: Automatic calculation of averages and trends

### 🎙️ Voice Notes
- **Browser Recording**: Record insights directly in-app
- **Auto-transcription**: Whisper.cpp integration (optional)
- **Tagging System**: Organize notes by hero or topic

### 🌓 Polish
- **Dark/Light Themes**: Toggle to match your preference
- **Mobile Responsive**: Optimized for phones and tablets
- **Fast & Local**: No backend required, all data stays in your browser

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/HermeticOrmus/bazaar-companion.git
cd bazaar-companion

# Start the web interface
cd ui && python3 -m http.server 8080

# Open http://localhost:8080 in your browser
```

**Requirements**: Python 3.6+ (for local server)

## 📱 Features Overview

| Tab | Features | Quick Actions |
|-----|----------|--------------|
| **Meta** | Tier list, stat priorities, recent runs widget | View guides, jump to runs |
| **Heroes** | 6 hero profiles with portraits, builds | Search, filter by difficulty |
| **Items** | 98+ item images, searchable database | Filter by tier, size, tags |
| **Builds** | Custom build planner | Export/import, copy to clipboard |
| **Runs** | Detailed run logs, statistics | Add run, view charts |
| **Notes** | Voice recording, transcription | Record, tag, search |
| **Progress** | Charts, stats, milestones | Track trends, achievements |

## Quick Reference

### Day Structure
- Hours 0-1: Shop/Prep
- Hour 2: Monster (PvE)
- Hours 3-5: Shop/Events
- Hour 6: PvP (mandatory)

### Key Stats Priority
1. **CDR** (Cooldown Reduction) - King stat
2. **Haste** - Temporary CDR boost
3. **Crit Chance** - Scales everything

### Core Concepts
- **Tempo**: Power now (win fights, protect Prestige)
- **Value**: Investment (XP, Gold for later power)
- **Prestige Loss**: Day number = damage on PvP loss

## Project Structure
```
/ui              - Web interface (BazaarDB-style dark theme)
/mechanics       - Meta reference & game systems
/runs            - Run log templates
/progress        - Personal goals & tracking
/scripts         - Utility scripts (image download, whisper)
```

## Resources

### Databases & Tools
- [BazaarDB.gg](https://bazaardb.gg) - Item database, advanced search, enchantments, tier lists, merchant pools
- [Mobalytics](https://mobalytics.gg/the-bazaar) - Guides & Kripp's builds
- [Bazaar Builds](https://bazaar-builds.net) - Build guides & meta analysis

### Community
- [Official Discord](https://discord.com/invite/playthebazaar) - ~125k members, weekly tournaments, dev announcements
- [r/PlayTheBazaar](https://reddit.com/r/PlayTheBazaar) - Official subreddit
- [r/TheBazaar](https://reddit.com/r/TheBazaar) - Unofficial/unmoderated alternative

### Reference
- [Wiki (Fandom)](https://thebazaar.fandom.com/wiki/The_Bazaar)
- [Wiki (wiki.gg)](https://thebazaar.wiki.gg/)
- [Official Site](https://playthebazaar.com/)

### Meta Tracking
Check these regularly for current meta:
1. BazaarDB tier lists (updated with patches)
2. Discord #builds channel
3. Reddit hot posts for emerging strats
4. Mobalytics for Kripp's latest builds

### Patch Notes Sources
- [BazaarDB Patch Notes](https://bazaardb.gg/patchnotes/9.0) - Auto-generated diffs
- [How Bazaar Patch Notes](https://www.howbazaar.gg/patchnotes)
- [Mobalytics Patch Tracker](https://mobalytics.gg/the-bazaar/guides/patch-notes)
- [The Bazaar Zone](https://thebazaarzone.com/news/patch-notes/)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

- **Add game data**: Update items, heroes, or builds
- **Report bugs**: Open an issue with details
- **Suggest features**: Share ideas in discussions
- **Improve docs**: Fix typos or add clarifications
- **Share builds**: Add your successful strategies

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 🎯 Why Use Bazaar Companion?

### For New Players
- **Learn the meta**: Curated tier lists and build guides
- **Track progress**: See your improvement over time with charts
- **Master heroes**: Detailed profiles with recommended builds

### For Veterans
- **Optimize builds**: Test and refine your strategies
- **Analyze performance**: Identify which heroes/builds work best for you
- **Share knowledge**: Export builds to help the community

### For Content Creators
- **Record insights**: Voice notes while streaming
- **Build library**: Showcase your winning strategies
- **Easy sharing**: Copy guides with one click

## 📋 Roadmap

- [x] Hero portraits and search
- [x] Export/import build templates
- [x] Performance charts and analytics
- [x] Dark/light theme toggle
- [x] Mobile-responsive design
- [ ] Multi-language support
- [ ] Integration with BazaarDB API
- [ ] Build rating/voting system
- [ ] Community build sharing platform
- [ ] Advanced filtering and sorting

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- [The Bazaar](https://playthebazaar.com/) by Tempo Storm
- [BazaarDB.gg](https://bazaardb.gg) for inspiration
- Community contributors and testers

---

**Not affiliated with Tempo Storm or The Bazaar. Fan-made project for the community.**
