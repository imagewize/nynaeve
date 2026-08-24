# Repository Guidelines

## Project Structure & Module Organization
- Theme lives at `site/web/app/themes/nynaeve/`.
- `app/`: PHP (Blocks, Providers, View Composers); `config/`: Sage/Acorn config.
- `resources/`: Tailwind (`css/`), JS (`js/`), Blade views (`views/`), native blocks (`js/blocks/`); block styles live with each block.
- Built assets in `public/build/` (Vite); static assets in `resources/images/`.
- Utilities in `scripts/`; `archive/` is deprecated/read-only. Theme guidance lives in `CLAUDE.md` (self-contained — no external docs folder ships with the theme).

## Build, Test, and Development Commands
- Install deps: `cd site && composer install`; then `cd site/web/app/themes/nynaeve && composer install && npm install`.
- Dev server (Vite + HMR): `npm run dev`; open `http://imagewize.test/` (HTTPS breaks HMR WebSockets).
- Production build: `npm run build`.
- Quality: `cd site && composer test` (phpcs); `composer pint` or `npm run pint` for formatting.
- Visual/E2E: `npm run pw`.

## Coding Style & Block Standards
- PHP: PSR-4 under `App\\`, prefer strict types; format with Pint.
- JS/React: ES modules, functional components; block dirs kebab-case (`cta-block-blue`), components PascalCase.
- Blocks: InnerBlocks-first; use real content (no placeholders); no horizontal padding (theme handles spacing); keep styling on containers, not core child blocks.
- `block.json`: three prefixes, don't mix them — namespace `imagewize` (`"name": "imagewize/my-block"`), category `nynaeve` (`"category": "nynaeve/content"` — slugs registered in `app/setup.php`; an unregistered slug drops the block into the generic category), textdomain `nynaeve` (the theme Text Domain, NOT `imagewize` or `sage`); default align `wide`; button styles via `core/buttons` container class (not individual buttons); add `"example": {}` for an inserter preview.
- ⚠️ In **content markup** the block is always `<!-- wp:imagewize/x -->`. All 35 blocks use the `imagewize` namespace; `nynaeve` is a *category* prefix only and never appears in serialized content. `wp:nynaeve/x` is always a bug — it renders as an unsupported-block placeholder. (Found Aug 2026: bad docs propagated `wp:nynaeve/cta-block-blue` across a whole content repo.) Verify a slug with `grep '"name"' resources/js/blocks/*/block.json`.
- Full-width (`alignfull`) blocks: set a default margin reset in `block.json` attributes (`"style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}`) — NOT a CSS override — so the constrained-layout `margin-block-start` gap is removed while users keep spacing control. Applies only to newly inserted blocks; existing ones must be updated manually.
- Blade views in `resources/views`; reuse via `partials/` and `sections/`. CSS is Tailwind-first, custom in `resources/css` or block `style.css`.
- SVG icons in blocks: never `import` SVGs (Vite hashes them → stale URLs). Use the `imagewize/theme-icon` binding + `window.imagewizeIcons` (both from `app/setup.php`). `vite.config.js` MUST keep `assets: ['resources/images/**']` on the `laravel()` plugin so `Vite::asset()` can resolve the icons — without it every icon renders broken in editor and frontend. See CLAUDE.md "SVG Icons in Block Templates".

### WooCommerce Customization
- Quote-based system (no cart/checkout); custom templates in `resources/views/woocommerce/`; "Request Quote" buttons replace add-to-cart.
- **Product content — do NOT add color classes** (`textColor`, `has-*-color`, `has-text-color`). `app.css` controls all product-page colors; hardcoded classes override CSS and break the design system. Use only typography/spacing attributes (`fontFamily`, `fontSize`, `fontWeight`).

## Block Development Workflow (Trellis VM)
- DB lives in Trellis VM (local MySQL on 3306 conflicts). Run `trellis vm shell --workdir /srv/www/imagewize.com/current` and use `--path=web/wp`.
- Create native block: `wp acorn sage-native-block:create`; ACF block: `wp acorn acf:block MyBlock`.
- Blocks auto-register via ThemeServiceProvider; store under `resources/js/blocks/{block-name}/` with container-only CSS.

## Testing Guidelines
- Before commits: `composer test`, `composer pint`/`npm run pint`.
- For block/JS edits: `npm run build` once to confirm clean Vite output; use real content to catch layout issues.
- Playwright: `npm run pw` or scoped (e.g., `npm run pw:mobile`).

## Commit & Pull Request Guidelines
- **Branch per change**: never commit theme work directly to `main`. Every update (feature, fix, docs, dep bump) branches off `main` and lands via PR — `release-theme.sh` diffs the branch against `main`, so direct-to-`main` work yields an empty release changelog.
- **Atomic commits**: stage files individually or in small logical groups (`git add` per file/group) and commit each with a specific message — never stage unrelated files together (e.g. commit documentation separately from block code).
- **No AI attribution**: no `🤖 Generated with Claude Code` or `Co-Authored-By:` footers — keep history attribution-free.
- Branch names must NEVER match a release tag. Releases are tagged `vX.Y.Z`, so a branch named `v2.15.7` collides with the `v2.15.7` tag and makes every ref ambiguous (`git checkout`/`log`/`push v2.15.7` resolves unpredictably). Use `release/2.15.7` or a descriptive name (`npm-security-updates`) instead. Existing `v2.15.x` branches predate this rule — don't copy them.
- Commits: short Title-Case (e.g., `Nynaeve Documentation Update`); scope narrowly.
- PRs: include purpose, affected theme paths, manual test commands, linked issues/trellis tickets; add screenshots/GIFs for UI/block changes.

## Releases & Version Bumps
- A version bump touches **four** places, all together: `style.css` `Version:`; `readme.txt` `Stable tag:`; a new `= X.Y.Z - MM/DD/YY =` block atop `== Changelog ==` in `readme.txt` (concise, WP.org style, lines prefixed `FEATURE:`/`FIXED:`/`SECURITY:`/`TECHNICAL:`/`DOCUMENTATION:`/`BREAKING:`); and a new `## [X.Y.Z] - YYYY-MM-DD` section atop `CHANGELOG.md` (detailed Keep-a-Changelog style, naming files touched). Note the two changelogs use different date formats and different levels of detail.
- Prefer the script over hand-editing — it does all four and generates both formats from the branch diff. Run it **from the repo root**, not the theme dir: `~/code/wp-ops/scripts/release/release-theme.sh nynaeve 3.1.0` (`--commit` to auto-commit, `--ai=claude|codex|vibe` to pick the CLI). It resolves the theme under `site/` or `demo/`, so the same call works for `elayne`/`aviendha`.
- If bumping by hand, verify parity before committing: `diff <(grep -o '^## \[[0-9.]*\]' CHANGELOG.md | tr -d '#[] ' | sort -V) <(grep -o '^= [0-9.]* ' readme.txt | tr -d '= ' | sort -V)`.
- Real drift this prevents: `readme.txt`'s `Stable tag` sat at `2.15.8` through the whole 3.0.x line, and 2.15.9/2.15.10/3.0.0/3.0.1/3.0.2 were missing from its changelog — all bumped by hand without the script. In sync from 2.3.0 forward; pre-2.3.0 entries live only in `CHANGELOG.md` and are deliberately not back-filled.
- Theme version ≠ block stylesheet version. Bumping the theme does not refresh a block's cached CSS — bump `block.json` `version` whenever a shipped block's `style.css`/`editor.css` changes (Trellis serves static assets with a one-year cache).

## Security & Configuration Tips
- Never commit `.env`, vault files, or generated credentials; use `.env.example`.
- Work from Trellis VM for any `wp`/`wp acorn` tasks (DB lives there; host MySQL on 3306 conflicts). Theme path in VM: `/srv/www/imagewize.com/current/web/app/themes/nynaeve`; demo: `/srv/www/demo.imagewize.com/current`.
- Flush caches with `wp cache flush` if changes look stale; prefer repo Playwright script for screenshots.
