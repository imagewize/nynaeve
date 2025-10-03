# Multi-Column Pricing Table Block

## Overview

This document outlines the plan for creating a **three-column pricing table block** based on the existing two-column `imagewize/pricing` block. The new block will address the limitations observed in the current maintenance page pricing section while incorporating best practices from the Moiraine theme patterns.

## Current State Analysis

### Existing Pricing Block (`imagewize/pricing`)
- **Location**: `site/web/app/themes/nynaeve/resources/js/blocks/pricing/`
- **Structure**: InnerBlocks-based with 2 columns
- **Color Scheme**:
  - Column 1: White background (#ffffff)
  - Column 2: Black background (#171b23 - `main` color)
- **Features**:
  - Uses core WordPress blocks (columns, headings, paragraphs, buttons)
  - Hover effects on columns
  - Minimal custom CSS (only for container and hover states)
  - Full user control via block editor

### Current Maintenance Page Issues
- **URL**: http://imagewize.test/services/maintenance/
- **Problems**:
  - Three columns are cramped/narrow
  - All columns have white background (low visual hierarchy)
  - Checkmarks are simple text characters (✅)
  - No visual distinction between pricing tiers
  - Lacks "Most Popular" badge or similar visual cues

### Inspiration from Moiraine

#### Checkmark SVG
**Source**: `~/code/moiraine/patterns/images/checkmark.svg`

```svg
<svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.7 13.0125L0 7.31255L1.425 5.88755L5.7 10.1625L14.875 0.987549L16.3 2.41255L5.7 13.0125Z" fill="#009F13"></path>
</svg>
```

**To Use**: Copy to `site/web/app/themes/nynaeve/resources/images/checkmark.svg` and change fill color from green (#009F13) to primary blue (#017cb6) to match theme branding.

#### Moiraine 3-Column Pricing Pattern
**File**: `~/code/moiraine/patterns/pricing-table-3-column.php`
- **Column 1**: White background with border
- **Column 2**: Dark background (`main` color) - featured/popular tier
- **Column 3**: White background with border
- **Features**:
  - Dotted separators between features
  - Full-width buttons
  - Clear pricing hierarchy
  - Consistent spacing system

## Available Color Palette

From `site/web/app/themes/nynaeve/theme.json`:

| Color Name | Hex | Slug | Usage |
|------------|-----|------|-------|
| Brand | #017cb6 | `primary` | Primary blue |
| Brand Accent | #e6f4fb | `primary-accent` | Light blue background |
| Brand Dark | #026492 | `primary-dark` | Darker blue variant |
| Contrast | #171b23 | `main` | Dark text/backgrounds |
| Contrast Accent | #465166 | `main-accent` | Medium gray text |
| Base | #ffffff | `base` | White backgrounds |
| Base Accent | #98999a | `secondary` | Gray text |
| Tint | #f5f5f6 | `tertiary` | Light gray background |
| Border Light | #ebeced | `border-light` | Subtle borders |
| Border Dark | #cbcbcb | `border-dark` | Visible borders |

## Proposed Solutions

### Block Name Suggestions

1. **`imagewize/pricing-tiers`** ✅ (Recommended)
   - Clear indication of multiple tiers
   - Distinct from existing `imagewize/pricing`
   - Professional naming

2. **`imagewize/service-plans`**
   - Good for service-based businesses
   - Less generic than "pricing"

3. **`imagewize/pricing-comparison`**
   - Emphasizes comparison aspect
   - Longer name

4. **`imagewize/plan-table`**
   - Short and clear
   - Simpler alternative

**Recommendation**: Use **`imagewize/pricing-tiers`**

### Color Scheme for 3 Columns

#### Option 1: Featured Center (Recommended)
```
Column 1          Column 2 (Featured)     Column 3
─────────────────────────────────────────────────────
White             Primary Accent          White
(base)            with Primary Border     (base)

Border: gray      Border: primary         Border: gray
Button: primary   Button: primary         Button: primary
Text: main        Text: main              Text: main
```

**Benefits**:
- Center column stands out with light blue background (`primary-accent` #e6f4fb)
- Colored border (`primary` #017cb6) adds emphasis
- Symmetrical layout
- Maintains brand colors
- Good visual hierarchy without being too bold

#### Option 2: Dark Featured Center (High Contrast)
```
Column 1          Column 2 (Featured)     Column 3
─────────────────────────────────────────────────────
White             Dark (main)             White
(base)

Border: gray      Border: primary         Border: gray
Button: primary   Button: white           Button: primary
Text: main        Text: base (white)      Text: main
```

**Benefits**:
- Maximum visual impact
- Clear featured tier
- Matches existing 2-column pattern style

**Drawbacks**:
- Might be too bold for three columns
- Dark column may dominate layout

#### Option 3: Progressive Gradient (Subtle)
```
Column 1          Column 2               Column 3
─────────────────────────────────────────────────────
White             Tertiary               Primary Accent
(base)            (tint #f5f5f6)         (#e6f4fb)

Border: gray      Border: gray           Border: primary
Button: primary   Button: primary        Button: primary
Text: main        Text: main             Text: main
```

**Benefits**:
- Visual progression from basic → premium
- Subtle hierarchy
- Guides eye left-to-right

**Recommendation**: Use **Option 1 (Featured Center)** - best balance of hierarchy and visual appeal.

### Checkmark Implementation

Copy the SVG from Moiraine and adapt the color:

**Steps**:
1. Copy `~/code/moiraine/patterns/images/checkmark.svg` to `site/web/app/themes/nynaeve/resources/images/checkmark.svg`
2. Change `fill="#009F13"` (green) to `fill="#017cb6"` (primary blue)
3. Reference via Vite in block template

**Usage in Block Template**:
```jsx
['core/image', {
  url: Vite::asset('resources/images/checkmark.svg'),
  alt: 'Checkmark',
  width: '17px',
  height: '14px',
  className: 'pricing-tier-checkmark'
}]
```

Alternatively, create color variants:
- `checkmark-primary.svg` - Primary blue (#017cb6)
- `checkmark-success.svg` - Green (#009F13) - keep original
- `checkmark-white.svg` - White (#ffffff) - for dark backgrounds

### Block Structure

```
imagewize/pricing-tiers
├── block.json (metadata)
├── index.js (registration)
├── editor.jsx (InnerBlocks template with 3 columns)
├── save.jsx (InnerBlocks.Content)
├── style.css (container styles + hover effects)
└── editor.css (editor-specific styles)
```

#### Template Structure (Simplified)
```jsx
const TEMPLATE = [
  ['core/spacer', { height: '50px' }],
  ['core/heading', {
    level: 2,
    textAlign: 'center',
    content: __('Choose Your Plan', 'imagewize'),
    fontSize: '3xl'
  }],
  ['core/paragraph', {
    align: 'center',
    content: __('Select the perfect plan for your needs', 'imagewize'),
    textColor: 'secondary'
  }],
  ['core/group', {
    align: 'full',
    layout: { type: 'constrained', contentSize: '64rem' },
    backgroundColor: 'base'
  }, [
    ['core/spacer', { height: '50px' }],
    ['core/columns', {
      style: { spacing: { blockGap: { left: '2rem' } } }
    }, [
      // Column 1: Basic Plan (White)
      ['core/column', {
        backgroundColor: 'base',
        style: {
          border: {
            width: '1px',
            color: 'var(--wp--preset--color--border-dark)',
            radius: '0.5rem'
          },
          spacing: {
            padding: {
              top: '2rem',
              right: '2rem',
              bottom: '2rem',
              left: '2rem'
            }
          }
        }
      }, [
        ['core/heading', {
          level: 3,
          content: __('Essential', 'imagewize')
        }],
        ['core/paragraph', {
          content: __('Perfect for small businesses', 'imagewize'),
          textColor: 'secondary'
        }],
        ['core/heading', {
          level: 4,
          content: `<strong>${__('€59', 'imagewize')}</strong> <span style="font-weight:normal;font-size:1rem;color:#98999a">${__('per month', 'imagewize')}</span>`
        }],
        // Features with checkmarks
        ['core/group', { layout: { type: 'flex' } }, [
          ['core/image', {
            className: 'pricing-checkmark',
            width: '17px',
            height: '14px'
          }],
          ['core/paragraph', { content: __('Feature 1', 'imagewize') }]
        ]],
        ['core/separator', { className: 'is-style-separator-dotted' }],
        // More features...
        ['core/buttons', {}, [
          ['core/button', { text: __('Get Started', 'imagewize') }]
        ]]
      ]],

      // Column 2: Business Plan (Featured - Primary Accent)
      ['core/column', {
        backgroundColor: 'primary-accent',
        style: {
          border: {
            width: '2px',
            color: 'var(--wp--preset--color--primary)',
            radius: '0.5rem'
          },
          spacing: {
            padding: {
              top: '2rem',
              right: '2rem',
              bottom: '2rem',
              left: '2rem'
            }
          }
        }
      }, [
        ['core/heading', {
          level: 3,
          content: `${__('Business', 'imagewize')} <span class="pricing-badge">${__('MOST POPULAR', 'imagewize')}</span>`
        }],
        // Similar structure to Column 1
      ]],

      // Column 3: Enterprise Plan (White)
      ['core/column', {
        backgroundColor: 'base',
        // Similar structure to Column 1
      }]
    ]],
    ['core/spacer', { height: '50px' }]
  ]]
];
```

### CSS Styling

#### style.css
```css
/* Container and layout */
.wp-block-imagewize-pricing-tiers .wp-block-columns {
  align-items: stretch; /* Equal height columns */
}

/* Hover effect for columns */
.wp-block-imagewize-pricing-tiers .wp-block-column {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.wp-block-imagewize-pricing-tiers .wp-block-column:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Featured column - slightly raised by default */
.wp-block-imagewize-pricing-tiers .wp-block-column[style*="primary-accent"] {
  transform: translateY(-10px);
}

.wp-block-imagewize-pricing-tiers .wp-block-column[style*="primary-accent"]:hover {
  transform: translateY(-15px);
}

/* Checkmark sizing */
.pricing-checkmark {
  flex-shrink: 0;
  width: 17px !important;
  height: 14px !important;
}

/* Feature items with flex layout */
.pricing-feature-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

/* Popular badge */
.pricing-badge {
  display: inline-block;
  background-color: var(--wp--preset--color--primary);
  color: var(--wp--preset--color--base);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  margin-left: 0.5rem;
  vertical-align: middle;
}

/* Responsive: Stack on mobile */
@media (max-width: 768px) {
  .wp-block-imagewize-pricing-tiers .wp-block-column[style*="primary-accent"] {
    transform: translateY(0);
  }

  .wp-block-imagewize-pricing-tiers .wp-block-column:hover {
    transform: none;
  }
}
```

## Implementation Steps

### 1. Create Block Files
```bash
cd trellis
echo "yes" | trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:add-setup imagewize/pricing-tiers
```

### 2. Add Checkmark SVG
```bash
# Copy from Moiraine and modify color
cp ~/code/moiraine/patterns/images/checkmark.svg site/web/app/themes/nynaeve/resources/images/checkmark.svg

# Then edit the file to change:
# fill="#009F13" → fill="#017cb6"
```

### 3. Update Block Files

#### block.json
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "imagewize/pricing-tiers",
  "version": "0.1.0",
  "title": "Pricing Tiers (3 Column)",
  "category": "layout",
  "icon": "money-alt",
  "description": "A three-column pricing comparison table with featured tier highlighting.",
  "example": {},
  "supports": {
    "html": false,
    "align": ["wide", "full"],
    "color": {
      "background": true,
      "text": false,
      "link": false
    },
    "spacing": {
      "padding": true,
      "margin": true
    }
  },
  "textdomain": "imagewize",
  "style": "file:./style.css",
  "editorStyle": "file:./editor.css",
  "viewScript": "file:./view.js",
  "attributes": {
    "align": {
      "type": "string",
      "default": "full"
    },
    "backgroundColor": {
      "type": "string",
      "default": "base"
    },
    "className": {
      "type": "string",
      "default": "wp-block-imagewize-pricing-tiers"
    }
  }
}
```

#### editor.jsx
- Define 3-column template with InnerBlocks
- Use core blocks only (columns, headings, paragraphs, images, buttons, separators)
- Apply color scheme: white, primary-accent (featured), white
- Include checkmark images in feature lists

#### save.jsx
```jsx
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
```

### 4. Build and Test
```bash
cd site/web/app/themes/nynaeve
npm run build
```

### 5. Test in Block Editor
- Add block to maintenance page
- Verify all three columns display correctly
- Test responsiveness (mobile stacking)
- Verify hover effects
- Check button styles via block toolbar
- Ensure checkmarks display properly

## Comparison: Old vs New

| Aspect | Current (2-column) | New (3-column) |
|--------|-------------------|----------------|
| Columns | 2 | 3 |
| Color Scheme | White + Black | White + Primary Accent + White |
| Visual Hierarchy | High contrast | Subtle with featured tier |
| Checkmarks | Text emoji (✅) | SVG icon (professional) |
| Featured Tier | Border color | Background color + border + badge |
| Flexibility | High (InnerBlocks) | High (InnerBlocks) |
| Mobile | Stacks vertically | Stacks vertically |

## Future Enhancements

1. **Dynamic Column Count**: Allow 2-4 columns via block settings
2. **Badge Variations**: Different badge styles (ribbon, corner, top)
3. **Animation Options**: Toggle hover animations on/off
4. **Checkmark Colors**: Allow customizing checkmark color per column
5. **Feature Comparison**: Add feature comparison mode with yes/no/partial indicators
6. **Pricing Toggles**: Add monthly/annual pricing toggle

## References

- **Existing Block**: `site/web/app/themes/nynaeve/resources/js/blocks/pricing/`
- **Moiraine Pattern**: `~/code/moiraine/patterns/pricing-table-3-column.php`
- **Checkmark SVG**: `~/code/moiraine/patterns/images/checkmark.svg`
- **Benefits Pattern**: `~/code/moiraine/patterns/list-benefits-light.php`
- **Theme Colors**: `site/web/app/themes/nynaeve/theme.json` (lines 58-69)
- **Current Page**: http://imagewize.test/services/maintenance/

## Notes

- Follows InnerBlocks philosophy - maximum user control
- No hardcoded styles in templates
- Users select all styles via block toolbar/inspector
- Minimal custom CSS (containers and hover effects only)
- Responsive by default (WordPress columns handle stacking)
- Accessible and semantic HTML structure
- Checkmark SVG sourced from Moiraine, adapted to Imagewize brand colors
