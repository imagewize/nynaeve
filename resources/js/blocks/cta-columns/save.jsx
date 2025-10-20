/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function that defines output on the frontend
 */
export default function Save({ attributes }) {
  const { colorVariant } = attributes;

  // Determine background color class based on variant
  const getBackgroundClass = () => {
    switch(colorVariant) {
      case 'light-blue':
        return 'has-primary-accent-background-color';
      case 'dark':
        return 'has-main-background-color';
      default:
        return '';
    }
  };

  const blockProps = useBlockProps.save({
    className: `cta-columns ${getBackgroundClass()}`.trim()
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}