/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * InnerBlocks template for FSE / Block Theme CTA
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
          content: 'Need Help with a Block Theme or FSE Build?',
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
          content: 'We build and debug WordPress block themes — full-site editing templates, pattern libraries, Site Editor workflows, and the WP-CLI plumbing that keeps them deployable. Fixed-price quotes and ongoing support available.',
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
          ['core/list-item', { content: 'FSE block theme builds and migrations from classic themes' }],
          ['core/list-item', { content: 'Block pattern libraries and Site Editor template work' }],
          ['core/list-item', { content: 'Pattern validation, debugging, and WP-CLI deployment workflows' }],
          ['core/list-item', { content: 'WooCommerce on block themes — single product, shop, and archive templates' }],
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
              url: '/contact/?service=block-theme-development',
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
              text: 'View WordPress Services',
              url: '/services/wordpress-development/',
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
    className: 'wp-block-imagewize-cta-fse-block-theme',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} templateLock={false} />
    </div>
  );
}
