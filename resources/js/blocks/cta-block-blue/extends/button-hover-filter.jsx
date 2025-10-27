/**
 * Button Hover Color Filter
 *
 * Extends core/button block with custom hover background color control
 * when used inside the CTA Block Blue
 */

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { ColorPicker } from '@wordpress/components';

/**
 * Add hoverBackgroundColor attribute to button block
 * Note: Default is empty string - only applies when explicitly set in CTA blocks
 */
function addHoverBackgroundAttribute(settings, name) {
  if (name !== 'core/button') {
    return settings;
  }

  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      hoverBackgroundColor: {
        type: 'string',
        default: '', // Empty by default - no interference with non-CTA buttons
      },
      isNynaeveButton: {
        type: 'boolean',
        default: false, // Flag to identify buttons we've customized
      },
    },
  };
}

addFilter(
  'blocks.registerBlockType',
  'nynaeve/button-hover-background',
  addHoverBackgroundAttribute
);

/**
 * Add hover color control to button inspector when inside CTA block
 */
const withHoverColorControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (props.name !== 'core/button') {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes, clientId } = props;
    const { hoverBackgroundColor, isNynaeveButton } = attributes;

    // Check if button is inside cta-block-blue
    const parents = select('core/block-editor').getBlockParents(clientId);
    const parentBlocks = parents.map((parentId) =>
      select('core/block-editor').getBlock(parentId)
    );
    const isInCTABlock = parentBlocks.some(
      (block) => block?.name === 'nynaeve/cta-block-blue'
    );

    // If inside CTA block, mark as Nynaeve button and set default hover color if not set
    if (isInCTABlock && !isNynaeveButton) {
      setAttributes({
        isNynaeveButton: true,
        hoverBackgroundColor: hoverBackgroundColor || '#075985', // sky-700 default only for CTA buttons
      });
    }

    if (!isInCTABlock) {
      return <BlockEdit {...props} />;
    }

    return (
      <>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody
            title={__('Hover Background Color', 'sage')}
            initialOpen={true}
          >
            <ColorPicker
              color={hoverBackgroundColor || '#075985'}
              onChangeComplete={(color) =>
                setAttributes({ hoverBackgroundColor: color.hex })
              }
            />
          </PanelBody>
        </InspectorControls>
      </>
    );
  };
}, 'withHoverColorControl');

addFilter(
  'editor.BlockEdit',
  'nynaeve/button-hover-control',
  withHoverColorControl
);

/**
 * Add hover color CSS variable to button save output
 * Only applies to buttons that were explicitly marked as Nynaeve buttons (inside CTA blocks)
 */
function addHoverColorToSave(extraProps, blockType, attributes) {
  if (blockType.name !== 'core/button') {
    return extraProps;
  }

  const { hoverBackgroundColor, isNynaeveButton } = attributes;

  // Only apply hover styles to buttons we've explicitly customized in CTA blocks
  if (isNynaeveButton && hoverBackgroundColor) {
    return {
      ...extraProps,
      style: {
        ...extraProps.style,
        '--button-hover-background': hoverBackgroundColor,
      },
      className: `${extraProps.className || ''} has-hover-background`.trim(),
    };
  }

  return extraProps;
}

addFilter(
  'blocks.getSaveContent.extraProps',
  'nynaeve/button-hover-save',
  addHoverColorToSave
);
