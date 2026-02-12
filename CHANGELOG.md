# Changelog

All notable changes to the Nynaeve theme will be documented in this file.

For project-wide changes (infrastructure, tooling, cross-cutting concerns), see the [project root CHANGELOG.md](../../../../../CHANGELOG.md).

## [2.0.30] - 2026-02-12

### Fixed
- **CTA Block Blue**: Fixed critical button styling and hover effect bugs introduced in v2.0.29
  - **Root cause**: January 30 refactor removed `has-hover-background` hover styles from CSS but JavaScript still generates those classes
  - **Button text color locked**: Removed `!important` flags that prevented WordPress color picker from working
  - **Text color inheritance**: Changed forced white color to `color: inherit` allowing WordPress controls to work
  - **Missing frontend hover styles**: Re-added `.has-hover-background` styles to `style.css` (were only in `editor.css`)
  - **Custom hover colors now work**: Button hover backgrounds respect editor-configured colors on frontend
  - **Impact**: Button text colors are fully editable, custom hover effects display correctly, WordPress color controls work as expected
  - Files modified:
    - [style.css](resources/js/blocks/cta-block-blue/style.css) - Removed `!important`, restored hover styles, fixed color inheritance

### Changed
- **Pricing Block**: Converted from Columns layout to Grid layout for proper responsive behavior
  - Changed from `core/columns` to `core/group` with `layout: { type: 'grid', minimumColumnWidth: '19rem' }`
  - **Why**: Columns block goes 3→3→1 (cramped on tablets), Grid goes 3→2→1 (proper responsive breakpoints)
  - Complex pricing cards with nested content need 19rem minimum to prevent excessive whitespace on desktop
  - Automatic responsive adjustment: 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
  - Updated CSS to support grid layout: changed selectors from `.wp-block-column` to `.is-layout-grid > .wp-block-group`
  - Added flexbox rules to ensure cards fill height and buttons stick to bottom of each card
  - Follows grid layout standards documented in `docs/elayne/GRID-LAYOUT-STANDARDS.md`
  - Files modified:
    - [editor.jsx](resources/js/blocks/pricing/editor.jsx) - Columns to Grid conversion with minimumColumnWidth
    - [style.css](resources/js/blocks/pricing/style.css) - Updated selectors for grid layout, card height management

## [2.0.29] - 2026-01-30

### Changed
- **Color System Refactor**: Migrated from Tailwind default colors to theme-only colors
  - Changed Tailwind config to replace default colors instead of extending them
  - Set `disableTailwindColors: true` in Vite config to prevent Tailwind defaults in theme.json
  - Enabled custom color picker in theme.json (`color.custom: true`)
  - **Impact**: Color picker now shows only theme colors, eliminating 140+ unused Tailwind defaults

- **CTA Block Blue**: Updated to use semantic theme colors instead of hardcoded Tailwind colors
  - Background color: `sky-600` → `primary`
  - Text color: `white` → `base`
  - Button background: `sky-700` → `primary-dark`
  - Added explicit color CSS variables to block template for better color inheritance
  - Added comprehensive text color rules to ensure all headings and paragraphs display in white
  - Simplified button hover effect using `filter: brightness(0.85)` for consistency
  - Removed custom `has-hover-background` class in favor of universal hover behavior
  - Files modified:
    - [block.json](resources/js/blocks/cta-block-blue/block.json#L39) - Default background color
    - [editor.jsx](resources/js/blocks/cta-block-blue/editor.jsx) - Template colors with CSS variables
    - [style.css](resources/js/blocks/cta-block-blue/style.css) - Text color inheritance and button hover
    - [tailwind.config.js](tailwind.config.js#L18-L33) - Color system refactor
    - [theme.json](theme.json#L57) - Enable custom color picker
    - [vite.config.js](vite.config.js#L25) - Disable Tailwind default colors

## [2.0.28] - 2026-01-23

### Fixed
- **Pricing Badge Wrap**: Prevented the "MOST POPULAR" label from splitting across lines on small screens
  - Allowed the badge/title flex group to wrap on mobile while keeping the badge text on a single line
  - Files modified:
    - [style.css](resources/js/blocks/pricing/style.css#L27)

## [2.0.27] - 2026-01-23

### Fixed
- **Navigation Alignment**: Fixed vertical alignment of logo and social icons after adding desktop chevrons
  - **Root cause**: Adding chevrons in v2.0.26 inadvertently affected vertical alignment of logo and icons
  - Logo and social icons (Facebook, GitHub) appeared lower than navigation menu items
  - **Solution**: Added `lg:mb-5` (20px bottom margin) to both logo and social icons containers
  - Bottom margin pushes elements up in flexbox with `items-center`, compensating for menu items' `py-2` padding
  - **Impact**: Logo, navigation menu items, and social icons now properly aligned at visual center
  - Files modified:
    - [navigation.blade.php](resources/views/components/navigation.blade.php#L17) - Added `lg:mb-5` to logo div
    - [navigation.blade.php](resources/views/components/navigation.blade.php#L104) - Added `lg:mb-5` to social icons div

## [2.0.26] - 2026-01-23

### Added
- **Navigation Chevrons**: Added chevron indicators to all menu items with dropdowns
  - **Desktop Navigation**: Chevrons now visible next to parent menu items (e.g., "SERVICES")
  - **Mobile Navigation**: Chevrons remain functional for accordion-style submenu toggles
  - **Visual Feedback**:
    - Chevron points down (↓) when dropdown is closed (default state)
    - Chevron rotates to point up (↑) when dropdown is open (180deg rotation)
    - Smooth 500ms transition animation on rotation
  - **Desktop Behavior**: Chevron rotates on hover, visual indicator only (`pointer-events: none`)
  - **Mobile Behavior**: Chevron is clickable/tappable to toggle submenu accordion
  - **Impact**: Significantly improved UX - users can now see which menu items have dropdowns before interacting
  - Files modified:
    - [navigation.blade.php](resources/views/components/navigation.blade.php#L56-L68) - Added chevron SVG with proper classes
    - [app.css](resources/css/app.css#L745-L772) - Added chevron rotation CSS for mobile and desktop

## [2.0.25] - 2026-01-23

### Fixed
- **404 Page Mobile Layout**: Fixed search button layout and text color visibility issues
  - **Search Form Responsive Layout**: Changed search form from horizontal to vertical layout on mobile
    - Added `flex-col sm:flex-row` classes to stack search input and button on mobile
    - Search button now appears below input field on mobile devices instead of cramped side-by-side
    - Desktop maintains original horizontal layout (side-by-side)
  - **404 Heading Color**: Fixed "404" text visibility against gradient background
    - Changed from `text-main` (white) to inline style with `var(--wp--preset--color--primary)`
    - Inline style overrides global `h1 { color: #fff; }` CSS rule
    - "404" text now displays in primary color (blue) instead of hard-to-see white
  - **Impact**: Much better mobile UX with proper search button placement, improved text readability

## [2.0.24] - 2026-01-23

### Changed
- **404 Page Redesign**: Complete visual overhaul of 404 error page ([404.blade.php](resources/views/404.blade.php))
  - **Custom Robot Illustration**: Replaced generic error message with confused robot SVG illustration
    - X-mark eyes indicating error state
    - Sad/confused mouth expression
    - Floating question marks around robot
    - Antenna, body, control panel, and arms
    - Uses theme primary color with 80% opacity
  - **Improved Layout & Typography**:
    - Friendly conversational messaging: "Oops! This page seems to have wandered off..."
    - Clear visual hierarchy with large 404 heading
    - Gradient background from tertiary to base color
  - **Enhanced Search Experience**:
    - Large, prominent search bar with visible border (border-dark)
    - Separated input and button (no overlap) using flexbox layout
    - Focus states with primary color ring
    - Better spacing and padding for improved usability
  - **Quick Navigation Cards**:
    - Three helpful links: Home, Services, Contact Us
    - SVG icons for each card with hover scale effect
    - Card hover effects: border color change to primary, shadow lift
    - Responsive grid layout (stacks on mobile)
    - Correct URLs: Services → `/#our-services`, Contact → `/contact-us/`
  - **Impact**: Much improved user experience compared to plain error page, better engagement and navigation

## [2.0.23] - 2025-12-24

### Changed
- **Security Updates**: Updated npm dependencies to address Dependabot alerts
  - **Vite**: Updated from 6.3.6 to 6.4.1 - Fixes CVE for `server.fs.deny` bypass vulnerability on Windows (Moderate severity)
  - **Esbuild**: Updated from 0.25.10 to 0.25.12 (all platform-specific binaries)
  - **Rollup**: Updated from 4.53.x to 4.54.0 (all platform-specific binaries)
  - **@roots/vite-plugin**: Updated to 1.2.3
  - **@tailwindcss/vite**: Updated to 4.1.18
  - Removed 6 obsolete packages
  - **Impact**: `npm audit` now shows 0 vulnerabilities
  - **Note**: `node-tar` alert was for a package not in dependency tree (likely removed as unused transitive dependency)

## [2.0.22] - 2025-12-06

### Added
- **Product Detail Field Groups**: New ACF fields for Features, What's Included, and Pricing Details registered in [app/setup.php](app/setup.php#L203) and rendered as accordion sections on single product pages.
- **Automation Guidance**: Added theme-specific agent docs ([AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md)) covering structure, commands, block standards, and Trellis VM workflows.

### Changed
- **Single Product Layout Refresh**: Rebuilt WooCommerce single product template ([content-single-product.php](resources/views/woocommerce/content-single-product.php)) with a simplified hero (title/price/category), streamlined image rendering, short description, and ACF-driven accordion for detailed product info.
- **Product Typography Override**: Enforced dark text color for headings and paragraphs within product content areas in [resources/css/app.css](resources/css/app.css#L768) to keep product pages readable when block color classes are applied.

## [2.0.21] - 2025-12-03

### Changed
- **Documentation Cleanup**: Removed references to deleted documentation files in README.md
  - Removed references to `docs/DEV.md`, `docs/BLOCKS.md`, `docs/WOOCOMMERCE.md`, and `docs/PATTERN-TO-NATIVE-BLOCK.md`
  - Documentation section now only lists existing files: CLAUDE.md and CHANGELOG.md
  - Simplified documentation structure for clearer navigation

## [2.0.20] - 2025-12-03

### Changed
- **WordPress Compatibility**: Updated "Tested up to" from 6.6 to 6.9 in [style.css](style.css#L11)
  - Main site upgraded to WordPress 6.9
  - Theme verified compatible with WordPress 6.9

## [2.0.19] - 2025-12-03

### Changed
- **Feature List Grid Block**: Reduced vertical padding for better page spacing
  - Changed `padding` from `5rem 0` (80px) to `2rem 0` (32px) in [style.css](resources/js/blocks/feature-list-grid/style.css#L6)
  - **Impact**: Improves page flow and reduces excessive whitespace between sections
  - Resources page reduced from 7,385px to ~6,800px height (~8% shorter)
  - More professional, scannable layout with balanced spacing

## [2.0.18] - 2025-11-26

### Fixed
- **Button Hover Filter**: Fixed React warning "Cannot update component during render"
  - **Root cause**: `setAttributes()` was being called directly during render phase (line 70-74)
  - Wrapped state update in `useEffect` hook to comply with React rules
  - **Impact**: Eliminates console warnings and prevents potential editor instability
  - Fixed in [button-hover-filter.jsx](resources/js/blocks/cta-block-blue/extends/button-hover-filter.jsx#L71-L78)
  - **Note**: This was causing carousel images to appear broken in editor after rebuild

### Changed
- **Carousel Block**: Added Adaptive Height feature for better slide height handling
  - Added `adaptiveHeight` attribute to [block.json](resources/js/blocks/carousel/block.json#L99-L102)
  - Added "Adaptive Height" toggle control in block editor settings panel
  - Slick Slider now automatically adjusts carousel height to match current slide
  - Useful for slides with varying content amounts or different image aspect ratios
  - Updated [editor.jsx](resources/js/blocks/carousel/editor.jsx#L226-L231) with new control
  - Updated [save.jsx](resources/js/blocks/carousel/save.jsx#L37) to pass setting to Slick
  - Synced improvement from Moiraine demo blocks implementation

## [2.0.17] - 2025-11-24

### Fixed
- **Speed Optimization: Hero Image Eager Loading** ([HeroBlock.php:181-198](app/Blocks/HeroBlock.php#L181-L198))
  - Changed hero desktop image from `loading="lazy"` to `loading="eager"`
  - Added `fetchpriority="high"` attribute to prioritize LCP image download
  - **Root cause**: Lazy loading the LCP (Largest Contentful Paint) image caused 2,360ms "Resource load delay"
  - Browser was waiting to determine if image was in viewport before loading
  - **Impact**: ~2+ seconds LCP improvement expected

### Added
- **Speed Optimization: Font Preloading** ([setup.php:400-436](app/setup.php#L400-L436))
  - Added preload hints for Open Sans regular (400) and semibold (600) fonts
  - Fonts are preloaded early in `<head>` before CSS parsing begins
  - Uses Vite manifest to resolve hashed font filenames
  - **Root cause**: CLS (Cumulative Layout Shift) of 0.602 caused by late font loading
  - When Open Sans loaded after initial render, text reflowed and shifted layout
  - **Impact**: CLS reduction expected (target < 0.1)

### Documentation
- Updated `docs/nynaeve/SPEED-TWEAKS.md` with new optimizations 8, 9, and 10

## [2.0.16] - 2025-11-24

### Added
- **Speed Optimization: Expanded Async CSS Loading** ([filters.php:85-129](app/filters.php#L85-L129))
  - Added WordPress core `wp-block-library` (15.7 KiB) to async loading
  - Added all 15 custom Imagewize block styles to async loading
  - Fixed `brands-styles` handle (was incorrectly `wc-brands-styles`)
  - **Impact**: ~300-400ms render-blocking time savings

### Fixed
- **WooCommerce Shop Grid Layout**: Fixed critical bug where shop page showed 2 columns instead of 4
  - **Root cause**: `woocommerce-smallscreen` CSS has `media='only screen and (max-width: 768px)'`
  - Using `preg_replace` to change ANY media query to `print` then swap to `all` broke responsive behavior
  - Mobile-only styles (2-column grid) were applying at ALL viewport sizes
  - **Solution**: Excluded `woocommerce-smallscreen` from async list, reverted to `str_replace` targeting only `media='all'`
  - **Lesson**: Never async-load stylesheets with specific media queries - it destroys their responsive behavior

### Documentation
- Updated `docs/nynaeve/SPEED-TWEAKS.md` with Phase 1 expansion details and critical warning about media queries

## [2.0.15] - 2025-11-24

### Added
- **Speed Optimization: Responsive Hero Images** ([HeroBlock.php:181-196](app/Blocks/HeroBlock.php#L181-L196), [setup.php:149-151](app/setup.php#L149-L151))
  - Added custom image sizes `hero-desktop` (600×348) and `hero-desktop-2x` (1200×696) for hero block
  - Hero block now uses `wp_get_attachment_image()` with automatic srcset generation
  - Browser loads appropriately sized image based on display and viewport
  - **Impact**: ~50 KiB savings on standard displays, ~20 KiB on retina (from 69.8 KiB original)
  - **Note**: Run `wp media regenerate --only-missing` after deploying to create new sizes

### Changed
- Updated `hero-block.blade.php` to use responsive `$desktop_image_html` with URL fallback for preview mode

### Documentation
- Updated `docs/nynaeve/SPEED-TWEAKS.md` with Optimization 7 implementation details

## [2.0.14] - 2025-11-24

### Added
- **Speed Optimization: Async CSS Loading** ([filters.php:77-110](app/filters.php#L77-L110))
  - Makes non-critical stylesheets non-render-blocking using `media='print' onload` technique
  - Applies to classic WooCommerce styles, WooCommerce Blocks styles, and Slick carousel CSS
  - **Impact**: Unblocks render on pages that use these styles
  - Browser loads CSS without blocking first paint, then swaps to `media='all'` on load

### Documentation
- Created `docs/nynaeve/SPEED-TWEAKS.md` - Comprehensive speed optimization guide with 6 optimization strategies

## [2.0.13] - 2025-11-24

### Removed
- **WooCommerce Query Filter**: Removed the `query` filter entirely from `setup.php`
  - Filter was added to suppress harmless "Duplicate key" warnings in debug.log
  - Risk of bugs outweighs benefit of suppressing minor log noise
  - WooCommerce handles duplicate key errors gracefully without intervention

## [2.0.12] - 2025-11-24

### Fixed
- **Infinite Recursion Bug**: Fixed critical error caused by `query` filter in `setup.php`
  - **Root cause**: Filter called `$wpdb->query()` which triggered the same filter again, causing infinite recursion
  - **Error**: "Maximum call stack size reached. Infinite recursion?" in `class-wpdb.php`
  - **Solution**: Simplified filter to just return empty string for WooCommerce duplicate key queries
  - WooCommerce handles missing indexes gracefully, so queries don't need to be executed at all
  - Prevents stack overflow on all page loads

## [2.0.11] - 2025-11-22

### Fixed
- **REST API Cleanup**: Removed duplicate checkout route registration in `setup.php`
  - Deleted redundant `rest_api_init` hook (lines 424-443) that registered `/wc/store/v1/checkout` unconditionally
  - Quote mode checkout interception now only registered inside WooCommerce block when quote mode is active
  - Prevents potential REST API conflicts and reduces unnecessary hook registrations

## [2.0.10] - 2025-11-13

### Fixed
- **Navigation Menu**: Fixed Safari-specific rendering issue where menu items with submenus displayed double/triple underlines
  - **Root cause**: Conflicting `::after` pseudo-elements on menu items with children
    - Active indicator underline used `::after` (from Blade template)
    - Invisible hover bridge for dropdowns also used `::after` (from app.css line 212)
    - Both pseudo-elements competed, causing visual artifacts in Safari
  - **Solution**: Changed active indicator from `::after` to `::before` pseudo-element
  - Updated [navigation.blade.php](resources/views/components/navigation.blade.php) lines 32-34:
    - Changed all `lg:after:*` classes to `lg:before:*`
    - Added `lg:before:z-[48]` for proper stacking below hover bridge (z-index 49)
  - **Result**: Clean separation of concerns:
    - `::before` = Active page underline indicator (visible, neutral-600 background)
    - `::after` = Invisible hover bridge for dropdown menus (transparent)
  - Tested across Chrome, Firefox, and Safari - consistent rendering on all browsers

- **Navigation Text Wrapping**: Fixed Safari wrapping menu item text to multiple lines
  - Added `whitespace-nowrap` to navigation links (line 52)
  - Added `whitespace-nowrap` to flex container wrapper (line 43)
  - Prevents text from breaking into multiple lines in Safari's flex layout rendering
  - Menu items now display on single line consistently across all browsers

## [2.0.9] - 2025-11-13

### Changes

- Updated composer packages including security patches for several packages:
  - dragonmantank/cron-expression (v3.4.0 => v3.6.0)
  - illuminate/bus (v12.34.0 => v12.38.1)
  - illuminate/cache (v12.34.0 => v12.38.1)
  - illuminate/collections (v12.34.0 => v12.38.1)
  - illuminate/conditionable (v12.34.0 => v12.38.1)
  - illuminate/config (v12.34.0 => v12.38.1)
  - illuminate/console (v12.34.0 => v12.38.1)
  - illuminate/container (v12.34.0 => v12.38.1)
  - illuminate/contracts (v12.34.0 => v12.38.1)
  - illuminate/cookie (v12.34.0 => v12.38.1)
  - illuminate/database (v12.34.0 => v12.38.1)
  - illuminate/encryption (v12.34.0 => v12.38.1)
  - illuminate/events (v12.34.0 => v12.38.1)
  - illuminate/filesystem (v12.34.0 => v12.38.1)
  - illuminate/hashing (v12.34.0 => v12.38.1)
  - illuminate/http (v12.34.0 => v12.38.1)
  - illuminate/log (v12.34.0 => v12.38.1)
  - illuminate/macroable (v12.34.0 => v12.38.1)
  - illuminate/pipeline (v12.34.0 => v12.38.1)
  - illuminate/queue (v12.34.0 => v12.38.1)
  - illuminate/routing (v12.34.0 => v12.38.1)
  - illuminate/session (v12.34.0 => v12.38.1)
  - illuminate/support (v12.34.0 => v12.38.1)
  - illuminate/testing (v12.34.0 => v12.38.1)
  - illuminate/translation (v12.34.0 => v12.38.1)
  - illuminate/validation (v12.34.0 => v12.38.1)
  - illuminate/view (v12.34.0 => v12.38.1)
  - league/flysystem (3.30.0 => 3.30.2)
  - league/flysystem-local (3.30.0 => 3.30.2)
  - nunomaduro/termwind (v2.3.1 => v2.3.2)
  - php-stubs/wordpress-stubs (v6.8.2 => v6.8.3)
  - symfony/console (v7.3.4 => v7.3.6)
  - symfony/error-handler (v7.3.4 => v7.3.6)
  - symfony/finder (v7.3.2 => v7.3.5)
  - symfony/http-foundation (v7.3.4 => v7.3.7)
  - symfony/http-kernel (v7.3.4 => v7.3.7)
  - symfony/routing (v7.3.4 => v7.3.6)
  - symfony/service-contracts (v3.6.0 => v3.6.1)
  - symfony/translation-contracts (v3.6.0 => v3.6.1)
  - symfony/var-dumper (v7.3.4 => v7.3.5)

## [2.0.8] - 2025-10-29

### Changed
- **CTA Columns Block**: Major visual redesign with asymmetric card styling for better contrast and engagement
  - **Left Card**: Retained dark blue (`primary`) background with bright accent button (`primary-accent` background, `main` text)
  - **Right Card**: Changed to white (`base`) background with dark text and dark blue button (`primary` background, `base` text)
  - **Typography Improvements**:
    - Increased heading size from `2-xl` to `3-xl` for stronger visual impact
    - Tightened heading line-height from `1.3` to `1.2` for better hierarchy
    - Removed separator lines that were interrupting content flow
    - Increased spacing between heading and description (1rem → 1.5rem)
  - **Button Enhancements**:
    - Larger buttons with increased padding (1rem vertical, 2rem horizontal)
    - Increased font size to `lg` with font-weight `600` for better readability
    - Added distinct button classes (`cta-columns__buttons--accent`, `cta-columns__buttons--dark`) for targeted styling
  - **Visual Polish**:
    - Added subtle card shadows (0 4px 6px) for depth and elevation
    - Card hover effect: lifts 4px with enhanced shadow for interactivity
    - Button hover effects: lifts 2px with deeper shadow and brightness filter
    - Accent button brightens 10% on hover, dark button darkens 10%
    - Smooth 0.3s transitions on all interactive elements
  - **Responsive Optimizations**:
    - Scaled down button padding on mobile for better fit
    - Maintained readability and touch targets at all screen sizes
  - Files updated:
    - [editor.jsx](resources/js/blocks/cta-columns/editor.jsx) - Template structure with differentiated cards
    - [style.css](resources/js/blocks/cta-columns/style.css) - Enhanced hover effects and visual polish
    - [editor.css](resources/js/blocks/cta-columns/editor.css) - Editor preview styling
  - **Impact**: Creates strong visual contrast between CTAs, improves button visibility, adds professional interactive feedback

## [2.0.7] - 2025-10-28

### Fixed
- **Button Filter Registration**: Fixed button filter not actually registering with WordPress
  - Added missing `addFilter()` call in [button.filter.js](resources/js/filters/button.filter.js)
  - Filter was exporting `hook`, `name`, and `callback` but never calling `addFilter()` to register
  - Custom button styles now properly appear in block editor style picker
  - **Impact**: "Minimal" button style now visible in all button blocks, including Callandor patterns

### Changed
- **Button Style Simplification**: Removed redundant button styles and renamed "Secondary Button"
  - **Removed**: "Light Button" and "Dark Button" styles (redundant with WordPress "Fill" style + color picker)
  - **Renamed**: "Secondary Button" → "Minimal" for clearer naming
  - CSS class: `is-style-secondary-button` → `is-style-minimal`
  - Updated [button.filter.js](resources/js/filters/button.filter.js) to only register "Minimal" style
  - Updated [app.css](resources/css/app.css) button styles (lines 623-657)
  - Removed 48 lines of redundant CSS for light/dark button styles
  - **Impact**: Cleaner button style picker with 3 total options (Fill, Outline, Minimal)

### Technical Details
- **Button Styles Available**:
  - **Fill** (WordPress core): Solid background, user-controlled colors, brightness hover effect
  - **Outline** (WordPress core): Transparent background, 2px border, fills on hover
  - **Minimal** (Nynaeve custom): Transparent background, 1px light border, x-small size, fills on hover
- **Migration**: No database migration needed - old style classes (`is-style-secondary-button`, `is-style-button-light`, `is-style-button-dark`) were not used in any published content
- **Testing**: Theme assets rebuilt successfully (`npm run build`)

## [2.0.6] - 2025-10-27

### Fixed
- **Button Filter Conflicts**: Fixed button filters interfering with WooCommerce and third-party patterns
  - **button.filter.js** ([resources/js/filters/button.filter.js](resources/js/filters/button.filter.js)):
    - Changed from replacing ALL WordPress core button styles to extending them
    - Now preserves WordPress core styles (fill, outline) while adding 3 custom Nynaeve styles
    - Filters duplicate custom styles to prevent conflicts
    - **Impact**: WooCommerce patterns and other plugin buttons now work correctly without losing their intended appearance

  - **button-hover-filter.jsx** ([resources/js/blocks/cta-block-blue/extends/button-hover-filter.jsx](resources/js/blocks/cta-block-blue/extends/button-hover-filter.jsx)):
    - Changed from applying hover colors to ALL buttons globally to CTA block buttons only
    - Added `isNynaeveButton` flag to track which buttons are customized
    - Changed `hoverBackgroundColor` default from `#075985` (sky-700) to empty string
    - Only applies hover background when button is explicitly inside CTA block
    - Only modifies saved HTML when `isNynaeveButton` flag is set
    - **Impact**: Eliminates attribute pollution on non-CTA buttons, prevents unexpected hover colors on third-party patterns

  - **Button CSS Hover Effects** ([resources/css/app.css](resources/css/app.css) lines 613-643):
    - Removed universal `.wp-block-button .wp-block-button__link:hover` selector that affected ALL buttons
    - Added scoped hover effects targeting specific button styles only:
      - `.is-style-fill` and unstyled buttons get brightness filter + lift effect
      - Nynaeve custom styles (secondary-button, button-light, button-dark) get lift effect only
      - Outline style gets lift effect + background color transition
    - **Impact**: WooCommerce and third-party pattern buttons no longer get unexpected hover animations

### Changed
- **Button Style System**: Updated from replacement-based to extension-based architecture
  - WordPress core button styles now preserved alongside Nynaeve custom styles
  - Button style picker shows both core and custom options
  - Better compatibility with third-party plugins and themes

### Technical Details
- **Root Cause Analysis**: Button filters were causing three types of conflicts:
  1. Complete style replacement removed WordPress core button styles
  2. Global attribute addition applied hover colors to all buttons (including WooCommerce)
  3. Universal CSS hover effects interfered with pattern-specific button designs
- **Solution Architecture**:
  - Extend core styles instead of replacing them
  - Scope custom attributes to specific block contexts (CTA blocks)
  - Use specific CSS selectors instead of universal ones
  - Flag buttons that receive customization with `isNynaeveButton` attribute
- **Testing**: Theme assets rebuilt successfully with all fixes (`npm run build`)

## [2.0.5] - 2025-10-24

### Added
- **Mobile Navigation Accordion**: Implemented smooth accordion-style mobile navigation with chevron icons
  - Added chevron icons next to parent menu items with children (mobile only)
  - Chevron positioned directly next to parent link text for intuitive UX
  - Chevron points down when closed, rotates up (180°) when open
  - Smooth CSS Grid animation for submenu expansion (500ms ease-in-out)
  - Parent link remains clickable for navigation, chevron toggles submenu
  - Desktop behavior unchanged (hover-based dropdown)
  - CSS-only solution using checkbox technique - no JavaScript required
  - Inspired by AllInQ Digital mobile navigation UX patterns

### Changed
- **Navigation Component** ([navigation.blade.php](resources/views/components/navigation.blade.php)):
  - Added unique checkbox IDs for each parent menu item (`.submenu-toggle-checkbox`)
  - Wrapped parent link and chevron in flex container with `gap-1` spacing
  - Added `.submenu-chevron` label with SVG chevron icon (lg:hidden for mobile only)
  - Updated submenu list with `.submenu-list` class and CSS Grid animation
  - Changed animation from `grid-rows-[0fr]` to `grid-rows-[1fr]` on expansion

- **Theme Stylesheet** ([app.css](resources/css/app.css)):
  - Added Section 12: "Mobile Navigation Accordion" (lines 755-787)
  - Chevron rotation CSS: `.submenu-toggle-checkbox:checked ~ div .submenu-chevron svg { transform: rotate(180deg); }`
  - Submenu expansion CSS: `.submenu-toggle-checkbox:checked ~ .submenu-list { grid-template-rows: 1fr; }`
  - Desktop hover behavior: opacity-based fade with pointer-events control
  - All animations use 500ms duration with ease-in-out timing

### Technical Details
- **Animation approach**: CSS Grid `grid-template-rows` transition (smoother than max-height)
- **Chevron behavior**: SVG rotates 180° via CSS transform on checkbox state
- **Sibling selectors**: Uses `~` general sibling combinator for checkbox → SVG targeting
- **Desktop compatibility**: Media query ensures mobile-only chevron display
- **Accessibility**: ARIA labels on chevron toggle buttons, proper role attributes maintained

## [2.0.4] - 2025-10-22

### Fixed
- **Pricing Block**: Added override to prevent double padding from WordPress group wrapper
  - **Root cause**: Pricing Block uses nested `core/group` (line 25 in editor.jsx) which creates `.wp-block-group__inner-container`
  - WordPress core adds padding to this container, conflicting with column padding and universal rule
  - **Solution**: Added `.wp-block-imagewize-pricing` to the override selector in `app.css` (lines 727-731)
  - **Result**: Pricing table columns now have correct padding without extra spacing

### Changed
- **app.css**: Updated override comment to document both About Block and Pricing Block (lines 723-725)

## [2.0.3] - 2025-10-22

### Fixed
- **Layout System - Hybrid Approach**: Implemented final padding solution combining universal + block-specific CSS
  - **Re-enabled universal padding rule** for standalone content (paragraphs, images, headings added directly to pages)
  - **Added override for About Block** to prevent double padding from `.wp-block-group__inner-container` wrapper
  - **Root cause**: About Block uses WordPress's group pattern which inherits core padding, causing conflict with universal rule
  - **Solution**: Universal padding in `app.css` (lines 695-698) catches standalone content, override in `app.css` (lines 710-713) prevents double padding on About Block
  - **Result**: Standalone content has proper padding on mobile, blocks with wrappers work correctly, no double padding

- **Review Profiles Block**: Fixed mobile layout width constraint
  - Changed mobile `max-width` from `70vw` to `100%` in `style.css` (line 58)
  - **Root cause**: `70vw` constraint made review columns appear narrow and squashed on mobile
  - **Result**: Review profiles now use full available width on mobile for better readability

- **Navigation**: Fixed dropdown menu positioning and hover state
  - Added `lg:mt-2` margin to dropdown in `navigation.blade.php` to prevent overlap with logo
  - Added pseudo-element bridge (`:after`) in `app.css` (lines 212-221) to fill gap and maintain hover state
  - **Root cause**: Gap between parent menu item and dropdown broke hover state when moving mouse to dropdown
  - **Solution**: Invisible 0.5rem pseudo-element bridge fills the gap, keeping hover active
  - Dropdown menu now properly clears logo area without breaking functionality

### Changed
- **Padding Strategy**: Moved from "blocks-only" to hybrid universal + block-specific approach
  - Universal rule handles standalone content across all pages
  - Block-specific CSS handles blocks with custom wrappers (Page Heading Blue, Multi-Column Content, etc.)
  - About Block gets special override treatment due to WordPress group wrapper pattern

### Documentation
- **CONTENT-WIDTH-AND-LAYOUT.md**: Updated to document three-pronged hybrid solution
  - Added explanation of WordPress group wrapper conflict (About Block)
  - Updated solution approach from two-pronged to three-pronged
  - Added override pattern for blocks using `.wp-block-group__inner-container`
- **app.css**: Enhanced comments explaining universal padding rule and About Block override

## [2.0.2] - 2025-10-22

### Changed
- **Layout System - FINAL SOLUTION**: Block-Specific Padding (Option 3)
  - Removed all universal padding rules from `app.css` that were causing conflicts
  - Each block now handles its own horizontal padding in its own CSS file
  - **Why this approach**: Blocks use three incompatible patterns that can't be solved with universal CSS selectors
  - **Result**: Clean, predictable, no conflicts, full-width backgrounds work correctly

- **CTA Columns Block**: Changed default alignment from "wide" to "full" + added block-specific padding
  - Updated `block.json` default alignment: `"wide"` → `"full"`
  - Added `.wp-block-imagewize-cta-columns.alignfull > *` padding rule in block's `style.css`
  - Ensures blue background extends edge-to-edge while content has proper padding

- **Multi-Column-Content Block**: Added block-specific padding
  - Added `.wp-block-imagewize-multi-column-content.alignfull > *` padding rule in block's `style.css`
  - Prevents content from touching viewport edges on mobile

- **Page Heading Blue Block**: Added padding to content wrapper
  - Added padding to `.page-heading-blue__content` in block's `style.css`
  - Full-width blue gradient background works correctly while content is properly padded

### Fixed
- **Layout System**: Resolved ALL padding regression issues (v2.0.0, v2.0.1, v2.0.2 attempts)
  - **Root cause**: Blocks use three incompatible patterns (custom wrappers, direct core blocks, InnerBlocks)
  - **Failed approaches tried**:
    - v2.0.0: Universal padding → `.alignfull` content touched edges
    - v2.0.1: `.alignfull > *` rule → triple-padding on Review Profiles/About
    - v2.0.2a: `[class*="__content"]` selector → missed CTA Columns/Multi-Column-Content
    - v2.0.2b: Inline padding on wrapper → broke full-width backgrounds (Page Heading Blue, About, Review Profiles)
  - **Final solution (Option 3)**: Block-specific padding in each block's CSS
  - **Why this works**: Each block controls its own padding, no universal rules to conflict
  - No more edge-touching, no more triple-padding, full-width backgrounds work perfectly

### Removed
- **CSS Rules**: Removed ALL universal padding selectors from `app.css`
  - Removed: `.alignwide > [class*="__content"]` and similar complex selectors
  - Removed: `.alignfull > [class*="__content"]` and similar complex selectors
  - Kept only: `:where(.is-layout-constrained) > :not(.alignfull):not(.alignwide)` for standalone blocks
  - Much simpler theme CSS, each block is self-contained

### Documentation
- **app.css Section 11**: Updated to explain block-specific padding approach
  - Clear documentation that blocks handle their own padding
  - Lists which blocks need padding and where it's defined
  - Reference to `docs/CONTENT-WIDTH-AND-LAYOUT.md`
- **CONTENT-WIDTH-AND-LAYOUT.md**: Comprehensive analysis and solution options
  - Documents all failed approaches and why they failed
  - Explains three incompatible block patterns
  - Research on Twenty Twenty-Five and Ollie themes
  - Four solution options with full pros/cons analysis
  - Recommendation for Option 3 (block-specific padding) for hybrid themes
## [2.0.1] - 2025-10-22

### Added
- **Layout System Enhancement**: Added universal padding rule for content inside `.alignfull` blocks
  - New CSS rule: `:where(.is-layout-constrained) > .alignfull > *` adds horizontal padding to direct children of full-width blocks
  - Solves edge-to-edge text issue in blocks with custom inner wrappers without requiring block-level CSS changes
  - WordPress core blocks (columns, groups) automatically override with their own padding (higher specificity)
  - Custom wrappers (e.g., `.page-heading-blue__content`) now receive proper horizontal padding from theme
  - Uses `:where()` for zero specificity - allows blocks to override if needed
  - Single 20-line CSS solution that works for all current and future blocks with custom inner wrappers
  - Maintains "WordPress handles padding" philosophy - no block-specific CSS needed

### Fixed
- **Block Padding Issues**: Removed excessive horizontal padding from 10 blocks causing double/triple padding on mobile
  - **About Block** (`imagewize/about`): Removed all horizontal padding from mobile styles (lines 27-61)
  - **Page Heading Blue** (`imagewize/page-heading-blue`): Removed manual padding from `.page-heading-blue__content` wrapper
  - **Review Profiles** (`imagewize/review-profiles`): Removed `calc()` padding from `.alignfull`
  - **Testimonial Grid** (`imagewize/testimonial-grid`): Changed from `padding: 3rem 1rem` to `padding: 3rem 0` on mobile
  - **Two Column Card** (`imagewize/two-column-card`): Changed from `padding: 5rem 1.25rem` to `padding: 5rem 0`
  - **CTA Columns** (`imagewize/cta-columns`): Changed from `padding: 5rem 1.25rem` to `padding: 5rem 0`
  - **Multi Column Content** (`imagewize/multi-column-content`): Changed from `padding: 5rem 1.25rem` to `padding: 5rem 0`
  - **Feature List Grid** (`imagewize/feature-list-grid`): Changed from `padding: 5rem 1.25rem` to `padding: 5rem 0`
  - **FAQ** (`imagewize/faq`): Changed from `padding: 4rem 2rem` to `padding: 4rem 0`
  - **Pricing Tiers** (`imagewize/pricing-tiers`): No changes needed (already correct)
  - All blocks now use vertical-only padding, letting WordPress layout system handle horizontal spacing
  - Fixes issue where theme padding + block padding created 2-3 layers of spacing (up to 4rem/64px per side)
  - Tested with Playwright screenshots on production homepage - padding now consistent across all blocks

### Changed
- **Block Padding Pattern**: All blocks now follow "vertical padding only" pattern
  - WordPress handles horizontal padding via `theme.json` root padding + `useRootPaddingAwareAlignments: true`
  - Theme CSS provides padding via two complementary rules:
    - `:where(.is-layout-constrained) > :not(.alignfull):not(.alignwide)` - for standalone blocks
    - `:where(.is-layout-constrained) > .alignfull > *` - for content inside full-width blocks
  - Blocks only add vertical padding (top/bottom) and internal component padding
  - Mobile: ~1-1.5rem horizontal padding (theme-controlled)
  - Desktop: ~2-3rem horizontal padding (theme-controlled)
  - System works efficiently with just 40 lines of CSS for entire theme

### Documentation
- **CLAUDE.md**: Added "Block Padding Best Practices" section with correct patterns and examples
- **CONTENT-WIDTH-AND-LAYOUT.md**: Updated "Discovered Issue" section with complete fix details and testing results (lines 782-1017)
  - Documented all affected blocks with root causes and solutions
  - Added "Golden Rule" and correct CSS patterns for full-width blocks
  - Added testing checklist and expected results
- **BLOCKS.md**: Updated block count to reflect all 17 custom blocks in the theme
- **README.md**: Updated custom blocks count to 17 blocks (was showing 15+)
- **DEV.md**: Enhanced layout system documentation with inner wrapper padding explanation

## [2.0.0] - 2025-10-21

### Added
- **Review Profiles Block**: Migrated from standalone plugin to Sage Native Block (`imagewize/review-profiles`)
  - Renamed from "Reviews Block" to "Review Profiles" to distinguish from existing Testimonial Grid block
  - Three-column layout with circular profile images (95px diameter)
  - InnerBlocks structure using Group + Columns for proper horizontal layout
  - Full-width alignment by default with orange background (#f97316)
  - White text for high contrast on orange background
  - Constrained content layout (wide width) for optimal readability
  - Responsive design: columns stack on mobile with proper spacing (max 70vw)
  - Three default profile images included (profile1-3.webp) in block assets
  - Default customer review content for immediate preview
  - Location: `resources/js/blocks/review-profiles/`
  - Category: "Imagewize" for consistent block organization
  - Replaces `imagewize/reviews-block` Composer plugin (v1.1.0)
- **About Block**: Migrated from standalone plugin to Sage Native Block (`imagewize/about`)
  - Two-column layout (20% profile image / 80% text content) with full-width gray background
  - InnerBlocks structure using Group + Columns for proper horizontal layout
  - Rounded profile image with customizable 8px border
  - Full-width alignment by default with gray background (#ebeced)
  - Constrained content layout for optimal readability
  - Responsive design: columns stack on mobile with centered headings
  - Custom "rounded" image style registration for circular profile images
  - All typography editable via block toolbar (Open Sans font family)
  - Template with default about content for immediate preview
  - Location: `resources/js/blocks/about/`
  - Category: "Imagewize" for consistent block organization
  - Replaces `imagewize/about-block` Composer plugin

### Removed
- **Review Profiles Block Plugin**: Removed `imagewize/reviews-block` Composer plugin dependency
  - Block functionality now integrated into theme as "Review Profiles"
  - Simplifies dependency management
  - Improves performance with consolidated asset loading
- **About Block Plugin**: Removed `imagewize/about-block` Composer plugin dependency
  - Block functionality now integrated into theme
  - Simplifies dependency management
  - Improves performance with consolidated asset loading

### Fixed
- **CTA Blue Block**: Fixed editor width issue where block extended behind sidebar
  - Changed from `width: 100vw` with negative margins to `width: 100%`
  - Block now properly respects editor canvas boundaries
  - Uses WordPress's native `align: "full"` support instead of viewport-based CSS hacks
  - Documented proper full-width block styling pattern in `docs/DEV.md`

### Changed
- **Layout System**: Migrated to WordPress-native layout system (Twenty Twenty-Five approach)
  - Removed custom `.alignfull` padding CSS - WordPress core now handles all layout automatically
  - Added `useRootPaddingAwareAlignments: true` in `theme.json`
  - Added root-level padding via `styles.spacing.padding` in `theme.json`
  - Added spacing scale presets (20, 40, 50, 60) with responsive `clamp()` values
  - Updated `content-page.blade.php` to wrap `the_content()` with `.wp-block-post-content.alignfull.is-layout-constrained`
  - Updated `content-front-page.blade.php` with same layout wrapper
  - Regular blocks now automatically center at `contentSize` (55rem/880px)
  - `.alignwide` blocks automatically center at `wideSize` (64rem/1024px)
  - `.alignfull` blocks extend beyond root padding to full viewport width
  - Proper mobile/desktop spacing on all devices without custom CSS
  - Fixes mobile edge-touching and desktop full-width content issues
- **Block Alignment Defaults**: Updated default alignment from "wide" to "full" for blocks with backgrounds
  - Two Column Card block (`imagewize/two-column-card`) - Ensures card backgrounds extend full width
  - Multi-Column Content block (`imagewize/multi-column-content`) - Ensures section backgrounds extend full width
  - Testimonial Grid block (`imagewize/testimonial-grid`) - Ensures testimonial backgrounds extend full width
  - Prevents background display issues with new WordPress-native layout system
  - Blocks still support "wide" alignment option via toolbar when needed

### Added
- **Documentation**: Created comprehensive layout system documentation
  - `docs/CONTENT-WIDTH-AND-LAYOUT.md` - Complete guide to WordPress-native layout system
  - Detailed comparison of 4 different layout approaches
  - Analysis of Twenty Twenty-Five theme implementation
  - Step-by-step implementation guide
  - Testing checklist and reference materials
- **Documentation**: Added full-width block styling guidelines to `docs/DEV.md`
  - New "Full-Width Block Styling" section with correct vs incorrect approaches
  - Explains why viewport-based CSS breaks in WordPress editor
  - Best practices for implementing `align: "full"` blocks
  - Cross-referenced from `CLAUDE.md` for better discoverability

### Added
- **Layout System Fix**: Added padding for standalone blocks in `.is-layout-constrained`
  - WordPress core only provides max-width and centering, not padding
  - Added `:where(.is-layout-constrained) > :not(.alignfull):not(.alignwide)` CSS rule with horizontal padding
  - Uses `:where()` for zero specificity - allows user-defined padding to override
  - Uses `:not()` selectors to exclude `.alignfull` and `.alignwide` blocks from padding (they manage their own)
  - Prevents standalone paragraphs, headings, lists, and images from touching viewport edges on mobile
  - Completes the WordPress-native layout implementation
  - Cleaner approach than Twenty Twenty-Five's double-wrapper pattern

### Updated
- **Documentation**: Updated all theme documentation with new layout approach
  - `CLAUDE.md` - Updated page template layout conventions section
  - `.github/copilot-instructions.md` - Updated layout conventions with WordPress-native approach
  - `docs/DEV.md` - Updated layout section with theme.json settings explanation
  - Added references to comprehensive documentation in all files

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
