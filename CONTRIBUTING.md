# Contributing to Terraform Academy OSS

Thank you for considering a contribution! This project thrives on community input.

## How to Contribute

### Reporting Bugs

1. Check existing [Issues](../../issues) to avoid duplicates
2. Open a new issue with:
   - Clear title describing the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS version
   - Screenshots if applicable

### Suggesting Features

Open an issue tagged `enhancement` with:
- What problem does this solve?
- Proposed solution
- Any alternatives you considered

### Submitting Code

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/my-feature`
3. **Make changes** following the code style below
4. **Test** by opening the relevant HTML file in a browser
5. **Commit**: `git commit -m "Add: brief description"`
6. **Push**: `git push origin feature/my-feature`
7. **Open a Pull Request** with a clear description

## Code Style

- **JavaScript**: Vanilla ES6+, IIFE module pattern, no external dependencies
- **CSS**: Custom properties for theming, BEM-like class names, mobile-first
- **HTML**: Semantic markup, ARIA labels where appropriate
- **Files**: UTF-8 encoding, LF line endings, 2-space indentation

## Commit Messages

Use conventional format:

```
Add: new quiz timer countdown mode
Fix: lab terminal overflow on mobile
Docs: update self-hosting guide
Style: improve glassmorphism contrast
```

## Project Structure

```
quiz-engine/      ← Quiz framework (modify quiz-engine.js)
lab-engine/       ← Lab framework (modify lab-engine.js)
theme/            ← Design system (CSS only)
components/       ← Reusable UI widgets
integrations/     ← Backend templates
docs/             ← Documentation
examples/         ← Example configurations
```

## Review Process

- All PRs are reviewed by maintainers
- We aim to respond within 48 hours
- Small, focused PRs are preferred over large changes

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful and constructive.
