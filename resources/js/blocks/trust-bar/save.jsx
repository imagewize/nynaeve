/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function — defines frontend output
 */
export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'wp-block-imagewize-trust-bar',
  });

  return (
    <div {...blockProps}>
      <div className="trust-bar__inner">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
