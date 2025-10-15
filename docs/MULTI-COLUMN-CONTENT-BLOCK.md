# Multi-Column Content Block - Implementation Guide

## Overview

The `imagewize/multi-column-content` block is a comprehensive statistics and CTA section that combines headings, statistics columns, feature lists with checkmark icons, and call-to-action buttons. It's designed for service/maintenance page layouts with a professional, organized appearance.

**Key Features:**
- ✅ **Main section heading** - Large centered heading ("Maintenance Service Statistics")
- ✅ **Two-column statistics layout** - Left column with tagline + stat, right column with tagline + stat
- ✅ **Center heading** - Transition heading between sections ("Ready to Stop Worrying...")
- ✅ **Two-column CTA section** - Left: heading + description + button, Right: heading + description + button
- ✅ **Three-column benefits** - Three columns with checkmark SVG icons and benefit text
- ✅ **100% theme.json integration** - Uses theme colors, fonts, and sizes
- ✅ **Block toolbar editing** - All typography editable via toolbar
- ✅ **InnerBlocks approach** - Native WordPress blocks for maximum user control
- ✅ **Tint background** - Clean tertiary background spanning full width

## Visual Design (Based on Screenshot)

### Container
- Background: `tertiary` (#f5f5f6) - Tint background
- Max-width: 1040px (65rem) constrained container
- Padding: 80px vertical (5rem), 20px horizontal (1.25rem) on desktop
- Responsive padding adjustments for mobile

### Section 1: Main Heading
- **Heading:** "Maintenance Service Statistics"
- Font: Montserrat, 3xl (2.25rem/36px), bold (700), `main` (#171b23) color
- Centered text alignment
- Bottom margin: 4rem for spacing from statistics section

### Section 2: Statistics (Two Columns)
- Uses WordPress native Columns block (2 columns, 50/50 split)
- Gap: 60px (3.75rem) between columns
- Each column contains:
  - **Tagline:** Small gray text above the stat
  - Font: Open Sans, base (1rem), normal (400), `secondary` (#98999a) color
  - Bottom margin: 1.5rem
  - **Stat Heading:** Large bold number/text
  - Font: Montserrat, 3xl (2.25rem), bold (700), `main` (#171b23) color
  - Line height: 1.2
  - Bottom margin: 1rem
  - **Subtext:** Small gray text below the stat
  - Font: Open Sans, base (1rem), normal (400), `secondary` (#98999a) color

**Left Column:**
- Tagline: "Trusted by SMEs across US and Europe"
- Stat: "0 Major Security Breaches"
- Subtext: "In 15+ years of service"

**Right Column:**
- Tagline: "Exceeding industry standards"
- Stat: "2-Hour Average Response"
- Subtext: "For priority maintenance issues"

### Section 3: Center Heading
- **Heading:** "Ready to Stop Worrying About Website Maintenance?"
- Font: Montserrat, 2xl (1.5rem/24px), semibold (600), `main` (#171b23) color
- Centered text alignment
- Top margin: 4rem, bottom margin: 1.5rem

### Section 4: Subheading
- **Text:** "Join 200+ SMEs who trust Imagewize with their WordPress maintenance. Get started with a free site audit."
- Font: Open Sans, lg (1.125rem), normal (400), `secondary` (#98999a) color
- Centered text alignment
- Bottom margin: 4rem for spacing from CTA columns

### Section 5: CTA Two Columns
- Uses WordPress native Columns block (2 columns, 50/50 split)
- Gap: 60px (3.75rem) between columns
- Each column contains:
  - **Column Heading:** Medium bold text
  - Font: Montserrat, xl (1.375rem), semibold (600), `main` (#171b23) color
  - Bottom margin: 1rem
  - **Column Description:** Gray text
  - Font: Open Sans, base (1rem), normal (400), `secondary` (#98999a) color
  - Bottom margin: 2rem
  - **Button:** WordPress button block
  - Style: Fill, `main` (#171b23) background color, white text
  - Padding: 1rem 2rem
  - Border-radius: 0.375rem

**Left Column:**
- Heading: "Start Your Maintenance Plan"
- Description: "Choose the plan that fits your business needs"
- Button text: "Get Free Site Audit"

**Right Column:**
- Heading: "Need a Custom Solution?"
- Description: "Discuss your specific maintenance requirements"
- Button text: "Talk to Our Team"

### Section 6: Benefits (Three Columns)
- Uses WordPress native Columns block (3 columns, equal width)
- Gap: 30px (1.875rem) between columns
- Top margin: 3rem for spacing from CTA section
- Each column contains:
  - **SVG Checkmark Icon:** Green checkmark in square
  - Display: inline-block
  - Margin-right: 0.75rem
  - Vertical-align: middle
  - **Benefit Text:** Gray text inline with icon
  - Font: Open Sans, base (1rem), normal (400), `secondary` (#98999a) color
  - Display: inline
  - Vertical-align: middle

**Benefits List:**
1. "99.9% uptime guarantee"
2. "No setup fees"
3. "Cancel anytime"

**SVG Icon Design:**
- Size: 20px × 16.5px (scaled from original 17px × 14px)
- Color: `#017cb6` (primary brand blue - from theme's checkmark.svg)
- No background (transparent)
- Icon positioned inline with text via CSS `::before` pseudo-element

## Block Structure (Template Outline)

```
imagewize/multi-column-content
├── Main Heading (H2) - "Maintenance Service Statistics"
├── Columns (2 columns) - Statistics Section
│   ├── Column 1
│   │   ├── Paragraph (tagline) - "Trusted by SMEs across US and Europe"
│   │   ├── Heading (H3) - "0 Major Security Breaches"
│   │   └── Paragraph (subtext) - "In 15+ years of service"
│   └── Column 2
│       ├── Paragraph (tagline) - "Exceeding industry standards"
│       ├── Heading (H3) - "2-Hour Average Response"
│       └── Paragraph (subtext) - "For priority maintenance issues"
├── Heading (H2) - "Ready to Stop Worrying..."
├── Paragraph (subheading) - "Join 200+ SMEs who trust..."
├── Columns (2 columns) - CTA Section
│   ├── Column 1
│   │   ├── Heading (H3) - "Start Your Maintenance Plan"
│   │   ├── Paragraph - "Choose the plan that fits..."
│   │   └── Button - "Get Free Site Audit"
│   └── Column 2
│       ├── Heading (H3) - "Need a Custom Solution?"
│       ├── Paragraph - "Discuss your specific..."
│       └── Button - "Talk to Our Team"
└── Columns (3 columns) - Benefits Section
    ├── Column 1
    │   └── Paragraph with SVG + text - "99.9% uptime guarantee"
    ├── Column 2
    │   └── Paragraph with SVG + text - "No setup fees"
    └── Column 3
        └── Paragraph with SVG + text - "Cancel anytime"
```

## Typography Specifications

### All Text Elements (Editable via Block Toolbar)

**Main Heading (H2 - "Maintenance Service Statistics"):**
- Font: Montserrat (`montserrat`)
- Size: 3xl (2.25rem/36px)
- Weight: Bold (700)
- Color: `main` (#171b23)
- Alignment: Center
- Line height: 1.2
- Margin bottom: 4rem

**Statistics Columns:**
- **Tagline (Paragraph):**
  - Font: Open Sans (`open-sans`)
  - Size: base (1rem/16px)
  - Weight: Normal (400)
  - Color: `secondary` (#98999a)
  - Alignment: Center
  - Line height: 1.6
  - Margin bottom: 1.5rem

- **Stat Heading (H3):**
  - Font: Montserrat (`montserrat`)
  - Size: 3xl (2.25rem/36px)
  - Weight: Bold (700)
  - Color: `main` (#171b23)
  - Alignment: Center
  - Line height: 1.2
  - Margin bottom: 1rem

- **Subtext (Paragraph):**
  - Font: Open Sans (`open-sans`)
  - Size: base (1rem/16px)
  - Weight: Normal (400)
  - Color: `secondary` (#98999a)
  - Alignment: Center
  - Line height: 1.6

**Center Heading (H2 - "Ready to Stop Worrying..."):**
- Font: Montserrat (`montserrat`)
- Size: 2xl (1.5rem/24px)
- Weight: Semibold (600)
- Color: `main` (#171b23)
- Alignment: Center
- Line height: 1.3
- Margin top: 4rem
- Margin bottom: 1.5rem

**Subheading Paragraph:**
- Font: Open Sans (`open-sans`)
- Size: lg (1.125rem/18px)
- Weight: Normal (400)
- Color: `secondary` (#98999a)
- Alignment: Center
- Line height: 1.7
- Margin bottom: 4rem

**CTA Column Headings (H3):**
- Font: Montserrat (`montserrat`)
- Size: xl (1.375rem/22px)
- Weight: Semibold (600)
- Color: `main` (#171b23)
- Alignment: Center
- Line height: 1.4
- Margin bottom: 1rem

**CTA Column Descriptions (Paragraph):**
- Font: Open Sans (`open-sans`)
- Size: base (1rem/16px)
- Weight: Normal (400)
- Color: `secondary` (#98999a)
- Alignment: Center
- Line height: 1.7
- Margin bottom: 2rem

**Buttons:**
- Style: Fill (solid background)
- Background color: `main` (#171b23)
- Text color: `base` (#ffffff)
- Font: Montserrat (`montserrat`)
- Size: base (1rem/16px)
- Weight: Medium (500)
- Padding: 1rem 2rem (16px 32px)
- Border-radius: 0.375rem (6px)
- Alignment: Center within column

**Benefits Text (Paragraph with inline SVG):**
- Font: Open Sans (`open-sans`)
- Size: base (1rem/16px)
- Weight: Normal (400)
- Color: `secondary` (#98999a)
- Alignment: Center
- Line height: 1.6
- Display: inline with SVG icon

## Color Specifications (from theme.json)

- **Main (Contrast):** `#171b23` - Dark text, button backgrounds
- **Secondary (Base Accent):** `#98999a` - Gray text for taglines, descriptions, benefits
- **Base (White):** `#ffffff` - Button text color
- **Tertiary (Tint):** `#f5f5f6` - Block background color
- **Primary:** `#017cb6` - Brand blue (used for checkmark icon in theme's checkmark.svg)

## SVG Checkmark Icon

The checkmark icon uses the existing checkmark SVG from the Nynaeve theme resources, already styled with the primary brand blue color.

**Existing SVG (from site/web/app/themes/nynaeve/resources/images/checkmark.svg):**
```svg
<svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.7 13.0125L0 7.31255L1.425 5.88755L5.7 10.1625L14.875 0.987549L16.3 2.41255L5.7 13.0125Z" fill="#017cb6"/>
</svg>
```

**Icon Specifications:**
- Size: 17px × 14px (original SVG dimensions)
- Scaled to: 20px × 16.5px (slightly larger for better visibility)
- Color: `#017cb6` - Primary brand blue (already set in SVG)
- Display: Inline via CSS `::before` pseudo-element
- Margin-right: 0.625rem (10px)
- Vertical-align: middle

**CSS Implementation (Recommended Approach):**

Using CSS `::before` pseudo-element with data URL embedding the theme's checkmark SVG. This keeps the content clean and makes the icon styling consistent and easy to update.

```css
.multi-column-content__benefit {
  position: relative;
  padding-left: 2rem; /* Space for icon */
  display: flex;
  align-items: center;
}

.multi-column-content__benefit::before {
  content: '';
  position: absolute;
  left: 0;
  width: 20px;
  height: 16.5px;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.7 13.0125L0 7.31255L1.425 5.88755L5.7 10.1625L14.875 0.987549L16.3 2.41255L5.7 13.0125Z" fill="%23017cb6"/></svg>');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
}
```

**Note:** In data URLs, `#` must be URL-encoded as `%23`. The SVG uses the primary brand blue color (`%23017cb6`) which matches the theme's checkmark.svg file.

## Responsive Design

### Desktop (> 782px)
- Statistics columns: 2 columns, 50/50 split, 60px gap
- CTA columns: 2 columns, 50/50 split, 60px gap
- Benefits columns: 3 columns, equal width, 30px gap
- Vertical padding: 5rem (80px)
- Horizontal padding: 1.25rem (20px)
- Main heading: 3xl (2.25rem)
- Center heading: 2xl (1.5rem)

### Mobile (≤ 782px)
- All columns automatically stack to single column (WordPress default)
- Vertical padding: 3rem (48px)
- Horizontal padding: 1rem (16px)
- Main heading: 2xl (1.5rem) - scaled down
- Center heading: xl (1.375rem) - scaled down
- Statistics gap: 40px between stacked columns
- CTA gap: 40px between stacked columns
- Benefits gap: 24px between stacked columns
- Button width: 100% (full width on mobile)

## CSS Structure

### Main Container
```css
.wp-block-imagewize-multi-column-content {
  width: 100%;
  background: var(--wp--preset--color--tertiary, #f5f5f6);
  padding: 5rem 1.25rem;
}
```

### Constrained Content Width
```css
.wp-block-imagewize-multi-column-content > * {
  max-width: 65rem;
  margin-left: auto;
  margin-right: auto;
}
```

### Statistics Columns
```css
.multi-column-content__statistics {
  gap: 3.75rem;
  margin-bottom: 4rem;
}
```

### CTA Columns
```css
.multi-column-content__cta-columns {
  gap: 3.75rem;
  margin-bottom: 3rem;
}
```

### Benefits Columns
```css
.multi-column-content__benefits {
  gap: 1.875rem;
}
```

### Benefit Items (with checkmark icon)
```css
.multi-column-content__benefit {
  position: relative;
  padding-left: 2rem;
  text-align: left;
  display: flex;
  align-items: center;
}

.multi-column-content__benefit::before {
  content: '';
  position: absolute;
  left: 0;
  width: 20px;
  height: 16.5px;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.7 13.0125L0 7.31255L1.425 5.88755L5.7 10.1625L14.875 0.987549L16.3 2.41255L5.7 13.0125Z" fill="%23017cb6"/></svg>');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
}
```

**Note:** Uses existing checkmark.svg from Nynaeve theme (`resources/images/checkmark.svg`) with primary brand blue color (`#017cb6`).

### Buttons
```css
.multi-column-content__button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--wp--preset--color--main, #171b23);
  color: var(--wp--preset--color--base, #ffffff);
  border-radius: 0.375rem;
  text-decoration: none;
  font-family: var(--wp--preset--font-family--montserrat);
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.multi-column-content__button:hover {
  background-color: var(--wp--preset--color--primary, #017cb6);
}
```

### Responsive Adjustments
```css
@media (max-width: 782px) {
  .wp-block-imagewize-multi-column-content {
    padding: 3rem 1rem;
  }

  .multi-column-content__statistics {
    gap: 2.5rem;
  }

  .multi-column-content__cta-columns {
    gap: 2.5rem;
  }

  .multi-column-content__benefits {
    gap: 1.5rem;
  }

  /* Buttons full width on mobile */
  .multi-column-content__button {
    width: 100%;
  }

  /* Scale down heading sizes */
  .multi-column-content__main-heading {
    font-size: var(--wp--preset--font-size--2-xl, 1.5rem) !important;
  }

  .multi-column-content__center-heading {
    font-size: var(--wp--preset--font-size--xl, 1.375rem) !important;
  }
}
```

## Implementation Steps

### 1. Create the Block

Run this command from the Trellis VM:

```bash
cd trellis
echo "yes" | trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:add-setup imagewize/multi-column-content
```

This creates the block structure in `resources/js/blocks/multi-column-content/`.

### 2. Configure block.json

Enable alignment and minimal attributes:

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "imagewize/multi-column-content",
  "title": "Multi-Column Content",
  "category": "imagewize",
  "icon": "layout",
  "description": "Multi-section layout with statistics, CTAs, and benefits",
  "keywords": ["statistics", "cta", "benefits", "columns", "layout"],
  "textdomain": "imagewize",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css",
  "supports": {
    "align": ["wide", "full"],
    "anchor": true,
    "spacing": {
      "margin": true,
      "padding": true
    },
    "color": {
      "background": true,
      "text": false
    }
  },
  "attributes": {
    "align": {
      "type": "string",
      "default": "wide"
    }
  }
}
```

### 3. Editor Component (editor.jsx)

Use InnerBlocks with WordPress native blocks. Build the template in this order:
1. Main heading (H2)
2. Statistics columns (2 columns)
3. Center heading (H2)
4. Subheading paragraph
5. CTA columns (2 columns)
6. Benefits columns (3 columns)

**Template Structure:**
```jsx
const TEMPLATE = [
  // Main heading
  ['core/heading', { level: 2, content: 'Maintenance Service Statistics', className: 'multi-column-content__main-heading', ... }],

  // Statistics columns (2 columns)
  ['core/columns', { className: 'multi-column-content__statistics' }, [
    ['core/column', {}, [
      ['core/paragraph', { content: 'Trusted by SMEs across US and Europe', className: 'multi-column-content__tagline', ... }],
      ['core/heading', { level: 3, content: '0 Major Security Breaches', ... }],
      ['core/paragraph', { content: 'In 15+ years of service', className: 'multi-column-content__subtext', ... }]
    ]],
    ['core/column', {}, [
      ['core/paragraph', { content: 'Exceeding industry standards', className: 'multi-column-content__tagline', ... }],
      ['core/heading', { level: 3, content: '2-Hour Average Response', ... }],
      ['core/paragraph', { content: 'For priority maintenance issues', className: 'multi-column-content__subtext', ... }]
    ]]
  ]],

  // Center heading
  ['core/heading', { level: 2, content: 'Ready to Stop Worrying About Website Maintenance?', className: 'multi-column-content__center-heading', ... }],

  // Subheading
  ['core/paragraph', { content: 'Join 200+ SMEs who trust Imagewize...', className: 'multi-column-content__subheading', ... }],

  // CTA columns (2 columns)
  ['core/columns', { className: 'multi-column-content__cta-columns' }, [
    ['core/column', {}, [
      ['core/heading', { level: 3, content: 'Start Your Maintenance Plan', ... }],
      ['core/paragraph', { content: 'Choose the plan that fits your business needs', ... }],
      ['core/button', { text: 'Get Free Site Audit', className: 'multi-column-content__button', ... }]
    ]],
    ['core/column', {}, [
      ['core/heading', { level: 3, content: 'Need a Custom Solution?', ... }],
      ['core/paragraph', { content: 'Discuss your specific maintenance requirements', ... }],
      ['core/button', { text: 'Talk to Our Team', className: 'multi-column-content__button', ... }]
    ]]
  ]],

  // Benefits columns (3 columns)
  ['core/columns', { className: 'multi-column-content__benefits' }, [
    ['core/column', {}, [
      ['core/paragraph', { content: '99.9% uptime guarantee', className: 'multi-column-content__benefit', ... }]
    ]],
    ['core/column', {}, [
      ['core/paragraph', { content: 'No setup fees', className: 'multi-column-content__benefit', ... }]
    ]],
    ['core/column', {}, [
      ['core/paragraph', { content: 'Cancel anytime', className: 'multi-column-content__benefit', ... }]
    ]]
  ]]
];
```

### 4. Save Component (save.jsx)

Simply render InnerBlocks content (WordPress handles everything):

```jsx
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'multi-column-content'
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
```

### 5. Frontend Styles (style.css)

Style the container, columns, and benefit icons. WordPress handles column layout and responsive behavior.

**Key CSS:**
- Main container with tertiary background
- Constrained content width (65rem)
- Statistics columns gap (3.75rem)
- CTA columns gap (3.75rem)
- Benefits columns gap (1.875rem)
- Benefit items with checkmark icon (CSS ::before pseudo-element)
- Button styling with hover state
- Responsive adjustments for mobile

### 6. Editor Styles (editor.css)

Match frontend appearance in the editor. Copy from style.css with editor-specific adjustments.

## Design Philosophy

This block follows the **InnerBlocks approach (MOST PREFERRED)** from CLAUDE.md:

✅ **What we did:**
- Used native WordPress blocks (Heading, Paragraph, Columns, Button)
- Set defaults using theme.json values (fonts, sizes, colors)
- All typography controllable via block toolbar
- Responsive column layouts with CSS
- Minimal hardcoded styles - only container/layout CSS
- Template unlocked to allow editing content
- SVG icons via CSS pseudo-elements (clean, maintainable)

✅ **Benefits:**
- Maximum user control via native WordPress controls
- All fonts, sizes, colors editable through toolbar
- Familiar editing experience (no custom controls needed)
- Uses theme.json color/typography system
- Easy to update content without breaking structure
- Responsive design with automatic mobile stacking
- Clean, semantic HTML output

✅ **Theme Integration:**
- Colors: Uses `main`, `secondary`, `base`, `tertiary` from theme.json
- Fonts: Uses `open-sans`, `montserrat` from theme.json
- Sizes: Uses `base`, `lg`, `xl`, `2xl`, `3xl` from theme.json
- All values accessible via toolbar dropdowns

## Usage Guidelines

### Adding the Block

1. In the WordPress editor, click the "+" button
2. Search for "Multi-Column Content" or find it in the "Imagewize" category
3. The block will insert with all sections pre-populated with default content

### Editing Content

**All elements are fully editable via the block toolbar!**

**Headings:**
- Click any heading to edit content
- **Block Toolbar Controls:** Heading level (H1-H6), font family, font size, text color, alignment
- Change any setting via toolbar dropdowns (all theme.json values available)

**Paragraphs:**
- Click any paragraph to edit content
- **Block Toolbar Controls:** Font family, font size, text color, bold/italic, alignment
- Change any setting via toolbar dropdowns

**Buttons:**
- Click button to edit text
- **Block Toolbar Controls:** Style (fill/outline), color, border radius, width
- **Link Settings:** Set button URL, open in new tab, rel attributes
- Change any setting via toolbar and sidebar

**Statistics:**
- Edit tagline, stat heading, and subtext in each statistics column
- All text fully editable and styled via toolbar

**Benefits:**
- Edit benefit text in each benefit column
- Checkmark icons are automatically added via CSS
- Keep text concise (1-3 words per benefit)

### Managing Sections

**Add More Benefits:**
1. Select the benefits columns block
2. Click "+" button to add a new column
3. Add a paragraph with className `multi-column-content__benefit`
4. Checkmark icon will automatically appear

**Remove Sections:**
1. Select the section (columns or heading) you want to remove
2. Click the three dots menu (⋮) in the block toolbar
3. Select "Remove Columns" or "Remove Heading"

**Duplicate Columns:**
1. Select the column you want to duplicate
2. Click the three dots menu (⋮) in the block toolbar
3. Select "Duplicate"

### Styling Options

**Block Toolbar (Minimal Sidebar Use):**
- **Font Family:** Choose from Open Sans, Montserrat (via toolbar dropdown)
- **Font Size:** All theme.json sizes (base, lg, xl, 2xl, 3xl)
- **Text Color:** All theme colors (main, secondary, base, primary, etc.)
- **Font Weight:** Via "Bold" button or Typography panel
- **Text Alignment:** Via toolbar (left, center, right)

**Container Settings (Sidebar):**
- **Background Color:** Change tint background via Settings sidebar (defaults to tertiary)
- **Spacing (Padding/Margin):** Adjust spacing via Settings sidebar
- **Anchor ID:** For navigation links
- **Alignment:** Wide or Full alignment options

## Testing Checklist

**Block Appearance:**
- [ ] Block appears in editor under "Imagewize" category
- [ ] Block defaults to wide alignment (`alignwide`)
- [ ] Tertiary background spans container width
- [ ] All sections display in correct order
- [ ] Statistics display in 2 columns on desktop
- [ ] CTA display in 2 columns on desktop
- [ ] Benefits display in 3 columns on desktop
- [ ] All columns stack in single column on mobile (≤782px)

**Default Content:**
- [ ] Main heading renders with Montserrat, 3xl, bold, main color, centered
- [ ] Statistics render with correct taglines, stats, and subtexts
- [ ] Center heading renders with Montserrat, 2xl, semibold, main color, centered
- [ ] Subheading renders with Open Sans, lg, normal, secondary color, centered
- [ ] CTA columns render with headings, descriptions, and buttons
- [ ] Benefits render with checkmark icons and text
- [ ] All content is immediately editable

**Block Toolbar Editing:**
- [ ] All headings editable via toolbar (font, size, color, level, alignment)
- [ ] All paragraphs editable via toolbar (font, size, color, alignment)
- [ ] All buttons editable via toolbar (style, color, border radius)
- [ ] All theme.json values appear in dropdowns

**Checkmark Icons:**
- [ ] Checkmark icons display in benefits section
- [ ] Icons use existing checkmark.svg from theme (17×14px original dimensions)
- [ ] Icons are primary brand blue (#017cb6)
- [ ] Icons align vertically centered with text
- [ ] Icons maintain position on mobile

**Buttons:**
- [ ] Buttons display with main background, white text
- [ ] Buttons have correct padding and border-radius
- [ ] Buttons have hover state (color change)
- [ ] Buttons are clickable and link to correct URLs
- [ ] Buttons are full width on mobile

**Responsive Design:**
- [ ] Desktop: Statistics 2 columns, CTA 2 columns, Benefits 3 columns
- [ ] Mobile (≤782px): All columns stack to single column
- [ ] Mobile: Reduced padding and font sizes
- [ ] Mobile: Buttons full width
- [ ] Content readable on all screen sizes

## Troubleshooting

**Block doesn't appear in editor:**
- Run `npm run build` in theme directory
- Check browser console for JavaScript errors
- Verify block registration in DevTools

**Styles not applying:**
- Clear WordPress cache
- Hard refresh browser (Cmd/Ctrl + Shift + R)
- Check that `style.css` is properly enqueued

**Checkmark icons not showing:**
- Verify paragraph has `multi-column-content__benefit` class
- Check CSS `::before` pseudo-element in DevTools
- Ensure SVG data URL is correctly formatted (# encoded as %23)
- Verify checkmark.svg path is correct in data URL

**Buttons not styling correctly:**
- Verify button has `multi-column-content__button` class
- Check button block supports in DevTools
- Ensure button style is set to "Fill" (not "Outline")

**Columns not aligning properly:**
- Verify WordPress Columns block is working correctly
- Check for conflicting theme styles
- Inspect column container in DevTools
- Ensure columns have equal width

## Related Documentation

- [CLAUDE.md](../CLAUDE.md) - Theme development guide
- [TWO-COLUMN-CARD.md](TWO-COLUMN-CARD.md) - Similar InnerBlocks implementation
- [PAGE-HEADING-BLUE-BLOCK.md](PAGE-HEADING-BLUE-BLOCK.md) - Similar InnerBlocks implementation
- [PATTERN-TO-NATIVE-BLOCK.md](PATTERN-TO-NATIVE-BLOCK.md) - Converting patterns to blocks
- [imagewize/sage-native-block](https://github.com/imagewize/sage-native-block) - Block package documentation
