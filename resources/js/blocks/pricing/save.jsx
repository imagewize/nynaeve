/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save function for the pricing block
 * This outputs the static HTML for the frontend view
 */
export default function Save({ attributes }) {
  const { 
    title, subtitle,
    standardTitle, standardDescription, standardPrice, standardPriceNote, standardFeatures, standardButtonText, standardButtonUrl,
    premiumTitle, premiumDescription, premiumPrice, premiumPriceNote, premiumFeatures, premiumButtonText, premiumButtonUrl,
    showPopularBadge, popularBadgeText
  } = attributes;
  
  const blockProps = useBlockProps.save();
  
  return (
    <div { ...blockProps }>
      <div className="pricing-header">
        <h2 className="pricing-title">{title}</h2>
        <p className="pricing-subtitle">{subtitle}</p>
      </div>
      
      <div className="pricing-columns">
        {/* Standard Package Column */}
        <div className="pricing-column">
          <h3 className="package-title">{standardTitle}</h3>
          <p className="package-description">{standardDescription}</p>
          
          <h4 className="package-price">
            {standardPrice} <span className="price-note">{standardPriceNote}</span>
          </h4>
          
          <div className="features-list">
            {standardFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">✓</span>
                <p className="feature-text">{feature}</p>
              </div>
            ))}
          </div>
          
          <div className="pricing-button-container">
            <a href={standardButtonUrl || '#'} className="pricing-button">
              {standardButtonText}
            </a>
          </div>
        </div>
        
        {/* Premium Package Column */}
        <div className="pricing-column premium">
          <div className="package-title-wrapper">
            <h3 className="package-title">{premiumTitle}</h3>
            {showPopularBadge && <span className="popular-badge">{popularBadgeText}</span>}
          </div>
          
          <p className="package-description">{premiumDescription}</p>
          
          <h4 className="package-price">
            {premiumPrice} <span className="price-note">{premiumPriceNote}</span>
          </h4>
          
          <div className="features-list">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">✓</span>
                <p className="feature-text">{feature}</p>
              </div>
            ))}
          </div>
          
          <div className="pricing-button-container">
            <a href={premiumButtonUrl || '#'} className="pricing-button">
              {premiumButtonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}