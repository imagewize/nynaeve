/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function — defines frontend output
 */
export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'wp-block-imagewize-service-hero',
  });

  return (
    <div {...blockProps}>
      <div className="service-hero__content">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
