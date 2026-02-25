/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * Save function for the Case Studies block
 */
export default function save({ attributes }) {
    const { eyebrow, title, subtitle, align } = attributes;
    
    const blockProps = useBlockProps.save({
        className: `align${align}`,
    });

    return (
        <div {...blockProps}>
            <div className="case-studies-header">
                <span className="case-studies-eyebrow">{eyebrow}</span>
                <h2 className="case-studies-title">{title}</h2>
                <p className="case-studies-subtitle">{subtitle}</p>
            </div>
            
            <div className="case-studies-grid-container">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
