# ACF Composer Blocks Guide

This guide covers creating and managing ACF Composer blocks in the Nynaeve theme.

## Table of Contents

- [When to Use ACF Composer Blocks](#when-to-use-acf-composer-blocks)
- [Creating ACF Blocks](#creating-acf-blocks)
- [Block Structure](#block-structure)
- [Field Definitions](#field-definitions)
- [Default Content Strategy](#default-content-strategy)
- [Blade Templates](#blade-templates)
- [Styling ACF Blocks](#styling-acf-blocks)
- [Troubleshooting](#troubleshooting)

## When to Use ACF Composer Blocks

ACF Composer blocks should only be used in **special cases** when InnerBlocks or Sage Native blocks won't work.

**Use ACF Composer blocks when:**
- Need complex custom field types (repeaters, relationships, post queries)
- Server-side rendering is critical for performance
- Editing must be rigid/controlled (strict brand guidelines)
- Need to change visual order via CSS without changing DOM order (flexbox/grid reordering)
- Prefer PHP/Blade templating over React

**Avoid ACF Composer blocks for:**
- Content blocks where users need flexibility (use InnerBlocks instead)
- Blocks where typography should be user-controlled (use InnerBlocks instead)
- Simple image/heading/text/button combinations (use InnerBlocks instead)

## Creating ACF Blocks

### Command

All `wp acorn` commands must be run from the Trellis VM:

```bash
# From Trellis VM
cd trellis
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn acf:block MyBlock

# OR from interactive VM shell
trellis vm shell
cd /srv/www/imagewize.com/current/web/app/themes/nynaeve
wp acorn acf:block MyBlock
```

### Files Created

The command creates two files:

1. **Block Controller** - `app/Blocks/MyBlock.php`
   - Block registration and settings
   - ACF field definitions
   - Data processing in `with()` method

2. **Blade Template** - `resources/views/blocks/my-block.blade.php`
   - HTML/Blade markup
   - Receives data from `with()` method

## Block Structure

### Block Controller Example

```php
<?php

namespace App\Blocks;

use Log1x\AcfComposer\Block;
use StoutLogic\AcfBuilder\FieldsBuilder;
use Illuminate\Support\Facades\Vite;

class MyBlock extends Block
{
    /**
     * The block name.
     */
    public $name = 'My Block';

    /**
     * The block description.
     */
    public $description = 'A custom block description';

    /**
     * The block category.
     */
    public $category = 'imagewize';

    /**
     * The block icon.
     */
    public $icon = 'grid-view';

    /**
     * The block keywords.
     */
    public $keywords = ['keyword1', 'keyword2'];

    /**
     * The block post types.
     */
    public $post_types = ['page', 'post'];

    /**
     * The block supports.
     */
    public $supports = [
        'align' => ['wide', 'full'],
        'anchor' => true,
        'mode' => 'preview',
        'jsx' => true,
    ];

    /**
     * Data to be passed to the block before rendering.
     */
    public function with(): array
    {
        $image = get_field('image') ?: [];
        $heading = get_field('heading') ?: '';
        $description = get_field('description') ?: '';
        $button = get_field('button') ?: [];

        // IMPORTANT: Provide default content for both frontend and backend
        // This allows quick testing and gives clients working placeholder content
        if (empty($heading)) {
            $heading = 'Default Heading';
        }

        if (empty($description)) {
            $description = 'Default description text that appears on both frontend and backend.';
        }

        // Process image
        $image_url = is_array($image) ? ($image['url'] ?? null) : null;
        $image_alt = is_array($image) ? ($image['alt'] ?? '') : '';

        // Default image if not set
        if (empty($image_url)) {
            $image_url = Vite::asset('resources/images/placeholder.jpg');
            $image_alt = 'Placeholder image';
        }

        // Process button link
        $button_url = is_array($button) ? ($button['url'] ?? '#') : '#';
        $button_text = is_array($button) ? ($button['title'] ?? 'Learn More') : 'Learn More';
        $button_target = is_array($button) ? ($button['target'] ?? '_self') : '_self';

        return [
            'image_url' => $image_url,
            'image_alt' => $image_alt,
            'heading' => $heading,
            'description' => $description,
            'button_url' => $button_url,
            'button_text' => $button_text,
            'button_target' => $button_target,
        ];
    }

    /**
     * The block field group.
     */
    public function fields(): array
    {
        $fields = FieldsBuilder::make('my_block');

        $fields
            ->addImage('image', [
                'label' => 'Image',
                'return_format' => 'array',
                'preview_size' => 'medium',
            ])
            ->addText('heading', [
                'label' => 'Heading',
                'required' => 0,
            ])
            ->addTextarea('description', [
                'label' => 'Description',
                'rows' => 4,
                'required' => 0,
            ])
            ->addLink('button', [
                'label' => 'Button Link',
                'return_format' => 'array',
                'required' => 0,
            ]);

        return $fields->build();
    }

    /**
     * Assets enqueued when rendering the block.
     */
    public function assets(array $block): void
    {
        // Enqueue block-specific styles
        // wp_enqueue_style('my-block', get_stylesheet_directory_uri() . '/resources/css/blocks/my-block.css');
    }
}
```

## Field Definitions

### Common Field Types

ACF Composer uses [ACF Builder](https://github.com/StoutLogic/acf-builder) for field definitions.

**Image Field:**
```php
->addImage('image', [
    'label' => 'Image',
    'return_format' => 'array',  // Returns array with url, alt, etc.
    'preview_size' => 'medium',
])
```

**Text Field:**
```php
->addText('heading', [
    'label' => 'Heading',
    'required' => 0,
    'maxlength' => 100,
])
```

**Textarea:**
```php
->addTextarea('description', [
    'label' => 'Description',
    'rows' => 4,
    'required' => 0,
])
```

**Link Field:**
```php
->addLink('button', [
    'label' => 'Button Link',
    'return_format' => 'array',  // Returns url, title, target
    'required' => 0,
])
```

**Repeater Field:**
```php
->addRepeater('items', [
    'label' => 'Items',
    'min' => 1,
    'max' => 5,
    'layout' => 'block',
    'button_label' => 'Add Item',
])
    ->addText('item_title', [
        'label' => 'Title',
    ])
    ->addTextarea('item_description', [
        'label' => 'Description',
    ])
->endRepeater()
```

**Post Object (Relationship):**
```php
->addPostObject('related_post', [
    'label' => 'Related Post',
    'post_type' => ['post'],
    'return_format' => 'object',
    'multiple' => 0,
])
```

## Default Content Strategy

**IMPORTANT:** Always provide default content that loads on both frontend and backend.

### Why Default Content Matters

1. **Immediate Testing**: Block renders correctly on published pages without manual content entry
2. **User Experience**: Users see working examples before customizing
3. **Development Speed**: No need to add content just to see layout/styles
4. **Quality Assurance**: Catches rendering issues during development

### Implementation

**❌ Don't restrict defaults to preview mode only:**
```php
public function with(): array
{
    $is_preview = $block['is_preview'] ?? false;

    // ❌ WRONG - Only shows default in editor
    $heading = get_field('heading') ?: ($is_preview ? 'Default Heading' : '');

    return ['heading' => $heading];
}
```

**✅ Provide defaults for both frontend and backend:**
```php
public function with(): array
{
    $heading = get_field('heading') ?: 'Default Heading';  // ✅ Works everywhere
    $image = get_field('image') ?: [];

    // Provide default image
    if (empty($image)) {
        $image_url = Vite::asset('resources/images/placeholder.jpg');
        $image_alt = 'Placeholder image';
    } else {
        $image_url = $image['url'];
        $image_alt = $image['alt'] ?? '';
    }

    return [
        'heading' => $heading,
        'image_url' => $image_url,
        'image_alt' => $image_alt,
    ];
}
```

## Blade Templates

### Template Structure

Blade templates receive data from the `with()` method.

**Basic Template Example:**
```blade
<div class="wp-block-imagewize-my-block {{ $block->classes }}">
  <div class="my-block__container">
    @if($image_url)
      <img src="{{ $image_url }}" alt="{{ $image_alt }}" class="my-block__image">
    @endif

    @if($heading)
      <h3 class="my-block__heading">{{ $heading }}</h3>
    @endif

    @if($description)
      <p class="my-block__description">{{ $description }}</p>
    @endif

    @if($button_url)
      <a href="{{ $button_url }}" target="{{ $button_target }}" class="my-block__button">
        {{ $button_text }}
      </a>
    @endif
  </div>
</div>
```

### Using Repeater Fields

```php
// In with() method
$items = get_field('items') ?: [];

if (empty($items)) {
    $items = [
        ['item_title' => 'Item 1', 'item_description' => 'Description 1'],
        ['item_title' => 'Item 2', 'item_description' => 'Description 2'],
    ];
}

return ['items' => $items];
```

```blade
{{-- In Blade template --}}
@if(!empty($items))
  <div class="my-block__items">
    @foreach($items as $item)
      <div class="my-block__item">
        <h4>{{ $item['item_title'] }}</h4>
        <p>{{ $item['item_description'] }}</p>
      </div>
    @endforeach
  </div>
@endif
```

## Styling ACF Blocks

### CSS Organization

Create block-specific CSS files in `resources/css/blocks/`:

```
resources/css/blocks/
├── my-block.css
├── another-block.css
└── ...
```

### Enqueuing Styles

**Option 1: In Block's `assets()` method**
```php
public function assets(array $block): void
{
    wp_enqueue_style(
        'my-block',
        get_stylesheet_directory_uri() . '/resources/css/blocks/my-block.css'
    );
}
```

**Option 2: Import in `resources/css/app.css`**
```css
@import 'blocks/my-block.css';
```

### Block CSS Structure

Follow BEM naming convention:

```css
.wp-block-imagewize-my-block {
  padding: 5rem 0;  /* Vertical only - no horizontal padding */
}

.my-block__container {
  max-width: var(--wp--style--global--content-size, 55rem);
  margin: 0 auto;
}

.my-block__image {
  width: 100%;
  height: auto;
}

.my-block__heading {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.my-block__description {
  color: var(--wp--preset--color--main-accent);
  margin-bottom: 2rem;
}

.my-block__button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--wp--preset--color--primary);
  color: white;
  text-decoration: none;
  border-radius: 0.25rem;
}

/* Responsive */
@media (max-width: 782px) {
  .my-block__heading {
    font-size: 1.5rem;
  }
}
```

## Troubleshooting

### Block Not Appearing in Editor

1. **Clear ACF cache:**
   ```bash
   cd trellis
   trellis vm shell
   cd /srv/www/imagewize.com/current/web/app/themes/nynaeve
   wp acorn acf:clear
   ```

2. **Re-cache ACF fields:**
   ```bash
   wp acorn acf:cache
   ```

3. **Check block registration:**
   - Verify block file exists in `app/Blocks/`
   - Ensure block extends `Log1x\AcfComposer\Block`
   - Check category is `'imagewize'`

### Fields Not Showing in Editor

1. **Check field builder syntax:**
   - Ensure `FieldsBuilder::make()` uses unique name
   - Verify `->build()` is called at the end
   - Check for syntax errors in field definitions

2. **Clear WordPress transients:**
   ```bash
   wp transient delete --all
   ```

### Content Not Displaying

1. **Check `with()` method:**
   - Verify `get_field()` uses correct field names
   - Ensure defaults are provided
   - Check return array structure

2. **Check Blade template:**
   - Verify variable names match `with()` return array
   - Check for typos in variable names
   - Ensure proper Blade syntax

### Styles Not Loading

1. **Check CSS file path:**
   - Verify file exists in `resources/css/blocks/`
   - Check import statement in `app.css`
   - Ensure file is included in Vite build

2. **Rebuild assets:**
   ```bash
   cd site/web/app/themes/nynaeve
   npm run build
   ```

## Additional Resources

- [ACF Composer Documentation](https://github.com/Log1x/acf-composer)
- [ACF Builder Documentation](https://github.com/StoutLogic/acf-builder)
- [ACF Field Types Reference](https://www.advancedcustomfields.com/resources/)
- [Pattern to ACF Block Guide](PATTERN-TO-ACF-BLOCK.md)
