/**
 * Theme Toggle Component
 *
 * Usage:
 *   1. Add a toggle button with id="themeToggle"
 *   2. Include this script
 *   3. Call: ThemeToggle.init({ storageKey: 'my-theme' });
 *
 * Supports dark/light via data-theme attribute on <body>.
 */

const ThemeToggle = (() => {
  let config = {
    storageKey: 'theme-preference',
    default: 'dark'
  };

  function init(userConfig = {}) {
    Object.assign(config, userConfig);
    load();

    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggle);
  }

  function toggle() {
    const current = document.body.getAttribute('data-theme') || config.default;
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem(config.storageKey, next);
  }

  function load() {
    const saved = localStorage.getItem(config.storageKey) || config.default;
    document.body.setAttribute('data-theme', saved);
  }

  function get() {
    return document.body.getAttribute('data-theme') || config.default;
  }

  return { init, toggle, load, get };
})();
