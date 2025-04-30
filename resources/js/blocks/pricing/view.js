/**
 * View script for the pricing block.
 * 
 * This file handles any client-side functionality needed for the block
 * on the frontend of the site.
 */

(function() {
  // Select all instances of this block on the page
  const pricingBlocks = document.querySelectorAll('.wp-block-imagewize-pricing');

  // Function to initialize a block
  function initBlock(block) {
    const columns = block.querySelectorAll('.pricing-column');
    
    // Add subtle hover effect transitions
    columns.forEach(function(column) {
      column.addEventListener('mouseenter', function() {
        // You could add additional hover effects here if needed
      });
      
      column.addEventListener('mouseleave', function() {
        // Reset any custom hover effects
      });
    });
    
    // Initialize buttons
    const buttons = block.querySelectorAll('.pricing-button');
    buttons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        // Add click tracking or other functionality if needed
        // Example: track clicks with analytics
        if (typeof ga === 'function') {
          const buttonText = this.textContent.trim();
          ga('send', 'event', 'Pricing', 'click', buttonText);
        }
      });
    });
  }

  // Initialize each block found
  if (pricingBlocks.length) {
    pricingBlocks.forEach(function(block) {
      initBlock(block);
    });
  }
})();