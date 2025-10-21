# Review Profiles Block Migration Plan

## Overview

Migrating the `imagewize/reviews-block` plugin (v1.1.0) to a Sage Native Block in the Nynaeve theme called **Review Profiles** (`imagewize/review-profiles`).

**Current Status**: Composer plugin at `site/web/app/plugins/reviews-block/`
**Migration Target**: Theme block at `site/web/app/themes/nynaeve/resources/js/blocks/review-profiles/`
**Primary Color**: Orange (#f97316 background, white text)

## Why This Name?

The block is being renamed from "Reviews Block" to **"Review Profiles"** to:
1. **Avoid Confusion**: Distinguish it from the existing `imagewize/testimonial-grid` block
2. **Descriptive**: Emphasizes the profile images which are the key differentiator
3. **Clear Intent**: Makes it clear this block focuses on customer reviews with profile photos
4. **Theme Consistency**: Follows Nynaeve's block naming conventions

### Key Differences from Testimonial Grid

| Feature | Review Profiles (New) | Testimonial Grid (Existing) |
|---------|----------------------|---------------------------|
| **Profile Images** | ✅ Yes - Circular profile photos | ❌ No images |
| **Layout** | 3-column static grid | 3-column carousel (Slick.js) |
| **Default Background** | Orange (#f97316) | Customizable |
| **Structure** | Simple InnerBlocks template | Complex carousel with controls |
| **Content Focus** | Customer testimonials with faces | Metrics-based testimonials |
| **Carousel** | ❌ No | ✅ Yes - with navigation |
| **Use Case** | Simple review display | Dynamic testimonial showcase |

## Why Migrate to Theme?

Following the content width and layout improvements documented in [CONTENT-WIDTH-AND-LAYOUT.md](../CONTENT-WIDTH-AND-LAYOUT.md):

1. **Consistency**: All blocks managed in one place (theme) with unified design system
2. **Maintainability**: Easier updates alongside theme changes
3. **Performance**: Reduces plugin dependencies, consolidates asset loading
4. **Design System Integration**: Direct access to Tailwind CSS 4 and theme utilities
5. **Simplified Workflow**: No separate plugin repository to maintain

## Current Plugin Analysis

### Block Structure (Original - Uses InnerBlocks)

The current plugin uses an **InnerBlocks template** with a 3-column layout containing profile images and review text:

```
Review Profiles Block (full width, orange #f97316 background)
├── Group (constrained layout, orange background)
│   ├── Spacer (80px)
│   ├── Heading (h2, 3xl, white, centered) - "Client Reviews."
│   ├── Columns (wide, 3 columns)
│   │   ├── Column 1 (33.33% width)
│   │   │   └── Group (vertical flex, centered, gap 1rem)
│   │   │       ├── Image (95px, circular, profile1.webp)
│   │   │       └── Paragraph (lg, white, centered) - Review text
│   │   ├── Column 2 (33.33% width)
│   │   │   └── Group (vertical flex, centered, gap 1rem)
│   │   │       ├── Image (95px, circular, profile2.webp)
│   │   │       └── Paragraph (lg, white, centered) - Review text
│   │   └── Column 3 (33.33% width)
│   │       └── Group (vertical flex, centered, gap 1rem)
│   │           ├── Image (95px, circular, profile3.webp)
│   │           └── Paragraph (lg, white, centered) - Review text
│   └── Spacer (80px)
```

### Key Features to Preserve

1. **InnerBlocks Template**: Predefined 3-column structure with profile images
2. **Circular Profile Images**: 95px width with border-radius: 100px
3. **Full-Width Orange Background**: Default #f97316 (orange-500)
4. **White Text**: High contrast on orange background
5. **Centered Layout**: Content constrained to theme's wide width
6. **Vertical Spacing**: 80px padding top/bottom via spacers
7. **Profile Photos**: Three default profile images (profile1.webp, profile2.webp, profile3.webp)
8. **Heading**: "Client Reviews." - 3xl, white, centered, Open Sans, 600 weight
9. **Review Text**: Large font size (lg), white, centered alignment
10. **Responsive Design**: Columns stack on mobile

### Technical Details

**Attributes**:
- `align`: "full" (default)
- `backgroundColor`: "#f97316" (orange-500, default)
- `textColor`: "white" (default)

**Block Supports**:
- Alignment: wide, full
- Color: background, text, link, gradients
- Spacing: padding, margin
- Layout: constrained (default)

**Assets**:
- **Profile Images** (3 files):
  - `src/reviews-block/assets/profile1.webp`
  - `src/reviews-block/assets/profile2.webp`
  - `src/reviews-block/assets/profile3.webp`
  - All imported and used in edit.js template

**Default Content**:
1. **Review 1**: "We have hired Jasper a couple of times and he always does a great job and in a timely manner! He is very good at what he does and we continue to use him for our projects."
2. **Review 2**: "His communication was top-notch, he met all deadlines, and his skills were very strong. He was proficient in WordPress, Woo Commerce, Shopify and programming on those platforms to get our new Shopify site up and running."
3. **Review 3**: "Couldn't have done this job without jasper and he did a great job. My website now runs faster than ever. Would definitely hire again."

## Migration Plan

### Phase 1: Create Sage Native Block

#### Step 1.1: Generate Block Scaffold

```bash
# Run from Trellis VM (required for database access)
cd trellis
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:create review-profiles --template=nynaeve-innerblocks --force
```

**Expected Output**:
- `resources/js/blocks/review-profiles/block.json`
- `resources/js/blocks/review-profiles/index.js`
- `resources/js/blocks/review-profiles/edit.js`
- `resources/js/blocks/review-profiles/save.js`
- `resources/js/blocks/review-profiles/style.css`
- `resources/js/blocks/review-profiles/editor.css`

#### Step 1.2: Copy Profile Image Assets

```bash
# Copy profile images from plugin to theme
mkdir -p site/web/app/themes/nynaeve/resources/js/blocks/review-profiles/assets
cp site/web/app/plugins/reviews-block/src/reviews-block/assets/profile1.webp site/web/app/themes/nynaeve/resources/js/blocks/review-profiles/assets/
cp site/web/app/plugins/reviews-block/src/reviews-block/assets/profile2.webp site/web/app/themes/nynaeve/resources/js/blocks/review-profiles/assets/
cp site/web/app/plugins/reviews-block/src/reviews-block/assets/profile3.webp site/web/app/themes/nynaeve/resources/js/blocks/review-profiles/assets/
```

#### Step 1.3: Update Block Metadata (block.json)

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "imagewize/review-profiles",
  "version": "1.0.0",
  "title": "Review Profiles",
  "category": "imagewize",
  "icon": "star-filled",
  "description": "Display customer reviews with profile images in a three-column layout",
  "keywords": ["reviews", "testimonials", "profiles", "customers", "orange"],
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
      "default": "#f97316"
    },
    "textColor": {
      "type": "string",
      "default": "white"
    }
  },
  "supports": {
    "html": false,
    "align": ["wide", "full"],
    "color": {
      "background": true,
      "text": true,
      "link": true,
      "gradients": true
    },
    "spacing": {
      "padding": true,
      "margin": true
    },
    "layout": {
      "default": {
        "type": "constrained"
      }
    }
  }
}
```

### Phase 2: Implement Block Structure

#### Step 2.1: Create InnerBlocks Template (edit.js)

```javascript
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Import profile images
import profile1 from './assets/profile1.webp';
import profile2 from './assets/profile2.webp';
import profile3 from './assets/profile3.webp';

const TEMPLATE = [
  [
    'core/group',
    {
      layout: { type: 'constrained' },
      align: 'wide',
    },
    [
      ['core/spacer', { height: '80px' }],
      [
        'core/heading',
        {
          textAlign: 'center',
          align: 'wide',
          content: 'Client Reviews.',
          fontSize: '3xl',
          fontFamily: 'open-sans',
          style: {
            typography: { fontWeight: '600' },
            color: { text: '#ffffff' },
          },
        },
      ],
      [
        'core/columns',
        {
          align: 'wide',
        },
        [
          [
            'core/column',
            {},
            [
              [
                'core/group',
                {
                  layout: {
                    type: 'flex',
                    orientation: 'vertical',
                    justifyContent: 'center',
                  },
                  style: { spacing: { blockGap: '1rem' } },
                },
                [
                  [
                    'core/image',
                    {
                      width: '95px',
                      url: profile1,
                      alt: 'Client Profile 1',
                      style: { border: { radius: '100px' } },
                    },
                  ],
                  [
                    'core/paragraph',
                    {
                      align: 'center',
                      fontSize: 'lg',
                      fontFamily: 'open-sans',
                      content:
                        'We have hired Jasper a couple of times and he always does a great job and in a timely manner! He is very good at what he does and we continue to use him for our projects.',
                      style: { color: { text: '#ffffff' } },
                    },
                  ],
                ],
              ],
            ],
          ],
          [
            'core/column',
            {},
            [
              [
                'core/group',
                {
                  layout: {
                    type: 'flex',
                    orientation: 'vertical',
                    justifyContent: 'center',
                  },
                  style: { spacing: { blockGap: '1rem' } },
                },
                [
                  [
                    'core/image',
                    {
                      width: '95px',
                      url: profile2,
                      alt: 'Client Profile 2',
                      style: { border: { radius: '100px' } },
                    },
                  ],
                  [
                    'core/paragraph',
                    {
                      align: 'center',
                      fontSize: 'lg',
                      fontFamily: 'open-sans',
                      content:
                        'His communication was top-notch, he met all deadlines, and his skills were very strong. He was proficient in WordPress, Woo Commerce, Shopify and programming on those platforms to get our new Shopify site up and running.',
                      style: { color: { text: '#ffffff' } },
                    },
                  ],
                ],
              ],
            ],
          ],
          [
            'core/column',
            {},
            [
              [
                'core/group',
                {
                  layout: {
                    type: 'flex',
                    orientation: 'vertical',
                    justifyContent: 'center',
                  },
                  style: { spacing: { blockGap: '1rem' } },
                },
                [
                  [
                    'core/image',
                    {
                      width: '95px',
                      url: profile3,
                      alt: 'Client Profile 3',
                      style: { border: { radius: '100px' } },
                    },
                  ],
                  [
                    'core/paragraph',
                    {
                      align: 'center',
                      fontSize: 'lg',
                      fontFamily: 'open-sans',
                      content:
                        "Couldn't have done this job without jasper and he did a great job. My website now runs faster than ever. Would definitely hire again.",
                      style: { color: { text: '#ffffff' } },
                    },
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
      ['core/spacer', { height: '80px' }],
    ],
  ],
];

export default function Edit({ attributes }) {
  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-review-profiles',
    style: {
      backgroundColor: attributes.backgroundColor,
      color: attributes.textColor,
    },
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} />
    </div>
  );
}
```

**Key Implementation Notes**:
- Uses Group block with constrained layout for centering
- 3-column layout with equal width columns
- Each column contains a Group with vertical flex layout
- Profile images are 95px width with border-radius: 100px (circular)
- All images imported from local assets directory
- Default orange background (#f97316) applied to outer block
- White text color for heading and paragraphs

#### Step 2.2: Create Save Function (save.js)

```javascript
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'wp-block-imagewize-review-profiles',
    style: {
      backgroundColor: attributes.backgroundColor,
      color: attributes.textColor,
    },
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
.wp-block-imagewize-review-profiles {
  background-color: #f97316; /* orange-500 */
  color: #ffffff;
  padding: 2px;

  /* Full width alignment - WordPress handles this natively */
  /* Note: Use width: 100% NOT 100vw (see docs/DEV.md → Full-Width Block Styling) */
  &.alignfull {
    width: 100%;
    padding: calc(0.5 * var(--wp--style--root--padding-right))
      var(--wp--style--root--padding-right);
  }

  /* Column spacing */
  .wp-block-columns {
    gap: 2rem;
  }

  /* Profile image styling */
  .wp-block-image {
    margin: 0 auto;

    img {
      border-radius: 100px; /* Circular */
      aspect-ratio: 1;
      object-fit: cover;
      width: 95px;
    }
  }

  /* Review text styling */
  .wp-block-paragraph {
    font-size: var(--wp--preset--font-size--lg);
  }

  /* Center column content groups */
  .wp-block-column {
    .wp-block-group {
      max-width: 380px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  /* Ensure links are white */
  a {
    color: inherit;
  }

  /* Mobile responsive */
  @media (max-width: 781px) {
    .wp-block-column {
      .wp-block-group {
        max-width: 70vw;
      }
    }
  }
}
```

**Key Styling Features**:
- Orange background (#f97316) with white text for high contrast
- Circular profile images (95px, border-radius: 100px)
- 2rem gap between columns
- Content groups max-width 380px (centered in columns)
- Responsive: 70vw max-width on mobile for better fit
- Uses WordPress spacing variables for consistency

#### Step 3.2: Editor Styles (editor.css)

```css
.wp-block-imagewize-review-profiles {
  /* Editor-specific styles if needed */
  /* Most styles are shared via style.css */

  /* Preview full-width behavior in editor */
  &.alignfull {
    max-width: none;
  }

  /* Ensure proper spacing in editor */
  .wp-block-group {
    &[class*='is-style-'] {
      width: 100%;
    }
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
- [ ] Block shows as "Review Profiles" (not "Reviews Block")
- [ ] Default template renders with 3 profile images and reviews
- [ ] Full-width alignment works correctly (default)
- [ ] Background color is orange (#f97316)
- [ ] Text is white
- [ ] Profile images are circular (95px diameter)
- [ ] Heading is "Client Reviews." (3xl, white, centered, 600 weight)
- [ ] Review paragraphs are lg font size, white, centered
- [ ] 3-column layout displays correctly
- [ ] Content is constrained to theme's wide width
- [ ] Vertical spacing (80px spacers) is correct
- [ ] InnerBlocks allow customization
- [ ] Profile images load from theme assets

#### Step 4.3: Test on Frontend

**Frontend Checklist**:
- [ ] Block renders correctly on published page
- [ ] Full-width orange background spans viewport
- [ ] Content is centered and constrained to wide width
- [ ] Profile images are circular and properly sized
- [ ] All 3 profile images display correctly
- [ ] Typography matches design (3xl heading, lg paragraphs)
- [ ] White text is legible on orange background
- [ ] Columns are equal width (33.33% each)
- [ ] Column gap is 2rem
- [ ] Responsive behavior works on mobile/tablet
- [ ] Mobile: Columns stack vertically
- [ ] Mobile: Content groups max 70vw width
- [ ] No console errors or warnings
- [ ] Images have proper aspect ratio (1:1)

### Phase 5: Migration & Cleanup

#### Step 5.1: Update Existing Content

**Option A: Manual Update** (Recommended if only a few instances)
1. Create new Review Profiles block in editor
2. Copy profile images from old Reviews Block
3. Copy review text content
4. Delete old block
5. Save

**Option B: Block Deprecation** (For many instances)
1. Add deprecation in block.json to handle old `imagewize/reviews-block`
2. WordPress auto-migrates on page save
3. Document in theme changelog

**Example Deprecation** (if needed):

```javascript
// In index.js, add deprecated configuration
import deprecated from './deprecated';

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save: Save,
  deprecated: [deprecated],
});
```

Create `deprecated.js`:
```javascript
// deprecated.js
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default {
  attributes: {
    backgroundColor: {
      type: 'string',
      default: '#f97316',
    },
    textColor: {
      type: 'string',
      default: 'white',
    },
  },
  save({ attributes }) {
    const blockProps = useBlockProps.save({
      className: 'wp-block-imagewize-reviews-block', // Old class name
      style: {
        backgroundColor: attributes.backgroundColor,
        color: attributes.textColor,
      },
    });

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    );
  },
};
```

#### Step 5.2: Remove Plugin Dependency

Update `site/composer.json`:

```json
{
  "require": {
    // Remove this line:
    // "imagewize/reviews-block": "^1.1.0"
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
ls site/web/app/plugins/reviews-block/
```

### Phase 6: Documentation

#### Step 6.1: Update Block Documentation

Create usage guide in theme docs (this file).

#### Step 6.2: Update Changelog

Add to `site/web/app/themes/nynaeve/CHANGELOG.md`:

```markdown
## [Version] - [Date]

### Added
- **Review Profiles Block**: Migrated from imagewize/reviews-block plugin to theme
  - Renamed from "Reviews Block" to "Review Profiles" to distinguish from Testimonial Grid
  - Three-column layout with circular profile images (95px diameter)
  - InnerBlocks structure using Group + Columns for proper layout
  - Full-width alignment by default with orange background (#f97316)
  - White text for high contrast on orange background
  - Constrained content layout (wide width) for optimal readability
  - Responsive design: columns stack on mobile with proper spacing
  - Three default profile images included (profile1-3.webp)
  - Default review content for immediate preview
  - Location: `resources/js/blocks/review-profiles/`
  - Category: "Imagewize" for consistent block organization
  - Replaces `imagewize/reviews-block` Composer plugin (v1.1.0)

### Removed
- **Reviews Block Plugin**: Removed `imagewize/reviews-block` Composer plugin dependency
  - Block functionality now integrated into theme as "Review Profiles"
  - Simplifies dependency management
  - Improves performance with consolidated asset loading
```

## Block Usage Guide

### How to Use Review Profiles Block

1. **Insert Block**:
   - Click "+" in editor
   - Search for "Review Profiles"
   - Block inserts with default template (heading + 3 reviews)

2. **Customize Content**:
   - **Heading**: Edit heading text (default: "Client Reviews.")
   - **Profile Images**: Click each image → Upload/select from media library
   - **Review Text**: Edit each paragraph with customer review
   - **Add More Reviews**: Click "+" at bottom → Add new column with Group + Image + Paragraph

3. **Customize Appearance**:
   - **Background**: Select block → Sidebar → Color → Background
   - **Text Color**: Select block → Sidebar → Color → Text
   - **Heading Style**: Select heading → Sidebar → Typography → Font Size/Weight
   - **Review Text**: Select paragraph → Sidebar → Typography → Font Size

4. **Adjust Layout**:
   - **Alignment**: Select block → Toolbar → Full/Wide
   - **Spacing**: Select block → Sidebar → Spacing → Padding/Margin
   - **Column Widths**: Columns are equal width (33.33%) - auto-managed

### Default Template

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────┐
│ [Full Width Orange Background - #f97316]               │
│                                                         │
│   ┌─────────────────────────────────────────────┐     │
│   │ [Constrained Width Group - Centered]        │     │
│   │                                               │     │
│   │          Client Reviews.                      │     │
│   │  (Heading, 3xl, white, centered, 600 weight) │     │
│   │                                               │     │
│   │  ┌───┐    ┌───┐    ┌───┐                    │     │
│   │  │ ● │    │ ● │    │ ● │                    │     │
│   │  └───┘    └───┘    └───┘                    │     │
│   │  95px     95px     95px                       │     │
│   │                                               │     │
│   │  Review   Review   Review                     │     │
│   │  text 1   text 2   text 3                     │     │
│   │  (lg,     (lg,     (lg,                       │     │
│   │  white,   white,   white,                     │     │
│   │  center)  center)  center)                    │     │
│   │                                               │     │
│   └─────────────────────────────────────────────┘     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Benefits of This Structure

### Why Use Columns Here?

Unlike single-column CTA blocks, Review Profiles has **genuine side-by-side layout requirements**:

**Review Profiles (Columns are correct)**:
```
Columns (3 equal columns: 33.33% each)
├── Column 1 (Profile image + review text)
├── Column 2 (Profile image + review text)
└── Column 3 (Profile image + review text)
```

**Advantages of Columns for This Use Case**:
1. **Semantic**: Represents true horizontal relationship between reviews
2. **Responsive**: Columns automatically stack on mobile (WordPress core behavior)
3. **Flexible**: Users can add more columns for additional reviews
4. **Appropriate**: This is exactly what columns are designed for
5. **Consistent**: Same pattern used in testimonial-grid block

### Comparison with Testimonial Grid

**Review Profiles** (This block):
- Static 3-column grid
- Profile images (95px circular)
- Simple text reviews
- Orange background
- No carousel
- Simpler implementation

**Testimonial Grid** (Existing block):
- Dynamic carousel (Slick.js)
- No profile images
- Metrics-based testimonials
- Customizable colors
- Navigation arrows/dots
- Complex carousel controls

## Technical Notes

### Profile Image Assets

The block includes three default profile images:
- **Location**: `resources/js/blocks/review-profiles/assets/`
- **Files**: `profile1.webp`, `profile2.webp`, `profile3.webp`
- **Import**: Via ES6 import in edit.js
- **Usage**: Set as default URL in image block template
- **Format**: WebP for optimal performance
- **Size**: Optimized for web (95px display size)
- **Replacement**: Users can upload their own images via media library

### Circular Image Styling

**CSS Implementation**:
```css
.wp-block-image img {
  border-radius: 100px; /* Full circle */
  aspect-ratio: 1;
  object-fit: cover;
  width: 95px;
}
```

**Block Attribute**:
```javascript
style: { border: { radius: '100px' } }
```

Users can adjust the border radius via the image block's border settings if needed.

### Color System

**Default Colors**:
- **Background**: `#f97316` (Tailwind orange-500)
- **Text**: `#ffffff` (white)

**Theme Integration**:
- Uses inline styles for background/text color (not theme presets)
- Allows for easy customization via block settings
- High contrast ensures readability

**Customization**:
Users can change colors via:
- Block settings → Color → Background
- Block settings → Color → Text
- Individual text blocks can override text color

### Responsive Behavior

**Breakpoint**: 781px (matches WordPress defaults)

**Desktop (> 781px)**:
- 3 columns side-by-side
- Each column 33.33% width
- 2rem gap between columns
- Content groups max 380px width (centered)

**Mobile (≤ 781px)**:
- Columns stack vertically
- Content groups max 70vw width
- Full width on small screens
- Maintains spacing and alignment

### Typography System

**Font Family**: Open Sans with system fallbacks (theme default)

**Font Sizes**:
- Heading: `3xl` (theme preset) - typically 1.875rem/30px
- Review text: `lg` (theme preset) - typically 1.125rem/18px

**Font Weights**:
- Heading: 600 (semi-bold)
- Review text: Default (400)

**Alignment**:
- All text centered for cohesive design
- Works well with circular profile images

## Files Modified/Created

### New Files
```
site/web/app/themes/nynaeve/
├── resources/js/blocks/review-profiles/
│   ├── block.json
│   ├── index.js
│   ├── edit.js
│   ├── save.js
│   ├── style.css
│   ├── editor.css
│   └── assets/
│       ├── profile1.webp
│       ├── profile2.webp
│       └── profile3.webp
└── docs/blocks/
    └── REVIEW-PROFILES-BLOCK.md (this file)
```

### Modified Files
```
site/
├── composer.json (remove imagewize/reviews-block dependency)
└── web/app/themes/nynaeve/
    └── CHANGELOG.md (document migration)
```

### Removed After Migration
```
site/web/app/plugins/reviews-block/ (entire plugin directory)
```

## Color Reference

### Default Colors

**Block Colors**:
- **Background**: `#f97316` - Orange (Tailwind orange-500)
- **Text**: `#ffffff` - White
- **Heading**: `#ffffff` - White (3xl, 600 weight)
- **Paragraphs**: `#ffffff` - White (lg)

**Why Orange?**
- High visual impact
- Stands out from other blocks
- Good contrast with white text
- Energetic, friendly feel
- Matches brand personality

### Tailwind CSS Reference
```css
.bg-orange-500  /* Background #f97316 */
.text-white     /* Text color #ffffff */
```

## Future Enhancements

### Potential Improvements

1. **Additional Profile Images**: Include more default profile options (diverse representations)

2. **Author Names**: Add optional name field below each review (like testimonial-grid)

3. **Star Ratings**: Add optional 5-star rating display above each review

4. **Company/Title**: Add optional company name or job title for reviewers

5. **Pattern Variations**: Create block patterns for different review styles
   - 2-column layout
   - 4-column layout
   - Single column (mobile-first)

6. **Background Options**:
   - Create color variations (blue, green, gray)
   - Support for gradient backgrounds
   - Image background with overlay

7. **Carousel Option**: Add optional carousel mode (like testimonial-grid) for many reviews

8. **Social Proof**: Add optional verified badge or platform logo (Google, Trustpilot, etc.)

9. **Schema Markup**: Add structured data (JSON-LD) for rich snippets in search results

10. **Animation**: Add subtle entrance animations for images and text

### Theme Integration

- Consider adding to theme's block patterns collection
- Create variations with different color schemes (not just orange)
- Add to Gutenberg style guide/showcase
- Document in theme's pattern library
- Create reusable review content in pattern library

## Migration Timeline

**Estimated Time**: 2-3 hours

1. **Block Creation**: 30 minutes (scaffold + assets)
2. **Feature Implementation**: 60 minutes (template + styles)
3. **Testing**: 30 minutes (editor + frontend)
4. **Content Migration**: 15 minutes (update existing instances)
5. **Cleanup & Documentation**: 15 minutes (remove plugin, update docs)

## Success Criteria

Migration is complete when:

- [ ] New block matches all functionality of plugin version
- [ ] Block is named "Review Profiles" (not "Reviews Block")
- [ ] Block uses Group + Columns structure (appropriate for this layout)
- [ ] All 3 profile images display correctly (circular, 95px)
- [ ] Default orange background (#f97316) applies correctly
- [ ] White text is readable on orange background
- [ ] Heading is 3xl, centered, white, 600 weight
- [ ] Review paragraphs are lg, centered, white
- [ ] Columns are equal width (33.33% each)
- [ ] Column gap is 2rem
- [ ] Responsive behavior works (columns stack on mobile)
- [ ] All existing Reviews blocks updated to new Review Profiles block
- [ ] Plugin removed from composer.json
- [ ] Plugin directory deleted
- [ ] Theme builds without errors
- [ ] Documentation complete (this file)
- [ ] Changelog updated
- [ ] No console errors on frontend/backend
- [ ] Passes accessibility tests
- [ ] Responsive on all breakpoints
- [ ] Profile images load from theme assets (not plugin)
- [ ] Block appears in "Imagewize" category

## Support & Questions

For implementation questions or issues during migration:
- Reference: [CONTENT-WIDTH-AND-LAYOUT.md](../CONTENT-WIDTH-AND-LAYOUT.md)
- Theme docs: `/site/web/app/themes/nynaeve/docs/`
- Sage Native Block: `github.com/imagewize/sage-native-block`
- Block development guide: [PATTERN-TO-NATIVE-BLOCK.md](../PATTERN-TO-NATIVE-BLOCK.md)
- Similar migrations: [CTA-BLUE-BLOCK.md](CTA-BLUE-BLOCK.md), [ABOUT-BLOCK.md](ABOUT-BLOCK.md)
