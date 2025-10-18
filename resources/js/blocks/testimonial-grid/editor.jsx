/**
 * WordPress dependencies
 */
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
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

/**
 * Initial template - creates heading and 3 testimonial cards
 */
const TEMPLATE = [
  ['core/heading', {
    level: 2,
    content: 'WordPress Maintenance Success Stories',
    fontFamily: 'montserrat',
    fontSize: '3xl',
    textAlign: 'center',
    textColor: 'contrast',
    style: {
      typography: {
        fontWeight: '700',
        lineHeight: '1.3'
      },
      spacing: {
        margin: { bottom: '3rem' }
      }
    }
  }],
  ['core/group', {
    className: 'testimonial-grid__card',
    style: {
      spacing: {
        padding: { top: '2.5rem', right: '2.5rem', bottom: '2.5rem', left: '2.5rem' }
      },
      border: { radius: '12px' }
    },
    backgroundColor: 'base'
  }, [
    ['core/paragraph', {
      content: '"Imagewize blocked 127 malware attempts in 2024 alone. Their proactive security monitoring gives us complete peace of mind to focus on our business growth."',
      fontFamily: 'open-sans',
      fontSize: 'lg',
      className: 'testimonial-grid__quote',
      style: {
        typography: {
          fontStyle: 'italic',
          lineHeight: '1.6'
        },
        spacing: {
          margin: { bottom: '1.5rem' }
        }
      },
      textColor: 'base-accent'
    }],
    ['core/paragraph', {
      content: 'Sarah Mitchell',
      fontFamily: 'montserrat',
      fontSize: 'base',
      className: 'testimonial-grid__author',
      style: {
        typography: {
          fontWeight: '600',
          lineHeight: '1.4'
        },
        spacing: {
          margin: { bottom: '0.25rem' }
        }
      },
      textColor: 'primary'
    }],
    ['core/paragraph', {
      content: 'Marketing Director, TechStart Solutions',
      fontFamily: 'open-sans',
      fontSize: 'sm',
      className: 'testimonial-grid__company',
      style: {
        typography: {
          lineHeight: '1.4'
        },
        spacing: {
          margin: { bottom: '1rem' }
        }
      },
      textColor: 'secondary'
    }],
    ['core/paragraph', {
      content: '127 threats blocked in 2024',
      fontFamily: 'montserrat',
      fontSize: 'base',
      className: 'testimonial-grid__metric',
      style: {
        typography: {
          fontWeight: '600',
          lineHeight: '1.4'
        }
      },
      textColor: 'primary-dark'
    }]
  ]],
  ['core/group', {
    className: 'testimonial-grid__card',
    style: {
      spacing: {
        padding: { top: '2.5rem', right: '2.5rem', bottom: '2.5rem', left: '2.5rem' }
      },
      border: { radius: '12px' }
    },
    backgroundColor: 'base'
  }, [
    ['core/paragraph', {
      content: '"Our website went from 4.2 seconds load time to 1.8 seconds - a 57% improvement! The performance optimization has significantly improved our conversion rates."',
      fontFamily: 'open-sans',
      fontSize: 'lg',
      className: 'testimonial-grid__quote',
      style: {
        typography: {
          fontStyle: 'italic',
          lineHeight: '1.6'
        },
        spacing: {
          margin: { bottom: '1.5rem' }
        }
      },
      textColor: 'base-accent'
    }],
    ['core/paragraph', {
      content: 'Michael Chen',
      fontFamily: 'montserrat',
      fontSize: 'base',
      className: 'testimonial-grid__author',
      style: {
        typography: {
          fontWeight: '600',
          lineHeight: '1.4'
        },
        spacing: {
          margin: { bottom: '0.25rem' }
        }
      },
      textColor: 'primary'
    }],
    ['core/paragraph', {
      content: 'Operations Manager, Global Trade Inc',
      fontFamily: 'open-sans',
      fontSize: 'sm',
      className: 'testimonial-grid__company',
      style: {
        typography: {
          lineHeight: '1.4'
        },
        spacing: {
          margin: { bottom: '1rem' }
        }
      },
      textColor: 'secondary'
    }],
    ['core/paragraph', {
      content: '57% faster page load times',
      fontFamily: 'montserrat',
      fontSize: 'base',
      className: 'testimonial-grid__metric',
      style: {
        typography: {
          fontWeight: '600',
          lineHeight: '1.4'
        }
      },
      textColor: 'primary-dark'
    }]
  ]],
  ['core/group', {
    className: 'testimonial-grid__card',
    style: {
      spacing: {
        padding: { top: '2.5rem', right: '2.5rem', bottom: '2.5rem', left: '2.5rem' }
      },
      border: { radius: '12px' }
    },
    backgroundColor: 'base'
  }, [
    ['core/paragraph', {
      content: '"When our site went down at 2 AM, Imagewize had us back online within 45 minutes. Their emergency response prevented approximately $15K in potential downtime losses."',
      fontFamily: 'open-sans',
      fontSize: 'lg',
      className: 'testimonial-grid__quote',
      style: {
        typography: {
          fontStyle: 'italic',
          lineHeight: '1.6'
        },
        spacing: {
          margin: { bottom: '1.5rem' }
        }
      },
      textColor: 'base-accent'
    }],
    ['core/paragraph', {
      content: 'Jennifer Rodriguez',
      fontFamily: 'montserrat',
      fontSize: 'base',
      className: 'testimonial-grid__author',
      style: {
        typography: {
          fontWeight: '600',
          lineHeight: '1.4'
        },
        spacing: {
          margin: { bottom: '0.25rem' }
        }
      },
      textColor: 'primary'
    }],
    ['core/paragraph', {
      content: 'CEO, BrightPath Consulting',
      fontFamily: 'open-sans',
      fontSize: 'sm',
      className: 'testimonial-grid__company',
      style: {
        typography: {
          lineHeight: '1.4'
        },
        spacing: {
          margin: { bottom: '1rem' }
        }
      },
      textColor: 'secondary'
    }],
    ['core/paragraph', {
      content: '$15K in downtime prevented',
      fontFamily: 'montserrat',
      fontSize: 'base',
      className: 'testimonial-grid__metric',
      style: {
        typography: {
          fontWeight: '600',
          lineHeight: '1.4'
        }
      },
      textColor: 'primary-dark'
    }]
  ]],
  ['core/group', {
    className: 'testimonial-grid__card',
    style: {
      spacing: {
        padding: { top: '2.5rem', right: '2.5rem', bottom: '2.5rem', left: '2.5rem' }
      },
      border: { radius: '12px' }
    },
    backgroundColor: 'base'
  }, [
    ['core/paragraph', {
      content: '"Since switching to Imagewize for maintenance, our site uptime has been 99.98%. Their monthly reports give us complete visibility into our website\'s health and security."',
      fontFamily: 'open-sans',
      fontSize: 'lg',
      className: 'testimonial-grid__quote',
      style: {
        typography: {
          fontStyle: 'italic',
          lineHeight: '1.6'
        },
        spacing: {
          margin: { bottom: '1.5rem' }
        }
      },
      textColor: 'base-accent'
    }],
    ['core/paragraph', {
      content: 'David Thompson',
      fontFamily: 'montserrat',
      fontSize: 'base',
      className: 'testimonial-grid__author',
      style: {
        typography: {
          fontWeight: '600',
          lineHeight: '1.4'
        },
        spacing: {
          margin: { bottom: '0.25rem' }
        }
      },
      textColor: 'primary'
    }],
    ['core/paragraph', {
      content: 'Founder, Creative Studio Pro',
      fontFamily: 'open-sans',
      fontSize: 'sm',
      className: 'testimonial-grid__company',
      style: {
        typography: {
          lineHeight: '1.4'
        },
        spacing: {
          margin: { bottom: '1rem' }
        }
      },
      textColor: 'secondary'
    }],
    ['core/paragraph', {
      content: '99.98% uptime achieved',
      fontFamily: 'montserrat',
      fontSize: 'base',
      className: 'testimonial-grid__metric',
      style: {
        typography: {
          fontWeight: '600',
          lineHeight: '1.4'
        }
      },
      textColor: 'primary-dark'
    }]
  ]],
  ['core/group', {
    className: 'testimonial-grid__card',
    style: {
      spacing: {
        padding: { top: '2.5rem', right: '2.5rem', bottom: '2.5rem', left: '2.5rem' }
      },
      border: { radius: '12px' }
    },
    backgroundColor: 'base'
  }, [
    ['core/paragraph', {
      content: '"Imagewize migrated our entire site with zero downtime and improved our Core Web Vitals scores by 40%. The technical expertise and communication throughout the process was exceptional."',
      fontFamily: 'open-sans',
      fontSize: 'lg',
      className: 'testimonial-grid__quote',
      style: {
        typography: {
          fontStyle: 'italic',
          lineHeight: '1.6'
        },
        spacing: {
          margin: { bottom: '1.5rem' }
        }
      },
      textColor: 'base-accent'
    }],
    ['core/paragraph', {
      content: 'Emily Parker',
      fontFamily: 'montserrat',
      fontSize: 'base',
      className: 'testimonial-grid__author',
      style: {
        typography: {
          fontWeight: '600',
          lineHeight: '1.4'
        },
        spacing: {
          margin: { bottom: '0.25rem' }
        }
      },
      textColor: 'primary'
    }],
    ['core/paragraph', {
      content: 'Digital Manager, HealthFirst Medical',
      fontFamily: 'open-sans',
      fontSize: 'sm',
      className: 'testimonial-grid__company',
      style: {
        typography: {
          lineHeight: '1.4'
        },
        spacing: {
          margin: { bottom: '1rem' }
        }
      },
      textColor: 'secondary'
    }],
    ['core/paragraph', {
      content: '40% better Core Web Vitals',
      fontFamily: 'montserrat',
      fontSize: 'base',
      className: 'testimonial-grid__metric',
      style: {
        typography: {
          fontWeight: '600',
          lineHeight: '1.4'
        }
      },
      textColor: 'primary-dark'
    }]
  ]]
];

/**
 * Edit function that renders in the admin
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
    arrowColor: arrowColorAttr,
    arrowBackground: arrowBackgroundAttr,
    arrowHoverColor: arrowHoverColorAttr,
    arrowHoverBackground: arrowHoverBackgroundAttr,
  } = attributes;

  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-testimonial-grid'
  });

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

  const placeholder = (
    <div className="testimonial-grid-placeholder">
      {__('Click plus (+) to add testimonial cards', 'imagewize')}
    </div>
  );

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
        <PanelBody title={__('Carousel Settings', 'imagewize')} initialOpen={false}>
          <RangeControl
            label={__('Slides to Show (Desktop)', 'imagewize')}
            value={slidesToShow}
            onChange={(value) => setAttributes({ slidesToShow: value })}
            min={1}
            max={6}
            help={__('Number of cards visible at once on desktop when carousel is active (4+ cards)', 'imagewize')}
          />
          <RangeControl
            label={__('Slides to Scroll', 'imagewize')}
            value={slidesToScroll}
            onChange={(value) => setAttributes({ slidesToScroll: value })}
            min={1}
            max={6}
          />
          <RangeControl
            label={__('Animation Speed (ms)', 'imagewize')}
            value={speed}
            onChange={(value) => setAttributes({ speed: value })}
            min={100}
            max={3000}
            step={100}
          />
          <RangeControl
            label={__('Card Spacing (px)', 'imagewize')}
            value={attributes.slideSpacing}
            onChange={(value) => setAttributes({ slideSpacing: value })}
            min={0}
            max={50}
            step={1}
            help={__('Space between slides in carousel mode', 'imagewize')}
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
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <InnerBlocks
          template={TEMPLATE}
          templateLock={false}
          renderAppender={InnerBlocks.ButtonBlockAppender}
          placeholder={placeholder}
        />
      </div>
    </Fragment>
  );
});

export default Edit;
