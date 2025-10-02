import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save({ attributes }) {
    const {
        slidesToShow,
        slidesToScroll,
        arrows,
        dots,
        infinite,
        autoplay,
        autoplaySpeed,
        speed,
        rtl,
        responsiveWidth,
        responsiveSlides,
        responsiveSlidesToScroll,
        slidePadding,
        arrowColor,
        arrowBackground,
        arrowHoverColor,
        arrowHoverBackground,
        dotsBottomSpacing
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
        rtl,
        responsive: [{
            breakpoint: parseInt(responsiveWidth) + 1,
            settings: {
                slidesToShow: parseInt(responsiveSlides),
                slidesToScroll: parseInt(responsiveSlidesToScroll)
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
        className: classnames(
            'slick-slider',
            { 'cb-single-slide': slidesToShow === 1 },
            { 'cb-padding': slidePadding }
        ),
        'data-slick': JSON.stringify(slickSettings),
        'data-dots-bottom': dotsBottomSpacing,
        'data-arrow-color': getColorValue(arrowColor),
        'data-arrow-background': getColorValue(arrowBackground),
        'data-arrow-hover-color': getColorValue(arrowHoverColor),
        'data-arrow-hover-background': getColorValue(arrowHoverBackground),
        dir: rtl ? 'rtl' : undefined
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}