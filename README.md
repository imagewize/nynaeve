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

- Custom product archive views
- Enhanced single product page
- Custom gallery with thumbnail navigation
- Styled checkout and cart process
- Responsive product grids

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

## Patterns

Nynaeve includes several custom block patterns to quickly build common page sections:

- **Pricing Table** (`nynaeve/pricing-table`): A comparison of website packages with pricing and feature details in a two-column layout.
- **Modern Pricing Table** (`nynaeve/modern-pricing-table`): An alternative, modern style for the pricing table comparison.
- **FAQ Section** (`nynaeve/faq-section`): A collapsible FAQ section with common questions and answers.

These patterns can be inserted via the block editor.

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

## Customization

The theme can be customized through:

- `theme.json` - WordPress theme settings
- `resources/css/app.css` - Tailwind CSS configuration
- `resources/views/` - Blade templates
- `app/` - PHP functionality

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
