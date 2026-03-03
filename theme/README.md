# Theme System

A complete CSS theme with dark/light mode support, glassmorphism effects, and animated octagon backgrounds.

## Files

| File | Description |
|------|-------------|
| `variables.css` | CSS custom properties for colors, backgrounds, accents |
| `glassmorphism.css` | Utility classes for frosted-glass card effects |
| `octagons.css` | Animated floating octagon background particles |

## Usage

```html
<link rel="stylesheet" href="theme/variables.css">
<link rel="stylesheet" href="theme/glassmorphism.css">
<link rel="stylesheet" href="theme/octagons.css">
```

### Theme Toggle

Set `data-theme` on the `<body>` to switch between dark and light:

```javascript
// Toggle
const current = document.body.getAttribute('data-theme') || 'dark';
document.body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
```

### Glassmorphism Classes

```html
<div class="glass-card">Standard frosted glass card</div>
<div class="glass-subtle">Subtle glass for headers</div>
<div class="glass-heavy">Heavy blur for modals</div>
<div class="glass-ios">iOS-native style glass</div>
<h1 class="gradient-text">Gradient colored text</h1>
<div class="glow-border">Glowing accent border</div>
```

### Octagon Background

```html
<div class="background-octagons">
  <span style="top:10%;left:10%;font-size:60px;animation-duration:22s;">⬡</span>
  <span style="top:40%;left:70%;font-size:80px;animation-duration:18s;">⬡</span>
  <span style="top:70%;left:30%;font-size:40px;animation-duration:25s;">⬡</span>
</div>
```

For multi-directional drifting (labs), use classes `oct1` through `oct4`:

```html
<span class="oct1" style="top:10%; left:10%;">⬡</span>
<span class="oct2" style="top:40%; left:70%;">⬡</span>
```

## Customization

Override any variable in your own stylesheet:

```css
:root {
  --accent: #ff6b6b;        /* Change accent from cyan to coral */
  --primary-bg: #1a1a2e;    /* Deeper background */
  --button-bg: #ff6b6b;     /* Match buttons to accent */
}
```
