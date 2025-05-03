/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

// Define the template using core blocks
const TEMPLATE = [
  ['core/spacer', { height: '50px' }], // Add spacer before columns
  ['core/heading', { 
    level: 2, 
    textAlign: 'center', 
    content: __('Website Packages', 'imagewize'), 
    className: 'pricing-main-title', // Optional class if specific styling needed beyond core
    fontSize: '3xl', // Example using theme.json preset
    fontFamily: 'open-sans' // Example using theme.json preset
  }],
  ['core/paragraph', { 
    align: 'center', 
    content: __('Choose the package that best fits your business needs', 'imagewize'), 
    className: 'pricing-main-subtitle', // Optional class
    textColor: 'ash-gray', // Updated from textbodygray
    fontSize: 'lg' // Example using theme.json preset
  }],
  ['core/group', { 
    align: 'full', // Add full width alignment
    layout: { type: 'constrained', contentSize: '64rem' },
    backgroundColor: 'primary-accent' // Set default background color
  }, [
    ['core/spacer', { height: '50px' }], // Add spacer before columns
    ['core/columns', { style: { spacing: { blockGap: { top: '2rem', left: '2rem' } } } }, [
      // Standard Column
      ['core/column', { 
        backgroundColor: 'white', // Changed from 'base'
        style: { 
          border: { width: '1px', color: '#cbcbcb', radius: '0.5rem' },
          spacing: { padding: { top: '2rem', right: '2rem', bottom: '2rem', left: '2rem' } }
        } 
      }, [
        ['core/heading', { level: 3, content: __('Standard', 'imagewize') }],
        ['core/paragraph', { 
          content: __('Perfect for small websites that need a professional presence.', 'imagewize'),
          textColor: 'ash-gray', // Updated from textbodygray
          fontSize: 'lg'
        }],
        ['core/heading', { 
          level: 4, 
          content: `<strong>${__('€799', 'imagewize')}</strong> <span style="font-weight:normal;font-size:1rem;color:#98999a">${__('starting price', 'imagewize')}</span>` 
        }],
        // Features - represented as paragraphs
        ['core/paragraph', { 
          content: __('Shared hosting with trusted hosting partners', 'imagewize'), 
          textColor: 'ash-gray', 
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '2rem' }, margin: { bottom: '2rem' } },
            border: { 
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', { 
          content: __('Responsive, mobile friendly design', 'imagewize'), 
          textColor: 'ash-gray', 
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '2rem' }, margin: { bottom: '2rem' } },
            border: { 
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', { 
          content: __('Basic SEO setup', 'imagewize'), 
          textColor: 'ash-gray', 
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '2rem' }, margin: { bottom: '2rem' } },
            border: { 
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', { 
          content: __('Turnkey Theme tailored to your business', 'imagewize'), 
          textColor: 'ash-gray' 
          // last item: no border/margin/padding
        }],
        // Button
        ['core/buttons', { style: { spacing: { margin: { top: '2rem' } } }, layout: { type: 'flex', justifyContent: 'left' } }, [
          ['core/button', { 
            text: __('Get Started', 'imagewize'), 
            url: '#', // Default URL, user can change
            backgroundColor: 'black', // Changed from 'base'
            textColor: 'white', 
            style: { border: { radius: '0.5rem' } } 
          }]
        ]]
      ]],
      // Premium Column
      ['core/column', { 
        backgroundColor: 'black', // Example using theme.json preset
        style: { 
          border: { width: '2px', color: 'var(--wp--preset--color--sky-blue)', radius: '0.5rem' }, // Updated from hardcoded color to use sky-blue variable
          spacing: { padding: { top: '2rem', right: '2rem', bottom: '2rem', left: '2rem' } }
        } 
      }, [
        ['core/heading', { 
          level: 3, 
          // Updated span class from has-ctablue-color to has-sky-blue-color
          content: `${__('Premium', 'imagewize')} <span class="has-sky-blue-color has-text-color has-background has-xs-font-size" style="border-radius:1rem;background-color:#e8f7fd;padding:0.5rem 1rem;font-size:0.75rem;margin-left:0.5rem"><strong>${__('MOST POPULAR', 'imagewize')}</strong></span>`,
          textColor: 'white'
        }],
        ['core/paragraph', { 
          content: __('Fully customized solution with advanced features.', 'imagewize'),
          textColor: 'white',
          fontSize: 'lg'
        }],
        ['core/heading', { 
          level: 4, 
          content: `<strong>${__('€2499', 'imagewize')}</strong> <span style="font-weight:normal;font-size:1rem;color:#98999a">${__('starting price', 'imagewize')}</span>`,
          textColor: 'white'
        }],
        // Features - represented as paragraphs
        ['core/paragraph', { 
          content: __('Premium VPS hosting (Trellis stack with Micro Caching, A+ SSL, WP CLI)', 'imagewize'), 
          textColor: 'white', 
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '2rem' }, margin: { bottom: '2rem' } },
            border: { 
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(255,255,255,0.15)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', { 
          content: __('Custom hybrid theme (block + classic elements)', 'imagewize'), 
          textColor: 'white', 
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '2rem' }, margin: { bottom: '2rem' } },
            border: { 
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(255,255,255,0.15)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', { 
          content: __('Advanced SEO optimization', 'imagewize'), 
          textColor: 'white', 
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '2rem' }, margin: { bottom: '2rem' } },
            border: { 
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'solid', color: 'rgba(255,255,255,0.15)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', { 
          content: __('6-month maintenance plan', 'imagewize'), 
          textColor: 'white' 
          // last item: no border/margin/padding
        }],
        // Button
        ['core/buttons', { style: { spacing: { margin: { top: '2rem' } } }, layout: { type: 'flex', justifyContent: 'left' } }, [
          ['core/button', { 
            text: __('Get Started', 'imagewize'), 
            url: '#', // Default URL, user can change
            backgroundColor: 'white', 
            textColor: 'black', 
            style: { border: { radius: '0.5rem' } } 
          }]
        ]]
      ]]
    ]],
    ['core/spacer', { height: '50px' }] // Add spacer after columns
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