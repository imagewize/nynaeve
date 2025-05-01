/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save component for the Pricing block
 */
export default function Save({ attributes }) {
  const {
    standardTitle, standardDescription, standardPrice, standardPriceNote, standardFeatures, standardButtonText, standardButtonUrl,
    premiumTitle, premiumDescription, premiumPrice, premiumPriceNote, premiumFeatures, premiumButtonText, premiumButtonUrl,
    showPopularBadge, popularBadgeText
  } = attributes;

  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <div className="pricing-header">
        <InnerBlocks.Content />
      </div>

      <div className="pricing-columns">
        {/* Standard Package Column */}
        <div className="pricing-column">
          <h3 className="package-title">{standardTitle}</h3>
          <p className="package-description">{standardDescription}</p>
          <h4 className="package-price">{standardPrice}</h4>
          <span className="price-note">{standardPriceNote}</span>

          <div className="features-list">
            {standardFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">✓</span>
                <p className="feature-text">{feature}</p>
              </div>
            ))}
          </div>

          <div className="pricing-button-container">
            <a href={standardButtonUrl} className="pricing-button">{standardButtonText}</a>
          </div>
        </div>

        {/* Premium Package Column */}
        <div className="pricing-column premium">
          <h3 className="package-title">
            {premiumTitle}
            {showPopularBadge && (
              <span className="popular-badge">
                <strong>{popularBadgeText || __('MOST POPULAR', 'imagewize')}</strong>
              </span>
            )}
          </h3>
          <p className="package-description">{premiumDescription}</p>
          <h4 className="package-price">{premiumPrice}</h4>
          <span className="price-note">{premiumPriceNote}</span>

          <div className="features-list">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">✓</span>
                <p className="feature-text">{feature}</p>
              </div>
            ))}
          </div>

          <div className="pricing-button-container">
            <a href={premiumButtonUrl} className="pricing-button">{premiumButtonText}</a>
          </div>
        </div>
      </div>
    </div>
  );
}