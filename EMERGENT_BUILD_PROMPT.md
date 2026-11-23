# Emergent handoff prompt — ScentLab

Continue this existing ScentLab repository. Do not replace it with a fresh template or redesign the homepage from scratch. First inspect the current code, preserve the editorial Pinterest + playful Gen-Z + enchanted voxel identity, and build on the existing routes and components.

## Product principle

Build ScentLab around one repeatable experience: **find a note you love → make a small batch → share what changed**. The recipe/formula is the central object connecting discovery, knowledge, and community.

## Existing work to preserve

- Next.js App Router + TypeScript + Tailwind.
- Homepage and recipe discovery experience.
- `/book` Scent Codex.
- `/journey` Brew Lab demonstration with rosemary/chocolate discovery, batch scaling, formula publishing, brew logs, and credited remix concepts.
- Existing voxel/enchanted visual direction and Supabase schema foundation.

## Build next: real two-account journey

Implement this in small, testable increments:

1. Inspect the repository and report the current architecture and any build/type errors before changing code.
2. Connect real Supabase Auth for email/password and Google OAuth. Keep public recipe discovery accessible without signing in. Require sign-in for saving, publishing, commenting, logging a brew, and remixing.
3. Replace browser-localStorage demo persistence and the fake persona selector with authenticated server-backed data. Keep a clearly labelled demo mode only if backend credentials are absent; never imply demo personas are real accounts.
4. Implement secure server-side recipe publishing with structured formula lines. Each line must capture material identity, stock dilution percentage, solvent/carrier, weight in grams, and note/tier where relevant. Calculate percentages from the formula total and validate positive numeric quantities.
5. Create immutable formula version snapshots. Editing a published formula must create a new version; existing brew logs must continue referencing the exact version used.
6. Implement the complete workflow: Account A publishes a formula; Account B searches by ingredient, opens the exact version, scales it to 10 g, records batch size/substitutions/mixing observations/resting observations, and creates a remix that links to and credits the original version.
7. Add comments/replies to brew logs and recipes, report-content actions, and a moderator review queue. Do not open unrestricted public submissions until reporting, moderation permissions, and abuse controls are in place.
8. Add ingredient pages that answer: what it smells like, what it pairs with, and which recipes use it. Clearly distinguish sourced material facts from community impressions.
9. Generate portrait share cards for an exact recipe version, with artwork, title, creator credit, and a canonical version URL.
10. Add analytics events for search → recipe open, recipe open → brew log, and brewers returning with an update.

## Discovery requirements

- `rosemary` should show meaningfully contrasting concepts such as bright/coastal citrus and dry/forest cedar.
- `chocolate` must distinguish **contains cocoa absolute** (actual material match) from **smells like chocolate** (olfactory impression/accord). Do not conflate these search intents.
- Ingredient search should search structured ingredient identities and synonyms, not only recipe titles or free text.
- Keep search, filters, ingredient pages, and recipe pages usable on mobile.

## Formula and safety requirements

- Put the batch scaler directly above the formula list on recipe pages.
- Show formula quantities in grams and percentages, clearly stating whether percentages refer to concentrate, dilution, or finished product.
- Show stock dilution and solvent/carrier for each material.
- Clearly label synthetic/demo or unreviewed formulas.
- Never describe community formulas as skin-safe, compliant, or suitable for a product category without exact material identity, dilution, intended-use category, traceable supplier documentation, and qualified safety review against applicable current standards.
- Do not invent safety limits or infer compliance from ingredient names.
- Treat all current example quantities as synthetic UI test data, not manufacturing instructions.

## Visual direction

- Discovery mode: cream/off-white surfaces, cherry-wine accents, expressive editorial serif headlines, Pinterest-like visual grid, collectible voxel product art.
- Workbench mode: quieter, high-contrast layout; aligned measurements; readable ingredient rows; prominent checkboxes and controls; responsive mobile layout.
- Use the existing design language. Do not sacrifice readability or precision for decoration.
- Every share card should link to the exact immutable recipe version, not just the homepage.

## Engineering requirements

- Use Supabase Row Level Security with explicit least-privilege policies. Do not use a service-role key in browser code.
- Validate all writes server-side and authorize ownership of drafts and edits.
- Add migrations rather than destructively rewriting production tables.
- Add useful loading, empty, error, and success states.
- Add tests for percentage calculation, batch scaling, version immutability, authorization, and remix attribution.
- Run install, typecheck, tests, and production build; report actual results honestly. Do not claim tests passed unless they ran.
- Do not commit secrets. Update `.env.example` with variable names only and document OAuth callback configuration.

## Acceptance test

Demonstrate with two independently authenticated test accounts:

1. Account A publishes a rosemary formula and version 1 is created.
2. Account B searches rosemary and finds that formula.
3. Account B opens version 1 and scales it to exactly 10 g; displayed line quantities sum to 10 g within the chosen rounding tolerance and percentages sum to 100%.
4. Account B creates a brew log referencing version 1 and records a substitution plus mixing observation.
5. Account B publishes a remix that credits Account A and references the exact source version.
6. Account A's original version and the brew log's snapshot remain unchanged if a later version is published.
7. Both users can view permitted public content; private drafts and private logs remain inaccessible to other users.

At the end, provide a concise list of changed files, environment variables required, migrations to run, tests/build actually executed, and anything still incomplete.
