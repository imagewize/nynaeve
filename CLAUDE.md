# CLAUDE.md - Nynaeve Theme

This file provides guidance to Claude Code when working with the Nynaeve theme specifically.

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

### Block Development
```bash
# Create new React/JavaScript block
wp acorn sage-native-block:add-setup imagewize/my-block-name

# After creating, blocks are auto-registered via ThemeServiceProvider
```

### Acorn Commands (Run from Trellis VM)

**Important:** All `wp acorn` commands must be run from within the Trellis VM, not your local machine.

```bash
# Enter Trellis VM from your local trellis directory
trellis vm shell

# Navigate to theme directory in VM
cd /srv/www/imagewize.com/current/web/app/themes/nynaeve

# Clear ACF Composer cache (after creating/modifying ACF fields)
wp acorn acf:clear

# Create new ACF Composer field groups
wp acorn make:field MyFieldGroup

# Create new ACF Composer blocks
wp acorn make:block MyBlock

# Create new React/JavaScript block (requires sage-native-block package)
wp acorn sage-native-block:add-setup imagewize/my-block-name

# List all available Acorn commands
wp acorn list

# Run from site root for other Acorn commands
cd /srv/www/imagewize.com/current
wp acorn optimize
wp acorn config:cache
```

**Note:** ACF Composer creates field groups in code (`app/Fields/`) rather than the ACF UI. These won't appear in the WordPress admin ACF interface but are registered programmatically and version-controlled.

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

## Block Development

### Sage Native Block Package

Nynaeve uses the **`imagewize/sage-native-block`** package ([GitHub](https://github.com/imagewize/sage-native-block)) for building custom WordPress blocks with Acorn integration. This package provides:

- Seamless integration with Sage 11 and Acorn
- Modern React/JavaScript block development workflow
- Automatic block registration and asset handling
- Hot module replacement (HMR) support during development
- TypeScript support and modern build tooling

### Two Block Types

#### 1. React/JavaScript Blocks (Preferred)
Located in `resources/js/blocks/` with structure:
```
resources/js/blocks/my-block/
├── block.json          # Block configuration
├── index.js           # Block registration
├── editor.jsx         # Editor component
├── save.jsx           # Save component
├── style.css          # Frontend styles
├── editor.css         # Editor-specific styles
└── view.js            # Frontend JavaScript (optional)
```

Create with: `wp acorn sage-native-block:add-setup imagewize/block-name`

This command scaffolds a complete block structure with all necessary files and integrates with the Acorn/Sage build system.

#### 2. PHP Blocks (ACF Composer)
Located in `app/Blocks/` for server-side rendered blocks with ACF fields.

### Block Registration
All blocks are automatically registered via `app/Providers/ThemeServiceProvider.php`

## Code Standards

### PHP
- **PSR-4 Autoloading**: `App\` namespace maps to `app/` directory
- **Laravel Conventions**: Use Laravel-style service providers, composers, etc.
- **Code Quality**: Use Laravel Pint for formatting: `composer pint`

### CSS/Styling
- **Tailwind CSS 4** with custom design system
- **Theme Colors**: Defined in `tailwind.config.js`
- **Typography**: Open Sans, Menlo, Montserrat fonts
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### JavaScript
- **ES6+ Modules**: Modern JavaScript with Vite
- **React**: For custom blocks in `resources/js/blocks/`
- **WordPress Components**: Use `@wordpress/components` for consistency

## Common Tasks

### Adding New Custom Block
1. Create block: `wp acorn sage-native-block:add-setup imagewize/my-block`
2. Develop in `resources/js/blocks/my-block/`
3. Block auto-registers via service provider
4. Test in block editor

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

#### Viewport Width (vw) and Scrollbar Issues
When using `100vw` or `calc()` with `vw` units for full-width elements, be aware that:

- **`100vw` includes the scrollbar width** (~15px on Windows/Linux)
- This causes horizontal scrollbars when the body has a vertical scrollbar
- **Avoid using `-50vw` margins** for breaking out of containers

**Recommended Approaches:**

1. **For `.alignfull` blocks** - Use percentage-based margins:
   ```css
   .alignfull {
     width: 100%;
     max-width: 100vw;  /* Constrains to viewport */
     position: relative;
     left: 50%;
     margin-left: -50%;  /* Use % not vw */
     margin-right: -50%;
   }
   ```

2. **For carousels/sliders** - Use `overflow-x: hidden` on parent:
   ```css
   html, body {
     overflow-x: hidden;  /* Clips carousel overflow */
   }
   ```

3. **Alternative solutions:**
   - Use CSS Grid or Flexbox with `minmax()` for full-width layouts
   - Use JavaScript to calculate actual viewport width excluding scrollbar
   - Use container queries for responsive full-width elements

**References:**
- This is a known CSS limitation across browsers
- Mac users often don't see the issue (overlay scrollbars)
- Always test on Windows/Linux with visible scrollbars

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