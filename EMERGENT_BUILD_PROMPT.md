# Emergent build brief — ScentLab

You are continuing an existing Next.js ScentLab repository. **Inspect the code before making changes. Preserve the existing visual identity and working pages. Do not replace this project with a generic template or redesign it from scratch.**

## Product vision

Build the most useful, welcoming global information and community hub for perfume enthusiasts, independent perfumers, hobbyist formulators and curious beginners. Think of the usefulness of Tasty's searchable recipe library, but for fragrance creation: search an ingredient such as rosemary or chocolate and discover formulas, exact formula metadata, process notes, related ingredients and makers.

The product's central loop:

**Find a note you love → understand the materials → make a small batch → record what changed → share a credited remix.**

Brand: **ScentLab**.

## Current repository

- Next.js 15 App Router, React 19, TypeScript, Tailwind.
- Homepage with ingredient-first search and seeded recipe cards.
- `/recipes/[slug]` recipe details and batch calculator.
- `/create` recipe form UI (currently preview-only).
- `/community` conversation-starter UI.
- `/codex` ingredient reference UI.
- Seed data in `lib/recipes.ts`.
- Existing visual system in `app/globals.css`.

First report the current architecture, missing features, and actual build/type errors. Then implement in small, testable increments. Keep the current design language: warm paper/cream, cherry-wine accents, editorial serif display type, playful collectible art, generous spacing, Pinterest-like discovery cards. The workbench must prioritize legibility and precision over decoration.

## Priority 1 — Real authentication and persistence

Implement Supabase Auth with:
- Email/password registration, login, logout, password reset.
- Google OAuth.
- Public recipe discovery without signing in.
- Require an authenticated user to save, publish, comment, follow, create brew logs and remix.
- Proper auth callback routes and session refresh.
- Profile creation and editable public profile.
- Clear loading, error and success states.

Use `@supabase/ssr` correctly for Next.js server/client clients. Configure OAuth callback URLs and document them. Do not fake accounts or use a persona selector. If credentials are absent, keep public demo browsing available and label authenticated actions as unavailable until configured.

## Priority 2 — Structured recipe publishing

A recipe must store:
- Title, slug, description/story, creator, visibility and timestamps.
- Ingredient/material identity, synonyms and ingredient reference.
- Stock dilution percentage and solvent/carrier.
- Weight in grams.
- Note role (top/heart/base) where relevant.
- Calculated percentage, with an explicit basis (concentrate, dilution or finished product).
- Mixing steps, maturation/resting notes, tags, source references and image.
- Status: draft, pending review, published, rejected or archived.

Validate all numeric values server-side: finite, positive quantities; valid dilution range; non-empty material identity; and formula total greater than zero. Calculate percentages on the server from the actual formula total. Never trust client-supplied calculated percentages.

Creators should be able to preview the exact recipe page before submitting. Provide edit/delete draft actions and clear publishing status.

## Priority 3 — Immutable formula versions

Every published formula must create an immutable `recipe_versions` snapshot. Editing a published recipe creates a new version; it must not mutate old versions. A brew log must point to the exact version used. Include version number, formula JSON/snapshot, created timestamp and author. Use database constraints and server-side authorization.

## Priority 4 — Ingredient-first search and Codex

Search structured ingredient identities and synonyms, not only recipe titles or free text. Support:
- Ingredient name, synonym and material identity.
- Recipe title, tags, scent family and mood.
- Filters for fresh, floral, woody, gourmand, aromatic, resinous and more.
- Sorting by newest, most brewed and community-rated (only after real metrics exist).
- Empty states and suggestions when no results are found.

Critical search semantics:
- Searching `rosemary` should show contrasting interpretations such as bright/coastal citrus and dry/forest cedar.
- Searching `chocolate` must distinguish **contains cocoa absolute / cocoa material** (actual material match) from **smells like chocolate** (olfactory impression or accord). Never conflate those categories.
- Ingredient pages should answer: what it smells like, what it pairs with, what recipes use it, common synonyms, and links to sourced references.
- Clearly distinguish verified sourced material facts from community impressions. Cite external technical claims and show source dates where useful.

## Priority 5 — Batch calculator and brew journal

Keep the batch scaler directly above the ingredient list on recipe pages. It must:
- Support common batch sizes and custom weight.
- Scale every line proportionally.
- Sum to the target within a documented rounding tolerance.
- Display grams and percentages with the percentage basis stated.
- Avoid floating-point rounding drift; calculate using adequate precision and reconcile display rounding transparently.

Authenticated users can create brew logs linked to exact recipe versions, recording batch size, date, substitutions, supplier/material notes, mixing observations, resting observations, and follow-up evaluation. Allow private logs and user-controlled sharing.

## Priority 6 — Community collaboration

Build:
- Maker profiles and follow/unfollow.
- Comments and threaded replies.
- Saves/collections/boards.
- Brew logs and experiment updates.
- Remix action that forks a formula and credits the original creator and exact source version.
- Community feed with useful filters.
- Report-content actions, rate limits and moderation review queue.

Do not open unrestricted public submissions until reporting, moderation permissions and abuse controls are in place. Add moderator roles and audit records. Protect private drafts and private brew logs.

The core acceptance journey must work with two independently authenticated accounts:
1. Account A creates and publishes a rosemary formula; version 1 is created.
2. Account B searches rosemary and finds it.
3. Account B opens version 1 and scales it to exactly 10 g; displayed quantities sum to 10 g within the stated rounding tolerance and percentages sum to 100%.
4. Account B records a brew log against version 1, including a substitution and mixing observation.
5. Account B publishes a remix that credits Account A and references the exact source version.
6. Account A publishes a later version; version 1 and Account B's brew log snapshot remain unchanged.
7. Private drafts/logs are not visible to other users.

## Priority 7 — Trust, safety and responsible formulation

This is a fragrance education and community product. Do not imply that a user-submitted recipe is safe for skin, compliant with IFRA, suitable for candles/soap/room spray, or approved for sale unless the exact material identity, concentration, supplier documentation, intended-use category and applicable current standards have been reviewed by a qualified person.

Requirements:
- Label all synthetic seed examples as demo data.
- Do not invent dermal limits, IFRA limits or safety thresholds.
- Distinguish neat material from stock dilution and identify solvent/carrier.
- Support safety-document attachments or traceable supplier references where appropriate.
- Add expert-reviewed status only with reviewer identity, scope and date.
- Add clear educational disclaimers without making the product feel intimidating.
- Add moderation and report workflows before public launch.

## Priority 8 — Visual polish and sharing

Keep the existing ScentLab identity. Improve:
- Editorial Pinterest-like responsive discovery grid.
- Playful but coherent Gen-Z visual details and ingredient artwork.
- Beautiful recipe hero and legible workbench.
- Shareable portrait recipe cards with creator credit and canonical URL to the exact immutable version.
- Mobile-first interactions and accessible contrast/focus states.
- Skeleton/loading, empty, error and success states.
- SEO metadata, Open Graph images, sitemap, robots and canonical URLs.

Use stock imagery or Emergent managed image generation for ingredient/product visuals. Keep imagery consistent with the actual ingredient and scent mood. Avoid unrelated stock photos. Ensure alt text and image optimization.

## Priority 9 — Analytics and growth

Instrument privacy-conscious product events:
- Search submitted and ingredient searched.
- Search result opened.
- Recipe version viewed.
- Batch scaled.
- Brew log created and updated.
- Remix created.
- User returned to update an experiment.

Build an admin/editorial workflow for adding accurate ingredient entries and featured community formulas. Use search-with-no-results and high-intent searches to prioritize new content. Do not fabricate community counts, reviews, rankings or popularity.

## Database and security requirements

Use Supabase/Postgres with migrations and explicit Row Level Security policies for every user-owned table. Tables should include profiles, ingredients, synonyms, recipes, recipe_versions, recipe_lines or immutable formula snapshots, collections, saves, follows, brew_logs, comments, remixes, reports, moderation_actions and analytics_events as appropriate.

- Least privilege by default.
- Public read access only for published content.
- Users may edit only their own drafts and permitted profile fields.
- Moderators have explicit role-based access.
- Never expose service-role credentials in browser code.
- Validate every write server-side.
- Add rate limiting and input sanitization.
- Add indexes for ingredient search, tags, recipe versions and feed queries.
- Use migrations; do not destructively rewrite existing data.
- Add storage bucket policies for user images and attachments.

## Engineering quality

- Inspect before editing.
- Keep TypeScript strict; no `any` escape hatches without justification.
- Add tests for formula percentages, batch scaling, rounding, version immutability, authorization, RLS visibility and remix attribution.
- Run install, typecheck, tests and production build; report only commands that actually ran and their actual results.
- Do not claim successful deployment or two-account verification unless performed.
- Update README with setup, Supabase migrations, Google OAuth configuration, environment variables and deployment steps.
- At completion, list changed files, database migrations, environment variables, tests/build run, verified acceptance criteria and remaining gaps.

## Definition of done

The project is not complete merely because the pages look attractive. The priority is a real two-account workflow with persistent data, secure authorization, immutable versions and attributed remixes, while retaining the current distinctive ScentLab design.
