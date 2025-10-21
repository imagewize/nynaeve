# About Block Migration Plan

## Migration Status

✅ **COMPLETED** - October 21, 2025

The About Block has been successfully migrated from a standalone Composer plugin to a Sage Native Block within the Nynaeve theme.

**Migration Summary**:
- ✅ Block scaffold created at `resources/js/blocks/about/`
- ✅ Block metadata (block.json) updated with original configuration
- ✅ Edit component migrated with InnerBlocks template
- ✅ Save component migrated with attribute handling
- ✅ Styles migrated (both frontend and editor)
- ✅ Profile image asset copied to block directory
- ✅ Theme build successful
- ⏳ **NEXT STEP**: Test in WordPress editor and update existing content

## Overview

Migrating the `imagewize/about-block` plugin (v1.0.1) to a Sage Native Block in the Nynaeve theme called **About Block** (`imagewize/about`).

**Original Location**: Composer plugin at `site/web/app/plugins/about-block/`
**New Location**: Theme block at `site/web/app/themes/nynaeve/resources/js/blocks/about/`
**Primary Colors**: Gray background (#ebeced/border-light), secondary text (#98999a/secondary)

## Why Migrate to Theme?

Following the content width and layout improvements documented in [CONTENT-WIDTH-AND-LAYOUT.md](../CONTENT-WIDTH-AND-LAYOUT.md):

1. **Consistency**: All blocks managed in one place (theme) with unified design system
2. **Maintainability**: Easier updates alongside theme changes
3. **Performance**: Reduces plugin dependencies, consolidates asset loading
4. **Design System Integration**: Direct access to Tailwind CSS 4 and theme utilities
5. **Simplified Workflow**: No separate plugin repository to maintain

## Current Plugin Analysis

### Block Structure (Original - Uses Group + Columns)

The current plugin uses a **Group block** containing **2-column layout** with asymmetric widths (20% image / 80% text):

```
About Block (full width, #ebeced background)
├── Group (constrained layout, gray background)
│   ├── Spacer (60px)
│   ├── Columns (constrained, 2 columns)
│   │   ├── Column 1 (20% width - profile image)
│   │   │   └── Image (rounded border, 8px solid gray)
│   │   └── Column 2 (80% width - text content)
│   │       ├── Heading (h2, 3xl, black, Open Sans)
│   │       ├── Paragraph (lg, gray #98999a, line-height 1.6)
│   │       └── Paragraph (base, gray #98999a, line-height 2)
│   └── Spacer (60px)
```

### Improved Structure (Using Group - Simplified)

Since this is a **two-column layout** (image + text), we should keep the columns but simplify the wrapper:

```
About Block (full width, #ebeced background)
├── Group (constrained width, centered, vertical padding)
│   └── Columns (2 columns: 20% / 80%)
│       ├── Column 1 (20% - Profile Image)
│       │   └── Image (rounded, bordered)
│       └── Column 2 (80% - Text Content)
│           ├── Heading (3xl, black)
│           ├── Paragraph (lg, gray)
│           └── Paragraph (base, gray)
```

**Benefits of This Structure**:
- Maintains horizontal layout (columns are appropriate here)
- Single Group wrapper with constrained layout
- Uses theme's constrained width setting
- Cleaner than original (removed redundant nesting)
- Proper semantic HTML for side-by-side content
- Better responsive behavior (columns stack on mobile)

### Key Features to Preserve

1. **InnerBlocks Template**: Two-column layout with profile image and text
2. **Rounded Image Border**: Custom rounded style with 8px gray border
3. **Full-Width Alignment**: Block spans full viewport width by default
4. **Centered Content**: Content constrained to readable width via Group
5. **Color System**:
   - Background: #ebeced (border-light in theme)
   - Text heading: Black (#000000)
   - Text paragraphs: Gray #98999a (secondary in theme)
   - Image border: #cbcbcb (border-dark in theme)
6. **Typography**:
   - Font: Open Sans with system font fallbacks
   - Heading: 3xl font size
   - First paragraph: lg font size, line-height 1.6
   - Second paragraph: base font size, line-height 2
7. **Vertical Spacing**: 60px padding top/bottom via spacers
8. **Column Layout**: 20% image column, 80% text column
9. **Responsive Design**: Mobile padding and centered headings

### Technical Details

**Attributes**:
- `backgroundColor`: "#ebeced" (default)
- `textColor`: "#98999a" (default)
- `style`: Object for custom styles

**Block Supports**:
- Alignment: wide, full
- Color: background, text
- Spacing: padding, margin
- Typography: fontSize, lineHeight
- Border: color, radius, width (experimental)

**Special Functionality**:
- **Image Style Registration**: Registers "rounded" style for core/image block
- **Profile Image Asset**: Default profile.jpg imported and used in template
- **Mobile Responsiveness**: Custom padding and centering on screens < 768px

## Migration Plan

### Phase 1: Create Sage Native Block

#### Step 1.1: Generate Block Scaffold

```bash
# Run from Trellis VM (required for database access)
cd trellis
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:create about-block --template=nynaeve-innerblocks --force
```

**Expected Output**:
- `resources/js/blocks/about-block/block.json`
- `resources/js/blocks/about-block/index.js`
- `resources/js/blocks/about-block/edit.js`
- `resources/js/blocks/about-block/save.js`
- `resources/js/blocks/about-block/style.css`
- `resources/js/blocks/about-block/editor.css`

#### Step 1.2: Copy Profile Image Asset

```bash
# Copy profile image from plugin to theme
cp site/web/app/plugins/about-block/src/assets/profile.jpg site/web/app/themes/nynaeve/resources/images/profile.jpg
```

#### Step 1.3: Update Block Metadata (block.json)

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "imagewize/about-block",
  "version": "1.0.0",
  "title": "About Block",
  "category": "imagewize",
  "icon": "id-alt",
  "description": "About section with profile image and text layout",
  "keywords": ["about", "profile", "bio", "introduction"],
  "textdomain": "imagewize",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css",
  "attributes": {
    "align": {
      "type": "string",
      "default": "full"
    },
    "backgroundColor": {
      "type": "string",
      "default": "border-light"
    }
  },
  "supports": {
    "html": false,
    "align": ["wide", "full"],
    "color": {
      "background": true,
      "text": true
    },
    "spacing": {
      "padding": true,
      "margin": true
    },
    "typography": {
      "fontSize": true,
      "lineHeight": true
    }
  }
}
```

**Note**: Changed default alignment to `"full"` and background color to theme's `"border-light"` color.

### Phase 2: Implement Block Structure

#### Step 2.1: Create InnerBlocks Template (edit.js)

```javascript
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import profileImage from '../../images/profile.jpg';

// Register rounded image style
import { registerBlockStyle } from '@wordpress/blocks';

wp.domReady(() => {
  if (wp.blocks.getBlockType('core/image')) {
    registerBlockStyle('core/image', {
      name: 'rounded',
      label: __('Rounded', 'imagewize'),
    });
  }
});

const TEMPLATE = [
  [
    'core/group',
    {
      align: 'wide',
      layout: { type: 'constrained' },
      style: {
        color: {
          background: 'var(--wp--preset--color--border-light, #ebeced)',
        },
        spacing: {
          padding: {
            top: 'var(--wp--preset--spacing--60)',
            bottom: 'var(--wp--preset--spacing--60)',
          },
        },
      },
    },
    [
      [
        'core/columns',
        {
          align: 'wide',
        },
        [
          [
            'core/column',
            {
              width: '20%',
              style: {
                spacing: {
                  padding: {
                    top: '1rem',
                  },
                },
              },
            },
            [
              [
                'core/image',
                {
                  url: profileImage,
                  alt: 'Profile Image',
                  className: 'is-style-rounded aligncenter',
                  style: {
                    border: {
                      width: '8px',
                      color: 'var(--wp--preset--color--border-dark, #cbcbcb)',
                      style: 'solid',
                    },
                  },
                },
              ],
            ],
          ],
          [
            'core/column',
            {
              width: '80%',
            },
            [
              [
                'core/heading',
                {
                  level: 2,
                  fontSize: '3xl',
                  style: {
                    typography: {
                      fontFamily:
                        'var(--wp--preset--font-family--open-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif)',
                      fontStyle: 'normal',
                      fontWeight: '400',
                    },
                    color: {
                      text: '#000000',
                    },
                  },
                  content: 'Custom Crafted Websites & E-Commerce.',
                },
              ],
              [
                'core/paragraph',
                {
                  fontSize: 'lg',
                  style: {
                    typography: {
                      fontFamily:
                        'var(--wp--preset--font-family--open-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif)',
                      lineHeight: 1.6,
                    },
                    color: {
                      text: 'var(--wp--preset--color--secondary, #98999a)',
                    },
                  },
                  content:
                    'At Imagewize, we empower SMEs and startups by delivering custom web and e-commerce solutions. With expertise in web design, development, and SEO, every project is tailored to meet your unique needs and drive success. This site is dedicated to helping businesses grow online with customized, high-performance solutions.',
                },
              ],
              [
                'core/paragraph',
                {
                  fontSize: 'base',
                  style: {
                    typography: {
                      fontFamily:
                        'var(--wp--preset--font-family--open-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif)',
                      lineHeight: 2,
                    },
                    color: {
                      text: 'var(--wp--preset--color--secondary, #98999a)',
                    },
                  },
                  content:
                    'Imagewize began as a passion project in 2016 and has grown into a full-service web solutions provider. Our mission is to craft stunning websites, build powerful e-commerce platforms with WooCommerce, and implement cutting-edge SEO strategies, including technical SEO. Whether you need a custom WordPress site or a tailored WooCommerce solution, we deliver exceptional results designed to help your business thrive online.',
                },
              ],
            ],
          ],
        ],
      ],
    ],
  ],
];

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-about-block',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} />
    </div>
  );
}
```

**Key Changes from Plugin**:
- Removed outer Group wrapper (WordPress handles full-width alignment)
- Inner Group provides constrained layout with vertical padding
- Columns remain for proper side-by-side layout
- Uses theme color variables with fallbacks
- Profile image imported from theme's resources/images/
- Registers rounded image style using WordPress API

#### Step 2.2: Create Save Function (save.js)

```javascript
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'wp-block-imagewize-about-block',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
```

### Phase 3: Style Implementation

#### Step 3.1: Frontend Styles (style.css)

```css
.wp-block-imagewize-about-block {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  /* Image styles */
  .wp-block-image {
    margin: 0;
    display: flex;
    justify-content: center;
  }

  /* Rounded image style */
  .wp-block-image img.is-style-rounded {
    border-radius: 9999px; /* Full circle */
  }

  /* Full width alignment - WordPress handles this natively */
  /* Note: Use width: 100% NOT 100vw (see docs/DEV.md → Full-Width Block Styling) */
  &.alignfull {
    width: 100%;
  }

  /* Mobile responsive styles */
  @media (max-width: 768px) {
    /* Remove negative margins on mobile */
    margin-left: 0;
    margin-right: 0;

    /* Full-width mobile padding */
    &.alignfull {
      .wp-block-group__inner-container {
        padding-left: 1rem;
        padding-right: 1rem;
      }

      .wp-block-heading {
        text-align: center;
        padding-left: 1rem;
        padding-right: 1rem;
      }

      .wp-block-paragraph,
      p {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }

    /* Standard mobile padding */
    .wp-block-group__inner-container {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    /* Remove padding from columns container */
    .wp-block-columns {
      padding-left: 0;
      padding-right: 0;
    }

    /* Center headings on mobile */
    .wp-block-heading {
      text-align: center;
    }

    /* Paragraph mobile padding */
    .wp-block-paragraph {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
}
```

#### Step 3.2: Editor Styles (editor.css)

```css
.wp-block-imagewize-about-block {
  /* Editor-specific styles if needed */
  /* Most styles are shared via style.css */

  /* Preview full-width behavior in editor */
  &.alignfull {
    max-width: none;
  }
}
```

### Phase 4: Testing & Validation

#### Step 4.1: Build Theme

```bash
cd site/web/app/themes/nynaeve
npm run build
```

#### Step 4.2: Test in Editor

**Functionality Checklist**:
- [ ] Block appears in inserter under "Imagewize" category
- [ ] Default template renders with profile image and text
- [ ] Full-width alignment works correctly (default)
- [ ] Background color is border-light (#ebeced)
- [ ] Profile image displays with rounded border
- [ ] Profile image has 8px solid gray border
- [ ] Heading is 3xl font size, black color
- [ ] First paragraph is lg font size, gray color
- [ ] Second paragraph is base font size, gray color
- [ ] Columns are 20% / 80% width
- [ ] Content is constrained to theme's max width
- [ ] Vertical spacing (60px padding) is correct
- [ ] InnerBlocks allow customization
- [ ] Rounded image style is available in block styles

#### Step 4.3: Test on Frontend

**Frontend Checklist**:
- [ ] Block renders correctly on published page
- [ ] Full-width background spans viewport
- [ ] Content is centered and constrained
- [ ] Profile image is circular with border
- [ ] Typography matches design (sizes, colors, line heights)
- [ ] Colors match theme (border-light, secondary, border-dark)
- [ ] Columns layout works correctly (20/80 split)
- [ ] Responsive behavior works on mobile/tablet
- [ ] Mobile: Columns stack vertically
- [ ] Mobile: Heading is centered
- [ ] Mobile: Proper padding applied
- [ ] No console errors or warnings

### Phase 5: Migration & Cleanup

#### Step 5.1: Update Existing Content

**Option A: Manual Update** (Recommended for few instances)
1. Create new About Block in editor
2. Copy content from old About Block
3. Upload same profile image
4. Delete old block
5. Save

**Option B: Block Deprecation** (For many instances)
1. Create deprecation in block.json to handle old plugin block
2. WordPress auto-migrates on page save
3. Document in theme changelog

#### Step 5.2: Remove Plugin Dependency

Update `site/composer.json`:

```json
{
  "require": {
    // Remove this line:
    // "imagewize/about-block": "^1.0.0"
  }
}
```

Run Composer update:
```bash
cd site
composer update --no-dev
```

#### Step 5.3: Verify Removal

```bash
# Should return empty/not found
ls site/web/app/plugins/about-block/
```

### Phase 6: Documentation

#### Step 6.1: Update Block Documentation

Create usage guide in theme docs (this file).

#### Step 6.2: Update Changelog

Add to `site/web/app/themes/nynaeve/CHANGELOG.md`:

```markdown
## [Version] - [Date]

### Added
- About Block: Migrated from imagewize/about-block plugin to theme
  - Uses Group + Columns for proper two-column layout
  - Maintains rounded profile image with border
  - Integrated with theme design system (border-light, secondary colors)
  - Responsive mobile design with centered headings

### Removed
- Dependency on imagewize/about-block Composer plugin
```

## Block Usage Guide

### How to Use About Block

1. **Insert Block**:
   - Click "+" in editor
   - Search for "About Block"
   - Block inserts with default template (profile image + text)

2. **Customize Content**:
   - **Profile Image**: Click image → Upload/select from media library
   - **Heading**: Edit heading text (default: "Custom Crafted Websites & E-Commerce.")
   - **Paragraphs**: Edit both paragraph texts
   - **Image Style**: Select image → Block toolbar → Styles → Rounded (circular)

3. **Customize Appearance**:
   - **Background**: Select block → Sidebar → Color → Background
   - **Text Color**: Select individual heading/paragraph → Sidebar → Color → Text
   - **Image Border**: Select image → Sidebar → Border → Width/Color/Radius
   - **Font Sizes**: Select heading/paragraph → Sidebar → Typography → Font Size

4. **Adjust Layout**:
   - **Alignment**: Select block → Toolbar → Full/Wide
   - **Spacing**: Select block → Sidebar → Spacing → Padding/Margin
   - **Column Widths**: Select column → Sidebar → Width

### Default Template

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────┐
│ [Full Width Gray Background - border-light]            │
│                                                         │
│   ┌─────────────────────────────────────────────┐     │
│   │ [Constrained Width Group - Centered]        │     │
│   │                                               │     │
│   │  ┌───┐  Custom Crafted Websites...          │     │
│   │  │ ● │  (Heading, 3xl, black, Open Sans)    │     │
│   │  └───┘                                       │     │
│   │  20%   At Imagewize, we empower SMEs...     │     │
│   │        (Paragraph, lg, gray, line-height 1.6)│     │
│   │                                               │     │
│   │        Imagewize began as a passion...       │     │
│   │        (Paragraph, base, gray, line-height 2)│     │
│   │        80% Text Column                        │     │
│   └─────────────────────────────────────────────┘     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Benefits of Group + Columns Structure

### Why Use Columns Here?

Unlike the CTA Blue Block which was truly single-column content, the About Block has **genuine side-by-side layout requirements**:

**About Block (Columns are correct)**:
```
Columns (2 columns: 20% / 80%)
├── Column 1 (Profile image - actual content)
└── Column 2 (Text content - actual content)
```

**Advantages of Columns for This Use Case**:
1. **Semantic**: Represents true horizontal relationship between image and text
2. **Responsive**: Columns automatically stack on mobile (WordPress core behavior)
3. **Flexible**: Users can adjust column widths via block settings
4. **Appropriate**: This is exactly what columns are designed for

### Comparison with CTA Blue Block

**CTA Blue Block** (vertical stacking):
- Heading
- Paragraph
- Button
→ **Solution**: Group (single column, no horizontal layout)

**About Block** (horizontal layout):
- Image | Text
→ **Solution**: Columns (side-by-side content)

### Wrapper Simplification

**Original Plugin**:
```
Outer Group (redundant)
└── Inner Group
    ├── Spacer
    ├── Columns
    └── Spacer
```

**New Theme Block**:
```
Group (single wrapper with padding)
└── Columns
```

**Benefits**:
- Removed redundant outer Group
- Vertical padding via Group's spacing settings (no spacer blocks needed)
- Cleaner DOM structure
- Easier to maintain

## Technical Notes

### Image Style Registration

The block registers a custom "rounded" style for the core/image block:

```javascript
wp.domReady(() => {
  if (wp.blocks.getBlockType('core/image')) {
    registerBlockStyle('core/image', {
      name: 'rounded',
      label: __('Rounded', 'imagewize'),
    });
  }
});
```

**CSS Implementation**:
```css
.wp-block-image img.is-style-rounded {
  border-radius: 9999px; /* Full circle */
}
```

Users can select this style from the image block's style selector in the block toolbar.

### Profile Image Asset

The default profile image is stored in the theme:
- **Location**: `resources/images/profile.jpg`
- **Import**: Via ES6 import in edit.js
- **Usage**: Set as default URL in image block template
- **Replacement**: Users can upload their own image via media library

### Mobile Responsiveness

**Breakpoint**: 768px

**Mobile Behavior**:
- Columns stack vertically (WordPress core behavior)
- Heading centers automatically
- Custom padding applied (1rem)
- Image remains centered
- Text remains readable with proper spacing

### Typography System

**Font Family**: Open Sans with comprehensive fallback stack:
```
var(--wp--preset--font-family--open-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif)
```

**Font Sizes**:
- Heading: `3xl` (theme preset)
- First paragraph: `lg` (theme preset)
- Second paragraph: `base` (theme preset)

**Line Heights**:
- Heading: Default (1.2-1.4 typically)
- First paragraph: 1.6 (increased readability)
- Second paragraph: 2.0 (extra spacing)

## Files Modified/Created

### New Files
```
site/web/app/themes/nynaeve/
├── resources/js/blocks/about-block/
│   ├── block.json
│   ├── index.js
│   ├── edit.js
│   ├── save.js
│   ├── style.css
│   └── editor.css
├── resources/images/
│   └── profile.jpg (copied from plugin)
└── docs/blocks/
    └── ABOUT-BLOCK.md (this file)
```

### Modified Files
```
site/
├── composer.json (remove imagewize/about-block dependency)
└── web/app/themes/nynaeve/
    └── CHANGELOG.md (document migration)
```

### Removed After Migration
```
site/web/app/plugins/about-block/ (entire plugin directory)
```

## Color Reference

### Default Colors

**Block Colors**:
- **Background**: `border-light` (#ebeced) - Light gray
- **Heading Text**: `#000000` - Black
- **Paragraph Text**: `secondary` (#98999a) - Medium gray
- **Image Border**: `border-dark` (#cbcbcb) - Dark gray border

**Theme Color Mapping**:
```css
--wp--preset--color--border-light: #ebeced;  /* Block background */
--wp--preset--color--secondary: #98999a;     /* Paragraph text */
--wp--preset--color--border-dark: #cbcbcb;   /* Image border */
```

### Tailwind CSS Classes (for reference)
```css
.bg-border-light  /* Background */
.text-black       /* Heading color */
.text-secondary   /* Paragraph color */
.border-border-dark /* Image border */
```

## Future Enhancements

### Potential Improvements

1. **Multiple Layout Variations**:
   - Image right / text left
   - Image top / text bottom
   - Three-column layout option

2. **Pattern Variations**: Create block patterns for different about styles
   - Team member profile
   - Company introduction
   - Founder story

3. **Social Media Integration**: Add optional social media icons/links below text

4. **Video Support**: Option to use video instead of static image

5. **Stats/Numbers**: Optional statistics section (years in business, clients served, etc.)

6. **Background Options**:
   - Gradient backgrounds
   - Image backgrounds with overlay

7. **Animation**: Add subtle entrance animations for image and text

### Theme Integration

- Consider adding to theme's block patterns collection
- Create variations with different color schemes
- Add to Gutenberg style guide/showcase
- Document in theme's pattern library

## Migration Timeline

**Estimated Time**: 2-3 hours

1. **Block Creation**: 30 minutes
2. **Feature Implementation**: 60 minutes
3. **Testing**: 30 minutes
4. **Content Migration**: 15 minutes
5. **Cleanup & Documentation**: 15 minutes

## Success Criteria

Migration is complete when:

- [ ] New block matches all functionality of plugin version
- [ ] Block uses Group + Columns structure (appropriate for this layout)
- [ ] Profile image displays with rounded border
- [ ] Image style registration works (rounded style available)
- [ ] All typography matches original (sizes, colors, line heights)
- [ ] Responsive behavior works on mobile (stacking, centering)
- [ ] All existing About blocks updated to new version
- [ ] Plugin removed from composer.json
- [ ] Plugin directory deleted
- [ ] Theme builds without errors
- [ ] Documentation complete
- [ ] No console errors on frontend/backend
- [ ] Passes accessibility tests
- [ ] Responsive on all breakpoints
- [ ] Colors use theme variables with fallbacks

## Support & Questions

For implementation questions or issues during migration:
- Reference: [CONTENT-WIDTH-AND-LAYOUT.md](../CONTENT-WIDTH-AND-LAYOUT.md)
- Theme docs: `/site/web/app/themes/nynaeve/docs/`
- Sage Native Block: `github.com/imagewize/sage-native-block`
- Block development guide: [PATTERN-TO-NATIVE-BLOCK.md](../PATTERN-TO-NATIVE-BLOCK.md)
