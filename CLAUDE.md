# CLAUDE.md - Nynaeve Theme

This file provides guidance to Claude Code when working with the Nynaeve theme.

## Table of Contents

1. [Theme Overview](#theme-overview)
2. [Development Commands](#development-commands)
3. [Block Development Philosophy](#block-development-philosophy)
4. [Creating Blocks](#creating-blocks)
5. [Block Standards](#block-standards)
6. [Acorn Commands (Trellis VM)](#acorn-commands-trellis-vm)
7. [Architecture](#architecture)
8. [Code Standards](#code-standards)
9. [Common Tasks](#common-tasks)

---

## Theme Overview

Nynaeve is a modern WordPress theme built on Sage 11 framework with:
- **Laravel Blade** templating system
- **Tailwind CSS 4** for styling with custom design system
- **Vite** for fast development and HMR (Hot Module Replacement)
- **Acorn** (Laravel for WordPress) for advanced PHP features
- **WooCommerce** integration with custom quote-based system
- **Custom blocks** using InnerBlocks approach (WordPress native blocks)

## Development Commands

```bash
# Navigate to theme directory
cd site/web/app/themes/nynaeve

# Start development server with HMR
npm run dev

# Build for production
npm run build

# Install dependencies
composer install && npm install

# Check PHP code quality (Laravel Pint)
composer pint
```

**Important - HMR with Trellis VM:**
- Access site via HTTP: `http://imagewize.test/` (not HTTPS)
- HTTPS connections fail WebSocket connection to Vite dev server
- Local development limitation only - production uses built assets

**Important - Local Database Conflicts:**
- Local MariaDB/MySQL on port 3306 conflicts with Trellis VM
- Run all `wp` and `wp acorn` commands from inside Trellis VM
- See [Acorn Commands section](#acorn-commands-trellis-vm) below

## Block Development Philosophy

**PREFERRED APPROACH**: Build blocks using **InnerBlocks** with native WordPress blocks whenever possible.

**Key Principles:**
- **Maximum User Control**: Users select styles, fonts, colors via block toolbar/inspector
- **Avoid Hardcoded Classes**: Never hardcode styling classes in templates (e.g., `is-style-*`, `has-*-font-size`)
- **Native WordPress Blocks**: Use core blocks (Button, Heading, Paragraph, Image) within custom containers
- **Block Toolbar First**: Users access all styling options via WordPress native controls
- **Minimal Inspector Controls**: Only add custom controls when absolutely necessary

### When to Use Each Approach

**1. InnerBlocks (MOST PREFERRED)**
- Content-focused blocks with images, headings, text, buttons
- Blocks where users need full typography control
- Blocks where button styles should be user-selectable
- Clean sidebar without custom inspector controls

**2. Sage Native Blocks with Custom Controls (Use Sparingly)**
- Need dynamic frontend JavaScript interactivity
- Complex data structures that don't map to core blocks
- Custom UI requirements that native blocks can't provide

**3. ACF Composer Blocks (Special Cases Only)**
- Need complex custom field types (repeaters, relationships, post queries)
- Server-side rendering is critical for performance
- Editing must be rigid/controlled (strict brand guidelines)
- Need CSS flexbox/grid reordering without changing DOM order
- Prefer PHP/Blade templating over React
- **See:** [docs/ACF-BLOCKS.md](docs/ACF-BLOCKS.md)

### InnerBlocks Best Practices

**Real Content vs Placeholders:**
- ✅ **Always use real, publishable content** in block templates (not placeholder text!)
- ✅ Use actual text like "Professional Solutions" instead of "Heading goes here..."
- ✅ Block should render properly on frontend immediately after insertion
- ❌ **Never use** `placeholder: 'Text goes here...'` - this only shows in editor, not frontend

**Why real content matters:**
1. Frontend testing works immediately
2. Users see working examples before customizing
3. Faster development workflow
4. Catches rendering issues during development

**Example InnerBlocks structure:**
```jsx
// editor.jsx
const TEMPLATE = [
  ['core/image', { className: 'card__image' }],
  ['core/heading', {
    level: 3,
    content: 'Professional WordPress Development'  // Real content!
  }],
  ['core/paragraph', {
    content: 'Transform your website with modern development practices.'
  }],
  ['core/buttons', { className: 'card__buttons', layout: { type: 'flex' } }, [
    ['core/button', { text: 'Get Started' }],
    ['core/button', { text: 'Learn More' }],
  ]],
];
```

**CSS - Style containers only:**
```css
/* Style the container and layout */
.card__buttons {
  display: flex;
  gap: 1rem;
}

/* Let users control button styles via WordPress button filter */
/* Available styles: Default, Outline, Secondary, Light, Dark */
```

### Button Styling (CRITICAL)

WordPress **does not reliably apply className to button links** in InnerBlocks templates. Apply className to the **parent `core/buttons` container** and use CSS child selectors.

❌ **WRONG** (className on individual button):
```jsx
['core/buttons', { layout: { type: 'flex' } }, [
  ['core/button', {
    text: 'Click Me',
    className: 'my-button'  // ❌ Won't reliably apply!
  }]
]]
```

✅ **CORRECT** (className on buttons container):
```jsx
['core/buttons', {
  className: 'my-buttons-container',  // ✅ Apply to container
  layout: { type: 'flex' }
}, [
  ['core/button', { text: 'Click Me' }],
  ['core/button', { text: 'Learn More' }]
]]
```

**CSS - Target buttons via container:**
```css
.my-block .my-buttons-container .wp-block-button .wp-block-button__link {
  background-color: black;
}

.my-block .my-buttons-container .wp-block-button:first-child .wp-block-button__link {
  background-color: blue;
}
```

### Block Padding (CRITICAL)

**Blocks should NOT add horizontal edge padding.** The WordPress layout system handles all horizontal spacing automatically.

**Golden Rule:**
```css
/* ✅ CORRECT - Vertical padding only */
.wp-block-imagewize-my-block {
  padding: 5rem 0;
}

/* ❌ WRONG - Creates double padding */
.wp-block-imagewize-my-block {
  padding: 5rem 1.25rem;
}
```

**Why:**
- `theme.json` sets root padding via `styles.spacing.padding`
- `app.css` adds padding via two complementary rules:
  - `:where(.is-layout-constrained) > :not(.alignfull):not(.alignwide)` - for standalone blocks
  - `:where(.is-layout-constrained) > .alignfull > *` - for content inside full-width blocks
- Adding block-level padding creates double/triple padding issues

**The System Works Automatically:**
- Standalone blocks (paragraphs, headings) get padding from first rule
- Custom inner wrappers in `.alignfull` blocks get padding from second rule
- WordPress core blocks (columns, groups) override with their own padding
- No block-specific CSS needed - theme handles everything

**See:** [docs/CONTENT-WIDTH-AND-LAYOUT.md](docs/CONTENT-WIDTH-AND-LAYOUT.md) for comprehensive guidelines.

## Creating Blocks

### Sage Native Blocks (InnerBlocks Approach)

**All WP-CLI commands must be run from Trellis VM:**

```bash
# Interactive mode (recommended)
cd trellis
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:create

# OR from interactive VM shell
trellis vm shell
cd /srv/www/imagewize.com/current/web/app/themes/nynaeve
wp acorn sage-native-block:create
```

**Template categories available:**
1. **Basic Block** - Simple default block
2. **Generic Templates** - Universal templates (innerblocks, two-column, statistics, cta)
3. **Nynaeve Templates** - Production-ready examples (nynaeve-innerblocks, nynaeve-two-column, etc.)
4. **Custom Templates** - Auto-detected from block-templates/ directory

**Files created in `resources/js/blocks/my-block-name/`:**
- `block.json` - Minimal attributes (usually just className)
- `index.js` - Block registration
- `editor.jsx` - Editor component with InnerBlocks
- `save.jsx` - Just `<InnerBlocks.Content />`
- `style.css` - Container/layout styles only
- `editor.css` - Editor-only styles
- `view.js` - Frontend JavaScript

**Blocks auto-register via ThemeServiceProvider** - immediately available in WordPress editor.

### ACF Composer Blocks

```bash
# Create new ACF Composer block (must run in Trellis VM)
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn acf:block MyBlock

# Files created:
# - app/Blocks/MyBlock.php (block class with field definitions)
# - resources/views/blocks/my-block.blade.php (Blade template)
```

**See:** [docs/ACF-BLOCKS.md](docs/ACF-BLOCKS.md) for detailed ACF Composer implementation guide.

## Block Standards

**block.json Configuration:**
- **Category**: Always use `"category": "imagewize"` (custom category registered in setup.php)
- **Textdomain**: Always use `"textdomain": "imagewize"` (NOT "sage")
- **Name**: Use `imagewize/block-name` format
- **Default Alignment**: Set `"align": "wide"` as default in attributes
  - Ensures blocks automatically center at `contentSize` (880px)
  - Users can change alignment via block toolbar (wide/full/none)
- **Color Support**: For InnerBlocks container blocks, use `"text": true` for flexibility
  - Allows users to override text colors from block toolbar
  - Provides accessibility options (contrast adjustments)
  - Background color should always be `true` for section-level blocks

**Example block.json:**
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "imagewize/my-block",
  "title": "My Block",
  "category": "imagewize",
  "icon": "grid-view",
  "description": "Block description",
  "keywords": ["keyword1", "keyword2"],
  "textdomain": "imagewize",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css",
  "supports": {
    "align": ["wide", "full"],
    "anchor": true,
    "spacing": {
      "margin": true,
      "padding": true
    },
    "color": {
      "background": true,
      "text": true
    }
  },
  "attributes": {
    "align": {
      "type": "string",
      "default": "wide"
    }
  }
}
```

## Acorn Commands (Trellis VM)

**All `wp acorn` commands require database access and must be run from Trellis VM.**

### Entering the Trellis VM

```bash
# Enter VM shell
cd trellis
trellis vm shell

# You start at: /srv/www/demo.imagewize.com/current
# Navigate to theme directory
cd /srv/www/imagewize.com/current/web/app/themes/nynaeve
```

### Common Commands

```bash
# Create new Sage Native block
wp acorn sage-native-block:create

# Create new ACF block
wp acorn acf:block MyBlock

# Create new ACF field group
wp acorn acf:field MyFieldGroup

# Clear ACF Composer cache
wp acorn acf:clear

# Cache ACF Composer fields
wp acorn acf:cache

# List all ACF commands
wp acorn list acf
```

**Path Structure:**
- Site root: `/srv/www/imagewize.com/current`
- Theme directory: `/srv/www/imagewize.com/current/web/app/themes/nynaeve`

**Why Trellis VM?**
- Database connection configured in VM environment
- WordPress installation accessible at `/srv/www/imagewize.com/current/`
- All Acorn commands require database access
- Local machine doesn't have correct database credentials
- If local database server running (MySQL, MariaDB, PostgreSQL), it conflicts with VM's database port

## Architecture

### Directory Structure
```
nynaeve/
├── app/                    # PHP application code
│   ├── Blocks/            # ACF Composer blocks (PHP/Blade)
│   ├── Providers/         # Service providers
│   └── View/Composers/    # Blade view composers
├── resources/
│   ├── css/               # Tailwind CSS styles
│   ├── js/
│   │   └── blocks/        # Sage Native blocks (React/JavaScript)
│   └── views/             # Blade templates
├── config/                # Configuration files
└── public/build/          # Built assets (auto-generated)
```

### Asset Pipeline
- **Entry Points**: `resources/css/app.css`, `resources/js/app.js`, `resources/css/editor.css`, `resources/js/editor.js`
- **Build Output**: `public/build/` directory
- **Development**: Vite dev server with HMR on `npm run dev`

### Static Assets
Store static assets in `resources/images/` and reference using Laravel's Vite facade:

```php
use Illuminate\Support\Facades\Vite;

$imageUrl = Vite::asset('resources/images/example.jpg');
```

```blade
<img src="{{ Vite::asset('resources/images/example.svg') }}" alt="Example">
```

### Block Registration

All blocks (Sage Native and ACF Composer) auto-register via `app/Providers/ThemeServiceProvider.php`.

Theme uses `imagewize/sage-native-block` package ([GitHub](https://github.com/imagewize/sage-native-block)) for Sage Native block development.

## Code Standards

### PHP
- **PSR-4 Autoloading**: `App\` namespace maps to `app/` directory
- **Laravel Conventions**: Service providers, composers, etc.
- **Code Quality**: Use Laravel Pint for formatting: `composer pint`

### CSS/Styling
- **Tailwind CSS 4** with custom design system
- **Theme Colors**: Semantic color palette in `tailwind.config.js`:
  - `primary` (#017cb6), `primary-accent` (#e6f4fb), `primary-dark` (#026492)
  - `main` (#171b23), `main-accent` (#465166)
  - `base` (#ffffff), `secondary` (#98999a), `tertiary` (#f5f5f6)
  - `border-light` (#ebeced), `border-dark` (#cbcbcb)
- **Typography**: Open Sans, Menlo, Montserrat fonts
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### JavaScript
- **ES6+ Modules**: Modern JavaScript with Vite
- **React**: For custom blocks in `resources/js/blocks/`
- **WordPress Components**: Use `@wordpress/components` for consistency
- **Block Filters**: Located in `resources/js/filters/`, auto-loaded via glob import
  - Button filter provides 5 style variants: Default, Outline, Secondary, Light, Dark

## Common Tasks

### Available Custom Blocks

The theme includes custom blocks (all using InnerBlocks approach):

- **`imagewize/about`** - About section with image and content
- **`imagewize/carousel`** - Image carousel with configurable slides
- **`imagewize/content-image-text-card`** - Content card with image, heading, text, buttons
- **`imagewize/cta-columns`** - Call-to-action columns layout
- **`imagewize/faq`** - FAQ section with questions and answers
- **`imagewize/feature-list-grid`** - Feature grid with checkmark lists
- **`imagewize/multi-column-content`** - Statistics and CTA section
- **`imagewize/page-heading-blue`** - Full-width gradient banner for page headings
- **`imagewize/pricing`** - Two-column pricing comparison (white vs dark)
- **`imagewize/pricing-tiers`** - Three-column pricing table with featured tier
- **`imagewize/related-articles`** - Related articles with tag filtering
- **`imagewize/review-profiles`** - Customer review profiles grid
- **`imagewize/slide`** - Individual slide for carousel block
- **`imagewize/testimonial-grid`** - Customer testimonials in 3-column grid
- **`imagewize/two-column-card`** - Professional card grid layout

**See:** [docs/BLOCKS.md](docs/BLOCKS.md) for detailed block documentation.

### Adding New Custom Block

1. Create block: `wp acorn sage-native-block:create` (must run in Trellis VM)
   - Select from Basic Block, Generic Templates, Nynaeve Templates, or Custom Templates
2. Develop in `resources/js/blocks/my-block/`:
   - Use `InnerBlocks` with native WordPress blocks
   - Keep `block.json` minimal (usually just `className` attribute)
   - In `editor.jsx`: Define template with native blocks, **no hardcoded style classes**
   - In `save.jsx`: Just render `<InnerBlocks.Content />`
   - In `style.css`: Style containers/layout only
3. Block auto-registers via service provider
4. Test in block editor - users control styling via toolbar/inspector

**See:** [docs/PATTERN-TO-NATIVE-BLOCK.md](docs/PATTERN-TO-NATIVE-BLOCK.md) for detailed implementation guide.

### Page Template Layout Convention

We use **WordPress-native layout approach** with minimal custom CSS.

**Template Pattern:**
```php
{{-- In content-page.blade.php --}}
<div class="wp-block-post-content alignfull is-layout-constrained">
  @php(the_content())
</div>
```

**How it works:**
1. `theme.json` sets `"useRootPaddingAwareAlignments": true`
2. `theme.json` sets root padding via `styles.spacing.padding`
3. Custom CSS adds horizontal padding to standalone blocks
4. Regular blocks automatically center at `contentSize` (55rem/880px)
5. `.alignwide` blocks center at `wideSize` (64rem/1024px)
6. `.alignfull` blocks extend to full viewport width

**DO:**
- ✅ Use the wrapper above for all `the_content()` calls
- ✅ Let WordPress handle layout via theme.json settings

**DON'T:**
- ❌ Wrap `the_content()` in Tailwind containers (`container mx-auto`, `max-w-*`)
- ❌ Add custom layout CSS for `.alignfull`, `.alignwide`, or content width

### WooCommerce Customization

- Custom templates in `resources/views/woocommerce/`
- Quote-based system (no cart/checkout)
- Removes default pricing and add-to-cart functionality
- Adds "Request Quote" buttons on single product pages
- Custom REST API endpoint to intercept checkout requests

### Modifying Styles

1. Edit `resources/css/app.css` for theme styles
2. Use Tailwind classes and custom CSS variables
3. Run `npm run dev` for HMR during development
4. Build with `npm run build` for production

### Debugging

- Enable WP_DEBUG for development
- Use Laravel debugging features via Acorn
- Browser dev tools for frontend debugging
- Check Vite dev server output for build errors

## File Conventions

### Naming
- **PHP Classes**: PascalCase (e.g., `HeroBlock.php`)
- **Blade Templates**: kebab-case (e.g., `hero-block.blade.php`)
- **CSS/JS Files**: kebab-case (e.g., `hero-block-style.css`)
- **Block Names**: namespace/block-name (e.g., `imagewize/hero-block`)

### Organization
- Keep related files together
- Follow Sage 11 conventions
- Use appropriate directories for file types
- Maintain consistent structure across components
