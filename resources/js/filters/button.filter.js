/**
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#blocks-registerblocktype}
 */
export const hook = 'blocks.registerBlockType';

/**
 * Filter handle
 */
export const name = 'imagewize/button';

/**
 * Filter callback
 *
 * @param {object} settings
 * @param {string} name
 * @returns modified settings
 */
export function callback(settings, name) {
  if (name !== 'core/button') return settings;

  // Get existing styles from WordPress core
  const existingStyles = settings.styles || [];

  // Filter out any duplicate custom styles if they already exist
  const customStyleNames = ['secondary-button', 'button-light', 'button-dark'];
  const filteredExistingStyles = existingStyles.filter(
    style => !customStyleNames.includes(style.name)
  );

  return {
    ...settings,
    styles: [
      // Preserve WordPress core styles (fill, outline, etc.)
      ...filteredExistingStyles,
      // Add Nynaeve custom button styles
      { label: 'Secondary Button', name: 'secondary-button' },
      { label: 'Light Button', name: 'button-light' },
      { label: 'Dark Button', name: 'button-dark' },
    ],
  };
}
