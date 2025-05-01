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
  useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
  PanelBody,
  Button,
  TextControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Edit function that renders in the admin
 */
export default function Edit({ attributes, setAttributes, clientId }) {
  const { title, backgroundColor } = attributes;
  const blockProps = useBlockProps({
    className: `faq-section-container has-${backgroundColor}-background-color`,
  });
  
  const { insertBlock } = useDispatch('core/block-editor');
  const innerBlocks = useSelect(
    (select) => select('core/block-editor').getBlocks(clientId),
    [clientId]
  );

  // Function to add a new FAQ item (question+answer pair)
  const addFaqItem = () => {
    const faqItem = createBlock('core/group', {
      className: 'faq-item',
    }, [
      createBlock('core/heading', {
        level: 3,
        content: __('New Question', 'imagewize'),
        className: 'faq-question has-black-color has-text-color has-lg-font-size has-open-sans-font-family has-indicator is-collapsed',
      }),
      createBlock('core/paragraph', {
        content: __('Enter answer here...', 'imagewize'),
        className: 'faq-answer has-textbodygray-color has-text-color has-open-sans-font-family collapsed',
      }),
    ]);
    
    insertBlock(faqItem, innerBlocks.length, clientId);
  };

  // Template for initial FAQ items
  const TEMPLATE = [
    ['core/group', { className: 'faq-item' }, [
      ['core/heading', { 
        level: 3, 
        content: __('What\'s included in the Standard package?', 'imagewize'),
        className: 'faq-question has-black-color has-text-color has-lg-font-size has-open-sans-font-family has-indicator is-collapsed',
      }],
      ['core/paragraph', { 
        content: __('You\'ll receive a 3–5‑page site built on our customizable block theme, hosted on a shared server, fully responsive, with basic on‑page SEO and a vertical‑specific child‑theme tailored to your brand.', 'imagewize'),
        className: 'faq-answer has-textbodygray-color has-text-color has-open-sans-font-family collapsed',
      }],
    ]],
    ['core/group', { className: 'faq-item' }, [
      ['core/heading', { 
        level: 3, 
        content: __('What\'s included in the Premium package?', 'imagewize'),
        className: 'faq-question has-black-color has-text-color has-lg-font-size has-open-sans-font-family has-indicator is-collapsed',
      }],
      ['core/paragraph', { 
        content: __('The Premium package includes a customized Sage based hybrid theme with bespoke design components, version control, VPS hosting on our Trellis stack for optimal performance, comprehensive SEO setup and optimization, advanced analytics integration, and a 6-month maintenance plan with regular updates and support.', 'imagewize'),
        className: 'faq-answer has-textbodygray-color has-text-color has-open-sans-font-family collapsed',
      }],
    ]],
    ['core/group', { className: 'faq-item' }, [
      ['core/heading', { 
        level: 3, 
        content: __('How long does each package take to launch?', 'imagewize'),
        className: 'faq-question has-black-color has-text-color has-lg-font-size has-open-sans-font-family has-indicator is-collapsed',
      }],
      ['core/list', { 
        className: 'faq-answer has-textbodygray-color has-text-color has-open-sans-font-family collapsed',
      }, [
        ['core/list-item', {
          content: __('<strong>Standard:</strong> ~2–3 weeks from kickoff to go‑live.', 'imagewize'),
        }],
        ['core/list-item', {
          content: __('<strong>Premium:</strong> ~4–6 weeks, including design mockups, development sprints, and initial SEO setup.', 'imagewize'),
        }],
      ]],
    ]],
    ['core/group', { className: 'faq-item' }, [
      ['core/heading', { 
        level: 3, 
        content: __('What is a "hybrid theme"?', 'imagewize'),
        className: 'faq-question has-black-color has-text-color has-lg-font-size has-open-sans-font-family has-indicator is-collapsed',
      }],
      ['core/paragraph', { 
        content: __('It\'s a custom WordPress theme base on Sage combining block‑based templates for easy content editing with classic PHP templates for bespoke design elements—giving you the best of both worlds.', 'imagewize'),
        className: 'faq-answer has-textbodygray-color has-text-color has-open-sans-font-family collapsed',
      }],
    ]],
    ['core/group', { className: 'faq-item' }, [
      ['core/heading', { 
        level: 3, 
        content: __('What does the 6‑month maintenance plan cover?', 'imagewize'),
        className: 'faq-question has-black-color has-text-color has-lg-font-size has-open-sans-font-family has-indicator is-collapsed',
      }],
      ['core/paragraph', { 
        content: __('Monthly core, plugin, and theme updates; security monitoring; performance tweaks; and up to 4 small content or styling changes per month.', 'imagewize'),
        className: 'faq-answer has-textbodygray-color has-text-color has-open-sans-font-family collapsed',
      }],
    ]],
    ['core/group', { className: 'faq-item' }, [
      ['core/heading', { 
        level: 3, 
        content: __('Do I need to supply content and images?', 'imagewize'),
        className: 'faq-question has-black-color has-text-color has-lg-font-size has-open-sans-font-family has-indicator is-collapsed',
      }],
      ['core/paragraph', { 
        content: __('Yes—client‑provided copy and high‑res images streamline the build. We can recommend stock sources or content‑writing partners if needed.', 'imagewize'),
        className: 'faq-answer has-textbodygray-color has-text-color has-open-sans-font-family collapsed',
      }],
    ]],
    ['core/group', { className: 'faq-item' }, [
      ['core/heading', { 
        level: 3, 
        content: __('What is the Trellis stack?', 'imagewize'),
        className: 'faq-question has-black-color has-text-color has-lg-font-size has-open-sans-font-family has-indicator is-collapsed',
      }],
      ['core/paragraph', { 
        content: __('Trellis is a modern, Ansible‑driven provisioning system for WordPress, providing automated security, caching, and server hardening—ideal for high‑performance VPS hosting.', 'imagewize'),
        className: 'faq-answer has-textbodygray-color has-text-color has-open-sans-font-family collapsed',
      }],
    ]],
  ];

  // Configure the inner blocks props
  const innerBlocksProps = useInnerBlocksProps(
    { className: 'wp-block-group faq-items' },
    {
      template: TEMPLATE,
      allowedBlocks: ['core/group'],
      templateLock: false,
      renderAppender: false,
    }
  );

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

      <div {...blockProps}>
        <RichText
          tagName="h2"
          className="faq-heading has-black-color has-text-color has-text-align-center has-3xl-font-size has-open-sans-font-family"
          value={title}
          onChange={(value) => setAttributes({ title: value })}
          placeholder={__('FAQ Section Title', 'imagewize')}
        />
        
        <div {...innerBlocksProps} />
        
        <div className="faq-controls">
          <Button
            variant="primary"
            onClick={addFaqItem}
            className="add-faq-button"
          >
            {__('Add FAQ Item', 'imagewize')}
          </Button>
        </div>
      </div>
    </>
  );
}