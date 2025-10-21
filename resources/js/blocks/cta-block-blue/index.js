/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './editor';
import Save from './save';

/**
 * Import button hover filter
 * Extends core/button with custom hover color functionality
 */
import './extends/button-hover-filter.jsx';

/**
 * Register the block
 */
registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save: Save,
});
