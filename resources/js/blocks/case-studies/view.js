/**
 * Frontend JavaScript for the Case Studies block
 */

(function() {
    // Add smooth hover animations
    function addHoverEffects() {
        const cards = document.querySelectorAll('.wp-block-imagewize-case-studies .case-study-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('is-hovered');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('is-hovered');
            });
        });
    }
    
    // Add click handler for case study cards
    function addClickHandlers() {
        const cards = document.querySelectorAll('.wp-block-imagewize-case-studies .case-study-card');

        cards.forEach(card => {
            // The link text is a paragraph; the URL lives inside an <a> added via Cmd+K in the editor
            const anchor = card.querySelector('.case-link a[href]');

            if (anchor) {
                // Only make the card clickable when a real link exists
                card.classList.add('has-link');
                card.addEventListener('click', function(e) {
                    // Don't double-fire if the user clicked the <a> itself
                    if (e.target.closest('a')) return;
                    window.location.href = anchor.getAttribute('href');
                });
            }
        });
    }
    
    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        addHoverEffects();
        addClickHandlers();
    });
    
    // Also initialize when blocks are dynamically loaded (e.g., via AJAX)
    document.addEventListener('blockLoaded', function(e) {
        if (e.detail.blockName === 'imagewize/case-studies') {
            addHoverEffects();
            addClickHandlers();
        }
    });
})();
