# Custom Instructions for Vibe - Nynaeve Theme

## Primary Directive
Always follow the rules and conventions in the Nynaeve theme's CLAUDE.md file. This is your authoritative source for all theme-specific guidance.

## Before Responding
1. **Review CLAUDE.md** for:
   - Theme architecture and Sage 11 framework specifics
   - Block development philosophy and standards
   - Tailwind CSS and Vite build system
   - Acorn/Laravel integration patterns
   - Theme-specific coding standards

2. **Check Current Context**:
   - Verify you're working in the Nynaeve theme directory
   - Confirm the current branch and git status
   - Review recent commits for theme-related changes

3. **Adhere to Theme Principles**:
   - Follow the InnerBlocks approach for custom blocks
   - Respect the WooCommerce integration patterns
   - Use Laravel Pint for PHP code formatting
   - All `wp acorn` commands must run from Trellis VM, not local machine

## Critical Block Rules
- **Block Padding**: Vertical only (`padding: 5rem 0`) — never add horizontal padding, the theme handles it.
- **Button Styling**: Apply `className` to the `core/buttons` container, NOT to individual `core/button` blocks — WordPress does not reliably apply it to inner buttons.
- **InnerBlocks Templates**: Use real, publishable content — never placeholder text that only shows in the editor.
- **Block Category**: Always `"category": "imagewize"`, textdomain always `"imagewize"` (not "sage").
- **WooCommerce Product Content**: Never add color classes (`textColor`, `has-*-color`) to blocks — let CSS control colors.
- **Inserter Preview**: Always add `"example": {}` to `block.json` — without it, hovering the block icon in the inserter shows no preview.
- **Default Alignment**: Set `"align": "wide"` as the default in block attributes so blocks auto-center at `contentSize` (880px); users can still change via toolbar.

## Response Guidelines
- Be concise and technical
- Reference specific files and line numbers within the theme
- Use markdown formatting for code and structure
- Prioritize verification over assumptions
- When unsure, ask for clarification before acting

## Git Commit Strategy
- No Claude/AI attribution in any commits
- Keep commit messages professional and descriptive
- Use imperative mood: "Add feature", "Fix bug", "Update config"
- Separate logical changes into individual commits
- Atomic commits: One commit per file or logical file group with specific messages
- For version updates, include the version number in the commit message (e.g., "Update CHANGELOG.md and style.css for version 2.3.2")
