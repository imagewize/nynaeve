# CTA Blue Block Migration Plan

## Overview

Migrating the `imagewize/cta-block` plugin (v1.0.0) to a Sage Native Block in the Nynaeve theme called **CTA Block Blue** (`nynaeve/cta-block-blue`).

**Current Status**: Composer plugin at `site/web/app/plugins/cta-block/`
**Migration Target**: Theme block at `site/web/app/themes/nynaeve/resources/js/blocks/cta-block-blue/`
**Primary Color**: Blue (sky-600 background, sky-700 button hover)

## Why Migrate to Theme?

Following the content width and layout improvements documented in [CONTENT-WIDTH-AND-LAYOUT.md](../CONTENT-WIDTH-AND-LAYOUT.md):

1. **Consistency**: All blocks managed in one place (theme) with unified design system
2. **Maintainability**: Easier updates alongside theme changes
3. **Performance**: Reduces plugin dependencies, consolidates asset loading
4. **Design System Integration**: Direct access to Tailwind CSS 4 and theme utilities
5. **Simplified Workflow**: No separate plugin repository to maintain

## Current Plugin Analysis

### Block Structure (Original - Uses Columns)
The current plugin uses a **3-column layout** with empty side columns (20% each) and a centered content column (60%):

```
CTA Block (full width, sky-600 background)
├── Spacer (60px)
├── Columns (wide, 3 columns)
│   ├── Column 1 (20% width - empty, for spacing)
│   ├── Column 2 (60% width - actual content)
│   │   ├── Heading (h2, center, 3xl, white)
│   │   ├── Paragraph (center, lg, white)
│   │   └── Buttons (center flex layout)
│   │       └── Button (50% width, sky-700 bg, custom hover)
│   └── Column 3 (20% width - empty, for spacing)
└── Spacer (60px)
```

### Improved Structure (Using Groups)
Since this is essentially a **single column with three rows**, we should use **Group blocks** instead:

```
CTA Block Blue (full width, sky-600 background)
├── Group (constrained width, centered)
│   ├── Heading (h2, center, 3xl, white)
│   ├── Paragraph (center, lg, white)
│   └── Buttons (center flex layout)
│       └── Button (50% width, sky-700 bg, custom hover)
```

**Benefits of Group vs Columns**:
- Simpler structure (no empty columns for spacing)
- Uses theme's constrained width setting
- Better semantic HTML
- More flexible responsive behavior
- Easier to maintain

### Key Features to Preserve

1. **InnerBlocks Template**: Predefined content structure with flexibility
2. **Button Hover Enhancement**: Custom hover color control via WordPress filters
3. **Full-Width Alignment**: Block spans full viewport width
4. **Centered Content**: Content constrained to readable width
5. **Color System**:
   - Background: sky-600 (default)
   - Text: white
   - Button: sky-700 with hover effect
6. **Smooth Transitions**: 0.2s ease-in-out on hover

### Technical Details

**Attributes**:
- `align`: "full" (default)
- `backgroundColor`: "sky-600" (default)
- `textColor`: "white" (default)
- `style`: Responsive spacing via CSS variables

**Block Supports**:
- Alignment: full, wide
- Color: background, text, link, gradients
- Spacing: padding, margin

**Special Functionality**:
- **Button Hover Filter** (`button-hover-filter.js`):
  - Extends core/button block with `hoverBackgroundColor` attribute
  - Adds color picker in inspector when button is inside CTA block
  - Outputs inline CSS variable `--button-hover-background`
  - Default hover color: #075985 (sky-700)

## Migration Plan

### Phase 1: Create Sage Native Block

#### Step 1.1: Generate Block Scaffold
```bash
# Run from Trellis VM (required for database access)
cd trellis
trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:create cta-block-blue --template=nynaeve-innerblocks --force
```

**Expected Output**:
- `resources/js/blocks/cta-block-blue/block.json`
- `resources/js/blocks/cta-block-blue/index.js`
- `resources/js/blocks/cta-block-blue/edit.js`
- `resources/js/blocks/cta-block-blue/save.js`
- `resources/js/blocks/cta-block-blue/style.scss`
- `resources/js/blocks/cta-block-blue/editor.scss`

#### Step 1.2: Update Block Metadata (block.json)
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "nynaeve/cta-block-blue",
  "version": "1.0.0",
  "title": "CTA Block Blue",
  "category": "theme",
  "icon": "megaphone",
  "description": "A blue Call to Action block with centered content and button",
  "keywords": ["cta", "call to action", "blue", "button"],
  "textdomain": "sage",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css",
  "attributes": {
    "align": {
      "type": "string",
      "default": "full"
    },
    "backgroundColor": {
      "type": "string",
      "default": "sky-600"
    },
    "textColor": {
      "type": "string",
      "default": "white"
    }
  },
  "supports": {
    "html": false,
    "align": ["full", "wide"],
    "color": {
      "background": true,
      "text": true,
      "link": true,
      "gradients": true
    },
    "spacing": {
      "padding": true,
      "margin": true
    }
  }
}
```

### Phase 2: Implement Block Structure

#### Step 2.1: Create InnerBlocks Template (edit.js)

**New Structure Using Groups**:

```javascript
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const TEMPLATE = [
  [
    'core/group',
    {
      align: 'wide',
      layout: { type: 'constrained' },
      style: {
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
        'core/heading',
        {
          level: 2,
          textAlign: 'center',
          style: {
            typography: {
              fontSize: 'var(--wp--preset--font-size--3-xl)',
            },
          },
          textColor: 'white',
          content: 'We are here to help you. Let's talk.',
        },
      ],
      [
        'core/paragraph',
        {
          align: 'center',
          style: {
            typography: {
              fontSize: 'var(--wp--preset--font-size--lg)',
            },
          },
          textColor: 'white',
          content:
            'Whether you need assistance, have a question, or want to explore how we can work together, we're just a message away. Reach out and let's start a conversation.',
        },
      ],
      [
        'core/buttons',
        {
          layout: {
            type: 'flex',
            justifyContent: 'center',
          },
        },
        [
          [
            'core/button',
            {
              text: 'Say Hi!',
              width: 50,
              backgroundColor: 'sky-700',
              textColor: 'white',
              hoverBackgroundColor: '#075985',
              className: 'has-hover-background',
            },
          ],
        ],
      ],
    ],
  ],
];

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-nynaeve-cta-block-blue',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks template={TEMPLATE} />
    </div>
  );
}
```

**Key Changes from Plugin**:
- Replaced 3-column structure with single Group block
- Group uses `layout: { type: 'constrained' }` for centered content width
- Group has vertical padding (top/bottom 60px spacing)
- No empty columns needed - Group handles centering automatically
- Cleaner, more semantic structure

#### Step 2.2: Create Save Function (save.js)

```javascript
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'wp-block-nynaeve-cta-block-blue',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
```

### Phase 3: Port Button Hover Functionality

#### Step 3.1: Create Button Hover Filter

Create new file: `resources/js/blocks/cta-block-blue/extends/button-hover-filter.js`

```javascript
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';

// Add hoverBackgroundColor attribute to button block
function addHoverBackgroundAttribute(settings, name) {
  if (name !== 'core/button') {
    return settings;
  }

  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      hoverBackgroundColor: {
        type: 'string',
        default: '#075985', // sky-700
      },
    },
  };
}

addFilter(
  'blocks.registerBlockType',
  'nynaeve/button-hover-background',
  addHoverBackgroundAttribute
);

// Add hover color control to button inspector when inside CTA block
const withHoverColorControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (props.name !== 'core/button') {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes, clientId } = props;
    const { hoverBackgroundColor } = attributes;

    // Check if button is inside cta-block-blue
    const parents = select('core/block-editor').getBlockParents(clientId);
    const parentBlocks = parents.map((parentId) =>
      select('core/block-editor').getBlock(parentId)
    );
    const isInCTABlock = parentBlocks.some(
      (block) => block?.name === 'nynaeve/cta-block-blue'
    );

    if (!isInCTABlock) {
      return <BlockEdit {...props} />;
    }

    return (
      <>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody title={__('Hover Background Color', 'sage')} initialOpen={true}>
            <ColorPicker
              color={hoverBackgroundColor}
              onChangeComplete={(color) =>
                setAttributes({ hoverBackgroundColor: color.hex })
              }
            />
          </PanelBody>
        </InspectorControls>
      </>
    );
  };
}, 'withHoverColorControl');

addFilter('editor.BlockEdit', 'nynaeve/button-hover-control', withHoverColorControl);

// Add hover color CSS variable to button save output
function addHoverColorToSave(extraProps, blockType, attributes) {
  if (blockType.name !== 'core/button') {
    return extraProps;
  }

  const { hoverBackgroundColor } = attributes;

  if (hoverBackgroundColor) {
    return {
      ...extraProps,
      style: {
        ...extraProps.style,
        '--button-hover-background': hoverBackgroundColor,
      },
      className: `${extraProps.className || ''} has-hover-background`.trim(),
    };
  }

  return extraProps;
}

addFilter(
  'blocks.getSaveContent.extraProps',
  'nynaeve/button-hover-save',
  addHoverColorToSave
);
```

#### Step 3.2: Import Filter in Block Index

Update `resources/js/blocks/cta-block-blue/index.js`:

```javascript
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

// Import button hover filter
import './extends/button-hover-filter';

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save: Save,
});
```

### Phase 4: Style Implementation

#### Step 4.1: Frontend Styles (style.scss)

```scss
.wp-block-nynaeve-cta-block-blue {
  background-color: var(--wp--preset--color--sky-600, #0284c7);
  color: var(--wp--preset--color--white, #ffffff);

  // Full width alignment - WordPress handles this natively
  // Note: Use width: 100% NOT 100vw (see docs/DEV.md → Full-Width Block Styling)
  &.alignfull {
    width: 100%;
  }

  // Button hover transition
  .wp-block-button__link {
    transition: background-color 0.2s ease-in-out;
  }

  // Apply custom hover color
  .wp-block-button.has-hover-background .wp-block-button__link:hover {
    background-color: var(--button-hover-background, #075985) !important;
  }

  // Ensure links are white
  a {
    color: inherit;
  }
}
```

#### Step 4.2: Editor Styles (editor.scss)

```scss
.wp-block-nynaeve-cta-block-blue {
  // Replicate hover styling in editor
  .wp-block-button.has-hover-background .wp-block-button__link:hover {
    background-color: var(--button-hover-background, #075985) !important;
  }

  // Color picker styling
  .components-panel__body {
    .components-color-picker {
      margin: 1rem 0;
    }
  }
}
```

### Phase 5: Testing & Validation

#### Step 5.1: Build Theme
```bash
cd site/web/app/themes/nynaeve
npm run build
```

#### Step 5.2: Test in Editor

**Functionality Checklist**:
- [ ] Block appears in inserter under "Theme" category
- [ ] Default template renders with heading, paragraph, and button
- [ ] Full-width alignment works correctly
- [ ] Background color is sky-600 (blue)
- [ ] Text is white
- [ ] Button has sky-700 background
- [ ] Button hover color picker appears in inspector
- [ ] Button hover effect works (0.2s transition)
- [ ] Content is constrained to theme's max width
- [ ] Vertical spacing (padding top/bottom) is correct
- [ ] InnerBlocks allow customization

#### Step 5.3: Test on Frontend

**Frontend Checklist**:
- [ ] Block renders correctly on published page
- [ ] Full-width background spans viewport
- [ ] Content is centered and constrained
- [ ] Button hover color applies correctly
- [ ] Hover transition is smooth (0.2s)
- [ ] Colors match design (sky-600, sky-700, white)
- [ ] Responsive behavior works on mobile/tablet
- [ ] No console errors or warnings

### Phase 6: Migration & Cleanup

#### Step 6.1: Update Existing Content

**Option A: Manual Update** (Recommended for few instances)
1. Create new CTA Block Blue in editor
2. Copy content from old CTA Block
3. Delete old block
4. Save

**Option B: Block Deprecation** (For many instances)
1. Create deprecation in block.json to handle old plugin block
2. WordPress auto-migrates on page save
3. Document in theme changelog

#### Step 6.2: Remove Plugin Dependency

Update `site/composer.json`:

```json
{
  "require": {
    // Remove this line:
    // "imagewize/cta-block": "^1.0.0"
  }
}
```

Run Composer update:
```bash
cd site
composer update --no-dev
```

#### Step 6.3: Verify Removal
```bash
# Should return empty/not found
ls site/web/app/plugins/cta-block/
```

### Phase 7: Documentation

#### Step 7.1: Update Block Documentation

Create usage guide in theme docs (this file).

#### Step 7.2: Update Changelog

Add to `site/web/app/themes/nynaeve/CHANGELOG.md`:

```markdown
## [Version] - [Date]

### Added
- CTA Block Blue: Migrated from imagewize/cta-block plugin to theme
  - Uses Group blocks instead of Columns for simpler structure
  - Maintains button hover color functionality
  - Integrated with theme design system

### Removed
- Dependency on imagewize/cta-block Composer plugin
```

## Block Usage Guide

### How to Use CTA Block Blue

1. **Insert Block**:
   - Click "+" in editor
   - Search for "CTA Block Blue"
   - Block inserts with default template

2. **Customize Content**:
   - Edit heading text (default: "We are here to help you. Let's talk.")
   - Edit paragraph text
   - Edit button text and link

3. **Customize Colors**:
   - **Background**: Select block → Sidebar → Color → Background
   - **Text**: Select block → Sidebar → Color → Text
   - **Button Hover**: Select button → Sidebar → Hover Background Color

4. **Adjust Spacing**:
   - Select outer block → Sidebar → Spacing
   - Modify padding/margin as needed

### Default Template

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────┐
│ [Full Width Sky-600 Background]                        │
│                                                         │
│   ┌─────────────────────────────────────────────┐     │
│   │ [Constrained Width Group - Centered]        │     │
│   │                                               │     │
│   │  We are here to help you. Let's talk.       │     │
│   │  (Heading, 3xl, white, centered)             │     │
│   │                                               │     │
│   │  Whether you need assistance, have a...      │     │
│   │  (Paragraph, lg, white, centered)            │     │
│   │                                               │     │
│   │         ┌──────────────┐                     │     │
│   │         │   Say Hi!    │                     │     │
│   │         └──────────────┘                     │     │
│   │  (Button, sky-700, centered, 50% width)      │     │
│   │                                               │     │
│   └─────────────────────────────────────────────┘     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Benefits of Group-Based Structure

### Compared to Original Column-Based Layout:

**Original (Plugin)**:
```
Columns (3 columns)
├── Column (20% - empty)
├── Column (60% - content)
└── Column (20% - empty)
```

**New (Theme)**:
```
Group (constrained layout)
└── Content (auto-centered)
```

**Advantages**:
1. **Simpler HTML**: Less nested markup
2. **Semantic**: Group better represents single-column intent
3. **Flexible**: Easier to make responsive adjustments
4. **Theme Integration**: Uses theme's constrained width setting
5. **Maintainable**: No need to manage empty columns
6. **Accessible**: Cleaner DOM structure for screen readers

## Technical Notes

### Why Not Use Columns?

Columns are designed for **horizontal layouts** (side-by-side content). Using columns with empty side columns just for centering is an anti-pattern because:

- Creates unnecessary DOM elements
- Harder to maintain (3 blocks instead of 1)
- Not semantic (columns imply horizontal relationship)
- Responsive challenges (column percentages at breakpoints)
- Harder for content editors to understand

### Why Use Group?

Groups are designed for **logical grouping** and **layout containers**. Benefits:

- Single container element
- Built-in constrained layout support
- Semantic (groups related content)
- Simpler responsive behavior
- Leverages theme's width settings automatically

## Files Modified/Created

### New Files
```
site/web/app/themes/nynaeve/
├── resources/js/blocks/cta-block-blue/
│   ├── block.json
│   ├── index.js
│   ├── edit.js
│   ├── save.js
│   ├── style.scss
│   ├── editor.scss
│   └── extends/
│       └── button-hover-filter.js
└── docs/blocks/
    └── CTA-BLUE-BLOCK.md (this file)
```

### Modified Files
```
site/
├── composer.json (remove imagewize/cta-block dependency)
└── web/app/themes/nynaeve/
    └── CHANGELOG.md (document migration)
```

### Removed After Migration
```
site/web/app/plugins/cta-block/ (entire plugin directory)
```

## Color Reference

### Default Colors
- **Background**: `sky-600` (#0284c7) - Medium blue
- **Text**: `white` (#ffffff)
- **Button Background**: `sky-700` (#0369a1) - Darker blue
- **Button Hover**: `#075985` (Even darker blue, ~sky-800)

### Tailwind CSS Classes
```css
.bg-sky-600  /* Background */
.text-white  /* Text color */
.bg-sky-700  /* Button background */
```

## Future Enhancements

### Potential Improvements
1. **Pattern Variations**: Create block patterns for different CTA styles
2. **Icon Support**: Add optional icon before/after heading
3. **Background Image**: Allow background image with overlay
4. **Animation**: Add subtle entrance animations
5. **Multiple Buttons**: Support for multiple buttons in template
6. **Image/Media**: Option to add image/graphic alongside text

### Theme Integration
- Consider adding to theme's block patterns collection
- Create variations with different color schemes (not just blue)
- Add to Gutenberg style guide/showcase

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
- [ ] Block uses Group-based structure (not Columns)
- [ ] Button hover color control works
- [ ] All existing CTA blocks updated to new version
- [ ] Plugin removed from composer.json
- [ ] Plugin directory deleted
- [ ] Theme builds without errors
- [ ] Documentation complete
- [ ] No console errors on frontend/backend
- [ ] Passes accessibility tests
- [ ] Responsive on all breakpoints

## Support & Questions

For implementation questions or issues during migration:
- Reference: [CONTENT-WIDTH-AND-LAYOUT.md](../CONTENT-WIDTH-AND-LAYOUT.md)
- Theme docs: `/site/web/app/themes/nynaeve/docs/`
- Sage Native Block: `github.com/imagewize/sage-native-block`
