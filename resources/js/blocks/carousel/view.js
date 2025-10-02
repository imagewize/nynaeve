/**
 * Carousel Block - Frontend Initialization
 * Initializes Slick Carousel for all carousel blocks on the page
 */
(function($) {
    $(document).ready(function() {
        $('.wp-block-imagewize-carousel').each(function() {
            const $slider = $(this);

            // Apply CSS variables for arrow and dot colors
            $slider.css({
                '--arrow-color': $slider.data('arrow-color'),
                '--arrow-background': $slider.data('arrow-background'),
                '--arrow-hover-color': $slider.data('arrow-hover-color'),
                '--arrow-hover-background': $slider.data('arrow-hover-background'),
                '--dots-bottom': $slider.data('dots-bottom')
            });

            // Initialize slick carousel with settings from data attribute
            $slider.slick(JSON.parse($slider.attr('data-slick')));
        });
    });
})(jQuery);