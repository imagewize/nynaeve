/**
 * View script for the FAQ block.
 * 
 * This file handles the collapsible functionality for FAQ items
 * on the frontend of the site.
 */

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    // Select all instances of this block on the page
    const faqBlocks = document.querySelectorAll('.faq-section-container');
  
    faqBlocks.forEach(block => {
      const faqItems = block.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
        // Find question and answer elements
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
          // Set initial states - all closed by default
          answer.classList.add('collapsed');
          question.classList.add('has-indicator');
          
          // Add the plus sign to the question
          if (!question.querySelector('.faq-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'faq-indicator';
            indicator.textContent = '+';
            question.appendChild(indicator);
          }
          
          // Set up click handler
          question.addEventListener('click', () => {
            // Toggle current item open/closed state
            item.classList.toggle('open');
            question.classList.toggle('is-open');
            answer.classList.toggle('collapsed');
            
            // Update indicator based on state
            const indicator = question.querySelector('.faq-indicator');
            if (indicator) {
              indicator.textContent = item.classList.contains('open') ? '−' : '+';
            }
            
            // Update answer max-height based on state
            answer.style.maxHeight = item.classList.contains('open') ? answer.scrollHeight + 'px' : '0';
            
            // Close other items when opening a new one
            faqItems.forEach(otherItem => {
              if (otherItem !== item && otherItem.classList.contains('open')) {
                otherItem.classList.remove('open');
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                
                if (otherQuestion && otherAnswer) {
                  otherQuestion.classList.remove('is-open');
                  otherAnswer.classList.add('collapsed');
                  otherAnswer.style.maxHeight = '0';
                  
                  // Update indicator
                  const otherIndicator = otherQuestion.querySelector('.faq-indicator');
                  if (otherIndicator) {
                    otherIndicator.textContent = '+';
                  }
                }
              }
            });
          });
        }
      });
    });
  });
})();