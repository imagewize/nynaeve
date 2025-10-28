import { addFilter } from '@wordpress/hooks';

/**
 * Button Style Variations Filter
 *
 * Extends core/button block with custom Nynaeve button styles
 * while preserving WordPress core styles (fill, outline)
 *
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#blocks-registerblocktype}
 */

/**
 * Add custom button style variations
 *
 * @param {object} settings Block settings
 * @param {string} name Block name
 * @returns {object} Modified settings
 */
function addButtonStyles(settings, name) {
  if (name !== 'core/button') return settings;

  // Get existing styles from WordPress core
  const existingStyles = settings.styles || [];

  // Filter out any duplicate custom styles if they already exist
  const customStyleNames = ['secondary-button', 'button-light', 'button-dark', 'minimal'];
  const filteredExistingStyles = existingStyles.filter(
    style => !customStyleNames.includes(style.name)
  );

  return {
    ...settings,
    styles: [
      // Preserve WordPress core styles (fill, outline, etc.)
      ...filteredExistingStyles,
      // Add Nynaeve custom button style
      { label: 'Minimal', name: 'minimal' },
    ],
  };
}

addFilter(
  'blocks.registerBlockType',
  'imagewize/button-styles',
  addButtonStyles
);
