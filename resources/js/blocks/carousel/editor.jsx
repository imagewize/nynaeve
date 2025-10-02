import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    withColors,
    __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
    __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import classnames from 'classnames';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

const ALLOWED_BLOCKS = ['imagewize/slide'];

/**
 * Edit component for the Carousel Block
 *
 * Note: This component uses experimental WordPress features:
 * - __experimentalColorGradientSettingsDropdown
 * - __experimentalUseMultipleOriginColorsAndGradients
 * These features might change or be removed in future WordPress versions.
 */
const Edit = compose(
    withColors('arrowColor', 'arrowBackground', 'arrowHoverColor', 'arrowHoverBackground'),
    withSelect((select) => {
        const settings = select('core/block-editor').getSettings();
        return {
            colors: settings.colors || [],
        };
    })
)(function({
    attributes,
    setAttributes,
    clientId,
    arrowColor,
    setArrowColor,
    arrowBackground,
    setArrowBackground,
    arrowHoverColor,
    setArrowHoverColor,
    arrowHoverBackground,
    setArrowHoverBackground
}) {
    const {
        slidesToShow,
        slidesToScroll,
        speed,
        arrows,
        dots,
        infinite,
        autoplay,
        autoplaySpeed,
        rtl,
        responsiveWidth,
        responsiveSlides,
        responsiveSlidesToScroll,
        slides,
        slidePadding,
        arrowColor: arrowColorAttr,
        arrowBackground: arrowBackgroundAttr,
        arrowHoverColor: arrowHoverColorAttr,
        arrowHoverBackground: arrowHoverBackgroundAttr,
    } = attributes;

    const slideCount = useSelect(
        (select) => select('core/block-editor').getBlock(clientId).innerBlocks.length
    );

    const blockProps = useBlockProps({
        className: classnames(
            `cb-shows-${slidesToShow}-slides`,
            `cb-responsive-${responsiveSlides}-slides`,
            { 'cb-padding': slidePadding },
            slideCount + 1 > slidesToShow ? 'cb-show-scrollbar' : 'cb-hide-scrollbar'
        ),
    });

    const placeholder = (
        <div className="cb-carousel-placeholder">
            {__('Click plus (+) to add slides', 'imagewize')}
        </div>
    );

    const colorGradientSettings = useMultipleOriginColorsAndGradients();

    const onArrowColorChange = (color) => {
        setArrowColor(color);
        setAttributes({ arrowColor: color });
    };

    const onArrowBackgroundChange = (color) => {
        setArrowBackground(color);
        setAttributes({ arrowBackground: color });
    };

    const onArrowHoverColorChange = (color) => {
        setArrowHoverColor(color);
        setAttributes({ arrowHoverColor: color });
    };

    const onArrowHoverBackgroundChange = (color) => {
        setArrowHoverBackground(color);
        setAttributes({ arrowHoverBackground: color });
    };

    return (
        <Fragment>
            <InspectorControls group="color">
                {arrows && (
                    <>
                        <ColorGradientSettingsDropdown
                            panelId={clientId}
                            settings={[
                                {
                                    label: __('Arrow Color', 'imagewize'),
                                    colorValue: arrowColor?.color || arrowColorAttr,
                                    onColorChange: onArrowColorChange
                                },
                                {
                                    label: __('Arrow Background', 'imagewize'),
                                    colorValue: arrowBackground?.color || arrowBackgroundAttr,
                                    onColorChange: onArrowBackgroundChange
                                },
                                {
                                    label: __('Arrow Hover Color', 'imagewize'),
                                    colorValue: arrowHoverColor?.color || arrowHoverColorAttr,
                                    onColorChange: onArrowHoverColorChange
                                },
                                {
                                    label: __('Arrow Hover Background', 'imagewize'),
                                    colorValue: arrowHoverBackground?.color || arrowHoverBackgroundAttr,
                                    onColorChange: onArrowHoverBackgroundChange
                                }
                            ]}
                            {...colorGradientSettings}
                        />
                    </>
                )}
            </InspectorControls>
            <InspectorControls>
                <PanelBody title={__('Carousel Settings', 'imagewize')} initialOpen={true}>
                    <RangeControl
                        label={__('Slides to Show', 'imagewize')}
                        value={slidesToShow}
                        onChange={(value) => setAttributes({ slidesToShow: value })}
                        min={1}
                        max={10}
                    />
                    <RangeControl
                        label={__('Slides to Scroll', 'imagewize')}
                        value={slidesToScroll}
                        onChange={(value) => setAttributes({ slidesToScroll: value })}
                        min={1}
                        max={10}
                    />
                    <RangeControl
                        label={__('Animation Speed (ms)', 'imagewize')}
                        value={speed}
                        onChange={(value) => setAttributes({ speed: value })}
                        min={100}
                        max={3000}
                        step={100}
                    />
                    <ToggleControl
                        label={__('Show Arrows', 'imagewize')}
                        checked={arrows}
                        onChange={(value) => setAttributes({ arrows: value })}
                    />
                    <ToggleControl
                        label={__('Show Dots', 'imagewize')}
                        checked={dots}
                        onChange={(value) => setAttributes({ dots: value })}
                    />
                    {dots && (
                        <RangeControl
                            label={__('Dots Bottom Spacing', 'imagewize')}
                            value={parseInt(attributes.dotsBottomSpacing)}
                            onChange={(value) => setAttributes({ dotsBottomSpacing: `${value}px` })}
                            min={-100}
                            max={100}
                            step={1}
                        />
                    )}
                    <ToggleControl
                        label={__('Infinite Loop', 'imagewize')}
                        checked={infinite}
                        onChange={(value) => setAttributes({ infinite: value })}
                    />
                    <ToggleControl
                        label={__('Autoplay', 'imagewize')}
                        checked={autoplay}
                        onChange={(value) => setAttributes({ autoplay: value })}
                    />
                    {autoplay && (
                        <RangeControl
                            label={__('Autoplay Speed (ms)', 'imagewize')}
                            value={autoplaySpeed}
                            onChange={(value) => setAttributes({ autoplaySpeed: value })}
                            min={1000}
                            max={10000}
                            step={500}
                        />
                    )}
                    <ToggleControl
                        label={__('RTL Mode', 'imagewize')}
                        checked={rtl}
                        onChange={(value) => setAttributes({ rtl: value })}
                    />
                    <RangeControl
                        label={__('Total Slides', 'imagewize')}
                        value={slides}
                        onChange={(value) => setAttributes({ slides: value })}
                        min={1}
                        max={20}
                    />
                    <ToggleControl
                        label={__('Enable Slide Padding', 'imagewize')}
                        checked={slidePadding}
                        onChange={(value) => setAttributes({ slidePadding: value })}
                    />
                </PanelBody>
                <PanelBody title={__('Responsive Settings', 'imagewize')} initialOpen={false}>
                    <RangeControl
                        label={__('Breakpoint Width (px)', 'imagewize')}
                        value={responsiveWidth}
                        onChange={(value) => setAttributes({ responsiveWidth: value })}
                        min={320}
                        max={1200}
                        step={1}
                    />
                    <RangeControl
                        label={__('Slides to Show (Mobile)', 'imagewize')}
                        value={responsiveSlides}
                        onChange={(value) => setAttributes({ responsiveSlides: value })}
                        min={1}
                        max={5}
                    />
                    <RangeControl
                        label={__('Slides to Scroll (Mobile)', 'imagewize')}
                        value={responsiveSlidesToScroll}
                        onChange={(value) => setAttributes({ responsiveSlidesToScroll: value })}
                        min={1}
                        max={5}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <InnerBlocks
                    orientation="horizontal"
                    allowedBlocks={ALLOWED_BLOCKS}
                    templateLock={false}
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                    placeholder={placeholder}
                />
            </div>
        </Fragment>
    );
});

export default Edit;
