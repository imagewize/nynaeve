# Content Width & Layout System

## Current Status (2025-10-21)

### ✅ Implementation Complete
We've successfully implemented the WordPress-native layout system based on Twenty Twenty-Five theme approach.

**What's Working:**
- ✅ Theme-based custom blocks (two-column-card, multi-column-content, cta-columns, etc.)
- ✅ Core WordPress blocks (paragraphs, headings, lists, images)
- ✅ Standalone content no longer touches viewport edges on mobile
- ✅ `.alignfull` and `.alignwide` blocks properly excluded from padding
- ✅ User-defined padding from block editor takes precedence

### ❌ Known Issues with Plugin-Based Blocks

**Problem Blocks (from composer.json):**
- `imagewize/about-block` - Partially working but text appears narrow
- `imagewize/services-block` - Content appears squashed/compressed
- `imagewize/cta-block` - Layout issues similar to services block
- `imagewize/reviews-block` - May have similar issues

**Root Cause:**
These plugin-based blocks were built **before** the WordPress-native layout system was implemented. They:
1. Don't have proper alignment support configured
2. May have hardcoded internal padding that conflicts with theme CSS
3. Were not designed with `:not(.alignfull):not(.alignwide)` exclusion in mind
4. Need to be migrated to theme as proper Sage Native Blocks

## The Original Problem (RESOLVED)

We removed Tailwind container classes from page templates around `the_content()` to let WordPress handle layout natively. This approach **should** work because:

- WordPress blocks use `is-layout-constrained` classes to self-manage layout
- Regular blocks should automatically center at `contentSize` (880px from theme.json)
- `.alignfull` blocks should automatically span full viewport width via WordPress core CSS

**Initial Issues (NOW FIXED):**

### Mobile Issue (FIXED ✅)
On mobile devices, standalone paragraphs, headings, and list items **touched the sides** with no padding. This created a poor reading experience.

**Solution:** Added `:where(.is-layout-constrained) > :not(.alignfull):not(.alignwide)` CSS rule with horizontal padding.

### Desktop Issue (FIXED ✅)
On desktop, content appeared to be **full width** automatically, rather than centering at the expected `contentSize` (880px).

**Solution:** WordPress core handles this automatically when using proper `.is-layout-constrained` wrapper.

## Root Cause Analysis

### Current theme.json Settings

```json
"layout": {
  "contentSize": "55rem",  // 880px
  "wideSize": "64rem"      // 1024px
}
```

### Current CSS Approach

In `app.css` (lines 684-698), we added padding to `.alignfull` blocks:

```css
.alignfull {
  padding-inline: var(--wp--preset--spacing--20, 1rem);
}

@media (min-width: 640px) {
  .alignfull {
    padding-inline: var(--wp--preset--spacing--40, 2rem);
  }
}

@media (min-width: 1024px) {
  .alignfull {
    padding-inline: var(--wp--preset--spacing--50, 3rem);
  }
}
```

**Problem**: This only fixes `.alignfull` blocks. Regular blocks without alignment (paragraphs, headings, lists) don't get this padding.

### Why WordPress Native Layout Isn't Working

WordPress's native layout system (`.is-layout-constrained`) should automatically:
1. Center content at `contentSize` (880px)
2. Add padding on mobile to prevent edge-touching
3. Allow `.alignfull` blocks to break out to full width

**Why it's failing:**
- The layout classes may not be applied correctly to individual blocks
- WordPress expects a **container element** with `.is-layout-constrained` class
- When we removed Tailwind containers, we may have also removed the wrapper WordPress needs

## Possible Solutions

### Option 1: WordPress-Native Layout Container (RECOMMENDED)

Add a WordPress-aware container that applies `.is-layout-constrained` to the content area.

**Implementation:**
```php
<!-- In page templates (e.g., resources/views/partials/content-page.blade.php) -->
<article {!! post_class('wp-block-post-content is-layout-constrained') !!}>
  {!! the_content() !!}
</article>
```

**Pros:**
- Uses WordPress's native layout system exactly as block themes do
- Automatically handles `contentSize`, `wideSize`, and `.alignfull`
- No custom CSS needed - WordPress core handles everything
- Matches modern block theme approach (Twenty Twenty-Four, etc.)

**Cons:**
- Requires template changes
- Need to test with all existing blocks/patterns

**CSS Additions:**
```css
/* Support for WordPress layout system */
.is-layout-constrained > * {
  max-width: var(--wp--style--global--content-size, 55rem);
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: var(--wp--preset--spacing--20, 1rem);
  padding-right: var(--wp--preset--spacing--20, 1rem);
}

.is-layout-constrained > .alignfull {
  max-width: none !important;
  width: 100vw;
  margin-left: calc(50% - 50vw) !important;
  margin-right: calc(50% - 50vw) !important;
}

.is-layout-constrained > .alignwide {
  max-width: var(--wp--style--global--wide-size, 64rem);
}

@media (min-width: 640px) {
  .is-layout-constrained > * {
    padding-left: var(--wp--preset--spacing--40, 2rem);
    padding-right: var(--wp--preset--spacing--40, 2rem);
  }
}

@media (min-width: 1024px) {
  .is-layout-constrained > * {
    padding-left: var(--wp--preset--spacing--50, 3rem);
    padding-right: var(--wp--preset--spacing--50, 3rem);
  }
}
```

---

### Option 2: Minimal Custom Container with Breakout Support

Add a lightweight custom container that provides max-width and allows full-width blocks to break out.

**Implementation:**
```php
<!-- In page templates -->
<article {!! post_class('content-container') !!}>
  {!! the_content() !!}
</article>
```

**CSS:**
```css
/* Content container with breakout support */
.content-container {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.content-container > * {
  max-width: 55rem; /* contentSize */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

.content-container > .alignwide {
  max-width: 64rem; /* wideSize */
}

.content-container > .alignfull {
  max-width: none;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Custom blocks that should be full-width */
.content-container > [class*="wp-block-imagewize"] {
  max-width: none;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

@media (min-width: 640px) {
  .content-container > * {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .content-container > .alignfull {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1024px) {
  .content-container > * {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  .content-container > .alignfull {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}
```

**Pros:**
- Full control over layout behavior
- Easy to customize for specific blocks
- Can handle custom blocks differently than core blocks

**Cons:**
- Not using WordPress's native system
- More CSS to maintain
- May conflict with future WordPress layout updates

---

### Option 3: Universal Padding with Negative Margins for Full-Width

Apply padding to all direct children of content areas, then use negative margins for full-width blocks.

**Implementation:**
```php
<!-- In page templates -->
<article {!! post_class('entry-content') !!}>
  {!! the_content() !!}
</article>
```

**CSS:**
```css
/* Universal content padding */
.entry-content > * {
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 55rem; /* contentSize */
  margin-left: auto;
  margin-right: auto;
}

/* Wide blocks */
.entry-content > .alignwide {
  max-width: 64rem; /* wideSize */
}

/* Full-width blocks break out */
.entry-content > .alignfull {
  max-width: none;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}

/* Responsive padding */
@media (min-width: 640px) {
  .entry-content > * {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1024px) {
  .entry-content > * {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}
```

**Pros:**
- Simple approach - padding on everything, breakout where needed
- Works with any content structure
- Easy to understand and debug

**Cons:**
- Every element gets padding (may cause issues with nested blocks)
- Negative margins can be fragile
- Not using WordPress's intended layout system

---

### Option 4: Use Tailwind + Breakout Utility Classes

Keep using Tailwind containers but add utility classes to allow full-width breakouts.

**Implementation:**
```php
<!-- In page templates -->
<article class="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
  {!! the_content() !!}
</article>
```

**CSS:**
```css
/* Full-width breakout utility */
.alignfull {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
```

**Pros:**
- Uses familiar Tailwind utilities
- Explicit, predictable behavior
- Works well with existing Tailwind setup

**Cons:**
- Goes against WordPress's native layout system
- Harder for users to understand alignment options
- Custom blocks need manual breakout CSS

---

## How Twenty Twenty-Five Solves This

The official WordPress theme Twenty Twenty-Five uses a **two-pronged approach**:

### 1. Theme.json Configuration

**Key Settings** (lines 53-56, 186, 194-198):

```json
"layout": {
  "contentSize": "645px",
  "wideSize": "1340px"
},
"useRootPaddingAwareAlignments": true
```

**Root-level padding** (in `styles.spacing`):
```json
"spacing": {
  "blockGap": "1.2rem",
  "padding": {
    "left": "var:preset|spacing|50",
    "right": "var:preset|spacing|50"
  }
}
```

The `"useRootPaddingAwareAlignments": true` setting is **critical** - it tells WordPress that:
- The root element (body/main) has padding
- `.alignfull` blocks should extend **beyond** that padding to reach viewport edges
- Regular content respects the root padding automatically

### 2. Template Structure

**Page Template** (`templates/page.html`, line 9):
```html
<!-- wp:post-content {"align":"full","layout":{"type":"constrained"}} /-->
```

**Post Template** (`templates/single.html`, line 10):
```html
<!-- wp:post-content {"align":"full","layout":{"type":"constrained"}} /-->
```

**Key observations:**
- The `<!-- wp:post-content -->` block has `align="full"`
- But **also** has `layout={"type":"constrained"}`
- This creates a paradox that WordPress resolves intelligently:
  - The post-content container itself is full-width
  - But its **children** are constrained to `contentSize`
  - Unless the children have their own alignment (wide/full)

### 3. Minimal CSS

Twenty Twenty-Five has **almost no custom layout CSS** - just 62 lines in `style.css`, mostly for focus states and typography enhancements. **WordPress handles all the layout automatically.**

---

## Recommendation

**Use the Twenty Twenty-Five Approach (WordPress-Native)**

This approach:
1. ✅ Follows WordPress best practices (matches Twenty Twenty-Five theme)
2. ✅ Automatically handles all alignment options (default, wide, full)
3. ✅ Provides mobile padding out-of-the-box via root padding
4. ✅ Future-proof - works with WordPress layout updates
5. ✅ **ZERO custom layout CSS needed** - WordPress core does everything
6. ✅ User-friendly - alignment options in block toolbar "just work"
7. ✅ Uses `useRootPaddingAwareAlignments` for proper full-width breakouts

## Implementation Steps (Twenty Twenty-Five Approach)

### Step 1: Update theme.json

Add these two critical settings to `theme.json`:

```json
{
  "settings": {
    "layout": {
      "contentSize": "55rem",  // Keep existing value (880px)
      "wideSize": "64rem"      // Keep existing value (1024px)
    },
    "useRootPaddingAwareAlignments": true  // ADD THIS!
  },
  "styles": {
    "spacing": {
      "padding": {
        "left": "var:preset|spacing|50",   // ADD THIS!
        "right": "var:preset|spacing|50"   // ADD THIS!
      }
    }
  }
}
```

**Note:** You'll need to define spacing presets if they don't exist. Based on your current CSS:
- `spacing|20` = 1rem (mobile)
- `spacing|40` = 2rem (tablet)
- `spacing|50` = 3rem (desktop)

### Step 2: Update Template Structure

Since you're using Blade templates (not block templates), you need to adjust how `the_content()` is rendered.

**Option A: Add wrapper in Blade template**

In files like `resources/views/partials/content-page.blade.php`:

```php
<article @php(post_class())>
  <div class="wp-block-post-content alignfull is-layout-constrained">
    {!! the_content() !!}
  </div>
</article>
```

**Option B: Filter the_content() wrapper**

Add to your theme's `functions.php` or a service provider:

```php
add_filter('the_content', function($content) {
    if (is_singular() && in_the_loop() && is_main_query()) {
        return '<div class="wp-block-post-content alignfull is-layout-constrained">'
               . $content . '</div>';
    }
    return $content;
});
```

### Step 3: Remove Custom Layout CSS

**Delete or comment out** the custom `.alignfull` padding in `resources/css/app.css` (lines 684-698):

```css
/* DELETE THIS - WordPress will handle it automatically */
/*
.alignfull {
  padding-inline: var(--wp--preset--spacing--20, 1rem);
}
... etc
*/
```

### Step 4: Add Spacing Scale to theme.json

If you don't have spacing presets defined, add this to `theme.json`:

```json
"settings": {
  "spacing": {
    "spacingSizes": [
      {
        "name": "Small",
        "size": "clamp(1rem, 2vw, 1rem)",
        "slug": "20"
      },
      {
        "name": "Medium",
        "size": "clamp(1.5rem, 3vw, 2rem)",
        "slug": "40"
      },
      {
        "name": "Large",
        "size": "clamp(2rem, 4vw, 3rem)",
        "slug": "50"
      }
    ]
  }
}
```

### Step 5: Test Implementation

Test with all existing content:
- [ ] Mobile: Regular content has padding (doesn't touch edges)
- [ ] Desktop: Regular content centers at 880px
- [ ] `.alignwide` blocks center at 1024px
- [ ] `.alignfull` blocks span full viewport width
- [ ] Custom blocks respect alignment settings
- [ ] No horizontal scrollbar appears
- [ ] Works on all page templates (page, post, archive)
- [ ] Block toolbar alignment options work correctly

### Step 6: Update Documentation

Update `CLAUDE.md` with the new approach so future development follows this pattern.

## Reference Materials

- [WordPress Layout Support](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/#settings.layout)
- [useRootPaddingAwareAlignments Documentation](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/#settings.useRootPaddingAwareAlignments)
- [Twenty Twenty-Five Theme](https://github.com/WordPress/twentytwentyfive) - Reference implementation (recommended)
- [Twenty Twenty-Four Theme](https://github.com/WordPress/twentytwentyfour) - Alternative reference
- [Block Editor Layout Documentation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/#layout)

---

## Summary: The Magic of useRootPaddingAwareAlignments

The key insight from Twenty Twenty-Five is that **you need minimal custom CSS** for layout management. Instead:

1. **Set root padding** in theme.json (`styles.spacing.padding`)
2. **Enable `useRootPaddingAwareAlignments: true`** in theme.json
3. **Wrap content** in `<div class="wp-block-post-content alignfull is-layout-constrained">`
4. **Add minimal CSS** for standalone block padding (WordPress handles centering/max-width)

This tells WordPress:
- "The body/main has padding" (from root padding)
- "Regular content should respect this padding and center at contentSize"
- "`.alignfull` blocks should ignore the padding and reach viewport edges"
- "`.alignwide` blocks should center at wideSize"

**Result:** Near-perfect layout on all devices with minimal custom CSS. This is the modern WordPress way.

---

## Path Forward: Plugin Block Migration Strategy

### Current Situation Assessment

**What We've Achieved:**
- ✅ WordPress-native layout system fully implemented
- ✅ Theme-based blocks working perfectly (two-column-card, multi-column-content, etc.)
- ✅ Core WordPress blocks working correctly
- ✅ Clean, maintainable CSS using `:where()` for zero specificity

**What's Broken:**
- ❌ Plugin-based blocks (about-block, services-block, cta-block, reviews-block)
- ❌ These blocks appear squashed/compressed with narrow content areas
- ❌ Built before layout system changes, incompatible with current approach

### Three Options for Moving Forward

#### Option 1: Quick Fix - Add CSS Overrides for Plugin Blocks (SHORT-TERM) ⚠️

**Pros:**
- Fast implementation (1-2 hours)
- No code refactoring needed
- Gets site functional quickly

**Cons:**
- Hacky solution, not maintainable long-term
- CSS overrides can be fragile
- Doesn't address root cause
- May break with plugin updates

**Implementation:**
```css
/* Temporary fix for plugin blocks - NOT RECOMMENDED long-term */
:where(.is-layout-constrained) > .wp-block-imagewize-about-block,
:where(.is-layout-constrained) > .wp-block-imagewize-services-block,
:where(.is-layout-constrained) > .wp-block-imagewize-cta-block,
:where(.is-layout-constrained) > .wp-block-imagewize-reviews-block {
  padding-left: 0;
  padding-right: 0;
}
```

Then ensure each block has `align="full"` or `align="wide"` set in the editor.

---

#### Option 2: Update Plugin Blocks - Add Alignment Support (MEDIUM-TERM) ⚙️

**Pros:**
- Keeps blocks as separate plugins (portable, reusable)
- Proper solution for the blocks
- Can be versioned independently

**Cons:**
- Requires modifying 4 separate plugin repositories
- Need to publish new versions to Packagist
- Requires testing across multiple sites
- Ongoing maintenance overhead

**Implementation Steps:**
1. For each plugin (about-block, services-block, cta-block, reviews-block):
   - Add `"align": ["wide", "full"]` to block.json supports
   - Set default alignment to `"full"` in block.json attributes
   - Update block CSS to work with alignment classes
   - Remove conflicting internal padding
   - Test with Nynaeve theme
2. Publish new versions to GitHub
3. Update Packagist
4. Update site/composer.json version constraints
5. Run `composer update`

**Estimated Time:** 2-3 days per block = 8-12 days total

---

#### Option 3: Migrate Blocks to Theme as Sage Native Blocks (RECOMMENDED) ✅

**Pros:**
- **Best long-term solution**
- Blocks live in theme, easier to maintain
- Consistent with other theme blocks
- No external dependencies
- Can be optimized specifically for this theme
- Single codebase for all blocks
- Faster iteration and testing

**Cons:**
- Initial time investment (2-3 days per block)
- Blocks not portable to other projects (acceptable trade-off)
- Need to remove from composer.json

**Implementation Steps:**

1. **For each block, create Sage Native Block:**
   ```bash
   cd trellis
   trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve

   # Create blocks using existing plugin code as reference
   wp acorn sage-native-block:create about --template=basic --force
   wp acorn sage-native-block:create services --template=basic --force
   wp acorn sage-native-block:create cta --template=nynaeve-cta --force
   wp acorn sage-native-block:create reviews --template=basic --force
   ```

2. **Copy functionality from plugins:**
   - Copy block.json attributes
   - Copy and adapt React components
   - Copy and adapt CSS (update for theme variables)
   - Add proper alignment support (`"align": ["wide", "full"]`)
   - Set `"default": "full"` for alignment

3. **Update block.json for each:**
   ```json
   {
     "supports": {
       "align": ["wide", "full"],
       "spacing": {
         "margin": true,
         "padding": true
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

4. **Remove plugins from composer.json:**
   ```bash
   cd site
   composer remove imagewize/about-block
   composer remove imagewize/services-block
   composer remove imagewize/cta-block
   composer remove imagewize/reviews-block
   ```

5. **Update content in WordPress:**
   - Blocks will need to be replaced in pages (WordPress will show deprecation warnings)
   - Create migration script or manually update pages

**Estimated Time:**
- About Block: 4-6 hours
- Services Block: 4-6 hours
- CTA Block: 2-3 hours (can use existing nynaeve-cta template)
- Reviews Block: 4-6 hours
- Testing & refinement: 4 hours
- **Total: 2-3 days**

---

### Recommendation: Option 3 (Migrate to Theme)

**Why this is the best choice:**

1. **Aligns with existing pattern:** You've already migrated several blocks successfully (two-column-card, multi-column-content, testimonial-grid, etc.)

2. **Single source of truth:** All blocks in one place, easier to maintain

3. **Performance:** Fewer external dependencies, smaller Composer footprint

4. **Consistency:** All blocks follow same patterns, use same CSS variables, same build process

5. **Future-proof:** No worries about plugin compatibility or versioning

6. **Developer experience:** Easier to iterate on blocks, faster testing

**Migration Priority Order:**
1. **CTA Block** (easiest, can use existing template)
2. **About Block** (partially working, simple structure)
3. **Services Block** (more complex, icon support)
4. **Reviews Block** (most complex, may need testimonial-grid integration)

---

### Alternative: Hybrid Approach

If time is constrained:

1. **Immediate:** Use Option 1 (CSS fix) to make site functional
2. **Within 1 week:** Migrate CTA Block (Option 3)
3. **Within 2 weeks:** Migrate About Block (Option 3)
4. **Within 1 month:** Migrate Services & Reviews Blocks (Option 3)

This provides immediate relief while working toward the proper solution incrementally.

---

### Implementation Checklist for Migration

When migrating each block:

- [ ] Create new Sage Native Block with appropriate template
- [ ] Copy attributes from plugin block.json
- [ ] Copy and adapt edit component (editor.jsx)
- [ ] Copy and adapt save component (save.jsx)
- [ ] Copy and adapt frontend styles (style.css)
- [ ] Copy and adapt editor styles (editor.css)
- [ ] Add alignment support (`"align": ["wide", "full"]`)
- [ ] Set default alignment to `"full"`
- [ ] Remove conflicting padding CSS
- [ ] Test in editor (block insertion, editing, saving)
- [ ] Test on frontend (mobile and desktop)
- [ ] Test with different alignment options
- [ ] Update documentation
- [ ] Create backup of pages using old block
- [ ] Replace old blocks in WordPress editor
- [ ] Delete old content (keep backup)
- [ ] Remove plugin from composer.json
- [ ] Run composer update
- [ ] Final testing across all pages

---

## Conclusion

The WordPress-native layout system implementation was **successful** for theme-based blocks and core blocks. The issues with plugin-based blocks are **expected** and easily solvable through migration.

**Next Steps:**
1. Review the three options above
2. Decide on approach (recommend Option 3)
3. Plan migration timeline
4. Execute migration block-by-block
5. Update this documentation as blocks are migrated

The foundation is solid - we just need to bring the plugin blocks into alignment with the new system.
