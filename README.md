# Bazaar Companion

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Community-driven learning and progression tracker for [The Bazaar](https://playthebazaar.com/).

Track your runs, analyze builds, record voice notes, and master all 6 heroes with an elegant web interface inspired by BazaarDB.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/bazaar-companion.git
cd bazaar-companion

# Start the web interface
cd ui && python3 -m http.server 8080

# Open http://localhost:8080 in your browser
```

**Requirements**: Python 3.6+ (for local server)

## Features

| Tab | Function |
|-----|----------|
| **Meta** | Current tier list, stat priorities, resource links |
| **Heroes** | All 6 heroes with builds and playstyles |
| **Items** | Searchable item database with filters |
| **Builds** | Create/save your own build templates |
| **Runs** | Track run results and analyze patterns |
| **Notes** | Voice transcriptions for gameplay insights |
| **Progress** | Stats, milestones, achievement tracking |

### Voice Notes (In-Browser Recording)

Record voice notes directly in the browser:
1. Go to **Notes** tab
2. Click the microphone button
3. Speak your insight
4. Click again to stop
5. Note is auto-transcribed and tagged

**For auto-transcription**, run the Whisper server:
```bash
# Terminal 1: UI Server
cd ui && python3 -m http.server 8080

# Terminal 2: Whisper Transcription Server
python3 scripts/whisper-server.py
```

Requires: `~/whisper.cpp` with built binaries and models, plus `pip install flask flask-cors`.

**Alternative (CLI recording)**:
```bash
./scripts/record-note.sh      # Record until Ctrl+C
./scripts/record-note.sh 30   # Record 30 seconds
```

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
/scripts         - Automation (voice notes)
/voice-notes     - Audio recordings & transcriptions
/heroes          - Hero guides & personal notes
/runs            - Run logs & analysis
/builds          - Successful build templates
/mechanics       - Deep dives on systems
/progress        - Personal stats & goals
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
- [BazaarDB Patch Notes](https://bazaardb.gg/patchnotes/8.0) - Auto-generated diffs
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

## 📋 Roadmap

- [ ] Export/import build templates
- [ ] Advanced run statistics & graphs
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Integration with BazaarDB API
- [ ] Mobile-responsive design improvements

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- [The Bazaar](https://playthebazaar.com/) by Tempo Storm
- [BazaarDB.gg](https://bazaardb.gg) for inspiration
- Community contributors and testers

---

**Not affiliated with Tempo Storm or The Bazaar. Fan-made project for the community.**
