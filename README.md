<div align="center">
  <img src="resources/images/nynaeve-logo-primary.svg" alt="Nynaeve Theme" width="120" height="120">

  # Nynaeve
</div>

**Design better, build faster, deliver results.** Nynaeve is a modern WordPress theme built on Sage 11 with reusable custom blocks using WordPress native tools and the Roots.io stack.

## What We Do

- **Custom Block Development**: Reusable, professional blocks built with WordPress native tools
- **E-Commerce Solutions**: WooCommerce integration with flexible quote-based systems
- **Performance First**: Optimized for Core Web Vitals with modern build tools
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Developer Friendly**: Built on Sage 11 and Acorn (Laravel for WordPress)

## Custom Blocks Library

Our theme includes **8 professionally designed custom blocks** for building modern websites:

### Hero & Banner Blocks
- **Page Heading Blue** - Full-width gradient banner for secondary page headings
  - Professional blue gradient background (primary to primary-dark)
  - Subtle radial pattern overlay
  - Responsive tagline, heading, and intro text
  - Full-width alignment with content constrained to 55rem
  - All typography editable via block toolbar

### Content & Layout Blocks
- **Content Image Text Card** - Flexible content cards with images, headings, text, and buttons
- **Carousel** - Dynamic image carousel with configurable slides and settings
- **FAQ** - Accordion-style FAQ sections for support content

### Pricing & Comparison Blocks
- **Pricing (2-Column)** - Classic high-contrast pricing comparison
- **Pricing Tiers (3-Column)** - Professional pricing table with featured tier highlighting
  - Subtle blue accent backgrounds
  - Checkmark SVG icons
  - Hover effects and elevation
  - "Most Popular" badge styling

### Dynamic Content Blocks
- **Related Articles** - Smart tag-based article recommendations
- **Slide** - Individual carousel slide component

### Block Features
- Built with InnerBlocks for maximum flexibility
- Full user control via WordPress native block toolbar
- No hardcoded styles - users select all styling options
- Responsive by default
- Accessible and semantic HTML

## Quick Start

| Resource | Link |
| --- | --- |
| **Theme Documentation** | [CLAUDE.md](CLAUDE.md) |
| **Changelog** | [CHANGELOG.md](CHANGELOG.md) |
| **Pattern to Block Guide** | [docs/PATTERN-TO-NATIVE-BLOCK.md](docs/PATTERN-TO-NATIVE-BLOCK.md) |
| **Page Heading Blue Guide** | [docs/PAGE-HEADING-BLUE-BLOCK.md](docs/PAGE-HEADING-BLUE-BLOCK.md) |
| **Pricing Tiers Guide** | [docs/MULTI-COLUMN-PRICING-TABLE.md](docs/MULTI-COLUMN-PRICING-TABLE.md) |

### Requirements
- WordPress 6.6 or later
- PHP 8.2 or later
- Node.js 16 or later
- Composer

## Technical Stack

### Theme Features
- **Vite** - Lightning-fast build tool with HMR (Hot Module Replacement)
- **Acorn 5** - Laravel-powered framework for WordPress
- **Tailwind CSS 4** - Utility-first CSS with custom design system
- **Laravel Blade** - Powerful templating engine
- **Custom Blocks** - React/JavaScript blocks using `imagewize/sage-native-block` package

### Design System
- **Semantic Color Palette**: Primary (#017cb6), Primary Accent (#e6f4fb), Main (#171b23), Base (#ffffff)
- **Typography**: Open Sans, Menlo, Montserrat
- **Layout**: WordPress native constrained layout (880px content width)

## Installation

```bash
# Navigate to theme directory
cd site/web/app/themes/nynaeve

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Start development server with HMR
npm run dev

# Build for production
npm run build
```

## Using Custom Blocks

### Adding Blocks to Your Pages

1. **Open Block Editor**: Edit any page/post in WordPress
2. **Insert Block**: Click the "+" icon or type "/" to search
3. **Search "Imagewize"**: Find our custom blocks under the Imagewize namespace
4. **Customize**: Use native WordPress block toolbar to style

### Example: Page Heading Blue Block

The **Page Heading Blue** block creates professional full-width page banners:

1. Insert `Imagewize Page Heading Blue` block
2. Block defaults to full-width alignment with gradient background
3. Edit tagline, heading, and intro text directly in the editor
4. Customize fonts, sizes, and colors via block toolbar
5. All content editable - tagline (Montserrat), H2 heading, intro paragraph
6. Responsive padding adapts automatically for mobile/tablet

### Example: Pricing Tiers Block

The **Pricing Tiers** block creates professional three-column pricing tables:

1. Insert `Imagewize Pricing Tiers` block
2. Default template includes three columns: Basic → Featured → Premium
3. Featured center column has subtle blue background (#e6f4fb)
4. Edit pricing, features, and buttons directly in the editor
5. Select button styles via block toolbar (Default, Outline, Secondary, Light, Dark)
6. All styling controlled by user - no code changes needed

### Example: Content Image Text Card

Perfect for feature highlights and call-to-action sections:

1. Insert `Imagewize Content Image Text Card` block
2. Upload image via native WordPress image block
3. Edit heading, paragraph, and button text
4. Select button style from toolbar
5. Adjust spacing, colors, and alignment via inspector panel

## For Developers

### Project Structure
```
nynaeve/
├── resources/
│   ├── js/blocks/       # Custom blocks (React)
│   ├── css/             # Tailwind styles
│   ├── images/          # Theme images and logos
│   └── views/           # Blade templates
├── app/                 # PHP application code
│   ├── Blocks/          # PHP blocks (legacy)
│   ├── Fields/          # ACF Composer field groups
│   └── View/            # View composers
├── docs/                # Documentation
└── public/              # Compiled assets
```

### Development Commands

**Theme Development:**
```bash
# Start dev server with HMR
npm run dev

# Build for production
npm run build

# Check code quality
composer pint
```

**Creating New Blocks:**
```bash
# From Trellis VM
cd trellis
trellis vm shell
cd /srv/www/imagewize.com/current/web/app/themes/nynaeve
wp acorn sage-native-block:add-setup imagewize/my-block-name
```

**WP-CLI Commands (Trellis VM):**
```bash
# Enter VM
cd trellis && trellis vm shell

# Navigate to theme
cd /srv/www/imagewize.com/current/web/app/themes/nynaeve

# Run WP-CLI commands
wp acorn list
```

### Block Development Philosophy

**InnerBlocks First** - Our blocks prioritize user control:
- Built with native WordPress blocks (Image, Heading, Paragraph, Button)
- No hardcoded styles in templates
- Users select all styles via block toolbar/inspector
- Minimal custom CSS (containers and hover effects only)
- Full flexibility without code changes

See [docs/PATTERN-TO-NATIVE-BLOCK.md](docs/PATTERN-TO-NATIVE-BLOCK.md) for detailed implementation guide.

### Code Quality

```bash
# PHP formatting with Laravel Pint
composer pint

# PHP coding standards (from site root)
cd ../../.. && composer test
```

## WooCommerce Integration

The theme includes flexible WooCommerce modes configured via Theme Options:

- **Quote Mode** (Default): Hide prices, show "Request Quote" buttons
- **Standard Mode**: Normal WooCommerce with cart and checkout
- **Catalog Mode**: Show prices but hide add-to-cart buttons

Perfect for B2B businesses, custom products, and lead generation.

## Configuration

### Theme Options

Configure WooCommerce behavior and other theme settings via **WordPress Admin → Theme Options**:

- **WooCommerce Mode**: Choose between Quote, Standard, or Catalog mode
- Additional theme configuration options managed through ACF Composer

### Development Customization

The theme can be customized through:

- `theme.json` - WordPress theme settings
- `resources/css/app.css` - Tailwind CSS configuration
- `resources/views/` - Blade templates
- `app/` - PHP functionality
- `app/Fields/` - ACF Composer field groups

## AI Development Assistance

This theme includes a [CLAUDE.md](CLAUDE.md) file with comprehensive development guidance specifically designed for AI assistants like Claude Code. This file provides:

- Theme-specific development commands and workflows
- Block development patterns using `imagewize/sage-native-block`
- Code quality standards and conventions
- Architecture overview and common tasks

The `CLAUDE.md` file serves both as AI guidance and general developer documentation for anyone working with the theme.

## Browser Support

- Latest versions of Chrome, Firefox, Safari, and Edge

## License

MIT

## Design Credits

- **Flower Icon**: Adapted from [Remix Icon](https://remixicon.com/) via [Blade UI Kit](https://blade-ui-kit.com/blade-icons/ri-flower-fill)
  - Original: `ri-flower-fill` by Remix Icon (Apache 2.0 License)
  - Colors customized to Nynaeve theme palette (#017cb6 primary blue)
- **Laptop Photo**: Photo by [Joshua Ng](https://unsplash.com/@notsurewhyinamedmyselfthiss) on [Unsplash](https://unsplash.com/photos/macbook-pro-turned-on-displaying-red-blue-and-yellow-lights-1sSfrozgiFk)
  - Used as placeholder image in Content Image Text Card block documentation

## Credits

- [Sage](https://roots.io/sage/) by Roots
- [Tailwind CSS](https://tailwindcss.com/)
- [Laravel](https://laravel.com/)
- [Vite](https://vitejs.dev/)
