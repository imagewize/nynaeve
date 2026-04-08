/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * InnerBlocks template — two editable paragraphs.
 * Uses real publishable content from the WordPress SEO service page design.
 */
const TEMPLATE = [
	[
		'core/paragraph',
		{
			content:
				'At Imagewize, we serve SMEs across the Netherlands and Western Europe — delivering WordPress SEO as a hands-on developer, not a generic agency running automated reports. Every recommendation we make comes from real code-level understanding of how WordPress works.',
		},
	],
	[
		'core/paragraph',
		{
			content:
				'Whether you need a focused one-time audit or ongoing technical SEO support, we handle it end-to-end: from crawl configuration and schema markup to Core Web Vitals and content structure.',
		},
	],
];

/**
 * Edit function — renders in the block editor
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'wp-block-imagewize-service-intro',
	} );

	return (
		<div { ...blockProps }>
			<div className="service-intro__inner">
				<InnerBlocks template={ TEMPLATE } templateLock={ false } />
			</div>
		</div>
	);
}
