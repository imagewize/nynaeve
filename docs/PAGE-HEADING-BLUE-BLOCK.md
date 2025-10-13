# Page Heading Blue Block - Implementation Guide

## Overview

The `imagewize/page-heading-blue` block is a blue gradient banner section designed for secondary page headings. It features a professional blue gradient background with a subtle pattern overlay and contains native WordPress blocks for maximum flexibility.

**Key Features:**
- ✅ **Full-width alignment** - Background spans entire viewport, content constrained to 55rem
- ✅ **100% theme.json integration** - Uses theme colors, fonts, and sizes
- ✅ **Block toolbar editing** - All typography editable via toolbar (minimal sidebar use)
- ✅ **InnerBlocks approach** - Native WordPress blocks for maximum user control
- ✅ **Responsive** - Adapts padding and spacing across devices

## Visual Design

**Background:**
- Primary gradient using theme colors: `primary` (#017cb6) to `primary-dark` (#026492)
- Subtle radial gradient pattern overlay using `primary-accent` (#e6f4fb) at 10% opacity
- Full-width alignment (alignfull) - background spans entire viewport width
- Inner content constrained to 55rem (theme.json contentSize)
- Padding: 5rem vertical, responsive on mobile

**Content Structure:**
- Small tagline (uppercase styling, fully editable via block toolbar)
- Large heading (H2, fully editable via block toolbar)
- Intro paragraph (fully editable via block toolbar)

**Typography (All Editable via Block Toolbar):**
- Users control fonts, sizes, colors, and weights through WordPress native block controls
- Default tagline: Montserrat (`montserrat`), sm (0.875rem), semibold (600), `primary-accent` color
- Default heading: Montserrat (`montserrat`), 5xl (3rem), extrabold (800), `base` (white) color
- Default paragraph: Open Sans (`open-sans`), lg (1.125rem), normal (400), `primary-accent` color
- All values map to theme.json and can be changed via toolbar dropdowns

## Implementation Steps

### 1. Create the Block

Run this command from the Trellis VM:

```bash
cd trellis
echo "yes" | trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:add-setup imagewize/page-heading-blue
```

This creates the block structure in `resources/js/blocks/page-heading-blue/`.

### 2. Configure block.json

Enable full-width alignment and minimal attributes. Block defaults to `alignfull`:

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "imagewize/page-heading-blue",
  "title": "Page Heading Blue",
  "category": "imagewize",
  "icon": "heading",
  "description": "Blue gradient heading section with tagline, heading, and intro text",
  "keywords": ["heading", "hero", "banner", "page", "blue"],
  "textdomain": "sage",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css",
  "supports": {
    "align": ["full"],
    "anchor": true,
    "spacing": {
      "margin": true,
      "padding": false
    },
    "color": {
      "background": true,
      "text": false
    }
  },
  "attributes": {
    "align": {
      "type": "string",
      "default": "full"
    }
  }
}
```

### 3. Editor Component (editor.jsx)

Use InnerBlocks with native WordPress blocks. Set default styles using theme.json values:

```jsx
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
  'core/paragraph',
  'core/heading'
];

const TEMPLATE = [
  ['core/paragraph', {
    content: 'Professional Solutions',
    fontFamily: 'montserrat',
    fontSize: 'sm',
    style: {
      typography: {
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }
    },
    textColor: 'primary-accent'
  }],
  ['core/heading', {
    level: 3,
    content: 'Transform Your Website Performance',
    fontFamily: 'montserrat',
    fontSize: '5xl',
    style: {
      typography: {
        fontWeight: '800',
        lineHeight: '1.2'
      }
    },
    textColor: 'base'
  }],
  ['core/paragraph', {
    content: 'Discover how our advanced image optimization tools help reduce file sizes by up to 80% while maintaining visual quality. Speed up your website, improve SEO rankings, and deliver better user experiences across all devices.',
    fontFamily: 'open-sans',
    fontSize: 'lg',
    style: {
      typography: {
        fontWeight: '400',
        lineHeight: '1.7'
      }
    },
    textColor: 'primary-accent'
  }]
];

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'page-heading-blue'
  });

  return (
    <div {...blockProps}>
      <div className="page-heading-blue__content">
        <InnerBlocks
          allowedBlocks={ALLOWED_BLOCKS}
          template={TEMPLATE}
          templateLock="all"
        />
      </div>
    </div>
  );
}
```

### 4. Save Component (save.jsx)

Simply render InnerBlocks content:

```jsx
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'page-heading-blue'
  });

  return (
    <div {...blockProps}>
      <div className="page-heading-blue__content">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
```

### 5. Frontend Styles (style.css)

Use CSS variables from theme.json for colors. Only style container and layout:

```css
/* Main container - full width with gradient background */
.wp-block-imagewize-page-heading-blue {
  width: 100%;
  background: linear-gradient(
    135deg,
    var(--wp--preset--color--primary, #017cb6) 0%,
    var(--wp--preset--color--primary-dark, #026492) 100%
  );
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
}

/* Subtle pattern overlay using primary-accent color */
.wp-block-imagewize-page-heading-blue::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(
      circle at 20% 50%,
      rgba(230, 244, 251, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(230, 244, 251, 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
}

/* Content wrapper - constrained to theme contentSize (55rem) */
.page-heading-blue__content {
  max-width: var(--wp--style--global--content-size, 55rem);
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

/* Responsive padding adjustments */
@media (max-width: 768px) {
  .wp-block-imagewize-page-heading-blue {
    padding: 4rem 0;
  }

  .page-heading-blue__content {
    padding: 0 1.25rem;
  }
}

@media (max-width: 480px) {
  .wp-block-imagewize-page-heading-blue {
    padding: 3rem 0;
  }

  .page-heading-blue__content {
    padding: 0 1rem;
  }
}
```

### 6. Editor Styles (editor.css)

Match frontend appearance in the editor using theme CSS variables:

```css
/* Editor preview styles - match frontend exactly */
.wp-block-imagewize-page-heading-blue {
  background: linear-gradient(
    135deg,
    var(--wp--preset--color--primary, #017cb6) 0%,
    var(--wp--preset--color--primary-dark, #026492) 100%
  );
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
}

.wp-block-imagewize-page-heading-blue::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(
      circle at 20% 50%,
      rgba(230, 244, 251, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(230, 244, 251, 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.wp-block-imagewize-page-heading-blue .page-heading-blue__content {
  max-width: var(--wp--style--global--content-size, 55rem);
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}
```

## Usage Guidelines

### Adding the Block

1. In the WordPress editor, click the "+" button
2. Search for "Page Heading Blue" or find it in the "Imagewize" category
3. The block will insert with full-width alignment and default content ready to publish

### Editing Content

**All elements are fully editable via the block toolbar!**

**Tagline (First Paragraph):**
- Click to edit content
- **Block Toolbar Controls:** Font family, font size, text color, bold/italic, alignment
- **Default:** Montserrat, sm (0.875rem), semibold (600), primary-accent color, uppercase
- Change any setting via toolbar dropdowns (all theme.json values available)

**Main Heading (H2):**
- Click to edit content
- **Block Toolbar Controls:** Heading level (H1-H6), font family, font size, text color, alignment
- **Default:** Montserrat, 5xl (3rem), extrabold (800), base (white) color
- Change any setting via toolbar dropdowns (all theme.json values available)

**Intro Text (Second Paragraph):**
- Click to edit content
- **Block Toolbar Controls:** Font family, font size, text color, bold/italic, alignment
- **Default:** Open Sans, lg (1.125rem), normal (400), primary-accent color
- Change any setting via toolbar dropdowns (all theme.json values available)

### Styling Options

**Block Toolbar (Minimal Sidebar Use):**
- **Font Family:** Choose from Open Sans, Montserrat, Menlo (via toolbar dropdown)
- **Font Size:** All theme.json sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, etc.)
- **Text Color:** All theme colors (primary, primary-accent, primary-dark, base, main, etc.)
- **Font Weight:** Via "Bold" button or Typography panel
- **Text Transform:** Via Typography panel (uppercase, lowercase, capitalize)
- **Text Alignment:** Via toolbar (left, center, right)
- **Line Height:** Via Typography panel

**Container Settings (Sidebar):**
- **Background Color:** Change gradient via Settings sidebar (defaults to primary gradient)
- **Spacing (Margin):** Top/bottom spacing via Settings sidebar
- **Anchor ID:** For navigation links

**Alignment:**
- Block defaults to full-width (alignfull)
- Background spans entire viewport width
- Content constrained to 55rem (theme.json contentSize)

**Note:** Most styling is controlled through the **block toolbar** for each inner block (paragraph, heading). Minimal use of the sidebar inspector.

## Design Philosophy

This block follows the **InnerBlocks approach (MOST PREFERRED)** from CLAUDE.md:

✅ **What we did:**
- Used native WordPress blocks (Paragraph, Heading)
- Set defaults using theme.json values (fonts, sizes, colors)
- All typography controllable via block toolbar
- Full-width alignment with content constraint
- Minimal hardcoded styles - only container/layout CSS

✅ **Benefits:**
- Maximum user control via native WordPress controls
- All fonts, sizes, colors editable through toolbar
- Familiar editing experience (no custom controls needed)
- Uses theme.json color/typography system
- Full-width background, constrained content (55rem)
- Easy to update styling without breaking structure
- Template lock prevents accidental structure changes

✅ **Theme Integration:**
- Colors: Uses `primary`, `primary-dark`, `primary-accent`, `base` from theme.json
- Fonts: Uses `open-sans`, `montserrat`, `menlo` from theme.json
- Sizes: Uses `sm`, `lg`, `5xl` etc. from theme.json
- All values accessible via toolbar dropdowns

## Technical Notes

### Block Registration

The block is automatically registered via `ThemeServiceProvider.php` - no manual registration needed.

### File Structure

```
resources/js/blocks/page-heading-blue/
├── block.json           # Block metadata (minimal attributes)
├── index.js            # Block registration
├── editor.jsx          # Editor component (InnerBlocks)
├── save.jsx            # Save component (InnerBlocks.Content)
├── style.css           # Frontend styles (container/layout)
└── editor.css          # Editor preview styles
```

### Build Process

1. Styles are compiled via Vite during `npm run dev` or `npm run build`
2. Block is available immediately in the editor after build
3. No additional configuration needed

### Color Palette (from theme.json)

The block uses Nynaeve theme colors via CSS variables:
- **Primary:** `var(--wp--preset--color--primary)` → #017cb6
- **Primary Dark:** `var(--wp--preset--color--primary-dark)` → #026492
- **Primary Accent:** `var(--wp--preset--color--primary-accent)` → #e6f4fb
- **Base (white):** `var(--wp--preset--color--base)` → #ffffff

Users can select any theme color via the block toolbar color picker.

### Typography (from theme.json)

**Font Families:**
- **Open Sans:** `var(--wp--preset--font-family--open-sans)` → "Open Sans, sans-serif"
- **Montserrat:** `var(--wp--preset--font-family--montserrat)` → "Montserrat, sans-serif"
- **Menlo:** `var(--wp--preset--font-family--menlo)` → "Menlo, monospace"

**Font Sizes:**
- **sm:** `var(--wp--preset--font-size--sm)` → 0.875rem
- **lg:** `var(--wp--preset--font-size--lg)` → 1.125rem
- **5xl:** `var(--wp--preset--font-size--5xl)` → 3rem

Users can select any theme font/size via the block toolbar dropdowns.

## Testing Checklist

**Block Appearance:**
- [ ] Block appears in editor under "Imagewize" category
- [ ] Block defaults to full-width alignment (alignfull)
- [ ] Gradient background spans entire viewport width
- [ ] Content constrained to 55rem max-width
- [ ] Pattern overlay is subtle and doesn't interfere

**Default Content:**
- [ ] Tagline displays with Montserrat, sm, semibold, primary-accent, uppercase
- [ ] Heading displays as H2 with Montserrat, 5xl, extrabold, base (white)
- [ ] Intro paragraph displays with Open Sans, lg, normal, primary-accent

**Block Toolbar Editing:**
- [ ] Tagline font family changeable via toolbar
- [ ] Tagline font size changeable via toolbar
- [ ] Tagline text color changeable via toolbar
- [ ] Heading font family changeable via toolbar
- [ ] Heading font size changeable via toolbar
- [ ] Heading text color changeable via toolbar
- [ ] Paragraph font family changeable via toolbar
- [ ] Paragraph font size changeable via toolbar
- [ ] Paragraph text color changeable via toolbar
- [ ] All theme.json values appear in dropdowns

**Container Controls:**
- [ ] Background color changeable via sidebar (defaults to primary gradient)
- [ ] Margin adjustable via sidebar spacing controls
- [ ] Anchor ID can be set for navigation

**Responsive Design:**
- [ ] Desktop: 5rem vertical padding, 1.5rem content padding
- [ ] Tablet (≤768px): 4rem vertical padding, 1.25rem content padding
- [ ] Mobile (≤480px): 3rem vertical padding, 1rem content padding
- [ ] Content stays constrained to 55rem on all screen sizes

## Troubleshooting

**Block doesn't appear in editor:**
- Run `npm run build` in theme directory
- Check browser console for JavaScript errors
- Verify block registration in DevTools

**Styles not applying:**
- Clear WordPress cache
- Hard refresh browser (Cmd/Ctrl + Shift + R)
- Check that `style.css` is properly enqueued

**Template lock issues:**
- `templateLock="all"` prevents adding/removing blocks
- Users can only edit existing block content
- This is intentional for consistent structure

## Related Documentation

- [CLAUDE.md](../CLAUDE.md) - Theme development guide
- [PATTERN-TO-NATIVE-BLOCK.md](PATTERN-TO-NATIVE-BLOCK.md) - Converting patterns to blocks
- [imagewize/sage-native-block](https://github.com/imagewize/sage-native-block) - Block package documentation
