# ScentLab — perfume recipes, knowledge & community

ScentLab is a Next.js starter for a global perfume-making discovery hub. The product loop is:

**Find a note you love → explore a formula → scale a small batch → record what changed → share a credited remix.**

## Included in this repository

- Next.js App Router, React, TypeScript and Tailwind foundation.
- Responsive editorial Pinterest × playful Gen-Z visual direction.
- Ingredient-first recipe discovery with seeded rosemary, chocolate, rose and amber concepts.
- Search across ingredient names, tags, titles, descriptions and material lines.
- Distinction between **contains a cocoa material** and **smells like chocolate**.
- Recipe detail pages with ingredient lines, stock/dilution labels, process notes and a batch calculator.
- Create-recipe form UI (preview only; not persisted).
- Community conversation-starter page and Scent Codex.
- `.env.example` and a detailed `EMERGENT_BUILD_PROMPT.md` for the next implementation stage.

## Important implementation status

This is an importable application starter, not a production-ready social network. Recipe data is seeded in `lib/recipes.ts`. The create form is preview-only. Authentication, persistent publishing, comments, follows, brew logs, remix attribution, moderation and analytics are not yet connected. The Emergent handoff prompt specifies how to implement these features.

All quantities and ingredient names in the seeded recipes are **synthetic UI test data**. They are not real manufacturing instructions, validated formulas, dermally safe formulas, or evidence of IFRA conformity. Do not use them to make perfume for skin or sale. A real formula requires exact material identity, stock concentration, solvent/carrier, supplier documentation, intended-use category and qualified review against applicable current standards.

## Run locally

Requirements: Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

Type-check:

```bash
npm run typecheck
```

Build:

```bash
npm run build
```

No successful build is claimed by this package; run these commands in your environment and resolve any environment-specific issues.

## Environment

The starter includes these variable names:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Add real values only through Emergent's environment/secrets settings or a local `.env.local` file. Never commit secrets. Never expose a Supabase service-role key in browser code.

## Next step

Upload this repository to GitHub, import it into Emergent, then provide the full contents of `EMERGENT_BUILD_PROMPT.md` to the Emergent agent. The prompt asks Emergent to inspect the actual source first, preserve the existing UI, and complete the secure two-account workflow.
