/**
 * Splash Screen Component
 *
 * Usage:
 *   1. Add the HTML to your page (see splash.html template)
 *   2. Include this script
 *   3. Call: SplashScreen.init({ minDuration: 1500 });
 *
 * The splash auto-hides after your page content is ready.
 */

const SplashScreen = (() => {
  let config = { minDuration: 1500 };

  function init(userConfig = {}) {
    Object.assign(config, userConfig);

    const splash = document.getElementById('ta-splash');
    if (!splash) return;

    const start = Date.now();

    window.addEventListener('load', () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, config.minDuration - elapsed);

      setTimeout(() => {
        splash.classList.add('hide');
        splash.addEventListener('transitionend', () => {
          splash.style.display = 'none';
        });
      }, remaining);
    });
  }

  return { init };
})();
