/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * InnerBlocks template for Performance Partnership CTA
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
          content: 'Want Results Like These for Your Site?',
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
          content: 'We provide WordPress speed optimization for SMEs and white-label performance services for agencies. Our typical results: 90+ PageSpeed scores on both mobile and desktop, with measurable improvements to Core Web Vitals and conversion rates.',
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
          ['core/list-item', { content: 'Core Web Vitals optimization (LCP, CLS, INP)' }],
          ['core/list-item', { content: 'WooCommerce performance tuning' }],
          ['core/list-item', { content: 'Server-side optimization (Nginx, Trellis)' }],
          ['core/list-item', { content: 'Image optimization and lazy loading' }],
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
              text: 'View Speed Optimization Services',
              url: '/services/speed-optimization/',
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
              text: 'Get a Performance Audit',
              url: '/contact/?service=performance-audit',
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
    className: 'wp-block-imagewize-cta-performance-partnership',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} templateLock={false} />
    </div>
  );
}
