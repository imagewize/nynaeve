# GitHub Copilot Instructions - Nynaeve Theme

This file provides GitHub Copilot with context about the Nynaeve WordPress theme development practices and conventions.

## Project Overview

**Nynaeve** is a modern WordPress theme built on:
- **Sage 11** framework with Laravel Blade templating
- **Tailwind CSS 4** with custom design system
- **Acorn** (Laravel for WordPress) for advanced PHP features
- **Vite** for fast development and HMR
- **WooCommerce** integration with custom quote-based system
- **imagewize/sage-native-block** package for custom block development

## Block Development Philosophy (CRITICAL)

**PREFERRED APPROACH**: Build blocks using **InnerBlocks** with native WordPress blocks whenever possible.

### Key Principles
- **Maximum User Control**: Let users select styles, font sizes, and formatting via block toolbar/inspector
- **Avoid Hardcoded Classes**: Never hardcode styling classes in templates (e.g., `is-style-*`, `has-*-font-size`)
- **Native WordPress Blocks**: Use core blocks (Button, Heading, Paragraph, Image) within custom containers
- **Block Toolbar First**: Users should access all styling options via WordPress native controls
- **Minimal Inspector Controls**: Only add custom controls when absolutely necessary

### Block Development Options (In Order of Preference)

1. **Sage Native Blocks with InnerBlocks (MOST PREFERRED)**
   - Content-focused blocks with images, headings, text, buttons
   - Users need full typography control
   - Want clean sidebar with no custom inspector controls

2. **Sage Native Blocks with Custom Controls (Use Sparingly)**
   - Need dynamic frontend JavaScript interactivity
   - Complex data structures that don't map to core blocks

3. **ACF Composer Blocks (Special Cases Only)**
   - Need complex custom field types (repeaters, relationships)
   - Server-side rendering is critical
   - Editing must be rigid/controlled

## Development Commands

### Local Development
```bash
# Start development with HMR (use HTTP not HTTPS for HMR)
npm run dev

# Build for production
npm run build

# Code quality
composer pint
```

### Acorn Commands (Trellis VM Required)
```bash
# Enter Trellis VM
trellis vm shell

# Create Sage Native Block (InnerBlocks approach)
wp acorn sage-native-block:create

# Create ACF Composer Block (when InnerBlocks won't work)
wp acorn acf:block MyBlock

# Clear ACF cache
wp acorn acf:clear
```

**Note on Config Publishing (v2.0.1+):**
- As of `imagewize/sage-native-block` v2.0.1, config publishing is **no longer required**
- Package now works out-of-the-box without manual setup
- Projects with previously published configs will continue to work (package uses published config if present)

## Code Standards

### Block Standards (block.json)
```json
{
  "name": "imagewize/block-name",
  "category": "imagewize",
  "textdomain": "imagewize"
}
```

### InnerBlocks Template Patterns
Always use **real, publishable content** in templates (not placeholders):

```jsx
const TEMPLATE = [
  ['core/image', { className: 'card__image' }],
  ['core/heading', {
    level: 3,
    content: 'Professional WordPress Development'  // Real content!
  }],
  ['core/paragraph', {
    content: 'Transform your website with modern development practices.'
  }],
  ['core/buttons', { className: 'card__buttons', layout: { type: 'flex' } }, [
    ['core/button', { text: 'Get Started' }],
    ['core/button', { text: 'Learn More' }]
  ]]
];
```

### Button Styling (CRITICAL)
WordPress doesn't reliably apply className to individual buttons. Use container approach:

```jsx
// ✅ CORRECT - className on buttons container
['core/buttons', {
  className: 'my-buttons-container',
  layout: { type: 'flex' }
}, [
  ['core/button', { text: 'Click Me' }]
]]
```

```css
/* Target buttons via container */
.my-block .my-buttons-container .wp-block-button .wp-block-button__link {
  background-color: black;
}
```

## File Structure

```
nynaeve/
├── app/                    # PHP application code
│   ├── Blocks/            # ACF Composer blocks
│   └── Providers/         # Service providers
├── resources/
│   ├── css/               # Tailwind CSS styles
│   ├── js/
│   │   └── blocks/        # Sage Native blocks
│   └── views/             # Blade templates
├── config/                # Configuration files
└── public/build/          # Built assets
```

## Theme Configuration

### Colors (Tailwind)
Theme uses custom color palette defined in `tailwind.config.js` and exposed via `theme.json`:
- `primary` - Primary brand color (blue)
- `main` - Main text/dark color (dark gray/black)
- `base` - Base/background white
- `secondary` - Secondary gray
- `tertiary` - Tertiary background (light gray)

**Reference:** See `resources/css/app.css` for CSS custom properties or `config/theme.json` for WordPress block editor colors.

### Typography
- **Headings**: Montserrat font family
- **Body**: Open Sans font family

## Layout Conventions (WordPress-Native Approach)

We use the **Twenty Twenty-Five** layout system - WordPress's modern native layout with **minimal custom CSS**.

### How It Works
1. `theme.json` sets `"useRootPaddingAwareAlignments": true`
2. `theme.json` sets root padding via `styles.spacing.padding`
3. Content is wrapped in `<div class="wp-block-post-content alignfull is-layout-constrained">`
4. Custom CSS adds horizontal padding to standalone blocks (WordPress core only provides max-width/centering)

### What This Achieves
- Regular blocks center at `contentSize` (55rem/880px)
- `.alignwide` blocks center at `wideSize` (64rem/1024px)
- `.alignfull` blocks extend beyond root padding to full viewport width
- Standalone blocks (paragraphs, headings, lists) get padding to prevent edge-touching on mobile
- Proper mobile/desktop spacing with minimal custom CSS
- WordPress core handles centering and max-width automatically

### CSS Implementation
- Uses `:where(.is-layout-constrained) > :not(.alignfull):not(.alignwide)` for zero specificity
- `:not()` selectors exclude aligned blocks from receiving padding (they manage their own)
- User-defined padding from block editor always takes precedence

### Template Pattern
```php
{{-- In content-page.blade.php --}}
<div class="wp-block-post-content alignfull is-layout-constrained">
  @php(the_content())
</div>
```

### DO:
- ✅ Use the wrapper above for all `the_content()` calls
- ✅ Let WordPress handle layout via theme.json
- ✅ Add containers only for non-block-editor content (headers, footers, sidebars)

### DON'T:
- ❌ Wrap `the_content()` in Tailwind containers (`container mx-auto`, `max-w-*`)
- ❌ Add custom layout CSS for `.alignfull`, `.alignwide`, or content width
- ❌ Override WordPress's native layout classes

### Example Page Template
```php
@section('content')
  @while(have_posts()) @php(the_post())
    @include('partials.page-header')
    {{-- WordPress-native layout via partials --}}
    @includeFirst(['partials.content-page', 'partials.content'])
  @endwhile
@endsection
```

**Reference:** See `docs/CONTENT-WIDTH-AND-LAYOUT.md` for comprehensive documentation.

## Asset Management

### Static Assets
Store in `resources/images/` and reference with Vite:

```php
// In PHP/Blade
$imageUrl = Vite::asset('resources/images/example.jpg');
```

```blade
<img src="{{ Vite::asset('resources/images/example.svg') }}" alt="Example">
```

## Common Patterns

### ACF Block Default Content
Always provide default content for both frontend and backend:

```php
public function with(): array
{
    $heading = get_field('heading') ?: 'Default Heading';
    $image = get_field('image') ?: [];
    
    if (empty($image['url'])) {
        $image_url = Vite::asset('resources/images/placeholder.jpg');
    }
    
    return [
        'heading' => $heading,
        'image_url' => $image_url,
    ];
}
```

## Environment Notes

### Trellis VM
- All `wp acorn` commands must run in Trellis VM
- Use HTTP (not HTTPS) for HMR during development
- Database operations require VM access due to port conflicts

### File Naming
- **PHP Classes**: PascalCase (`HeroBlock.php`)
- **Blade Templates**: kebab-case (`hero-block.blade.php`) 
- **Block Names**: namespace/block-name (`imagewize/hero-block`)

## Available Custom Blocks

- `imagewize/carousel` - Image carousel
- `imagewize/content-image-text-card` - Content card with InnerBlocks
- `imagewize/faq` - FAQ section
- `imagewize/pricing` - Two-column pricing table
- `imagewize/pricing-tiers` - Three-column pricing with featured tier
- `imagewize/related-articles` - Related articles with tag filtering

Remember: **InnerBlocks first, custom controls only when absolutely necessary!**

## Troubleshooting

### Sage Native Block Setup Issues

**Problem**: `sage-native-block:create` shows "No templates found" or "Template 'basic' not found"

**Solution (v2.0.0 only - LEGACY)**:
Older versions (v2.0.0) required manual config publishing:
1. Publish config: `wp acorn vendor:publish --provider="Imagewize\SageNativeBlockPackage\Providers\SageNativeBlockServiceProvider"`
2. Clear cache: `wp acorn optimize:clear`
3. Verify config exists: `ls -la config/sage-native-block.php`

**Current Version (v2.0.1+)**:
- Config publishing is **no longer required**
- Package works out-of-the-box
- If you still encounter issues, ensure package is updated: `composer update imagewize/sage-native-block`