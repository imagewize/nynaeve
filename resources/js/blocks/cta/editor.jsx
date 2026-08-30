/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { VARIANTS } from './templates';

const DEFAULT_VARIANT = metadata.attributes.variant.default;

/**
 * Edit function that renders in the admin
 *
 * `templateLock: 'all'` freezes the structure — no adding, removing or moving
 * inner blocks — while leaving the RichText content editable for typo fixes.
 */
export default function Edit({ attributes }) {
  const variant = VARIANTS[attributes.variant] ?? VARIANTS[DEFAULT_VARIANT];
  const blockProps = useBlockProps({
    className: `wp-block-imagewize-cta is-variant-${attributes.variant}`,
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={variant.template} templateLock="all" />
    </div>
  );
}
