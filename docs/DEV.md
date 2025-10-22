# Developer Guide

This guide covers development workflows, architecture, and best practices for working with the Nynaeve theme.

## Table of Contents

- [Project Structure](#project-structure)
- [Development Commands](#development-commands)
- [Block Development](#block-development)
- [Code Quality](#code-quality)
- [Architecture](#architecture)
- [WP-CLI Usage](#wp-cli-usage)
- [Customization](#customization)

## Project Structure

```
nynaeve/
├── resources/
│   ├── js/
│   │   ├── blocks/          # Custom blocks (React/JavaScript)
│   │   ├── app.js           # Main JavaScript entry
│   │   └── editor.js        # Block editor scripts
│   ├── css/
│   │   ├── app.css          # Main stylesheet (Tailwind)
│   │   └── editor.css       # Block editor styles
│   ├── images/              # Theme images and logos
│   └── views/               # Blade templates
│       ├── layouts/         # Layout templates
│       ├── sections/        # Reusable sections
│       └── partials/        # Partial templates
├── app/
│   ├── Blocks/              # PHP blocks (legacy)
│   ├── Fields/              # ACF Composer field groups
│   ├── Providers/           # Service providers
│   └── View/                # View composers
├── docs/                    # Documentation
├── public/                  # Compiled assets (generated)
├── bud.config.js            # Build configuration (Vite)
├── tailwind.config.js       # Tailwind CSS configuration
└── theme.json               # WordPress theme settings
```

## Development Commands

### Theme Development

```bash
# Navigate to theme directory
cd site/web/app/themes/nynaeve

# Install dependencies
composer install && npm install

# Start development server with HMR
npm run dev

# Build for production
npm run build

# Check code quality
composer pint
```

### Development Mode

For theme development on Bedrock sites, enable development mode in `config/environments/development.php`:

```php
Config::define('WP_DEVELOPMENT_MODE', 'theme');
```

**Benefits:**
- Bypasses theme.json and block theme caching
- Pattern changes appear immediately
- Essential for block theme development

**Note:** Only use in development - impacts performance in production.

## Block Development

### Philosophy

**InnerBlocks First** - Our blocks prioritize user control:
- Built with native WordPress blocks (Image, Heading, Paragraph, Button)
- No hardcoded styles in templates
- Users select all styles via block toolbar/inspector
- Minimal custom CSS (containers and hover effects only)
- Full flexibility without code changes

See [PATTERN-TO-NATIVE-BLOCK.md](PATTERN-TO-NATIVE-BLOCK.md) for detailed implementation guide.

### Sage Native Block Troubleshooting

**Problem**: `sage-native-block:create` shows "No templates found" or "Template 'basic' not found in configuration"

**Solution for v2.0.0 (LEGACY - No Longer Needed)**:
Older versions (v2.0.0) required manual config publishing:
1. **Publish the config file** (creates `config/sage-native-block.php`):
   ```bash
   wp acorn vendor:publish --provider="Imagewize\SageNativeBlockPackage\Providers\SageNativeBlockServiceProvider"
   ```
2. **Clear all caches**: `wp acorn optimize:clear`
3. **Verify config**: `ls -la config/sage-native-block.php`

**Current Version (v2.0.1+)**:
- Config publishing is **no longer required**
- Package now works out-of-the-box without manual setup
- Projects with previously published configs will continue to work
- If you encounter issues, update the package: `composer update imagewize/sage-native-block`

### Custom Block Templates

Create reusable block templates in the `block-templates/` directory - they automatically appear in the template selection menu when creating new blocks with `wp acorn sage-native-block:create`.

**Template Structure:**
Each custom template should be a directory containing the standard block files:
- `block.json`
- `index.js`
- `editor.jsx`
- `save.jsx`
- `style.css`
- `editor.css`
- `view.js`

The template name is automatically detected from the directory name.

### Creating New Blocks

All WP-CLI commands (including `wp acorn`) must be run from the Trellis VM:

```bash
# From Trellis VM (using --workdir for single command)
cd trellis
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:create

# OR from interactive VM shell
cd trellis
trellis vm shell
cd /srv/www/imagewize.com/current/web/app/themes/nynaeve
wp acorn sage-native-block:create
```

**Interactive template selection with four options:**
1. **Basic Block** - Simple default block
2. **Generic Templates** - InnerBlocks, two-column, statistics, CTAs
3. **Nynaeve Templates** - Production-ready examples
4. **Custom Templates** - Auto-detected from block-templates/ directory

**Why Trellis VM?**
- Database connection is configured in the VM environment
- WordPress installation is accessible at `/srv/www/imagewize.com/current/`
- All Acorn commands require database access
- Local machine doesn't have correct database credentials
- If you have another database server (MySQL, MariaDB, PostgreSQL) running locally, it will conflict with the Trellis VM's database port

### Block Registration

Blocks are automatically registered during theme setup. New blocks created with `sage-native-block:create` are immediately available in the WordPress block editor.

### Full-Width Block Styling

**IMPORTANT:** When creating blocks that support full-width alignment (`align: ["full"]`), use WordPress's native layout system instead of custom viewport-based CSS.

**✅ Correct approach:**
```css
.wp-block-myblock.alignfull {
  width: 100%;
}
```

**❌ Incorrect approach (causes editor issues):**
```css
.wp-block-myblock.alignfull {
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
```

**Why the viewport approach fails:**
- `100vw` causes blocks to extend behind the editor sidebar
- Works on frontend but breaks in WordPress editor
- WordPress automatically handles full-width when you set `"align": ["full"]` in block.json
- The editor applies proper full-width behavior without custom CSS

**Best practice:**
1. Set `"align": ["full"]` or `"align": ["wide", "full"]` in block.json
2. Use `width: 100%` in your CSS (optional - WordPress handles it)
3. Let WordPress's `.alignfull` class do the work
4. Style the container/background, not the width/positioning

## Code Quality

### PHP Standards

```bash
# Format PHP code with Laravel Pint
composer pint

# Check PHP coding standards (from site root)
cd site && composer test

# Direct PHPCS
phpcs
```

### CSS/JavaScript

- Follows Tailwind CSS best practices
- ESLint configuration for JavaScript
- Prettier for code formatting

## Architecture

### Laravel Integration (Acorn)

Nynaeve uses Acorn to bring Laravel's powerful features to WordPress:

- **Service Providers**: Bootstrap theme functionality
- **Blade Templates**: Clean, expressive templating
- **View Composers**: Bind data to views
- **Dependency Injection**: Modern PHP patterns

### Asset Pipeline (Vite)

- **Entry Points**: `resources/css/app.css`, `resources/js/app.js`, `resources/css/editor.css`, `resources/js/editor.js`
- **Build Output**: `public/build/` directory
- **HMR**: Hot Module Replacement for instant updates
- **WordPress Integration**: `theme.json` generated from Tailwind config

### Design System

**Color Palette:**
- Primary: `#017cb6`
- Primary Accent: `#e6f4fb`
- Main: `#171b23`
- Base: `#ffffff`

**Typography:**
- Body: Open Sans
- Monospace: Menlo
- Accent: Montserrat

**Layout (WordPress-Native):**
- Content Width: 880px (55rem - `contentSize` in theme.json)
- Wide Width: 1024px (64rem - `wideSize` in theme.json)
- Uses Twenty Twenty-Five approach: `useRootPaddingAwareAlignments: true`
- Root padding: `var(--wp--preset--spacing--50)` (responsive)
- **Minimal custom CSS** - Just 40 lines of CSS for entire layout system
  - WordPress core handles centering/max-width automatically
  - Theme adds padding via two complementary rules:
    - `:where(.is-layout-constrained) > :not(.alignfull):not(.alignwide)` - for standalone blocks (paragraphs, headings, etc.)
    - `:where(.is-layout-constrained) > .alignfull > *` - for content inside full-width blocks with custom inner wrappers
- Custom padding uses `:where()` for zero specificity (user-defined padding always wins)
- See `docs/CONTENT-WIDTH-AND-LAYOUT.md` for full documentation

## WP-CLI Usage

All WP-CLI commands must be run from the Trellis VM.

### Common Commands

```bash
# Enter Trellis VM
cd trellis && trellis vm shell

# Navigate to theme
cd /srv/www/imagewize.com/current/web/app/themes/nynaeve

# List Acorn commands
wp acorn list

# Clear cache
wp acorn optimize:clear

# List registered blocks
wp block-type list

# Database operations (from site root)
cd /srv/www/imagewize.com/current

# Backup database
wp db export /tmp/backup_$(date +%Y%m%d_%H%M%S).sql.gz --path=web/wp

# Search-replace URLs
wp search-replace 'old-url.com' 'new-url.com' --all-tables --precise --path=web/wp

# Import database
wp db import /tmp/backup.sql.gz --path=web/wp
```

### Trellis VM + Local Database Conflicts

If you have a local MariaDB/MySQL (Homebrew) running, it conflicts with Trellis VM on port 3306. In this case, all development database operations must run inside the Trellis VM.

## Customization

### Theme Configuration

**theme.json** - WordPress theme settings:
- Color palette
- Typography settings
- Layout settings
- Block supports

**resources/css/app.css** - Tailwind CSS configuration:
- Custom utilities
- Component styles
- Theme variables

**resources/views/** - Blade templates:
- Layout structure
- Template parts
- Component composition

**app/** - PHP functionality:
- Custom post types
- Taxonomies
- REST API endpoints
- Theme options (ACF Composer)

### Theme Options

Configure theme behavior via **WordPress Admin → Theme Options**:
- WooCommerce mode (Quote/Standard/Catalog)
- Additional theme settings managed through ACF Composer

### Adding Custom Functionality

**Service Providers** (`app/Providers/`):
```php
<?php

namespace App\Providers;

use Roots\Acorn\ServiceProvider;

class CustomServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Register bindings
    }

    public function boot()
    {
        // Bootstrap services
    }
}
```

**View Composers** (`app/View/Composers/`):
```php
<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class CustomComposer extends Composer
{
    protected static $views = ['partials.custom'];

    public function with()
    {
        return [
            'data' => $this->getData(),
        ];
    }

    protected function getData()
    {
        return 'custom data';
    }
}
```

## Local Development Environments

Nynaeve supports both Lando and Trellis VM (Lima-based) for local WordPress environments.

**Note:** We use Trellis VM (NOT Vagrant) - access via `trellis vm shell` command.

### Environment Configuration

Environment-specific configuration with `.env` files:
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`
- `WP_HOME`, `WP_SITEURL`
- `WP_ENV` (development, staging, production)

## CSS Best Practices

### Full-Width Block Styling

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

**For Custom Full-Width Layouts (Non-Block Editor):**
If you need full-width outside of block editor content:
```css
.custom-full-width {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
```
But avoid this for block editor content - use WordPress's native system instead.

### Block Padding Best Practices

**Internal Component Spacing:**
Only add horizontal padding for:
1. **Internal spacing** within block components (cards, buttons)
2. **Internal component layout** (not edge padding)

**Example - Full-width block with background:**
```css
/* Outer container - full width with background */
.wp-block-imagewize-my-block {
  width: 100%;
  background: var(--wp--preset--color--tertiary);
  padding: 5rem 0; /* ✅ Vertical only */
}

/* Inner wrapper - constrained width */
.my-block__content {
  max-width: var(--wp--style--global--content-size, 55rem);
  margin: 0 auto;
  /* ✅ NO horizontal padding - theme handles it */
}

/* Internal card padding is fine */
.my-block__card {
  padding: 2rem 1.5rem; /* ✅ Internal spacing */
}
```

See [CONTENT-WIDTH-AND-LAYOUT.md](CONTENT-WIDTH-AND-LAYOUT.md) for comprehensive documentation.

## File Conventions

### Naming Standards

- **PHP Classes**: PascalCase (e.g., `HeroBlock.php`)
- **Blade Templates**: kebab-case (e.g., `hero-block.blade.php`)
- **CSS/JS Files**: kebab-case (e.g., `hero-block-style.css`)
- **Block Names**: namespace/block-name (e.g., `imagewize/hero-block`)

### Organization Principles

- Keep related files together (block files in same directory)
- Follow Sage 11 conventions (app/, resources/, public/ structure)
- Use appropriate directories for file types
- Maintain consistent structure across components
- Block-specific CSS in `resources/css/blocks/` or imported in main CSS
- Block JavaScript in `resources/js/blocks/{block-name}/`

## Additional Resources

- [Sage Documentation](https://roots.io/sage/docs/)
- [Acorn Documentation](https://roots.io/acorn/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
