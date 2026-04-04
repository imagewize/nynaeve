=== Nynaeve ===
Contributors: jasperfrumau
Requires at least: 6.6
Tested up to: 6.9
Requires PHP: 8.2
Stable tag: 2.7.0
License: MIT License
License URI: https://opensource.org/licenses/MIT

== Description ==

Nynaeve is the Imagewize.com production theme built on Sage 11 (Roots.io stack) with Laravel Blade templating, Tailwind CSS 4, Vite, and custom WordPress blocks. Powers the imagewize.com digital agency website with WooCommerce quote-based integration.

== Changelog ==

= 2.7.0 - 04/04/26 =
* CHANGED: expect-list block - Replaced inline SVG strings with bound theme-icon images; dot container changed from core/paragraph to core/group; updated CSS selectors accordingly.
* CHANGED: service-hero block - Eyebrow changed from core/paragraph to core/group (flex row) with bound icon-search.svg + paragraph; fixes editor contenteditable issue with flex+pseudo-elements on <p>.
* CHANGED: service-hero block - Added editor.css overrides to reset button link display and ::after so RichText remains clickable in the editor.
* CHANGED: related-links block - Arrow icon technique changed from flex+::before pseudo-element to display:block+background-image with left padding; fixes editor editability for button links.
* ADDED: icon-shield.svg - Shield/checkmark SVG icon (blue, #2563eb) for trust messaging.
* ADDED: icon-users.svg - Group/users SVG icon (blue, #2563eb) for team/client messaging.
* ADDED: icon-clock.svg - Clock SVG icon (blue, #2563eb) for pricing/time messaging.
* ADDED: icon-search.svg - Search magnifier SVG icon (light blue, #93c5fd) for service-hero eyebrow.
* TECHNICAL: Registered new icons (shield, users, clock, search) in setup.php for trust-bar and service-hero blocks via window.imagewizeIcons and imagewize/theme-icon binding.
* TECHNICAL: CLAUDE.md condensed and reorganised; added critical notes on flex+pseudo-elements breaking contenteditable targets and core/image width/height validation failures."


= 2.6.0 - 04/03/26 =
* ADDED: New `imagewize/expect-list` block — dark "What to Expect" section with vertical icon-dot + title + description list.
* ADDED: New `imagewize/icon-grid` block — responsive auto-fit grid for SEO audit / feature checklists with icon+text cards.
* ADDED: New `imagewize/service-blocks` block — stacked numbered service detail cards with checklist support.
* ADDED: `imagewize/theme-icon` block binding source — resolves Vite asset URLs at render time, preventing icon 404s after rebuilds.
* ADDED: `window.imagewizeIcons` editor injection so block icons display correctly immediately after insertion.
* ADDED: 8 new SVG icons (bar-chart, chat, code, copy, link, list, map, x-circle) in brand blue for use with icon-grid and other blocks.
* CHANGED: feature-cards block migrated from direct Vite SVG imports to `imagewize/theme-icon` block bindings — fixes icons breaking on every production build.
* TECHNICAL: HeroBlock and Navigation PHP blocks upgraded to apiVersion 3.
* TECHNICAL: Removed redundant `editorScript: file:./index.js` from case-studies, elayne-hero, and feature-cards block.json files."


= 2.5.1 - 03/28/26 =
* TECHNICAL: Updated esbuild 0.27.3→0.27.4 across all platform packages.
* TECHNICAL: Updated rollup 4.59.0→4.60.0 across all platform packages.
* TECHNICAL: Updated tailwindcss and @tailwindcss/* packages 4.2.1→4.2.2; lightningcss 1.31.1→1.32.0.
* TECHNICAL: @tailwindcss/vite now supports Vite 8 peer dependency.
* TECHNICAL: Updated @wordpress/element, @wordpress/escape-html, @wordpress/primitives, @wordpress/dependency-extraction-webpack-plugin to 6.42.0/3.42.0/4.42.0/6.42.0.
* TECHNICAL: Updated @babel/runtime 7.28.6→7.29.2; @roots/vite-plugin 1.2.3→1.3.1; @types/node 25.3.3→25.5.0; baseline-browser-mapping 2.10.0→2.10.11."


= 2.5.0 - 03/23/26 =
* ADDED: Feature Cards Block (imagewize/feature-cards) - Six feature highlight cards with SVG icons, hover effects, and section header. Full-width InnerBlocks approach.
* CHANGED: sage-native-block package requirement bumped from ^2.0.0 to ^2.1.0.

= 2.4.0 - 03/22/26 =
* ADDED: Elayne Hero Block (imagewize/elayne-hero) - Full-width hero section with gradient background, dual CTA buttons, and three-column metrics row.
* ADDED: No-Header Page Template (template-no-header.blade.php) for standalone landing pages.
* ADDED: Elayne SVG icon assets under resources/images/icons/elayne/.
* CHANGED: Navigation padding reduced from py-6 to py-1 for compact header.
* CHANGED: Page Heading Blue block margin now controlled via block.json default style attribute.
* FIXED: Elayne Hero inner padding and metrics count updated to 100+.

= 2.3.5 - 03/08/26 =
* FIXED: Code/Pre block styling for bare <pre> tags matching WordPress block styles.
* FIXED: Quote block and pullquote block styling added.

= 2.3.4 - 03/04/26 =
* ADDED: Mistral Vibe AI integration config and prompts.

= 2.3.0 - 03/01/26 =
* ADDED: Search overlay functionality with close button.
