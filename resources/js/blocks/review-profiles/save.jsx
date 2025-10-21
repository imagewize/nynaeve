/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function that defines output on the frontend
 */
export default function Save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'wp-block-imagewize-review-profiles',
    style: {
      backgroundColor: attributes.backgroundColor,
      color: attributes.textColor,
    },
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
