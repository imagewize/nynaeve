# Changelog

All notable changes to this theme will be documented in this file.

## [1.16.0] - 2025-10-02

### Added
- **Carousel Block**: Converted `imagewize/carousel-block` plugin to Sage Native Blocks
  - Two-block system: `imagewize/carousel` (parent) and `imagewize/slide` (child)
  - 18 configurable attributes: slides to show/scroll, arrows, dots, autoplay, speed, responsive breakpoints
  - Arrow and dot color customization with hover states
  - RTL support and infinite loop options
  - Slick Carousel library (v1.8.1) integrated into theme at `resources/vendor/slick/`
  - Custom render callback in `app/setup.php` to enqueue Slick assets on demand
  - InnerBlocks support in slide blocks for flexible content
  - Editor styles with horizontal scroll preview
  - Supports wide and full width alignments
- Documentation: `docs/CAROUSEL-PATCH.md` - Database migration guide for carousel block conversion
- Installed `classnames` npm package for block styling utilities

### Changed
- **Database Migration**: Updated 1,038 carousel block instances from `cb/carousel` to `imagewize/carousel`
  - Migrated block names, CSS classes, and all attributes
  - Preserved all block settings and configurations
  - 107MB database backup created before migration
- Removed `imagewize/carousel-block` plugin dependency via Composer
- Updated CLAUDE.md with Trellis VM database operation notes for local MariaDB conflicts

### Technical Details
- Block names: `cb/carousel` → `imagewize/carousel`, `cb/slide` → `imagewize/slide`
- CSS classes: `wp-block-cb-carousel` → `wp-block-imagewize-carousel`
- Database replacements: ~4,150 total updates across wp_posts table
- Slick library enqueued only when carousel block is present on page

## [1.15.2] - 2025-10-02

### Fixed
- **Tailwind Text Color Conflicts**: Resolved conflicts between Tailwind's default `text-gray-*` utilities and custom color variables
  - Replaced `@apply text-gray-900` with explicit `color: var(--color-main)` in form inputs, product details, and comment forms
  - Replaced `@apply text-gray-500` with `color: var(--color-main-accent)` in product short descriptions
  - Replaced `placeholder:text-gray-900` with explicit `::placeholder` selector using `color: var(--color-main)`
  - Updated paragraph styling in `.e-content` to use `color: var(--color-secondary)` instead of `@apply text-secondary`
  - Ensures consistent color rendering by avoiding conflicts between Tailwind utilities and CSS custom properties

## [1.15.1] - 2025-10-01

### Changed
- **Color Palette Refactor**: Updated Tailwind color system to use semantic naming
  - Replaced descriptive color names (ash-gray, sky-blue, etc.) with semantic names (primary, secondary, main, etc.)
  - New colors: `primary`, `primary-accent`, `primary-dark`, `main`, `main-accent`, `base`, `secondary`, `tertiary`, `border-light`, `border-dark`
  - Improved color system clarity and maintainability matching theme.json structure
  - Updated CLAUDE.md documentation with complete color palette reference
- **Navigation Styling**: All header navigation menu items now display in uppercase for improved visual hierarchy

## [1.15.0] - 2025-09-30

### Added
- **Content Image Text Card Block**: Converted from Moiraine pattern to Sage Native Block
  - Initially implemented as ACF Composer block, then converted to React/JavaScript native block
  - **ARCHITECTURE UPGRADE**: Converted from custom controls to InnerBlocks approach for better UX
  - Features: Native WordPress blocks (Image, Heading, Paragraph, Button) within card container
  - **Clean Sidebar**: No inspector controls - all editing done directly in editor with native block toolbars
  - **Modular Design**: Each component (image, heading, paragraph, buttons) maintains its own WordPress settings
  - Template structure with predefined layout: Image → Content Group → Button Group
  - Template lock maintains structure while allowing full content editing
  - **Flexible button styling** - users select styles via block toolbar (no hardcoded classes)
  - Supports color, spacing, and alignment controls (wide, full) via WordPress native systems
  - Default placeholder content for immediate preview
- **Button Style Variants System**: Added comprehensive button styling matching Moiraine patterns
  - **Button Filter**: Enhanced WordPress button block with 5 style variants (Default, Outline, Secondary, Light, Dark)
  - **CSS Styling**: Complete button variant system with hover states and x-small font size support
  - **Theme-wide Integration**: Button styles available across all WordPress button blocks
  - **Moiraine Compatibility**: Button sizes and styling match original Moiraine patterns exactly
  - **Namespace Consistency**: Updated filter name from 'sage/button' to 'imagewize/button'
- Documentation: `docs/PATTERN-TO-NATIVE-BLOCK.md` - Guide for converting patterns to native blocks
  - **NEW SECTION**: InnerBlocks vs Custom Controls architecture guidance
  - Comprehensive comparison of approaches with implementation examples
  - Updated conversion checklist with decision framework
  - CSS best practices for styling native WordPress blocks
  - Button styling via WordPress filters and user-selectable style variants
  - **Documentation Improvements**: Updated sample code to use generic 'placeholder.jpg' instead of specific laptop image
- Enhanced CLAUDE.md with block development workflow and Trellis VM instructions
- Created `/archive` directory with archived ACF Composer version of the block

### Changed
- Block architecture: ACF Composer → Custom Controls → **InnerBlocks (PREFERRED)** for maximum flexibility and native UX
- **Content Image Text Card Block Implementation**:
  - Removed all custom attributes except `className` from `block.json`
  - Replaced custom RichText and MediaUpload controls with native WordPress blocks
  - Simplified `save.jsx` to only render `<InnerBlocks.Content />`
  - Updated CSS to target native WordPress blocks (`.wp-block-image`, `.wp-block-heading`, etc.)
  - Editor now uses template-based structure with `templateLock: "all"`
  - **Removed hardcoded button classes from template** - buttons now use default WordPress styling
  - **Users can now select button styles via block toolbar** - full flexibility without code changes
  - **Users can change button font sizes via inspector panel** - native WordPress typography controls
- **CSS Structure**: Updated main stylesheet table of contents to include new Button Style Variants section
- **Button Styling**: Added border reset (`.wp-block-button .wp-block-button__link { border: none; }`) to prevent double borders from WordPress default styles
- Enhanced documentation with Trellis VM development notes and best practices
- **CLAUDE.md Updates**:
  - Added comprehensive Table of Contents for easier navigation
  - Added "Block Development Philosophy" section emphasizing InnerBlocks approach and user control
  - Reorganized block types by priority: InnerBlocks (MOST PREFERRED) → Custom Controls (Use Sparingly) → ACF Composer (Special Cases Only)
  - Added code examples showing InnerBlocks template structure without hardcoded classes
  - Clarified when to use ACF Composer blocks (rigid editing, repeaters, CSS reordering)
  - Added button filter documentation and available style variants
  - Removed duplicate "Block Development" section and consolidated content
  - Updated "Common Tasks" to emphasize InnerBlocks workflow
- **Documentation Updates**:
  - Added InnerBlocks architecture section with benefits and implementation examples
  - Updated conversion checklist with two clear paths: InnerBlocks vs Custom Controls
  - Enhanced CSS guidelines for styling native blocks within containers
  - Three-way comparison table: ACF Composer vs Custom Controls vs InnerBlocks

### Fixed
- Block textdomain from 'sage' to 'imagewize' for proper translations
- Missing `className` attribute and placeholder image display issues
- Button rendering when URLs are empty (now defaults to '#')
- Missing `@wordpress/icons` dependency
- **InnerBlocks Implementation**: Eliminated need for custom fallback values and complex attribute management
- **Editor Experience**: Simplified block editing with native WordPress controls instead of sidebar inspector panels
- **Button Sizing**: Fixed button sizing inconsistency with Moiraine patterns by implementing proper style variants and x-small font classes

## [1.14.0] - 2025-09-30

### Changed
- **BREAKING**: Removed Tailwind container wrapper from page templates to adopt WordPress native layout system
- Page templates now let WordPress blocks self-manage layout via `is-layout-constrained` classes
- Removed custom `.alignfull` CSS - WordPress core now handles full-width blocks natively
- Updated `page.blade.php` to remove `container mx-auto px-4 max-w-contentSize` wrapper
- Updated `content-page.blade.php` to remove `.page-container` wrapper
- Removed `.page-container` references from link styling CSS

### Fixed
- Fixed `.alignfull` blocks not spanning full viewport width on pages with WordPress constrained layouts
- Eliminated horizontal scrollbar issues by adopting WordPress's native block layout system
- Full-width blocks now work correctly without custom viewport-width CSS hacks

### Technical Details
- WordPress blocks with `is-layout-constrained` automatically center at `contentSize` (880px from theme.json)
- `.alignfull` blocks automatically span full viewport via WordPress core CSS
- No more double-wrapping (Tailwind container + WordPress layout)
- Aligns with modern block themes like Ollie that don't wrap post content in theme containers

## [1.13.5] - 2025-09-30

### Fixed
- Fixed horizontal scrollbar issue caused by alignfull blocks and Slick carousel using 100vw which includes scrollbar width
- Improved alignfull CSS to use percentage-based margins (-50%) instead of viewport-based (-50vw) to avoid scrollbar width issues
- Added max-width: 100vw constraint to alignfull blocks for proper self-containment
- Added overflow-x: hidden to html/body specifically for Slick carousel infinite scroll track

## [1.13.4] - 2025-09-29

### Fixed
- Implemented WordPress-native spacing for alignfull elements using padding-inline and WordPress spacing variables - ensures proper mobile readability while following WordPress standards and avoiding conflicts with constrained layouts
- Removed problematic CSS rules that were hiding content with legacy color classes using display: none - content with old color classes now falls back to default styling instead of disappearing

## [1.13.3] - 2025-09-29

### Fixed
- Fixed alignfull elements not breaking out of Tailwind container constraints - full-width blocks now properly span the entire viewport width

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