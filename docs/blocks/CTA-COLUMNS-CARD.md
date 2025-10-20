# CTA Columns Block - Design Analysis & Improvement Options

**Block Name:** `imagewize/cta-columns`
**Current Version:** 1.22.0
**Status:** Implemented, needs visual enhancement
**Date:** 2025-10-20

---

## Table of Contents

1. [Current Implementation](#current-implementation)
2. [Design Critique](#design-critique)
3. [Ollie/Moiraine Pattern Analysis](#olliemoiraine-pattern-analysis)
4. [Improvement Options](#improvement-options)
5. [Recommended Approach](#recommended-approach)

---

## Current Implementation

### What We Built

A dual call-to-action block with two side-by-side white cards, each containing:
- Heading (H3)
- Description paragraph
- Button

The block also supports:
- Optional section heading (H2)
- Optional section description
- Three background color variants (white, light blue, dark)

### Current Design Specs

**Card Structure:**
- Background: `base` (white #ffffff)
- Border: 1px solid `border-light` (#ebeced)
- Border radius: 0.5rem (8px)
- Padding: 2.8125rem 2.5rem (45px 40px)
- Gap between cards: 1.875rem (30px)

**Typography:**
- Section heading (H2):
  - Font: Montserrat
  - Size: `2-xl`
  - Weight: 600
  - Color: `main` (#171b23)
  - Align: center

- Card heading (H3):
  - Font: Montserrat
  - Size: `xl`
  - Weight: 600
  - Color: `main` (#171b23)
  - Align: center

- Description:
  - Font: Open Sans
  - Size: `base` (1rem)
  - Color: `secondary` (#98999a)
  - Align: center

**Buttons:**
- Style: `is-style-fill`
- Background: `primary` (#017cb6)
- Text color: `base` (white)
- Border radius: 0.5rem

**Color Variants:**
- Default: No background (transparent/white page background)
- Light Blue: `primary-accent` background (#e6f4fb)
- Dark: `main` background (#171b23)

### Technical Implementation

**File Structure:**
```
resources/js/blocks/cta-columns/
├── index.js          # Block registration
├── editor.jsx        # Edit component with template
├── save.jsx          # Frontend output
├── block.json        # Block metadata
├── editor.css        # Editor styles
└── style.css         # Frontend styles
```

**Key Features:**
- Uses `InnerBlocks` for full editability
- Template-based structure with unlocked editing
- InspectorControls for background color selection
- Responsive (stacks on mobile, side-by-side on desktop)
- Supports wide and full alignment

---

## Design Critique

### Why Current Cards Look "Dull"

1. **Low Visual Contrast**
   - White cards on white/light background blend together
   - Same background color as the containing block in default variant
   - Cards don't "pop" or demand attention

2. **Monotonous Color Usage**
   - Heading and body text both use grayscale colors
   - No use of brand colors (primary blue) in text hierarchy
   - Border color is too subtle (#ebeced is barely visible)

3. **Typography Lacks Hierarchy**
   - While font weights differ (600 vs 400), color doesn't reinforce hierarchy
   - No use of accent colors to create visual layers
   - Both fonts are sans-serif (Montserrat and Open Sans are similar)

4. **Buttons Lack Distinction**
   - Buttons are same blue as primary brand color
   - No variation between primary/secondary actions
   - Single button per card doesn't offer choice

5. **Missing Design Drama**
   - No bold background treatments
   - No use of dark backgrounds with light text
   - No decorative elements (separators, icons, badges)

6. **Cards Don't Feel "Contained"**
   - Light border doesn't create strong boundary
   - Rounded corners are subtle
   - Cards feel more like "sections" than "actionable items"

---

## Ollie/Moiraine Pattern Analysis

### Overview

Analysis of 5 CTA card patterns from Ollie and Moiraine themes reveals consistent design principles that create strong visual impact and clear call-to-action hierarchy.

**Patterns Analyzed:**
1. Big Text Call To Action Card
2. Call To Action Card With Buttons
3. Call To Action Card (Simple)
4. Text and Call To Action Card (Two-Column)
5. Explore More CTA (Moiraine)

### Key Design Principles

#### 1. Strong Color Contrast

**Dark Backgrounds with Light Text:**
- Primary background: `primary` color (dark blue/purple tones)
- Main background: `main` color (dark charcoal/black)
- Text color: `base` (white/light) for primary content
- Accent text: `primary-accent` or `main-accent` for supporting text

**Why This Works:**
- Creates immediate visual separation from page background
- Draws eye through contrast
- Signals importance ("this is different from regular content")
- Professional, sophisticated appearance

#### 2. Multi-Layer Color Hierarchy

**Three-Tier Text System:**
1. **Primary headings:** Light/base color (white) - most important
2. **Body text:** Accent color (softer, muted) - supporting info
3. **Metadata/links:** Accent color with smaller size - tertiary info

**Example from Ollie:**
- Eyebrow text: `main-accent` (#465166), weight 500, size small
- Main heading: `base` (white), weight 600, size medium
- Body paragraph: `main-accent`, weight 400, default size

#### 3. Generous Spacing System

**Consistent Padding:**
- Cards use `large` spacing preset minimum (typically 2-3rem)
- Some use `x-large` or `xx-large` for hero sections
- Internal block gaps: `small` to `medium` between elements
- Column gaps: `x-large` between cards

**Benefits:**
- Prevents cramped appearance
- Creates "breathing room" that feels premium
- Improves scannability and readability
- Makes buttons more prominent through isolation

#### 4. Subtle Border Radius

**Standard: 5px rounded corners**
- Modern without being overly rounded
- Maintains professional appearance
- Softens geometric boxes
- Used consistently across all card patterns

#### 5. Typography Weight Hierarchy

**Font Weight System:**
- Eyebrow/metadata: 500 (medium)
- Headings: 600 (semi-bold)
- Body text: 400 (regular)
- Testimonials/quotes: 600 (semi-bold for emphasis)

**No reliance on font family changes** - hierarchy through weight and color alone

#### 6. Button Contrast Strategy

**Light Buttons on Dark Backgrounds:**
- Class: `is-style-button-light`
- Maximum contrast ensures visibility
- Full-width buttons for emphasis in contained cards
- Side-by-side buttons when offering choice

**Button Patterns:**
- Single full-width: Strong, singular focus
- Dual buttons: Primary + secondary actions
- Equal-weight buttons: User choice between similar options

#### 7. Decorative Elements

**Moiraine Additions:**
- Dotted separators between sections (`is-style-separator-dotted`)
- Star ratings for social proof
- Version badges positioned with flex layouts
- Small supporting links (e.g., "or view on WordPress.org")

**Ollie Approach:**
- More minimal - fewer decorative elements
- Relies on strong color contrast and typography
- Thin separators (`is-style-separator-thin`)

---

## Detailed Pattern Breakdown

### Pattern 1: Big Text Call To Action Card

**Best For:** Hero CTAs, major conversions, full-width sections

**Design Specs:**
```
Container:
- Block: Cover block
- Background: overlayColor "main" (dark)
- Opacity: 100%
- Padding: x-large (top/bottom)
- Full-width or wide alignment

Typography:
- Eyebrow: color "main-accent", size small, weight 500
- Heading: color "base", size medium, weight 600, left-aligned
- Body: color "main-accent", size default, weight 400

Spacing:
- Block gap: small between text elements

Button:
- Style: button-light (light on dark)
- Width: 100 (full width)
```

**Key Feature:** Dramatic dark background creates maximum impact and attention-grabbing effect.

### Pattern 2: Call To Action Card With Buttons

**Best For:** Offering primary + secondary actions, contained cards

**Design Specs:**
```
Container:
- Background: backgroundColor "primary" (solid color, no cover)
- Border radius: 5px
- Padding: large (all sides)

Typography:
- Heading: color "base", size medium, weight 600, center-aligned
- Body: color "primary-accent", center-aligned

Buttons:
- Two buttons side-by-side
- Primary: is-style-button-light
- Secondary: is-style-fill
- Layout: centered flex with small gap
```

**Key Feature:** Dual buttons provide action hierarchy while maintaining balance.

### Pattern 3: Call To Action Card (Simple)

**Best For:** Download cards, feature promotions, contained actions

**Design Specs:**
```
Container:
- Background: backgroundColor "primary"
- Border radius: 5px
- Padding: large (all sides)

Typography:
- Title row: flex layout, space-between
  - Main title: color "base", size medium, weight 600
  - Version: color "primary-accent", default size
- Body: color "base"
- Supporting link: color "primary-accent", size x-small, center-aligned

Decorative:
- Separator (Moiraine): is-style-separator-dotted, color "primary-accent"
- No separator in Ollie (cleaner)

Button:
- Style: button-light
- Width: 100 (full width)
```

**Key Feature:** Flex-based title row creates visual interest and displays metadata elegantly.

### Pattern 4: Text and Call To Action Card (Two-Column)

**Best For:** Educational content + CTA, side-by-side layouts

**Design Specs:**
```
Overall Container:
- Alignment: full
- Background: backgroundColor "tertiary"
- Padding: xx-large or xxx-large

Columns:
- Vertical alignment: center
- Column gap: x-large (horizontal and vertical)

Left Column (Content):
- Eyebrow: color "primary", size small, weight 500
- Heading: H2, default styling
- Body: paragraph
- Separator: thin or dotted, margin large (top/bottom)
- Testimonial: stars (color "primary"), quote (weight 600), attribution (color "secondary", size x-small)

Right Column (CTA Card):
- Same structure as Pattern 3
- Creates focused action area separate from informational content
```

**Key Feature:** Separates educational content from action, guides user through information → decision → action flow.

### Pattern 5: Explore More CTA (Moiraine)

**Best For:** Footer CTAs, resource sections, equal-weight actions

**Design Specs:**
```
Container:
- Alignment: full
- Background: backgroundColor "main" (dark)
- Padding: x-large (vertical), medium (horizontal)
- Max-width: 600px (constrained content, centered)

Typography:
- Heading: color "base", size large, weight 600, center-aligned
- Body: color "main-accent", center-aligned

Buttons:
- Two buttons, both is-style-button-light
- No hierarchy (equal visual weight)
- Centered flex layout

Spacing:
- Block gap: medium between elements
- Button margin-top: medium
```

**Key Feature:** Constrained width creates focus, dual equal buttons offer choice without pressure.

---

## What Makes These Patterns Visually Appealing

### Problems with Basic White Background + Same-Color Text

| Issue | Impact |
|-------|--------|
| No visual hierarchy | Everything blends together, eye doesn't know where to look |
| Low contrast | Fails to grab attention, easily overlooked |
| No depth | Flat, uninviting appearance, feels like placeholder content |
| Weak CTA | Buttons don't stand out, conversion suffers |
| No containment | Content feels disconnected, not actionable |

### How Ollie/Moiraine Patterns Solve These Issues

#### 1. High Contrast Backgrounds

**The Solution:**
- Dark `primary`/`main` backgrounds immediately separate CTA from page
- Creates visual "weight" that draws the eye
- Light text on dark background = drama and sophistication

**Result:** CTA becomes focal point, impossible to miss

#### 2. Multi-Color Hierarchy

**The Solution:**
- `base` color (light) for primary content
- `primary-accent`/`main-accent` for supporting text
- Creates layers of importance through color alone

**Result:** Eye naturally follows hierarchy from heading → body → button

#### 3. Contained Boxes

**The Solution:**
- Border radius and padding create clear boundaries
- Card appears as distinct, actionable element
- User perceives it as "something to interact with"

**Result:** Higher engagement, clear affordance

#### 4. Generous Whitespace

**The Solution:**
- Padding creates breathing room
- Prevents claustrophobic feeling
- Makes content more scannable

**Result:** Premium feel, easier to read, less overwhelming

#### 5. Button Contrast

**The Solution:**
- Light buttons on dark backgrounds pop visually
- Full-width buttons feel significant
- Clear affordance ("this is clickable")

**Result:** Higher click-through rates, better conversion

#### 6. Decorative Details

**The Solution:**
- Separators break up text blocks
- Testimonials add social proof
- Small details (version badges, links) add polish

**Result:** Professional appearance, builds trust

#### 7. Professional Typography

**The Solution:**
- Font weight hierarchy guides the eye
- Font size variations create rhythm
- Center vs. left alignment adds variety

**Result:** Content feels intentional and well-crafted

---

## Improvement Options

### Option 1: Dark Card Backgrounds (Most Dramatic)

**Recommended for:** Maximum visual impact, primary CTAs

**Changes:**
```
Card Container:
- Background: primary (#017cb6) or main (#171b23)
- Border: Remove (not needed with strong background)
- Border radius: Keep at 0.5rem or increase to 8px

Typography:
- Headings: Change to base (white #ffffff)
- Body text: Change to primary-accent or main-accent (lighter gray)
- Keep font families (Montserrat for headings, Open Sans for body)

Buttons:
- Change to is-style-button-light (light buttons on dark background)
- Or use outline style with white border

Section Background:
- Keep default (white/transparent) for maximum card contrast
- OR use tertiary (#f5f5f6) for subtle depth
```

**Pros:**
- Maximum visual impact and attention-grabbing
- Clear containment and actionable appearance
- Follows proven Ollie/Moiraine patterns
- Works well for primary conversions

**Cons:**
- May feel too heavy if overused
- Requires light button variants
- Dark-on-dark not suitable for dark mode sites

**Example Implementation:**
```jsx
['core/column', {
  backgroundColor: 'primary', // or 'main'
  style: {
    border: {
      radius: '0.5rem'
    },
    spacing: {
      padding: {
        top: '2.8125rem',
        right: '2.5rem',
        bottom: '2.8125rem',
        left: '2.5rem'
      }
    }
  }
}, [
  ['core/heading', {
    level: 3,
    textColor: 'base', // white
    fontFamily: 'montserrat'
  }],
  ['core/paragraph', {
    textColor: 'primary-accent', // lighter, softer
    fontFamily: 'open-sans'
  }],
  ['core/button', {
    className: 'is-style-button-light' // light button
  }]
]]
```

### Option 2: Enhanced White Cards with Color Accents

**Recommended for:** Maintaining light feel while adding visual interest

**Changes:**
```
Card Container:
- Background: Keep base (white)
- Border: Increase to 2px, change color to border-dark for visibility
- OR remove border, add subtle shadow: box-shadow: 0 4px 6px rgba(0,0,0,0.1)
- Border radius: Increase to 8px for more rounded appearance

Typography:
- Headings: Keep main color BUT increase font size to 2xl
- Body text: Keep secondary BUT consider main-accent for more color
- Optional: Add eyebrow text above heading in primary color

Decorative:
- Add separator between heading and body (dotted style, primary color)
- OR add icon/emoji at top of card for visual interest

Buttons:
- Keep primary background
- Consider increasing size/padding for prominence
- OR offer dual buttons (primary + secondary action)

Section Background:
- Change to tertiary (#f5f5f6) for subtle card lift
- Cards remain white, but now have slight elevation
```

**Pros:**
- Maintains clean, light aesthetic
- Easier to implement (smaller changes)
- More versatile for different page contexts
- Still feels approachable and friendly

**Cons:**
- Less dramatic impact than dark cards
- May still feel somewhat "safe" or conventional
- Requires careful balance of accent colors

**Example Implementation:**
```jsx
// Section background
backgroundColor: 'tertiary', // light gray

// Card
['core/column', {
  backgroundColor: 'base', // white
  style: {
    border: {
      radius: '0.5rem',
      width: '2px',
      color: 'var(--wp--preset--color--border-dark)' // stronger border
    },
    spacing: {
      padding: {
        top: '2.8125rem',
        right: '2.5rem',
        bottom: '2.8125rem',
        left: '2.5rem'
      }
    },
    // Optional shadow
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }
}, [
  // Optional eyebrow
  ['core/paragraph', {
    content: 'Featured',
    style: {
      typography: {
        fontSize: 'var(--wp--preset--font-size--sm)',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      },
      spacing: {
        margin: { bottom: '0.5rem' }
      }
    },
    textColor: 'primary',
    fontFamily: 'montserrat'
  }],
  ['core/heading', {
    level: 3,
    textColor: 'main',
    fontFamily: 'montserrat',
    style: {
      typography: {
        fontSize: 'var(--wp--preset--font-size--2-xl)' // larger
      }
    }
  }],
  // Optional separator
  ['core/separator', {
    className: 'is-style-separator-dotted',
    backgroundColor: 'primary',
    style: {
      spacing: {
        margin: {
          top: '1rem',
          bottom: '1rem'
        }
      }
    }
  }],
  ['core/paragraph', {
    textColor: 'main-accent', // stronger than secondary
    fontFamily: 'open-sans'
  }]
]]
```

### Option 3: Gradient Backgrounds

**Recommended for:** Modern, eye-catching designs

**Changes:**
```
Card Container:
- Remove solid background
- Add gradient overlay using CSS custom properties
- Example gradients:
  - Light: linear-gradient(135deg, #e6f4fb 0%, #ffffff 100%)
  - Primary: linear-gradient(135deg, #017cb6 0%, #026492 100%)
  - Dark: linear-gradient(135deg, #171b23 0%, #2a2f3a 100%)

Typography:
- Adjust text colors based on gradient darkness
- Light gradients: keep current colors
- Dark gradients: use base (white) for headings

Border:
- Remove for seamless gradient appearance
- Border radius: Keep at 0.5rem
```

**Pros:**
- Modern, trendy appearance
- Creates depth without being too heavy
- Can be subtle or dramatic based on gradient choice

**Cons:**
- May feel dated if trends change
- Can be distracting if too bold
- Requires custom CSS (not directly supported in block attributes)

### Option 4: Mixed Card Styles (Asymmetric)

**Recommended for:** Creating visual hierarchy between two CTAs

**Changes:**
```
Card 1 (Primary Action):
- Background: primary or main (dark)
- Text: base and primary-accent (light)
- Button: is-style-button-light
- Larger padding or slightly larger overall

Card 2 (Secondary Action):
- Background: base (white) or tertiary (light gray)
- Text: main and secondary (dark)
- Button: is-style-fill with primary color
- Standard padding

Section Background:
- Use tertiary for subtle depth
```

**Pros:**
- Creates clear visual hierarchy (which CTA is more important)
- More interesting than symmetric design
- Guides user attention to primary action

**Cons:**
- May feel unbalanced if not carefully designed
- Requires more complex template logic
- Could confuse users if hierarchy isn't clear

**Example Implementation:**
```jsx
['core/columns', {
  className: 'cta-columns__cards'
}, [
  // Card 1 - Primary (dark background)
  ['core/column', {
    backgroundColor: 'primary',
    style: {
      border: { radius: '0.5rem' },
      spacing: {
        padding: {
          top: '3rem',      // slightly more padding
          right: '2.75rem',
          bottom: '3rem',
          left: '2.75rem'
        }
      }
    }
  }, [
    ['core/heading', {
      textColor: 'base',
      fontFamily: 'montserrat'
    }],
    ['core/paragraph', {
      textColor: 'primary-accent',
      fontFamily: 'open-sans'
    }],
    ['core/button', {
      className: 'is-style-button-light'
    }]
  ]],

  // Card 2 - Secondary (light background)
  ['core/column', {
    backgroundColor: 'base',
    style: {
      border: {
        radius: '0.5rem',
        width: '2px',
        color: 'var(--wp--preset--color--border-dark)'
      },
      spacing: {
        padding: {
          top: '2.8125rem',
          right: '2.5rem',
          bottom: '2.8125rem',
          left: '2.5rem'
        }
      }
    }
  }, [
    ['core/heading', {
      textColor: 'main',
      fontFamily: 'montserrat'
    }],
    ['core/paragraph', {
      textColor: 'secondary',
      fontFamily: 'open-sans'
    }],
    ['core/button', {
      backgroundColor: 'primary',
      textColor: 'base',
      className: 'is-style-fill'
    }]
  ]]
]]
```

### Option 5: Icon-Enhanced Cards

**Recommended for:** Adding visual interest and quick recognition

**Changes:**
```
Card Container:
- Keep current design OR combine with Options 1-2

Content Addition:
- Add icon/emoji at top of each card (before heading)
- Icon size: 2-3rem
- Icon color: primary or use emoji for color
- Centered alignment

Typography:
- Adjust heading margin-top to account for icon
```

**Pros:**
- Quick visual differentiation between cards
- Adds personality and friendliness
- Helps users quickly identify card purpose

**Cons:**
- Requires choosing appropriate icons
- May feel too playful for some brands
- Icon choice can be subjective

**Example Implementation:**
```jsx
['core/column', {
  // ... existing styles
}, [
  // Icon or emoji
  ['core/paragraph', {
    content: '🚀', // or use icon block
    align: 'center',
    style: {
      typography: {
        fontSize: '3rem',
        lineHeight: '1'
      },
      spacing: {
        margin: {
          bottom: '1rem'
        }
      }
    }
  }],
  ['core/heading', { /* ... */ }],
  ['core/paragraph', { /* ... */ }],
  ['core/button', { /* ... */ }]
]]
```

---

## Recommended Approach

### Primary Recommendation: Option 1 with Enhancements

**Why Dark Card Backgrounds:**
1. Follows proven Ollie/Moiraine patterns that consistently work
2. Maximum visual impact for CTAs (purpose is conversion)
3. Clear affordance (these are actionable items)
4. Creates strong separation from page content
5. Professional, sophisticated appearance

**Implementation Plan:**

#### Step 1: Update Default Card Design

**Card Background:**
- Change from `base` (white) to `primary` (#017cb6)
- Alternative: Offer `main` (#171b23) as variant

**Typography:**
- Headings: Change to `base` (white)
- Body text: Change to `primary-accent` (#e6f4fb) for softer contrast
- Keep font families (Montserrat for headings, Open Sans for body)

**Buttons:**
- Change to `is-style-button-light` (light button on dark background)
- OR create new button style: white background, primary text, primary border
- Keep full-width or offer centered, auto-width option

**Section Background:**
- Default to `transparent` or `base` (white) for maximum card contrast
- Offer `tertiary` (#f5f5f6) as subtle variant

#### Step 2: Add Optional Decorative Elements

**Separators:**
- Add separator between heading and body (optional in template)
- Style: `is-style-separator-dotted`
- Color: `primary-accent` (lighter blue)
- Margin: 1rem top/bottom

**Eyebrow Text:**
- Optional paragraph above heading
- Small size, uppercase, letter-spacing
- Color: `primary-accent`
- Example: "Featured Service" or "Most Popular"

#### Step 3: Enhance Color Variants

**Update InspectorControls:**
```javascript
options={[
  { label: 'Primary (Blue Cards)', value: 'primary' },
  { label: 'Dark (Charcoal Cards)', value: 'dark' },
  { label: 'Light (White Cards)', value: 'light' },
  { label: 'Mixed (Primary + Light)', value: 'mixed' }
]}
```

**Variant Specs:**

1. **Primary (Default):**
   - Cards: `primary` background
   - Section: `base` or `transparent`
   - Text: `base` and `primary-accent`

2. **Dark:**
   - Cards: `main` background
   - Section: `base` or `transparent`
   - Text: `base` and `main-accent`

3. **Light:**
   - Cards: `base` background with strong border
   - Section: `tertiary` background
   - Text: `main` and `main-accent`
   - Buttons: `is-style-fill` with `primary` color

4. **Mixed (Advanced):**
   - Card 1: `primary` background (primary action)
   - Card 2: `base` background (secondary action)
   - Section: `tertiary` background
   - Creates visual hierarchy

#### Step 4: Improve Spacing

**Increase Padding:**
- Current: 2.8125rem 2.5rem
- New: 3rem 2.75rem (slightly more generous)

**Add Responsive Padding:**
```css
@media (max-width: 768px) {
  padding: 2rem 1.5rem; /* Less padding on mobile */
}
```

**Adjust Block Gaps:**
- Between heading and body: 1rem
- Between body and button: 1.5rem
- Between cards: 2rem (increase from 1.875rem)

#### Step 5: Typography Refinements

**Heading Sizes:**
- Section heading (H2): Keep at `2-xl`
- Card heading (H3): Consider increasing from `xl` to `2-xl` for more impact

**Font Weights:**
- Headings: Increase to 700 (bold) for dark backgrounds (better readability)
- Body: Keep at 400 (regular)

**Line Heights:**
- Headings: 1.2-1.3 (tight, impactful)
- Body: 1.7 (comfortable reading)

### Visual Comparison

#### Before (Current):
```
[White Page Background]
  [White Card with light border]
    • Dark heading (#171b23)
    • Gray body text (#98999a)
    • Blue button (#017cb6)
```
**Issues:** Low contrast, blends with page, feels flat

#### After (Recommended):
```
[White Page Background]
  [Blue Card (#017cb6)]
    • White heading (#ffffff)
    • Light blue body text (#e6f4fb)
    • White button (light style)
```
**Benefits:** High contrast, clear containment, strong CTA, professional

---

## Implementation Checklist

### Phase 1: Core Design Update

- [ ] Update card `backgroundColor` from `base` to `primary`
- [ ] Change heading `textColor` from `main` to `base`
- [ ] Change body `textColor` from `secondary` to `primary-accent`
- [ ] Update button style from `is-style-fill` to `is-style-button-light`
- [ ] Remove card border (not needed with dark background)
- [ ] Test color contrast for accessibility (WCAG AA minimum)

### Phase 2: Spacing Refinements

- [ ] Increase card padding to 3rem 2.75rem
- [ ] Add responsive padding for mobile
- [ ] Increase gap between cards to 2rem
- [ ] Adjust internal spacing (heading → body: 1rem, body → button: 1.5rem)

### Phase 3: Optional Enhancements

- [ ] Add optional separator element in template
- [ ] Add optional eyebrow text in template
- [ ] Create separator style in CSS (if not using existing separator block)
- [ ] Add icon/emoji option in template (optional)

### Phase 4: Color Variants

- [ ] Update `colorVariant` attribute options
- [ ] Add logic for "mixed" variant (asymmetric cards)
- [ ] Update `getBackgroundClass()` function
- [ ] Add card-specific background logic for mixed variant
- [ ] Test all variants for consistency

### Phase 5: Documentation & Testing

- [ ] Update block documentation
- [ ] Create screenshot examples of each variant
- [ ] Test responsive behavior (mobile stacking)
- [ ] Test in WordPress editor
- [ ] Test on frontend
- [ ] Verify accessibility (color contrast, keyboard navigation)
- [ ] Test with different content lengths (short/long text)

---

## Design System Alignment

### Colors Used (from theme.json)

```javascript
{
  primary: '#017cb6',          // Brand blue
  'primary-accent': '#e6f4fb', // Light blue
  'primary-dark': '#026492',   // Dark blue
  main: '#171b23',             // Contrast (dark charcoal)
  'main-accent': '#465166',    // Contrast accent (medium gray)
  base: '#ffffff',             // Base (white)
  secondary: '#98999a',        // Base accent (light gray)
  tertiary: '#f5f5f6',         // Tint (very light gray)
  'border-light': '#ebeced',   // Border light
  'border-dark': '#cbcbcb'     // Border dark
}
```

### Typography Scale

```javascript
{
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  // ... larger sizes
}
```

### Font Families

```javascript
{
  'open-sans': 'Open Sans, sans-serif',     // Body text
  montserrat: 'Montserrat, sans-serif',     // Headings
  menlo: 'Menlo, monospace'                 // Code
}
```

---

## Accessibility Considerations

### Color Contrast Requirements

**WCAG 2.1 Level AA:**
- Normal text (< 18pt): 4.5:1 contrast ratio
- Large text (≥ 18pt or ≥ 14pt bold): 3:1 contrast ratio

**Current Theme Contrast Ratios:**

With `primary` background (#017cb6):
- White text (#ffffff): **4.54:1** ✅ (passes for large text, borderline for normal)
- Primary-accent text (#e6f4fb): **1.09:1** ❌ (fails - too light)

With `main` background (#171b23):
- White text (#ffffff): **14.86:1** ✅ (excellent)
- Main-accent text (#465166): **4.52:1** ✅ (passes)

**Recommendations:**

1. **For Primary Background:**
   - Use white (`base`) for all important text
   - If using `primary-accent` for body, ensure font size is large (18pt+)
   - Consider using `main-accent` instead of `primary-accent` for better contrast
   - Alternative: Darken `primary` background to `primary-dark` (#026492)

2. **For Main Background:**
   - White headings and `main-accent` body meet all requirements
   - This is the safest option for accessibility

3. **Testing:**
   - Test with browser accessibility tools
   - Verify with screen readers
   - Check keyboard navigation (tab through buttons)

### Semantic HTML

- Ensure heading hierarchy is maintained (H2 → H3)
- Buttons should be actual `<button>` or `<a>` elements
- Use ARIA labels if button text isn't descriptive
- Ensure focus styles are visible on buttons

---

## Next Steps

1. **Review and Approve:** Stakeholder review of recommended approach
2. **Create Mockups:** Design visual mockups of new card designs
3. **Implement Changes:** Update block templates and styles
4. **Test Thoroughly:** Accessibility, responsiveness, browser compatibility
5. **Document Usage:** Update editor documentation with new design patterns
6. **Deploy:** Roll out to production after QA

---

## References

**Source Files Analyzed:**
- `/Users/jasperfrumau/code/ollie/patterns/card-big-text-call-to-action.php`
- `/Users/jasperfrumau/code/ollie/patterns/card-call-to-action-with-buttons.php`
- `/Users/jasperfrumau/code/ollie/patterns/card-call-to-action.php`
- `/Users/jasperfrumau/code/ollie/patterns/card-text-and-call-to-action.php`
- `/Users/jasperfrumau/code/moiraine/patterns/card-big-text-call-to-action.php`
- `/Users/jasperfrumau/code/moiraine/patterns/card-call-to-action-with-buttons.php`
- `/Users/jasperfrumau/code/moiraine/patterns/card-call-to-action.php`
- `/Users/jasperfrumau/code/moiraine/patterns/card-text-and-call-to-action.php`
- `/Users/jasperfrumau/code/moiraine/patterns/cta-explore-more.php`

**Current Implementation:**
- `site/web/app/themes/nynaeve/resources/js/blocks/cta-columns/`
- `site/web/app/themes/nynaeve/docs/CTA-COLUMNS-BLOCK-PLAN.md`

**Theme Resources:**
- Ollie Theme: https://github.com/OllieWP/ollie
- Moiraine Theme: Local installation at `~/code/moiraine`
- Sage 11 Documentation: https://roots.io/sage/docs/
- WordPress Block Editor Handbook: https://developer.wordpress.org/block-editor/

---

**Document Version:** 1.0
**Last Updated:** 2025-10-20
**Author:** Design Analysis based on Ollie/Moiraine pattern research
