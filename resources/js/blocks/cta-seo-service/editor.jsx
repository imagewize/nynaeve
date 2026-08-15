/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * InnerBlocks template for SEO Service CTA
 * Structure: Spacer -> Group (with left border, tertiary background) -> Heading, Paragraph, List, Buttons
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
          content: 'Need WordPress SEO Support for Your Business?',
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
          content: 'We handle WordPress SEO for SMEs — from technical foundations (schema, crawlability, Core Web Vitals) to on-page optimization and content strategy. Fixed-price audits and ongoing support available.',
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
          ['core/list-item', { content: 'Technical SEO audit and implementation' }],
          ['core/list-item', { content: 'Schema markup and structured data' }],
          ['core/list-item', { content: 'Core Web Vitals and page speed optimization' }],
          ['core/list-item', { content: 'On-page SEO and content strategy' }],
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
              text: 'Get an SEO Audit',
              url: '/contact/?service=wordpress-seo',
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
              text: 'View SEO Services',
              url: '/services/wordpress-seo/',
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
    className: 'wp-block-imagewize-cta-seo-service',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} templateLock={false} />
    </div>
  );
}
