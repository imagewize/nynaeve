=== Nynaeve ===
Contributors: jasperfrumau
Requires at least: 6.6
Tested up to: 6.9
Requires PHP: 8.3
Stable tag: 4.0.0
License: MIT License
License URI: https://opensource.org/licenses/MIT

== Description ==

Nynaeve is the Imagewize.com production theme built on Sage 11 (Roots.io stack) with Laravel Blade templating, Tailwind CSS 4, Vite, and custom WordPress blocks. Powers the imagewize.com digital agency website with WooCommerce quote-based integration.

== Upgrade Notice ==

= 4.0.0 =
Removes the seven blog-post CTA blocks in favour of the single imagewize/cta block. Posts that still contain the old blocks must have their markup migrated, one literal search-replace per variant, for example:

wp search-replace '<!-- wp:imagewize/cta-woocommerce -->' '<!-- wp:imagewize/cta {"variant":"woocommerce"} -->' wp_posts --include-columns=post_content --precise --dry-run
wp search-replace '<!-- /wp:imagewize/cta-woocommerce -->' '<!-- /wp:imagewize/cta -->' wp_posts --include-columns=post_content --precise --dry-run
wp search-replace 'wp-block-imagewize-cta-woocommerce' 'wp-block-imagewize-cta is-variant-woocommerce' wp_posts --include-columns=post_content --precise --dry-run

Export the database first and verify each dry-run count before dropping --dry-run.

== Changelog ==

= 4.0.0 - 08/30/26 =
* BREAKING: The seven blog-post CTA blocks are removed - imagewize/cta-fse-block-theme, cta-performance-partnership, cta-sage-agency, cta-seo-service, cta-trellis-hosting, cta-woocommerce and cta-wordpress-development. They are replaced by the single imagewize/cta block. Posts still containing the old blocks keep their content, but show an unsupported-block placeholder in the editor and lose the outline-button hover styling on the frontend until their markup is migrated - see the Upgrade Notice section above.
* FEATURE: New imagewize/cta block consolidates the seven blog-post CTA blocks into one, with eight inserter variations (WordPress development, WooCommerce, WooCommerce DE, SEO, performance partnership, Trellis hosting, Sage agency, FSE block theme). One stylesheet and one block.json to maintain instead of seven identical copies.
* FEATURE: A placed CTA can be switched between variants from the block sidebar, rebuilding its content from the selected variant instead of requiring a delete and re-insert.
* FEATURE: A German WooCommerce CTA variation ships as a first-class inserter entry, replacing the hand-authored markup that previously had to be pasted into German posts.
* TECHNICAL: The new block uses templateLock "contentOnly" and declares color: false and html: false, so its text stays editable while its structure and colours cannot drift into post_content the way the unlocked cta-* blocks could.
* TECHNICAL: Block count drops from 35 to 29.

= 3.1.1 - 08/24/26 =
* DOCUMENTATION: CLAUDE.md and AGENTS.md updated for the Composer-package sync model - this repo is the source of truth, published to Packagist as imagewize/nynaeve; the copy under imagewize.com/site/web/app/themes/nynaeve/ is a disposable, git-ignored Composer snapshot, never edited directly. Dropped HMR instructions that assumed npm run dev ran against the directory WordPress actually serves.
* DOCUMENTATION: CLAUDE.md and AGENTS.md now document all 35 blocks and the namespace-vs-category distinction (imagewize namespace, nynaeve category prefix).
* TECHNICAL: GitHub Actions workflows bumped to current majors - actions/checkout v4 to v7, actions/setup-node v4 to v7, actions/cache v4 to v6, clearing Node 20 deprecation warnings. tj-actions/changed-files stays exact-pinned (v47.0.6) per its 2025 tag-compromise mitigation.
* TECHNICAL: CI now builds on Node 22 (Node 20 reached end-of-life in April 2026); package engines floor (>=20.0.0) is unaffected.
* TECHNICAL: composer.json description expanded from a one-line stub to describe the Sage 11 / Blade / Tailwind 4 / Vite stack, block count, and WooCommerce integration.

= 3.1.0 - 08/17/26 =
* FEATURE: Two-column single-post layout - content column at the standard 55rem contentSize with a slim 18rem sticky CTA card beside it at xl and up. Below xl the aside is dropped and the post renders as a single full-width column as before.
* FEATURE: New sticky sidebar CTA card partial, styled to match the in-content CTA groups already used across the blog rather than introducing a second CTA language. Replaces the full-bleed end-of-post CTA partial.
* FIXED: The two-column grid never applied - WordPress core's block-library stylesheet declares `.wp-block-post-content { display: flow-root }` outside any cascade layer, which beats Tailwind's layered `xl:grid` regardless of specificity, so the sidebar stacked below the post. The grid now lives on a plain wrapper element.
* FIXED: The sidebar card's white button label rendered invisible (blue on blue) - a content-area link rule in app.css repainted it. Keeping the aside a sibling of `.wp-block-post-content` rather than a descendant takes it out of that selector's scope.
* FIXED: The sidebar card heading rendered at article-h2 size, since app.css styles bare `h2` outside any cascade layer.
* FIXED: The sticky card rode flush into the footer at the bottom of the page. A bottom margin on the aside stops it short - a sticky box keeps its margin box inside the containing block, and grid-wrapper padding cannot do this because it never extends the grid area.
* TECHNICAL: Comments moved back into the content column so they align with the now-offset body.
* TECHNICAL: At xl and up, alignfull/alignwide blocks inside post bodies now bleed to the 55rem content column rather than the viewport, since that column is the layout container. Below xl they still go edge-to-edge.

= 3.0.2 - 08/16/26 =
* FIXED: The three `imagewize/review-profiles` avatar images rendered broken on the frontend - `editor.jsx` imported the `.webp` files directly, so Vite hashed them into a build-time URL that got baked into saved post content. Same class of bug fixed for icons in 2.15.3.
* TECHNICAL: Registered a new `imagewize/review-photo` block bindings source mirroring `imagewize/theme-icon`, resolving the current Vite asset URL at render time so published content survives future rebuilds.
* TECHNICAL: Moved the three profile images into `resources/images/reviews/`, already covered by the `assets: ['resources/images/**']` glob in vite.config.js, so no build config change was needed.
* NOTE: This fixes the block definition for all future inserts. Already-published instances still carry the old hashed src in post_content and need a one-time content migration, tracked separately.

= 3.0.1 - 08/15/26 =
* DOCUMENTATION: README block count corrected from 27 to 35 - the eight blocks added in 3.0.0 shipped without a README entry.
* DOCUMENTATION: Added a Service CTAs section documenting the seven `cta-*` service blocks, and Quick Summary under Content & Layout.
* TECHNICAL: Documentation only; no PHP, block, markup, styling, or build output changes.

= 3.0.0 - 08/15/26 =
* BREAKING: All blocks consolidated under the `imagewize` namespace. `nynaeve/about`, `nynaeve/cta-block-blue` and `nynaeve/contact-section` are renamed to `imagewize/*`. A block's name determines both its comment delimiter and its generated wrapper class, and both are stored in post content, so this requires a content migration after deploying - see CHANGELOG.md for the exact wp search-replace commands. Do not blanket-replace the string `nynaeve/`; post content also contains `/app/themes/nynaeve/...` asset paths.
* BREAKING: Block stylesheet versions bumped for `contact-section`, `cta-block-blue` and `case-studies` - the rename rewrites every selector, and Trellis serves static assets with a one-year cache, so an unbumped `?ver=` would keep returning visitors on pre-rename CSS.
* FIXED: The about block's entire stylesheet had been dead since 2026-04-08 - it targeted `.wp-block-imagewize-about` while the block generated `.wp-block-nynaeve-about`. Now live again. Same for the app.css inner-container padding reset and the case-studies editor.css selectors.
* FIXED: `imagewize-cta-block-blue-style` in app/filters.php now matches a real handle, so the stylesheet is deferred as originally intended. All 15 entries audited against the block registry.
* FIXED: The cta-block-blue button hover control had stopped matching since the rename; parent-block check updated.
* FIXED: 57 posts still carrying pre-April `imagewize/about` markup had been rendering as unregistered blocks. The rename restores them without any migration.
* FEATURE: Seven CTA service blocks - `imagewize/cta-seo-service`, `cta-fse-block-theme`, `cta-performance-partnership`, `cta-sage-agency`, `cta-trellis-hosting`, `cta-woocommerce`, `cta-wordpress-development` - replacing the copy-paste HTML workflow for adding service CTAs to posts.
* FEATURE: New `imagewize/quick-summary` block - the highlighted callout used at the top of long-form posts.
* FIXED: Outline button text was invisible on hover in all seven CTA blocks - blue on blue. `.is-style-outline` sits on the wrapper div, not the anchor, so the old rule set color where the anchor's inline color overrode it.
* FIXED: CTA blocks rendered at wideSize while the post body sits at contentSize, so they overhung the text they follow. Removed the `align` default; wide/full remain available per instance.

= 2.15.10 - 08/11/26 =
* DOCUMENTATION: Added Packagist badges (Total Downloads, Latest Stable Version, License) to README.md alongside the existing Composer installation documentation.

= 2.15.9 - 08/10/26 =
* SECURITY: Updated guzzlehttp/guzzle 7.15.1 to 7.15.3, resolving two Dependabot advisories - noncanonical host can bypass host-based checks (high), and noncanonical cookie domain keeps subdomain scope (medium).
* SECURITY: Updated nanoid 3.3.16 to 3.3.18, resolving a high-severity advisory where custom generators could loop indefinitely when size is zero.
* SECURITY: Updated fast-uri 3.1.4 to 3.1.5, resolving a high-severity host confusion advisory via backslash authority introducer.
* TECHNICAL: All three are transitive dependencies whose existing semver ranges already permitted the patched versions, so updates were scoped narrowly rather than as a broad dependency bump. No PHP, block, markup, styling, or build output changes.

= 2.15.8 - 07/25/26 =
* DOCUMENTATION: Fixed four broken relative doc links in CLAUDE.md that pointed at a `docs/` folder not present in the theme.
* DOCUMENTATION: Inlined the essential layout/padding and ACF block guidance so theme guidance is self-contained.
* DOCUMENTATION: Added branch-per-change and atomic-commit rules to CLAUDE.md and AGENTS.md.
* DOCUMENTATION: Corrected block.json guidance - namespace is `imagewize`, but category (`nynaeve/content`) and textdomain (`nynaeve`) both use the `nynaeve` prefix. The documented category prefix was wrong and would place new blocks in an unregistered editor category.
* DOCUMENTATION: Removed unreachable links from CHANGELOG.md - the project root changelog link and three `docs/` links that escaped the theme directory. Every link in the theme's markdown now resolves within the theme.
* TECHNICAL: Documentation only; no theme behavior, markup, or build output changes.

= 2.15.7 - 07/25/26 =
* TECHNICAL: npm security updates - Updated nanoid (3.3.12 to 3.3.16) and postcss (8.5.15 to 8.5.23) to address reported advisories.
* TECHNICAL: Dependency bump - Updated fast-uri from 3.1.2 to 3.1.4.
* TECHNICAL: Lockfile only - All updates are build-time dev dependencies; no frontend or theme behavior changes.


= 2.15.6 - 07/23/26 =
* SECURITY: Updated guzzlehttp/guzzle from 7.13.1 to 7.15.1, resolving four Dependabot advisories (GHSA-h95v-h523-3mw8, GHSA-f283-ghqc-fg79, GHSA-wm3w-8rrp-j577, GHSA-94pj-82f3-465w). Transitive dependency via roots/acorn and illuminate/http — composer.lock only, no composer.json change.

= 2.15.5 - 07/23/26 =
* FIXED: Services mega menu opened when hovering anywhere along the bottom edge of the header (e.g. to the right of Contact, beside the social icons). The generic dropdown hover bridge now excludes the mega item, which gets its own bridge scoped to the width of the menu item.

= 2.15.4 - 07/06/26 =
* TECHNICAL: Removed vestigial import.meta.glob(['../images/**', '../fonts/**']) from resources/js/app.js — dead since Vite 8 tree-shakes unused globs, and both paths are already covered by the assets option (images) and real CSS url() imports (fonts).

= 2.15.3 - 07/03/26 =
* FIXED: Theme icon binding - SVG icons no longer render as broken images in the editor and frontend.
* TECHNICAL: Added assets: ['resources/images/**'] to Vite laravel() plugin so theme-icon SVGs get manifest entries for Vite::asset() resolution.
* TECHNICAL: Documented the required vite.config.js assets option in CLAUDE.md, AGENTS.md, and THEME-ICON-BINDING-BROKEN.md; never import SVGs in blocks, use the imagewize/theme-icon binding.


= 2.15.2 - 06/30/26 =
* CHANGED: Removed redundant [session_logging] block from .vibe/config.toml — save_dir was a hardcoded absolute path that crashed Vibe on other machines.
* CHANGED: Updated PHP dependencies — illuminate/* to v13.17.0, brick/math, carbon, guzzlehttp/*, and other composer.lock updates.

= 2.15.1 - 06/22/26 =
* CHANGED: Migrated Mistral Vibe development instructions from .vibe/prompts/vibe.md to AGENTS.md for standardized AI agent guidance.
* CHANGED: Updated .vibe/config.toml to use default CLI system prompt instead of custom vibe prompt.
* CHANGED: Enhanced AGENTS.md with block inserter preview, alignfull margin reset, and WooCommerce customization guidance.

= 2.15.0 - 06/19/26 =
* ADDED: Services mega menu — full-width desktop dropdown with icon-enhanced service links in a four-column grid layout and a featured CTA card.
* ADDED: Blade components `<x-mega-menu>` and `<x-mega-icon>` for mega menu rendering and SVG icon mapping (10 service icons).
* ADDED: Hover bridge on mega menu panel preventing accidental close when moving cursor from nav bar to dropdown.
* CHANGED: Nav element receives `lg:relative` positioning to anchor mega menu panels to full header width.
* CHANGED: Menu item labels use unescaped Blade output to support HTML entities in WordPress menu labels.
* CHANGED: Top-level items with `mega-menu` CSS class now route to the mega menu component instead of the standard dropdown."


= 2.14.2 - 06/15/26 =
* CHANGED: Vite 8 upgrade - Migrated theme build pipeline from Vite 7 to Vite 8, switching from Rollup to the Rust-based Rolldown bundler for faster builds.
* CHANGED: Upgraded @roots/vite-plugin (v1.3.1 to v2.2.0) and laravel-vite-plugin (v2 to v3) for Vite 8 compatibility.
* TECHNICAL: Tailwind CSS toolchain bumped 4.3.0 to 4.3.1; @babel/runtime, @types/node, @types/react, and @types/estree updated.
* TECHNICAL: Native bindings now require Node ^20.19.0 || >=22.12.0; regenerated package-lock.json with the new dependency tree.

= 2.14.1 - 06/13/26 =
* CHANGED: Blog index posts navigation - Wrapped in responsive grid container with flex layout, styled prev/next links (smaller bold primary-colored text), aligned to columns 3-12 on desktop (1024px+).


= 2.14.0 - 06/11/26 =
* CHANGED: Upgraded roots/acorn from 5.0.1 to ^6.0 (Acorn 6, the framework powering Sage 11's Laravel integration).
* CHANGED: Upgraded all Illuminate (Laravel) components from v12.61.0 to v13.15.0.
* CHANGED: Upgraded owenvoke/blade-fontawesome from ^2.8 to ^3.2.
* CHANGED: Updated Guzzle to 7.11.1, promises to 2.5.0, and psr7 to 2.11.0.
* TECHNICAL: Raised minimum PHP requirement from 8.2 to 8.3 (required by Acorn 6 and Illuminate 13).


= 2.13.3 - 05/29/26 =
* SECURITY: Updated symfony/http-kernel v7.4.6 → v7.4.13 (CVE-2026-45075).
* SECURITY: Updated symfony/mime v7.4.6 → v7.4.13 (CVE-2026-45070, CVE-2026-45067).
* SECURITY: Updated symfony/routing v7.4.6 → v7.4.13 (CVE-2026-45065).
* SECURITY: Updated symfony/polyfill-intl-idn v1.33.0 → v1.38.1 (CVE-2026-46644).
* FIXED: Resolved Laravel Pint CI failure in functions.php — added ThemeServiceProvider import, replaced FQCN with short class reference, fixed operator spacing rules.
* TECHNICAL: Updated illuminate/* packages v12.53.0 → v12.61.0 (full Laravel framework stack).
* TECHNICAL: Updated guzzlehttp/guzzle 7.10.0 → 7.10.5 and related PSR-7/promises packages.
* TECHNICAL: Updated symfony/console, process, finder, string, translation, clock, and all contracts to latest stable.
* TECHNICAL: Updated symfony polyfill packages (mbstring, ctype, intl-idn, intl-grapheme, intl-normalizer, php80/83/84/85) v1.33.0 → v1.38.1.
* TECHNICAL: Updated blade-ui-kit/blade-icons 1.9.0 → 1.10.0, codeat3/blade-clarity-icons 1.10.0 → 1.11.0, khatabwedaa/blade-css-icons 1.5.0 → 1.6.0.
* TECHNICAL: Updated log1x/acf-composer v3.4.4 → v3.4.6, imagewize/sage-native-block v2.1.0 → v2.1.1.
* TECHNICAL: Updated laravel/pint v1.27.1 → v1.29.1, laravel/prompts v0.3.13 → v0.3.18.
* TECHNICAL: Updated league/flysystem 3.32.0 → 3.34.0, nesbot/carbon 3.11.1 → 3.11.4, voku/portable-ascii 2.0.3 → 2.1.1.


= 2.13.2 - 05/22/26 =
* TECHNICAL: Updated Tailwind CSS from 4.2.2 to 4.3.0 including node, oxide, and vite packages.
* TECHNICAL: Updated Rollup from 4.60.1 to 4.60.4 across all platform native binaries.
* TECHNICAL: Updated WordPress build packages (@wordpress/element, @wordpress/dependency-extraction-webpack-plugin, @wordpress/escape-html, @wordpress/primitives) from v6.43.0 to v6.46.0.
* TECHNICAL: Updated PostCSS from 8.5.9 to 8.5.15.
* TECHNICAL: Updated Terser from 5.46.1 to 5.48.0 and terser-webpack-plugin from 5.4.0 to 5.6.0.
* TECHNICAL: Updated enhanced-resolve, es-module-lexer, jiti, tapable, loader-runner, nanoid, fast-uri, ajv to latest patch versions.
* TECHNICAL: Updated caniuse-lite, electron-to-chromium, baseline-browser-mapping, node-releases with latest browser compatibility data.
* TECHNICAL: Updated @types/node to 25.9.1 and @types/react to 18.3.29.
* TECHNICAL: Removed unused peer dependencies @types/eslint, @types/eslint-scope, mime-types, json-parse-even-better-errors."


= 2.13.1 - 04/28/26 =
* CHANGED: Footer content now constrained to max-w-6xl centered container; padding moved from <footer> to inner wrapper so background remains full-width.
* CHANGED: Footer widget columns now flex-wrap on narrow screens with 3rem gap and 180px minimum column width to prevent overflow."


= 2.13.0 - 04/25/26 =
* ADDED: Transparent sticky nav — pages starting with a dark hero (service-hero, elayne-hero, contact-section) show a fully transparent nav that transitions to semi-transparent dark on scroll.
* CHANGED: Header template — removed hardcoded Tailwind classes; `.banner` now controls all nav styling via app.css.
* FIXED: overflow-x changed from hidden to clip on html/body so position:sticky on <header> works correctly.
* TECHNICAL: README.md block count updated to 27 and block inventory corrected to reflect existing blocks.
* TECHNICAL: CLAUDE.md block inventory updated with 12 previously undocumented blocks.
* TECHNICAL: Nav JS uses passive scroll listener and handles page-header page layouts for transparent nav detection.


= 2.12.0 - 04/24/26 =
* ADDED: New `nynaeve/contact-section` block — full-width dark section with intro, two-column info/CF7-form-card layout, icon detail rows, and animated availability badge.
* ADDED: `icon-mail.svg` theme icon (brand-blue stroke) registered for use in the contact-section block.
* ADDED: CF7 form card renders a CSS Grid two-column name + email row; stacks to single column on mobile (≤860px).
* ADDED: Responsive layout — form card above info column on tablet/mobile, reduced padding on small phones (≤520px).
* ADDED: Decorative radial-gradient glow pseudo-elements on the contact section wrapper for visual depth.
* ADDED: Block editor preview styles (`editor.css`) so dark background, grid, and form card are visible while editing.
* ADDED: Section 16 in `app.css` — comprehensive Contact Form 7 global styles (inputs, textarea, select, submit button, validation tips, success/error banners).
* ADDED: `.wpcf7-on-dark` CSS utility class for dark-background CF7 form variants (semi-transparent fields, white text, primary-color focus ring)."


= 2.11.1 - 04/23/26 =
* FIXED: Single post entry-meta mobile layout - restructured into two flex-nowrap groups (dates and author+category) so each wraps as a unit; author name and category tag now stay on the same line on mobile.


= 2.11.0 - 04/21/26 =
* ADDED: Service Hero block - Four colour scheme styles: Midnight Blue (default), Forest Green, Violet, and Slate Teal, selectable via the block styles panel.
* ADDED: Service Hero Forest Green style - Deep green background with radial gradient, green eyebrow/title accent, and green CTA button.
* ADDED: Service Hero Violet style - Deep purple background with violet radial gradient, violet eyebrow/title accent, and violet CTA button.
* ADDED: Service Hero Slate Teal style - Dark navy background with teal radial gradient, teal eyebrow/title accent, and teal CTA button.
* TECHNICAL: Service Hero - Registered block styles via registerBlockStyle() in editor.jsx; refactored base CSS to support is-style-* class variants."


= 2.10.0 - 04/21/26 =
* ADDED: Category description support in page header - Archive pages for categories, tags, and custom taxonomies now display the term description below the page title when one is set.
* ADDED: Post view composer - `app/View/Composers/Post.php` exposes a `description()` method that returns `category_description()` for category/tag/taxonomy archives and an empty string elsewhere.
* ADDED: page-header.blade.php - Conditionally renders the term description in a styled div with primary-accent text color, Open Sans font, and centered layout.


= 2.9.0 - 04/08/26 =
* CHANGED: Block category system - Updated from single `imagewize` category to semantic subcategories prefixed with `nynaeve/` (nynaeve/hero, nynaeve/features, nynaeve/cta, nynaeve/testimonials, nynaeve/pricing, nynaeve/content, nynaeve/media, nynaeve/portfolio); category slugs now match the theme name prefix, consistent with Elayne theme conventions
* CHANGED: About Block - Moved to `nynaeve/content` category
* CHANGED: Carousel Block - Moved to `nynaeve/media` category and added `example` field
* CHANGED: Case Studies Grid Block - Moved to `nynaeve/portfolio` category
* CHANGED: Image and Text Card Block - Moved to `nynaeve/content` category
* CHANGED: CTA Block Blue - Moved to `nynaeve/cta` category
* CHANGED: CTA Columns Block - Moved to `nynaeve/cta` category
* CHANGED: Elayne Hero Block - Moved to `nynaeve/hero` category
* CHANGED: Expect List Block - Moved to `nynaeve/features` category
* CHANGED: FAQ Section Block - Moved to `nynaeve/content` category
* CHANGED: Feature Cards Block - Moved to `nynaeve/features` category
* CHANGED: Feature List Grid Block - Moved to `nynaeve/features` category
* CHANGED: Icon Grid Block - Moved to `nynaeve/content` category
* CHANGED: Multi-Column Content Block - Moved to `nynaeve/content` category
* CHANGED: Page Heading Blue Block - Moved to `nynaeve/hero` category
* CHANGED: Pricing Tiers Block - Moved to `nynaeve/pricing` category
* CHANGED: Modern Pricing Table Block - Moved to `nynaeve/pricing` category
* CHANGED: Related Articles Block - Moved to `nynaeve/content` category
* CHANGED: Related Links Block - Moved to `nynaeve/content` category
* CHANGED: Review Profiles Block - Moved to `nynaeve/testimonials` category
* CHANGED: Service Detail Cards Block - Moved to `nynaeve/features` category
* CHANGED: Service Hero Block - Moved to `nynaeve/hero` category
* CHANGED: Service Intro Block - Moved to `nynaeve/content` category
* CHANGED: Slide Block - Moved to `nynaeve/media` category
* CHANGED: Testimonial Grid Block - Moved to `nynaeve/testimonials` category
* CHANGED: Trust Bar Block - Moved to `nynaeve/testimonials` category
* CHANGED: Two Column Card Block - Moved to `nynaeve/content` category
* CHANGED: All 26 blocks - textdomain updated from `imagewize`/`sage` to `nynaeve` (matches theme Text Domain)
* FIXED: example [] to {} on cta-block-blue, feature-list-grid, review-profiles, testimonial-grid; added missing example field to slide block
* FIXED: Alignfull margin reset added to 9 blocks (cta-block-blue, cta-columns, elayne-hero, multi-column-content, pricing, pricing-tiers, review-profiles, testimonial-grid, two-column-card) to prevent 24px WP layout gap
* FIXED: Hardcoded palette hex colors replaced with CSS custom properties in style.css across 11 blocks
* FIXED: placeholder: keys replaced with real content: values in content-image-text-card and cta-columns editor templates
* FIXED: Removed width/height attributes from core/image blocks in expect-list, icon-grid, service-hero to prevent block validation mismatches
* FIXED: i18n textdomain in JSX — __()/_n()/_x() calls corrected from 'imagewize'/'sage' to 'nynaeve' across 10 JSX files (149 occurrences): carousel, case-studies, content-image-text-card, cta-block-blue, faq, pricing-tiers, pricing, related-articles, slide, testimonial-grid
* TECHNICAL: Compliance checker and GitHub Actions workflow updated to enforce nynaeve textdomain and i18n textdomain in JSX
* TECHNICAL: Updated CLAUDE.md and setup.php to reflect new block category structure and textdomain standard


= 2.8.1 - 04/08/26 =
* FIXED: Replaced dead `.wp-block-paragraph` selectors with `p` in content-image-text-card, review-profiles, service-hero, and trust-bar blocks to ensure paragraph styles are correctly applied on the frontend."


= 2.8.0 - 04/08/26 =
* ADDED: New service-intro block — white full-width intro text section for service pages, 860px constrained width, two editable paragraphs, 64px vertical padding (48px mobile).
* ADDED: Service-intro block pre-filled InnerBlocks template with real service page content; templateLock false allows editors to customize freely.
* ADDED: Service-intro block typography — 1.0625rem font size, 1.75 line-height, main-accent color variable, strong text uses main color.
* TECHNICAL: CLAUDE.md — documented that .wp-block-paragraph class does not exist on the frontend; blocks must target p element directly in style.css."


= 2.7.1 - 04/04/26 =
* FIXED: Block editor styles - Replaced full Tailwind import with theme/utilities-only imports in editor.css to prevent Preflight from resetting heading sizes, list bullets, and other editor defaults.
* FIXED: Safari scrollbar visibility in Gutenberg editor - Added WebKit scrollbar styles with semi-transparent dark thumb so scrollbars are visible on light backgrounds."


= 2.7.0 - 04/04/26 =
* CHANGED: expect-list block - Replaced inline SVG strings with bound theme-icon images; dot container changed from core/paragraph to core/group; updated CSS selectors accordingly.
* CHANGED: service-hero block - Eyebrow changed from core/paragraph to core/group (flex row) with bound icon-search.svg + paragraph; fixes editor contenteditable issue with flex+pseudo-elements on <p>.
* CHANGED: service-hero block - Added editor.css overrides to reset button link display and ::after so RichText remains clickable in the editor.
* CHANGED: related-links block - Arrow icon technique changed from flex+::before pseudo-element to display:block+background-image with left padding; fixes editor editability for button links.
* ADDED: icon-shield.svg - Shield/checkmark SVG icon (blue, #2563eb) for trust messaging.
* ADDED: icon-users.svg - Group/users SVG icon (blue, #2563eb) for team/client messaging.
* ADDED: icon-clock.svg - Clock SVG icon (blue, #2563eb) for pricing/time messaging.
* ADDED: icon-search.svg - Search magnifier SVG icon (light blue, #93c5fd) for service-hero eyebrow.
* TECHNICAL: Registered new icons (shield, users, clock, search) in setup.php for trust-bar and service-hero blocks via window.imagewizeIcons and imagewize/theme-icon binding.
* TECHNICAL: CLAUDE.md condensed and reorganised; added critical notes on flex+pseudo-elements breaking contenteditable targets and core/image width/height validation failures."


= 2.6.0 - 04/03/26 =
* ADDED: New `imagewize/expect-list` block — dark "What to Expect" section with vertical icon-dot + title + description list.
* ADDED: New `imagewize/icon-grid` block — responsive auto-fit grid for SEO audit / feature checklists with icon+text cards.
* ADDED: New `imagewize/service-blocks` block — stacked numbered service detail cards with checklist support.
* ADDED: `imagewize/theme-icon` block binding source — resolves Vite asset URLs at render time, preventing icon 404s after rebuilds.
* ADDED: `window.imagewizeIcons` editor injection so block icons display correctly immediately after insertion.
* ADDED: 8 new SVG icons (bar-chart, chat, code, copy, link, list, map, x-circle) in brand blue for use with icon-grid and other blocks.
* CHANGED: feature-cards block migrated from direct Vite SVG imports to `imagewize/theme-icon` block bindings — fixes icons breaking on every production build.
* TECHNICAL: HeroBlock and Navigation PHP blocks upgraded to apiVersion 3.
* TECHNICAL: Removed redundant `editorScript: file:./index.js` from case-studies, elayne-hero, and feature-cards block.json files."


= 2.5.1 - 03/28/26 =
* TECHNICAL: Updated esbuild 0.27.3→0.27.4 across all platform packages.
* TECHNICAL: Updated rollup 4.59.0→4.60.0 across all platform packages.
* TECHNICAL: Updated tailwindcss and @tailwindcss/* packages 4.2.1→4.2.2; lightningcss 1.31.1→1.32.0.
* TECHNICAL: @tailwindcss/vite now supports Vite 8 peer dependency.
* TECHNICAL: Updated @wordpress/element, @wordpress/escape-html, @wordpress/primitives, @wordpress/dependency-extraction-webpack-plugin to 6.42.0/3.42.0/4.42.0/6.42.0.
* TECHNICAL: Updated @babel/runtime 7.28.6→7.29.2; @roots/vite-plugin 1.2.3→1.3.1; @types/node 25.3.3→25.5.0; baseline-browser-mapping 2.10.0→2.10.11."


= 2.5.0 - 03/23/26 =
* ADDED: Feature Cards Block (imagewize/feature-cards) - Six feature highlight cards with SVG icons, hover effects, and section header. Full-width InnerBlocks approach.
* CHANGED: sage-native-block package requirement bumped from ^2.0.0 to ^2.1.0.

= 2.4.0 - 03/22/26 =
* ADDED: Elayne Hero Block (imagewize/elayne-hero) - Full-width hero section with gradient background, dual CTA buttons, and three-column metrics row.
* ADDED: No-Header Page Template (template-no-header.blade.php) for standalone landing pages.
* ADDED: Elayne SVG icon assets under resources/images/icons/elayne/.
* CHANGED: Navigation padding reduced from py-6 to py-1 for compact header.
* CHANGED: Page Heading Blue block margin now controlled via block.json default style attribute.
* FIXED: Elayne Hero inner padding and metrics count updated to 100+.

= 2.3.5 - 03/08/26 =
* FIXED: Code/Pre block styling for bare <pre> tags matching WordPress block styles.
* FIXED: Quote block and pullquote block styling added.

= 2.3.4 - 03/04/26 =
* ADDED: Mistral Vibe AI integration config and prompts - `.vibe/config.toml` and `.vibe/prompts/claude.md`.

= 2.3.3 - 03/03/26 =
* ADDED: Mistral Vibe AI integration - `.vibe/config.toml` and `.vibe/prompts/claude.md` with project-specific agent instructions.

= 2.3.2 - 03/03/26 =
* ADDED: Mistral Vibe AI integration - `.vibe/prompt.md` with project-specific agent instructions.

= 2.3.1 - 03/01/26 =
* FIXED: Search overlay close button moved outside `.search-overlay-inner` to sit directly inside `.search-overlay`, so it is visible and positioned above the inner content area.
* FIXED: Search overlay close button `top` offset adjusted from -2.5rem to 3rem so it renders within the visible overlay area.

= 2.3.0 - 03/01/26 =
* ADDED: Search overlay functionality with close button.
