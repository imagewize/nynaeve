/**
 * Simple DOM ready function
 * @param {Function} fn - Function to execute when DOM is ready
 */
export function domReady(fn) {
  if (document.readyState !== 'loading') {
    // Document already fully loaded
    fn();
    return;
  }
  
  // Use modern event listener
  document.addEventListener('DOMContentLoaded', fn);
}
