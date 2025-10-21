/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function that defines output on the frontend
 */
export default function save({ attributes }) {
    const { backgroundColor, textColor } = attributes;

    const blockProps = useBlockProps.save({
        className: 'has-background wp-block-group',
        style: {
            backgroundColor: backgroundColor,
            color: textColor
        }
    });

    return (
        <div {...blockProps}>
            <div className="wp-block-group__inner-container">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
