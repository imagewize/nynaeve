/**
 * WordPress dependencies
 */
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './editor';
import Save from './save';
import { VARIANTS } from './templates';

/**
 * Register the block
 */
registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save: Save,
});

/**
 * One inserter entry per variant, replacing the seven `imagewize/cta-*` blocks.
 *
 * `isActive` lets the editor label a placed block with its variant name.
 * `isDefault` on the block's own default variant replaces the bare "CTA"
 * inserter entry, so the list shows one item per variant rather than one extra.
 */
Object.entries(VARIANTS).forEach(([slug, variant]) => {
  registerBlockVariation(metadata.name, {
    name: slug,
    title: variant.title,
    icon: variant.icon,
    description: variant.description,
    keywords: variant.keywords,
    attributes: { variant: slug },
    example: { attributes: { variant: slug } },
    isDefault: slug === metadata.attributes.variant.default,
    scope: ['inserter'],
    isActive: (blockAttributes) => blockAttributes.variant === slug,
  });
});
