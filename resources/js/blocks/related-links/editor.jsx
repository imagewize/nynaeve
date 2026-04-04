/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Related Links InnerBlocks template.
 *
 * Structure:
 *  - Eyebrow paragraph       → section label
 *  - H2 heading              → section title
 *  - Buttons group           → auto-fit grid of link pills
 *    - 6 × core/button       → individual service links
 */

const TEMPLATE = [
	[
		'core/paragraph',
		{
			className: 'related-links__label',
			content: 'Also From Imagewize',
		},
	],
	[
		'core/heading',
		{
			level: 2,
			className: 'related-links__title',
			content: 'Related Services',
		},
	],
	[
		'core/buttons',
		{
			className: 'related-links__grid',
			layout: { type: 'flex', flexWrap: 'wrap' },
		},
		[
			[
				'core/button',
				{
					url: '/services/wordpress-development/',
					text: 'WordPress Development',
				},
			],
			[
				'core/button',
				{
					url: '/speed-optimization/',
					text: 'Speed Optimization',
				},
			],
			[
				'core/button',
				{
					url: '/services/wordpress-development/wordpress-security/',
					text: 'WordPress Security',
				},
			],
			[
				'core/button',
				{
					url: '/services/trellis-wordpress-hosting/',
					text: 'Trellis Hosting',
				},
			],
			[
				'core/button',
				{
					url: '/services/e-commerce/woocommerce/',
					text: 'WooCommerce Development',
				},
			],
			[
				'core/button',
				{
					url: '/services/seo/',
					text: 'All SEO Services',
				},
			],
		],
	],
];

/**
 * Edit function — renders in the block editor
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'wp-block-imagewize-related-links',
	} );

	return (
		<div { ...blockProps }>
			<div className="related-links__inner">
				<InnerBlocks template={ TEMPLATE } templateLock={ false } />
			</div>
		</div>
	);
}
