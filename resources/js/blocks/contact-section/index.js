import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './editor.jsx';
import Save from './save.jsx';

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save: Save,
});
