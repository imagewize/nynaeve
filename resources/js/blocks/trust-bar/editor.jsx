/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Trust Bar InnerBlocks template.
 *
 * Four core/paragraph blocks styled as inline trust items.
 * Icons injected via CSS ::before using SVG data URIs per class.
 */
const TEMPLATE = [
  [
    'core/paragraph',
    {
      className: 'trust-item trust-item--shield',
      content: 'White-hat SEO only',
    },
  ],
  [
    'core/paragraph',
    {
      className: 'trust-item trust-item--code',
      content: 'Developer-first approach',
    },
  ],
  [
    'core/paragraph',
    {
      className: 'trust-item trust-item--group',
      content: 'Serving NL &amp; Western Europe',
    },
  ],
  [
    'core/paragraph',
    {
      className: 'trust-item trust-item--clock',
      content: 'Transparent hourly billing',
    },
  ],
];

/**
 * Edit function — renders in the block editor
 */
export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-trust-bar',
  });

  return (
    <div {...blockProps}>
      <div className="trust-bar__inner">
        <InnerBlocks template={TEMPLATE} templateLock={false} />
      </div>
    </div>
  );
}
