/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
  useBlockProps, 
  RichText, 
  InspectorControls,
  PanelColorSettings,
  InnerBlocks
} from '@wordpress/block-editor';
import { 
  Panel, 
  PanelBody, 
  TextControl, 
  ToggleControl, 
  TextareaControl
} from '@wordpress/components';

/**
 * Editor component for the Pricing block
 */
export default function Edit({ attributes, setAttributes }) {
  const { 
    standardTitle, standardDescription, standardPrice, standardPriceNote, standardFeatures, standardButtonText, standardButtonUrl,
    premiumTitle, premiumDescription, premiumPrice, premiumPriceNote, premiumFeatures, premiumButtonText, premiumButtonUrl,
    showPopularBadge, popularBadgeText
  } = attributes;
  
  const blockProps = useBlockProps();
  
  // Define allowed blocks and template for header section
  const ALLOWED_HEADER_BLOCKS = ['core/heading', 'core/paragraph'];
  const HEADER_TEMPLATE = [
    ['core/heading', { 
      level: 2, 
      content: __('Website Packages', 'imagewize'), 
      className: 'pricing-title' 
    }],
    ['core/heading', { 
      level: 3, 
      content: __('Choose the package that best fits your business needs', 'imagewize'), 
      className: 'pricing-subtitle' 
    }]
  ];

  // Helper to update individual features
  const updateStandardFeature = (text, index) => {
    const features = [...standardFeatures];
    features[index] = text;
    setAttributes({ standardFeatures: features });
  };

  const updatePremiumFeature = (text, index) => {
    const features = [...premiumFeatures];
    features[index] = text;
    setAttributes({ premiumFeatures: features });
  };

  // Add new feature
  const addStandardFeature = () => {
    setAttributes({ standardFeatures: [...standardFeatures, ''] });
  };

  const addPremiumFeature = () => {
    setAttributes({ premiumFeatures: [...premiumFeatures, ''] });
  };

  // Remove feature
  const removeStandardFeature = (index) => {
    const features = [...standardFeatures];
    features.splice(index, 1);
    setAttributes({ standardFeatures: features });
  };

  const removePremiumFeature = (index) => {
    const features = [...premiumFeatures];
    features.splice(index, 1);
    setAttributes({ premiumFeatures: features });
  };
  
  return (
    <>
      <InspectorControls>
        <Panel>
          <PanelBody title={__('Header Settings', 'imagewize')} initialOpen={true}>
            <p>{__('Edit the title and subtitle directly in the block editor', 'imagewize')}</p>
          </PanelBody>
          
          <PanelBody title={__('Standard Package', 'imagewize')} initialOpen={false}>
            <TextControl
              label={__('Title', 'imagewize')}
              value={standardTitle}
              onChange={(value) => setAttributes({ standardTitle: value })}
            />
            <TextareaControl
              label={__('Description', 'imagewize')}
              value={standardDescription}
              onChange={(value) => setAttributes({ standardDescription: value })}
            />
            <TextControl
              label={__('Price', 'imagewize')}
              value={standardPrice}
              onChange={(value) => setAttributes({ standardPrice: value })}
            />
            <TextControl
              label={__('Price Note', 'imagewize')}
              value={standardPriceNote}
              onChange={(value) => setAttributes({ standardPriceNote: value })}
            />
            <TextControl
              label={__('Button Text', 'imagewize')}
              value={standardButtonText}
              onChange={(value) => setAttributes({ standardButtonText: value })}
            />
            <TextControl
              label={__('Button URL', 'imagewize')}
              value={standardButtonUrl}
              onChange={(value) => setAttributes({ standardButtonUrl: value })}
            />
          </PanelBody>
          
          <PanelBody title={__('Premium Package', 'imagewize')} initialOpen={false}>
            <TextControl
              label={__('Title', 'imagewize')}
              value={premiumTitle}
              onChange={(value) => setAttributes({ premiumTitle: value })}
            />
            <TextareaControl
              label={__('Description', 'imagewize')}
              value={premiumDescription}
              onChange={(value) => setAttributes({ premiumDescription: value })}
            />
            <TextControl
              label={__('Price', 'imagewize')}
              value={premiumPrice}
              onChange={(value) => setAttributes({ premiumPrice: value })}
            />
            <TextControl
              label={__('Price Note', 'imagewize')}
              value={premiumPriceNote}
              onChange={(value) => setAttributes({ premiumPriceNote: value })}
            />
            <ToggleControl
              label={__('Show Popular Badge', 'imagewize')}
              checked={showPopularBadge}
              onChange={() => setAttributes({ showPopularBadge: !showPopularBadge })}
            />
            {showPopularBadge && (
              <TextControl
                label={__('Popular Badge Text', 'imagewize')}
                value={popularBadgeText}
                onChange={(value) => setAttributes({ popularBadgeText: value })}
              />
            )}
            <TextControl
              label={__('Button Text', 'imagewize')}
              value={premiumButtonText}
              onChange={(value) => setAttributes({ premiumButtonText: value })}
            />
            <TextControl
              label={__('Button URL', 'imagewize')}
              value={premiumButtonUrl}
              onChange={(value) => setAttributes({ premiumButtonUrl: value })}
            />
          </PanelBody>
        </Panel>
      </InspectorControls>
      
      <div { ...blockProps }>
        <div className="pricing-header">
          <InnerBlocks
            allowedBlocks={ALLOWED_HEADER_BLOCKS}
            template={HEADER_TEMPLATE}
            templateLock="all"
          />
        </div>
        
        <div className="pricing-columns">
          {/* Standard Package Column */}
          <div className="pricing-column">
            <RichText
              tagName="h3"
              className="package-title"
              value={standardTitle}
              onChange={(value) => setAttributes({ standardTitle: value })}
              placeholder={__('Standard package name', 'imagewize')}
            />
            <RichText
              tagName="p"
              className="package-description"
              value={standardDescription}
              onChange={(value) => setAttributes({ standardDescription: value })}
              placeholder={__('Write description…', 'imagewize')}
            />
            <RichText
              tagName="h4"
              className="package-price"
              value={standardPrice}
              onChange={(value) => setAttributes({ standardPrice: value })}
              placeholder={__('€799', 'imagewize')}
            />
            <span className="price-note">{standardPriceNote}</span>
            
            <div className="features-list">
              {standardFeatures.map((feature, index) => (
                <div key={index} className="feature-item">
                  <span className="feature-icon">✓</span>
                  <RichText
                    tagName="p"
                    className="feature-text"
                    value={feature}
                    onChange={(text) => updateStandardFeature(text, index)}
                    placeholder={__('Write feature…', 'imagewize')}
                  />
                  <button 
                    type="button" 
                    className="remove-feature" 
                    onClick={() => removeStandardFeature(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button type="button" onClick={addStandardFeature} className="add-feature">
                {__('+ Add Feature', 'imagewize')}
              </button>
            </div>
            
            <div className="pricing-button-container">
              <RichText
                tagName="span"
                className="pricing-button"
                value={standardButtonText}
                onChange={(value) => setAttributes({ standardButtonText: value })}
                placeholder={__('Button text…', 'imagewize')}
              />
            </div>
          </div>
          
          {/* Premium Package Column */}
          <div className="pricing-column premium">
            <RichText
              tagName="h3"
              className="package-title"
              value={premiumTitle}
              onChange={(value) => setAttributes({ premiumTitle: value })}
              placeholder={__('Premium package name', 'imagewize')}
            />
            {showPopularBadge && (
              <span className="popular-badge">
                <RichText
                  value={popularBadgeText}
                  onChange={(value) => setAttributes({ popularBadgeText: value })}
                  placeholder={__('MOST POPULAR', 'imagewize')}
                />
              </span>
            )}
            <RichText
              tagName="p"
              className="package-description"
              value={premiumDescription}
              onChange={(value) => setAttributes({ premiumDescription: value })}
              placeholder={__('Write description…', 'imagewize')}
            />
            <RichText
              tagName="h4"
              className="package-price"
              value={premiumPrice}
              onChange={(value) => setAttributes({ premiumPrice: value })}
              placeholder={__('€2499', 'imagewize')}
            />
            <span className="price-note">{premiumPriceNote}</span>
            
            <div className="features-list">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="feature-item">
                  <span className="feature-icon">✓</span>
                  <RichText
                    tagName="p"
                    className="feature-text"
                    value={feature}
                    onChange={(text) => updatePremiumFeature(text, index)}
                    placeholder={__('Write feature…', 'imagewize')}
                  />
                  <button 
                    type="button" 
                    className="remove-feature" 
                    onClick={() => removePremiumFeature(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button type="button" onClick={addPremiumFeature} className="add-feature">
                {__('+ Add Feature', 'imagewize')}
              </button>
            </div>
            
            <div className="pricing-button-container">
              <RichText
                tagName="span"
                className="pricing-button"
                value={premiumButtonText}
                onChange={(value) => setAttributes({ premiumButtonText: value })}
                placeholder={__('Button text…', 'imagewize')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}