/**
 * View script for the pricing block.
 * 
 * This file only handles click tracking for pricing buttons.
 * If you don't need analytics tracking, this entire file can be removed.
 */

// (function() {
//   // Only run if Google Analytics is available
//   if (typeof ga !== 'function') {
//     console.warn('Google Analytics (ga) function not found. Pricing block click tracking disabled.');
//     return;
//   }

//   // Add click tracking to core buttons within the pricing block
//   // Target the anchor tag within the core button block
//   document.querySelectorAll('.wp-block-imagewize-pricing .wp-block-button__link').forEach(function(button) {
//     button.addEventListener('click', function() {
//       const buttonText = this.textContent.trim();
//       // Send event to Google Analytics
//       // Ensure 'Pricing' category and 'click' action are appropriate for your setup
//       try {
//         ga('send', 'event', 'Pricing', 'click', buttonText);
//         console.log(`GA event sent: Pricing, click, ${buttonText}`);
//       } catch (e) {
//         console.error('Failed to send GA event:', e);
//       }
//     });
//   });
// })();