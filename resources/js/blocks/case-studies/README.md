# Case Studies Grid Block

A custom WordPress block for displaying a responsive grid of case studies with featured highlighting.

## Features

- **Responsive 3-column grid** that collapses to single column on mobile
- **Featured card support** - spans 2 columns on desktop
- **Animated hover effects** with accent bars
- **Staggered fade-up animations** on page load
- **Custom styling** using theme.json colors and fonts
- **Nested block structure** for easy content management

## Usage

1. **Add the block** to your page or post
2. **Edit header text** (eyebrow, title, subtitle) in the block inspector
3. **Add/remove case studies** by clicking the "+" button in the grid
4. **Edit each case study** by clicking on it:
   - Number: Case study identifier (e.g., "01")
   - Tag: Category or location (e.g., "WordPress · Netherlands")
   - Title: Project title
   - Client: Client name and location
   - Description: Project description
   - Features: List of key features (add as paragraphs)
   - Link: URL and link text
   - Featured: Toggle to make this card span 2 columns

## Block Structure

```
Case Studies Grid
├── Header (eyebrow, title, subtitle)
└── Grid
    ├── Case Study Item 1 (featured)
    ├── Case Study Item 2
    ├── Case Study Item 3
    ├── Case Study Item 4
    └── Case Study Item 5
```

## Styling

The block uses the following theme.json presets:
- Colors: primary, primary-accent, primary-dark, main, main-accent, secondary, tertiary, border-light, border-dark, base
- Fonts: Montserrat (headings), Open Sans (body text)

## Responsive Behavior

- **Desktop (> 900px)**: 3-column grid with featured cards spanning 2 columns
- **Mobile (≤ 900px)**: Single column grid with all cards taking full width

## Animations

- Header fades up on load
- Each card fades up with staggered delays (0.1s increments)
- Hover effect: Accent bar animates from left to right
- Background color subtly changes on hover

## Example Content

The block comes with 5 pre-populated case studies:
1. Project Management Platform (featured)
2. Research Platform Development
3. WordPress to Shopify Migration
4. Healthcare Platform
5. WooCommerce Store

## Technical Details

- **Block Name**: `nynaeve/case-studies`
- **Category**: imagewize
- **API Version**: 3
- **Supports**: align (wide, full), spacing, color
- **Inner Block**: `nynaeve/case-study-item`

## Development

To modify this block:
1. Edit files in `resources/js/blocks/case-studies/`
2. Run `npm run build` to compile assets
3. Test in the WordPress editor

## Notes

- Featured cards should be placed first in the grid for optimal layout
- Links with `#` as href will not navigate (used for placeholder content)
- All colors and fonts are pulled from theme.json for consistency
