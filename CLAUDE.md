# CLAUDE.md - Nynaeve Theme

This file provides guidance to Claude Code when working with the Nynaeve theme specifically.

## Table of Contents

1. [Theme Overview](#theme-overview)
2. [Development Commands](#development-commands)
   - [Start Development](#start-development)
   - [Build for Production](#build-for-production)
   - [Code Quality](#code-quality)
3. [Block Development Philosophy](#block-development-philosophy)
   - [Sage Native Blocks with InnerBlocks (MOST PREFERRED)](#sage-native-blocks-with-innerblocks-most-preferred)
   - [Sage Native Blocks with Custom Controls (Use Sparingly)](#sage-native-blocks-with-custom-controls-use-sparingly)
   - [ACF Composer Blocks (Special Cases Only)](#acf-composer-blocks-special-cases-only)
4. [Acorn Commands (Trellis VM Only)](#acorn-commands-trellis-vm-only)
   - [Entering the Trellis VM](#entering-the-trellis-vm)
   - [Running Acorn Commands in VM](#running-acorn-commands-in-vm)
5. [Architecture](#architecture)
   - [Directory Structure](#directory-structure)
   - [Asset Pipeline](#asset-pipeline)
   - [Static Assets (Images, Fonts, etc.)](#static-assets-images-fonts-etc)
6. [Block Registration](#block-registration)
   - [ACF Composer Block Examples](#acf-composer-block-examples)
7. [Code Standards](#code-standards)
   - [PHP](#php)
   - [CSS/Styling](#cssstyling)
   - [JavaScript](#javascript)
8. [Common Tasks](#common-tasks)
   - [Adding New Custom Block (InnerBlocks Approach - PREFERRED)](#adding-new-custom-block-innerblocks-approach---preferred)
   - [Modifying Styles](#modifying-styles)
   - [Creating Blade Templates](#creating-blade-templates)
   - [WooCommerce Customization](#woocommerce-customization)

---

## Theme Overview

Nynaeve is a modern WordPress theme built on Sage 11 framework with:
- **Laravel Blade** templating system
- **Tailwind CSS 4** for styling with custom design system
- **Vite** for fast development and HMR (Hot Module Replacement)
- **Acorn** (Laravel for WordPress) for advanced PHP features
- **WooCommerce** integration with custom quote-based system
- **Custom blocks** using both ACF Composer and React/JavaScript via `imagewize/sage-native-block`

## Development Commands

### Start Development
```bash
# Navigate to theme directory
cd site/web/app/themes/nynaeve

# Start development server with HMR
npm run dev

# Build for production
npm run build
```

**Important - HMR with Trellis VM:**
- When using Trellis VM for local development, Vite HMR (Hot Module Replacement) requires HTTP access
- Access your site via HTTP: `http://imagewize.test/` (not HTTPS)
- HTTPS connections will fail to establish WebSocket connection to Vite dev server
- This is a local development limitation only - production uses built assets without HMR

**Important - Local Database Conflicts (Homebrew MariaDB/MySQL):**
- Local MariaDB/MySQL on port 3306 conflicts with Trellis VM port forwarding
- Run all `wp` and `wp acorn` commands from inside Trellis VM
- Database operations: `cd trellis && trellis vm shell`, then use WP-CLI inside VM

### Code Quality & Testing
```bash
# Install dependencies
composer install && npm install

# Check PHP code quality (uses Laravel Pint)
composer pint

# Run WordPress coding standards check
# Note: Use phpcs from parent site directory if available
cd ../../.. && composer test
```

### Block Development Philosophy

**PREFERRED APPROACH**: Build blocks using **InnerBlocks** with native WordPress blocks whenever possible. This maximizes user control and flexibility.

**Key Principles:**
- **Maximum User Control**: Let users select styles, font sizes, and formatting via block toolbar/inspector
- **Avoid Hardcoded Classes**: Never hardcode styling classes in templates (e.g., `is-style-*`, `has-*-font-size`)
- **Native WordPress Blocks**: Use core blocks (Button, Heading, Paragraph, Image) within custom containers
- **Block Toolbar First**: Users should access all styling options via WordPress native controls
- **Minimal Inspector Controls**: Only add custom controls when absolutely necessary

#### Sage Native Blocks with InnerBlocks (MOST PREFERRED)

Use InnerBlocks to compose blocks from native WordPress blocks. This provides the best user experience.

**When to use:**
- Content-focused blocks with images, headings, text, buttons
- Blocks where users need full typography control (font sizes, colors, spacing)
- Blocks where button styles should be user-selectable
- Need flexible editing with WordPress native controls
- Want clean sidebar (no custom inspector controls)

**Example InnerBlocks structure:**
```jsx
// editor.jsx
const TEMPLATE = [
  ['core/image', { className: 'card__image' }],
  ['core/heading', {
    level: 3,
    content: 'Professional WordPress Development'  // Real content, not placeholder!
  }],
  ['core/paragraph', {
    content: 'Transform your website with modern development practices and cutting-edge technology.'  // Real content!
  }],
  ['core/group', { className: 'card__buttons', layout: { type: 'flex' } }, [
    ['core/button', { text: 'Get Started' }],      // Real button text
    ['core/button', { text: 'Learn More' }],       // Real button text
  ]],
];

return (
  <div {...useBlockProps()}>
    <InnerBlocks
      template={TEMPLATE}
      allowedBlocks={ALLOWED_BLOCKS}
      templateLock="all"
    />
  </div>
);
```

**IMPORTANT - Real Content vs Placeholders:**
- ✅ **Always use real, publishable content** in block templates (not placeholder text!)
- ✅ Use actual text like "Professional Solutions" instead of "Heading goes here..."
- ✅ This allows immediate testing and gives users working content to replace
- ✅ Block should render properly on frontend immediately after insertion
- ❌ **Never use** `placeholder: 'Text goes here...'` - this only shows in editor, not frontend
- ❌ Avoid generic placeholders like "Lorem ipsum" or "Click here"

**Why real content matters:**
1. **Frontend Testing**: Block renders correctly on published pages immediately
2. **User Experience**: Users see working examples before customizing
3. **Development Speed**: No need to add content just to see layout/styles
4. **Quality Assurance**: Catches rendering issues during development

**CSS approach - style containers only:**
```css
/* Style the container and layout */
.card__buttons {
  display: flex;
  gap: 1rem;
}

/* Let users control button styles via WordPress button filter */
/* Available styles: Default, Outline, Secondary, Light, Dark */
```

```bash
# Create new React/JavaScript block (must run in Trellis VM)
cd trellis
echo "yes" | trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:add-setup imagewize/my-block-name

# After creating, blocks are auto-registered via ThemeServiceProvider
# Files created in: resources/js/blocks/my-block-name/
# - block.json (minimal attributes - usually just className)
# - index.js (block registration)
# - editor.jsx (editor component with InnerBlocks)
# - save.jsx (just <InnerBlocks.Content />)
# - style.css (container/layout styles only)
# - editor.css (editor-only styles)
```

**See documentation:** `docs/PATTERN-TO-NATIVE-BLOCK.md` for detailed InnerBlocks implementation guide.

#### Sage Native Blocks with Custom Controls (Use Sparingly)

React/JavaScript blocks with custom RichText/MediaUpload controls. Only use when InnerBlocks approach won't work.

**When to use:**
- Need dynamic frontend JavaScript interactivity
- Complex data structures that don't map to core blocks
- Custom UI requirements that native blocks can't provide

**Avoid for:**
- Simple content blocks (use InnerBlocks instead)
- Blocks with images, headings, text, buttons (use InnerBlocks instead)

#### ACF Composer Blocks (Special Cases Only)

PHP/Blade-based blocks with ACF field controls. Use only when other approaches don't fit.

**When to use:**
- Need complex custom field types (repeaters, relationships, post queries)
- Server-side rendering is critical for performance
- **Editing must be rigid/controlled** (e.g., strict brand guidelines)
- Need to change visual order via CSS without changing DOM order (flexbox/grid reordering)
- Prefer PHP/Blade templating over React

**Avoid for:**
- Content blocks where users need flexibility (use InnerBlocks instead)
- Blocks where typography should be user-controlled (use InnerBlocks instead)

```bash
# Create new ACF Composer block (must run in Trellis VM)
cd trellis
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn acf:block MyBlock

# Files created:
# - app/Blocks/MyBlock.php (block class with field definitions)
# - resources/views/blocks/my-block.blade.php (Blade template)
```

**See documentation:** `docs/PATTERN-TO-ACF-BLOCK.md`

### Acorn Commands (Trellis VM Only)

**Important for Trellis Setups:** All `wp acorn` commands require database access and must be run from within the Trellis VM, not your local machine. This applies when using Trellis for local development.

#### Entering the Trellis VM

```bash
# From your local machine, navigate to the project root
cd /path/to/imagewize.com

# Enter the Trellis VM shell
trellis vm shell

# This will open a shell inside the VM, typically at:
# /srv/www/demo.imagewize.com/current (or your environment's path)
# Example output:
# Running command => limactl shell --workdir /srv/www/demo.imagewize.com/current imagewize.com
# jasperfrumau@lima-imagewize-com:/srv/www/demo.imagewize.com/current$
```

#### Running Acorn Commands in VM

You have two options for running commands in the Trellis VM:

**Option 1: Run Single Commands (Recommended for Quick Tasks)**

Use `trellis vm shell --workdir` to run individual commands:

```bash
# Run commands from your local machine, specifying the working directory
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn acf:field MyField

# Create new ACF block
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn acf:block MyBlock

# Clear ACF cache
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn acf:clear

# List available commands
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn list acf
```

**Option 2: Interactive Shell Session (For Multiple Commands)**

Enter the VM interactively if you need to run many commands:

```bash
# Enter the VM shell
trellis vm shell

# You start at: /srv/www/demo.imagewize.com/current (or imagewize.com/current)
# Navigate to theme directory
cd /srv/www/imagewize.com/current/web/app/themes/nynaeve

# Now run multiple commands
wp acorn acf:field MyField
wp acorn acf:block MyBlock
wp acorn acf:clear

# Exit when done
exit
```

**Common ACF Composer Commands:**

```bash
# Create new ACF field group
wp acorn acf:field MyFieldGroup

# Create new ACF block (creates both Block class and Blade template)
wp acorn acf:block MyBlock

# Create new ACF options page
wp acorn acf:options MyOptionsPage

# Clear ACF Composer cache (run after modifying field/block files)
wp acorn acf:clear

# Cache ACF Composer fields and blocks
wp acorn acf:cache

# List all ACF commands
wp acorn list acf
```

**Path Structure:** The VM uses the same directory structure as the Trellis production/staging servers:
- **Site root:** `/srv/www/imagewize.com/current` (or `demo.imagewize.com/current` for demo environment)
- **Theme directory:** `/srv/www/imagewize.com/current/web/app/themes/nynaeve`
- This mirrors the Trellis server structure, making deployments consistent

**ACF Composer Workflow:**
1. Run `wp acorn acf:block MyBlock` - Creates `app/Blocks/MyBlock.php` and `resources/views/blocks/my-block.blade.php`
2. Edit the generated files locally (they're synced to the VM via NFS/folder sharing)
3. Run `wp acorn acf:clear` in VM to clear the cache
4. Refresh the block editor to see changes

**Note for Non-Trellis Setups:** If you're using a different local development environment (MAMP, Local, Lando, etc.), you can run `wp acorn` commands directly from your local terminal without needing to enter a VM.

**ACF Composer Note:** ACF Composer creates field groups in code (`app/Fields/`) rather than the ACF UI. These won't appear in the WordPress admin ACF interface but are registered programmatically and version-controlled.

## Architecture

### Directory Structure
```
nynaeve/
├── app/                    # PHP application code
│   ├── Blocks/            # PHP-based custom blocks (ACF Composer)
│   ├── Providers/         # Service providers
│   ├── View/
│   │   └── Composers/     # Blade view composers
│   ├── setup.php          # Theme setup and WordPress hooks
│   └── filters.php        # WordPress filters
├── resources/
│   ├── css/               # Tailwind CSS styles
│   ├── js/                # JavaScript and React components
│   │   └── blocks/        # React/JavaScript custom blocks
│   └── views/             # Blade templates
│       ├── layouts/       # Base layouts
│       ├── partials/      # Reusable template parts
│       ├── sections/      # Major sections (header, footer)
│       └── blocks/        # Block templates
├── config/                # Configuration files
└── public/build/          # Built assets (auto-generated)
```

### Asset Pipeline
- **Entry Points**:
  - `resources/css/app.css` - Theme styles
  - `resources/js/app.js` - Theme JavaScript
  - `resources/css/editor.css` - Block editor styles
  - `resources/js/editor.js` - Block editor JavaScript
- **Build Output**: `public/build/` directory
- **Development**: Uses Vite dev server with HMR on `npm run dev`

### Static Assets (Images, Fonts, etc.)
Store static assets in `resources/images/` and reference them using Laravel's Vite facade:

**In PHP:**
```php
use Illuminate\Support\Facades\Vite;

$imageUrl = Vite::asset('resources/images/example.jpg');
```

**In Blade Templates:**
```blade
<img src="{{ Vite::asset('resources/images/example.svg') }}" alt="Example">
```

Vite processes these assets during build, optimizing and fingerprinting them for cache busting. See [Sage Assets Documentation](https://roots.io/sage/docs/compiling-assets/) for more details.

## Block Registration

All blocks (both Sage Native and ACF Composer) are automatically registered via `app/Providers/ThemeServiceProvider.php`.

The theme uses the **`imagewize/sage-native-block`** package ([GitHub](https://github.com/imagewize/sage-native-block)) for Sage Native block development with Acorn integration.

### ACF Composer Block Examples

**Creating ACF Composer Blocks:**

1. **Generate block files:**
   ```bash
   # From Trellis VM
   trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn acf:block BlockName
   ```

2. **Files created:**
   - `app/Blocks/BlockName.php` - Block controller with field definitions
   - `resources/views/blocks/block-name.blade.php` - Blade template

3. **Define fields in block class:**
   ```php
   public function fields(): array
   {
       $fields = Builder::make('block_name');

       $fields
           ->addImage('image', [
               'label' => 'Image',
               'return_format' => 'array',
           ])
           ->addText('heading', [
               'label' => 'Heading',
           ])
           ->addLink('button', [
               'label' => 'Button Link',
               'return_format' => 'array',
           ]);

       return $fields->build();
   }
   ```

4. **Process fields in `with()` method:**
   ```php
   public function with(): array
   {
       $image = get_field('image') ?: [];
       $heading = get_field('heading') ?: '';

       // IMPORTANT: Provide default content for both frontend and backend
       // This allows quick testing and gives clients working placeholder content
       if (empty($heading)) {
           $heading = 'Default Heading';
       }

       $image_url = is_array($image) ? ($image['url'] ?? null) : null;
       $image_alt = is_array($image) ? ($image['alt'] ?? '') : '';

       // Default image if not set
       if (empty($image_url)) {
           $image_url = Vite::asset('resources/images/placeholder.jpg');
           $image_alt = 'Placeholder image';
       }

       return [
           'image_url' => $image_url,
           'image_alt' => $image_alt,
           'heading' => $heading,
       ];
   }
   ```

   **Note**: Always include default content (text, images, buttons) that loads on both frontend and backend. Don't restrict defaults to `$is_preview` mode only. This ensures blocks render immediately with working content for better testing and user experience.

5. **Create CSS file:**
   - Location: `resources/css/blocks/block-name.css`
   - Enqueue in block's `assets()` method

6. **Cache ACF fields:**
   ```bash
   trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn acf:cache
   ```

See [docs/PATTERN-TO-ACF-BLOCK.md](docs/PATTERN-TO-ACF-BLOCK.md) for detailed conversion workflow from Moiraine patterns.

## Code Standards

### PHP
- **PSR-4 Autoloading**: `App\` namespace maps to `app/` directory
- **Laravel Conventions**: Use Laravel-style service providers, composers, etc.
- **Code Quality**: Use Laravel Pint for formatting: `composer pint`

### CSS/Styling
- **Tailwind CSS 4** with custom design system
- **Theme Colors**: Semantic color palette defined in `tailwind.config.js`:
  - `primary` (#017cb6) - Primary brand color
  - `primary-accent` (#e6f4fb) - Light primary accent
  - `primary-dark` (#026492) - Dark primary variant
  - `main` (#171b23) - Main text/dark color
  - `main-accent` (#465166) - Accent text color
  - `base` (#ffffff) - Base/background white
  - `secondary` (#98999a) - Secondary gray
  - `tertiary` (#f5f5f6) - Tertiary background
  - `border-light` (#ebeced) - Light borders
  - `border-dark` (#cbcbcb) - Dark borders
- **Typography**: Open Sans, Menlo, Montserrat fonts
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### JavaScript
- **ES6+ Modules**: Modern JavaScript with Vite
- **React**: For custom blocks in `resources/js/blocks/`
- **WordPress Components**: Use `@wordpress/components` for consistency
- **Block Filters**: Located in `resources/js/filters/`, auto-loaded via glob import in `editor.js`
  - Button filter provides 5 style variants: Default, Outline, Secondary, Light, Dark
  - Filters enhance core WordPress blocks theme-wide

## Common Tasks

### Available Custom Blocks

The theme includes the following custom blocks (all using InnerBlocks approach):

- **`imagewize/carousel`** - Image carousel with configurable slides
- **`imagewize/content-image-text-card`** - Content card with image, heading, text, and buttons
- **`imagewize/faq`** - FAQ section with questions and answers
- **`imagewize/pricing`** - Two-column pricing comparison table (white vs dark)
- **`imagewize/pricing-tiers`** - Three-column pricing comparison table with featured tier
- **`imagewize/related-articles`** - Related articles with smart tag filtering
- **`imagewize/slide`** - Individual slide for carousel block

#### Pricing Blocks

The theme includes two pricing block variations:

**Two-Column Pricing (`imagewize/pricing`)**
- Classic two-column layout with white and dark backgrounds
- High contrast design (white #ffffff vs dark #171b23)
- Perfect for simple pricing comparisons

**Three-Column Pricing Tiers (`imagewize/pricing-tiers`)**
- Professional three-column pricing table
- Featured center column with subtle blue background (#e6f4fb) and primary border
- Checkmark SVG icons for feature lists
- Hover effects with column elevation
- "Most Popular" badge styling
- See `docs/MULTI-COLUMN-PRICING-TABLE.md` for full implementation details

### Adding New Custom Block (InnerBlocks Approach - PREFERRED)
1. Create block: `echo "yes" | wp acorn sage-native-block:add-setup imagewize/my-block` (Note: pipe "yes" to auto-confirm prompts)
2. Develop in `resources/js/blocks/my-block/`:
   - Use `InnerBlocks` with native WordPress blocks (Image, Heading, Paragraph, Button)
   - Keep `block.json` minimal (usually just `className` attribute)
   - In `editor.jsx`: Define template with native blocks, **no hardcoded style classes**
   - In `save.jsx`: Just render `<InnerBlocks.Content />`
   - In `style.css`: Style containers/layout only, not individual blocks
3. Block auto-registers via service provider
4. Test in block editor - users control all styling via block toolbar/inspector
5. See `docs/PATTERN-TO-NATIVE-BLOCK.md` for detailed implementation guide

### Modifying Styles
1. Edit `resources/css/app.css` for theme styles
2. Use Tailwind classes and custom CSS variables
3. Run `npm run dev` for HMR during development
4. Build with `npm run build` for production

### Creating Blade Templates
1. Add templates in `resources/views/`
2. Use Laravel Blade syntax with WordPress functions
3. Follow existing naming conventions
4. Utilize view composers in `app/View/Composers/` for data

**Important: Page Template Layout Convention**
- **DO NOT** wrap `the_content()` in Tailwind container classes (`container mx-auto`, `max-w-*`)
- WordPress blocks self-manage layout via `is-layout-constrained` classes
- Regular blocks automatically center at `contentSize` (880px from theme.json)
- `.alignfull` blocks automatically span full viewport width via WordPress core CSS
- Only add containers for non-block-editor content (custom headers, footers, sidebars, etc.)
- This approach matches modern block themes (Ollie, Twenty Twenty-Four, etc.)

Example page template pattern:
```php
@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
    @include('partials.page-header')
    {{-- No container wrapper - WordPress blocks handle their own layout --}}
    @includeFirst(['partials.content-page', 'partials.content'])
  @endwhile
@endsection
```

For truly full-width pages without any constraints, see `template-full-width.blade.php`.

### WooCommerce Customization
- Custom templates in `resources/views/woocommerce/`
- Quote-based system (no cart/checkout)
- Product customizations in theme files

## WordPress Integration

### Theme Features
- SVG upload support
- Custom image sizes
- Block editor styles injection
- Navigation menu support
- WooCommerce integration

### Performance
- Asset optimization via Vite
- Font optimization
- Image optimization
- Responsive images

## Development Notes

### Local Development
- Use `npm run dev` for development with HMR
- Supports Lando/Docker environments
- Environment-specific configuration via `.env`

### Deployment
- Run `npm run build` before deploying
- Built assets committed to version control
- Production-optimized bundles

### Debugging
- Enable WP_DEBUG for development
- Use Laravel debugging features via Acorn
- Browser dev tools for frontend debugging

### Important CSS Considerations

#### Full-Width Blocks and Layout System

**Modern Approach (v1.14.0+):**
- Let WordPress handle `.alignfull` blocks natively - no custom CSS needed
- Remove Tailwind containers from page templates around `the_content()`
- WordPress blocks with `is-layout-constrained` self-manage centering at `contentSize` (880px)
- `.alignfull` blocks automatically span full viewport via WordPress core CSS
- This approach matches modern block themes (Ollie, Twenty Twenty-Four, etc.)

**Legacy Issue (pre-v1.14.0):**
Custom CSS using `100vw` or `-50vw` margins caused problems:
- `100vw` includes scrollbar width (~15px on Windows/Linux)
- Double-wrapping (Tailwind + WordPress containers) prevented proper breakout
- Percentage-based margins (`-50%`) failed with constrained layouts

**Current Solution:**
No custom CSS needed. WordPress core handles it correctly when you:
1. Don't wrap post content in theme containers
2. Let blocks use WordPress's native layout classes
3. Only use `overflow-x: hidden` for specific cases like carousels

**For Custom Full-Width Layouts:**
If you need full-width outside of block editor content:
```css
.custom-full-width {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
```
But avoid this for block editor content - use WordPress's native system instead.

## Custom Components

The theme includes several pre-built components:
- Responsive navigation with mega menu
- Hero sections
- Pricing tables
- FAQ sections
- Related articles
- Social media integration

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