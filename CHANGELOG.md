# Changelog

All notable changes to this theme will be documented in this file.

## [Unreleased]

## [1.13.2] - 2025-09-28

### Fixed
- Fixed anchor link navigation for child menu items - submenu items with anchor links (like #reviews under Clients) now properly navigate to homepage anchors from sub-pages

## [1.13.1] - 2025-07-29

### Fixed
- Removed hard redirects from quote mode to allow users to view all WooCommerce pages with quote buttons
- Fixed quote button text color to display white (#fff) instead of blue, matching add-to-cart button styling

### Changed
- Quote mode now allows cart, checkout, and account pages to load while maintaining disabled purchasing functionality

## [1.13.0] - 2025-07-29

### Added
- WooCommerce mode options in Theme Options page with three modes:
  - Quote Mode: Hide prices and add-to-cart, show "Request Quote" button (default)
  - Standard Mode: Normal WooCommerce functionality with cart and checkout
  - Catalog Mode: Show prices but hide add-to-cart buttons
- ACF Composer field group for theme options configuration
- Theme Options page in WordPress admin for configurable WooCommerce behavior

### Changed
- WooCommerce customizations now conditional based on selected mode instead of hardcoded
- Updated CLAUDE.md with Trellis VM usage instructions for Acorn commands
- Enhanced documentation for ACF Composer vs ACF UI workflows

## [1.12.0] - 2025-07-29

### Added
- CLAUDE.md file with comprehensive theme-specific development guidance for AI assistance
- Documentation for imagewize/sage-native-block package usage and block development workflow
- Developer onboarding instructions and code quality guidelines

## [1.11.0] - 2025-07-25

### Added
- Smart tag filtering system for related-articles block with specificity scoring
- Configuration options for tag filtering (`maxCommonThreshold`, `maxTagsToUse`)
- Container query support for related-articles block responsiveness
- Debug logging for tag selection process
- Title alignment controls (left/center/right) for related-articles block
- Header level options (H1-H5) for related-articles block title
- Spacing controls (margin/padding) for related-articles block

### Changed
- Added `content` and `sidebar` classes to content-single.blade.php for better CSS targeting and layout clarity
- Improved related-articles block responsiveness to properly fit within content and sidebar containers
- Updated related-articles grid to use container queries for better responsive behavior
- Reduced grid gap from 2rem to 1.5rem for better spacing on smaller containers
- Added fallback styles for browsers without container query support
- Increased main container width from `max-w-5xl` to `max-w-7xl` for wider layout on large screens
- Changed grid layout from 3-column (2:1 ratio) to 4-column (2:2 ratio) giving sidebar equal width to content
- Sidebar now spans 2 columns instead of 1, allowing related articles to display in 2 columns
- Related-articles block now prioritizes specific tags over common ones for more relevant results
- Removed hardcoded center alignment from related-articles title to allow user customization
- Related-articles block now defaults to zero top padding for better spacing control

### Fixed
- Fixed related-articles block ignoring parent container constraints when resizing browser window
- Related articles now properly adapt column count based on available container width rather than viewport width
- Improved tag-based article matching to avoid overly generic results