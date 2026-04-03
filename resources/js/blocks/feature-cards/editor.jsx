import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Icon URLs are resolved at render time via the imagewize/theme-icon block binding.
 * window.imagewizeIcons (injected by setup.php enqueue_block_editor_assets) provides
 * the current Vite asset URLs so icons display correctly inside the editor.
 */
const icons = window.imagewizeIcons ?? {};

const TEMPLATE = [
  // Section header
  ['core/group', {
    className: 'feature-cards__header',
    layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' },
  }, [
    ['core/paragraph', {
      content: 'Why Elayne',
      className: 'feature-cards__eyebrow',
      align: 'center',
    }],
    ['core/heading', {
      level: 2,
      content: 'Everything You Need, Nothing You Don\'t',
      textAlign: 'center',
      fontFamily: 'montserrat',
      style: { typography: { fontWeight: '800' } },
    }],
    ['core/paragraph', {
      content: 'Elayne is designed for real business websites — with the tools professionals actually need.',
      align: 'center',
      className: 'feature-cards__lead',
    }],
  ]],

  // Cards grid
  ['core/group', {
    className: 'feature-cards__grid',
    layout: { type: 'default' },
  }, [

    ['core/group', { className: 'feature-card', layout: { type: 'flex', orientation: 'vertical' } }, [
      ['core/group', { className: 'feature-card__icon-wrap', layout: { type: 'flex', justifyContent: 'center', verticalAlignment: 'center' } }, [
        ['core/image', { url: icons['elayne/icon-fse.svg'] ?? '', alt: 'Full Site Editing', width: 28, height: 28, sizeSlug: 'full', linkDestination: 'none', metadata: { bindings: { url: { source: 'imagewize/theme-icon', args: { path: 'elayne/icon-fse.svg' } } } } }],
      ]],
      ['core/heading', { level: 4, content: 'Full Site Editing', fontFamily: 'montserrat', style: { typography: { fontWeight: '700' } } }],
      ['core/paragraph', { content: 'Complete control over headers, footers, and every template — all through the WordPress block editor without touching code.' }],
    ]],

    ['core/group', { className: 'feature-card', layout: { type: 'flex', orientation: 'vertical' } }, [
      ['core/group', { className: 'feature-card__icon-wrap', layout: { type: 'flex', justifyContent: 'center', verticalAlignment: 'center' } }, [
        ['core/image', { url: icons['elayne/icon-performance.svg'] ?? '', alt: 'Performance-First', width: 28, height: 28, sizeSlug: 'full', linkDestination: 'none', metadata: { bindings: { url: { source: 'imagewize/theme-icon', args: { path: 'elayne/icon-performance.svg' } } } } }],
      ]],
      ['core/heading', { level: 4, content: 'Performance-First', fontFamily: 'montserrat', style: { typography: { fontWeight: '700' } } }],
      ['core/paragraph', { content: 'No jQuery, no bloat. Minimal CSS and JavaScript footprint for excellent Core Web Vitals scores straight out of the box.' }],
    ]],

    ['core/group', { className: 'feature-card', layout: { type: 'flex', orientation: 'vertical' } }, [
      ['core/group', { className: 'feature-card__icon-wrap', layout: { type: 'flex', justifyContent: 'center', verticalAlignment: 'center' } }, [
        ['core/image', { url: icons['elayne/icon-patterns.svg'] ?? '', alt: '100+ Block Patterns', width: 28, height: 28, sizeSlug: 'full', linkDestination: 'none', metadata: { bindings: { url: { source: 'imagewize/theme-icon', args: { path: 'elayne/icon-patterns.svg' } } } } }],
      ]],
      ['core/heading', { level: 4, content: '100+ Block Patterns', fontFamily: 'montserrat', style: { typography: { fontWeight: '700' } } }],
      ['core/paragraph', { content: 'Ready-to-use patterns for hero sections, pricing tables, team grids, testimonials, CTAs, and more. One click to insert.' }],
    ]],

    ['core/group', { className: 'feature-card', layout: { type: 'flex', orientation: 'vertical' } }, [
      ['core/group', { className: 'feature-card__icon-wrap', layout: { type: 'flex', justifyContent: 'center', verticalAlignment: 'center' } }, [
        ['core/image', { url: icons['elayne/icon-plugin.svg'] ?? '', alt: 'Elayne Blocks Plugin', width: 28, height: 28, sizeSlug: 'full', linkDestination: 'none', metadata: { bindings: { url: { source: 'imagewize/theme-icon', args: { path: 'elayne/icon-plugin.svg' } } } } }],
      ]],
      ['core/heading', { level: 4, content: 'Elayne Blocks Plugin', fontFamily: 'montserrat', style: { typography: { fontWeight: '700' } } }],
      ['core/paragraph', { content: 'Free companion plugin adds advanced custom blocks — statistics, carousels, pricing tiers, FAQ accordions — for Elayne.' }],
    ]],

    ['core/group', { className: 'feature-card', layout: { type: 'flex', orientation: 'vertical' } }, [
      ['core/group', { className: 'feature-card__icon-wrap', layout: { type: 'flex', justifyContent: 'center', verticalAlignment: 'center' } }, [
        ['core/image', { url: icons['elayne/icon-responsive.svg'] ?? '', alt: 'Fully Responsive', width: 28, height: 28, sizeSlug: 'full', linkDestination: 'none', metadata: { bindings: { url: { source: 'imagewize/theme-icon', args: { path: 'elayne/icon-responsive.svg' } } } } }],
      ]],
      ['core/heading', { level: 4, content: 'Fully Responsive', fontFamily: 'montserrat', style: { typography: { fontWeight: '700' } } }],
      ['core/paragraph', { content: 'Every pattern and template is built mobile-first with tested breakpoints across all screen sizes from 320px to 4K.' }],
    ]],

    ['core/group', { className: 'feature-card', layout: { type: 'flex', orientation: 'vertical' } }, [
      ['core/group', { className: 'feature-card__icon-wrap', layout: { type: 'flex', justifyContent: 'center', verticalAlignment: 'center' } }, [
        ['core/image', { url: icons['elayne/icon-accessible.svg'] ?? '', alt: 'Accessible by Default', width: 28, height: 28, sizeSlug: 'full', linkDestination: 'none', metadata: { bindings: { url: { source: 'imagewize/theme-icon', args: { path: 'elayne/icon-accessible.svg' } } } } }],
      ]],
      ['core/heading', { level: 4, content: 'Accessible by Default', fontFamily: 'montserrat', style: { typography: { fontWeight: '700' } } }],
      ['core/paragraph', { content: 'WCAG 2.1 AA compliant colour contrast, semantic HTML structure, and keyboard-navigable components throughout.' }],
    ]],

  ]],
];

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-feature-cards',
  });

  return (
    <div {...blockProps}>
      <div className="feature-cards__inner">
        <InnerBlocks template={TEMPLATE} templateLock={false} />
      </div>
    </div>
  );
}
