/**
 * View script for the home-hero block.
 * 
 * This file handles any client-side functionality needed for the block
 * on the frontend of the site.
 */

(function() {
  // Select all instances of this block on the page
  const blocks = document.querySelectorAll('.wp-block-imagewize-home-hero');

  // Function to initialize a block
  function initBlock(block) {
    // Currently no dynamic functionality needed
    // The block is primarily styled with CSS
  }

  // Initialize each block found
  if (blocks.length) {
    blocks.forEach(function(block) {
      initBlock(block);
    });
  }
})();