/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

/**
 * Block template structure - Simplified to just CTA cards
 */
const TEMPLATE = [
  // Optional section heading
  ['core/heading', {
    level: 2,
    placeholder: 'Enter section heading (optional)...',
    className: 'cta-columns__heading',
    textAlign: 'center',
    style: {
      typography: {
        fontSize: 'var(--wp--preset--font-size--2-xl)',
        fontWeight: '600',
        lineHeight: '1.3'
      },
      spacing: {
        margin: {
          bottom: '1.5rem'
        }
      }
    },
    textColor: 'main',
    fontFamily: 'montserrat'
  }],

  // Optional description paragraph
  ['core/paragraph', {
    placeholder: 'Enter optional description...',
    className: 'cta-columns__description',
    align: 'center',
    style: {
      typography: {
        fontSize: 'var(--wp--preset--font-size--lg)',
        lineHeight: '1.7'
      },
      spacing: {
        margin: {
          bottom: '2rem'
        }
      }
    },
    textColor: 'secondary',
    fontFamily: 'open-sans'
  }],

  // CTA columns (2 columns with dark card backgrounds)
  ['core/columns', {
    className: 'cta-columns__cards',
    style: {
      spacing: {
        blockGap: '2rem'
      }
    }
  }, [
    // Column 1 - Dark blue card
    ['core/column', {
      backgroundColor: 'primary',
      style: {
        border: {
          radius: '0.5rem'
        },
        spacing: {
          padding: {
            top: '3rem',
            right: '2.75rem',
            bottom: '3rem',
            left: '2.75rem'
          }
        }
      }
    }, [
      ['core/heading', {
        level: 3,
        content: 'Get Your Free Speed Audit',
        placeholder: 'CTA 1 Heading',
        textAlign: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--2-xl)',
            fontWeight: '700',
            lineHeight: '1.3'
          },
          spacing: {
            margin: {
              bottom: '1rem'
            }
          }
        },
        textColor: 'base',
        fontFamily: 'montserrat'
      }],
      ['core/separator', {
        className: 'is-style-wide',
        backgroundColor: 'primary-accent',
        style: {
          spacing: {
            margin: {
              top: '1rem',
              bottom: '1rem'
            }
          }
        }
      }],
      ['core/paragraph', {
        content: 'Find out exactly how fast your site could be. No cost, no obligation',
        placeholder: 'CTA 1 Description',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--lg)',
            lineHeight: '1.7'
          },
          spacing: {
            margin: {
              bottom: '1.5rem'
            }
          }
        },
        textColor: 'base',
        fontFamily: 'open-sans'
      }],
      ['core/buttons', {
        className: 'cta-columns__buttons',
        layout: {
          type: 'flex',
          justifyContent: 'center'
        }
      }, [
        ['core/button', {
          text: 'Get Free Audit',
          url: '#',
          backgroundColor: 'base',
          textColor: 'primary',
          className: 'is-style-fill',
          style: {
            border: {
              radius: '0.5rem'
            }
          }
        }]
      ]]
    ]],

    // Column 2 - Dark blue card
    ['core/column', {
      backgroundColor: 'primary',
      style: {
        border: {
          radius: '0.5rem'
        },
        spacing: {
          padding: {
            top: '3rem',
            right: '2.75rem',
            bottom: '3rem',
            left: '2.75rem'
          }
        }
      }
    }, [
      ['core/heading', {
        level: 3,
        content: 'Talk to a Speed Expert',
        placeholder: 'CTA 2 Heading',
        textAlign: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--2-xl)',
            fontWeight: '700',
            lineHeight: '1.3'
          },
          spacing: {
            margin: {
              bottom: '1rem'
            }
          }
        },
        textColor: 'base',
        fontFamily: 'montserrat'
      }],
      ['core/separator', {
        className: 'is-style-wide',
        backgroundColor: 'primary-accent',
        style: {
          spacing: {
            margin: {
              top: '1rem',
              bottom: '1rem'
            }
          }
        }
      }],
      ['core/paragraph', {
        content: 'Discuss your site\'s performance with our technical team',
        placeholder: 'CTA 2 Description',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--lg)',
            lineHeight: '1.7'
          },
          spacing: {
            margin: {
              bottom: '1.5rem'
            }
          }
        },
        textColor: 'base',
        fontFamily: 'open-sans'
      }],
      ['core/buttons', {
        className: 'cta-columns__buttons',
        layout: {
          type: 'flex',
          justifyContent: 'center'
        }
      }, [
        ['core/button', {
          text: 'Schedule Call',
          url: '#',
          backgroundColor: 'base',
          textColor: 'primary',
          className: 'is-style-fill',
          style: {
            border: {
              radius: '0.5rem'
            }
          }
        }]
      ]]
    ]]
  ]]
];

/**
 * Edit function that renders in the admin
 */
export default function Edit({ attributes, setAttributes }) {
  const { colorVariant } = attributes;

  // Determine background color class based on variant
  const getBackgroundClass = () => {
    switch(colorVariant) {
      case 'light-gray':
        return 'has-tertiary-background-color';
      case 'light-blue':
        return 'has-primary-accent-background-color';
      case 'dark':
        return 'has-main-background-color';
      default:
        return '';
    }
  };

  const blockProps = useBlockProps({
    className: `cta-columns ${getBackgroundClass()}`.trim()
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Appearance Settings">
          <SelectControl
            label="Section Background Color"
            value={colorVariant}
            options={[
              { label: 'Default (White/Transparent)', value: 'default' },
              { label: 'Light Gray', value: 'light-gray' },
              { label: 'Light Blue', value: 'light-blue' },
              { label: 'Dark', value: 'dark' }
            ]}
            onChange={(value) => setAttributes({ colorVariant: value })}
            help="Choose the background color for the entire CTA section (cards remain dark blue)"
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <InnerBlocks
          template={TEMPLATE}
          templateLock={false}
        />
      </div>
    </>
  );
}
