# Changelog

All notable changes to the Nynaeve theme will be documented in this file.

For project-wide changes (infrastructure, tooling, cross-cutting concerns), see the [project root CHANGELOG.md](../../../../../CHANGELOG.md).

## [1.23.0] - 2025-10-20

### Changed
- **CTA Columns Block**: Major visual redesign following Ollie/Moiraine patterns (`imagewize/cta-columns`)
  - Changed card backgrounds from white to primary blue for maximum visual impact
  - Updated typography to white headings and light text for dark backgrounds
  - Changed buttons to white background with blue text for better contrast
  - Removed card borders (not needed with strong background colors)
  - Added decorative separator lines between heading and description
  - Increased card padding from 2.8125rem to 3rem for more generous spacing
  - Increased heading size from xl to 2-xl and weight to 700 for better readability
  - Increased body text size from base to lg for improved legibility
  - Increased gap between cards from 1.875rem to 2rem
  - Added new "Light Gray" section background variant
  - Updated InspectorControls with clearer descriptions
  - Updated default content with realistic CTA examples:
    - Card 1: "Get Your Free Speed Audit" with "Get Free Audit" button
    - Card 2: "Talk to a Speed Expert" with "Schedule Call" button
  - Complete design analysis in `docs/blocks/CTA-COLUMNS-CARD.md`

## [1.22.0] - 2025-10-19

### Added
- **CTA Columns Block**: New dedicated dual call-to-action block (`imagewize/cta-columns`)
  - Simplified version of multi-column-content focused solely on CTA cards
  - Two side-by-side cards with headings, descriptions, and buttons
  - Optional section heading and description
  - Responsive design (stacks on mobile, side-by-side on desktop)
  - InspectorControls for easy background color switching
  - Reusable across service pages for consistent CTAs
  - Clean, focused template without statistics or benefits sections
  - Complete documentation in `docs/CTA-COLUMNS-BLOCK-PLAN.md`

## [1.21.1] - 2025-10-19

### Changed
- **Git Ignore**: Added `create-pr.sh` to `.gitignore` to exclude PR creation script from version control

## [1.21.0] - 2025-10-18

### Added
- **Feature List Grid Block**: New grid layout block for feature showcases (`imagewize/feature-list-grid`)
  - Responsive grid layout with configurable columns (2-4 columns)
  - InnerBlocks structure using native WordPress blocks (Heading, Paragraph, Image)
  - Template with default feature content for immediate preview
  - Automatic responsive stacking on mobile devices
  - Icon/image support for visual feature representation
  - Full control via native block toolbar
  - Supports wide and full width alignments
  - Tertiary background with constrained content width
- **Testimonial Grid Block**: Professional testimonial slider/grid (`imagewize/testimonial-grid`)
  - Slick Carousel integration for smooth testimonial rotation
  - Configurable layout: grid or slider mode
  - Individual testimonial cards with quote styling
  - Author information with optional company/role
  - Custom arrow navigation with SVG icons (arrow-left.svg, arrow-right.svg)
  - Dot navigation with customizable positioning
  - Autoplay, infinite loop, and speed controls
  - Responsive breakpoints for mobile optimization
  - Full-width background support with content constraints
  - InnerBlocks approach for flexible testimonial management
- **Custom Arrow SVG Assets**: Added professional arrow graphics for sliders
  - `resources/images/arrow-left.svg` - Left navigation arrow
  - `resources/images/arrow-right.svg` - Right navigation arrow
  - Consistent styling with theme design system
  - Used in Testimonial Grid block navigation
- **Comprehensive Documentation Updates**:
  - Created `docs/PAGE-STYLE-GUIDE.md` (1,083 lines) - Complete visual design guide
  - Created `docs/blocks/TESTIMONIALS-BLOCK.md` - Testimonial Grid implementation guide
  - Reorganized block documentation into `docs/blocks/` subdirectory
  - Added GitHub Copilot instructions (`.github/copilot-instructions.md`)
- **Sage Native Block Configuration**: New config file for block scaffolding
  - `config/sage-native-block.php` (145 lines) - Block generation templates and settings
  - Template system for rapid block development
  - Category and namespace configuration

### Changed
- **Documentation Restructure**: Organized block documentation for better discoverability
  - Moved all block-specific docs to `docs/blocks/` subdirectory
  - `CAROUSEL-PATCH.md` → `docs/blocks/CAROUSEL-PATCH.md`
  - `MULTI-COLUMN-CONTENT-BLOCK.md` → `docs/blocks/MULTI-COLUMN-CONTENT-BLOCK.md`
  - `MULTI-COLUMN-PRICING-TABLE.md` → `docs/blocks/MULTI-COLUMN-PRICING-TABLE.md`
  - `PAGE-HEADING-BLUE-BLOCK.md` → `docs/blocks/PAGE-HEADING-BLUE-BLOCK.md`
  - `TWO-COLUMN-CARD.md` → `docs/blocks/TWO-COLUMN-CARD.md`
  - Maintained backward compatibility with clear directory structure
- **Block Configuration Updates**: Updated category in existing blocks
  - Multi-Column Content block: Updated `block.json` category to "imagewize"
  - Page Heading Blue block: Updated `block.json` category to "imagewize"
  - Two Column Card block: Updated `block.json` category to "imagewize"
- **Testimonial Slider Improvements**: Multiple iterations of styling and functionality
  - Slick slider dots positioning optimized for mobile and desktop
  - Card spacing improvements for better visual hierarchy
  - Arrow button styling with circular backgrounds and hover effects
  - Full-width background implementation with proper content constraints
  - Navigation arrows with SVG graphics and positioned cut-outs
  - Mobile-specific dots positioning patch
  - Improved contrast and readability for testimonial content
- **Navigation Component**: Fixed navigation menu implementation
  - Resolved navigation rendering issues
  - Improved mobile responsiveness
  - Enhanced accessibility and keyboard navigation
- **Typography Improvements**: Enhanced heading hierarchy for better visual structure
  - H2: Increased from `xl (1.25rem)` to `3xl (1.875rem)` - 50% larger
  - H3: Increased from `lg (1.125rem)` to `2xl (1.5rem)` - 33% larger
  - H2 line-height: Improved from `1.2` to `1.3` for better readability
  - H3 line-height: Improved from `1.3` to `1.4` for better readability
- **Text Color Contrast**: Improved paragraph and list readability
  - Paragraphs: Changed from `secondary (#98999a)` to `main-accent (#465166)` - darker, more readable
  - List items: Changed from `secondary (#98999a)` to `main-accent (#465166)` - matches paragraph color
  - Content paragraphs (`.e-content p`): Updated to use `main-accent` for consistency
  - All changes improve contrast ratio against white/light backgrounds
- **Theme Branding**: Updated references from "Imagewize" to "Imagewize" throughout
  - Consistent brand name usage across documentation and code
- **Composer Dependencies**: Updated package versions
  - 12 lines changed in composer.lock reflecting dependency updates
- **CLAUDE.md Updates**: Enhanced documentation for better AI assistance
  - Updated block development guidelines
  - Added new block examples and usage patterns
  - Improved command reference and workflows
- **README.md**: Updated theme description and feature highlights

### Fixed
- **Testimonial Slider Issues**: Resolved multiple slider rendering and styling problems
  - Fixed arrow button positioning and visibility
  - Corrected dot navigation alignment on mobile devices
  - Fixed background color not extending full width
  - Resolved card spacing inconsistencies
  - Fixed responsive breakpoint issues
- **Navigation Component**: Resolved navigation menu rendering bugs
  - Fixed mobile menu toggle functionality
  - Corrected menu item alignment and spacing

### Impact
- **Two new production-ready custom blocks** for enhanced content layouts
- **Improved documentation structure** for easier navigation and maintenance
- **Better visual hierarchy** across all pages with typography improvements
- **Enhanced testimonial presentation** with professional slider implementation
- **Streamlined block development** with new configuration system
- Section headings now have significantly stronger visual hierarchy
- Body text is more readable with improved color contrast
- More professional, modern appearance across all pages
- Comprehensive style guide enables consistent design implementation

## [1.20.2] - 2025-10-16

### Changed
- **Documentation Restructure**: Reorganized README.md and created dedicated documentation files
  - README.md now concise and user-focused (~90 lines, down from 330+)
  - Created [docs/DEV.md](docs/DEV.md) - Complete developer guide with commands, architecture, and workflows
  - Created [docs/BLOCKS.md](docs/BLOCKS.md) - Comprehensive block library with usage examples for all 10 custom blocks
  - Created [docs/WOOCOMMERCE.md](docs/WOOCOMMERCE.md) - WooCommerce integration guide covering Quote/Standard/Catalog modes
  - Documentation structure inspired by Ollie theme for improved discoverability and user experience
  - All detailed technical information preserved in well-organized, dedicated documentation files

## [1.20.1] - 2025-10-16

### Changed
- **Sage Native Block Package**: Upgraded from v1.0.0-beta.1 to v2.0.0
  - **Change**: Command changed from `wp acorn sage-native-block:add-setup` to `wp acorn sage-native-block:create`
  - Interactive template selection system with hierarchical categories
  - Four template types: Basic Block, Generic Templates, Theme-Specific Templates (Nynaeve), Custom Templates
  - Generic templates include: InnerBlocks container, two-column layouts, statistics sections, CTAs
  - Custom template support via `block-templates/` directory (auto-detected, no configuration needed)
  - UX improvements for faster block scaffolding (80% faster than manual creation)
- **Dependency Updates**: Updated 69 Composer packages
  - Laravel/Illuminate packages: v12.11.0 → v12.34.0 (23 packages)
  - Symfony components: v7.2.x → v7.3.x (20 packages)
  - Added PHP 8.4 and 8.5 polyfills (symfony/polyfill-php84, symfony/polyfill-php85)
  - Guzzle HTTP client: 7.9.3 → 7.10.0
  - Laravel Pint: v1.22.0 → v1.25.1
  - ACF Composer: v3.4.3 → v3.4.4
  - WordPress stubs: v6.8.0 → v6.8.2
  - WooCommerce stubs: v9.8.2 → v9.9.5
  - Carbon date library: 3.9.0 → 3.10.3
  - Brick Math: 0.12.3 → 0.14.0

## [1.20.0] - 2025-10-15

### Added
- **Multi-Column Content Block**: Statistics and CTA section (`imagewize/multi-column-content`)
  - Six-section layout: main heading, statistics (2 cols), center heading, subheading, CTAs (2 cols), benefits (3 cols)
  - Individual white card backgrounds for statistics and CTA columns with borders and rounded corners
  - InnerBlocks approach using native WordPress blocks (Columns, Heading, Paragraph, Button)
  - Checkmark icons for benefits section using theme SVG via CSS pseudo-elements
  - All typography editable via block toolbar with theme.json integration
  - Responsive design: columns stack on mobile (≤782px)
  - Tertiary background with constrained content width (1040px max-width)
  - Template with default maintenance service content
- **Universal Button Hover State**: Added theme-wide button hover effects
  - Applies to all button styles including `is-style-fill` and default buttons
  - Effects: darkens button (brightness filter), subtle lift (translateY), shadow depth
  - Smooth 200ms transition for professional interaction feedback
- Documentation: `docs/MULTI-COLUMN-CONTENT-BLOCK.md` - Complete 787+ line implementation guide
- **CLAUDE.md Updates**: Added button styling best practices for InnerBlocks
  - Documented that WordPress doesn't reliably apply className to individual button links
  - Added correct approach using className on buttons container with child selectors

### Changed
- Multi-Column Content block structure updated to use individual column cards instead of Group wrappers
- Button styling approach revised to target containers rather than individual buttons

## [1.19.0] - 2025-10-13

### Added
- **Two Column Card Block**: Professional card grid layout (`imagewize/two-column-card`)
  - Main section heading (H3) above responsive card grid
  - Two-column layout using WordPress native Columns block (50/50 split)
  - InnerBlocks structure with core WordPress blocks (Group, Heading, Paragraph)
  - Automatic responsive stacking: 2 columns on desktop → 1 column on mobile at 782px breakpoint
  - Elegant card styling: white background, light borders, decorative heading underlines
  - Template with 4 default cards (2 per column) with real, publishable content
  - All typography editable via block toolbar (font family, size, color, weight, alignment)
  - Tint background (#f5f5f6) with constrained content width (65rem/1040px)
  - Card styling: 45px×40px padding, 8px border-radius, 1px border
  - Decorative heading underline: 50px × 2px, border-dark color
  - Template unlocked for adding/removing cards as needed
  - Supports anchor ID, margin, padding, and background color controls
  - Wide alignment by default with full alignment option
  - Responsive padding: 60px desktop → 40px mobile
  - Typography: Montserrat headings (3xl main, xl cards), Open Sans paragraphs (base)
  - Color palette: tertiary background, base cards, contrast headings, base-accent text
- **Custom Block Category**: Registered "Imagewize" block category in WordPress editor
  - All custom blocks now appear under dedicated category
  - Implemented via `block_categories_all` filter in `app/setup.php`
- Documentation: `docs/TWO-COLUMN-CARD.md` - Complete implementation guide for Two Column Card block
  - Comprehensive 750+ line guide covering implementation, usage, and best practices
  - InnerBlocks architecture with WordPress Columns block approach
  - Block toolbar editing instructions for all typography controls
  - Card management guide (add/remove/duplicate)
  - Responsive design specifications and testing checklist
  - Troubleshooting section and related documentation links
- Documentation: `docs/two-column-cards.html` - Standalone HTML prototype for design reference

### Changed
- **CLAUDE.md Updates**:
  - Added "Block Standards" section with block.json requirements
  - Emphasized use of `"category": "imagewize"` for all custom blocks
  - Emphasized use of `"textdomain": "imagewize"` (NOT "sage") for translation consistency
  - Added example block.json configuration with proper category and textdomain
  - Updated block development guidelines with category registration context
- **Page Heading Blue Block**: Updated heading level from H2 to H3 in documentation
  - Maintains proper heading hierarchy (H2 for main sections, H3 for subsections)
  - Updated `docs/PAGE-HEADING-BLUE-BLOCK.md` template example

## [1.18.2] - 2025-10-11

### Fixed
- **Security**: Fixed moderate severity vulnerability in @babel/runtime (inefficient RegExp complexity)
  - Added npm overrides to force @babel/runtime ^7.26.10 for all dependencies
  - Resolves CVE affecting @wordpress/icons, @wordpress/element, @wordpress/primitives, @wordpress/escape-html
  - Updated all devDependencies to latest compatible versions via npm update

### Changed
- Updated package dependencies: @roots/vite-plugin (1.0.3→1.2.1), @tailwindcss/vite (4.0.14→4.1.14), tailwindcss (4.0.14→4.1.14), laravel-vite-plugin (1.2.0→1.3.0)

## [1.18.1] - 2025-10-11

### Changed
- **README.md Updates**:
  - Updated custom blocks count from 7 to 8 blocks
  - Added new "Hero & Banner Blocks" section featuring Page Heading Blue block
  - Added Page Heading Blue documentation link to Quick Start table
  - Added usage example for Page Heading Blue block with step-by-step guide

## [1.18.0] - 2025-10-11

### Added
- **Page Heading Blue Block**: New full-width gradient banner block (`imagewize/page-heading-blue`)
  - Blue gradient background using theme colors (primary to primary-dark)
  - Subtle radial gradient pattern overlay with primary-accent color
  - InnerBlocks structure with core WordPress blocks (Paragraph, Heading)
  - Template lock maintains consistent structure while allowing full content editing
  - Default content: tagline (Montserrat, uppercase), H2 heading (Montserrat, 5xl), intro paragraph (Open Sans)
  - Full-width alignment (alignfull) with content constrained to 55rem
  - All typography editable via block toolbar using theme.json values
  - Responsive padding: 5rem desktop → 4rem tablet → 3rem mobile
  - Supports anchor ID and margin controls
- Documentation: `docs/PAGE-HEADING-BLUE-BLOCK.md` - Complete implementation guide for Page Heading Blue block

### Changed
- **CLAUDE.md Updates**:
  - Enhanced InnerBlocks template guidance with real content vs placeholder examples
  - Added section emphasizing use of real, publishable content in block templates
  - Updated example code to show actual content instead of generic placeholders
  - Clarified frontend testing benefits of using real content from the start

## [1.17.1] - 2025-10-03

### Added
- **Theme Logo**: New flower icon (Nynaeve logo) in multiple color variants
  - `resources/images/nynaeve-logo-primary.svg` - Primary blue (#017cb6)
  - `resources/images/nynaeve-logo-white.svg` - White (#ffffff) for dark backgrounds
  - `resources/images/nynaeve-logo-dark.svg` - Dark (#171b23) for light backgrounds
  - `resources/images/nynaeve-logo-outline.svg` - Outline version in primary blue
  - Adapted from Remix Icon's `ri-flower-fill` with theme color palette

### Changed
- **README.md**: Complete rewrite following Ollie theme structure
  - User-focused content showcasing custom blocks and features
  - Centered logo with theme branding
  - Clear sections: What We Do, Custom Blocks Library, Installation, Usage Examples
  - Developer documentation with practical commands and workflows
  - Proper design credits for Remix Icon flower logo and Joshua Ng laptop photo
  - No emoticons - professional appearance

## [1.17.0] - 2025-10-03

### Added
- **Pricing Tiers Block**: Three-column pricing comparison table (`imagewize/pricing-tiers`)
  - Professional pricing table with visual hierarchy for featured tier
  - Three-column layout: Basic (white) → Featured (primary-accent blue) → Premium (white)
  - Featured center column with subtle blue background (#e6f4fb) and primary border emphasis
  - Professional checkmark SVG icons adapted from Moiraine (primary blue #017cb6)
  - Hover effects: columns lift on hover with enhanced shadow
  - Featured column slightly elevated by default to draw attention
  - InnerBlocks structure using core WordPress blocks (columns, headings, paragraphs, images, buttons)
  - Full user control via native block toolbar and inspector
  - Responsive design: stacks vertically on mobile devices
  - Supports wide and full width alignments
  - Optional "Most Popular" badge styling for featured tier
  - Dotted separator lines between features for visual organization
  - Full-width buttons within each pricing tier
  - Checkmark assets: `resources/images/checkmark.svg` (primary blue variant)
- Documentation: `docs/MULTI-COLUMN-PRICING-TABLE.md` - Complete implementation guide for pricing tiers block

### Changed
- Enhanced pricing block collection with multi-tier comparison option
- Color palette effectively utilized: primary-accent background for subtle featured tier emphasis
- Visual hierarchy improved from high-contrast (white/black) to subtle professional styling

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