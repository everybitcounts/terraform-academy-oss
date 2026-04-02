# Terraform Academy OSS

> The open source framework for building cloud infrastructure learning platforms.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Powered by Terraform Academy](https://img.shields.io/badge/Powered%20by-Terraform%20Academy-6366f1.svg)](https://terraformacademy.com)
[![Sponsor](https://img.shields.io/github/sponsors/everybitcounts?label=Sponsor&logo=GitHub&color=ea4aaa)](https://github.com/sponsors/everybitcounts)

This is the engine that powers [Terraform Academy](https://terraformacademy.com). It is fully open source, self-hostable, and production ready. You can use it to build quiz engines, interactive lab simulators, and community portals for any infrastructure or cloud curriculum.

When you are ready to move beyond simulation and into production grade labs with real infrastructure, AI coaching, and official certification paths, that is [Terraform Academy Pro](https://terraformacademy.com).

---

## OSS vs Terraform Academy Pro

| | OSS (this repo) | [Terraform Academy Pro](https://terraformacademy.com) |
|---|---|---|
| Lab environment | Simulated, runs in the browser | Real infrastructure on AWS, Azure, and GCP |
| Question content | Community contributed | Expert curated, mapped to official exam objectives |
| Feedback | Pass and fail with static explanations | AI coaching that diagnoses gaps and suggests next steps |
| Progress tracking | Browser local storage, single device | Cloud synced dashboards with gap analysis across all cert tracks |
| Certification paths | Not included | Terraform Associate, AWS SAA-C03, AZ-900, GCP ACE |
| Scenario simulations | Basic validation rules | Production SRE and DevOps workflows with real state |
| Infrastructure deployment | Not included | Terraform runs against live cloud accounts in isolated sandboxes |
| XP, levels, and streaks | Not included | Full gamified progression system with daily streak tracking |
| Leaderboard | Not included | Live leaderboard ranked by XP across all cert tracks |
| Community and accountability | GitHub Issues | Cohort based learning with structured accountability |

This is the Supabase model applied to infrastructure education. The OSS version is fully usable. Terraform Academy Pro removes the friction of simulation, local state, and self-managed content.

**[Start your free trial at Terraform Academy](https://terraformacademy.com)**

---

## What's Inside

| Module | Description |
|--------|------------|
| **[quiz-engine/](quiz-engine/)** | Interactive quiz engine with timer, progress tracking, review mode, and certificates |
| **[lab-engine/](lab-engine/)** | Interactive lab simulator with code editor, file tree, terminal emulator, and validation |
| **[theme/](theme/)** | CSS design system with dark and light modes, glassmorphism, and particle backgrounds |
| **[components/](components/)** | Reusable UI components: toast notifications, splash screen, theme toggle |
| **[integrations/](integrations/)** | Backend templates for Cloudflare Workers, Supabase, and feature request portals |
| **[docs/](docs/)** | Architecture docs, self-hosting guide, and API integration reference |
| **[oss-content-packs/](oss-content-packs/)** | Community question banks and labs for Terraform, AWS, Azure, and GCP |

## Quick Start

### Quiz Engine

```bash
cd quiz-engine
open index.html
```

Edit `sample-questions.js` to add your own question banks, or use the community content in [`oss-content-packs/`](oss-content-packs/).

### Lab Engine

```bash
cd lab-engine
open index.html
```

Edit `sample-lab.js` to define file trees, starter code, validation rules, and solutions for any hands-on exercise.

### Feature Requests Portal

```bash
cd integrations/feature-requests
# Set your Supabase credentials in index.html
open index.html
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Static)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ Quiz Engine   │  │ Lab Engine   │  │ Feature Requests  │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬──────────┘  │
│         │                 │                    │              │
│  ┌──────┴─────────────────┴────────────────────┴──────────┐  │
│  │            Theme System + Components                    │  │
│  └─────────────────────────┬──────────────────────────────┘  │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │ Cloudflare Worker│  ← API proxy, rate limits
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │    Supabase     │  ← Auth, database, storage
                    └─────────────────┘
```

## Design Philosophy

- **Zero build step**: Every module works by opening an HTML file in a browser
- **Framework agnostic**: Pure vanilla JS, compatible with React, Vue, and Svelte
- **Mobile first**: iOS safe area support, touch gestures, and responsive layouts
- **Dark by default**: Full dark and light theme system built on CSS custom properties
- **Backend optional**: Quiz and lab engines work fully offline; add Supabase for persistence

## Configuration

All modules accept a configuration object. No environment variables are required for offline use.

```javascript
QuizEngine.init({
  title: 'My Quiz',
  modules: [ /* question modules */ ],
  timer: true,
  timerMinutes: 30,
  passingScore: 70,
  shuffleQuestions: true,
  showCertificate: true
});
```

For backend integration, copy `.env.example` and fill in your credentials:

```bash
cp .env.example .env
```

## Self-Hosting

See [docs/self-hosting.md](docs/self-hosting.md) for deployment options:

- **GitHub Pages**: Free static hosting, quiz and lab engines only
- **Cloudflare Pages**: Free tier with Workers for API support
- **Vercel and Netlify**: Single step deploy
- **Docker**: Container based deployment

## From OSS to Production Grade

The OSS labs teach the concepts. Terraform Academy Pro runs them against real cloud infrastructure.

When you finish a lab here, you have validated code against a simulation. When you finish the same lab on [Terraform Academy](https://terraformacademy.com), you have deployed real resources to AWS, Azure, or GCP in an isolated sandbox, received AI coaching on what you got wrong, and logged a verified completion toward your certification path.

That is the gap this OSS repo is designed to make visible, not to hide.

**[terraformacademy.com](https://terraformacademy.com)**

## Contributing

Contributions to `oss-content-packs/` are welcome. Question banks, labs, and guides help the community and improve discovery for the entire ecosystem. Merged contributions are credited in this README.

New to open source? Look for issues tagged [`good first issue`](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and [ROADMAP.md](ROADMAP.md) for what is planned next.

## Community

| Resource | Link |
|----------|------|
| Feature Requests | [integrations/feature-requests/](integrations/feature-requests/) |
| Roadmap | [ROADMAP.md](ROADMAP.md) |
| Bug Reports | [GitHub Issues](../../issues/new?template=bug_report.md) |
| Content Contributions | [GitHub Issues](../../issues/new?template=content_contribution.md) |
| Built with this engine? | [Open an issue tagged built-with](../../issues/new?title=[Built-with]) |

## License

MIT. See [LICENSE](LICENSE) for details.

---

Built by the [Terraform Academy](https://terraformacademy.com) team and community.
