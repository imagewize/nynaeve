/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function that defines output on the frontend
 */
export default function Save({ attributes }) {
  const {
    slidesToShow,
    slidesToScroll,
    arrows,
    dots,
    infinite,
    autoplay,
    autoplaySpeed,
    speed,
    arrowColor,
    arrowBackground,
    arrowHoverColor,
    arrowHoverBackground,
    dotsBottomSpacing,
    slideSpacing
  } = attributes;

  const slickSettings = {
    slidesToShow: parseInt(slidesToShow),
    slidesToScroll: parseInt(slidesToScroll),
    arrows,
    dots,
    infinite,
    autoplay,
    autoplaySpeed: parseInt(autoplaySpeed),
    speed: parseInt(speed),
    adaptiveHeight: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  };

  const getColorValue = (color) => {
    if (color?.slug) {
      return `var(--wp--preset--color--${color.slug})`;
    }
    return color?.color || color;
  };

  const blockProps = useBlockProps.save({
    'data-slick': JSON.stringify(slickSettings),
    'data-dots-bottom': dotsBottomSpacing,
    'data-slide-spacing': slideSpacing,
    'data-arrow-color': getColorValue(arrowColor),
    'data-arrow-background': getColorValue(arrowBackground),
    'data-arrow-hover-color': getColorValue(arrowHoverColor),
    'data-arrow-hover-background': getColorValue(arrowHoverBackground)
  });

  return (
    <div { ...blockProps }>
      <InnerBlocks.Content />
    </div>
  );
}
