/**
 * View script for the FAQ block.
 * 
 * This file handles the collapsible functionality for FAQ items
 * on the frontend of the site.
 */

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Select all instances of this block on the page
    const faqBlocks = document.querySelectorAll('.faq-section-container');
  
    faqBlocks.forEach(function(block) {
      const questions = block.querySelectorAll('.faq-question');
      
      // Add click event listeners to all questions
      questions.forEach(function(question) {
        // Find the corresponding answer
        const answer = question.nextElementSibling;
        if (answer && answer.classList.contains('faq-answer')) {
          // Add collapsed class to all answers initially
          answer.classList.add('collapsed');
          
          // Add visual cue to questions
          question.style.position = 'relative';
          question.style.cursor = 'pointer';
          
          // Add plus/minus indicator
          question.classList.add('has-indicator');
          
          question.addEventListener('click', function() {
            // Toggle the collapsed state
            const isCollapsed = answer.classList.contains('collapsed');
            
            if (isCollapsed) {
              answer.classList.remove('collapsed');
              answer.style.maxHeight = answer.scrollHeight + 'px';
              answer.style.marginTop = '0.5rem';
              question.classList.add('is-open');
            } else {
              answer.classList.add('collapsed');
              answer.style.maxHeight = '0';
              answer.style.marginTop = '0';
              question.classList.remove('is-open');
            }
          });
        }
      });
    });
  });
})();