/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

// Define the 3-column pricing template using core blocks
const TEMPLATE = [
  ['core/spacer', { height: '50px' }],
  ['core/heading', {
    level: 2,
    textAlign: 'center',
    content: __('Choose Your Plan', 'imagewize'),
    className: 'pricing-main-title',
    fontSize: '3xl',
    fontFamily: 'open-sans'
  }],
  ['core/paragraph', {
    align: 'center',
    content: __('Select the perfect plan for your needs', 'imagewize'),
    className: 'pricing-main-subtitle',
    textColor: 'secondary',
    fontSize: 'lg'
  }],
  ['core/group', {
    align: 'full',
    layout: { type: 'constrained', contentSize: '64rem' },
    backgroundColor: 'base'
  }, [
    ['core/spacer', { height: '50px' }],
    ['core/columns', { style: { spacing: { blockGap: { top: '2rem', left: '2rem' } } } }, [
      // Column 1: Essential Plan (White)
      ['core/column', {
        backgroundColor: 'white',
        style: {
          border: { width: '1px', color: '#cbcbcb', radius: '0.5rem' },
          spacing: { padding: { top: '2rem', right: '2rem', bottom: '2rem', left: '2rem' } }
        }
      }, [
        ['core/heading', {
          level: 3,
          content: __('Essential', 'imagewize'),
          textAlign: 'center'
        }],
        ['core/paragraph', {
          content: __('Perfect for small businesses', 'imagewize'),
          textColor: 'secondary',
          fontSize: 'lg',
          align: 'center'
        }],
        ['core/heading', {
          level: 4,
          content: `<strong>${__('€59', 'imagewize')}</strong> <span style="font-weight:normal;font-size:1rem;color:#98999a">${__('per month', 'imagewize')}</span>`,
          textAlign: 'center'
        }],
        ['core/spacer', { height: '1rem' }],
        // Features
        ['core/paragraph', {
          content: __('✓ Basic monitoring', 'imagewize'),
          textColor: 'secondary',
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '1rem' }, margin: { bottom: '1rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'dotted', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('✓ Monthly updates', 'imagewize'),
          textColor: 'secondary',
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '1rem' }, margin: { bottom: '1rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'dotted', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('✓ Email support', 'imagewize'),
          textColor: 'secondary',
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '1rem' }, margin: { bottom: '1rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'dotted', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('✓ 1 hour response time', 'imagewize'),
          textColor: 'secondary'
        }],
        ['core/spacer', { height: '1rem' }],
        // Button
        ['core/buttons', {
          style: { spacing: { margin: { top: '1rem' } } },
          layout: { type: 'flex', justifyContent: 'center' }
        }, [
          ['core/button', {
            text: __('Get Started', 'imagewize'),
            url: '#',
            backgroundColor: 'primary',
            textColor: 'white',
            style: { border: { radius: '0.5rem' } },
            className: 'is-style-fill'
          }]
        ]]
      ]],

      // Column 2: Business Plan (Featured - Primary Accent)
      ['core/column', {
        backgroundColor: 'primary-accent',
        style: {
          border: { width: '2px', color: 'var(--wp--preset--color--primary)', radius: '0.5rem' },
          spacing: { padding: { top: '2rem', right: '2rem', bottom: '2rem', left: '2rem' } }
        },
        className: 'pricing-featured-column'
      }, [
        ['core/heading', {
          level: 3,
          content: `${__('Business', 'imagewize')} <span class="has-primary-color has-text-color has-background has-xs-font-size" style="border-radius:1rem;background-color:#ffffff;padding:0.5rem 1rem;font-size:0.75rem;margin-left:0.5rem"><strong>${__('MOST POPULAR', 'imagewize')}</strong></span>`,
          textAlign: 'center'
        }],
        ['core/paragraph', {
          content: __('For growing businesses', 'imagewize'),
          textColor: 'main',
          fontSize: 'lg',
          align: 'center'
        }],
        ['core/heading', {
          level: 4,
          content: `<strong>${__('€99', 'imagewize')}</strong> <span style="font-weight:normal;font-size:1rem;color:#98999a">${__('per month', 'imagewize')}</span>`,
          textAlign: 'center'
        }],
        ['core/spacer', { height: '1rem' }],
        // Features
        ['core/paragraph', {
          content: __('✓ Advanced monitoring', 'imagewize'),
          textColor: 'main',
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '1rem' }, margin: { bottom: '1rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'dotted', color: 'rgba(1,124,182,0.3)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('✓ Weekly updates', 'imagewize'),
          textColor: 'main',
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '1rem' }, margin: { bottom: '1rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'dotted', color: 'rgba(1,124,182,0.3)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('✓ Priority support', 'imagewize'),
          textColor: 'main',
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '1rem' }, margin: { bottom: '1rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'dotted', color: 'rgba(1,124,182,0.3)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('✓ 30 min response time', 'imagewize'),
          textColor: 'main'
        }],
        ['core/spacer', { height: '1rem' }],
        // Button
        ['core/buttons', {
          style: { spacing: { margin: { top: '1rem' } } },
          layout: { type: 'flex', justifyContent: 'center' }
        }, [
          ['core/button', {
            text: __('Get Started', 'imagewize'),
            url: '#',
            backgroundColor: 'primary',
            textColor: 'white',
            style: { border: { radius: '0.5rem' } },
            className: 'is-style-fill'
          }]
        ]]
      ]],

      // Column 3: Enterprise Plan (White)
      ['core/column', {
        backgroundColor: 'white',
        style: {
          border: { width: '1px', color: '#cbcbcb', radius: '0.5rem' },
          spacing: { padding: { top: '2rem', right: '2rem', bottom: '2rem', left: '2rem' } }
        }
      }, [
        ['core/heading', {
          level: 3,
          content: __('Enterprise', 'imagewize'),
          textAlign: 'center'
        }],
        ['core/paragraph', {
          content: __('For large organizations', 'imagewize'),
          textColor: 'secondary',
          fontSize: 'lg',
          align: 'center'
        }],
        ['core/heading', {
          level: 4,
          content: `<strong>${__('€199', 'imagewize')}</strong> <span style="font-weight:normal;font-size:1rem;color:#98999a">${__('per month', 'imagewize')}</span>`,
          textAlign: 'center'
        }],
        ['core/spacer', { height: '1rem' }],
        // Features
        ['core/paragraph', {
          content: __('✓ 24/7 monitoring', 'imagewize'),
          textColor: 'secondary',
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '1rem' }, margin: { bottom: '1rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'dotted', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('✓ Daily updates', 'imagewize'),
          textColor: 'secondary',
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '1rem' }, margin: { bottom: '1rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'dotted', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('✓ Dedicated support', 'imagewize'),
          textColor: 'secondary',
          className: 'pricing-feature-item',
          style: {
            spacing: { padding: { bottom: '1rem' }, margin: { bottom: '1rem' } },
            border: {
              top: { width: '0px', style: 'none' },
              right: { width: '0px', style: 'none' },
              bottom: { width: '2px', style: 'dotted', color: 'rgba(0,0,0,0.1)' },
              left: { width: '0px', style: 'none' }
            }
          }
        }],
        ['core/paragraph', {
          content: __('✓ 15 min response time', 'imagewize'),
          textColor: 'secondary'
        }],
        ['core/spacer', { height: '1rem' }],
        // Button
        ['core/buttons', {
          style: { spacing: { margin: { top: '1rem' } } },
          layout: { type: 'flex', justifyContent: 'center' }
        }, [
          ['core/button', {
            text: __('Get Started', 'imagewize'),
            url: '#',
            backgroundColor: 'primary',
            textColor: 'white',
            style: { border: { radius: '0.5rem' } },
            className: 'is-style-fill'
          }]
        ]]
      ]]
    ]],
    ['core/spacer', { height: '50px' }]
  ]]
];

/**
 * Editor component for the Pricing Tiers block
 */
export default function Edit() {
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} />
    </div>
  );
}
