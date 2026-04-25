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

---

## Efficiency
- Avoid reading entire files when only a specific section is needed
- Use `Grep` to locate relevant code before reading
- Prefer targeted reads with `offset` and `limit` parameters over full file reads

## Development Commands

```bash
cd site/web/app/themes/nynaeve
npm run dev        # Start dev server with HMR
npm run build      # Build for production
composer install && npm install
composer pint      # PHP code quality (Laravel Pint)
```

**HMR:** Use `http://imagewize.test/` (not HTTPS) — HTTPS breaks WebSocket to Vite.
**WP-CLI:** Run all `wp` / `wp acorn` commands inside Trellis VM (local DB conflicts with VM).

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
**3. ACF Composer Blocks** — repeater fields, server-side rendering, rigid brand control. See [docs/ACF-BLOCKS.md](docs/ACF-BLOCKS.md)

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

See [docs/CONTENT-WIDTH-AND-LAYOUT.md](docs/CONTENT-WIDTH-AND-LAYOUT.md) for full details.

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

See [docs/ACF-BLOCKS.md](docs/ACF-BLOCKS.md).

## SVG Icons in Block Templates (Block Bindings Pattern)

**NEVER import SVGs via Vite for use as `url` in `core/image` InnerBlocks templates.** Vite content-hashes filenames — the stored URL becomes a 404 on next build.

**Solution: `imagewize/theme-icon` block binding + `window.imagewizeIcons`.**

1. `app/setup.php` registers `imagewize/theme-icon` binding source — PHP callback calls `Vite::asset()` at render time (always returns the current URL).
2. `app/setup.php` injects `window.imagewizeIcons` (key → current Vite URL) for editor display.
3. `editor.jsx` uses `window.imagewizeIcons[path]` for `url` + adds `metadata.bindings.url` for frontend.

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

**block.json checklist:**
- `"category": "imagewize/*"` (semantic subcategories: hero, features, cta, testimonials, pricing, content, media, portfolio)
- `"textdomain": "nynaeve"` (the theme's Text Domain — NOT "sage" or "imagewize")
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
  "category": "imagewize/content",
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

### Directory Structure
```
nynaeve/
├── app/
│   ├── Blocks/            # ACF Composer blocks (PHP/Blade)
│   ├── Providers/         # Service providers
│   └── View/Composers/    # Blade view composers
├── resources/
│   ├── css/               # Tailwind CSS styles
│   ├── js/blocks/         # Sage Native blocks (React/JavaScript)
│   └── views/             # Blade templates
└── public/build/          # Built assets (auto-generated)
```

**Entry Points:** `resources/css/app.css`, `resources/js/app.js`, `resources/css/editor.css`, `resources/js/editor.js`
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
- `imagewize/cta-block-blue` — Blue CTA section with centered content and button
- `imagewize/cta-columns` — CTA columns layout
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

See [docs/BLOCKS.md](docs/BLOCKS.md).

### Adding New Custom Block

1. Run `wp acorn sage-native-block:create` in Trellis VM
2. Develop in `resources/js/blocks/my-block/` — InnerBlocks, real content, no hardcoded style classes
3. Block auto-registers; test in editor

See [docs/PATTERN-TO-NATIVE-BLOCK.md](docs/PATTERN-TO-NATIVE-BLOCK.md).

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
