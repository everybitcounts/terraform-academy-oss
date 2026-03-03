# Terraform Academy OSS

An open-source learning platform framework for building interactive quiz engines, hands-on lab simulators, and community portals — originally built for cloud & infrastructure education.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## What's Inside

| Module | Description |
|--------|------------|
| **[quiz-engine/](quiz-engine/)** | Interactive quiz engine with timer, progress tracking, review mode, and certificates |
| **[lab-engine/](lab-engine/)** | Hands-on lab simulator with code editor, file tree, terminal emulator, and validation |
| **[theme/](theme/)** | CSS design system with dark/light modes, glassmorphism, and particle backgrounds |
| **[components/](components/)** | Reusable UI components — toast notifications, splash screen, theme toggle |
| **[integrations/](integrations/)** | Backend templates for Cloudflare Workers, Supabase, and feature request portals |
| **[docs/](docs/)** | Architecture docs, self-hosting guide, and API integration reference |
| **[examples/](examples/)** | Ready-to-run example configurations |

## Quick Start

### Quiz Engine

```bash
cd quiz-engine
# Open index.html in a browser — no build step required
open index.html
```

Edit `sample-questions.js` to add your own question banks, or replace it entirely with your own module definitions.

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

- **Zero build step** — Every module works by opening an HTML file in a browser
- **Framework agnostic** — Pure vanilla JS; wrap in React/Vue/Svelte if you want
- **Mobile-first** — iOS safe-area support, touch gestures, responsive layouts
- **Dark by default** — Full dark/light theme system with CSS custom properties
- **Backend optional** — Quiz and lab engines work fully offline; add Supabase for persistence

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

- **GitHub Pages** — Free static hosting (quiz + lab only)
- **Cloudflare Pages** — Free tier with Workers for API
- **Vercel / Netlify** — One-click deploy
- **Docker** — Container-based deployment

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE) for details.

---

Built with care by the Terraform Academy community.
