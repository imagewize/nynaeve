<p align="center">
  <img alt="Nynaeve" src="resources/images/logo/logo-imagewize-smaller.png" height="100">
</p>

<p align="center">
  <strong>Nynaeve</strong>: A modern WordPress theme built on Sage 11
</p>

<p align="center">
  <a href="https://github.com/imagewize/nynaeve/actions">
    <img alt="Build Status" src="https://img.shields.io/github/actions/workflow/status/imagewize/nynaeve/main.yml?branch=main&logo=github&label=CI&style=flat-square">
  </a>
</p>

## Overview

Nynaeve is a high-performance WordPress theme based on Sage 11 with enhanced WooCommerce support, custom components, and modern frontend development workflow.

- Built on [Sage 11](https://roots.io/sage/) and [Acorn](https://github.com/roots/acorn) (Laravel for WordPress)
- Clean, efficient theme templating with [Laravel Blade](https://laravel.com/docs/master/blade)
- Modern frontend development with [Vite](https://vitejs.dev/) and [Tailwind CSS 4](https://tailwindcss.com/)
- Complete WooCommerce integration with custom product views
- Responsive navigation and layout components

## Features

### Fonts

- Custom web fonts integration with Open Sans and Menlo
- Proper typography scales with Tailwind CSS
- Font optimization for performance

### PHP Packages

- Acorn for Laravel framework features in WordPress
- Navi for WordPress menu building and navigation
- Blade component integration
- Custom block support

### Components

- Responsive navigation with dropdown menus
- Social media icons integration with Blade components
- WooCommerce product gallery with thumbnails and zoom
- Back to top button
- Smooth scroll functionality for anchor links

### WooCommerce Integration

- **Configurable WooCommerce Modes**: Choose from Quote, Standard, or Catalog mode via Theme Options
- **Quote Mode** (default): Hide prices and add-to-cart, show "Request Quote" button
- **Standard Mode**: Normal WooCommerce functionality with cart and checkout
- **Catalog Mode**: Show prices but hide add-to-cart buttons
- Custom product archive views and enhanced single product pages
- Custom gallery with thumbnail navigation and responsive product grids

### CSS with Tailwind 4

- Custom color palette
- Responsive design system
- Extended typography settings
- Component-focused styling
- WooCommerce specific styling

### Build System

- Vite for fast HMR (Hot Module Replacement)
- NPM for package management
- Asset optimization pipeline
- Image processing
- SVG icon system

## Custom Blocks

Nynaeve includes several custom blocks that extend the WordPress editor functionality:

- **Modern Pricing Table** (`imagewize/pricing`): A modern comparison of website packages with pricing and feature details in a two-column layout.
- **FAQ Section** (`imagewize/faq`): A collapsible FAQ section with questions and answers.
- **Related Articles** (`imagewize/related-articles`): A dynamic block that displays related blog posts with the following features:
  - Three relationship modes: by tags, by categories, or most recent posts
  - Smart tag filtering system with specificity scoring that prioritizes specific tags over common ones
  - Configurable number of articles (1-20)
  - Container query support for responsive behavior within content and sidebar containers
  - Displays article title, excerpt, and publication date
  - Adapts column count based on available container width rather than viewport width
- **Hero Block** (`acf/hero`): An ACF Composer-based responsive hero section with the following features:
  - Fully responsive design with different layouts for mobile, tablet, and desktop
  - Split-pane design with text and image columns that rearrange based on screen size
  - Desktop-specific and mobile-specific images with proper loading optimization
  - Customizable heading text, subheading text, and font weight
  - Compatible with WordPress color settings for background and text colors
  - Support for wide and full width alignments
  - Editor preview that mimics the frontend appearance

These blocks can be added from the block inserter in the editor.

## Requirements

- WordPress >= 6.0
- PHP >= 8.0
- Composer >= 2.0
- Node.js >= 16.0

## Installation

```bash
# Clone the repository
git clone https://github.com/imagewize/nynaeve.git

# Navigate to the theme directory
cd nynaeve

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Build assets
npm run build
```

## Development

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build
```

### AI Development Assistance

This theme includes a `CLAUDE.md` file with comprehensive development guidance specifically designed for AI assistants like Claude Code. This file provides:

- Theme-specific development commands and workflows
- Block development patterns using `imagewize/sage-native-block`
- Code quality standards and conventions
- Architecture overview and common tasks

The `CLAUDE.md` file serves both as AI guidance and general developer documentation for anyone working with the theme.

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

## Browser Support

- Latest versions of Chrome, Firefox, Safari, and Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Credits

- [Sage](https://roots.io/sage/) by Roots
- [Tailwind CSS](https://tailwindcss.com/)
- [Laravel](https://laravel.com/)
- [Vite](https://vitejs.dev/)
