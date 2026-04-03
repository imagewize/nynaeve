/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Expect List InnerBlocks template.
 *
 * Structure:
 *  - Eyebrow paragraph     → section label (light blue)
 *  - H2 heading            → section title
 *  - Lead paragraph        → section lead text
 *  - Items group           → vertical stack of expect items
 *    - 4 × item group
 *      - Icon paragraph    → blue dot circle with inline SVG
 *      - Content group     → title paragraph + description paragraph
 */

const CODE_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>';

const CHAT_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>';

const CHECK_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';

const BILLING_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>';

const ITEMS = [
	{
		icon: CODE_ICON,
		title: 'A developer-first approach',
		desc: 'Not just plugin toggles and automated reports. Real code changes, real understanding of WordPress internals.',
	},
	{
		icon: CHAT_ICON,
		title: 'Clear communication, fully async',
		desc: 'Email and chat — no mandatory calls, no chasing. You hear from us when we have something real to say.',
	},
	{
		icon: CHECK_ICON,
		title: 'No lock-in contracts',
		desc: 'Project-by-project or retainer — your choice. We earn repeat business by delivering results, not by trapping you.',
	},
	{
		icon: BILLING_ICON,
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
					'core/paragraph',
					{
						className: 'expect-item__dot',
						content: icon,
					},
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
