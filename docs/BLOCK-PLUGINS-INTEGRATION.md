# Block Plugins Integration Plan

## Overview

Convert standalone block plugins from Composer packages to native Sage blocks within the Nynaeve theme.

**Current State:**
- Blocks loaded as separate Composer packages in `site/composer.json`
- Maintained as independent plugins
- Versioned and managed separately

**Target State:**
- Blocks integrated directly into theme using `imagewize/sage-native-block`
- Managed within theme codebase
- Simplified dependency chain

## Affected Blocks

1. `imagewize/carousel-block` (^1.0.0) - Created with `@wordpress/create-block`, no ACF fields
2. `imagewize/reviews-block` (^1.1.0) - Created with `@wordpress/create-block`, no ACF fields
3. `imagewize/about-block` (^1.0.0) - Created with `@wordpress/create-block`, no ACF fields
4. `imagewize/services-block` (^1.0.0)
5. `imagewize/cta-block` (^1.0.0) - Created with `@wordpress/create-block`, no ACF fields

**Note:** Most blocks were created with `@wordpress/create-block` and use native WordPress block attributes instead of ACF fields. These are JavaScript/React-based blocks.

## Migration Strategy

### Phase 1: Analysis & Preparation

1. **Audit existing plugin blocks**
   - Clone/download each plugin repository
   - Document block features, attributes, and dependencies
   - **Note:** Most blocks use native WordPress block attributes (created with `@wordpress/create-block`), not ACF fields
   - Review custom styles and scripts
   - Note any external dependencies (libraries, APIs)
   - Check `block.json` for attribute definitions

2. **Create migration checklist**
   - List all block attributes and their types from `block.json`
   - Document any ACF field groups and fields (if applicable)
   - Identify custom CSS/JS assets
   - Note any PHP block logic
   - Check for block variations or patterns
   - Review React/JSX component structure

### Phase 2: Create Sage Native Blocks

For each block:

1. **Generate block scaffold**
   ```bash
   # From Trellis VM
   cd trellis
   trellis vm shell --workdir /srv/www/imagewize.com/current/web/app/themes/nynaeve -- wp acorn sage-native-block:create imagewize/[block-name]
   ```

2. **Migrate block attributes/fields**
   - **For native WordPress blocks:** Copy attribute definitions from plugin's `block.json` to new Sage block's `block.json`
   - **For ACF blocks (if any):** Copy ACF field definitions to new block's `acf-block.json`
   - Verify field/attribute keys are unique
   - Update field group location rules if needed

3. **Port block logic**
   - **For JavaScript blocks:** Copy React/JSX components to block's JS entry point
   - **For PHP blocks:** Copy rendering logic to `block.php`
   - Migrate JavaScript functionality (edit.js, save.js, or view.js)
   - Transfer styles to block's CSS file
   - Update asset enqueuing if needed
   - Ensure `block.json` configuration matches original functionality

4. **Test block functionality**
   - Verify all features work as expected
   - Test in block editor
   - Validate frontend rendering
   - Check responsive behavior

### Phase 3: Content Migration

**IMPORTANT:** If block names remain identical during migration (recommended), no database migration is needed!

1. **Backup database**
   - Create full database backup before migration as a safety precaution
   - **From Trellis VM** (NOT Vagrant - we use Trellis VM):
     ```bash
     # Create gzipped database backup (one-line command)
     cd trellis
     trellis vm shell --workdir /srv/www/imagewize.com/current -- bash -c "mkdir -p database_backup && BACKUP_FILE=\"database_backup/pre-block-migration-\$(date +%Y%m%d_%H%M%S).sql\" && wp db export \${BACKUP_FILE} --add-drop-table && gzip \${BACKUP_FILE} && ls -lh \${BACKUP_FILE}.gz"

     # OR from interactive VM shell
     cd trellis
     trellis vm shell
     cd /srv/www/imagewize.com/current
     mkdir -p database_backup
     BACKUP_FILE="database_backup/pre-block-migration-$(date +%Y%m%d_%H%M%S).sql"
     wp db export ${BACKUP_FILE} --add-drop-table
     gzip ${BACKUP_FILE}
     ls -lh ${BACKUP_FILE}.gz
     ```
   - **Note:** Database files use `.gz` compression (single file). Directory backups use `.tar.gz` (multiple files).
   - To restore: `gunzip backup.sql.gz && wp db import backup.sql`

2. **Keep block names identical** (recommended approach)
   - Register new Sage blocks with same names: `imagewize/carousel-block`, `imagewize/reviews-block`, etc.
   - Ensure block attributes match original plugin blocks (same keys and types)
   - WordPress will seamlessly use the theme blocks instead of plugin blocks
   - **No database changes required** - existing content will just work

3. **Alternative: Update block namespaces** (only if renaming blocks)
   - If you choose different block names, run database search/replace to update block identifiers
   - Old: `<!-- wp:imagewize/carousel-block -->`
   - New: `<!-- wp:imagewize/new-block-name -->`
   - Test on staging first
   - **Not recommended** - adds unnecessary complexity

4. **Verify content integrity**
   - Check all pages/posts using migrated blocks
   - Ensure attributes transferred correctly
   - Validate media attachments still work

### Phase 4: Cleanup

1. **Remove Composer dependencies**
   ```bash
   cd site
   composer remove imagewize/carousel-block
   composer remove imagewize/reviews-block
   composer remove imagewize/about-block
   composer remove imagewize/services-block
   composer remove imagewize/cta-block
   ```

2. **Remove plugin files**
   - Delete plugin directories from `site/web/app/plugins/`
   - Verify no orphaned files remain

3. **Update documentation**
   - Update CLAUDE.md with new block locations
   - Document any changes to block APIs
   - Update deployment scripts if needed

## Technical Considerations

### Block Attribute Systems

**Native WordPress Blocks (carousel, reviews, about, cta):**
- Use `block.json` for attribute definitions
- React-based with `edit.js` and `save.js` components
- Attributes stored in block markup
- Created with `@wordpress/create-block`

**ACF Blocks (if any):**
- Sage native blocks use `acf-block.json` for field definitions
- Supports all ACF field types
- Automatic field group registration
- Block-scoped field namespacing

### Asset Management

- Blocks get individual CSS/JS bundles via Vite
- Automatic HMR during development
- Assets enqueued only when block is used

### PHP vs JavaScript Blocks

Current plugin blocks are primarily:
- **JavaScript-rendered** (carousel, reviews, about, cta): Created with `@wordpress/create-block`
  - Use React components for editor and frontend
  - Migrate JSX components to Sage native block structure
  - May need to convert to dynamic blocks if server-side rendering is needed
- **PHP-rendered** (if any): Migrate to `block.php` with Blade templates

### Block Name Strategy

**Recommended: Keep block names identical**
- Register Sage blocks with exact same names as plugin blocks
- Uses `imagewize` text domain (already used for other theme blocks)
- Zero database migration needed
- Existing content works immediately after plugin removal

Example block registration names:
- `imagewize/carousel-block` (not `imagewize/carousel`)
- `imagewize/reviews-block` (not `imagewize/reviews`)
- `imagewize/about-block` (not `imagewize/about`)
- `imagewize/services-block` (not `imagewize/services`)
- `imagewize/cta-block` (not `imagewize/cta`)

### Database Migration Script (only if renaming blocks)

**Note:** Only needed if you choose to rename blocks (not recommended)

```php
// Example: Update block names in post_content
$old_blocks = [
    'imagewize/carousel-block',
    'imagewize/reviews-block',
    'imagewize/about-block',
    'imagewize/services-block',
    'imagewize/cta-block',
];

foreach ($old_blocks as $block) {
    $new_block = 'imagewize/' . str_replace('-block', '', $block);
    // Run search/replace on wp_posts.post_content
}
```

## Rollback Plan

If issues arise:

1. **Keep plugin versions available**
   - Don't delete plugin code immediately
   - Maintain Composer lock file with working versions

2. **Database rollback**
   - Restore from pre-migration backup
   - Revert block namespace changes

3. **Composer restore**
   ```bash
   cd site
   composer require imagewize/carousel-block:^1.0.0
   # ... restore other blocks
   ```

## Benefits

1. **Simplified dependency management**
   - All blocks in theme repository
   - Single build process
   - Unified versioning

2. **Better developer experience**
   - HMR for all blocks during development
   - Consistent block creation workflow
   - Shared theme utilities and styles

3. **Performance**
   - Reduced plugin overhead
   - Better asset optimization
   - Fewer HTTP requests

4. **Maintenance**
   - Single codebase to maintain
   - Easier to keep blocks in sync with design system
   - Simplified deployment

## Risks

1. **Breaking changes** (mitigated by keeping block names identical)
   - ~~Block namespace changes may break existing content~~ - **Not an issue if block names stay the same**
   - ~~Requires careful database migration~~ - **Not needed if block names stay the same**

2. **Feature parity**
   - Must ensure all plugin features are preserved
   - Must match block attributes exactly (same keys, types, and default values)
   - Additional testing required

3. **Migration complexity**
   - Multiple blocks to migrate
   - React/JSX component migration requires careful porting
   - Must ensure `block.json` configurations match exactly

## Timeline Estimate

Per block (approximate):
- Analysis & prep: 1-2 hours
- Scaffold & migration: 2-4 hours
- Testing: 1-2 hours
- **Total per block: 4-8 hours**

**Full migration: 20-40 hours** (5 blocks)

Plus:
- Database migration script: 4-6 hours
- Testing & QA: 8-10 hours
- **Grand total: 32-56 hours**

## Success Criteria

- [ ] All 5 blocks migrated to Sage native blocks
- [ ] Existing content displays correctly with new blocks
- [ ] All block features work as expected
- [ ] No plugin dependencies remain in composer.json
- [ ] Build process completes without errors
- [ ] Documentation updated
- [ ] Staging environment validated
- [ ] Production deployment successful
