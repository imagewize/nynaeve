/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { VARIANTS } from './templates';

const DEFAULT_VARIANT = metadata.attributes.variant.default;

const VARIANT_OPTIONS = Object.entries(VARIANTS).map(([value, variant]) => ({
  value,
  label: variant.title.replace(/^CTA: /, ''),
}));

/**
 * Edit function that renders in the admin
 *
 * The variant picked from the inserter can be changed at any time from the
 * sidebar — switching rebuilds the inner blocks from the new variant's
 * template, so any per-instance copy edits on this block are replaced.
 *
 * `templateLock: 'contentOnly'` keeps the structure frozen (no adding, removing
 * or moving inner blocks, no styling controls on them) while leaving the text
 * editable, so a post can tweak wording without the layout drifting.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
  const variant = VARIANTS[attributes.variant] ?? VARIANTS[DEFAULT_VARIANT];
  const { replaceInnerBlocks } = useDispatch(blockEditorStore);

  const blockProps = useBlockProps({
    className: `wp-block-imagewize-cta is-variant-${attributes.variant}`,
  });

  const switchVariant = (next) => {
    if (next === attributes.variant || ! VARIANTS[next]) {
      return;
    }

    setAttributes({ variant: next });
    replaceInnerBlocks(
      clientId,
      createBlocksFromInnerBlocksTemplate(VARIANTS[next].template),
      false
    );
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('CTA', 'nynaeve')}>
          <SelectControl
            __nextHasNoMarginBottom
            label={__('Variant', 'nynaeve')}
            help={__('Switching replaces this block\'s heading, text, list and buttons with the selected variant.', 'nynaeve')}
            value={attributes.variant}
            options={VARIANT_OPTIONS}
            onChange={switchVariant}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <InnerBlocks template={variant.template} templateLock="contentOnly" />
      </div>
    </>
  );
}
