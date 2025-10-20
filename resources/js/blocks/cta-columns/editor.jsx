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

  // CTA columns (2 columns with white card backgrounds)
  ['core/columns', {
    className: 'cta-columns__cards',
    style: {
      spacing: {
        blockGap: '1.875rem'
      }
    }
  }, [
    // Column 1 - White card
    ['core/column', {
      backgroundColor: 'base',
      style: {
        border: {
          radius: '0.5rem',
          width: '1px',
          color: 'var(--wp--preset--color--border-light)'
        },
        spacing: {
          padding: {
            top: '2.8125rem',
            right: '2.5rem',
            bottom: '2.8125rem',
            left: '2.5rem'
          }
        }
      }
    }, [
      ['core/heading', {
        level: 3,
        placeholder: 'CTA 1 Heading',
        textAlign: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--xl)',
            fontWeight: '600',
            lineHeight: '1.4'
          },
          spacing: {
            margin: {
              bottom: '1rem'
            }
          }
        },
        textColor: 'main',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        placeholder: 'CTA 1 Description',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--base)',
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
      ['core/buttons', {
        className: 'cta-columns__buttons',
        layout: {
          type: 'flex',
          justifyContent: 'center'
        }
      }, [
        ['core/button', {
          text: 'Primary Action',
          url: '#',
          backgroundColor: 'primary',
          textColor: 'base',
          className: 'is-style-fill',
          style: {
            border: {
              radius: '0.5rem'
            }
          }
        }]
      ]]
    ]],

    // Column 2 - White card
    ['core/column', {
      backgroundColor: 'base',
      style: {
        border: {
          radius: '0.5rem',
          width: '1px',
          color: 'var(--wp--preset--color--border-light)'
        },
        spacing: {
          padding: {
            top: '2.8125rem',
            right: '2.5rem',
            bottom: '2.8125rem',
            left: '2.5rem'
          }
        }
      }
    }, [
      ['core/heading', {
        level: 3,
        placeholder: 'CTA 2 Heading',
        textAlign: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--xl)',
            fontWeight: '600',
            lineHeight: '1.4'
          },
          spacing: {
            margin: {
              bottom: '1rem'
            }
          }
        },
        textColor: 'main',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        placeholder: 'CTA 2 Description',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--base)',
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
      ['core/buttons', {
        className: 'cta-columns__buttons',
        layout: {
          type: 'flex',
          justifyContent: 'center'
        }
      }, [
        ['core/button', {
          text: 'Secondary Action',
          url: '#',
          backgroundColor: 'primary',
          textColor: 'base',
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
            label="Background Color"
            value={colorVariant}
            options={[
              { label: 'Default (White)', value: 'default' },
              { label: 'Light Blue', value: 'light-blue' },
              { label: 'Dark', value: 'dark' }
            ]}
            onChange={(value) => setAttributes({ colorVariant: value })}
            help="Choose the background color for the CTA section"
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
