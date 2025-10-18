<div align="center">
  <img src="resources/images/nynaeve-logo-primary.svg" alt="Nynaeve Theme" width="120" height="120">

  # Nynaeve
</div>
<div align="center">
Design better, build faster, deliver results. Nynaeve is a modern WordPress theme built on Sage 11 with reusable custom blocks using WordPress native tools and the Roots.io stack.
</div>

## What We Do

- **Custom Block Development**: Reusable, professional blocks built with WordPress native tools
- **E-Commerce Solutions**: WooCommerce integration with flexible quote-based systems
- **Performance First**: Optimized for Core Web Vitals with modern build tools
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Developer Friendly**: Built on Sage 11 and Acorn (Laravel for WordPress)

## Features

- **12 Professional Custom Blocks** - Hero banners, content layouts, pricing tables, carousels, and more
- **InnerBlocks Architecture** - Built with native WordPress blocks for maximum flexibility
- **Modern Build Tools** - Vite with HMR, Tailwind CSS 4, Laravel Blade templates
- **WooCommerce Ready** - Quote mode, catalog mode, or standard e-commerce
- **Fully Customizable** - No hardcoded styles, all styling via WordPress block toolbar
- **Production Ready** - Semantic HTML, accessible, responsive by default

## Requirements

- WordPress 6.6 or later
- PHP 8.2 or later
- Node.js 16 or later
- Composer

## Quick Start

```bash
# Navigate to theme directory
cd site/web/app/themes/nynaeve

# Install dependencies
composer install && npm install

# Start development server with HMR
npm run dev

# Build for production
npm run build
```

## Documentation

| Resource | Description |
| --- | --- |
| [Developer Guide](docs/DEV.md) | Development commands, architecture, and workflows |
| [Blocks Overview](docs/BLOCKS.md) | Complete block library with usage examples |
| [WooCommerce Integration](docs/WOOCOMMERCE.md) | Quote mode, catalog mode, and configuration |
| [Pattern to Block Guide](docs/PATTERN-TO-NATIVE-BLOCK.md) | Convert patterns to native blocks |
| [CLAUDE.md](CLAUDE.md) | AI assistant guidance and project context |
| [CHANGELOG.md](CHANGELOG.md) | Version history and updates |

## Technical Stack

- **Sage 11** - Modern WordPress theme framework
- **Acorn 5** - Laravel-powered framework for WordPress
- **Vite** - Lightning-fast build tool with HMR
- **Tailwind CSS 4** - Utility-first CSS with custom design system
- **Laravel Blade** - Powerful templating engine
- **React/JavaScript** - Custom blocks using `imagewize/sage-native-block` package

## Browser Support

Latest versions of Chrome, Firefox, Safari, and Edge

## License

MIT

## Credits

- [Sage](https://roots.io/sage/) by Roots
- [Tailwind CSS](https://tailwindcss.com/)
- [Laravel](https://laravel.com/)
- [Vite](https://vitejs.dev/)

## Design Credits

- **Flower Icon**: Adapted from [Remix Icon](https://remixicon.com/) via [Blade UI Kit](https://blade-ui-kit.com/blade-icons/ri-flower-fill)
  - Original: `ri-flower-fill` by Remix Icon (Apache 2.0 License)
  - Colors customized to Nynaeve theme palette (#017cb6 primary blue)
- **Laptop Photo**: Photo by [Joshua Ng](https://unsplash.com/@notsurewhyinamedmyselfthiss) on [Unsplash](https://unsplash.com/photos/macbook-pro-turned-on-displaying-red-blue-and-yellow-lights-1sSfrozgiFk)
