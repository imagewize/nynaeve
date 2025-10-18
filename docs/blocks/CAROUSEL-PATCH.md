# Carousel Block Migration - Database Patch

## Overview
This document records the database migration performed when converting the `imagewize/carousel-block` plugin to Sage Native Blocks in the Nynaeve theme.

## Migration Details

**Date:** October 2, 2025
**Reason:** Convert standalone carousel plugin to integrated Sage Native Blocks
**Blocks affected:** `cb/carousel` → `imagewize/carousel`, `cb/slide` → `imagewize/slide`

## Database Changes

### Development Environment
All commands run from Trellis VM due to local MariaDB port conflicts:

```bash
# Enter Trellis VM
cd trellis
trellis vm shell
cd /srv/www/imagewize.com/current

# Backup database first (107MB backup created)
wp db export /tmp/backup_$(date +%Y%m%d_%H%M%S).sql.gz --path=web/wp

# Migrate block names (1,038 replacements)
wp search-replace 'wp:cb/carousel' 'wp:imagewize/carousel' wp_posts --precise --path=web/wp

# Migrate slide blocks (1,037 replacements)
wp search-replace 'wp:cb/slide' 'wp:imagewize/slide' wp_posts --precise --path=web/wp

# Migrate carousel CSS classes (1,037 replacements)
wp search-replace 'wp-block-cb-carousel' 'wp-block-imagewize-carousel' wp_posts --precise --path=web/wp

# Migrate slide CSS classes (1,036 replacements)
wp search-replace 'wp-block-cb-slide' 'wp-block-imagewize-slide' wp_posts --precise --path=web/wp

# Flush cache
wp cache flush --path=web/wp
```

### Results
- **Carousel blocks migrated:** 1,038
- **Slide blocks migrated:** 1,037
- **Total content updates:** ~4,150 replacements across all tables
- **Backup location:** `/tmp/backup_20251002_143321.sql.gz` (107MB)

## Staging/Production Deployment

When deploying to staging or production, run the same migration:

```bash
cd trellis

# Backup first
ansible-playbook database-backup.yml -e env=production -e site=imagewize.com

# Run migration via Ansible
ansible -i hosts/production web -m shell -a "cd /srv/www/imagewize.com/current && wp search-replace 'wp:cb/carousel' 'wp:imagewize/carousel' wp_posts --precise --path=web/wp"

ansible -i hosts/production web -m shell -a "cd /srv/www/imagewize.com/current && wp search-replace 'wp:cb/slide' 'wp:imagewize/slide' wp_posts --precise --path=web/wp"

ansible -i hosts/production web -m shell -a "cd /srv/www/imagewize.com/current && wp search-replace 'wp-block-cb-carousel' 'wp-block-imagewize-carousel' wp_posts --precise --path=web/wp"

ansible -i hosts/production web -m shell -a "cd /srv/www/imagewize.com/current && wp search-replace 'wp-block-cb-slide' 'wp-block-imagewize-slide' wp_posts --precise --path=web/wp"

# Flush cache
ansible -i hosts/production web -m shell -a "cd /srv/www/imagewize.com/current && wp cache flush --path=web/wp"
```

## Code Changes

### Theme Integration
- **Location:** `resources/js/blocks/carousel/` and `resources/js/blocks/slide/`
- **Assets:** Slick Carousel library copied to `resources/vendor/slick/`
- **Enqueue:** Custom render callback in `app/setup.php:320` for Slick library
- **Removed:** `imagewize/carousel-block` plugin via Composer

### Block Configuration
**Carousel block.json:**
- Name: `imagewize/carousel`
- 18 attributes (slides, arrows, dots, colors, responsive settings)
- Supports: align (wide/full), anchor

**Slide block.json:**
- Name: `imagewize/slide`
- Parent: `imagewize/carousel`
- Optional `slideId` attribute

## Troubleshooting

### Issue: Search-replace found 0 results
**Cause:** Including HTML comment prefix in search string
**Fix:** Search for `wp:cb/carousel` instead of `<!-- wp:cb/carousel`

### Issue: Cannot run WP-CLI from host machine
**Cause:** Local MariaDB/MySQL conflicts with Trellis VM port 3306
**Fix:** Always run WP-CLI commands from inside Trellis VM

### Issue: Blocks show "unsupported" warning
**Cause:** Database not migrated or cache not cleared
**Fix:** Run migration + `wp cache flush`

## Related Documentation
- [BLOCK-PLUGINS-INTEGRATION.md](./BLOCK-PLUGINS-INTEGRATION.md) - Plugin to Sage Native Block conversion guide
- [CLAUDE.md](../../../../CLAUDE.md) - Trellis VM database operations
- [setup.php](../app/setup.php#L320) - Carousel render callback implementation

## Notes
- Migration preserves all block attributes and settings
- No manual content updates required
- Slick Carousel library version: 1.8.1
- Required npm package: `classnames`
