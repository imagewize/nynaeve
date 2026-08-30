/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function that defines output on the frontend
 */
export default function Save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: `wp-block-imagewize-cta is-variant-${attributes.variant}`,
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
