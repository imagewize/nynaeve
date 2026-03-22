import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './editor';
import Save from './save';

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save: Save,
});
