# Converting Moiraine Patterns to ACF Composer Blocks

## Overview

This document outlines the process for converting PHP/CSS patterns from the Moiraine theme to ACF Composer blocks in Nynaeve. This approach is superior to pure WordPress block patterns because:

- **Preserves Styling**: Maintains the polished CSS and design from Moiraine patterns
- **Avoids Parser Issues**: Bypasses Gutenberg markup parser complexities and freeform block problems
- **Dynamic Content**: Provides proper UI for content editing via ACF fields
- **Better UX**: Clean field interface instead of editing block markup
- **Consistent Architecture**: Matches existing ACF Composer blocks in Nynaeve

## Source Patterns (Moiraine)

Located at: `~/code/moiraine/patterns/`

Priority patterns to convert:
1. **Content Image Text** - Image and text card layout
2. **Hero CTA** - Hero section with call-to-action
3. **Blog Grid** - Grid layout for blog posts/content
4. **Testimonial Card** - Testimonial display

## Conversion Process

### Step 1: Analyze Moiraine Pattern

1. Open the source pattern file in `~/code/moiraine/patterns/`
2. Identify:
   - Dynamic content areas (what should be ACF fields)
   - Static styling and layout structure
   - CSS classes and custom styles
   - Image requirements and text areas
   - Button/link functionality

### Step 2: Create ACF Composer Block

**Command:**
```bash
# From Trellis VM (using --workdir for single command)
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn acf:block BlockName

# OR from interactive VM shell
cd /srv/www/imagewize.com/current/web/app/themes/nynaeve
wp acorn acf:block BlockName
```

**Note:** ACF Composer blocks contain their own field definitions, so you don't need to create a separate field group file. The `wp acorn acf:block` command creates both the block class and Blade template.

**Files created:**
- `app/Blocks/BlockName.php` - Block controller with field definitions
- `resources/views/blocks/block-name.blade.php` - Blade template

**Important:** ACF Composer v3.0.19+ automatically generates `block.json` files when you run `wp acorn acf:cache`. These are cached at `web/app/cache/acorn/framework/cache/acf-composer/blocks/` and contain all block metadata from your PHP properties. You do NOT need to manually create `block.json` files - just define everything in your PHP class properties.

### Step 3: Define Fields in Block Class

**Location:** `app/Blocks/BlockName.php` (already created in Step 2)

Edit the generated block file to:
- Configure block metadata (name, description, category, icon, keywords)
- Define fields in the `fields()` method using Builder
- Configure block supports (alignment, spacing, colors, etc.)
- Add field processing logic in the `with()` method
- **IMPORTANT**: Add default content that loads on both frontend and backend for quick testing and better client experience

**Example field definition in the `fields()` method:**
```php
public function fields(): array
{
    $fields = Builder::make('content_card');

    $fields
        ->addImage('image', [
            'label' => 'Card Image',
            'return_format' => 'array',
            'preview_size' => 'medium',
        ])
        ->addText('heading', [
            'label' => 'Heading',
            'default_value' => 'Card Title',
        ])
        ->addTextarea('body_text', [
            'label' => 'Body Text',
            'rows' => 4,
        ])
        ->addLink('button', [
            'label' => 'Button Link',
            'return_format' => 'array',
        ]);

    return $fields->build();
}
```

**Default Content in `with()` Method:**

Always provide default content that appears on both frontend and backend. This allows for quick testing and gives clients working placeholder content:

```php
public function with(): array
{
    // Get field values
    $image = get_field('image') ?: [];
    $heading = get_field('heading') ?: '';
    $body_text = get_field('body_text') ?: '';
    $button = get_field('button') ?: null;

    // Default values (for both preview and frontend)
    if (empty($heading)) {
        $heading = 'Card Title';
    }
    if (empty($body_text)) {
        $body_text = 'Add your descriptive text here. This placeholder helps you visualize the layout.';
    }

    // Handle image with default
    $image_url = is_array($image) ? ($image['url'] ?? null) : null;
    $image_alt = is_array($image) ? ($image['alt'] ?? '') : '';

    if (empty($image_url)) {
        $image_url = Vite::asset('resources/images/placeholder.jpg');
        $image_alt = 'Placeholder image';
    }

    // Default button if not set
    if (empty($button) || !is_array($button) || empty($button['url'])) {
        $button = [
            'url' => '#',
            'title' => 'Learn More',
            'target' => '',
        ];
    }

    return [
        'image_url' => $image_url,
        'image_alt' => $image_alt,
        'heading' => $heading,
        'body_text' => $body_text,
        'button' => $button,
    ];
}
```

**Benefits of Default Content:**
- Blocks render immediately with sensible placeholder content
- Easier to test layouts and styling
- Better user experience - clients see working examples
- Faster development workflow

### Step 4: Edit Block Template

**Location:** `resources/views/blocks/block-name.blade.php` (already created in Step 2)

**Process:**
1. Copy HTML structure from Moiraine pattern
2. Replace hardcoded content with variables from the `with()` method:
   - `{{ $field_name }}` for text
   - `{!! $wysiwyg_field !!}` for HTML content
   - `<img src="{{ $image_url }}" alt="{{ $image_alt }}">`
3. Preserve all CSS classes from Moiraine
4. Use `{!! $attributes !!}` for WordPress block wrapper classes

**Example:**
```blade
<div class="content-card {{ $block->classes }}">
  @if($image)
    <div class="content-card__image">
      <img src="{{ $image['url'] }}" alt="{{ $image['alt'] }}" />
    </div>
  @endif

  <div class="content-card__content">
    @if($heading)
      <h2 class="content-card__heading">{{ $heading }}</h2>
    @endif

    @if($content)
      <div class="content-card__body">{!! $content !!}</div>
    @endif

    @if($button)
      <a href="{{ $button['url'] }}"
         class="content-card__button"
         target="{{ $button['target'] ?: '_self' }}">
        {{ $button['title'] }}
      </a>
    @endif
  </div>
</div>
```

### Step 5: Port CSS Styles and Handle Alignment

**Location:** `resources/css/blocks/block-name.css`

1. Create new CSS file in `resources/css/blocks/` directory
2. Copy CSS from Moiraine pattern's stylesheet
3. Adapt to use WordPress CSS variables (e.g., `var(--wp--preset--spacing--large)`)
4. **IMPORTANT: Match font sizes to Moiraine pattern using theme presets** (see below)
5. Maintain BEM naming convention for classes
6. Add responsive styles
7. **IMPORTANT: Handle alignment explicitly in CSS** (see below)
8. Enqueue the CSS in the block's `assets()` method

```php
public function assets(array $block): void
{
    wp_enqueue_style(
        'block-name',
        get_template_directory_uri().'/resources/css/blocks/block-name.css',
        [],
        null
    );
}
```

**Critical: Font Size Matching**

When converting Moiraine patterns, use browser DevTools or Playwright to compare computed font sizes, line heights, and button dimensions between the Moiraine pattern and your ACF block. Always use theme font size presets (`--wp--preset--font-size--*`) instead of hardcoded pixel values:

**Available theme font size presets** (see `resources/css/app.css`):
- `--wp--preset--font-size--xs`: 0.75rem (12px)
- `--wp--preset--font-size--sm`: 0.875rem (14px)
- `--wp--preset--font-size--base`: 1rem (16px)
- `--wp--preset--font-size--lg`: 1.125rem (18px)
- `--wp--preset--font-size--xl`: 1.25rem (20px)
- `--wp--preset--font-size--2xl`: 1.5rem (24px)
- `--wp--preset--font-size--3xl`: 1.875rem (30px)
- `--wp--preset--font-size--4xl`: 2.25rem (36px)
- `--wp--preset--font-size--5xl`: 3rem (48px)

**Example comparison workflow:**
```javascript
// Use Playwright or browser DevTools to compare styles
// Moiraine pattern styles:
{
  heading: { fontSize: "25.94px", lineHeight: "38.91px" },
  body: { fontSize: "18.47px", lineHeight: "27.71px" },
  button: { fontSize: "18.47px", height: "44.93px" }
}

// Match to closest theme presets in your CSS:
.block-heading {
  font-size: var(--wp--preset--font-size--2xl, 1.5rem); /* 24px, close to 25.94px */
  line-height: 1.5; /* ~36px at 24px font, adjust to match */
}

.block-body {
  font-size: var(--wp--preset--font-size--lg, 1.125rem); /* 18px, matches 18.47px */
  line-height: 1.55;
}

.block-button {
  font-size: var(--wp--preset--font-size--lg, 1.125rem); /* 18px */
  padding: 0.7em 1em; /* Adjust padding to achieve target height */
}
```

**Benefits:**
- Maintains consistency with theme design system
- Easier to maintain and adjust globally
- Respects user's font size preferences
- Better accessibility

**Critical: Alignment Handling**

ACF Composer blocks need explicit CSS to handle WordPress alignment classes. Unlike native WordPress blocks or patterns wrapped in Group blocks, ACF blocks don't automatically get `is-layout-constrained` class behavior. You must handle alignment in your CSS:

```css
/* Default: constrained to content width */
.your-block-class {
  max-width: var(--wp--style--global--content-size, 880px);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

/* Wide alignment */
.your-block-class.alignwide {
  max-width: var(--wp--style--global--wide-size, 1260px);
}

/* Full alignment */
.your-block-class.alignfull {
  max-width: none;
  margin-left: 0;
  margin-right: 0;
}
```

**Block Configuration for Alignment:**

In your block's `$supports` array, enable alignment:

```php
public $supports = [
    'align' => ['wide', 'full'], // Enables wide and full alignment options
    'anchor' => true,
    'mode' => true,
    'multiple' => true,
    'jsx' => false,
    'color' => [
        'background' => true,
        'text' => true,
    ],
    'spacing' => [
        'padding' => true,
        'margin' => true,
    ],
];
```

**Template Considerations:**

Use `$attributes->merge()` in your Blade template to properly combine WordPress classes with your custom class:

```blade
<div {!! $attributes->merge(['class' => 'your-block-class']) !!}>
  {{-- Block content --}}
</div>
```

This ensures WordPress alignment classes (`.alignwide`, `.alignfull`, `.alignnone`) are properly added to your block element.

### Step 6: Test and Refine

1. **Cache ACF Fields:**
   ```bash
   # From Trellis VM
   trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn acf:cache

   # This will discover and cache your new block
   ```

2. **Test in Block Editor:**
   - Insert block and verify it appears
   - Fill in all fields and preview
   - Test different content variations
   - Check responsive layouts
   - Verify in frontend

3. **Refinements:**
   - Adjust field settings (required, conditional logic)
   - Fine-tune CSS and spacing
   - Add field validation if needed
   - Add block preview/example

### Step 7: Documentation

Update block documentation:
- Add to `CLAUDE.md` if significant
- Document field structure and options
- Note any special requirements or limitations
- Add screenshots/examples if helpful

## Conversion Checklist

For each pattern conversion:

- [ ] Analyze Moiraine pattern structure and styling
- [ ] Create ACF Composer block (`wp acorn acf:block BlockName`)
- [ ] Define fields in block's `fields()` method with proper types
- [ ] Configure block metadata (name, category, icon, keywords)
- [ ] Add field processing logic in block's `with()` method
- [ ] Edit Blade template with Moiraine HTML structure
- [ ] Replace hardcoded content with variables from `with()` method
- [ ] Create CSS file in `resources/css/blocks/` directory
- [ ] Port CSS styles from Moiraine (adapt to WordPress CSS variables)
- [ ] Enqueue CSS in block's `assets()` method
- [ ] Cache ACF fields (`wp acorn acf:cache`)
- [ ] Test in block editor with various content
- [ ] Test responsive layouts
- [ ] Verify frontend rendering
- [ ] Add field validation if needed
- [ ] Document any special notes

## Pattern-Specific Notes

### Content Image Text Pattern
- **Moiraine Location:** `~/code/moiraine/patterns/content-image-text.php`
- **Fields Needed:** Image, heading, content (WYSIWYG), button link
- **Layout Options:** Image left/right, alignment variations
- **Styling:** Card with shadow, rounded corners, responsive image

### Hero CTA Pattern
- **Moiraine Location:** `~/code/moiraine/patterns/hero-cta.php`
- **Fields Needed:** Background image, heading, subheading, CTA buttons (multiple)
- **Layout Options:** Text alignment, overlay opacity, height variations
- **Styling:** Full-width hero with background image, gradient overlay

### Blog Grid Pattern
- **Moiraine Location:** `~/code/moiraine/patterns/blog-grid.php`
- **Fields Needed:** Post selection/query, grid columns, show excerpts
- **Layout Options:** 2/3/4 column layouts, card styles
- **Styling:** Responsive grid with post cards

### Testimonial Card Pattern
- **Moiraine Location:** `~/code/moiraine/patterns/testimonial-card.php`
- **Fields Needed:** Quote text, author name, author title, author image, rating
- **Layout Options:** Card variations, with/without image
- **Styling:** Quote styling, author attribution, star ratings

## Benefits Summary

| Aspect | Block Patterns | ACF Composer Blocks |
|--------|---------------|---------------------|
| Styling | Lost in conversion | Fully preserved |
| Content Editing | Edit block markup | Clean field interface |
| Parser Issues | Yes (tight tags, freeform blocks) | None |
| Dynamic Content | Limited | Full PHP/ACF power |
| Maintainability | Difficult | Easy to update |
| User Experience | Complex | Intuitive |
| Consistent with Theme | No | Yes (existing ACF blocks) |

## Resources

- **ACF Composer Documentation:** https://github.com/Log1x/acf-composer
- **Moiraine Patterns:** `~/code/moiraine/patterns/`
- **Nynaeve ACF Blocks:** `site/web/app/themes/nynaeve/app/Blocks/`
- **Nynaeve ACF Fields:** `site/web/app/themes/nynaeve/app/Fields/`
- **Nynaeve Block Templates:** `site/web/app/themes/nynaeve/resources/views/blocks/`
- **WordPress ACF Documentation:** https://www.advancedcustomfields.com/resources/

## Next Steps

1. Start with **Content Image Text** pattern (simplest)
2. Create as proof of concept
3. Refine workflow based on learnings
4. Convert remaining 3 priority patterns
5. Consider converting any other useful Moiraine patterns