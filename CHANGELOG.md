# Changelog

All notable changes to this theme will be documented in this file.

## [Unreleased]

### Changed
- Added `content` and `sidebar` classes to content-single.blade.php for better CSS targeting and layout clarity
- Improved related-articles block responsiveness to properly fit within content and sidebar containers
- Updated related-articles grid to use container queries for better responsive behavior
- Reduced grid gap from 2rem to 1.5rem for better spacing on smaller containers
- Added fallback styles for browsers without container query support

### Fixed
- Fixed related-articles block ignoring parent container constraints when resizing browser window
- Related articles now properly adapt column count based on available container width rather than viewport width