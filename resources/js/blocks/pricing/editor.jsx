/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

// Define the template using core blocks
const TEMPLATE = [
  ['core/spacer', { height: '50px' }],
  ['core/heading', {
    level: 2,
    textAlign: 'center',
    content: __('Website Packages', 'nynaeve'),
    className: 'pricing-main-title',
    fontSize: '2xl',
    fontFamily: 'open-sans'
  }],
  ['core/paragraph', {
    align: 'center',
    content: __('Choose the package that best fits your business needs', 'nynaeve'),
    className: 'pricing-main-subtitle',
    textColor: 'ash-gray',
    fontSize: 'lg'
  }],
  ['core/group', {
    align: 'full',
    layout: { type: 'constrained', contentSize: '80rem' },
    backgroundColor: 'primary-accent'
  }, [
    ['core/spacer', { height: '50px' }],
    ['core/group', {
      align: 'wide',
      style: {
        spacing: { blockGap: '1.5rem' }
      },
      layout: { type: 'grid', minimumColumnWidth: '19rem' }
    }, [
      // Kickstart Column
      ['core/group', {
        className: 'pricing-grid-item',
        backgroundColor: 'primary-accent',
        style: {
          border: { width: '2px', color: 'var(--wp--preset--color--primary)', radius: '0.5rem' },
          spacing: { padding: { top: '2rem', right: '1.5rem', bottom: '2rem', left: '1.5rem' } }
        },
        layout: { type: 'constrained' }
      }, [
        ['core/heading', { level: 3, content: __('Kickstart', 'nynaeve'), fontSize: 'xl' }],
        ['core/paragraph', {
          content: __('Quick start with professional demo templates.', 'nynaeve'),
          textColor: 'main',
          fontSize: 'base'
        }],
        ['core/heading', {
          level: 4,
          content: `<strong>${__('€299', 'nynaeve')}</strong> <span style="font-weight:normal;font-size:0.875rem;color:#98999a">${__('starting price', 'nynaeve')}</span>`,
          fontSize: 'xl'
        }],
        ['core/paragraph', {
          content: __('Client hosting or shared hosting (+€8/mo)', 'nynaeve'),
          textColor: 'main',
          className: 'pricing-feature-item',
          fontSize: 'sm',
          style: {
            spacing: { padding: { bottom: '1.5rem' }, margin: { bottom: '1.5rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('Elayne vertical demo (F&B, Spa & Wellness, Legal, Generic)', 'nynaeve'),
          textColor: 'main',
          className: 'pricing-feature-item',
          fontSize: 'sm',
          style: {
            spacing: { padding: { bottom: '1.5rem' }, margin: { bottom: '1.5rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('Basic WordPress & WooCommerce setup', 'nynaeve'),
          textColor: 'main',
          className: 'pricing-feature-item',
          fontSize: 'sm',
          style: {
            spacing: { padding: { bottom: '1.5rem' }, margin: { bottom: '1.5rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('2-week email support', 'nynaeve'),
          textColor: 'main',
          fontSize: 'sm'
        }],
        ['core/buttons', { style: { spacing: { margin: { top: '1.5rem' } } }, layout: { type: 'flex', justifyContent: 'left' } }, [
          ['core/button', {
            text: __('Get Started', 'nynaeve'),
            url: '#',
            backgroundColor: 'primary',
            textColor: 'white',
            fontSize: 'sm',
            style: { border: { radius: '0.5rem' } }
          }]
        ]]
      ]],
      // Standard Column
      ['core/group', {
        className: 'pricing-grid-item',
        backgroundColor: 'white',
        style: {
          border: { width: '1px', color: '#cbcbcb', radius: '0.5rem' },
          spacing: { padding: { top: '2rem', right: '1.5rem', bottom: '2rem', left: '1.5rem' } }
        },
        layout: { type: 'constrained' }
      }, [
        ['core/heading', { level: 3, content: __('Standard', 'nynaeve'), fontSize: 'xl' }],
        ['core/paragraph', {
          content: __('Perfect for small websites that need a professional presence.', 'nynaeve'),
          textColor: 'ash-gray',
          fontSize: 'base'
        }],
        ['core/heading', {
          level: 4,
          content: `<strong>${__('€799', 'nynaeve')}</strong> <span style="font-weight:normal;font-size:0.875rem;color:#98999a">${__('starting price', 'nynaeve')}</span>`,
          fontSize: 'xl'
        }],
        // Features - represented as paragraphs
        ['core/paragraph', {
          content: __('Shared hosting with trusted hosting partners', 'nynaeve'),
          textColor: 'ash-gray',
          className: 'pricing-feature-item',
          fontSize: 'sm',
          style: {
            spacing: { padding: { bottom: '1.5rem' }, margin: { bottom: '1.5rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('Elayne block theme built to match your needs', 'nynaeve'),
          textColor: 'ash-gray',
          className: 'pricing-feature-item',
          fontSize: 'sm',
          style: {
            spacing: { padding: { bottom: '1.5rem' }, margin: { bottom: '1.5rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('Basic SEO setup', 'nynaeve'),
          textColor: 'ash-gray',
          className: 'pricing-feature-item',
          fontSize: 'sm',
          style: {
            spacing: { padding: { bottom: '1.5rem' }, margin: { bottom: '1.5rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('Turnkey Theme tailored to your business', 'nynaeve'),
          textColor: 'ash-gray',
          fontSize: 'sm'
        }],
        // Button
        ['core/buttons', { style: { spacing: { margin: { top: '1.5rem' } } }, layout: { type: 'flex', justifyContent: 'left' } }, [
          ['core/button', {
            text: __('Get Started', 'nynaeve'),
            url: '#',
            backgroundColor: 'black',
            textColor: 'white',
            fontSize: 'sm',
            style: { border: { radius: '0.5rem' } }
          }]
        ]]
      ]],
      // Premium Column
      ['core/group', {
        className: 'pricing-grid-item',
        backgroundColor: 'black',
        style: {
          border: { width: '2px', color: 'var(--wp--preset--color--sky-blue)', radius: '0.5rem' },
          spacing: { padding: { top: '2rem', right: '1.5rem', bottom: '2rem', left: '1.5rem' } }
        },
        layout: { type: 'constrained' }
      }, [
        ['core/group', { layout: { type: 'flex', flexWrap: 'wrap', justifyContent: 'left' } }, [
          ['core/heading', {
            level: 3,
            content: __('Premium', 'nynaeve'),
            textColor: 'white',
            fontSize: 'xl'
          }],
          ['core/paragraph', {
            content: '<span class="has-sky-blue-color has-text-color has-background has-xs-font-size" style="border-radius:1rem;background-color:#e8f7fd;padding:0.5rem 1rem;font-size:0.75rem"><strong>' + __('MOST POPULAR', 'nynaeve') + '</strong></span>'
          }]
        ]],
        ['core/paragraph', {
          content: __('Fully customized solution with advanced features.', 'nynaeve'),
          textColor: 'white',
          fontSize: 'base'
        }],
        ['core/heading', {
          level: 4,
          content: `<strong>${__('€2499', 'nynaeve')}</strong> <span style="font-weight:normal;font-size:0.875rem;color:#98999a">${__('starting price', 'nynaeve')}</span>`,
          textColor: 'white',
          fontSize: 'xl'
        }],
        // Features - represented as paragraphs
        ['core/paragraph', {
          content: __('Premium VPS hosting (Trellis stack with Micro Caching, A+ SSL, WP CLI)', 'nynaeve'),
          textColor: 'white',
          className: 'pricing-feature-item',
          fontSize: 'sm',
          style: {
            spacing: { padding: { bottom: '1.5rem' }, margin: { bottom: '1.5rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(255,255,255,0.15)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('Custom hybrid theme (block + classic elements)', 'nynaeve'),
          textColor: 'white',
          className: 'pricing-feature-item',
          fontSize: 'sm',
          style: {
            spacing: { padding: { bottom: '1.5rem' }, margin: { bottom: '1.5rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(255,255,255,0.15)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('Advanced SEO optimization', 'nynaeve'),
          textColor: 'white',
          className: 'pricing-feature-item',
          fontSize: 'sm',
          style: {
            spacing: { padding: { bottom: '1.5rem' }, margin: { bottom: '1.5rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(255,255,255,0.15)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('6-month maintenance plan', 'nynaeve'),
          textColor: 'white',
          fontSize: 'sm'
        }],
        // Button
        ['core/buttons', { style: { spacing: { margin: { top: '1.5rem' } } }, layout: { type: 'flex', justifyContent: 'left' } }, [
          ['core/button', {
            text: __('Get Started', 'nynaeve'),
            url: '#',
            backgroundColor: 'white',
            textColor: 'black',
            fontSize: 'sm',
            style: { border: { radius: '0.5rem' } }
          }]
        ]]
      ]]
    ]],
    ['core/spacer', { height: '50px' }]
  ]]
];

/**
 * Editor component for the Pricing block
 */
export default function Edit() {
  // Removed attributes and setAttributes as content is handled by InnerBlocks
  const blockProps = useBlockProps();

  return (
    // Removed InspectorControls
    <div {...blockProps}>
      <InnerBlocks
        template={TEMPLATE}
        // templateLock={false} // Allow users to add/remove/modify blocks freely
        // Or lock structure more tightly:
        // templateLock="all" // Prevents adding/removing/moving blocks
        // templateLock="insert" // Prevents inserting or removing blocks, allows moving
      />
    </div>
  );
}