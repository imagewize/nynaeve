/**
 * View script for the pricing block.
 * 
 * This file only handles click tracking for pricing buttons.
 * If you don't need analytics tracking, this entire file can be removed.
 */

(function() {
  // Only run if Google Analytics is available
  if (typeof ga !== 'function') {
    return;
  }

  // Add click tracking to pricing buttons
  document.querySelectorAll('.wp-block-imagewize-pricing .pricing-button').forEach(function(button) {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();
      ga('send', 'event', 'Pricing', 'click', buttonText);
    });
  });
})();