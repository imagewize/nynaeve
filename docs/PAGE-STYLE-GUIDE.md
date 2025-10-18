# Page Style Guide - Nynaeve Theme

## Overview

This guide provides recommendations for creating visually engaging, well-structured pages in the Nynaeve theme. Based on analysis comparing the home page (rich custom blocks) vs. the maintenance page (native blocks), these guidelines help maintain visual consistency and hierarchy across the site.

---

## Typography & Hierarchy

### Current Typography Issues

The current typography hierarchy doesn't provide enough visual differentiation:

- **H2** at `1.25rem` (xl) is too small for main section headings
- **H3** at `1.125rem` (lg) is barely larger than body text (1rem)
- **Line height** of `1.2` on headings feels cramped
- Not enough contrast between heading levels

### Recommended Typography Scale

```css
H1: 3xl (1.875rem)   - Hero/page titles
H2: 3xl-4xl (1.875rem - 2.25rem) - Main section headers ⬆️ INCREASE
H3: 2xl (1.5rem)     - Subsection headers ⬆️ INCREASE
H4: xl (1.25rem)     - Card/feature titles
H5: lg (1.125rem)    - Minor headings
H6: base (1rem)      - Smallest headings

Body: base (1rem)    - Paragraph text
Line-height: 1.3-1.4 - Headings (improve from 1.2)
Line-height: 1.8     - Body text (current is good)
```

### Typography Implementation

**Current app.css values:**
```css
h2 {
  font-weight: 700;
  font-size: var(--wp--preset--font-size--xl);    /* 1.25rem - TOO SMALL */
  line-height: 1.2;                                 /* TOO TIGHT */
}

h3 {
  font-weight: 600;
  font-size: var(--wp--preset--font-size--lg);    /* 1.125rem - TOO SMALL */
  line-height: 1.3;
}
```

**Recommended changes:**
```css
h2 {
  font-weight: 700;
  font-size: var(--wp--preset--font-size--3xl);   /* 1.875rem or 4xl: 2.25rem */
  line-height: 1.3;                                 /* More breathing room */
}

h3 {
  font-weight: 600;
  font-size: var(--wp--preset--font-size--2xl);   /* 1.5rem */
  line-height: 1.4;
}
```

### Font Weights for Emphasis

Use font weights strategically from the Tailwind config:

- **800-900 (extrabold/black)**: H1, major CTAs, hero text
- **700 (bold)**: H2, important statistics
- **600 (semibold)**: H3, button text, labels
- **500 (medium)**: H4, emphasized body text
- **400 (normal)**: Body paragraphs, lists

---

## Color System & Contrast

### Available Theme Colors

From `theme.json` and `tailwind.config.js`:

```
Primary Colors:
- primary:        #017cb6  (Brand Blue)
- primary-accent: #e6f4fb  (Light Blue - backgrounds)
- primary-dark:   #026492  (Dark Blue - CTAs)

Neutral Colors:
- main:           #171b23  (Near Black - dark sections)
- main-accent:    #465166  (Dark Gray - body text)
- base:           #ffffff  (White - base)
- secondary:      #98999a  (Light Gray - subtle text)
- tertiary:       #f5f5f6  (Very Light Gray - backgrounds)

Borders:
- border-light:   #ebeced
- border-dark:    #cbcbcb
```

### Color Contrast Issues

**Problem:** Too much white/light gray without enough visual breaks

**Current paragraph color** (`secondary: #98999a`) is too light against white backgrounds, reducing readability.

**Recommended text colors:**
- **Headings**: `main` (#171b23) - dark, strong contrast
- **Body text**: `main-accent` (#465166) - better readability than `secondary`
- **Subtle text**: `secondary` (#98999a) - only for captions, meta info
- **Links**: `primary` (#017cb6) with `primary-dark` on hover

### Background Color Strategy

Create visual rhythm by alternating section backgrounds:

```
Section 1: White (base)
Section 2: Light Blue (primary-accent: #e6f4fb)
Section 3: White (base)
Section 4: Dark Blue (primary-dark: #026492) with white text
Section 5: Near Black (main: #171b23) with white text
```

**Example WordPress block markup:**
```html
<!-- Light section -->
<div class="wp-block-group has-base-background-color">
  <h2 class="has-main-color">Section Title</h2>
  <p class="has-main-accent-color">Body text with good contrast</p>
</div>

<!-- Accent section -->
<div class="wp-block-group has-primary-accent-background-color">
  <h2 class="has-main-color">Section Title</h2>
  <p class="has-main-accent-color">Body text</p>
</div>

<!-- Dark section -->
<div class="wp-block-group has-primary-dark-background-color">
  <h2 class="has-base-color">Section Title</h2>
  <p class="has-base-color">White text on dark background</p>
</div>
```

---

## Spacing & Rhythm

### Vertical Spacing Issues

Pages built with native blocks often lack consistent vertical rhythm and breathing room.

### Recommended Spacing Scale

**Between major sections:**
- Desktop: `padding-top: 4rem-6rem; padding-bottom: 4rem-6rem;`
- Mobile: `padding-top: 3rem-4rem; padding-bottom: 3rem-4rem;`

**Between heading and body:**
- `margin-bottom: 2rem` on section headings
- `margin-bottom: 1.5rem` on subsection headings

**Between content blocks:**
- Use WordPress Spacer blocks: `3rem-4rem` between distinct content areas
- `2rem` between related content (like list items and next paragraph)

**Within cards/features:**
- `padding: 2rem` (mobile) to `3rem` (desktop) for card interiors
- `gap: 2rem` between columns

### WordPress Block Spacing

Use the block editor's spacing controls:

```
Group/Section blocks:
- Padding Top: 4rem (64px)
- Padding Bottom: 4rem (64px)
- Padding Left/Right: Handled by alignfull/constrained

Heading blocks:
- Margin Bottom: 2rem (32px) for H2
- Margin Bottom: 1.5rem (24px) for H3

Spacer blocks:
- Use 3rem-4rem between major sections
- Use 2rem between related content
```

---

## Visual Hierarchy Best Practices

### Section Structure Template

Every major section should follow this hierarchy:

```
1. Background color (alternating pattern)
2. Generous padding (4rem-6rem top/bottom)
3. Section heading (H2, 3xl-4xl size, main color)
4. Optional subheading/intro (larger paragraph, 1.5rem spacing below)
5. Content (cards, columns, lists)
6. Optional CTA button
```

### Card/Feature Design

For feature cards and content boxes:

```html
<div class="wp-block-group has-base-background-color"
     style="border-radius:12px; padding:2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
  <h3 class="has-primary-color">Feature Title</h3>
  <p class="has-main-accent-color">Description text with good contrast</p>
</div>
```

**Design elements:**
- Border radius: `8px-12px` for modern feel
- Box shadow: `0 2px 8px rgba(0,0,0,0.08)` for subtle depth
- Hover effects: `transform: translateY(-5px)` with shadow increase
- Icon colors: Use `primary` blue for brand consistency

### List Styling

**Plain lists are visually weak.** Enhance with:

- **Checkmark icons** before list items (use SVG or Unicode ✓)
- **Color the icons** with `primary` blue
- **Larger line height** (1.8-2.0) for scanning
- **Card backgrounds** for grouped lists

```html
<ul class="wp-block-list">
  <li>✓ Feature one</li>
  <li>✓ Feature two</li>
</ul>
```

Or add custom CSS for styled checkmarks:
```css
.feature-list li::before {
  content: "✓";
  color: var(--color-primary);
  font-weight: bold;
  margin-right: 0.5rem;
}
```

---

## Component-Specific Guidelines

### Testimonials / Success Stories

**Visual hierarchy:**
1. Section background: `primary-accent` light blue
2. Quote cards: White background with `border-radius: 12px`
3. Box shadow: `0 4px 12px rgba(0,0,0,0.06)`
4. Quote text: Italic, `main-accent` color, 1.125rem (lg)
5. Author name: Bold, `primary` blue, 1rem
6. Company info: `secondary` gray, 0.875rem (sm)
7. Results/metrics: Bold, `primary-dark` or green color

**Example structure:**
```html
<div class="wp-block-group has-primary-accent-background-color"
     style="padding-top:4rem;padding-bottom:4rem">
  <h2 class="has-text-align-center has-main-color">Client Success Stories</h2>

  <div class="wp-block-columns" style="margin-top:3rem">
    <div class="wp-block-column">
      <div class="wp-block-group has-base-background-color"
           style="border-radius:12px;padding:2rem;box-shadow:0 4px 12px rgba(0,0,0,0.06)">
        <p style="font-style:italic;font-size:1.125rem" class="has-main-accent-color">
          "Quote text here"
        </p>
        <p style="font-weight:600" class="has-primary-color">Author Name</p>
        <p class="has-secondary-color">Company Info</p>
        <p style="font-weight:600" class="has-primary-dark-color">
          Results: Metric here
        </p>
      </div>
    </div>
  </div>
</div>
```

### Statistics Section

**Make numbers the hero:**

```html
<div class="wp-block-group has-main-background-color"
     style="padding-top:5rem;padding-bottom:5rem">

  <div class="wp-block-columns">
    <div class="wp-block-column has-text-align-center">
      <p style="font-size:4.5rem;font-weight:800;line-height:1"
         class="has-primary-color">850+</p>
      <p class="has-base-color" style="margin-top:1rem">Sites Maintained</p>
      <p class="has-secondary-color" style="font-size:0.875rem">
        Trusted across US & Europe
      </p>
    </div>
  </div>
</div>
```

**Key principles:**
- Numbers: **5xl-7xl** (3rem - 4.5rem), bold (700-800 weight)
- Numbers color: `primary` or white (on dark backgrounds)
- Label text: 1rem-1.25rem, white or `main-accent`
- Subtext: 0.875rem (sm), `secondary` or muted white

### Pricing Tables

**Already styled in app.css** but ensure:

- Badge visibility: Bright background (`primary-accent`), bold text
- Card hover effects: `transform: translateY(-5px)` with shadow
- Price emphasis: Large (2xl-3xl), bold, `primary` or `main` color
- Feature lists: Checkmarks, good spacing, clear hierarchy
- CTA buttons: High contrast, clear hover states

### FAQ / Accordion Sections

**Ensure readability:**

- Question headings: H3 (2xl), semibold (600), `main` color
- Answer text: 1rem-1.125rem, `main-accent` color
- Spacing: 1.5rem-2rem between FAQ items
- Dividers: `border-light` color for separation
- Background: Alternate white and `tertiary` light gray

---

## Page Audit Checklist

Use this checklist when reviewing pages:

### Typography ✓
- [ ] H2 headings are 3xl-4xl (not xl)
- [ ] H3 headings are 2xl (not lg)
- [ ] Heading line-height is 1.3-1.4
- [ ] Body text uses `main-accent` color (not `secondary`)
- [ ] Clear size differentiation between heading levels

### Color & Contrast ✓
- [ ] Alternating section backgrounds (white → accent → white → dark)
- [ ] Text has sufficient contrast against backgrounds
- [ ] Brand blue (`primary`) used consistently for CTAs and highlights
- [ ] Dark sections use white or light text
- [ ] Links use `primary` color with `primary-dark` hover

### Spacing ✓
- [ ] Major sections have 4rem-6rem top/bottom padding
- [ ] 2rem margin below section headings
- [ ] 3rem-4rem spacers between distinct content areas
- [ ] Cards/features have 2rem-3rem internal padding
- [ ] No cramped text blocks

### Visual Elements ✓
- [ ] Cards have border-radius (8px-12px)
- [ ] Subtle shadows on elevated elements
- [ ] Hover effects on interactive elements
- [ ] Icons/visuals use brand colors
- [ ] Lists use checkmarks or styling (not plain bullets)

### Content Hierarchy ✓
- [ ] Clear page flow: intro → features → social proof → CTA
- [ ] One clear primary CTA per section
- [ ] Statistics are large and prominent
- [ ] Testimonials have author attribution and metrics
- [ ] Each section has a clear purpose

---

## Maintenance Page Specific Recommendations

### Hero Section Improvements

**Current:** "we keep your website secure, fast, and up-to-date"

**Recommended options:**
- "Sleep Better. Your WordPress Site is Protected 24/7"
- "Enterprise-Grade WordPress Maintenance for Growing Businesses"
- "Never Worry About WordPress Updates, Security, or Backups Again"

**Style:**
- Font size: 3xl-4xl (1.875rem - 2.25rem)
- Font weight: 700-800
- Color: `main` on light background or white on dark
- Line height: 1.2-1.3

### "Why SMEs Need" Section

**Content improvements:**
- Security Threats → "Hackers Target WordPress. We Stop Them."
- Technical Complexity → "We Handle the Tech. You Focus on Business."
- Time Investment → "Save 4+ Hours Every Month"
- Costly Downtime → "99.9% Uptime Guaranteed"

**Style improvements:**
- H4 headings → Use H3 styling (2xl, semibold)
- Add icons above each heading (shield, gear, clock, chart)
- Card backgrounds: White with subtle shadow
- On hover: Lift effect with increased shadow

### "Complete Coverage" Lists

**Transform plain lists into visual features:**

```html
<div class="wp-block-columns" style="margin-top:2rem">
  <div class="wp-block-column">
    <div class="wp-block-group has-tertiary-background-color"
         style="border-radius:12px;padding:2rem">
      <h4 class="has-primary-color" style="font-size:1.5rem">
        🛡️ Security & Protection
      </h4>
      <ul style="margin-top:1rem;line-height:2">
        <li class="has-main-accent-color">✓ Real-time malware scanning</li>
        <li class="has-main-accent-color">✓ Security plugin management</li>
        <!-- etc -->
      </ul>
    </div>
  </div>
</div>
```

### Success Stories Enhancement

**Add specific metrics:**
- "Blocked 127 malware attempts in 2024"
- "Page load time: 4.2s → 1.8s (57% improvement)"
- "Prevented $15K in potential downtime losses"

**Visual treatment:**
- Quote cards with `primary-accent` background
- Larger quote text (1.25rem, italic)
- Author name in bold `primary` color
- Metrics in bold `primary-dark` or green

### Statistics Section Redesign

**Make numbers huge:**
```html
<p style="font-size:6rem;font-weight:800;line-height:1"
   class="has-primary-color">850+</p>
<p style="font-size:1.5rem;font-weight:700;margin-top:1rem"
   class="has-main-color">Sites Maintained</p>
<p style="font-size:1rem;color:#98999a">Trusted by SMEs across US & Europe</p>
```

**Enhanced statistics:**
- 200+ Sites → **850+ Sites** (if accurate)
- 99.9% Uptime → **99.97% Actual Uptime**
- 0 Breaches → **Zero Breaches Since 2009**
- 2-Hour Response → **< 2 Hour Average Response**

---

## Quick Implementation Wins

Easiest high-impact changes to make first:

1. **Typography**: Change H2 from xl to 3xl in WordPress editor
2. **Text color**: Update paragraphs from `secondary` to `main-accent`
3. **Backgrounds**: Add `primary-accent` background to every other section
4. **Padding**: Increase section padding from 2rem to 4rem
5. **Headings spacing**: Add 2rem margin-bottom to all H2 elements
6. **Card styling**: Add border-radius and box-shadow to feature cards
7. **List icons**: Add checkmarks to feature lists
8. **Statistics**: Increase number size from 2xl to 5xl-6xl

---

## Resources

**Theme files:**
- Colors: `site/web/app/themes/nynaeve/theme.json` (lines 58-69)
- Typography: `site/web/app/themes/nynaeve/resources/css/app.css` (lines 96-150)
- Tailwind config: `site/web/app/themes/nynaeve/tailwind.config.js`

**WordPress editor:**
- Font sizes available: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl
- Color palette: Primary, Primary Accent, Primary Dark, Main, Main Accent, Base, Secondary, Tertiary, Border Light, Border Dark

**External references:**
- [WordPress Block Editor Spacing](https://wordpress.org/documentation/article/styles-overview/)
- [Tailwind CSS Typography Scale](https://tailwindcss.com/docs/font-size)
- [Material Design Elevation](https://material.io/design/environment/elevation.html) - for shadow inspiration

---

## Implementation Phases

This section documents the phased approach to implementing the style guide recommendations on the maintenance page and across the theme.

### Phase 1: Navigation & Typography Fixes (COMPLETED)

**Objective:** Fix navigation color issues and improve global typography hierarchy for better readability.

#### Navigation Template Fix

**Problem:** Navigation was using `text-secondary` (light gray #98999a) which had poor contrast on dark backgrounds. Additionally, Tailwind's `@layer base` was setting all anchor tags to `color: inherit`, overriding class-based colors.

**Solution:**
1. **Updated navigation template** (`resources/views/components/navigation.blade.php`):
   - Changed `text-secondary hover:text-white` → `text-white` (line 35)
   - Changed submenu `text-sm text-secondary` → `text-sm text-white` (line 57)

2. **Added CSS override** (`resources/css/app.css`):
   ```css
   /* Navigation links - override Tailwind base layer */
   #menu a {
     color: #ffffff;
     text-decoration: none;
   }
   ```

**Why both changes were needed:**
- Template change: Sets white color via Tailwind classes
- CSS override: Ensures anchor tags don't inherit from Tailwind's base layer
- Using `#menu` selector provides specificity without `!important`

**Removed redundant CSS:**
```css
/* REMOVED - No longer needed */
nav a, .navigation a, header a, footer a, .menu a, .wp-block-navigation a {
  color: inherit !important;
  text-decoration: inherit !important;
}

#logo a.brand {
  color: #ffffff !important;
  text-decoration: none !important;
}
```

**Result:**
- ✅ Navigation text is crisp white with excellent contrast
- ✅ No `!important` declarations needed
- ✅ Cleaner, more maintainable code

#### Typography Improvements

**Problem:** Heading hierarchy was too flat with insufficient visual differentiation.

**Changes made:**

1. **H2 headings** (`app.css` line 104-110):
   - Font size: `xl (1.25rem)` → `3xl (1.875rem)` (50% increase)
   - Line height: `1.2` → `1.3` (better readability)

2. **H3 headings** (`app.css` line 112-118):
   - Font size: `lg (1.125rem)` → `2xl (1.5rem)` (33% increase)
   - Line height: `1.3` → `1.4` (better readability)

3. **Paragraph & list text color** (`app.css` lines 145-165):
   - Changed from `secondary (#98999a)` → `main-accent (#465166)`
   - Improved contrast ratio for better readability

**Impact:**
- Section headings now have significantly stronger visual hierarchy
- Body text is more readable with improved color contrast
- Better spacing reduces visual cramping
- More professional, modern appearance across all pages

#### Files Modified
- `resources/views/components/navigation.blade.php` (2 lines)
- `resources/css/app.css` (typography: 6 lines, navigation: 4 lines, cleanup: removed 15 lines)

---

### Phase 2: Custom Blocks & Visual Enhancements

**Objective:** Replace native block groups with reusable custom Sage Native Blocks that implement Phase 2 styling. This creates sustainable, reusable components for all secondary pages.

**Strategy:**
- Build 2-3 new custom blocks using InnerBlocks approach (following existing patterns)
- Enhance existing 4 custom blocks with Phase 2 styling improvements
- Replace native WordPress group blocks with custom blocks
- Create reusable components for future secondary pages

#### Current Maintenance Page Analysis

**Existing Custom Blocks (4):**
1. **`imagewize/page-heading-blue`** - Hero section (already good)
2. **`imagewize/two-column-card`** - "Why SMEs Need" section
3. **`imagewize/pricing-tiers`** - Pricing comparison (3-column)
4. **`imagewize/multi-column-content`** - Statistics + CTAs

**Native Block Groups (2):**
1. **"Complete WordPress Maintenance Coverage"** - Feature lists (5 categories)
2. **"WordPress Maintenance Success Stories"** - Testimonials (3 cards)

#### 2.1 New Custom Blocks Needed

**Block 1: Feature List Grid (for "Complete Coverage")**

Replaces the native block group with 5 feature list categories.

**Purpose:** Reusable feature showcase block for secondary pages

**Structure (InnerBlocks template):**
```jsx
- Heading (H2) - Main section title
- Columns (2-col, stacks mobile)
  - Column 1:
    - Group (card 1):
      - Heading (H4) with icon
      - List (6 items with checkmarks)
    - Group (card 2):
      - Heading (H4) with icon
      - List (6 items with checkmarks)
    - Group (card 3):
      - Heading (H4) with icon
      - List (6 items with checkmarks)
  - Column 2:
    - Group (card 4):
      - Heading (H4) with icon
      - List (6 items with checkmarks)
    - Group (card 5):
      - Heading (H4) with icon
      - List (6 items with checkmarks)
```

**Phase 2 Styling:**
- Background: `tertiary` (#f5f5f6) or white
- Padding: 5rem top/bottom
- Cards: White with border-radius 12px, subtle shadow
- Checkmarks: SVG via CSS (like pricing-tiers block)
- Heading underlines: Decorative primary blue accent
- Hover: Card lift effect

**File structure:**
```
resources/js/blocks/feature-list-grid/
├── block.json
├── index.js
├── editor.jsx (InnerBlocks template)
├── save.jsx (<InnerBlocks.Content />)
├── style.css (Phase 2 card styling)
├── editor.css
└── view.js
```

**Block 2: Testimonial Grid (for "Success Stories")**

Replaces the native block group with 3 testimonial cards.

**Purpose:** Reusable testimonial showcase for secondary pages

**Structure (InnerBlocks template):**
```jsx
- Heading (H2) - "Client Success Stories"
- Columns (3-col, stacks mobile)
  - Column (testimonial card 1):
    - Paragraph (quote, italic, lg)
    - Paragraph (author name, bold, primary color)
    - Paragraph (company, sm, secondary color)
    - Paragraph (results/metrics, bold, primary-dark)
  - Column (testimonial card 2): [same]
  - Column (testimonial card 3): [same]
```

**Phase 2 Styling:**
- Section background: `primary-accent` (#e6f4fb)
- Padding: 4rem top/bottom
- Cards: White, border-radius 12px, shadow
- Hover: translateY(-3px) with increased shadow
- Quote: Italic, 1.125rem (lg), main-accent color
- Author: Bold, primary blue
- Metrics: Bold, primary-dark color

**File structure:**
```
resources/js/blocks/testimonial-grid/
├── block.json
├── index.js
├── editor.jsx (InnerBlocks template)
├── save.jsx (<InnerBlocks.Content />)
├── style.css (Phase 2 card styling with hover)
├── editor.css
└── view.js
```

**Block 3 (Optional): Statistics Hero**

Enhanced statistics block with dark background variant (alternative to modifying multi-column-content).

**Purpose:** Dramatic statistics showcase for secondary pages

**Structure (InnerBlocks template):**
```jsx
- Heading (H2) - Optional section title
- Columns (4-col, stacks 2x2 on tablet, single on mobile)
  - Column (stat 1):
    - Paragraph (number, 7xl, extrabold, primary or white)
    - Paragraph (label, 2xl, semibold, white)
    - Paragraph (subtext, sm, secondary)
  - Column (stat 2-4): [same structure]
```

**Phase 2 Styling:**
- Background: `main` (#171b23) DARK
- Padding: 6rem top/bottom
- Numbers: 6xl-7xl size, weight 800, primary blue or white
- Labels: 2xl, weight 600, white
- Subtext: sm, secondary gray
- High contrast, bold typography

**Decision:** Either create this OR enhance multi-column-content block with background options.

#### 2.2 Enhancements to Existing Blocks

**`imagewize/page-heading-blue`** - Already excellent, keep as-is ✓

**`imagewize/two-column-card`** - Minor styling tweaks

**Current:** Good structure, needs Phase 2 polish

**Enhancements:**
- Increase section padding: 4rem → 5rem top/bottom
- Add hover effect to cards (translateY + shadow)
- Ensure heading underline is primary blue
- Update default content with Phase 2 punchy headings

**CSS changes (style.css):**
```css
/* Add hover effect */
.two-column-card__card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.two-column-card__card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
```

**Template changes (editor.jsx):**
- Update heading content with punchier alternatives from Phase 2
- Increase padding in block wrapper

**`imagewize/pricing-tiers`** - Already has Phase 2 styling ✓

**Current:** Already implements checkmarks, shadows, hover effects

**Minor enhancements:**
- Verify padding is 5rem top/bottom
- Ensure featured tier background is `primary-accent` (#e6f4fb)

**`imagewize/multi-column-content`** - Needs dark variant option

**Current:** Statistics + CTAs with white/bordered cards

**Enhancement Options:**

**Option A (Simpler):** Add CSS class variant for dark background
```css
/* Add to style.css */
.multi-column-content.is-style-dark {
  background-color: var(--wp--preset--color--main);
  padding-top: 6rem;
  padding-bottom: 6rem;
}

.multi-column-content.is-style-dark .multi-column-content__main-heading {
  color: var(--wp--preset--color--base);
}

/* Enlarge statistic numbers */
.multi-column-content__statistics .wp-block-heading {
  font-size: var(--wp--preset--font-size--7-xl);
  font-weight: 800;
  line-height: 1;
  color: var(--wp--preset--color--primary);
}
```

**Option B (Better):** Create separate `imagewize/statistics-hero` block with dark styling baked in

**Recommendation:** Option A for speed, Option B for long-term reusability

#### 2.3 Implementation Roadmap

**Phase 2A: Create New Custom Blocks** (3-4 hours)

1. **Create `imagewize/feature-list-grid` block** (1.5 hours)
   ```bash
   cd trellis
   trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:create
   # Select "Generic Templates" or "Custom Templates"
   # Or manually create following two-column-card pattern
   ```
   - Build InnerBlocks template with 2 columns, 5 feature cards
   - Add CSS for checkmarks (SVG like pricing-tiers)
   - Add hover effects to cards
   - Include real content from maintenance page

2. **Create `imagewize/testimonial-grid` block** (1.5 hours)
   - Build InnerBlocks template with 3 columns
   - Add CSS for card shadows and hover
   - Style quote/author/metrics typography
   - Include real testimonials from maintenance page

3. **Optional: Create `imagewize/statistics-hero` block** (1 hour)
   - 4-column layout with huge numbers
   - Dark background variant baked in
   - 7xl numbers, white/primary blue colors
   - OR skip and use Option A for multi-column-content

**Phase 2B: Enhance Existing Blocks** (1-2 hours)

4. **Enhance `imagewize/two-column-card`** (30 mins)
   - Add hover effects to CSS
   - Update default content with punchy headings
   - Increase padding

5. **Enhance `imagewize/multi-column-content`** (30 mins)
   - Add dark variant CSS (Option A)
   - OR skip if creating statistics-hero block

6. **Verify `imagewize/pricing-tiers`** (15 mins)
   - Check padding is 5rem
   - Verify all Phase 2 styles present

**Phase 2C: Replace Native Blocks on Maintenance Page** (30 mins)

7. **Replace "Complete Coverage" section**
   - Remove native Group blocks
   - Insert `imagewize/feature-list-grid` block
   - Verify content migrated correctly

8. **Replace "Success Stories" section**
   - Remove native Group blocks
   - Insert `imagewize/testimonial-grid` block
   - Verify testimonials migrated correctly

9. **Update Statistics section** (if using dark variant)
   - Apply dark style to multi-column-content block
   - OR replace with statistics-hero block
   - Enlarge numbers to 7xl
   - Update content with Phase 2 improvements

**Total Time: 4.5-6 hours**

#### 2.4 Checkmark SVG Implementation (Reusable Pattern)

Reference implementation from `imagewize/pricing-tiers` block:

**CSS for SVG checkmarks (style.css):**
```css
/* Feature list checkmarks - SVG approach */
.feature-list-grid__list {
  list-style: none;
  padding-left: 0;
}

.feature-list-grid__list li {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1.8;
}

.feature-list-grid__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.35rem;
  width: 1.25rem;
  height: 1.25rem;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23017cb6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>');
  background-size: contain;
  background-repeat: no-repeat;
}
```

**Why SVG over Unicode:**
- Consistent rendering across browsers/fonts
- Precise color control (primary blue #017cb6)
- Scalable and crisp on all screens
- Follows existing pricing-tiers pattern

**Apply to:**
- `imagewize/feature-list-grid` block (new)
- Keep existing implementation in `imagewize/pricing-tiers` block

#### 2.5 Visual Design Reference

**Alternating Section Backgrounds Pattern:**

| Section | Block | Background | Padding |
|---------|-------|------------|---------|
| Hero | `imagewize/page-heading-blue` | Blue gradient | Built-in |
| Intro | Native Group | `primary-accent` (#e6f4fb) | 4rem |
| Why SMEs Need | `imagewize/two-column-card` | White / `tertiary` | 5rem |
| Complete Coverage | `imagewize/feature-list-grid` | White / `tertiary` | 5rem |
| Pricing | `imagewize/pricing-tiers` | White | 5rem |
| Success Stories | `imagewize/testimonial-grid` | `primary-accent` (#e6f4fb) | 4rem |
| Statistics | `imagewize/multi-column-content` (dark) or `imagewize/statistics-hero` | `main` (#171b23) **DARK** | 6rem |
| Final CTA | Native Group | `primary-dark` (#026492) **DARK** | 5rem |

**Visual rhythm pattern:**
```
Blue Gradient → Light Blue → White → White → White → Light Blue → Dark → Dark Blue
```

**Consistent Design Elements Across Blocks:**

- **Card hover effects:** `translateY(-3px)` + shadow increase
- **Border radius:** 12px (0.75rem) for all cards
- **Box shadow:** `0 4px 12px rgba(0, 0, 0, 0.06)` default
- **Box shadow (hover):** `0 8px 20px rgba(0, 0, 0, 0.1)`
- **Checkmarks:** SVG with primary blue #017cb6
- **Card padding:** 2.5rem - 3rem internal
- **Section padding:** 4-6rem top/bottom
- **Typography:** Montserrat headings, Open Sans body

#### 2.6 Content Updates

**Hero Tagline:**

| Current | Recommended |
|---------|-------------|
| "we keep your website secure, fast, and up-to-date" | "Never Worry About WordPress Security, Updates, or Backups Again" |

**Why:**
- Proper capitalization
- Direct benefit-focused
- Addresses specific pain points
- Action-oriented language

**Statistics Content:**

| Current | Updated | Reasoning |
|---------|---------|-----------|
| 200+ Sites Maintained | **850+ Sites Maintained** | Bigger number = more social proof (if accurate) |
| 99.9% Average Uptime | **99.97% Actual Uptime** | More specific = more credible |
| 0 Major Security Breaches | **Zero Breaches in 15+ Years** | Emphasizes impressive timeline |
| 2-Hour Average Response | **< 2 Hour Average Response** | "Under 2 hours" feels faster |

**"Why SMEs Need" Section Headings:**

| Current | Punchy Alternative |
|---------|-------------------|
| Security Threats | Hackers Target WordPress. We Stop Them. |
| Technical Complexity | We Handle the Tech. You Focus on Business. |
| Time Investment | Save 4+ Hours Every Month |
| Costly Downtime | 99.9% Uptime Guaranteed |

#### Phase 2 Summary

**Approach:** Custom Sage Native Blocks using InnerBlocks pattern

**Time estimate:** 4.5-6 hours total

**New blocks created:** 2-3
1. `imagewize/feature-list-grid` - Feature showcase with checkmarks
2. `imagewize/testimonial-grid` - Professional testimonial cards
3. `imagewize/statistics-hero` (optional) - Dramatic stats with dark background

**Existing blocks enhanced:** 3-4
1. `imagewize/two-column-card` - Add hover effects, update content
2. `imagewize/multi-column-content` - Dark variant CSS (or skip if creating statistics-hero)
3. `imagewize/pricing-tiers` - Verification only
4. `imagewize/page-heading-blue` - Keep as-is ✓

**Benefits of custom blocks approach:**
- **Reusable** - Use on other secondary pages (About, Services, etc.)
- **Maintainable** - Update block CSS affects all instances
- **Consistent** - Phase 2 styling baked into blocks
- **Flexible** - Users can still edit content via WordPress editor
- **Professional** - Hover effects, shadows, typography all built-in

**Expected outcome:**
- Dramatically improved visual appeal with reusable components
- Professional, modern aesthetic across all secondary pages
- Better content hierarchy baked into blocks
- Increased trust and credibility
- Higher conversion potential
- Sustainable codebase for long-term maintenance

---

## Implementation Checklist - Phase 2

Use this when implementing Phase 2 with custom blocks:

### Phase 2A: Create New Custom Blocks ✓

**`imagewize/feature-list-grid` Block:**
- [ ] Created block using `wp acorn sage-native-block:create`
- [ ] Built InnerBlocks template with 2 columns, 5 feature cards
- [ ] Added checkmark SVG CSS (following pricing-tiers pattern)
- [ ] Added card hover effects (translateY + shadow)
- [ ] Added heading underline decoration (primary blue)
- [ ] Included real maintenance page content in template
- [ ] Tested in WordPress editor
- [ ] Verified mobile responsiveness (stacks to single column)

**`imagewize/testimonial-grid` Block:**
- [ ] Created block using `wp acorn sage-native-block:create`
- [ ] Built InnerBlocks template with 3 columns
- [ ] Added CSS for card shadows and hover effects
- [ ] Styled quote typography (italic, lg, main-accent)
- [ ] Styled author name (bold, primary blue)
- [ ] Styled company info (sm, secondary)
- [ ] Styled metrics/results (bold, primary-dark)
- [ ] Included real testimonials in template
- [ ] Tested in WordPress editor
- [ ] Verified mobile responsiveness

**`imagewize/statistics-hero` Block (Optional):**
- [ ] Created block OR decided to use multi-column-content dark variant
- [ ] Built 4-column layout with huge numbers
- [ ] Added dark background (#171b23) styling
- [ ] Sized numbers to 7xl, weight 800
- [ ] Colored numbers primary blue or white
- [ ] Added padding 6rem top/bottom
- [ ] Tested in WordPress editor

### Phase 2B: Enhance Existing Blocks ✓

**`imagewize/two-column-card` Enhancements:**
- [ ] Added hover effect CSS (translateY + shadow)
- [ ] Updated default content with Phase 2 punchy headings
- [ ] Increased section padding to 5rem
- [ ] Verified heading underline is primary blue
- [ ] Tested changes in WordPress editor

**`imagewize/multi-column-content` Enhancements:**
- [ ] Added dark variant CSS (if not creating statistics-hero)
- [ ] Increased statistic number sizes to 7xl
- [ ] Added padding 6rem for dark variant
- [ ] Tested dark variant in WordPress editor

**`imagewize/pricing-tiers` Verification:**
- [ ] Verified padding is 5rem top/bottom
- [ ] Confirmed featured tier background is `primary-accent`
- [ ] Confirmed checkmarks are displaying correctly
- [ ] Confirmed hover effects are working

### Phase 2C: Update Maintenance Page ✓

**Replace Native Blocks:**
- [ ] Removed "Complete Coverage" native Group blocks
- [ ] Inserted `imagewize/feature-list-grid` block
- [ ] Migrated all 5 feature categories with content
- [ ] Verified checkmarks display correctly
- [ ] Removed "Success Stories" native Group blocks
- [ ] Inserted `imagewize/testimonial-grid` block
- [ ] Migrated all 3 testimonials with content
- [ ] Verified card styling and hover effects

**Update Statistics Section:**
- [ ] Applied dark style to multi-column-content OR replaced with statistics-hero
- [ ] Enlarged numbers to 7xl
- [ ] Updated content with Phase 2 statistics (850+ sites, 99.97% uptime, etc.)
- [ ] Verified contrast on dark background

**Content Updates:**
- [ ] Updated hero tagline (if desired)
- [ ] Updated "Why SMEs Need" headings with punchier alternatives (optional)
- [ ] Updated statistics numbers and labels
- [ ] Verified all content is accurate

**Final Verification:**
- [ ] Tested all blocks on mobile (≤782px)
- [ ] Tested all hover effects
- [ ] Verified alternating background rhythm
- [ ] Checked section padding consistency
- [ ] Ran `npm run build` for production assets
- [ ] Tested on staging environment
- [ ] Published to production
