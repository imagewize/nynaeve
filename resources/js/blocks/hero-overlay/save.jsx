/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function that defines output on the frontend
 */
export default function Save({ attributes }) {
  const { overlayColor } = attributes;
  const blockProps = useBlockProps.save();
  
  return (
    <div { ...blockProps } style={{ '--overlay-color': overlayColor }}>
      <InnerBlocks.Content />
    </div>
  );
}