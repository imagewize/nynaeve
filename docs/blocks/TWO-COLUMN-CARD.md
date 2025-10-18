# Two Column Card Block - Implementation Guide

## Overview

The `imagewize/two-column-card` block is a professional card grid layout designed for displaying content in a clean, organized manner. It features a main heading above a responsive grid system with elegant card styling and uses native WordPress blocks for maximum flexibility.

**Key Features:**
- ✅ **Main section heading** - Large centered heading above the card grid
- ✅ **Responsive grid layout** - Auto-responsive grid (2 columns on desktop, 1 column on mobile)
- ✅ **100% theme.json integration** - Uses theme colors, fonts, and sizes
- ✅ **Block toolbar editing** - All typography editable via toolbar (minimal sidebar use)
- ✅ **InnerBlocks approach** - Native WordPress blocks for maximum user control
- ✅ **Flexible content** - Support for multiple cards with heading and paragraph content
- ✅ **Elegant styling** - Clean borders, spacing, and decorative underlines

## Visual Design

**Container:**
- Background: `tertiary` (#f5f5f6) - Tint background
- Max-width: 1040px (65rem) constrained container
- Padding: 60px vertical (5rem), 20px horizontal (1.25rem) on desktop
- Responsive padding adjustments for mobile

**Main Heading:**
- Large centered heading above the grid (H3 level)
- Default: Montserrat, 3xl (2.25rem/36px), bold (700), `contrast` (#171b23) color
- Centered text alignment
- 3rem bottom margin for spacing from grid
- Scales down to xl on mobile
- Uses H3 because main page heading is H2

**Card Layout:**
- Uses WordPress native Columns block for 2-column layout
- Simple, intuitive column structure (50/50 split on desktop)
- Automatically stacks to 1 column on mobile (WordPress handles breakpoint at 782px)
- Gap: 30px (1.875rem) between columns
- Each column contains 2 card groups (4 cards total by default)
- No complex CSS grid constraints needed

**Individual Cards:**
- Background: `base` (#ffffff) - White background
- Padding: 45px 40px (2.8125rem 2.5rem)
- Border-radius: 8px (0.5rem)
- Border: 1px solid `border-light` (#ebeced)
- No hover effects (static, clean appearance)

**Typography (All Editable via Block Toolbar):**
- Users control fonts, sizes, colors, and weights through WordPress native block controls
- **Main heading (H3):** Montserrat, 3xl (2.25rem/36px), bold (700), `contrast` color, centered
- **Card heading (H4):** Montserrat (`montserrat`), xl (1.375rem/22px), semibold (600), `contrast` (#171b23) color
- **Card paragraph:** Open Sans (`open-sans`), base (1rem/16px), normal (400), `base-accent` (#98999a) color
- Card headings have decorative underline (50px × 2px, `border-dark` color)
- All values map to theme.json and can be changed via toolbar dropdowns
- H3/H4 levels accommodate page hierarchy (H1 = page title, H2 = main sections)

## Implementation Steps

### 1. Create the Block

Run this command from the Trellis VM:

```bash
cd trellis
echo "yes" | trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:create imagewize/two-column-card
```

This creates the block structure in `resources/js/blocks/two-column-card/`.

### 2. Configure block.json

Enable alignment and minimal attributes:

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "imagewize/two-column-card",
  "title": "Two Column Card",
  "category": "imagewize",
  "icon": "grid-view",
  "description": "Two-column card grid with headings and text content",
  "keywords": ["card", "grid", "two-column", "content", "layout"],
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

Use InnerBlocks with WordPress native Columns block. The block starts with a main heading, followed by a Columns block with 2 columns:

```jsx
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
  'core/heading',
  'core/columns'
];

const TEMPLATE = [
  ['core/heading', {
    level: 3,
    content: 'Why SMEs Need Professional WordPress Maintenance',
    fontFamily: 'montserrat',
    fontSize: '3xl',
    style: {
      typography: {
        fontWeight: '700',
        lineHeight: '1.2'
      },
      spacing: {
        margin: {
          bottom: '3rem'
        }
      }
    },
    textColor: 'contrast',
    className: 'two-column-card__main-heading',
    textAlign: 'center'
  }],
  ['core/columns', {
    className: 'two-column-card__columns'
  }, [
    ['core/column', {}, [
      ['core/group', {
        className: 'two-column-card__card',
        style: {
          spacing: {
            margin: {
              bottom: '1.875rem'
            }
          }
        }
      }, [
        ['core/heading', {
          level: 4,
          content: 'Security Threats',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          style: {
            typography: {
              fontWeight: '600',
              lineHeight: '1.4'
            },
            spacing: {
              margin: {
                bottom: '1.125rem'
              },
              padding: {
                bottom: '0.9375rem'
              }
            }
          },
          textColor: 'contrast',
          className: 'two-column-card__heading'
        }],
        ['core/paragraph', {
          content: 'WordPress powers 40% of websites, making it a prime target for hackers. Without regular security updates, your business is at risk.',
          fontFamily: 'open-sans',
          fontSize: 'base',
          style: {
            typography: {
              fontWeight: '400',
              lineHeight: '1.8'
            }
          },
          textColor: 'base-accent'
        }]
      ]],
      ['core/group', { className: 'two-column-card__card' }, [
        ['core/heading', {
          level: 4,
          content: 'Technical Complexity',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          style: {
            typography: {
              fontWeight: '600',
              lineHeight: '1.4'
            },
            spacing: {
              margin: {
                bottom: '1.125rem'
              },
              padding: {
                bottom: '0.9375rem'
              }
            }
          },
          textColor: 'contrast',
          className: 'two-column-card__heading'
        }],
        ['core/paragraph', {
          content: 'Managing WordPress updates, backups, and performance requires technical expertise most SMEs don\'t have in-house.',
          fontFamily: 'open-sans',
          fontSize: 'base',
          style: {
            typography: {
              fontWeight: '400',
              lineHeight: '1.8'
            }
          },
          textColor: 'base-accent'
        }]
      ]]
    ]],
    ['core/column', {}, [
      ['core/group', {
        className: 'two-column-card__card',
        style: {
          spacing: {
            margin: {
              bottom: '1.875rem'
            }
          }
        }
      }, [
        ['core/heading', {
          level: 4,
          content: 'Time Investment',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          style: {
            typography: {
              fontWeight: '600',
              lineHeight: '1.4'
            },
            spacing: {
              margin: {
                bottom: '1.125rem'
              },
              padding: {
                bottom: '0.9375rem'
              }
            }
          },
          textColor: 'contrast',
          className: 'two-column-card__heading'
        }],
        ['core/paragraph', {
          content: 'Proper website maintenance takes 2-4 hours monthly at least – time that could be better spent growing your business and serving your customers.',
          fontFamily: 'open-sans',
          fontSize: 'base',
          style: {
            typography: {
              fontWeight: '400',
              lineHeight: '1.8'
            }
          },
          textColor: 'base-accent'
        }]
      ]],
      ['core/group', { className: 'two-column-card__card' }, [
        ['core/heading', {
          level: 4,
          content: 'Costly Downtime',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          style: {
            typography: {
              fontWeight: '600',
              lineHeight: '1.4'
            },
            spacing: {
              margin: {
                bottom: '1.125rem'
              },
              padding: {
                bottom: '0.9375rem'
              }
            }
          },
          textColor: 'contrast',
          className: 'two-column-card__heading'
        }],
        ['core/paragraph', {
          content: 'Website issues can cost SMEs hundreds or thousands in lost revenue. Prevention is always cheaper than emergency fixes.',
          fontFamily: 'open-sans',
          fontSize: 'base',
          style: {
            typography: {
              fontWeight: '400',
              lineHeight: '1.8'
            }
          },
          textColor: 'base-accent'
        }]
      ]]
    ]]
  ]]
];

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'two-column-card'
  });

  return (
    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={ALLOWED_BLOCKS}
        template={TEMPLATE}
        templateLock={false}
      />
    </div>
  );
}
```

**Key Points:**
- Block starts with a large main heading (fully editable)
- `templateLock={false}` allows users to add/remove cards as needed
- Uses WordPress native Columns block (2 columns)
- Columns automatically stack to 1 column on mobile at WordPress's default 782px breakpoint
- Each column contains 2 card groups (4 cards total)
- Each card is a Group block containing Heading + Paragraph
- Users can add more cards to either column or adjust column settings via block toolbar

### 4. Save Component (save.jsx)

Simply render InnerBlocks content (WordPress handles the grid structure):

```jsx
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'two-column-card'
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
```

### 5. Frontend Styles (style.css)

Minimal CSS - WordPress handles the column layout and responsive behavior. We only style the container, columns, and cards:

```css
/* Main container with tint background */
.wp-block-imagewize-two-column-card {
  width: 100%;
  background: var(--wp--preset--color--tertiary, #f5f5f6);
  padding: 5rem 1.25rem;
}

/* Constrain content width */
.wp-block-imagewize-two-column-card > .wp-block-columns {
  max-width: 65rem;
  margin: 0 auto;
}

/* Set gap between columns */
.wp-block-imagewize-two-column-card .two-column-card__columns {
  gap: 1.875rem;
}

/* Individual card styling */
.two-column-card__card,
.wp-block-imagewize-two-column-card .wp-block-group.two-column-card__card {
  background: var(--wp--preset--color--base, #ffffff);
  padding: 2.8125rem 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--wp--preset--color--border-light, #ebeced);
}

/* Heading with decorative underline */
.two-column-card__heading {
  position: relative;
}

.two-column-card__heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 3.125rem;
  height: 2px;
  background: var(--wp--preset--color--border-dark, #cbcbcb);
}

/* Main heading styling */
.two-column-card__main-heading {
  width: 100%;
  max-width: 65rem;
  margin-left: auto;
  margin-right: auto;
}

/* Responsive Design */
@media (max-width: 782px) {
  .wp-block-imagewize-two-column-card {
    padding: 2.5rem 1rem;
  }

  /* WordPress columns already stack at 782px, just adjust spacing */
  .wp-block-imagewize-two-column-card .two-column-card__columns {
    gap: 1.5rem;
  }

  .two-column-card__card {
    padding: 2.1875rem 1.875rem;
  }

  .two-column-card__main-heading {
    font-size: var(--wp--preset--font-size--2-xl, 2rem) !important;
  }
}
```

### 6. Editor Styles (editor.css)

Match frontend appearance in the editor (minimal CSS, WordPress handles columns):

```css
/* Editor preview styles - match frontend exactly */
.wp-block-imagewize-two-column-card {
  background: var(--wp--preset--color--tertiary, #f5f5f6);
  padding: 5rem 1.25rem;
}

/* Constrain content width in editor */
.wp-block-imagewize-two-column-card > .wp-block-columns {
  max-width: 65rem;
  margin: 0 auto;
}

/* Set gap between columns in editor */
.wp-block-imagewize-two-column-card .two-column-card__columns {
  gap: 1.875rem;
}

.wp-block-imagewize-two-column-card .two-column-card__card,
.wp-block-imagewize-two-column-card .wp-block-group.two-column-card__card {
  background: var(--wp--preset--color--base, #ffffff);
  padding: 2.8125rem 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--wp--preset--color--border-light, #ebeced);
}

.wp-block-imagewize-two-column-card .two-column-card__heading {
  position: relative;
}

.wp-block-imagewize-two-column-card .two-column-card__heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 3.125rem;
  height: 2px;
  background: var(--wp--preset--color--border-dark, #cbcbcb);
}

/* Editor responsive preview */
@media (max-width: 782px) {
  .wp-block-imagewize-two-column-card {
    padding: 2.5rem 1rem;
  }

  .wp-block-imagewize-two-column-card .two-column-card__columns {
    gap: 1.5rem;
  }

  .wp-block-imagewize-two-column-card .two-column-card__card {
    padding: 2.1875rem 1.875rem;
  }
}
```

**Why This Approach is Better:**
- ✅ **Simpler** - Uses familiar WordPress Columns block instead of CSS Grid
- ✅ **More intuitive** - Editors understand "2 columns" better than grid settings
- ✅ **WordPress-native** - Uses built-in Columns block (WordPress 5.9+)
- ✅ **Automatic responsive** - Columns automatically stack at 782px breakpoint
- ✅ **User adjustable** - Users can modify column widths via block toolbar
- ✅ **Less custom CSS** - Only styling for container, columns, and cards (not layout logic)
- ✅ **More maintainable** - Leverages WordPress core functionality
- ✅ **No complex grid constraints** - No need for `!important` or media query overrides

## Usage Guidelines

### Adding the Block

1. In the WordPress editor, click the "+" button
2. Search for "Two Column Card" or find it in the "Imagewize" category
3. The block will insert with a main heading and 4 default cards ready to edit

### Editing Content

**All elements are fully editable via the block toolbar!**

**Main Heading:**
- Large centered heading at the top of the block (H3 level)
- Click to edit content
- **Block Toolbar Controls:** Heading level (H1-H6), font family, font size, text color, alignment
- **Default:** Montserrat, 3xl (2.25rem), bold (700), contrast color, centered
- Change any setting via toolbar dropdowns (all theme.json values available)
- H3 is used because page heading is H2

**Card Structure:**
- Two columns, each containing 2 card groups (4 cards total by default)
- Each card is a Group block containing a Heading and Paragraph
- Click any card to select it, then edit the inner blocks
- Use the block toolbar to add/remove/duplicate cards within columns

**Card Heading (H4 in each card):**
- Click to edit content
- **Block Toolbar Controls:** Heading level (H1-H6), font family, font size, text color, alignment
- **Default:** Montserrat, xl (1.375rem), semibold (600), contrast color
- Change any setting via toolbar dropdowns (all theme.json values available)
- Decorative underline is automatically applied via CSS
- H4 maintains proper hierarchy (H1 = page, H2 = sections, H3 = subsections, H4 = cards)

**Card Paragraph Text:**
- Click to edit content
- **Block Toolbar Controls:** Font family, font size, text color, bold/italic, alignment
- **Default:** Open Sans, base (1rem), normal (400), base-accent color
- Change any setting via toolbar dropdowns (all theme.json values available)

### Managing Cards

**Add More Cards:**
1. Select a column (click inside the column where you want to add a card)
2. Click "+" button to insert a new block
3. Add a new Group block with className `two-column-card__card`
4. Inside the Group, add Heading and Paragraph blocks
5. Apply the same default styles as other cards
6. Tip: Duplicate existing cards and edit content for faster setup

**Remove Cards:**
1. Select the card (Group block) you want to remove
2. Click the three dots menu (⋮) in the block toolbar
3. Select "Remove Group"

**Duplicate Cards:**
1. Select the card you want to duplicate
2. Click the three dots menu (⋮) in the block toolbar
3. Select "Duplicate"

### Styling Options

**Block Toolbar (Minimal Sidebar Use):**
- **Font Family:** Choose from Open Sans, Montserrat, Menlo (via toolbar dropdown)
- **Font Size:** All theme.json sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl)
- **Text Color:** All theme colors (primary, contrast, base-accent, main, etc.)
- **Font Weight:** Via "Bold" button or Typography panel
- **Text Alignment:** Via toolbar (left, center, right)
- **Line Height:** Via Typography panel

**Container Settings (Sidebar):**
- **Background Color:** Change tint background via Settings sidebar (defaults to tertiary)
- **Spacing (Padding/Margin):** Adjust spacing via Settings sidebar
- **Anchor ID:** For navigation links
- **Alignment:** Wide or Full alignment options

**Alignment:**
- Block defaults to wide alignment (`alignwide`)
- Content constrained to 1040px (65rem) max-width
- Choose Full alignment for wider layouts if needed

**Note:** Most styling is controlled through the **block toolbar** for each inner block (heading, paragraph). Minimal use of the sidebar inspector.

## Design Philosophy

This block follows the **InnerBlocks approach (MOST PREFERRED)** from CLAUDE.md:

✅ **What we did:**
- Used native WordPress blocks (Group, Heading, Paragraph)
- Set defaults using theme.json values (fonts, sizes, colors)
- All typography controllable via block toolbar
- Responsive grid layout with CSS Grid
- Minimal hardcoded styles - only container/layout CSS
- Template unlocked to allow adding/removing cards

✅ **Benefits:**
- Maximum user control via native WordPress controls
- All fonts, sizes, colors editable through toolbar
- Familiar editing experience (no custom controls needed)
- Uses theme.json color/typography system
- Easy to add/remove cards as needed
- Easy to update styling without breaking structure
- Responsive design with automatic mobile stacking

✅ **Theme Integration:**
- Colors: Uses `tertiary`, `base`, `border-light`, `border-dark`, `contrast`, `base-accent` from theme.json
- Fonts: Uses `open-sans`, `montserrat` from theme.json
- Sizes: Uses `base`, `xl` etc. from theme.json
- All values accessible via toolbar dropdowns

## Technical Notes

### Block Registration

The block is automatically registered via `ThemeServiceProvider.php` - no manual registration needed.

### File Structure

```
resources/js/blocks/two-column-card/
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
- **Tertiary (Tint):** `var(--wp--preset--color--tertiary)` → #f5f5f6
- **Base (White):** `var(--wp--preset--color--base)` → #ffffff
- **Border Light:** `var(--wp--preset--color--border-light)` → #ebeced
- **Border Dark:** `var(--wp--preset--color--border-dark)` → #cbcbcb
- **Contrast:** `var(--wp--preset--color--contrast)` → #171b23
- **Base Accent:** `var(--wp--preset--color--base-accent)` → #98999a

Users can select any theme color via the block toolbar color picker.

### Typography (from theme.json)

**Font Families:**
- **Open Sans:** `var(--wp--preset--font-family--open-sans)` → "Open Sans, sans-serif"
- **Montserrat:** `var(--wp--preset--font-family--montserrat)` → "Montserrat, sans-serif"
- **Menlo:** `var(--wp--preset--font-family--menlo)` → "Menlo, monospace"

**Font Sizes:**
- **base:** `var(--wp--preset--font-size--base)` → 1rem (16px)
- **xl:** `var(--wp--preset--font-size--xl)` → 1.375rem (22px)

Users can select any theme font/size via the block toolbar dropdowns.

## Testing Checklist

**Block Appearance:**
- [ ] Block appears in editor under "Imagewize" category
- [ ] Block defaults to wide alignment (`alignwide`)
- [ ] Tint background spans container width
- [ ] Cards display in two-column grid on desktop
- [ ] Cards stack in single column on mobile (≤768px)
- [ ] Card borders and spacing render correctly

**Default Content:**
- [ ] Main heading (H3) renders with Montserrat, 3xl, bold, contrast color, centered
- [ ] 4 cards render by default with real content (2 per column)
- [ ] Card headings (H4) display with Montserrat, xl, semibold, contrast color
- [ ] Card headings have decorative underline (50px × 2px)
- [ ] Card paragraphs display with Open Sans, base, normal, base-accent color
- [ ] All content is immediately editable

**Block Toolbar Editing:**
- [ ] Main heading font family changeable via toolbar
- [ ] Main heading font size changeable via toolbar
- [ ] Main heading text color changeable via toolbar
- [ ] Main heading alignment changeable via toolbar
- [ ] Card heading font family changeable via toolbar
- [ ] Card heading font size changeable via toolbar
- [ ] Card heading text color changeable via toolbar
- [ ] Card heading level (H1-H6) changeable via toolbar
- [ ] Card paragraph font family changeable via toolbar
- [ ] Card paragraph font size changeable via toolbar
- [ ] Card paragraph text color changeable via toolbar
- [ ] All theme.json values appear in dropdowns

**Card Management:**
- [ ] Can add new cards via inserter
- [ ] Can remove cards via block toolbar menu
- [ ] Can duplicate cards via block toolbar menu
- [ ] Can reorder cards via drag-and-drop

**Container Controls:**
- [ ] Background color changeable via sidebar (defaults to tertiary)
- [ ] Padding adjustable via sidebar spacing controls
- [ ] Margin adjustable via sidebar spacing controls
- [ ] Anchor ID can be set for navigation
- [ ] Alignment switchable between wide/full

**Responsive Design:**
- [ ] Desktop: 2 columns (50/50 split), 30px gap, 60px vertical padding
- [ ] Desktop: Cards at 45px × 40px padding
- [ ] Mobile (≤782px): Columns automatically stack to single column, 24px gap, 40px vertical padding
- [ ] Mobile: Cards at 35px × 30px padding
- [ ] Mobile: Main heading scales down to xl font size
- [ ] Content readable on all screen sizes
- [ ] WordPress handles column stacking automatically at 782px breakpoint

## Troubleshooting

**Block doesn't appear in editor:**
- Run `npm run build` in theme directory
- Check browser console for JavaScript errors
- Verify block registration in DevTools

**Styles not applying:**
- Clear WordPress cache
- Hard refresh browser (Cmd/Ctrl + Shift + R)
- Check that `style.css` is properly enqueued

**Columns not aligning properly:**
- Verify WordPress Columns block is working correctly
- Check for conflicting theme styles
- Inspect column container in DevTools
- Ensure both columns have equal width (50/50)

**Decorative underline not showing:**
- Verify heading has `two-column-card__heading` class
- Check CSS `::after` pseudo-element in DevTools
- Ensure heading has bottom padding for underline space

**Can't add/remove cards:**
- Check that `templateLock={false}` in editor.jsx
- Verify InnerBlocks allowedBlocks includes 'core/columns' and 'core/column'
- Try selecting the column (not the outer block or individual card)
- Make sure you're clicking inside a column when adding new cards

## Related Documentation

- [CLAUDE.md](../CLAUDE.md) - Theme development guide
- [PAGE-HEADING-BLUE-BLOCK.md](PAGE-HEADING-BLUE-BLOCK.md) - Similar InnerBlocks implementation
- [PATTERN-TO-NATIVE-BLOCK.md](PATTERN-TO-NATIVE-BLOCK.md) - Converting patterns to blocks
- [imagewize/sage-native-block](https://github.com/imagewize/sage-native-block) - Block package documentation
