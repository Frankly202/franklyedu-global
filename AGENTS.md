# FranklyEdu Global Development Guidelines

## Project Context

- Brand & marketing website for FranklyEdu Global.
- Built with TanStack Start, React, and Tailwind CSS.
- Preserves the visual brand direction: clean typography (Outfit / DM Sans), deep navy, slate blue, and warm cream color palette, accessible UI, and full mobile responsiveness.

## Contribution Rules

- Always verify that `bun run --bun tsc --noEmit` and `bun run build` pass with zero errors.
- Maintain code formatting standards via Prettier (`bun run format`).
- Keep central brand configuration and listing content organized in `src/data/site.ts` and `src/data/content.ts`.

## Validation

For routine implementation:

1. lint
2. typecheck
3. production build
4. headless Playwright smoke test

Do not perform interactive browser walkthroughs by default.

Use interactive browser inspection only when visual/UI behavior requires it or when automated tests fail and investigation requires browser inspection.

If all automated checks pass, stop.
