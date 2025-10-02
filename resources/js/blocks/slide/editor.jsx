import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes, clientId }) {
    const { slideId } = attributes;
    const blockProps = useBlockProps();

    const { hasChildBlocks } = useSelect((select) => {
        const { getBlockOrder } = select('core/block-editor');
        return {
            hasChildBlocks: getBlockOrder(clientId).length > 0,
        };
    }, [clientId]);

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Slide Settings', 'imagewize')} initialOpen={true}>
                    <TextControl
                        label={__('Slide ID', 'imagewize')}
                        value={slideId}
                        onChange={(value) => setAttributes({ slideId: value })}
                        help={__('Optional HTML ID for this slide', 'imagewize')}
                        __nextHasNoMarginBottom={true}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <InnerBlocks
                    templateLock={false}
                    renderAppender={
                        !hasChildBlocks ? InnerBlocks.ButtonBlockAppender : undefined
                    }
                />
            </div>
        </Fragment>
    );
}