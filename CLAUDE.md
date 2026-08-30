# CLAUDE.md - Nynaeve Theme

This file provides guidance to Claude Code when working with the Nynaeve theme.

## Table of Contents

1. [Development Commands](#development-commands)
2. [Block Development Philosophy](#block-development-philosophy)
3. [Creating Blocks](#creating-blocks)
4. [SVG Icons in Block Templates](#svg-icons-in-block-templates-block-bindings-pattern)
5. [Block Standards](#block-standards)
6. [Acorn Commands (Trellis VM)](#acorn-commands-trellis-vm)
7. [Architecture](#architecture)
8. [Code Standards](#code-standards)
9. [Common Tasks](#common-tasks)
10. [Git & Release Workflow](#git--release-workflow) — branch per change, atomic commits

---

## Efficiency
- Avoid reading entire files when only a specific section is needed
- Use `Grep` to locate relevant code before reading
- Prefer targeted reads with `offset` and `limit` parameters over full file reads

## Development Commands

This repo (`~/code/nynaeve`) is the theme root and the source of truth —
`imagewize.com/site/web/app/themes/nynaeve/` is a git-ignored, Composer-managed
snapshot (`imagewize/nynaeve` from Packagist), disposable on every
`composer update`. Edit here, never there. See [Git & Release
Workflow](#git--release-workflow) for how a change gets from here into that
site.

```bash
npm run build      # Build for production
composer install && npm install
composer pint      # PHP code quality (Laravel Pint)
```

**No live HMR against `imagewize.test` from here** — `npm run dev` writes its
`hot` file into this checkout, not the Composer-managed copy WordPress
actually serves. Ship a change by branching, releasing, and letting
`imagewize.com/site` pull it via Composer — see [Git & Release
Workflow](#git--release-workflow).
**WP-CLI:** Run all `wp` / `wp acorn` commands inside the `imagewize.com`
Trellis VM (local DB conflicts with VM) — `cd ~/code/imagewize.com/trellis && trellis vm shell`.

## Block Development Philosophy

**PREFERRED APPROACH**: Build blocks using **InnerBlocks** with native WordPress blocks whenever possible.

**Key Principles:**
- **Maximum User Control**: Users select styles, fonts, colors via block toolbar/inspector
- **Avoid Hardcoded Classes**: Never hardcode styling classes (e.g., `is-style-*`, `has-*-font-size`)
- **Native WordPress Blocks**: Use core blocks (Button, Heading, Paragraph, Image) within custom containers
- **Minimal Inspector Controls**: Only add custom controls when absolutely necessary

### When to Use Each Approach

**1. InnerBlocks (MOST PREFERRED)** — content blocks, full typography control, user-selectable styles
**2. Sage Native Blocks with Custom Controls** — dynamic JS interactivity, complex data structures
**3. ACF Composer Blocks** — repeater fields, server-side rendering, rigid brand control

### InnerBlocks Best Practices

**Always use real, publishable content** in block templates — never `placeholder: 'Text goes here...'` (placeholder text only shows in the editor, not on the frontend).

**Example:**
```jsx
const TEMPLATE = [
  ['core/heading', { level: 3, content: 'Professional WordPress Development' }],
  ['core/paragraph', { content: 'Transform your website with modern development practices.' }],
  ['core/buttons', { className: 'card__buttons', layout: { type: 'flex' } }, [
    ['core/button', { text: 'Get Started' }],
    ['core/button', { text: 'Learn More' }],
  ]],
];
```

### Flex + Pseudo-element on contenteditable Elements (CRITICAL)

**Never apply `display: flex/inline-flex` with `::before`/`::after` pseudo-elements to elements WordPress uses as `contenteditable` RichText targets.**

`style.css` loads in both the frontend and the editor. Pseudo-elements on flex containers break cursor placement and make blocks impossible to click-to-edit.

**contenteditable targets (do NOT apply flex + pseudo-elements via style.css):**
- `core/paragraph` → `<p>`
- `core/heading` → `<h1>`–`<h6>`
- `core/button` → `.wp-block-button__link`
- `core/list` → `<li>`

**Fix: override in `editor.css`:**
```css
.my-block .my-styled-paragraph { display: block !important; }
.my-block .my-styled-paragraph::before { display: none !important; }
.my-block .wp-block-button__link { display: block !important; }
.my-block .wp-block-button__link::after { display: none !important; }
```

**Affected blocks (fixed):** `related-links`, `service-hero`, `trust-bar`.

---

### Button Styling (CRITICAL)

WordPress **does not reliably apply className to button links** in InnerBlocks templates. Apply className to the **parent `core/buttons` container**.

```jsx
// ❌ WRONG
['core/button', { text: 'Click Me', className: 'my-button' }]

// ✅ CORRECT
['core/buttons', { className: 'my-buttons-container', layout: { type: 'flex' } }, [
  ['core/button', { text: 'Click Me' }],
]]
```

### Block Padding (CRITICAL)

**Blocks must NOT add horizontal padding.** The WordPress layout system handles it automatically via `theme.json` root padding + `app.css` rules.

```css
/* ✅ CORRECT */
.wp-block-imagewize-my-block { padding: 5rem 0; }

/* ❌ WRONG — creates double padding */
.wp-block-imagewize-my-block { padding: 5rem 1.25rem; }
```

**Why:** `theme.json` (`contentSize: 55rem`, `wideSize: 64rem`, `useRootPaddingAwareAlignments: true`) plus one zero-specificity rule in `app.css` already pads everything unaligned — so editor-set padding still wins:
```css
:where(.is-layout-constrained) > :not(.alignfull):not(.alignwide) {
  padding-left: var(--wp--preset--spacing--50);
  padding-right: var(--wp--preset--spacing--50);
}
```

Two consequences:
- **Block nests a `core/group`?** Its `.wp-block-group__inner-container` gets core padding too → double padding. Add it to the reset list in `app.css` (currently `imagewize-about`, `imagewize-pricing`).
- **Full-width background?** Pad the *inner* wrapper (e.g. `.page-heading-blue__content`), never the outer block — background goes edge-to-edge, content stays inset.

### `.wp-block-paragraph` Does Not Exist on the Frontend (CRITICAL)

WordPress does **not** add the `.wp-block-paragraph` class to `<p>` elements rendered by InnerBlocks on the frontend. The class only exists in the editor. On the frontend, paragraphs render as plain `<p>` with no class (unless a custom `className` was set in the template).

**Always target `p` in block `style.css`, never `.wp-block-paragraph`:**

```css
/* ✅ CORRECT — works on both frontend and editor */
.wp-block-imagewize-my-block p {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
}

/* ❌ WRONG — matches in editor only, invisible on frontend */
.wp-block-imagewize-my-block .wp-block-paragraph {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
}
```

**Alternative:** assign a custom `className` in the InnerBlocks template and target that (e.g. `.service-hero__lead`). Existing blocks like `service-hero` and `trust-bar` use this approach.

**Affected blocks with dead `.wp-block-paragraph` selectors in `style.css`:** `content-image-text-card`, `review-profiles`, `service-hero`, `trust-bar`. These blocks work because they also have custom className selectors, but the `.wp-block-paragraph` rules are dead code on the frontend.

## Creating Blocks

### Sage Native Blocks

**All WP-CLI commands must be run from Trellis VM:**

```bash
cd trellis
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:create
```

**Template categories:** Basic Block, Generic (innerblocks, two-column, statistics, cta), Nynaeve Templates, Custom (from `block-templates/`)

**Files created in `resources/js/blocks/my-block-name/`:**
`block.json`, `index.js`, `editor.jsx`, `save.jsx`, `style.css`, `editor.css`, `view.js`

**Blocks auto-register via ThemeServiceProvider** — immediately available in the editor.

### ACF Composer Blocks

```bash
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn acf:block MyBlock
# Creates: app/Blocks/MyBlock.php + resources/views/blocks/my-block.blade.php
```

Define fields in the controller's `fields()`; give every field a **default value** so the block renders real content the moment it's inserted (an empty ACF block looks broken in the inserter preview). Run `wp acorn acf:clear` after changing field definitions.

## SVG Icons in Block Templates (Block Bindings Pattern)

**NEVER import SVGs via Vite for use as `url` in `core/image` InnerBlocks templates.** Vite content-hashes filenames — the stored URL becomes a 404 on next build.

**Solution: `imagewize/theme-icon` block binding + `window.imagewizeIcons`.**

1. `app/setup.php` registers `imagewize/theme-icon` binding source — PHP callback calls `Vite::asset()` at render time (always returns the current URL).
2. `app/setup.php` injects `window.imagewizeIcons` (key → current Vite URL) for editor display.
3. `editor.jsx` uses `window.imagewizeIcons[path]` for `url` + adds `metadata.bindings.url` for frontend.

**REQUIRED — `vite.config.js` must build the icons (CRITICAL):**
For `Vite::asset('resources/images/icons/*.svg')` to resolve, the icons must be
in the build manifest. They are not imported from any JS/CSS, so the `laravel()`
plugin needs the `assets` option:
```js
laravel({
  input: [ /* ... */ ],
  assets: ['resources/images/**'],   // emits icons into the manifest
  refresh: true,
}),
```
This is the supported mechanism for `laravel-vite-plugin` v3+ / Vite 8 (it replaced
the old `import.meta.glob` approach). Without it, `Vite::asset()` throws, the callback
returns `null`, `window.imagewizeIcons` values are empty strings, and every icon renders
broken in both the editor and the frontend.

### Adding a new SVG icon

**1. `app/setup.php` — add to both icon_maps:**
```php
'iconMyNew' => 'my-new-icon.svg',   // relative to resources/images/icons/
```

**2. `editor.jsx`:**
```js
const icons = window.imagewizeIcons ?? {};

['core/image', {
  url: icons['my-new-icon.svg'] ?? '',
  alt: 'My icon',
  sizeSlug: 'full',
  linkDestination: 'none',
  metadata: {
    bindings: { url: { source: 'imagewize/theme-icon', args: { path: 'my-new-icon.svg' } } },
  },
}]
```

**Do NOT:**
- ❌ `import myIcon from '...svg'` — goes through Vite hashing
- ❌ Add `assetFileNames` override to `vite.config.js`
- ❌ Set `width` or `height` attributes on `core/image` blocks — causes block validation failures (see below)

**Block validation failure: `width`/`height` on `core/image` (CRITICAL):**
Older WordPress emitted `style="width:Xpx;height:Xpx"` from `width`/`height` attributes on `core/image`. Newer WP does not. If a block was inserted with those attributes, the stored HTML has the inline style but the save function now outputs clean HTML — mismatch → validation error.
**Fix:** Remove `width`/`height` from `core/image` attributes in `editor.jsx`. Size via CSS (`.my-block .wp-block-image img { width: 16px; height: 16px; }`). Then delete and re-insert the affected block to clear stale stored HTML.

**After re-inserting existing blocks:** blocks saved before the binding pattern was introduced hold old hashed URLs — delete and re-insert once. Future rebuilds won't break them.

**Migrated blocks:** `imagewize/icon-grid` (8 icons), `imagewize/feature-cards` (6 icons), `imagewize/trust-bar` (4 icons).

---

## Block Standards

**block.json checklist — three different prefixes, don't mix them up:**
- `"name": "imagewize/my-block"` — the block **namespace** is `imagewize` (brand-level; **all 36 blocks use it — there is no `nynaeve/` block namespace**). Writing `wp:nynaeve/x` in content is always a bug: the block is `wp:imagewize/x`, and the editor renders the `nynaeve/` version as an unsupported-block placeholder
- `"category": "nynaeve/*"` — the **category** prefix is `nynaeve`, registered in `app/setup.php` via `block_categories_all`. Slugs: `nynaeve/hero`, `nynaeve/features`, `nynaeve/cta`, `nynaeve/testimonials`, `nynaeve/pricing`, `nynaeve/content`, `nynaeve/media`, `nynaeve/portfolio`. An unregistered slug (e.g. `imagewize/content`) silently drops the block into the editor's generic category
- `"textdomain": "nynaeve"` — the theme's Text Domain from `style.css`, NOT "sage" or "imagewize"
- `"version": "x.y.z"` — **bump this whenever the block's `style.css` or `editor.css` changes (CRITICAL).** WordPress uses it as the `?ver=` on the block's stylesheet URL, and Trellis serves static assets with `cache-control: max-age=31536000` (1 year). Change the CSS without bumping the version and the URL stays identical, so returning visitors keep the old stylesheet for up to a year. This bit us in 3.0.0: the namespace rename rewrote every selector in `contact-section/style.css` while `version` stayed `1.0.0`, and cached browsers rendered the block unstyled. New blocks are unaffected (nobody has a cached copy); only blocks that have already shipped need the bump
- `"example": {}` — enables inserter hover preview
- `"align": "wide"` default — centers at contentSize (880px), user can change
- `"color": { "background": true, "text": true }` for section-level blocks

**Margin Reset for Full-Width Blocks (CRITICAL):**
WP injects `margin-block-start: 24px` on all constrained layout children. For `alignfull` blocks this creates a visible gap. Fix via `block.json` default — NOT a CSS override:

```json
"attributes": {
  "align": { "type": "string", "default": "full" },
  "style": {
    "type": "object",
    "default": { "spacing": { "margin": { "top": "0", "bottom": "0" } } }
  }
}
```

This renders as `style="margin-top:0;margin-bottom:0"` inline — users can still override via WP spacing controls. Applies only to newly inserted blocks; existing blocks must be updated manually.

**Example block.json:**
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "imagewize/my-block",
  "title": "My Block",
  "category": "nynaeve/content",
  "icon": "grid-view",
  "description": "Block description",
  "keywords": ["keyword1"],
  "example": {},
  "textdomain": "nynaeve",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css",
  "supports": {
    "align": ["wide", "full"],
    "anchor": true,
    "spacing": { "margin": true, "padding": true },
    "color": { "background": true, "text": true }
  },
  "attributes": {
    "align": { "type": "string", "default": "wide" }
  }
}
```

## Acorn Commands (Trellis VM)

**All `wp acorn` commands require database access — must run from Trellis VM.**

```bash
cd trellis && trellis vm shell
# Starts at /srv/www/demo.imagewize.com/current
cd /srv/www/imagewize.com/current/web/app/themes/nynaeve

wp acorn sage-native-block:create   # New Sage Native block
wp acorn acf:block MyBlock          # New ACF block
wp acorn acf:field MyFieldGroup     # New ACF field group
wp acorn acf:clear                  # Clear ACF Composer cache
wp acorn acf:cache                  # Cache ACF Composer fields
```

## Architecture

**Block Registration:** Auto via `app/Providers/ThemeServiceProvider.php`
**Static Assets:** Reference via `Vite::asset('resources/images/example.svg')`

## Code Standards

**CSS colors** (`tailwind.config.js`):
- `primary` #017cb6 · `primary-accent` #e6f4fb · `primary-dark` #026492
- `main` #171b23 · `main-accent` #465166
- `base` #ffffff · `secondary` #98999a · `tertiary` #f5f5f6
- `border-light` #ebeced · `border-dark` #cbcbcb

**Typography:** Open Sans, Menlo, Montserrat
**Button styles (filter):** Default, Outline, Secondary, Light, Dark — in `resources/js/filters/`

## Common Tasks

### Available Custom Blocks

- `imagewize/about` — About section with image and content
- `imagewize/carousel` — Image carousel
- `imagewize/case-studies` — Portfolio grid with featured highlight
- `imagewize/contact-section` — Dark contact section with Contact Form 7 form card
- `imagewize/content-image-text-card` — Card with image, heading, text, buttons
- `imagewize/cta` — Blog-post CTA with eight inserter variations (WordPress development, WooCommerce, WooCommerce DE, SEO, performance, Trellis hosting, Sage agency, FSE). Supersedes the seven `cta-*` blocks below
- `imagewize/cta-block-blue` — Blue CTA section with centered content and button
- `imagewize/cta-columns` — CTA columns layout
- `imagewize/cta-fse-block-theme` — Blog-post CTA: FSE / block theme development *(superseded by `imagewize/cta`)*
- `imagewize/cta-performance-partnership` — Blog-post CTA: performance partnership, for speed optimization posts *(superseded by `imagewize/cta`)*
- `imagewize/cta-sage-agency` — Blog-post CTA: Sage and agency development partnership *(superseded by `imagewize/cta`)*
- `imagewize/cta-seo-service` — Blog-post CTA: SEO service *(superseded by `imagewize/cta`)*
- `imagewize/cta-trellis-hosting` — Blog-post CTA: Trellis managed WordPress hosting *(superseded by `imagewize/cta`)*
- `imagewize/cta-woocommerce` — Blog-post CTA: WooCommerce development *(superseded by `imagewize/cta`)*
- `imagewize/cta-wordpress-development` — Blog-post CTA: general WordPress development *(superseded by `imagewize/cta`)*
- `imagewize/elayne-hero` — Hero section with gradient background and metrics row
- `imagewize/expect-list` — Dark vertical list for "What to Expect" sections
- `imagewize/faq` — FAQ section
- `imagewize/feature-cards` — Six feature cards with SVG icons and hover effects
- `imagewize/feature-list-grid` — Feature grid with checkmark lists
- `imagewize/icon-grid` — Auto-fit icon grid with eyebrow, title, and icon+text cards
- `imagewize/multi-column-content` — Statistics and CTA
- `imagewize/page-heading-blue` — Full-width gradient banner
- `imagewize/pricing` — Two-column pricing (white vs dark)
- `imagewize/pricing-tiers` — Three-column pricing with featured tier
- `imagewize/quick-summary` — Blog-post summary callout, tertiary background with a green left border
- `imagewize/related-articles` — Related articles with tag filtering
- `imagewize/related-links` — Linked pill grid for related services sections
- `imagewize/review-profiles` — Customer review profiles grid
- `imagewize/service-blocks` — Stacked service cards with numbered heading and checklist
- `imagewize/service-hero` — Dark hero for service pages with dual CTA buttons
- `imagewize/service-intro` — Introductory text section for service pages
- `imagewize/slide` — Individual carousel slide
- `imagewize/testimonial-grid` — Testimonials in 3-column grid
- `imagewize/trust-bar` — Trust signal bar with 4 icon+text items
- `imagewize/two-column-card` — Professional card grid

### Adding New Custom Block

1. Run `wp acorn sage-native-block:create` in Trellis VM
2. Develop in `resources/js/blocks/my-block/` — InnerBlocks, real content, no hardcoded style classes
3. Block auto-registers; test in editor

### Page Template Layout Convention

```php
{{-- content-page.blade.php --}}
<div class="wp-block-post-content alignfull is-layout-constrained">
  @php(the_content())
</div>
```

`theme.json` handles all layout: regular blocks center at 55rem, `.alignwide` at 64rem, `.alignfull` full-width. Never wrap `the_content()` in Tailwind containers.

### WooCommerce Customization

Quote-based (no cart/checkout). Custom templates in `resources/views/woocommerce/`.

**Product content — do NOT add color classes (CRITICAL):**
```jsx
// ❌ WRONG
{ textColor: "primary-accent" }   // → has-primary-accent-color class

// ✅ CORRECT — let CSS control colors, use only typography/spacing attributes
{ fontFamily: "montserrat", fontSize: "xl" }
```

`app.css` controls all product page colors. Hardcoded color classes override CSS and break the design system.

---

## Git & Release Workflow

### Repo Relationship (CRITICAL)

This repo is a standalone Composer package (`imagewize/nynaeve` on
Packagist), the same model as Elayne/Aviendha/Aludra. `imagewize.com/site`
consumes it as a pinned dependency — `site/web/app/themes/nynaeve/` there is
git-ignored and gets overwritten by every `composer update`; it is never the
place to edit. The full loop, start to finish:

```bash
# here, in ~/code/nynaeve
git checkout main && git pull
git checkout -b fix/service-hero-mobile-padding
# ... edit, commit(s), push, PR, merge to main ...
# bump version + tag (see below), then:
git push origin vX.Y.Z
# Packagist mirrors the new tag within about a minute

# in ~/code/imagewize.com/site
composer update imagewize/nynaeve
# commit the composer.lock bump there, then deploy (trellis deploy production imagewize.com)
```

No rsync/mirror script and no manual copying — Composer is the only bridge
between this repo and the site that consumes it.

### Branch Per Change (CRITICAL)

**Never commit theme work directly to `main`.** Every update — feature, fix, docs, dependency bump — starts on its own branch off `main`, and lands via PR.

```bash
git checkout main && git pull
git checkout -b fix/service-hero-mobile-padding
```

`release-theme.sh` diffs the current branch against `main` to generate the changelog, so work committed straight to `main` produces an empty release changelog.

### Version Bumps Touch Four Places (CRITICAL)

A release is **not** one version string, it is four, and they must all move together:

| file | what changes |
|---|---|
| `style.css` | `Version:` header — the value WordPress reads; the source of truth `release-theme.sh` diffs against |
| `readme.txt` | `Stable tag:` header |
| `readme.txt` | a new `= X.Y.Z - MM/DD/YY =` block at the **top** of `== Changelog ==`, concise WordPress.org style, one line per change prefixed `FEATURE:` / `FIXED:` / `SECURITY:` / `TECHNICAL:` / `DOCUMENTATION:` / `BREAKING:` |
| `CHANGELOG.md` | a new `## [X.Y.Z] - YYYY-MM-DD` section at the **top**, detailed Keep-a-Changelog style, grouped under `### Added` / `### Fixed` / `### Technical` / `### BREAKING`, naming the files touched |

Note the two changelogs use **different date formats** (`MM/DD/YY` vs `YYYY-MM-DD`) and different levels of detail. `readme.txt` is the reader-facing summary; `CHANGELOG.md` is the engineering record.

**`wp-ops/scripts/release/release-theme.sh` no longer applies here.** It
resolves the theme at `site/web/app/themes/$THEME_NAME` or
`demo/web/app/themes/$THEME_NAME` *relative to `~/code/imagewize.com`*, and
diffs that path's git history against `main` — a layout left over from when
Nynaeve was git-tracked inside that monorepo. Now that path is a git-ignored
Composer snapshot with no history of its own, so the script would generate an
empty changelog. Bump the four places by hand, here in `~/code/nynaeve`.

**Verify parity before committing:**

```bash
diff <(grep -o '^## \[[0-9.]*\]' CHANGELOG.md | tr -d '#[] ' | sort -V) \
     <(grep -o '^= [0-9.]* '      readme.txt   | tr -d '= '     | sort -V)
```

This drift is not hypothetical: `readme.txt`'s `Stable tag` sat at `2.15.8` through the entire 3.0.x line, and its changelog was missing 2.15.9, 2.15.10, 3.0.0, 3.0.1 and 3.0.2 — all bumped by hand without the script. Everything from 2.3.0 forward is now in sync; entries before 2.3.0 exist only in `CHANGELOG.md` and are deliberately not back-filled.

**Block stylesheet versions are separate.** Bumping the theme version does *not* refresh a block's cached CSS — see [Block Standards](#block-standards) for the `block.json` `version` rule.

### Atomic Commits (CRITICAL)

Stage files individually or in small logical groups and commit each with its own specific message. **Never stage unrelated files together** — e.g. commit documentation separately from block code, and a dependency bump separately from the fix that motivated it.

```bash
# ❌ WRONG — one commit mixing block code, docs, and a version bump
git add -A && git commit -m "Updates"

# ✅ CORRECT — one logical change per commit
git add resources/js/blocks/service-hero/style.css
git commit -m "Service Hero Mobile Padding Fix"

git add CLAUDE.md AGENTS.md
git commit -m "Nynaeve Documentation Update"
```

**Commit messages:** short Title-Case (e.g. `Nynaeve Documentation Update`, `Hero Pattern Grid Fix`), scoped narrowly.

**No AI attribution** in any commit — no `🤖 Generated with Claude Code`, no `Co-Authored-By: Claude` footers. Keep history attribution-free.

### Branch Names Must Never Match a Release Tag (CRITICAL)

Releases are tagged `vX.Y.Z` (e.g. `v2.15.7`). **Never name a branch after the version it releases** — Git then has a branch and a tag with the identical name, and every ambiguous ref (`git checkout v2.15.7`, `git log v2.15.7`, `git push origin v2.15.7`) resolves unpredictably and prints `warning: refname 'v2.15.7' is ambiguous`.

```bash
# ❌ WRONG — collides with the v2.15.7 tag created at release time
git checkout -b v2.15.7

# ✅ CORRECT — use a release/ prefix (or a descriptive name)
git checkout -b release/2.15.7
git checkout -b npm-security-updates
```

Older branches (`v2.15.2`, `v2.15.3`, `v2.15.5`, `v2.15.6`) predate this rule and already collide with their tags. Do not follow them as a pattern.
