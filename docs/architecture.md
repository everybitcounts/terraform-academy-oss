# Architecture Overview

This document explains how the modules in Terraform Academy OSS fit together.

## Module Dependency Graph

```
index.html
  ├── theme/variables.css        ← CSS custom properties (dark/light)
  ├── theme/glassmorphism.css    ← Glass card utilities
  ├── theme/octagons.css         ← Background particle animations
  ├── components/toast/toast.js  ← Notification system
  ├── components/theme-toggle/   ← Dark/light theme switch
  └── quiz-engine.js OR lab-engine.js
       └── *-questions.js OR *-lab.js  ← Content definitions
```

## Design Principles

### 1. Zero Dependencies
Every module is written in vanilla JavaScript (ES6+). No npm, no bundler, no framework. Open any `index.html` in a browser and it works.

### 2. IIFE Module Pattern
Each engine exposes a single global object via an Immediately Invoked Function Expression:

```javascript
const QuizEngine = (function() {
  // Private state
  let state = {};

  // Public API
  return {
    init(config) { /* ... */ },
    toggleMenu() { /* ... */ }
  };
})();
```

This avoids polluting the global namespace while remaining simple to understand.

### 3. Configuration-Driven
All behavior is controlled through a config object passed to `init()`. This means:
- No hardcoded values in the engine code
- Same engine serves different content by swapping the config
- Easy to A/B test different quiz configurations

### 4. Theme System
CSS custom properties define the entire visual appearance:

```css
[data-theme="dark"] {
  --primary-bg: #0a0a1a;
  --text-primary: #e2e8f0;
  --accent: #3b82f6;
}
```

Changing themes is a single attribute toggle on `<html>`. All components inherit automatically.

## Data Flow

### Quiz Engine
```
User clicks answer
  → QuizEngine handles selection
  → Updates internal state (score, progress)
  → Renders next question or results
  → Optionally persists to localStorage
  → Optionally sends results to Supabase via Cloudflare Worker
```

### Lab Engine
```
User edits code in editor
  → File state stored in memory
  → User clicks "Check"
  → LabEngine.check() runs validation rules
  → Each rule checks file content with regex/includes
  → Results shown in terminal emulator
  → All pass → completion screen
```

### Feature Requests Portal
```
User submits request
  → Supabase insert (feature_requests table)
  → Admin reviews in admin panel
  → Admin approves → appears in Browse + Roadmap
  → Users vote → vote_count incremented via RPC
```

## Backend Integration (Optional)

The frontend modules work fully offline. For persistence and multiplayer features, add:

| Service | Purpose | Required? |
|---------|---------|-----------|
| Supabase | Auth, database, storage | Optional |
| Cloudflare Worker | API proxy, rate limiting, CORS | Optional |
| OpenAI API | AI-powered features (via Worker) | Optional |

See [api-integration.md](api-integration.md) for connection details.

## File Naming Convention

```
quiz-engine/
  index.html           ← Entry point (always index.html)
  quiz-engine.js       ← Main module
  quiz-engine.css      ← Module styles
  sample-questions.js  ← Demo content
  README.md            ← Module docs
```

## Extending

To add a new engine (e.g., flashcard-engine):

1. Create `flashcard-engine/` directory
2. Follow the IIFE pattern from quiz-engine.js
3. Accept a config object in `init()`
4. Use theme variables from `theme/variables.css`
5. Add toast notifications via `components/toast/toast.js`
6. Document in a README.md
