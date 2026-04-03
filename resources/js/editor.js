
/**
 * Register block bindings source for theme SVG icons (editor-side resolver).
 *
 * Mirrors the PHP imagewize/theme-icon source so the editor can display
 * icons correctly. window.imagewizeIcons is injected by setup.php and maps
 * icon path → current Vite asset URL (e.g. 'icon-link.svg' → 'https://…').
 */
import { registerBlockBindingsSource } from '@wordpress/blocks';

registerBlockBindingsSource( {
  name: 'imagewize/theme-icon',
  label: 'Theme Icon',
  getValues( { bindings } ) {
    const icons = window.imagewizeIcons ?? {};
    return Object.fromEntries(
      Object.entries( bindings ).map( ( [ attr, { args } ] ) => [
        attr,
        icons[ args?.path ] ?? '',
      ] )
    );
  },
  canUserEditValue: () => false,
} );

/**
 * Import editor blocks
 */
import.meta.glob('./blocks/**/index.js', { eager: true });

/**
 * Import editor filters
 */
import.meta.glob('./filters/**/*.js', { eager: true });

import domReady from '@wordpress/dom-ready';

domReady(() => {
  //
});