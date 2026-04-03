/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Service Blocks InnerBlocks template.
 *
 * Structure:
 *  - Eyebrow paragraph     → section label (blue, uppercase, small)
 *  - H2 heading            → section title
 *  - Lead paragraph        → section lead text
 *  - Service list group    → vertical stack of service cards
 *    - 3 × service card group
 *      - Header group      → number + service title (h3)
 *      - Body group        → description paragraph + checklist
 */

const SERVICES = [
	{
		num: '01',
		title: 'On-Page SEO for WordPress',
		description:
			'Getting the technical foundations right is only half the battle. We optimize each page and post for how real users search — focusing on commercial intent, not just traffic volume.',
		items: [
			'Keyword research focused on commercial intent and long-tail queries',
			'Title tags and meta descriptions crafted to improve click-through rates',
			'Internal linking structure that passes authority to your key pages',
			'SEO-friendly URL slugs and permalink configuration',
			'Image optimization — alt text, file names, WebP/AVIF formats',
			'Content structure: clear headings, semantic HTML, readable paragraphs',
		],
	},
	{
		num: '02',
		title: 'Technical WordPress SEO',
		description:
			"This is where developer-level expertise matters most. We fix the issues that most SEO agencies can't — because they require real code changes, not plugin toggles.",
		items: [
			'Core Web Vitals optimization at the code level (LCP, CLS, INP)',
			'Schema markup: Organization, Article, Product, BreadcrumbList, FAQ',
			'WordPress theme audit — identifying code that hurts SEO performance',
			'Plugin audit — removing render-blocking scripts and bloated markup',
			'Nginx and server-level caching for faster Time to First Byte',
			'SSL verification and mixed content resolution',
		],
	},
	{
		num: '03',
		title: 'WordPress SEO + Speed Combined',
		description:
			"Google's ranking signals now include real user experience data. A slow site loses rankings. We handle both SEO and performance in a single engagement — so nothing falls through the gaps.",
		items: [
			'Image compression, lazy loading, and next-gen format conversion',
			'CSS and JavaScript minification, deferral, and code splitting',
			'WP Rocket configuration and fine-tuned cache rules',
			'CDN integration for global asset delivery',
			'Database optimization and query cleanup',
		],
	},
];

const TEMPLATE = [
	[
		'core/paragraph',
		{
			className: 'service-blocks__label',
			content: 'What We Do',
		},
	],
	[
		'core/heading',
		{
			level: 2,
			className: 'service-blocks__title',
			content: 'Our WordPress SEO Services',
		},
	],
	[
		'core/paragraph',
		{
			className: 'service-blocks__lead',
			content:
				'Three areas where developer-level SEO makes the biggest difference.',
		},
	],
	[
		'core/group',
		{ className: 'service-blocks__list' },
		SERVICES.map( ( { num, title, description, items } ) => [
			'core/group',
			{ className: 'service-block' },
			[
				[
					'core/group',
					{ className: 'service-block__header' },
					[
						[
							'core/paragraph',
							{
								className: 'service-block__num',
								content: num,
							},
						],
						[
							'core/heading',
							{
								level: 3,
								className: 'service-block__title',
								content: title,
							},
						],
					],
				],
				[
					'core/group',
					{ className: 'service-block__body' },
					[
						[
							'core/paragraph',
							{
								className: 'service-block__desc',
								content: description,
							},
						],
						[
							'core/list',
							{
								className: 'service-block__checklist',
								ordered: false,
								values: items
									.map( ( item ) => `<li>${ item }</li>` )
									.join( '' ),
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
		className: 'wp-block-imagewize-service-blocks',
	} );

	return (
		<div { ...blockProps }>
			<div className="service-blocks__inner">
				<InnerBlocks template={ TEMPLATE } templateLock={ false } />
			</div>
		</div>
	);
}
