/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function that defines output on the frontend
 */
export default function Save({ attributes }) {
  // Get all block props including background color, alignment, and spacing
  const blockProps = useBlockProps.save({
    className: `wp-block-imagewize-hero align${attributes.align || 'full'}`
  });
  
  return (
    <div { ...blockProps }>
      <InnerBlocks.Content />
    </div>
  );
}