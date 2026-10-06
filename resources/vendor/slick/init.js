/*!
 * Carousel Block
 * Version: 1.0.0
 */
(function($) {
    $(document).ready(function() {
        $('.wp-block-cb-carousel').each(function() {
            const $slider = $(this);
            
            // Apply CSS variables
            $slider.css({
                '--arrow-color': $slider.data('arrow-color'),
                '--arrow-background': $slider.data('arrow-background'),
                '--arrow-hover-color': $slider.data('arrow-hover-color'),
                '--arrow-hover-background': $slider.data('arrow-hover-background'),
                '--dots-bottom': $slider.data('dots-bottom')
            });
            
            // Initialize slick
            $slider.slick(JSON.parse($slider.attr('data-slick')));
        });
    });
})(jQuery);
