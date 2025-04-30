/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  RichText,
  InspectorControls,
  PanelColorSettings,
} from '@wordpress/block-editor';
import {
  PanelBody,
  Button,
  TextControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Edit function that renders in the admin
 */
export default function Edit({ attributes, setAttributes }) {
  const { title, backgroundColor, faqs } = attributes;
  const blockProps = useBlockProps({
    className: `faq-section-container has-${backgroundColor}-background-color`,
  });
  
  const [faQitems, setFaqItems] = useState(faqs);

  // Update faqs attribute when faQitems state changes
  const updateFaqs = (newFaqs) => {
    setFaqItems(newFaqs);
    setAttributes({ faqs: newFaqs });
  };

  // Add new FAQ item
  const addFaq = () => {
    const newFaqs = [...faQitems, { 
      question: __('New Question', 'imagewize'), 
      answer: __('New Answer', 'imagewize') 
    }];
    updateFaqs(newFaqs);
  };

  // Remove FAQ item
  const removeFaq = (index) => {
    const newFaqs = [...faQitems];
    newFaqs.splice(index, 1);
    updateFaqs(newFaqs);
  };

  // Update FAQ question
  const updateQuestion = (value, index) => {
    const newFaqs = [...faQitems];
    newFaqs[index].question = value;
    updateFaqs(newFaqs);
  };

  // Update FAQ answer
  const updateAnswer = (value, index) => {
    const newFaqs = [...faQitems];
    newFaqs[index].answer = value;
    updateFaqs(newFaqs);
  };

  return (
    <>
      <InspectorControls>
        <PanelColorSettings
          title={__('Color Settings', 'imagewize')}
          initialOpen={true}
          colorSettings={[
            {
              value: backgroundColor,
              onChange: (value) => setAttributes({ backgroundColor: value || 'bggray' }),
              label: __('Background Color', 'imagewize'),
            },
          ]}
        />
      </InspectorControls>
      <div {...blockProps} style={{ padding: "4rem 2rem" }}>
        <RichText
          tagName="h2"
          className="faq-heading has-black-color has-text-color has-text-align-center has-3xl-font-size has-open-sans-font-family"
          value={title}
          onChange={(value) => setAttributes({ title: value })}
          placeholder={__('FAQ Section Title', 'imagewize')}
        />
        
        <div className="wp-block-group faq-items" style={{ gap: "1rem" }}>
          {faQitems.map((faq, index) => (
            <div key={index} className="wp-block-group faq-item" style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <RichText
                  tagName="h3"
                  className="faq-question has-black-color has-text-color has-lg-font-size has-open-sans-font-family"
                  value={faq.question}
                  onChange={(value) => updateQuestion(value, index)}
                  placeholder={__('FAQ Question', 'imagewize')}
                />
                <Button
                  isDestructive
                  onClick={() => removeFaq(index)}
                >
                  {__('Remove', 'imagewize')}
                </Button>
              </div>
              <div className="faq-answer-wrapper" style={{ display: 'block', marginTop: '0.5rem' }}>
                <RichText
                  tagName="div"
                  multiline="p"
                  className="faq-answer has-textbodygray-color has-text-color has-open-sans-font-family"
                  value={faq.answer}
                  onChange={(value) => updateAnswer(value, index)}
                  placeholder={__('FAQ Answer', 'imagewize')}
                />
              </div>
            </div>
          ))}
          
          <Button
            isPrimary
            onClick={addFaq}
            style={{ marginTop: "1rem" }}
          >
            {__('Add FAQ Item', 'imagewize')}
          </Button>
        </div>
      </div>
    </>
  );
}