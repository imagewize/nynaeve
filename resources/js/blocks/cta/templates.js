/**
 * CTA variant definitions.
 *
 * Every blog-post CTA shares one structure — spacer, bordered group, heading,
 * paragraph, four-item list, two buttons — so the structure lives here once in
 * `card()` and each variant supplies only its strings. Copy is lifted verbatim
 * from the seven `imagewize/cta-*` blocks this block replaces.
 *
 * The copy is imagewize.com's marketing text, not theme chrome, so it is not
 * wrapped in `__()`. Locale variants are peer entries (see `woocommerce-de`),
 * not translations layered on top of the English.
 */

/**
 * Build an InnerBlocks template from a variant's copy.
 *
 * The first button is the filled call, the second the outline one. Variants
 * that lead with a different call (performance-partnership) express that by
 * ordering `buttons`, not by changing the structure.
 */
const card = ({ heading, body, items, buttons }) => [
  [
    'core/spacer',
    {
      height: '32px',
    },
  ],
  [
    'core/group',
    {
      style: {
        spacing: {
          padding: {
            top: '1.5rem',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
          },
        },
        border: {
          left: {
            color: '#10b981',
            width: '4px',
          },
        },
      },
      backgroundColor: 'tertiary',
    },
    [
      [
        'core/heading',
        {
          level: 3,
          content: heading,
          style: {
            typography: {
              fontWeight: '600',
              lineHeight: '1.3',
            },
          },
        },
      ],
      [
        'core/paragraph',
        {
          content: body,
          style: {
            typography: {
              lineHeight: '1.7',
            },
          },
        },
      ],
      [
        'core/list',
        {
          className: 'wp-block-list',
        },
        items.map((content) => ['core/list-item', { content }]),
      ],
      [
        'core/buttons',
        {
          layout: {
            type: 'flex',
            flexWrap: 'wrap',
          },
        },
        buttons.map(([text, url], index) =>
          index === 0
            ? [
                'core/button',
                {
                  text,
                  url,
                  backgroundColor: 'primary',
                  textColor: 'base',
                  style: { border: { radius: '8px' } },
                },
              ]
            : [
                'core/button',
                {
                  text,
                  url,
                  className: 'is-style-outline',
                  style: { border: { radius: '8px' } },
                },
              ]
        ),
      ],
    ],
  ],
];

/**
 * The variants, one per inserter entry.
 */
export const VARIANTS = {
  'wordpress-development': {
    title: 'CTA: WordPress Development',
    icon: 'admin-generic',
    description: 'General WordPress development call-to-action block',
    keywords: ['cta', 'wordpress', 'development', 'maintenance', 'troubleshooting'],
    template: card({
      heading: 'Need a WordPress Developer?',
      body: 'We build, maintain, and troubleshoot WordPress sites for SMEs — custom theme development, plugin configuration, hosting setup, and ongoing hosting and support. Fixed-price quotes available.',
      items: [
        'Custom WordPress theme and plugin development',
        'WordPress hosting setup and server configuration',
        'Site migrations, updates, and troubleshooting',
        'Ongoing hosting, updates, and on-call support',
      ],
      buttons: [
        ['Get a Quote', '/contact/?service=wordpress-development'],
        ['View WordPress Services', '/services/wordpress-development/'],
      ],
    }),
  },

  woocommerce: {
    title: 'CTA: WooCommerce',
    icon: 'cart',
    description: 'WooCommerce development call-to-action block',
    keywords: ['cta', 'woocommerce', 'ecommerce', 'store', 'development'],
    template: card({
      heading: 'Need a WooCommerce Developer for Your Store?',
      body: 'We build and optimize WooCommerce stores for SMEs — from custom checkout flows and payment integrations to performance tuning and ongoing maintenance. Fixed-price quotes available.',
      items: [
        'Custom checkout and cart optimization',
        'Payment gateway integration (Stripe, Mollie, PayPal)',
        'WooCommerce performance and speed optimization',
        'Ongoing store maintenance and support',
      ],
      buttons: [
        ['Get a Quote', '/contact/?service=woocommerce'],
        ['View WooCommerce Services', '/services/woocommerce/'],
      ],
    }),
  },

  'woocommerce-de': {
    title: 'CTA: WooCommerce (DE)',
    icon: 'cart',
    description: 'German WooCommerce development call-to-action block',
    keywords: ['cta', 'woocommerce', 'de', 'deutsch', 'shop'],
    template: card({
      heading: 'Brauchen Sie einen WooCommerce-Entwickler für Ihren Shop?',
      body: 'Wir bauen und optimieren WooCommerce Shops für KMU in Deutschland und dem übrigen Europa — von individuellem Checkout und Zahlungsanbindungen bis Geschwindigkeitsoptimierung und laufender Wartung. Festpreise sind möglich.',
      items: [
        'Individuelle Checkout- und Warenkorb-Optimierung',
        'Zahlungsanbindungen (SEPA, Klarna, PayPal, Kreditkarte via Mollie/Stripe)',
        'WooCommerce Performance- und Geschwindigkeitsoptimierung',
        'Laufende Wartung und Support',
      ],
      buttons: [
        ['Angebot anfragen', '/contact/?service=woocommerce'],
        ['WooCommerce Leistungen ansehen', '/services/woocommerce/'],
      ],
    }),
  },

  'seo-service': {
    title: 'CTA: SEO Service',
    icon: 'search',
    description: 'SEO service call-to-action block with heading, description, bullet points, and action buttons',
    keywords: ['cta', 'seo', 'call to action', 'service', 'audit'],
    template: card({
      heading: 'Need WordPress SEO Support for Your Business?',
      body: 'We handle WordPress SEO for SMEs — from technical foundations (schema, crawlability, Core Web Vitals) to on-page optimization and content strategy. Fixed-price audits and ongoing support available.',
      items: [
        'Technical SEO audit and implementation',
        'Schema markup and structured data',
        'Core Web Vitals and page speed optimization',
        'On-page SEO and content strategy',
      ],
      buttons: [
        ['Get an SEO Audit', '/contact/?service=wordpress-seo'],
        ['View SEO Services', '/services/wordpress-seo/'],
      ],
    }),
  },

  'performance-partnership': {
    title: 'CTA: Performance Partnership',
    icon: 'performance',
    description: 'Performance partnership call-to-action block for speed optimization services',
    keywords: ['cta', 'performance', 'speed', 'optimization', 'partnership', 'agency'],
    template: card({
      heading: 'Want Results Like These for Your Site?',
      body: 'We provide WordPress speed optimization for SMEs and white-label performance services for agencies. Our typical results: 90+ PageSpeed scores on both mobile and desktop, with measurable improvements to Core Web Vitals and conversion rates.',
      items: [
        'Core Web Vitals optimization (LCP, CLS, INP)',
        'WooCommerce performance tuning',
        'Server-side optimization (Nginx, Trellis)',
        'Image optimization and lazy loading',
      ],
      // Leads with the services link rather than the quote — filled button first.
      buttons: [
        ['View Speed Optimization Services', '/services/speed-optimization/'],
        ['Get a Performance Audit', '/contact/?service=performance-audit'],
      ],
    }),
  },

  'trellis-hosting': {
    title: 'CTA: Trellis Hosting',
    icon: 'server',
    description: 'Trellis managed WordPress hosting call-to-action block',
    keywords: ['cta', 'trellis', 'hosting', 'server', 'managed', 'wordpress'],
    template: card({
      heading: 'Done Managing Your Own Server?',
      body: 'We offer managed WordPress hosting built on Trellis — Nginx, PHP 8.3, Redis, automated deployments via Ansible, and Bedrock structure on Hetzner EU. No shared hosting, no page builders, no surprises.',
      items: [
        'Trellis + Bedrock on Hetzner EU (Frankfurt / Helsinki)',
        'Nginx + FastCGI caching + Redis object cache',
        'Automated deployments via Ansible, SSL via Let\'s Encrypt',
        'From €49/month — or €65/hour for one-off server work',
      ],
      buttons: [
        ['Get a Quote', '/contact/?service=trellis-hosting'],
        ['View Hosting Plans', '/services/managed-wordpress-hosting/'],
      ],
    }),
  },

  'sage-agency': {
    title: 'CTA: Sage Agency Development',
    icon: 'admin-customizer',
    description: 'Sage and agency development partnership call-to-action block',
    keywords: ['cta', 'sage', 'agency', 'development', 'partner', 'wordpress'],
    template: card({
      heading: 'Need Help with a Sage or WordPress Project?',
      body: 'We work with agencies and freelance developers on Sage theme builds, WordPress migrations, and white-label development. Whether you need hands-on help or just a second opinion on architecture, we\'re available for short-term and ongoing engagements.',
      items: [
        'Sage 10 / 11 theme builds and migrations',
        'Composer, Vite, and build process troubleshooting',
        'White-label WordPress development for agencies',
        'Code reviews and technical consulting',
      ],
      buttons: [
        ['Get a Quote', '/contact/?service=sage-development'],
        ['View WordPress Services', '/services/wordpress-development/'],
      ],
    }),
  },

  'fse-block-theme': {
    title: 'CTA: FSE Block Theme',
    icon: 'layout',
    description: 'FSE / block theme development call-to-action block with heading, description, bullet points, and action buttons',
    keywords: ['cta', 'fse', 'block theme', 'call to action', 'site editor'],
    template: card({
      heading: 'Need Help with a Block Theme or FSE Build?',
      body: 'We build and debug WordPress block themes — full-site editing templates, pattern libraries, Site Editor workflows, and the WP-CLI plumbing that keeps them deployable. Fixed-price quotes and ongoing support available.',
      items: [
        'FSE block theme builds and migrations from classic themes',
        'Block pattern libraries and Site Editor template work',
        'Pattern validation, debugging, and WP-CLI deployment workflows',
        'WooCommerce on block themes — single product, shop, and archive templates',
      ],
      buttons: [
        ['Get a Quote', '/contact/?service=block-theme-development'],
        ['View WordPress Services', '/services/wordpress-development/'],
      ],
    }),
  },
};
