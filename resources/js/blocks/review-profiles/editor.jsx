/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Photo URLs resolved via imagewize/review-photo block binding.
 * window.imagewizeReviewPhotos is injected by setup.php enqueue_block_editor_assets.
 * Do not `import` the .webp files directly — Vite hashes them into a URL that
 * gets baked into saved post content and 404s on the next rebuild. See the
 * imagewize/theme-icon binding (same file) for the same rationale.
 */
const photos = window.imagewizeReviewPhotos ?? {};

/**
 * Helper: build a core/image block with review-photo binding.
 */
const reviewPhoto = (path, alt) => [
  'core/image',
  {
    url: photos[path] ?? '',
    alt,
    style: { border: { radius: '100px' } },
    metadata: {
      bindings: {
        url: {
          source: 'imagewize/review-photo',
          args: { path },
        },
      },
    },
  },
];

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
                  reviewPhoto('profile1.webp', 'Client Profile 1'),
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
                  reviewPhoto('profile2.webp', 'Client Profile 2'),
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
                  reviewPhoto('profile3.webp', 'Client Profile 3'),
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
