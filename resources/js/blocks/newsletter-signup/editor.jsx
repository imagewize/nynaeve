import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const TEMPLATE = [
  ['core/heading', { level: 2, content: 'Get one useful WooCommerce note a month' }],
  [
    'core/paragraph',
    {
      content:
        'Short, practical emails for shop owners: what I measured, what broke and what it cost. No spam, unsubscribe in one click.',
    },
  ],
];

export default function Edit({ attributes, setAttributes }) {
  const {
    nameLabel,
    emailLabel,
    consentText,
    privacyLabel,
    privacyUrl,
    buttonText,
    successMessage,
    errorMessage,
  } = attributes;

  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-newsletter-signup',
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Form text', 'nynaeve')}>
          <TextControl
            __nextHasNoMarginBottom
            label={__('Name label', 'nynaeve')}
            value={nameLabel}
            onChange={(value) => setAttributes({ nameLabel: value })}
          />
          <TextControl
            __nextHasNoMarginBottom
            label={__('Email label', 'nynaeve')}
            value={emailLabel}
            onChange={(value) => setAttributes({ emailLabel: value })}
          />
          <TextareaControl
            __nextHasNoMarginBottom
            label={__('Consent text (checkbox)', 'nynaeve')}
            help={__('Must say plainly what the person agrees to. The checkbox starts unchecked and is required.', 'nynaeve')}
            value={consentText}
            onChange={(value) => setAttributes({ consentText: value })}
          />
          <TextControl
            __nextHasNoMarginBottom
            label={__('Privacy link label', 'nynaeve')}
            value={privacyLabel}
            onChange={(value) => setAttributes({ privacyLabel: value })}
          />
          <TextControl
            __nextHasNoMarginBottom
            label={__('Privacy link URL', 'nynaeve')}
            value={privacyUrl}
            onChange={(value) => setAttributes({ privacyUrl: value })}
          />
          <TextControl
            __nextHasNoMarginBottom
            label={__('Button text', 'nynaeve')}
            value={buttonText}
            onChange={(value) => setAttributes({ buttonText: value })}
          />
          <TextareaControl
            __nextHasNoMarginBottom
            label={__('Success message', 'nynaeve')}
            value={successMessage}
            onChange={(value) => setAttributes({ successMessage: value })}
          />
          <TextareaControl
            __nextHasNoMarginBottom
            label={__('Error message', 'nynaeve')}
            value={errorMessage}
            onChange={(value) => setAttributes({ errorMessage: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="newsletter-signup__inner">
          <div className="newsletter-signup__intro">
            <InnerBlocks template={TEMPLATE} templateLock={false} />
          </div>

          <div className="newsletter-signup__form" aria-hidden="true">
            <div className="newsletter-signup__field">
              <label>{nameLabel}</label>
              <input type="text" disabled />
            </div>
            <div className="newsletter-signup__field">
              <label>{emailLabel}</label>
              <input type="email" disabled />
            </div>
            <div className="newsletter-signup__consent">
              <input type="checkbox" disabled />
              <label>
                {consentText} <a href={privacyUrl}>{privacyLabel}</a>
              </label>
            </div>
            <button type="button" className="newsletter-signup__button" disabled>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
