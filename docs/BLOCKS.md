# Custom Blocks Library

Nynaeve includes **17 professionally designed custom blocks** for building modern websites. All blocks are built with WordPress native InnerBlocks for maximum flexibility and user control.

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
3. **Find Imagewize Blocks**: All custom blocks appear in the **"Imagewize"** category
4. **Insert Block**: Click to add block to your page
5. **Customize**: Use native WordPress block toolbar and settings panel to style

**Block Category:**
All Nynaeve custom blocks are organized under the **"Imagewize"** category in the block inserter for easy discovery. You can also search by block name (e.g., "Feature List Grid", "Testimonial Grid").

**Customization Options:**
- **Toolbar** (top): Alignment, text formatting, block-specific options
- **Settings Panel** (right sidebar): Colors, spacing, typography, advanced options
- All blocks are fully customizable without code changes

## Hero & Banner Blocks

### About

About section with image and content layout. Professional presentation for company information and team introductions.

**Features:**
- Two-column layout with image and content
- Flexible content area with headings and text
- Responsive design with mobile stacking
- Customizable alignment options
- All typography editable via block toolbar

**Usage Example:**

1. Insert `Imagewize About` block
2. Add image via WordPress native image block
3. Edit heading and paragraph content
4. Customize fonts, sizes, and colors via block toolbar
5. Columns automatically stack on mobile (≤782px)

**Best For:** About pages, team introductions, company overview sections

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

### Feature List Grid

Comprehensive feature showcase in a 2-column grid layout with checkmark icons. Perfect for presenting service offerings, maintenance plans, or product features.

**Features:**
- Main section heading (H2) above responsive 2-column grid
- 5 feature cards with headings and checkmark lists (3 left, 2 right)
- Professional card design with subtle borders
- Checkmark SVG icons for all feature list items (no bullets)
- Decorative blue underline on card headings
- Template includes real maintenance service content
- Responsive: stacks to single column on mobile (≤768px)
- All typography editable via block toolbar

**Usage Example:**

1. Insert `Imagewize Feature List Grid` block
2. Block defaults to wide alignment (880px content width)
3. Template includes 5 pre-populated feature cards:
   - Security & Protection
   - Updates & Maintenance
   - Backups & Recovery
   - Performance & Monitoring
   - Support & Reporting
4. Edit headings and feature lists directly in editor
5. Customize fonts, sizes, and colors via block toolbar
6. Checkmarks automatically appear on all list items (no bullets)
7. Mobile: columns stack to single column

**Best For:** Service features, maintenance plans, product benefits, feature comparisons

### Review Profiles

Customer review profiles grid with photos, testimonials, and ratings. Professional display of customer feedback with visual impact.

**Features:**
- Multi-column profile grid layout
- Profile photos with testimonial quotes
- Star ratings or metrics display
- Professional card design
- Responsive grid stacking
- All typography editable via block toolbar

**Usage Example:**

1. Insert `Imagewize Review Profiles` block
2. Add profile photos via WordPress image blocks
3. Edit customer names, companies, and testimonial text
4. Customize fonts, sizes, and colors via block toolbar
5. Grid automatically adjusts for mobile devices

**Best For:** Customer reviews, testimonials with photos, social proof sections, case studies

### Testimonial Grid

Customer testimonials in a professional 3-column grid with metrics and quotes. Showcase social proof and success stories.

**Features:**
- Main section heading (H2) above 3-column grid
- Professional testimonial cards with quotes, attribution, and metrics
- Light blue background (primary-accent) for visual distinction
- Clean card design with rounded corners
- Metric display with border accent for emphasis
- Template includes 3 complete testimonials with real data
- Responsive: stacks to single column on mobile (≤782px)
- All typography editable via block toolbar

**Usage Example:**

1. Insert `Imagewize Testimonial Grid` block
2. Block defaults to wide alignment with light blue background
3. Template includes 3 pre-populated testimonials:
   - Security success (127 threats blocked)
   - Performance improvement (57% faster)
   - Downtime prevention ($15K saved)
4. Edit quotes, author names, companies, and metrics
5. Customize fonts, sizes, and colors via block toolbar
6. Metric text appears with top border accent
7. Mobile: columns stack, font sizes reduce

**Best For:** Customer testimonials, case studies, success stories, social proof sections

### CTA Columns

Call-to-action columns layout with multiple CTA options. Present multiple action items in a clean, organized grid.

**Features:**
- Multi-column layout for CTAs
- Heading, description, and button support
- Flexible spacing and alignment
- Responsive column stacking
- All typography editable via block toolbar

**Usage Example:**

1. Insert `Imagewize CTA Columns` block
2. Add headings and descriptions for each CTA
3. Configure button text and links
4. Customize fonts, sizes, and colors via block toolbar
5. Columns automatically stack on mobile

**Best For:** Landing pages, service offerings, product features, conversion-focused sections

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
- Alignment options (wide, full, none)
- Background and text color customization
- No code changes required for customization

### Color & Background Customization

Most Nynaeve blocks support color customization via the WordPress block settings panel:

**Background Color Support:**
- All section-level blocks support background color changes
- Choose from theme color palette or custom colors
- Perfect for creating visual variety across pages

**Text Color Support:**
- Newer blocks (Feature List Grid, Testimonial Grid, Content Image Text Card) support text color overrides
- Allows accessibility adjustments (contrast ratios)
- Provides flexibility for different background colors
- Note: Older blocks (Two Column Card, Multi-Column Content, Pricing blocks) have fixed text colors for brand consistency

**Accessing Color Controls:**
1. Select the block in the editor
2. Open the block settings panel (right sidebar)
3. Look for "Color" or "Background" sections
4. Choose from theme colors or set custom values

### Alignment Options

All container blocks support WordPress alignment controls:

**Wide Alignment (Default):**
- Content centered at 880px width (`contentSize` from theme.json)
- Recommended for most content blocks
- Proper reading width for text-heavy content

**Full Alignment:**
- Spans entire viewport width
- Perfect for hero sections, full-width images, testimonial backgrounds
- Use for visual impact sections

**None Alignment:**
- Uses default content width
- Matches WordPress core block behavior

**Changing Alignment:**
1. Select block in editor
2. Use alignment toolbar button (top toolbar)
3. Choose wide, full, or none

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
