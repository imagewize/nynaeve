# Repository Guidelines

## Project Structure & Module Organization
- Theme lives at `site/web/app/themes/nynaeve/`.
- `app/`: PHP (Blocks, Providers, View Composers); `config/`: Sage/Acorn config.
- `resources/`: Tailwind (`css/`), JS (`js/`), Blade views (`views/`), native blocks (`js/blocks/`); block styles live with each block.
- Built assets in `public/build/` (Vite); static assets in `resources/images/`.
- Utilities in `scripts/`; theme docs in `docs/`; `archive/` is deprecated/read-only.

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
- `block.json`: namespace/category/textdomain `imagewize`; default align `wide`; button styles via `core/buttons` container class (not individual buttons).
- Blade views in `resources/views`; reuse via `partials/` and `sections/`. CSS is Tailwind-first, custom in `resources/css` or block `style.css`.

## Block Development Workflow (Trellis VM)
- DB lives in Trellis VM (local MySQL on 3306 conflicts). Run `trellis vm shell --workdir /srv/www/imagewize.com/current` and use `--path=web/wp`.
- Create native block: `wp acorn sage-native-block:create`; ACF block: `wp acorn acf:block MyBlock`.
- Blocks auto-register via ThemeServiceProvider; store under `resources/js/blocks/{block-name}/` with container-only CSS.

## Testing Guidelines
- Before commits: `composer test`, `composer pint`/`npm run pint`.
- For block/JS edits: `npm run build` once to confirm clean Vite output; use real content to catch layout issues.
- Playwright: `npm run pw` or scoped (e.g., `npm run pw:mobile`).

## Commit & Pull Request Guidelines
- Commits: short Title-Case (e.g., `Nynaeve Documentation Update`); scope narrowly.
- PRs: include purpose, affected theme paths, manual test commands, linked issues/trellis tickets; add screenshots/GIFs for UI/block changes.

## Security & Configuration Tips
- Never commit `.env`, vault files, or generated credentials; use `.env.example`.
- Work from Trellis VM for any `wp`/`wp acorn` tasks (DB lives there; host MySQL on 3306 conflicts). Theme path in VM: `/srv/www/imagewize.com/current/web/app/themes/nynaeve`; demo: `/srv/www/demo.imagewize.com/current`.
- Flush caches with `wp cache flush` if changes look stale; prefer repo Playwright script for screenshots.
