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

  return {
    ...settings,
    styles: [
      { label: 'Default', name: 'fill', isDefault: true },
      { label: 'Outline', name: 'outline' },
      { label: 'Secondary Button', name: 'secondary-button' },
      { label: 'Light Button', name: 'button-light' },
      { label: 'Dark Button', name: 'button-dark' },
    ],
  };
}
