/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save function that defines output on the frontend
 */
export default function Save({ attributes }) {
  const { title, backgroundColor, faqs = [] } = attributes;
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
        {faqs.map((faq, index) => (
          <div key={index} className="wp-block-group faq-item">
            <h3 className="faq-question has-black-color has-text-color has-lg-font-size has-open-sans-font-family">
              {faq.question}
            </h3>
            
            <div 
              className="faq-answer has-textbodygray-color has-text-color has-open-sans-font-family"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}