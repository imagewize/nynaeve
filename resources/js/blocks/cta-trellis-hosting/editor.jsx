/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * InnerBlocks template for Trellis Hosting CTA
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
          content: 'Done Managing Your Own Server?',
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
          content: 'We offer managed WordPress hosting built on Trellis — Nginx, PHP 8.3, Redis, automated deployments via Ansible, and Bedrock structure on Hetzner EU. No shared hosting, no page builders, no surprises.',
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
          ['core/list-item', { content: 'Trellis + Bedrock on Hetzner EU (Frankfurt / Helsinki)' }],
          ['core/list-item', { content: 'Nginx + FastCGI caching + Redis object cache' }],
          ['core/list-item', { content: 'Automated deployments via Ansible, SSL via Let\'s Encrypt' }],
          ['core/list-item', { content: 'From €49/month — or €65/hour for one-off server work' }],
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
              url: '/contact/?service=trellis-hosting',
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
              text: 'View Hosting Plans',
              url: '/services/managed-wordpress-hosting/',
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
    className: 'wp-block-imagewize-cta-trellis-hosting',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} templateLock={false} />
    </div>
  );
}
