/**
 * Testimonial Grid - Frontend Initialization
 * Conditionally initializes Slick Carousel based on card count
 * - Desktop: 4+ cards = carousel, 3 or fewer = static grid
 * - Mobile: 2+ cards = carousel, 1 card = static
 */
(function($) {
    $(document).ready(function() {
        $('.wp-block-imagewize-testimonial-grid').each(function() {
            const $block = $(this);

            // Count direct children (excluding the heading)
            // Each direct child after the heading is a testimonial card
            const $children = $block.children().not('h1, h2, h3, h4, h5, h6');
            const cardCount = $children.length;

            // Don't initialize if no cards found
            if (cardCount === 0) {
                return;
            }

            // Get settings from data attribute
            const slickSettings = JSON.parse($block.attr('data-slick') || '{}');

            // Check if we should enable carousel based on screen size and card count
            function shouldEnableCarousel() {
                const isDesktop = window.innerWidth >= 768;

                if (isDesktop) {
                    // Desktop: Enable carousel only if 4+ cards
                    return cardCount >= 4;
                } else {
                    // Mobile: Enable carousel only if 2+ cards
                    return cardCount >= 2;
                }
            }

            // Create a wrapper for slides only (exclude heading)
            function wrapSlidesForCarousel() {
                if (!$block.find('.testimonial-grid__slides-wrapper').length) {
                    // Move all card elements into a wrapper, leaving the heading outside
                    const $heading = $block.children('h1, h2, h3, h4, h5, h6').first();
                    const $cards = $block.children('.testimonial-grid__card, .wp-block-group');

                    // Create wrapper and move cards into it
                    const $wrapper = $('<div class="testimonial-grid__slides-wrapper"></div>');
                    $block.append($wrapper);
                    $wrapper.append($cards);

                    // Ensure heading is first
                    if ($heading.length) {
                        $block.prepend($heading);
                    }
                }

                return $block.find('.testimonial-grid__slides-wrapper');
            }

            // Initialize carousel if conditions are met
            function initCarousel() {
                if (shouldEnableCarousel()) {
                    const $wrapper = wrapSlidesForCarousel();

                    if (!$wrapper.hasClass('slick-initialized')) {
                        // Apply CSS variables for arrow colors and slide spacing
                        const slideSpacing = $block.data('slide-spacing') || 12;
                        $wrapper.css({
                            '--arrow-color': $block.data('arrow-color'),
                            '--arrow-background': $block.data('arrow-background'),
                            '--arrow-hover-color': $block.data('arrow-hover-color'),
                            '--arrow-hover-background': $block.data('arrow-hover-background'),
                            '--slide-spacing': `${slideSpacing}px`
                        });

                        // Apply dots bottom spacing directly to .slick-dots after initialization
                        const dotsBottom = $block.data('dots-bottom') || '-45px';
                        setTimeout(() => {
                            $wrapper.find('.slick-dots').css('bottom', dotsBottom);
                        }, 50);

                        // Add carousel class for styling
                        $block.addClass('testimonial-grid--carousel-active');

                        // Initialize slick carousel on the wrapper (not the main block)
                        $wrapper.slick(slickSettings);
                    }
                } else if (shouldEnableCarousel() === false) {
                    const $wrapper = $block.find('.testimonial-grid__slides-wrapper');
                    if ($wrapper.length && $wrapper.hasClass('slick-initialized')) {
                        // Destroy carousel if conditions no longer met
                        $wrapper.slick('unslick');
                        $block.removeClass('testimonial-grid--carousel-active');
                    }
                }
            }

            // Initialize on page load
            initCarousel();

            // Re-check on window resize (debounced)
            let resizeTimer;
            $(window).on('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    initCarousel();
                }, 250);
            });
        });
    });
})(jQuery);
