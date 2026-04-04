/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Icon URLs resolved via imagewize/theme-icon block binding.
 * window.imagewizeIcons is injected by setup.php enqueue_block_editor_assets.
 */
const icons = window.imagewizeIcons ?? {};

/**
 * Helper: build a core/image block with theme-icon binding.
 */
const iconImage = ( path ) => [
	'core/image',
	{
		url: icons[ path ] ?? '',
		alt: '',
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
];

/**
 * Trust Bar InnerBlocks template.
 *
 * Structure:
 *  - trust-bar__items group  → flex row container (WordPress handles flex via is-layout-flex)
 *    - 4 × trust-item group  → flex row: bound SVG icon + paragraph
 *
 * Wrapping items in a core/group lets WordPress apply is-layout-flex in the editor,
 * so the items render horizontally without targeting internal editor DOM classes.
 */
const ITEMS = [
	{ icon: 'icon-shield.svg', text: 'White-hat SEO only' },
	{ icon: 'icon-code.svg',   text: 'Developer-first approach' },
	{ icon: 'icon-users.svg',  text: 'Serving NL &amp; Western Europe' },
	{ icon: 'icon-clock.svg',  text: 'Transparent hourly billing' },
];

const TEMPLATE = [
	[
		'core/group',
		{
			className: 'trust-bar__items',
			layout: {
				type: 'flex',
				flexWrap: 'wrap',
				alignItems: 'center',
				justifyContent: 'center',
			},
			style: { spacing: { blockGap: '32px' } },
		},
		ITEMS.map( ( { icon, text } ) => [
			'core/group',
			{
				className: 'trust-item',
				layout: { type: 'flex', alignItems: 'center', flexWrap: 'nowrap' },
				style: { spacing: { blockGap: '8px' } },
			},
			[
				iconImage( icon ),
				[ 'core/paragraph', { content: text } ],
			],
		] ),
	],
];

/**
 * Edit function — renders in the block editor
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'wp-block-imagewize-trust-bar',
	} );

	return (
		<div { ...blockProps }>
			<div className="trust-bar__inner">
				<InnerBlocks template={ TEMPLATE } templateLock={ false } />
			</div>
		</div>
	);
}
