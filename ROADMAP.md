# Terraform Academy OSS Roadmap

This document describes the planned development direction for the Terraform Academy OSS engines. It is updated as priorities shift and community feedback arrives.

The OSS engines power the simulation layer. [Terraform Academy Pro](https://terraformacademy.com) runs the same content against real infrastructure with AI coaching and certification tracking.

---

## Status Key

| Status | Meaning |
|--------|---------|
| Shipped | Available in the current codebase |
| In Progress | Actively being built |
| Planned | On the roadmap, not yet started |
| Under Discussion | Being evaluated, no commitment yet |

---

## Engine Core

| Feature | Status | Notes |
|---------|--------|-------|
| Zero build quiz engine | Shipped | Pure HTML and JS, no bundler |
| Zero build lab engine | Shipped | Code editor, file tree, terminal emulator |
| Dark and light theme system | Shipped | CSS custom properties, data-theme toggle |
| LocalStorage progress persistence | Shipped | Single device, no account required |
| Timer and scoring | Shipped | Configurable per module |
| Certificate generation | Shipped | On quiz completion |
| Supabase integration schema | Shipped | Auth, profiles, quiz results, lab completions |
| Cloudflare Worker API proxy | Shipped | Rate limiting and request routing |
| Community feature request portal | Shipped | Supabase-backed voting system |
| Animated SVG particle backgrounds | Shipped | Hex particle system in both engines |

---

## Planned: Engine Enhancements

| Feature | Status | Notes |
|---------|--------|-------|
| Shareable lab completion screenshot | Planned | Social proof at highest-intent moment |
| Certificate share to LinkedIn and Twitter | Planned | Conversion loop, currently blocked |
| Shareable lab completion screenshot | Planned | Social proof at highest-intent moment |
| Exam domain alignment tags on questions | Planned | Map content to official cert objectives |
| Time estimates on quiz modules and labs | In Progress | Adding `estimatedMinutes` field to config format |
| Mobile gesture support improvements | Planned | Swipe navigation for quiz modules |

---

## Planned: Content Infrastructure

| Feature | Status | Notes |
|---------|--------|-------|
| Terraform Associate 004 question pack | Planned | Mapped to official exam domains |
| AWS SAA-C03 question pack | Under Discussion | Community contribution welcome |
| content pack validation schema | Planned | JSON schema for consistent contribution format |
| Content pack versioning standard | Planned | Semantic versioning for community packs |
| Automated question quality checks | Under Discussion | Linting for duplicate and malformed questions |

---

## Planned: Community Infrastructure

| Feature | Status | Notes |
|---------|--------|-------|
| Good first issue labeling | In Progress | Tagging accessible contribution points |
| Issue templates for bugs, features, and content | In Progress | Lowering contribution barrier |
| Contributor recognition in README | Planned | Contributors credited publicly |
| Content contributor leaderboard | Under Discussion | Ranking by accepted oss-content-packs contributions |

---

## Not Planned (by Design)

These are intentionally excluded from the OSS codebase to preserve simplicity and community trust.

- Real cloud infrastructure execution (this belongs to [Terraform Academy Pro](https://terraformacademy.com))
- AI coaching and feedback loops (Terraform Academy Pro)
- XP, level, and streak progression system (Terraform Academy Pro)
- Live leaderboard (Terraform Academy Pro)
- Certification path tracking against official exam objectives (Terraform Academy Pro)
- Billing, subscriptions, or account management
- Third-party tracking or behavioral analytics

---

## How to Influence the Roadmap

1. Open an Issue or use the [Feature Requests portal](integrations/feature-requests/)
2. Add a reaction to existing Issues to signal demand
3. Submit a PR — shipped contributions move the roadmap forward

Community contributions to `oss-content-packs/` are the fastest path to impact. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

Built by the [Terraform Academy](https://terraformacademy.com) team and community.
