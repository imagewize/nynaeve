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
        default: '#075985', // sky-700
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
    const { hoverBackgroundColor } = attributes;

    // Check if button is inside cta-block-blue
    const parents = select('core/block-editor').getBlockParents(clientId);
    const parentBlocks = parents.map((parentId) =>
      select('core/block-editor').getBlock(parentId)
    );
    const isInCTABlock = parentBlocks.some(
      (block) => block?.name === 'nynaeve/cta-block-blue'
    );

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
              color={hoverBackgroundColor}
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
 */
function addHoverColorToSave(extraProps, blockType, attributes) {
  if (blockType.name !== 'core/button') {
    return extraProps;
  }

  const { hoverBackgroundColor } = attributes;

  if (hoverBackgroundColor) {
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
