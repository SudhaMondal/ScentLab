# ScentLab — Enchanted Scent Grove

A repository-importable Next.js starter for **ScentLab**, a global perfume-making discovery and knowledge community. This package contains the source code that is available in this workspace, including the editorial/voxel visual direction and a new Minecraft-inspired Scent Codex inventory.

## What is included

- Next.js App Router + TypeScript + Tailwind foundation.
- Responsive ScentLab homepage with ingredient-first recipe search and filters.
- Pinterest-inspired masonry recipe feed and recipe detail modal.
- Interactive batch scaler (10 g / 30 g / 50 g / custom).
- Save-state and light/dark theme demo interactions.
- **Scent Codex** at `/book`: searchable fragrance knowledge book, inventory-slot interface, rarity markers, ingredient specimen pages, scent pairings and safety notes.
- Pixie / enchanted-forest visual system: mossy voxel panels, pixel-grid texture, floating fairy glyphs, enchanted item slots and editorial serif + monospace typography.
- Supabase/PostgreSQL relational schema covering profiles, ingredients, recipes, recipe line items, boards, stash, brew logs, comments, follows and likes.
- `.env.example` and setup instructions.

## Important: this is not a copy of the hosted Emergent preview

The Emergent preview URL and its managed project repository are external to this workspace. I cannot extract its private source, Clerk-managed auth configuration, Mongo-backed APIs, generated media assets, or its exact current code from the preview URL. This ZIP is a standalone, importable ScentLab starter based on the source code available here; it does **not** claim to contain those external managed services or the full hosted preview implementation.

The current recipe records are synthetic UI demo data. They are not authentic, validated, IFRA-compliant or safe-to-manufacture formulas. The Scent Codex entries are high-level educational descriptions, not safety assessments or usage limits. Never infer dermal limits or IFRA conformity from ingredient names alone.

## Run locally

Requirements: Node.js 20.9+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Supabase foundation

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
4. Add and test explicit Row Level Security policies before enabling client-side database access. RLS is enabled in the schema but policies are intentionally not permissive by default.
5. Implement auth callbacks, profile provisioning, storage bucket policies and server-side validation before launch.

Never expose a Supabase service-role key in browser code.

## Import into a repository-based builder (such as Emergent)

1. Download and unzip this project.
2. Create a new **private or public GitHub repository**.
3. Upload the contents of the extracted folder to the repository root (the `package.json` must be at the root, not inside an extra nested folder).
4. Commit the files to `main`.
5. In the builder, choose **Import Project → Frontends, backends or agents from a repository**, connect GitHub, and select this repository and branch.
6. Use `EMERGENT_BUILD_PROMPT.md` as the next build instruction.
7. Add environment variables in the builder's secrets/environment settings. Do not commit `.env.local` or API secrets.

See `GITHUB_AND_EMERGENT_IMPORT.md` for the step-by-step GitHub upload guide.

If the importer accepts a ZIP upload directly, you can use the ZIP instead of the GitHub steps. If it only accepts a repository URL, the GitHub route is required.

## Current implementation boundaries

- Homepage recipe search, filters, detail modal and batch scaling are client-side demo behaviour.
- Codex inventory selection and search are client-side demo state; the entries are static seed content.
- Authentication, persistent user publishing, real community feed/follows, moderation, image uploads, live inventory persistence, and production safety review are not connected in this starter.
- The previous Emergent preview's managed email/Google auth and user-scoped APIs are not included because their source/configuration is not available in this workspace.
- No production build or deployment is claimed. Run `npm install` and `npm run build` in your environment, resolve any environment-specific issues, then configure hosting and a custom domain.

## Safety and trust

ScentLab must distinguish community-submitted, expert-reviewed and independently safety-assessed formulas. A recipe must not be labelled skin-safe or IFRA-compliant unless the exact materials, dilutions, intended product category and applicable current standards have been assessed by a qualified reviewer with traceable documentation.

## Repeatable discovery-to-brew milestone (`/journey`)

The new Brew Lab page demonstrates the core loop: search rosemary or chocolate, distinguish a cocoa-absolute material match from a chocolate-smelling accord, choose a formula snapshot, scale the batch, record mixing/resting observations, and create an attributed remix. The homepage now links its create/community calls to this workflow.

- Formula snapshots carry a version number in the demo; the SQL foundation adds append-only `recipe_versions` and lets brew logs reference the exact version used.
- Publishing, brew logs, and remixes currently persist in browser `localStorage` only. The profile selector is a demo persona switch, **not authentication or two real accounts**.
- SQL additions include version snapshots, remix source-version attribution, and a content-report queue. They are schema foundations only; explicit production RLS policies, moderator roles, auth integration, server-side validation, and API wiring remain required.
- All example formula rows and quantities on `/journey` are synthetic UI test data. They are not usable manufacturing instructions, validated formulas, skin-safe formulas, or evidence of IFRA compliance.

### Suggested next integration milestone

Connect Supabase Auth (email/password + Google), provision profiles, implement server actions/API routes for recipe creation and immutable version snapshots, and enforce RLS for published recipes, private drafts, brew logs, remixes, and reports. Then verify the end-to-end flow with two independently authenticated accounts.
