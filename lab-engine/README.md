# Lab Engine

A configurable interactive lab environment with a code editor, terminal emulator, file tree, and code validation. Runs entirely in the browser — no backend required.

## Features

- **Code editor** — Multi-file support with file tree navigation
- **Terminal emulator** — Simulated terminal with validation output
- **Fullscreen modals** — Expand editor or terminal to full viewport with line numbers
- **Code validation** — Configurable string-match rules with custom error messages
- **Show answer** — One-click solution reveal
- **Completion celebration** — Animated octagon burst on success
- **Dev/App mode toggle** — Two visual themes (wireframe vs iOS-native glassmorphism)
- **Mobile-first** — Responsive layout, touch-safe controls
- **Zero dependencies** — Pure HTML/CSS/JS

## Quick Start

1. Copy the `lab-engine/` folder into your project
2. Edit `sample-lab.js` (or create your own lab definition)
3. Open `index.html` in a browser

## Lab Configuration Schema

```javascript
const MY_LAB = {
  title: 'My Lab Name',
  instructionTitle: 'Build Something',
  instructionHTML: '<p>Instructions in HTML...</p>',

  fileTree: [
    { name: '/root/my-project', children: ['main.tf', 'variables.tf'] }
  ],

  files: {
    'main.tf': '# Write your code here\n',
    'variables.tf': 'variable "region" {\n  default = "us-east-1"\n}'
  },

  defaultFile: 'main.tf',
  requiredFile: 'main.tf',

  validationRules: [
    { contains: 'aws_instance', message: 'Missing aws_instance resource' },
    { contains: 't2.micro', message: 'Instance type should be t2.micro' }
  ],

  successMessage: 'All resources created successfully!',

  solution: 'resource "aws_instance" "web" {\n  ami = "ami-12345"\n  instance_type = "t2.micro"\n}'
};
```

## Configuration Reference

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Lab title shown in header |
| `instructionTitle` | string | Instructions section heading |
| `instructionHTML` | string | HTML content for instructions |
| `fileTree` | array | Nested file/folder structure for sidebar |
| `files` | object | Map of filename → initial content |
| `defaultFile` | string | File to open on load |
| `requiredFile` | string | File that must be edited for validation |
| `validationRules` | array | `{ contains, message }` rules |
| `successMessage` | string | Terminal output on success |
| `solution` | string | Full solution code |

## Extending

### Custom Validators
Replace the string-match validation in `lab-engine.js` with regex, AST parsing, or API calls for more advanced validation.

### Backend Integration
To save lab completion to a backend, add a `fetch()` call inside the `showCompletion()` function.

### Multiple Labs
Create separate HTML files for each lab, each loading a different lab definition file.
