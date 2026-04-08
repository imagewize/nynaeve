/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Icon URLs are resolved at render time via the imagewize/theme-icon block binding.
 * window.imagewizeIcons (injected by setup.php enqueue_block_editor_assets) provides
 * the current Vite asset URLs so icons display correctly inside the editor.
 */
const icons = window.imagewizeIcons ?? {};

/**
 * Icon Grid InnerBlocks template.
 *
 * Structure:
 *  - Eyebrow paragraph    → section label (blue, uppercase, small)
 *  - H2 heading           → section title
 *  - Lead paragraph       → section lead text
 *  - Grid group           → auto-fit CSS grid container
 *    - 8 item groups      → flex row: icon image + text paragraph
 */

const ITEMS = [
  { path: 'icon-link.svg',      alt: 'Link icon',      text: 'Crawlability &amp; indexation — blocked pages, noindex tags, robots.txt' },
  { path: 'icon-copy.svg',      alt: 'Copy icon',      text: 'Duplicate content &amp; canonical errors' },
  { path: 'icon-x-circle.svg',  alt: 'X circle icon',  text: 'Broken internal &amp; external links' },
  { path: 'icon-list.svg',      alt: 'List icon',      text: 'Missing or malformed meta titles &amp; descriptions' },
  { path: 'icon-bar-chart.svg', alt: 'Bar chart icon', text: 'Core Web Vitals: LCP, CLS, INP scores' },
  { path: 'icon-code.svg',      alt: 'Code icon',      text: 'Schema markup gaps &amp; structured data errors' },
  { path: 'icon-map.svg',       alt: 'Map icon',       text: 'XML sitemap health &amp; Search Console integration' },
  { path: 'icon-chat.svg',      alt: 'Chat icon',      text: 'Heading hierarchy (H1–H6) &amp; content structure' },
];

const TEMPLATE = [
  [
    'core/paragraph',
    {
      className: 'icon-grid__label',
      content: 'Step One',
    },
  ],
  [
    'core/heading',
    {
      level: 2,
      className: 'icon-grid__title',
      content: 'WordPress SEO Audit',
    },
  ],
  [
    'core/paragraph',
    {
      className: 'icon-grid__lead',
      content:
        'Before optimizing anything, we need to know what\u2019s holding your site back. Our audit surfaces the real issues \u2014 prioritized, clear, and actionable.',
    },
  ],
  [
    'core/group',
    { className: 'icon-grid__grid' },
    ITEMS.map( ( { path, alt, text } ) => [
      'core/group',
      { className: 'icon-grid__item' },
      [
        [
          'core/group',
          { className: 'icon-grid__icon' },
          [
            [
              'core/image',
              {
                url: icons[ path ] ?? '',
                alt,
                sizeSlug: 'full',
                linkDestination: 'none',
                metadata: {
                  bindings: {
                    url: {
                      source: 'imagewize/theme-icon',
                      args: { path },
                    },
                  },
                },
              },
            ],
          ],
        ],
        [ 'core/paragraph', { className: 'icon-grid__text', content: text } ],
      ],
    ] ),
  ],
];

/**
 * Edit function — renders in the block editor
 */
export default function Edit() {
  const blockProps = useBlockProps( {
    className: 'wp-block-imagewize-icon-grid',
  } );

  return (
    <div { ...blockProps }>
      <div className="icon-grid__inner">
        <InnerBlocks template={ TEMPLATE } templateLock={ false } />
      </div>
    </div>
  );
}
