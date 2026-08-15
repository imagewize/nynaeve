/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * InnerBlocks template for WooCommerce CTA
 */
const TEMPLATE = [
  [
    'core/spacer',
    {
      height: '32px',
    },
  ],
  [
    'core/group',
    {
      style: {
        spacing: {
          padding: {
            top: '1.5rem',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
          },
        },
        border: {
          left: {
            color: '#10b981',
            width: '4px',
          },
        },
      },
      backgroundColor: 'tertiary',
    },
    [
      [
        'core/heading',
        {
          level: 3,
          content: 'Need a WooCommerce Developer for Your Store?',
          style: {
            typography: {
              fontWeight: '600',
              lineHeight: '1.3',
            },
          },
        },
      ],
      [
        'core/paragraph',
        {
          content: 'We build and optimize WooCommerce stores for SMEs — from custom checkout flows and payment integrations to performance tuning and ongoing maintenance. Fixed-price quotes available.',
          style: {
            typography: {
              lineHeight: '1.7',
            },
          },
        },
      ],
      [
        'core/list',
        {
          className: 'wp-block-list',
        },
        [
          ['core/list-item', { content: 'Custom checkout and cart optimization' }],
          ['core/list-item', { content: 'Payment gateway integration (Stripe, Mollie, PayPal)' }],
          ['core/list-item', { content: 'WooCommerce performance and speed optimization' }],
          ['core/list-item', { content: 'Ongoing store maintenance and support' }],
        ],
      ],
      [
        'core/buttons',
        {
          layout: {
            type: 'flex',
            flexWrap: 'wrap',
          },
        },
        [
          [
            'core/button',
            {
              text: 'Get a Quote',
              url: '/contact/?service=woocommerce',
              backgroundColor: 'primary',
              textColor: 'base',
              style: {
                border: {
                  radius: '8px',
                },
              },
            },
          ],
          [
            'core/button',
            {
              text: 'View WooCommerce Services',
              url: '/services/woocommerce/',
              className: 'is-style-outline',
              style: {
                border: {
                  radius: '8px',
                },
              },
            },
          ],
        ],
      ],
    ],
  ],
];

/**
 * Edit function that renders in the admin
 */
export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-cta-woocommerce',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} templateLock={false} />
    </div>
  );
}
