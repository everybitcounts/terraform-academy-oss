# Contributing to Terraform Academy OSS

Thank you for contributing. This project is maintained by the [Terraform Academy](https://terraformacademy.com) team and the community. Every merged contribution is credited publicly in the README.

---

## Contributor Recognition

Merged contributions are acknowledged in the Contributors section of the README. Content contributions to `oss-content-packs/` that align with official certification exam domains are featured with attribution. If you ship something built with this engine, open an issue tagged `built-with` and we will add it to the showcase.

New to open source? Look for issues tagged [`good first issue`](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22). These are scoped specifically for first-time contributors.

---

## How to Contribute

### Reporting Bugs

1. Check [existing issues](../../issues) to avoid duplicates
2. Use the [Bug Report template](../../issues/new?template=bug_report.md):
   - Clear title describing the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS version
   - Screenshots if applicable

### Suggesting Features

Use the [Feature Request template](../../issues/new?template=feature_request.md):
- What problem does this solve?
- Proposed solution
- Any alternatives you considered

### Contributing Content Packs

Content contributions to `oss-content-packs/` are the highest-impact way to help. They improve organic discovery, help learners studying for certifications, and directly grow the community.

Use the [Content Contribution template](../../issues/new?template=content_contribution.md) before submitting a PR. All content contributions must include:
- `estimatedMinutes` per module or lab
- `examDomain` field mapping the content to an official exam objective
- `difficulty` level (`beginner`, `intermediate`, or `advanced`)
- Accurate explanations for every question answer

See `quiz-engine/sample-questions.js` and `lab-engine/sample-lab.js` for the full field reference.

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
