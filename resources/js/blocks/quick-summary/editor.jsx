/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * InnerBlocks template for the Quick Summary callout
 * Structure: Group (tertiary background, green left border) -> Paragraph
 *
 * Mirrors the markup used at the top of long-form posts: a "Quick Summary:"
 * lead-in followed by a few sentences covering the outcome of the article.
 */
const TEMPLATE = [
  [
    'core/group',
    {
      style: {
        spacing: {
          padding: {
            top: '1rem',
            bottom: '1rem',
            left: '1.5rem',
            right: '1rem',
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
        'core/paragraph',
        {
          content: '<strong>Quick Summary:</strong> Replace this with two or three sentences covering what the post concludes — the decision that was made, the numbers that back it, and what a reader should do differently as a result.',
          style: {
            typography: {
              lineHeight: '1.7',
            },
          },
        },
      ],
    ],
  ],
];

/**
 * Edit function that renders in the admin
 */
export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-quick-summary',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} templateLock={false} />
    </div>
  );
}
