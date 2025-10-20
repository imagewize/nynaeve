# CTA Columns Block - Plan of Action

## Overview

Create a dedicated, reusable dual CTA (Call-to-Action) cards block by simplifying the existing `imagewize/multi-column-content` block. This block will be used across multiple service pages for consistent conversion-focused CTAs.

## Block Specification

**Block Name:** `imagewize/cta-columns`
**Title:** CTA Columns
**Category:** imagewize
**Description:** Dual call-to-action cards with headings, descriptions, and buttons

## Features

### Core Structure
- Two side-by-side white cards with rounded corners
- Each card contains:
  - Heading (H3)
  - Description paragraph
  - Button (centered)
- Responsive: Stacks on mobile, side-by-side on desktop
- Optional section heading above cards
- Optional section description/intro paragraph

### Color Variants
Support 3 background color options via block settings:

1. **Default (White)** - `background: base` (#FFFFFF)
   - White cards on white background
   - Best for: Pages with alternating section backgrounds

2. **Light Blue** - `background: primary-accent` (#e6f4fb)
   - White cards on light blue background
   - Best for: Creating visual separation, softer feel

3. **Dark** - `background: main` (#171b23)
   - White cards on dark background
   - Best for: High-impact CTAs, bottom of page sections

### Block Attributes
```json
{
  "sectionHeading": {
    "type": "string",
    "default": "Ready to Get Started?"
  },
  "sectionDescription": {
    "type": "string",
    "default": ""
  },
  "colorVariant": {
    "type": "string",
    "default": "default",
    "enum": ["default", "light-blue", "dark"]
  }
}
```

## Implementation Plan

### Step 1: Copy Multi-Column-Content Block (5 minutes)
```bash
cd site/web/app/themes/nynaeve/resources/js/blocks
cp -r multi-column-content cta-columns
```

**Files to modify:**
- `block.json` - Update name, title, description
- `editor.jsx` - Simplify template to just CTA cards
- `save.jsx` - Match editor structure
- `style.css` - Simplify styles, remove unused classes
- `editor.css` - Match style.css

### Step 2: Simplify Block Template (10 minutes)

**Remove from multi-column-content template:**
- ❌ Statistics columns (lines 33-184)
- ❌ Benefits columns (lines 395-449)

**Keep and modify:**
- ✅ Optional section heading (lines 187-207) - make editable
- ✅ Optional description paragraph (lines 210-227) - make editable
- ✅ CTA columns (lines 229-393) - simplify, make editable

**New simplified template structure:**
```javascript
const TEMPLATE = [
  // Optional section heading
  ['core/heading', {
    level: 2,
    placeholder: 'Enter section heading...',
    // ...styling
  }],

  // Optional description
  ['core/paragraph', {
    placeholder: 'Enter optional description...',
    // ...styling
  }],

  // Two CTA columns
  ['core/columns', {
    className: 'cta-columns__cards'
  }, [
    // Card 1
    ['core/column', {
      // ...white card styling
    }, [
      ['core/heading', { level: 3, placeholder: 'CTA 1 Heading' }],
      ['core/paragraph', { placeholder: 'CTA 1 Description' }],
      ['core/buttons', {}, [
        ['core/button', { text: 'Primary Action' }]
      ]]
    ]],

    // Card 2
    ['core/column', {
      // ...white card styling
    }, [
      ['core/heading', { level: 3, placeholder: 'CTA 2 Heading' }],
      ['core/paragraph', { placeholder: 'CTA 2 Description' }],
      ['core/buttons', {}, [
        ['core/button', { text: 'Secondary Action' }]
      ]]
    ]]
  ]]
];
```

### Step 3: Add Color Variant Support (15 minutes)

**In `editor.jsx`:**
```javascript
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { colorVariant } = attributes;

  // Determine background color class
  const getBackgroundClass = () => {
    switch(colorVariant) {
      case 'light-blue': return 'has-primary-accent-background-color';
      case 'dark': return 'has-main-background-color';
      default: return 'has-base-background-color';
    }
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Appearance Settings">
          <SelectControl
            label="Background Color"
            value={colorVariant}
            options={[
              { label: 'Default (White)', value: 'default' },
              { label: 'Light Blue', value: 'light-blue' },
              { label: 'Dark', value: 'dark' }
            ]}
            onChange={(value) => setAttributes({ colorVariant: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div className={`cta-columns ${getBackgroundClass()}`}>
        <InnerBlocks template={TEMPLATE} />
      </div>
    </>
  );
}
```

**In `save.jsx`:** Match the same background class logic

**In `style.css`:** Add color variant styles
```css
/* Dark variant - white text on dark background */
.cta-columns.has-main-background-color {
  background-color: var(--wp--preset--color--main);
}

.cta-columns.has-main-background-color h2,
.cta-columns.has-main-background-color > p {
  color: var(--wp--preset--color--base);
}

/* Light blue variant */
.cta-columns.has-primary-accent-background-color {
  background-color: var(--wp--preset--color--primary-accent);
}

/* Cards always stay white with dark text */
.cta-columns__cards .wp-block-column {
  background-color: var(--wp--preset--color--base) !important;
}
```

### Step 4: Update Block.json (5 minutes)

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "imagewize/cta-columns",
  "version": "0.1.0",
  "title": "CTA Columns",
  "category": "imagewize",
  "icon": "megaphone",
  "description": "Dual call-to-action cards with headings, descriptions, and buttons",
  "keywords": ["cta", "call to action", "buttons", "cards", "conversion"],
  "textdomain": "imagewize",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css",
  "supports": {
    "align": ["wide", "full"],
    "anchor": true,
    "spacing": {
      "margin": true,
      "padding": true
    }
  },
  "attributes": {
    "align": {
      "type": "string",
      "default": "wide"
    },
    "colorVariant": {
      "type": "string",
      "default": "default"
    }
  }
}
```

### Step 5: Register Block (2 minutes)

The block will auto-register via the existing block registration system in:
- `resources/js/blocks/index.js`

Just ensure the folder structure matches other blocks.

### Step 6: Build and Test (5 minutes)

```bash
cd site/web/app/themes/nynaeve
npm run build
# or for development with HMR:
npm run dev
```

Test on Speed Optimization page:
1. Add block after "Ready to Turn Speed Into Sales?" heading
2. Edit content:
   - Heading: "Ready to Turn Speed Into Sales?" (already exists, can delete block heading)
   - Card 1: "Get Your Free Speed Audit"
   - Card 2: "Talk to a Speed Expert"
3. Test color variants (default, light-blue, dark)

## Usage Examples

### Example 1: Speed Optimization Page (Default/White)
```
Section Heading: [Delete - use existing H2 outside block]
Card 1: Get Your Free Speed Audit
Card 2: Talk to a Speed Expert
Background: Default (white)
```

### Example 2: SEO Services Page (Light Blue)
```
Section Heading: "Start Ranking on Page 1"
Description: "Join 200+ businesses dominating their local search results"
Card 1: Get Free SEO Audit
Card 2: Talk to SEO Expert
Background: Light Blue
```

### Example 3: Bottom of Long Sales Page (Dark)
```
Section Heading: "Ready to Transform Your Business?"
Description: "Stop losing customers to slow sites and poor rankings"
Card 1: Get Started Today
Card 2: See Our Work
Background: Dark
```

## File Structure

```
resources/js/blocks/cta-columns/
├── block.json          # Block configuration
├── index.js           # Block registration
├── editor.jsx         # Admin edit component
├── save.jsx          # Frontend save component
├── style.css         # Frontend styles
├── editor.css        # Admin editor styles
└── view.js           # Optional frontend JS (if needed)
```

## Timeline

- **Step 1-2:** Copy and simplify template: 15 minutes
- **Step 3:** Add color variants: 15 minutes
- **Step 4-5:** Update config and register: 7 minutes
- **Step 6:** Build and test: 5 minutes

**Total Time:** ~40 minutes

## Benefits Over Multi-Column-Content

1. **Simpler** - Only CTA cards, no statistics or benefits
2. **Focused** - Purpose-built for conversion CTAs
3. **Reusable** - One block for all CTA needs across site
4. **Flexible** - 3 color variants for different contexts
5. **Maintainable** - Cleaner codebase, easier to update

## Future Enhancements (Optional)

- Add 3-column variant for tri-CTA layouts
- Add icon support above headings
- Add background image overlay option
- Add animation/hover effects
- Add single-column mobile layout toggle

## Success Criteria

✅ Block appears in Gutenberg editor under "Imagewize" category
✅ Template loads with placeholder text
✅ All 3 color variants work correctly
✅ Cards are responsive (stack on mobile)
✅ Buttons link to correct URLs
✅ Styles match design system (fonts, colors, spacing)
✅ Works on Speed Optimization page
✅ No console errors in browser or editor

## Rollout Plan

1. **Create block** (this plan)
2. **Test on Speed Optimization page** (replace current text-only CTA)
3. **Add to other service pages:**
   - SEO page
   - E-commerce page
   - WordPress Development page
   - Maintenance page (replace multi-column-content usage)
4. **Document in PAGE-STYLE-GUIDE.md**
5. **Update CHANGELOG.md**

---

**Created:** 2025-10-19
**Status:** Ready to implement
**Assignee:** Claude + Jasper
