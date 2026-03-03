# Quiz Engine

A configurable, multi-module quiz platform with timed assessments, progress tracking, and certificate generation. Works as a standalone HTML page — no build tools required.

## Features

- **Multi-module navigation** — Sidebar with module switching
- **Timed assessments** — Configurable per-module countdown timer
- **Single & multi-select questions** — Supports both radio and checkbox questions
- **Per-question navigation** — Dot grid showing answered/unanswered questions
- **Progress persistence** — Saves state to localStorage, survives page refreshes
- **Review progress** — Cross-module score summary
- **Module certificates** — Completion screen with question-by-question review
- **Final certificate** — Shown when all modules are completed
- **Dark/light theme** — Toggle with localStorage persistence
- **Mobile-first** — Hamburger menu, touch-safe controls, safe-area insets

## Quick Start

1. Copy the `quiz-engine/` folder into your project
2. Edit `sample-questions.js` (or create your own question file)
3. Open `index.html` in a browser

```html
<script>
  QuizEngine.init({
    title: 'My Custom Quiz',
    sidebarTitle: 'Modules',
    certTitle: 'Certificate of Completion',
    timePerModule: 600,           // seconds
    storageKey: 'my-quiz-state',  // localStorage key
    questions: MY_QUESTIONS        // your question object
  });
</script>
```

## Question Format

```javascript
const MY_QUESTIONS = {
  "module-slug": [
    {
      id: 1,
      text: "Your question text here?",
      options: ["A. Option one", "B. Option two", "C. Option three", "D. Option four"],
      answer: "B",               // single answer
      explanation: "Explanation shown when incorrect."
    },
    {
      id: 2,
      text: "Multi-select question? (Select TWO)",
      options: ["A. One", "B. Two", "C. Three", "D. Four"],
      answer: ["A", "C"],        // array for multi-select
      explanation: "Explanation text."
    }
  ]
};
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | `'Quiz'` | Page header title |
| `sidebarTitle` | string | `'Modules'` | Sidebar heading |
| `certTitle` | string | `'Certificate of Completion'` | Final certificate heading |
| `timePerModule` | number | `1200` | Seconds per module |
| `storageKey` | string | `'quiz-engine-state'` | localStorage key for persistence |
| `questions` | object | `{}` | Question bank (see format above) |

## Customization

### Theming
Override CSS variables in `../theme/variables.css` or add your own `<style>` block.

### Adding Modules
Add a new key to your questions object — the engine auto-generates sidebar tabs.

### API Integration
To sync scores with a backend, hook into the `saveState()` function in `quiz-engine.js` and POST to your API.
