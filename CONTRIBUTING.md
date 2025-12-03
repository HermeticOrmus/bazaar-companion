# Contributing to Bazaar Companion

Thank you for your interest in contributing! This project aims to help The Bazaar community learn and improve together.

## 🎯 Ways to Contribute

### 1. Report Bugs
Found something broken? [Open an issue](../../issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 2. Suggest Features
Have an idea? [Start a discussion](../../discussions) or open an issue with:
- Problem you're trying to solve
- Proposed solution
- Alternative approaches considered

### 3. Update Game Data

#### Adding Items
1. Check `ui/app.js` for the items array
2. Add new items following the existing format:
```javascript
{
  name: "Item Name",
  tier: "bronze|silver|gold|diamond|legendary",
  size: "small|medium|large",
  tags: ["tag1", "tag2"]
}
```
3. Add item image to `ui/assets/items/<item_name>.png`

#### Updating Hero Builds
1. Edit `ui/app.js` meta guides
2. Follow existing structure (coreItems, synergies, tips)
3. Include win conditions and playstyle notes

### 4. Improve Code

#### Code Style
- Use clear, descriptive variable names
- Comment complex logic
- Keep functions focused and small
- Follow existing formatting patterns

#### Testing Changes
```bash
# Start local server
cd ui && python3 -m http.server 8080

# Test in browser at http://localhost:8080
# Check all tabs and features
```

### 5. Enhance Documentation
- Fix typos or unclear explanations
- Add examples to README
- Document new features
- Translate to other languages (future)

## 🔄 Pull Request Process

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/bazaar-companion.git
   cd bazaar-companion
   ```

2. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make Changes**
   - Keep commits atomic and focused
   - Write clear commit messages
   - Test your changes locally

4. **Commit**
   ```bash
   git add .
   git commit -m "Add: brief description of changes"
   ```

5. **Push & PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a PR on GitHub with:
   - Clear title summarizing the change
   - Description of what and why
   - Link to related issues

## 🎨 Asset Guidelines

### Hero Portraits
- Source: [The Bazaar Wiki](https://thebazaar.wiki.gg/wiki/Heroes)
- Format: JPG, 180x180px minimum
- Location: `ui/assets/heroes/<hero_name>.jpg`

### Item Images
- Source: BazaarDB or official game assets
- Format: PNG with transparency
- Size: Square, 64-128px
- Location: `ui/assets/items/<item_name>.png`

## 📋 Commit Message Format

```
Type: Brief description (50 chars)

Optional detailed explanation
- What changed
- Why it changed
- Any side effects
```

**Types:**
- `Add:` New feature or content
- `Fix:` Bug fixes
- `Update:` Changes to existing features
- `Docs:` Documentation only
- `Style:` Formatting, no code change
- `Refactor:` Code restructuring
- `Test:` Adding tests

## ⚖️ Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Keep discussions focused on the project
- No harassment, discrimination, or toxicity

## ❓ Questions?

- Check existing [Issues](../../issues) and [Discussions](../../discussions)
- Open a new discussion for general questions
- Tag issues with appropriate labels

---

**Thank you for making Bazaar Companion better for everyone!**
