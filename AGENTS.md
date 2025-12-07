# Repository Guidelines

## Project Structure & Module Organization
Astro keeps page routing in `src/pages` (the entry point is `src/pages/index.astro`) and shared UI in `src/components/BookGrid.astro`. Data lives in `src/data/libros.json`; edit this file whenever you add, reorder, or mark books as read. Global and scoped styles are split under `src/styles` (`global.css`, `fonts.css`, `books.css`). Static assets belong in `public/`—use `public/books` for covers and `public/fonts` for Urbanist files. Builds emit into `dist/`, so never edit that directory manually.

## Build, Test, and Development Commands
- `npm install`: install Astro and any future dependencies.
- `npm run dev`: launch the local dev server on `http://localhost:4321`; hot reload confirms JSON and asset changes.
- `npm run build`: generate the production bundle in `dist/`; run before every PR to catch Astro/TypeScript errors.
- `npm run preview`: serve the built site to double-check the static output.

## Coding Style & Naming Conventions
Follow Astro + TypeScript defaults: 2-space indentation, single quotes for strings, and explicit interfaces for props (see `Book` in `src/components/BookGrid.astro`). Keep JSON keys in `libros.json` ordered as shown (`title`, `subtitle`, `author`, `publishers`, `image`, `read`) so diffs stay predictable. CSS files lean on custom properties (e.g., `--font-size-m`)—extend those tokens before adding raw values. Keep filenames in lowercase-kebab-case and stick to Spanish copy for user-facing text.

## Testing Guidelines
There is no automated test harness yet, so treat manual verification as mandatory. After every change, run `npm run dev`, load the grid on mobile and desktop widths, and confirm read/unread states (color vs. grayscale) still respond to the `read` flag. Run `npm run build && npm run preview` prior to merging to ensure the static output matches expectations. If you introduce automated tests later, place them next to the feature with a `.spec.ts` suffix and document the command here.

## Commit & Pull Request Guidelines
History favors short Spanish imperative summaries (e.g., `Documentar proyecto en README`). Keep the scope focused per commit, referencing tickets in the body (`Refs #12`). Every PR needs: one-paragraph overview, checklist of manual verifications, any linked issues, and before/after screenshots for visual tweaks. CI should show a clean `npm run build`. Request review once all discussions are addressed.

## Data & Asset Workflow
Use consistent casing and accent marks in `libros.json`; authors and publishers are arrays to support multiple entries, so avoid concatenated strings. Store cover images under `public/books/{slug}.jpg` (WebP preferred when available) and reference them via absolute paths (`"/books/titulo.webp"`). Keep placeholders untouched so the first letter fallback continues to work for titles without imagery.
