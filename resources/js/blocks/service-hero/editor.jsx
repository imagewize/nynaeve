/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Hero InnerBlocks template.
 *
 * Structure:
 *  - Eyebrow group      → pill badge (div allows inline-flex; paragraph inside resets margins)
 *  - H1 heading         → serif font, rich text supports <em> for blue italic highlight
 *  - Lead paragraph     → muted sub-heading text
 *  - Buttons group      → primary (accent #2563eb) + outline (ghost) CTAs
 */
const TEMPLATE = [
  [
    'core/paragraph',
    {
      className: 'service-hero__eyebrow',
      content: 'WordPress SEO Services',
    },
  ],
  [
    'core/heading',
    {
      level: 1,
      className: 'service-hero__title',
      fontFamily: 'serif',
      content: 'WordPress SEO That Goes <em>Beyond the Plugin</em>',
      style: {
        typography: {
          lineHeight: '1.15',
        },
      },
    },
  ],
  [
    'core/paragraph',
    {
      className: 'service-hero__lead',
      content:
        'A slow, poorly structured WordPress site won\u2019t rank \u2014 no matter how good your content is. We combine deep WordPress development expertise with proven SEO practices to make your site visible, fast, and built to convert.',
    },
  ],
  [
    'core/buttons',
    {
      className: 'service-hero__ctas',
      layout: { type: 'flex', flexWrap: 'wrap' },
    },
    [
      [
        'core/button',
        {
          text: 'Request a Free SEO Audit',
          url: '/contact-us/',
        },
      ],
      [
        'core/button',
        {
          text: 'View All SEO Services',
          url: '/services/seo/',
          className: 'is-style-outline',
        },
      ],
    ],
  ],
];

/**
 * Edit function — renders in the block editor
 */
export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-service-hero',
  });

  return (
    <div {...blockProps}>
      <div className="service-hero__content">
        <InnerBlocks template={TEMPLATE} templateLock={false} />
      </div>
    </div>
  );
}
