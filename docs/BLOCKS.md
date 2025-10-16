# Custom Blocks Library

Nynaeve includes **10 professionally designed custom blocks** for building modern websites. All blocks are built with WordPress native InnerBlocks for maximum flexibility and user control.

## Table of Contents

- [Using Custom Blocks](#using-custom-blocks)
- [Hero & Banner Blocks](#hero--banner-blocks)
- [Content & Layout Blocks](#content--layout-blocks)
- [Pricing & Comparison Blocks](#pricing--comparison-blocks)
- [Dynamic Content Blocks](#dynamic-content-blocks)
- [Block Features](#block-features)

## Using Custom Blocks

### Adding Blocks to Your Pages

1. **Open Block Editor**: Edit any page/post in WordPress
2. **Insert Block**: Click the "+" icon or type "/" to search
3. **Search "Imagewize"**: Find our custom blocks under the Imagewize namespace
4. **Customize**: Use native WordPress block toolbar to style

All blocks are fully customizable via the WordPress block editor toolbar and inspector panel. No code changes required.

## Hero & Banner Blocks

### Page Heading Blue

Full-width gradient banner for secondary page headings with professional styling.

**Features:**
- Professional blue gradient background (primary to primary-dark)
- Subtle radial pattern overlay
- Responsive tagline, heading, and intro text
- Full-width alignment with content constrained to 55rem
- All typography editable via block toolbar

**Usage Example:**

1. Insert `Imagewize Page Heading Blue` block
2. Block defaults to full-width alignment with gradient background
3. Edit tagline, heading, and intro text directly in the editor
4. Customize fonts, sizes, and colors via block toolbar
5. All content editable - tagline (Montserrat), H2 heading, intro paragraph
6. Responsive padding adapts automatically for mobile/tablet

**Best For:** Secondary page headers, service pages, about pages, landing pages

**Documentation:** [PAGE-HEADING-BLUE-BLOCK.md](PAGE-HEADING-BLUE-BLOCK.md)

## Content & Layout Blocks

### Multi-Column Content

Comprehensive statistics and CTA section with multiple layouts. Perfect for showcasing metrics, benefits, and calls-to-action.

**Features:**
- Main section heading for statistics overview
- Two-column statistics layout with taglines and stat headings
- Center heading for section transitions
- Two-column CTA section with headings, descriptions, and buttons
- Three-column benefits section with checkmark SVG icons
- Tint background with constrained content (1040px max-width)
- Template with default maintenance service content
- Responsive: multi-column desktop → single column mobile
- All typography editable via block toolbar

**Usage Example:**

1. Insert `Imagewize Multi-Column Content` block
2. Block defaults to wide alignment with tint background
3. Template includes 6 sections: main heading, statistics (2 cols), center heading, subheading, CTAs (2 cols), benefits (3 cols)
4. Edit all content directly - statistics, CTAs, buttons, benefits
5. Customize fonts, sizes, and colors via block toolbar
6. Benefits automatically display checkmark icons (theme SVG)
7. All columns stack to single column on mobile (≤782px)

**Best For:** Service pages, maintenance plans, feature showcases, product benefits

**Documentation:** [MULTI-COLUMN-CONTENT-BLOCK.md](MULTI-COLUMN-CONTENT-BLOCK.md)

### Two Column Card

Professional card grid layout with heading and text content. Elegant presentation for features, services, or benefits.

**Features:**
- Main section heading (H3) above responsive 2-column grid
- Uses WordPress native Columns block for intuitive layout
- Automatic mobile stacking at 782px breakpoint
- Elegant white cards with borders and decorative heading underlines
- Template includes 4 default cards with real content (2 per column)
- Tint background with constrained content (1040px max-width)
- All typography editable via block toolbar

**Usage Example:**

1. Insert `Imagewize Two Column Card` block
2. Block defaults to wide alignment with tint background
3. Main heading (H3) displays above the card grid
4. Default template includes 4 cards (2 per column) with real content
5. Edit headings, paragraphs, and styling via block toolbar
6. Add/remove/duplicate cards using WordPress block controls
7. Columns automatically stack to single column on mobile (≤782px)
8. All fonts, sizes, and colors editable - no code changes needed

**Best For:** Feature lists, service offerings, team highlights, testimonials

**Documentation:** [TWO-COLUMN-CARD.md](TWO-COLUMN-CARD.md)

### Content Image Text Card

Flexible content cards with images, headings, text, and buttons. Perfect for feature highlights and call-to-action sections.

**Features:**
- Image block integration (WordPress native)
- Heading and paragraph blocks (fully editable)
- Button block with customizable styles
- Responsive layout with flexible spacing
- Alignment controls via inspector panel

**Usage Example:**

1. Insert `Imagewize Content Image Text Card` block
2. Upload image via native WordPress image block
3. Edit heading, paragraph, and button text
4. Select button style from toolbar
5. Adjust spacing, colors, and alignment via inspector panel

**Best For:** Product features, service highlights, portfolio items, promotional content

### Carousel

Dynamic image carousel with configurable slides and settings. Showcase multiple images with smooth transitions.

**Features:**
- Multiple slide support via Slide block
- Configurable transition settings
- Responsive design
- Navigation controls
- Auto-play options

**Best For:** Image galleries, portfolio showcases, client logos, testimonials

### FAQ

Accordion-style FAQ sections for support content. Clean, accessible interface for questions and answers.

**Features:**
- Accordion-style interaction
- Expandable/collapsible sections
- Accessible keyboard navigation
- Semantic HTML structure
- Customizable styling

**Best For:** Support pages, documentation, help centers, product information

## Pricing & Comparison Blocks

### Pricing (2-Column)

Classic high-contrast pricing comparison with two side-by-side options.

**Features:**
- Two-column layout
- High-contrast design
- Clear pricing display
- Feature lists with checkmarks
- CTA buttons with customizable styles

**Best For:** Simple pricing comparison, basic/premium tiers, service packages

### Pricing Tiers (3-Column)

Professional pricing table with featured tier highlighting. Ideal for presenting multiple pricing options with a recommended plan.

**Features:**
- Three-column layout
- Subtle blue accent backgrounds
- Checkmark SVG icons for features
- Hover effects and elevation
- "Most Popular" badge styling
- Responsive: stacks to single column on mobile

**Usage Example:**

1. Insert `Imagewize Pricing Tiers` block
2. Default template includes three columns: Basic → Featured → Premium
3. Featured center column has subtle blue background (#e6f4fb)
4. Edit pricing, features, and buttons directly in the editor
5. Select button styles via block toolbar (Default, Outline, Secondary, Light, Dark)
6. All styling controlled by user - no code changes needed

**Best For:** Subscription plans, service tiers, product packages, membership levels

**Documentation:** [MULTI-COLUMN-PRICING-TABLE.md](MULTI-COLUMN-PRICING-TABLE.md)

## Dynamic Content Blocks

### Related Articles

Smart tag-based article recommendations. Automatically displays related content based on post tags.

**Features:**
- Automatic tag-based filtering
- Configurable number of posts
- Excerpt display
- Featured image support
- Customizable layout

**Best For:** Blog posts, news articles, resource pages

### Slide

Individual carousel slide component. Used within the Carousel block to create dynamic slideshows.

**Features:**
- Image support
- Caption/text overlay
- Link support
- Flexible content areas

**Best For:** Used within Carousel block (not standalone)

## Block Features

All Nynaeve custom blocks share these core features:

### InnerBlocks Architecture
- Built with native WordPress blocks (Image, Heading, Paragraph, Button)
- No hardcoded content or styles
- Full flexibility and extensibility

### User Control
- All styling via WordPress block toolbar
- Color, typography, and spacing controls
- No code changes required for customization

### Responsive Design
- Mobile-first approach
- Automatic responsive behavior
- Breakpoint: 782px (mobile/tablet)

### Accessibility
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader friendly

### Performance
- Minimal custom CSS (containers and hover effects only)
- Optimized for Core Web Vitals
- Fast loading times

## Block Development

Want to create your own custom blocks? See the [Developer Guide](DEV.md#block-development) and [Pattern to Native Block Guide](PATTERN-TO-NATIVE-BLOCK.md) for detailed instructions.
