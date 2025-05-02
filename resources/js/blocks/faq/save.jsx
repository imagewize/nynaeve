/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function that defines output on the frontend
 */
export default function Save({ attributes }) {
  const { title, backgroundColor } = attributes;
  const blockProps = useBlockProps.save({
    className: `faq-section-container has-${backgroundColor}-background-color has-background alignfull`,
    style: {
      paddingTop: '4rem',
      paddingRight: '2rem',
      paddingBottom: '4rem',
      paddingLeft: '2rem'
    }
  });
  
  return (
    <div { ...blockProps }>
      <h2 className="faq-heading has-black-color has-text-color has-text-align-center has-3xl-font-size has-open-sans-font-family">
        {title}
      </h2>

      <div className="wp-block-group faq-items">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}