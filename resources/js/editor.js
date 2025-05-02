
/**
 * Import editor blocks
 */
import.meta.glob('./blocks/**/index.js', { eager: true });
import domReady from '@wordpress/dom-ready';

domReady(() => {
  //
});