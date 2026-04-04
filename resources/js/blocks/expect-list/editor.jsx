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
		width: 18,
		height: 18,
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
 * Expect List InnerBlocks template.
 *
 * Structure:
 *  - Eyebrow paragraph     → section label (light blue)
 *  - H2 heading            → section title
 *  - Lead paragraph        → section lead text
 *  - Items group           → vertical stack of expect items
 *    - 4 × item group
 *      - Dot group         → blue circle container with bound SVG icon
 *      - Content group     → title paragraph + description paragraph
 */

const ITEMS = [
	{
		icon: 'icon-code.svg',
		title: 'A developer-first approach',
		desc: 'Not just plugin toggles and automated reports. Real code changes, real understanding of WordPress internals.',
	},
	{
		icon: 'icon-chat.svg',
		title: 'Clear communication, fully async',
		desc: 'Email and chat — no mandatory calls, no chasing. You hear from us when we have something real to say.',
	},
	{
		icon: 'icon-shield.svg',
		title: 'No lock-in contracts',
		desc: 'Project-by-project or retainer — your choice. We earn repeat business by delivering results, not by trapping you.',
	},
	{
		icon: 'icon-clock.svg',
		title: 'Transparent pricing',
		desc: 'Hourly rate for open-ended work, fixed price for defined scopes. No surprises on the invoice.',
	},
];

const TEMPLATE = [
	[
		'core/paragraph',
		{
			className: 'expect-list__label',
			content: 'Working With Us',
		},
	],
	[
		'core/heading',
		{
			level: 2,
			className: 'expect-list__title',
			content: 'What You Can Expect',
		},
	],
	[
		'core/paragraph',
		{
			className: 'expect-list__lead',
			content:
				'We work the way you work — async, transparent, and without lock-in.',
		},
	],
	[
		'core/group',
		{ className: 'expect-list__items' },
		ITEMS.map( ( { icon, title, desc } ) => [
			'core/group',
			{ className: 'expect-item' },
			[
				[
					'core/group',
					{ className: 'expect-item__dot' },
					[ iconImage( icon ) ],
				],
				[
					'core/group',
					{ className: 'expect-item__content' },
					[
						[
							'core/paragraph',
							{
								className: 'expect-item__title',
								content: title,
							},
						],
						[
							'core/paragraph',
							{
								className: 'expect-item__desc',
								content: desc,
							},
						],
					],
				],
			],
		] ),
	],
];

/**
 * Edit function — renders in the block editor
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'wp-block-imagewize-expect-list',
	} );

	return (
		<div { ...blockProps }>
			<div className="expect-list__inner">
				<InnerBlocks template={ TEMPLATE } templateLock={ false } />
			</div>
		</div>
	);
}
