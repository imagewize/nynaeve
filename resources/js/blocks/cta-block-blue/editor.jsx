/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * InnerBlocks template - Group-based structure with centered content
 * This creates a full-width blue CTA block with constrained inner content
 */
const TEMPLATE = [
  [
    'core/spacer',
    {
      height: '100px',
    },
  ],
  [
    'core/group',
    {
      align: 'wide',
      layout: { type: 'constrained' },
    },
    [
      [
        'core/heading',
        {
          level: 2,
          textAlign: 'center',
          fontSize: '2-xl',
          textColor: 'base',
          style: {
            typography: {
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '1.2',
            },
            color: {
              text: 'var(--wp--preset--color--base)',
            },
          },
          content: 'We are here to help you. Let\'s talk.',
        },
      ],
      [
        'core/paragraph',
        {
          align: 'center',
          fontSize: 'lg',
          textColor: 'base',
          style: {
            typography: {
              fontFamily:
                '\'Open Sans\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif',
              lineHeight: '1.6',
            },
            spacing: {
              padding: {
                right: 'var(--wp--preset--spacing--40)',
                left: 'var(--wp--preset--spacing--40)',
              },
            },
            layout: {
              selfStretch: 'fixed',
              flexSize: '70%',
            },
            color: {
              text: 'var(--wp--preset--color--base)',
            },
          },
          content:
            'Went through it all here at Imagewize and curious? You have questions? A possible project you would like to discuss with us? Do now hesitate to hit us up!',
        },
      ],
      [
        'core/spacer',
        {
          height: '5px',
        },
      ],
      [
        'core/buttons',
        {
          layout: {
            type: 'flex',
            justifyContent: 'center',
          },
        },
        [
          [
            'core/button',
            {
              text: 'Say Hi!',
              url: 'https://imagewize.com/contact-us/',
              width: 50,
              backgroundColor: 'primary-dark',
              textColor: 'base',
              style: {
                typography: {
                  fontFamily:
                    '\'Open Sans\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif',
                  lineHeight: '1.4',
                },
                border: {
                  radius: '5px',
                },
                spacing: {
                  padding: {
                    top: 'var(--wp--preset--spacing--50)',
                    bottom: 'var(--wp--preset--spacing--50)',
                  },
                },
                color: {
                  background: 'var(--wp--preset--color--primary-dark)',
                  text: 'var(--wp--preset--color--base)',
                },
              },
            },
          ],
        ],
      ],
    ],
  ],
  [
    'core/spacer',
    {
      height: '100px',
    },
  ],
];

/**
 * Edit function that renders in the admin
 */
export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-nynaeve-cta-block-blue',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} templateLock={false} />
    </div>
  );
}
