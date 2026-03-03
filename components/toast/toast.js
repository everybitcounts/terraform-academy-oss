/**
 * Toast Notification Component
 *
 * Usage:
 *   toast('Feature saved!', 'success');
 *   toast('Something went wrong', 'error');
 *   toast('Processing...', 'info');
 *
 * Requires: toast.css
 */

function toast(message, type = 'info', duration = 3000) {
  // Remove existing toast
  const existing = document.querySelector('.ta-toast');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.className = `ta-toast ta-toast-${type}`;
  el.textContent = message;
  document.body.appendChild(el);

  // Trigger animation
  requestAnimationFrame(() => el.classList.add('ta-toast-show'));

  // Auto-dismiss
  setTimeout(() => {
    el.classList.remove('ta-toast-show');
    el.addEventListener('transitionend', () => el.remove());
  }, duration);
}
