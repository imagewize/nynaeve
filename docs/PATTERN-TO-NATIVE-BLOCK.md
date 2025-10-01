# Converting Moiraine Patterns to Sage Native Blocks

## Overview

This document outlines the process for converting PHP/CSS patterns from the Moiraine theme to React/JavaScript blocks using the **`imagewize/sage-native-block`** package in Nynaeve. This approach is superior to ACF Composer blocks when you need:

- **Native WordPress Controls**: Font size picker, font family selector, typography controls
- **Button Variants**: Easy size/style variants (small, medium, large, outline, solid)
- **Better UX**: Familiar WordPress block controls instead of ACF field sidebars
- **Design System Integration**: Direct use of theme.json settings (colors, spacing, typography)
- **More Maintainable**: Standard WordPress block patterns and component structure
- **Full Customization**: Complete control over styling, typography, and layout options

## When to Use Sage Native Blocks vs ACF Composer

### Use Sage Native Blocks When:
- You need customizable typography (font sizes, font families)
- You need button size/style variants
- You want native WordPress block toolbar controls
- You need complex styling options exposed to users
- The block requires dynamic frontend JavaScript

### Use ACF Composer Blocks When:
- You need complex custom field types (repeaters, relationships, etc.)
- Server-side rendering is critical
- The block is primarily content-focused with minimal styling options
- You prefer PHP/Blade templating over React

## InnerBlocks vs Custom Controls Architecture

**PREFERRED APPROACH: Use InnerBlocks with Native WordPress Blocks**

When creating Sage Native Blocks, prioritize using WordPress's native InnerBlocks system over custom controls whenever possible. This approach provides:

### Benefits of InnerBlocks Architecture:
- **Cleaner Sidebar**: No inspector controls cluttering the sidebar
- **Direct Editing**: Edit content directly in the editor using familiar WordPress controls
- **Native Block Controls**: Each element uses its own toolbar controls (image, heading, paragraph, button blocks)
- **Modular Design**: Each component maintains its own settings and functionality
- **Better UX**: Users can focus on content without navigating complex sidebar panels
- **Consistency**: Leverages WordPress's existing block patterns and behaviors

### When to Use InnerBlocks:
- **Content-focused blocks** where structure is more important than complex settings
- **Card layouts** with image + heading + paragraph + buttons
- **Hero sections** with background + heading + paragraph + buttons
- **Multi-component blocks** that can be broken into logical native block pieces
- **Layout blocks** that primarily arrange other content types

### When to Use Custom Controls:
- **Complex styling options** that native blocks don't provide
- **Advanced layout controls** (grid configurations, animations, etc.)
- **Settings that affect the entire block** (alignment, spacing between sections)
- **Custom functionality** not available in native blocks

### InnerBlocks Implementation Example:

```jsx
// PREFERRED: InnerBlocks approach
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'image-text-card',
  });

  const TEMPLATE = [
    ['core/image', { className: 'image-text-card__image' }],
    ['core/group', { className: 'image-text-card__content' }, [
      ['core/heading', { level: 3, placeholder: 'Card title...' }],
      ['core/paragraph', { placeholder: 'Card description...' }],
    ]],
    ['core/group', { className: 'image-text-card__buttons', layout: { type: 'flex' } }, [
      ['core/button', { text: 'Primary Action' }],
      ['core/button', { text: 'Secondary Action' }],
    ]],
  ];

  return (
    <div {...blockProps}>
      <InnerBlocks
        template={TEMPLATE}
        allowedBlocks={['core/image', 'core/heading', 'core/paragraph', 'core/button', 'core/group']}
        templateLock="all"
      />
    </div>
  );
}
```

```jsx
// Save component for InnerBlocks
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'image-text-card',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
```

### InnerBlocks Configuration Options:

- **`template`**: Predefined structure with default content and settings
- **`templateLock`**: 
  - `"all"`: Users can edit content but not add/remove/move blocks
  - `"insert"`: Users can't add/remove blocks but can move them
  - `false`: Full flexibility to add/remove/move blocks
- **`allowedBlocks`**: Restrict which block types can be used
- **`orientation`**: `"vertical"` (default) or `"horizontal"` layout

## Source Patterns (Moiraine)

Located at: `~/code/moiraine/patterns/`

Priority patterns to convert:
1. **Content Image Text** - Image and text card layout ✓ (Completed as native block)
2. **Hero CTA** - Hero section with call-to-action
3. **Blog Grid** - Grid layout for blog posts/content
4. **Testimonial Card** - Testimonial display

## Consistency Requirements Across All Blocks

**These requirements came from comparing content-image-text-card with existing blocks (related-articles, faq, pricing):**

### 1. Textdomain Must Be "imagewize"
- **Wrong**: `"textdomain": "sage"`
- **Correct**: `"textdomain": "imagewize"`
- **Why**: Enables proper internationalization and matches all other blocks

### 2. className Attribute Required
All blocks MUST include this attribute:
```json
"className": {
  "type": "string",
  "default": "wp-block-imagewize-block-name"
}
```
**Why**: Ensures WordPress properly adds the block wrapper class for consistent styling and JavaScript targeting

### 3. Default Alignment Strategy
- **Don't set** `"default": "full"` in attributes unless you want the block to always start wide/full-width
- **Omit default alignment** for normal content-width blocks (like content-image-text-card)
- **Set default alignment** for full-width blocks (like faq, pricing)

### 4. Translation String Consistency
When using `__()` for translations:
- In blocks with `"textdomain": "imagewize"`, use: `__('Text', 'imagewize')`
- Update existing `__('Text', 'sage')` to `__('Text', 'imagewize')`

## Critical Missing Information

### 1. Block Naming Conventions

**Use short class names in your CSS:**
- Block class names should match the pattern: `.block-name` (not `.wp-block-namespace-block-name`)
- WordPress automatically adds the full block class `.wp-block-namespace-block-name` to the wrapper
- Use shorter class names in your CSS for cleaner, more maintainable code
- Example: For `imagewize/content-image-text-card`, use `.image-text-card` not `.wp-block-imagewize-content-image-text-card`
- Only use the full WordPress class in `editor.css` for editor-specific styles

### 2. Required Dependencies

**Install @wordpress/icons package:**
```bash
cd site/web/app/themes/nynaeve
npm install @wordpress/icons --save-dev
```

This package is required if you use toolbar icons from `@wordpress/icons`.

### 3. block.json Configuration Additions

**Always include these fields:**
```json
{
  "version": "1.0.0",  // For cache busting
  "example": {},       // Enables block preview in inserter
  "viewScript": "file:./view.js",  // Even if not used initially
  "textdomain": "imagewize",  // MUST be "imagewize" not "sage" for consistency
  "supports": {
    "html": false  // Prevent users from editing HTML directly
  },
  "attributes": {
    "className": {
      "type": "string",
      "default": "wp-block-imagewize-block-name"  // REQUIRED for proper WordPress styling
    }
    // ... other attributes
  }
}
```

**Critical Configuration Requirements:**
1. **textdomain**: Must be `"imagewize"` (not `"sage"`) to match other blocks and enable proper translations
2. **className attribute**: Required for WordPress to properly apply block wrapper classes and styling
3. **Default alignment**: Do NOT set a default alignment unless you want the block to always start wide/full. Omit for normal content-width default.

**Button target attributes:**
- Use string type, not boolean: `"type": "string"`
- Default to empty string: `"default": ""`
- Store as `"_blank"` or `""` (not `true`/`false`)


### 4. Editor Component Best Practices

**Import all needed components:**
```jsx
import {
  useBlockProps,
  RichText,
  MediaUpload,
  MediaUploadCheck,  // Always wrap MediaUpload
  InspectorControls,  // Sidebar controls
  BlockControls       // Toolbar controls
} from '@wordpress/block-editor';

import {
  PanelBody,
  Button,
  SelectControl,
  TextControl,
  ToggleControl,   // For boolean toggles
  ToolbarGroup,    // For toolbar
  ToolbarButton    // For toolbar buttons
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { image } from '@wordpress/icons';  // Requires @wordpress/icons package
```

**MediaUpload must be wrapped:**
```jsx
<MediaUploadCheck>
  <MediaUpload
    onSelect={onSelectImage}
    allowedTypes={['image']}
    value={imageId}
    render={({ open }) => (
      <Button onClick={open} variant="secondary">
        {imageUrl ? __('Change Image', 'imagewize') : __('Select Image', 'imagewize')}
      </Button>
    )}
  />
</MediaUploadCheck>
```

**Add BlockControls for toolbar:**
```jsx
<BlockControls>
  <ToolbarGroup>
    <MediaUploadCheck>
      <MediaUpload
        onSelect={onSelectImage}
        allowedTypes={['image']}
        value={imageId}
        render={({ open }) => (
          <ToolbarButton
            onClick={open}
            icon={image}
            label={__('Change image', 'imagewize')}
          />
        )}
      />
    </MediaUploadCheck>
  </ToolbarGroup>
</BlockControls>
```

**ToggleControl for "open in new tab":**
```jsx
<ToggleControl
  label={__('Open in new tab', 'imagewize')}
  checked={primaryButtonTarget === '_blank'}
  onChange={(value) => setAttributes({ primaryButtonTarget: value ? '_blank' : '' })}
/>
```

### 5. Save Component Critical Details

**Always use fallbacks for optional attributes:**
```jsx
// Default image fallback
const displayImageUrl = imageUrl || '/app/themes/nynaeve/resources/images/placeholder.jpg';

// Default href fallback
href={primaryButtonUrl || '#'}

// Default alt text fallback
alt={imageAlt || 'Card image'}
```

**Conditional rendering for optional sections:**
```jsx
// Only render if has content
{displayImageUrl && (
  <figure className="image-text-card__image">
    <img src={displayImageUrl} alt={imageAlt || 'Card image'} />
  </figure>
)}

// Only render buttons if text exists (URL is optional)
{primaryButtonText && (
  <a href={primaryButtonUrl || '#'} className="...">
    {primaryButtonText}
  </a>
)}
```

**External link security:**
```jsx
{...(primaryButtonTarget && {
  target: primaryButtonTarget,
  rel: 'noopener noreferrer'
})}
```

### 6. CSS Best Practices

**Target Native WordPress Blocks in InnerBlocks:**
```css
/* Style native blocks within your container */
.image-text-card .wp-block-image img {
  width: 100%;
  border-radius: 3px;
}

.image-text-card .wp-block-heading {
  font-size: var(--wp--preset--font-size--2-xl, 1.5rem);
  margin: 0 0 var(--wp--preset--spacing--small, 1rem) 0;
}

.image-text-card .wp-block-paragraph {
  margin: 0 0 var(--wp--preset--spacing--medium, 2rem) 0;
}

.image-text-card .wp-block-button .wp-block-button__link {
  border-radius: 5px;
  padding: 0.7em 1em;
}

/* Container styling - buttons use WordPress style variants selectable in block toolbar */
.image-text-card .image-text-card__buttons {
  display: flex;
  gap: var(--wp--preset--spacing--small, 1rem);
  flex-wrap: wrap;
}

/* Note: Individual button styles are controlled via WordPress button style variants */
/* Users can select: Default, Outline, Secondary Button, Light Button, Dark Button */
/* Button styles are defined globally in app.css and available theme-wide */
```

**Use theme CSS custom properties:**
```css
/* Font sizes from theme.json */
font-size: var(--wp--preset--font-size--2-xl, 1.5rem);

/* Colors from theme.json */
background-color: var(--wp--preset--color--main, #1E1E26);

/* Spacing from theme.json */
padding: var(--wp--preset--spacing--large, 3rem);
gap: var(--wp--preset--spacing--small, 1rem);

/* Layout sizes from theme.json */
max-width: var(--wp--style--global--content-size, 55rem);
```

**Alignment support:**
```css
/* Default: constrained to content width */
.image-text-card {
  max-width: var(--wp--style--global--content-size, 55rem);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

/* Wide alignment */
.image-text-card.alignwide {
  max-width: var(--wp--style--global--wide-size, 64rem);
}

/* Full alignment */
.image-text-card.alignfull {
  max-width: none;
  margin-left: 0;
  margin-right: 0;
}
```

### 7. Editor CSS Additions

**Use full WordPress class for editor-only styles:**
```css
/* Editor-only border to make block visible */
.wp-block-imagewize-content-image-text-card {
  border: 2px dashed #007cba;
}

/* Disable interactions in editor */
.editor-styles-wrapper .image-text-card__button {
  pointer-events: none;
}

/* Style placeholder content */
.wp-block-imagewize-content-image-text-card p:first-of-type {
  color: #757575;
  font-style: italic;
}
```

### 8. Development Workflow

**Trellis VM Requirements:**
1. All `wp acorn` commands must run from Trellis VM (database access required)
2. Access site via HTTP (`http://imagewize.test/`) not HTTPS for HMR to work
3. If local database server is running, it will conflict with VM port 3306

**Testing checklist additions:**
- [ ] Test default placeholder image/content displays
- [ ] Test buttons without URLs (should default to `#`)
- [ ] Test "open in new tab" functionality
- [ ] **Re-save existing blocks in editor** to apply save.jsx fixes
- [ ] Test toolbar controls (quick image change)
- [ ] Verify MediaUploadCheck permissions work correctly

## Conversion Process

### Step 1: Analyze Moiraine Pattern

1. Open the source pattern file in `~/code/moiraine/patterns/`
2. Identify:
   - Dynamic content areas (what should be block attributes)
   - Static styling and layout structure
   - CSS classes and custom styles
   - Image requirements and text areas
   - Button/link functionality
   - Typography requirements (font sizes, families, weights)
   - Color scheme options
   - Spacing/layout variations

### Step 2: Create Sage Native Block

**Command:**
```bash
# From theme directory
cd site/web/app/themes/nynaeve

# Generate block scaffold
wp acorn sage-native-block:add-setup imagewize/block-name
```

**Files created:**
```
resources/js/blocks/block-name/
├── block.json          # Block configuration and attributes
├── index.js           # Block registration
├── editor.jsx         # Editor component (React)
├── save.jsx           # Save component (React) - frontend markup
├── style.css          # Frontend styles
├── editor.css         # Editor-specific styles
└── view.js            # Frontend JavaScript (optional, for interactivity)
```

**Automatic registration:** The block is automatically registered via `ThemeServiceProvider.php` - no manual registration needed.

### Step 3: Configure block.json

**Location:** `resources/js/blocks/block-name/block.json`

Configure block metadata and attributes:

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "imagewize/content-image-text-card",
  "version": "1.0.0",
  "title": "Content Image Text Card",
  "category": "text",
  "icon": "index-card",
  "description": "A card with image, heading, body text, and optional buttons",
  "keywords": ["card", "image", "text", "cta"],
  "textdomain": "imagewize",
  "example": {},
  "editorScript": "file:./index.js",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css",
  "viewScript": "file:./view.js",
  "supports": {
    "align": ["wide", "full"],
    "anchor": true,
    "spacing": {
      "padding": true,
      "margin": true
    },
    "color": {
      "background": true,
      "text": true
    },
    "typography": {
      "fontSize": true,
      "lineHeight": true
    },
    "html": false
  },
  "attributes": {
    "className": {
      "type": "string",
      "default": "wp-block-imagewize-content-image-text-card"
    },
    "imageId": {
      "type": "number"
    },
    "imageUrl": {
      "type": "string"
    },
    "imageAlt": {
      "type": "string",
      "default": ""
    },
    "heading": {
      "type": "string",
      "default": "Card Title"
    },
    "bodyText": {
      "type": "string",
      "default": "Add your descriptive text here. This placeholder helps you visualize the layout."
    },
    "primaryButtonText": {
      "type": "string",
      "default": "Learn More"
    },
    "primaryButtonUrl": {
      "type": "string",
      "default": ""
    },
    "primaryButtonTarget": {
      "type": "string",
      "default": ""
    },
    "primaryButtonSize": {
      "type": "string",
      "default": "medium"
    },
    "secondaryButtonText": {
      "type": "string",
      "default": ""
    },
    "secondaryButtonUrl": {
      "type": "string",
      "default": ""
    },
    "secondaryButtonTarget": {
      "type": "string",
      "default": ""
    },
    "secondaryButtonSize": {
      "type": "string",
      "default": "medium"
    }
  }
}
```

**Key Configuration Points:**
- `textdomain`: Must be "imagewize" (not "sage")
- `className`: Required attribute for proper WordPress styling
- `supports`: Enables WordPress native controls (typography, spacing, colors)
- `attributes`: Define all customizable content and settings
- `default`: Provide sensible defaults for immediate preview
- `html`: Set to false to prevent HTML editing

### Step 4: Build Editor Component (editor.jsx)

**Location:** `resources/js/blocks/block-name/editor.jsx`

Create the React component for the block editor:

```jsx
import { 
  useBlockProps, 
  RichText, 
  MediaUpload, 
  MediaUploadCheck,
  InspectorControls,
  BlockControls 
} from '@wordpress/block-editor';
import { 
  PanelBody, 
  Button, 
  SelectControl, 
  TextControl,
  ToggleControl,
  ToolbarGroup,
  ToolbarButton 
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { image } from '@wordpress/icons';

export default function Edit({ attributes, setAttributes }) {
  const {
    imageId,
    imageUrl,
    imageAlt,
    heading,
    bodyText,
    primaryButtonText,
    primaryButtonUrl,
    primaryButtonTarget,
    primaryButtonSize,
    secondaryButtonText,
    secondaryButtonUrl,
    secondaryButtonTarget,
    secondaryButtonSize,
  } = attributes;

  const blockProps = useBlockProps({
    className: 'image-text-card',
  });

  const onSelectImage = (media) => {
    setAttributes({
      imageId: media.id,
      imageUrl: media.url,
      imageAlt: media.alt,
    });
  };

  const buttonSizeOptions = [
    { label: __('Small', 'imagewize'), value: 'small' },
    { label: __('Medium', 'imagewize'), value: 'medium' },
    { label: __('Large', 'imagewize'), value: 'large' },
  ];

  // Default image fallback for preview
  const displayImageUrl = imageUrl || '/app/themes/nynaeve/resources/images/placeholder.jpg';

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes={['image']}
              value={imageId}
              render={({ open }) => (
                <ToolbarButton
                  onClick={open}
                  icon={image}
                  label={__('Change image', 'imagewize')}
                />
              )}
            />
          </MediaUploadCheck>
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__('Image Settings', 'imagewize')}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes={['image']}
              value={imageId}
              render={({ open }) => (
                <Button onClick={open} variant="secondary">
                  {imageUrl ? __('Change Image', 'imagewize') : __('Select Image', 'imagewize')}
                </Button>
              )}
            />
          </MediaUploadCheck>
          {imageUrl && (
            <TextControl
              label={__('Image Alt Text', 'imagewize')}
              value={imageAlt}
              onChange={(value) => setAttributes({ imageAlt: value })}
            />
          )}
        </PanelBody>

        <PanelBody title={__('Button Settings', 'imagewize')} initialOpen={false}>
          <h3>{__('Primary Button', 'imagewize')}</h3>
          <TextControl
            label={__('Button Text', 'imagewize')}
            value={primaryButtonText}
            onChange={(value) => setAttributes({ primaryButtonText: value })}
          />
          <TextControl
            label={__('Button URL', 'imagewize')}
            value={primaryButtonUrl}
            onChange={(value) => setAttributes({ primaryButtonUrl: value })}
            type="url"
          />
          <ToggleControl
            label={__('Open in new tab', 'imagewize')}
            checked={primaryButtonTarget === '_blank'}
            onChange={(value) => setAttributes({ primaryButtonTarget: value ? '_blank' : '' })}
          />
          <SelectControl
            label={__('Button Size', 'imagewize')}
            value={primaryButtonSize}
            options={buttonSizeOptions}
            onChange={(value) => setAttributes({ primaryButtonSize: value })}
          />

          <h3>{__('Secondary Button', 'imagewize')}</h3>
          <TextControl
            label={__('Button Text', 'imagewize')}
            value={secondaryButtonText}
            onChange={(value) => setAttributes({ secondaryButtonText: value })}
            placeholder={__('Optional', 'imagewize')}
          />
          <TextControl
            label={__('Button URL', 'imagewize')}
            value={secondaryButtonUrl}
            onChange={(value) => setAttributes({ secondaryButtonUrl: value })}
            type="url"
          />
          <ToggleControl
            label={__('Open in new tab', 'imagewize')}
            checked={secondaryButtonTarget === '_blank'}
            onChange={(value) => setAttributes({ secondaryButtonTarget: value ? '_blank' : '' })}
          />
          <SelectControl
            label={__('Button Size', 'imagewize')}
            value={secondaryButtonSize}
            options={buttonSizeOptions}
            onChange={(value) => setAttributes({ secondaryButtonSize: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {displayImageUrl && (
          <figure className="image-text-card__image">
            <img src={displayImageUrl} alt={imageAlt || 'Card image'} />
          </figure>
        )}

        <div className="image-text-card__content">
          <RichText
            tagName="h2"
            className="image-text-card__heading"
            value={heading}
            onChange={(value) => setAttributes({ heading: value })}
            placeholder={__('Card Title', 'imagewize')}
          />

          <RichText
            tagName="p"
            className="image-text-card__body"
            value={bodyText}
            onChange={(value) => setAttributes({ bodyText: value })}
            placeholder={__('Add your descriptive text here...', 'imagewize')}
          />

          <div className="image-text-card__buttons">
            {primaryButtonText && (
              <a
                href={primaryButtonUrl || '#'}
                className={`btn btn--primary btn--${primaryButtonSize}`}
              >
                {primaryButtonText}
              </a>
            )}
            {secondaryButtonText && (
              <a
                href={secondaryButtonUrl || '#'}
                className={`btn btn--secondary btn--${secondaryButtonSize}`}
              >
                {secondaryButtonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
```

**Key Features:**
- `BlockControls`: Toolbar controls for quick image change
- `InspectorControls`: Sidebar controls for advanced settings
- `RichText`: Inline editing for heading and body text
- `MediaUpload` wrapped with `MediaUploadCheck`: Native WordPress media library integration
- `SelectControl`: Dropdown for button size variants
- `ToggleControl`: For "open in new tab" functionality
- Typography controls come from `supports.typography` in block.json

### Step 5: Build Save Component (save.jsx)

**Location:** `resources/js/blocks/block-name/save.jsx`

Create the React component that generates frontend markup:

```jsx
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    imageUrl,
    imageAlt,
    heading,
    bodyText,
    primaryButtonText,
    primaryButtonUrl,
    primaryButtonTarget,
    primaryButtonSize,
    secondaryButtonText,
    secondaryButtonUrl,
    secondaryButtonTarget,
    secondaryButtonSize,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'image-text-card',
  });

  // Default image fallback
  const displayImageUrl = imageUrl || '/app/themes/nynaeve/resources/images/placeholder.jpg';

  return (
    <div {...blockProps}>
      {displayImageUrl && (
        <figure className="image-text-card__image">
          <img src={displayImageUrl} alt={imageAlt || 'Card image'} />
        </figure>
      )}

      <div className="image-text-card__content">
        <RichText.Content
          tagName="h2"
          className="image-text-card__heading"
          value={heading}
        />

        <RichText.Content
          tagName="p"
          className="image-text-card__body"
          value={bodyText}
        />

        <div className="image-text-card__buttons">
          {primaryButtonText && (
            <a
              href={primaryButtonUrl || '#'}
              className={`btn btn--primary btn--${primaryButtonSize}`}
              {...(primaryButtonTarget && {
                target: primaryButtonTarget,
                rel: 'noopener noreferrer'
              })}
            >
              {primaryButtonText}
            </a>
          )}
          {secondaryButtonText && (
            <a
              href={secondaryButtonUrl || '#'}
              className={`btn btn--secondary btn--${secondaryButtonSize}`}
              {...(secondaryButtonTarget && {
                target: secondaryButtonTarget,
                rel: 'noopener noreferrer'
              })}
            >
              {secondaryButtonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Important:** 
- The save component must output clean, semantic HTML that matches the editor preview
- Always use fallback values for optional attributes
- Include security attributes for external links
- Use conditional rendering for optional sections

### Step 6: Port CSS Styles (style.css)

**Location:** `resources/js/blocks/block-name/style.css`

Port CSS from Moiraine pattern and add responsive styles:

```css
/* Default: constrained to content width */
.image-text-card {
  max-width: var(--wp--style--global--content-size, 55rem);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border: 1px solid var(--wp--preset--color--border, #e5e7eb);
  border-radius: 0.5rem;
  overflow: hidden;
  background: var(--wp--preset--color--white, #fff);
}

/* Wide alignment */
.image-text-card.alignwide {
  max-width: var(--wp--style--global--wide-size, 64rem);
}

/* Full alignment */
.image-text-card.alignfull {
  max-width: none;
  margin-left: 0;
  margin-right: 0;
  border-radius: 0;
}

/* Image */
.image-text-card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-text-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Content */
.image-text-card__content {
  padding: var(--wp--preset--spacing--large, 3rem);
}

/* Heading - use theme font size presets */
.image-text-card__heading {
  font-size: var(--wp--preset--font-size--2-xl, 1.5rem);
  font-weight: 700;
  margin-bottom: var(--wp--preset--spacing--small, 1rem);
  line-height: 1.3;
}

/* Body text */
.image-text-card__body {
  font-size: var(--wp--preset--font-size--base, 1rem);
  line-height: 1.6;
  margin-bottom: var(--wp--preset--spacing--medium, 1.5rem);
  color: var(--wp--preset--color--text, #374151);
}

/* Buttons */
.image-text-card__buttons {
  display: flex;
  gap: var(--wp--preset--spacing--small, 1rem);
  flex-wrap: wrap;
}

/* Button base styles */
.btn {
  display: inline-block;
  text-decoration: none;
  border-radius: 0.375rem;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s ease;
}

/* Button sizes */
.btn--small {
  padding: 0.5rem 1rem;
  font-size: var(--wp--preset--font-size--sm, 0.875rem);
}

.btn--medium {
  padding: 0.75rem 1.5rem;
  font-size: var(--wp--preset--font-size--base, 1rem);
}

.btn--large {
  padding: 1rem 2rem;
  font-size: var(--wp--preset--font-size--lg, 1.125rem);
}

/* Button variants */
.btn--primary {
  background-color: var(--wp--preset--color--primary, #3b82f6);
  color: #fff;
}

.btn--primary:hover {
  background-color: var(--wp--preset--color--primary-dark, #2563eb);
}

.btn--secondary {
  background-color: transparent;
  color: var(--wp--preset--color--primary, #3b82f6);
  border: 2px solid var(--wp--preset--color--primary, #3b82f6);
}

.btn--secondary:hover {
  background-color: var(--wp--preset--color--primary, #3b82f6);
  color: #fff;
}

/* Responsive */
@media (max-width: 768px) {
  .image-text-card__content {
    padding: var(--wp--preset--spacing--medium, 1.5rem);
  }

  .image-text-card__buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
```

**Benefits of Using Theme Presets:**
- Maintains consistency with theme design system
- Easier to maintain and adjust globally
- Respects user's font size preferences
- Better accessibility
- Uses short class names for cleaner CSS

### Step 7: Add Editor Styles (editor.css)

**Location:** `resources/js/blocks/block-name/editor.css`

Add editor-specific styles to match frontend appearance:

```css
/* Editor-only border to make block visible */
.wp-block-imagewize-content-image-text-card {
  border: 2px dashed #007cba;
}

/* Disable interactions in editor */
.editor-styles-wrapper .image-text-card__button {
  pointer-events: none;
}

/* Style placeholder content */
.wp-block-imagewize-content-image-text-card p:first-of-type {
  color: #757575;
  font-style: italic;
}

/* Ensure proper preview in editor */
.editor-styles-wrapper .image-text-card {
  /* Additional editor-specific styles if needed */
}
```

**Note:** Use the full WordPress class name for editor-specific styles, not the short class name.

### Step 8: Test and Refine

1. **Build assets:**
   ```bash
   cd site/web/app/themes/nynaeve
   npm run dev  # For development with HMR
   # or
   npm run build  # For production
   ```

2. **Test in Block Editor:**
   - Insert block and verify it appears
   - Test all controls (image upload, text editing, buttons)
   - Test typography controls (font size, line height)
   - Test spacing controls (padding, margin)
   - Test color controls (background, text)
   - Test alignment options (default, wide, full)
   - Preview on frontend

3. **Refinements:**
   - Adjust CSS and spacing
   - Add more button variants if needed
   - Fine-tune responsive breakpoints
   - Test across browsers

### Step 9: Documentation

Update documentation:
- Update `CLAUDE.md` with block usage notes
- Update `CHANGELOG.md` with version notes
- Document any special features or requirements
- Add examples/screenshots if helpful

## Updated Conversion Checklist

**Setup:**
- [ ] Analyze Moiraine pattern structure and styling
- [ ] **DECISION**: Choose InnerBlocks vs Custom Controls approach
  - [ ] **InnerBlocks**: For content-focused blocks with image + heading + paragraph + buttons
  - [ ] **Custom Controls**: For complex styling/layout options not available in native blocks
- [ ] Create Sage Native Block from Trellis VM: `wp acorn sage-native-block:add-setup imagewize/block-name`
- [ ] Install any required npm packages (e.g., `@wordpress/icons`)

**Configuration (block.json):**
- [ ] **CRITICAL**: Set `"textdomain": "imagewize"` (NOT "sage")
- [ ] **CRITICAL**: Add `className` attribute with default `"wp-block-imagewize-block-name"`
- [ ] **InnerBlocks**: Remove custom attributes, keep only `className` 
- [ ] **Custom Controls**: Define all custom attributes with proper defaults
- [ ] Add `version` field for cache busting
- [ ] Include `viewScript: "file:./view.js"` even if not used initially
- [ ] Add descriptive `keywords` for discoverability
- [ ] Include `example: {}` for block preview
- [ ] Set `"html": false` in supports
- [ ] Do NOT set default alignment unless you want wide/full - omit for normal content-width

**Development Choice:**

**Option A: InnerBlocks Approach (PREFERRED for content blocks):**
- [ ] **editor.jsx**: Import `InnerBlocks`, define `TEMPLATE` with native blocks
- [ ] **save.jsx**: Use `<InnerBlocks.Content />` only
- [ ] **CSS**: Target `.block-name .wp-block-*` for styling native blocks
- [ ] **Template**: Define structure with `core/image`, `core/heading`, `core/paragraph`, `core/button`
- [ ] **Template Lock**: Set to `"all"` to maintain structure while allowing content editing
- [ ] **Allowed Blocks**: Restrict to relevant block types
- [ ] **No Inspector Controls**: Let native blocks handle their own settings

**Option B: Custom Controls Approach (for complex blocks):**
- [ ] Import all needed components including `BlockControls`, `MediaUploadCheck`, `ToggleControl`
- [ ] Import icons from `@wordpress/icons` if using toolbar buttons
- [ ] Wrap `MediaUpload` with `MediaUploadCheck`
- [ ] Add `BlockControls` with toolbar buttons
- [ ] Add `InspectorControls` with sidebar settings
- [ ] Add `ToggleControl` for "open in new tab" functionality
- [ ] Use fallback values for optional attributes in preview
- [ ] Use correct textdomain in `__()` calls: `__('Text', 'imagewize')`
- [ ] Add fallback values for all optional attributes (`||` operator)
- [ ] Use `href={url || '#'}` for buttons without URLs
- [ ] Include `rel="noopener noreferrer"` for external links
- [ ] Use conditional rendering (`&&`) for optional sections
- [ ] Provide alt text fallbacks for images

**Styling:**
- [ ] **InnerBlocks**: Use CSS targeting `.block-name .wp-block-*` selectors
- [ ] **Custom Controls**: Use short class names (`.block-name` not `.wp-block-namespace-block-name`)
- [ ] Use CSS custom properties from theme (`var(--wp--preset--*)`)
- [ ] Add alignment support (default, wide, full)
- [ ] Use full WordPress class in `editor.css` for editor-only styles
- [ ] **InnerBlocks**: Add visual guides for editor structure
- [ ] **Custom Controls**: Add visual boundaries (borders) for editing clarity
- [ ] **Custom Controls**: Disable pointer events on interactive elements in editor

**Testing:**
- [ ] Build: `npm run dev` (HTTP only for HMR) or `npm run build`
- [ ] **InnerBlocks**: Test inline editing of each component (image, heading, paragraph, buttons)
- [ ] **InnerBlocks**: Test native block toolbar controls for each element
- [ ] **Custom Controls**: Test all controls, responsive, alignment
- [ ] Test default placeholder content
- [ ] **Both**: Test alignment options and responsive design
- [ ] **InnerBlocks**: Verify template lock prevents structural changes
- [ ] **Custom Controls**: Test buttons without URLs and "open in new tab"

## Content Image Text Card - Complete Feature List

**Two Implementation Approaches Available:**

### v1.15.0: Custom Controls Approach (Legacy)
**Completed block:** `imagewize/content-image-text-card` (custom attributes version)

**Features:**
- Image upload with default placeholder fallback
- Toolbar button for quick image change
- RichText inline editing for heading and body text
- Primary button with text, URL, size (small/medium/large), and "open in new tab"
- Secondary button with text, URL, size (small/medium/large), and "open in new tab"
- Buttons render even without URLs (default to `#`)
- Inspector Controls in sidebar for all button settings
- Native WordPress controls: Typography, spacing, colors, alignment

### v1.15.1: InnerBlocks Approach (CURRENT - PREFERRED)
**Updated block:** `imagewize/content-image-text-card` (InnerBlocks version)

**Features:**
- **Native Image Block**: Full WordPress image controls (upload, alt text, size, etc.)
- **Native Heading Block**: Direct editing with typography toolbar controls  
- **Native Paragraph Block**: Direct editing with formatting toolbar
- **Native Button Blocks**: Two individual button blocks with separate URL, text, and styling controls
- **Clean Sidebar**: No inspector controls - everything editable directly in editor
- **Modular Components**: Each element maintains its own WordPress settings
- **Template Structure**: Predefined layout with Image → Content Group → Button Group
- **Template Lock**: Maintains structure while allowing full content editing

**Key Differences:**
- **Editing**: Direct inline editing vs sidebar controls
- **User Experience**: Native WordPress block toolbar controls vs custom inspector panels
- **Maintenance**: InnerBlocks uses WordPress core functionality vs custom implementation
- **Flexibility**: Each component fully customizable vs block-level settings
- **Clean Interface**: No sidebar clutter vs organized inspector panels

**When to Use Each:**
- **InnerBlocks**: Content-focused blocks, simpler editing, native WordPress experience
- **Custom Controls**: Complex styling options, advanced settings, custom functionality

**Migration:** Existing custom control blocks can coexist; new content should use InnerBlocks approach.

**Key Lessons:**
- **PREFERRED**: Use InnerBlocks approach for content-focused blocks
- Must install `@wordpress/icons` package if using custom toolbar buttons
- InnerBlocks approach eliminates need for custom attributes and fallback values
- Use `templateLock: "all"` to maintain structure while allowing content editing
- CSS should target `.block-name .wp-block-*` for styling native blocks within container
- **Avoid hardcoded classes in templates** - let users select styles via block toolbar
- Button styles controlled by WordPress button filter (5 variants: Default, Outline, Secondary, Light, Dark)
- Template defines default content and block structure
- **CRITICAL**: Use `"textdomain": "imagewize"` not "sage"
- **CRITICAL**: Include `className` attribute in block.json for WordPress styling

**InnerBlocks Structure:**
```
resources/js/blocks/content-image-text-card/
├── block.json          # Minimal attributes (className only), template configuration
├── index.js           # Standard registerBlockType
├── editor.jsx         # InnerBlocks with TEMPLATE and templateLock
├── save.jsx           # Simple <InnerBlocks.Content /> wrapper
├── style.css          # Targets native WordPress blocks (.wp-block-*)
├── editor.css         # Visual guides for editor structure
└── view.js            # Placeholder for future interactivity
```

**Template Structure:**
```jsx
const TEMPLATE = [
  ['core/image', { className: 'image-text-card__image' }],
  ['core/group', { className: 'image-text-card__content' }, [
    ['core/heading', { level: 3 }],
    ['core/paragraph', {}],
  ]],
  ['core/group', { className: 'image-text-card__buttons', layout: { type: 'flex' } }, [
    ['core/button', { text: 'Primary Action' }],
    ['core/button', { text: 'Secondary Action' }],
  ]],
];
```

## Pattern-Specific Notes

### Content Image Text Pattern ✓
- **Moiraine Location:** `~/code/moiraine/patterns/content-image-text.php`
- **Completed:** Converted to Sage Native Block `imagewize/content-image-text-card`
- **Features:** Image upload, heading, body text, primary/secondary buttons, button size variants, "open in new tab"
- **Controls:** Typography (font size, line height), spacing (padding, margin), colors (background, text)
- **Key Implementation Details:**
  - Uses fallback image and default href values
  - Includes toolbar controls for quick image change
  - Supports external link security attributes
  - Uses theme CSS custom properties

### Hero CTA Pattern
- **Moiraine Location:** `~/code/moiraine/patterns/hero-cta.php`
- **Attributes Needed:** Background image, heading, subheading, CTA buttons (multiple), text alignment, overlay opacity
- **Controls:** Typography, colors, spacing, alignment options
- **Button Variants:** Size variants (small, medium, large), style variants (primary, secondary, outline)

### Blog Grid Pattern
- **Moiraine Location:** `~/code/moiraine/patterns/blog-grid.php`
- **Attributes Needed:** Post query settings, grid columns (2/3/4), show excerpts toggle, featured image toggle
- **Controls:** Layout controls (columns, gap), typography for headings/excerpts
- **Dynamic:** May require server-side rendering or REST API integration

### Testimonial Card Pattern
- **Moiraine Location:** `~/code/moiraine/patterns/testimonial-card.php`
- **Attributes Needed:** Quote text, author name, author title, author image, rating
- **Controls:** Typography for quote/author, colors, spacing
- **Layout Options:** Card variations (with/without image, alignment options)

## Benefits Summary

| Aspect | ACF Composer Blocks | Custom Controls Native Blocks | InnerBlocks Native Blocks |
|--------|---------------------|-------------------------------|---------------------------|
| Typography Controls | Limited (hardcoded in CSS) | Full (font size picker, line height, font family) | Full (native block typography controls) |
| Button Variants | Hard to add | Easy (size/style variants) | Native button block controls |
| Content Editing | ACF sidebar fields | RichText + sidebar | Direct inline editing |
| Design System | Indirect | Direct (theme.json integration) | Direct (theme.json integration) |
| Maintainability | PHP/Blade templates | React components with custom logic | Simple React + WordPress core |
| User Experience | ACF field interface | Custom WordPress controls | Native WordPress block interface |
| Styling Flexibility | Limited to developer | Users can customize via inspector | Users can customize each element natively |
| Frontend JavaScript | Difficult to add | Easy (view.js file) | Easy (view.js file) |
| Development Complexity | Low (PHP/Blade) | High (custom attributes + controls) | Low (template definition) |
| Sidebar Cleanliness | Clean (single ACF panel) | Cluttered (multiple panels) | Clean (no custom controls) |
| Block Toolbar Usage | Limited | Custom toolbar buttons | Full native toolbar per element |

## Resources

- **Sage Native Block Package:** https://github.com/imagewize/sage-native-block
- **Moiraine Patterns:** `~/code/moiraine/patterns/`
- **Nynaeve Native Blocks:** `site/web/app/themes/nynaeve/resources/js/blocks/`
- **WordPress Block Editor Handbook:** https://developer.wordpress.org/block-editor/
- **Block Registration:** https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/

## Next Steps

1. ✓ Convert **Content Image Text** pattern to Sage Native Block (completed)
2. Evaluate ACF Composer blocks in theme - consider converting those needing typography/button controls
3. Convert remaining priority Moiraine patterns as Sage Native Blocks
4. Document learned patterns and best practices
5. Create reusable button components for consistent styling across blocks
