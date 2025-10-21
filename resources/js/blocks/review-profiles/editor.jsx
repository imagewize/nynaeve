/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

// Import profile images
import profile1 from './assets/profile1.webp';
import profile2 from './assets/profile2.webp';
import profile3 from './assets/profile3.webp';

/**
 * InnerBlocks template with 3-column review layout
 */
const TEMPLATE = [
  [
    'core/group',
    {
      layout: { type: 'constrained' },
      align: 'wide',
    },
    [
      ['core/spacer', { height: '80px' }],
      [
        'core/heading',
        {
          textAlign: 'center',
          align: 'wide',
          content: 'Client Reviews.',
          fontSize: '3xl',
          fontFamily: 'open-sans',
          style: {
            typography: { fontWeight: '600' },
            color: { text: '#ffffff' },
          },
        },
      ],
      [
        'core/columns',
        {
          align: 'wide',
        },
        [
          [
            'core/column',
            {},
            [
              [
                'core/group',
                {
                  layout: {
                    type: 'flex',
                    orientation: 'vertical',
                    justifyContent: 'center',
                  },
                  style: { spacing: { blockGap: '1rem' } },
                },
                [
                  [
                    'core/image',
                    {
                      width: '95px',
                      url: profile1,
                      alt: 'Client Profile 1',
                      style: { border: { radius: '100px' } },
                    },
                  ],
                  [
                    'core/paragraph',
                    {
                      align: 'center',
                      fontSize: 'lg',
                      fontFamily: 'open-sans',
                      content:
                        'We have hired Jasper a couple of times and he always does a great job and in a timely manner! He is very good at what he does and we continue to use him for our projects.',
                      style: { color: { text: '#ffffff' } },
                    },
                  ],
                ],
              ],
            ],
          ],
          [
            'core/column',
            {},
            [
              [
                'core/group',
                {
                  layout: {
                    type: 'flex',
                    orientation: 'vertical',
                    justifyContent: 'center',
                  },
                  style: { spacing: { blockGap: '1rem' } },
                },
                [
                  [
                    'core/image',
                    {
                      width: '95px',
                      url: profile2,
                      alt: 'Client Profile 2',
                      style: { border: { radius: '100px' } },
                    },
                  ],
                  [
                    'core/paragraph',
                    {
                      align: 'center',
                      fontSize: 'lg',
                      fontFamily: 'open-sans',
                      content:
                        'His communication was top-notch, he met all deadlines, and his skills were very strong. He was proficient in WordPress, Woo Commerce, Shopify and programming on those platforms to get our new Shopify site up and running.',
                      style: { color: { text: '#ffffff' } },
                    },
                  ],
                ],
              ],
            ],
          ],
          [
            'core/column',
            {},
            [
              [
                'core/group',
                {
                  layout: {
                    type: 'flex',
                    orientation: 'vertical',
                    justifyContent: 'center',
                  },
                  style: { spacing: { blockGap: '1rem' } },
                },
                [
                  [
                    'core/image',
                    {
                      width: '95px',
                      url: profile3,
                      alt: 'Client Profile 3',
                      style: { border: { radius: '100px' } },
                    },
                  ],
                  [
                    'core/paragraph',
                    {
                      align: 'center',
                      fontSize: 'lg',
                      fontFamily: 'open-sans',
                      content:
                        "Couldn't have done this job without jasper and he did a great job. My website now runs faster than ever. Would definitely hire again.",
                      style: { color: { text: '#ffffff' } },
                    },
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
      ['core/spacer', { height: '80px' }],
    ],
  ],
];

/**
 * Edit function that renders in the admin
 */
export default function Edit({ attributes }) {
  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-review-profiles',
    style: {
      backgroundColor: attributes.backgroundColor,
      color: attributes.textColor,
    },
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} />
    </div>
  );
}
