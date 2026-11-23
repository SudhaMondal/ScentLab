# ScentLab — a perfume-making discovery & maker workbench

ScentLab is a responsive Next.js App Router application for exploring perfume concepts, learning fragrance vocabulary, scaling formula examples, and recording personal experiments.

## Included features

- Ingredient-first recipe search across titles, notes, tags, descriptions and materials.
- Seeded recipe library with rosemary, chocolate/cacao, rose and amber concepts.
- Recipe detail pages with ingredient quantities, process notes and a batch calculator.
- Create-your-own recipe form with multiple ingredient rows and method notes.
- My Lab: locally saved creations and bookmarked recipes.
- Maker profile editor and community wall with posts and appreciations.
- Scent Codex reference page.
- Responsive editorial / Pinterest-inspired visual system.
- GitHub Actions workflow that builds and deploys the static site to GitHub Pages.

## Important publishing and data limitations

This repository is configured for **GitHub Pages static hosting**. GitHub Pages serves static files; it does not run a Node server or provide a database. Therefore the current edition stores maker profile details, submitted recipes, bookmarks and community wall posts in the visitor's browser (`localStorage`). These items are private to that browser/device and are not shared with other visitors, synced across devices, or protected by server-side accounts. The profile editor is not secure authentication.

For a true global multi-user community (email/password and Google sign-in, shared recipe publishing, comments, follows, moderation and cross-device persistence), connect a hosted backend such as Supabase and implement Row Level Security policies. Do not put a Supabase service-role key in client code. The app is usable as a local-first public MVP while that backend work is pending; it must not be marketed as a fully shared social network yet.

## Perfume safety notice

Seeded quantities and ingredient names are synthetic UI demonstration data, not validated manufacturing formulas, dermal-safety assessments, IFRA conformity statements, or instructions for use on skin or for sale. Real formulations require exact material identities, supplier documentation, stock concentrations, solvent/carrier details, intended-use category and qualified safety review against current applicable standards. User-submitted recipes are not independently verified.

## Deploy to GitHub Pages

1. Push the contents of this repository to the `main` branch of `SudhaMondal/ScentLab`.
2. In GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. The workflow at `.github/workflows/deploy-pages.yml` installs dependencies, runs the Next.js static export with the `/ScentLab` base path, and deploys the `out/` directory.
4. After the workflow succeeds, the expected URL is `https://sudhamondal.github.io/ScentLab/`.

The project uses `output: "export"` in `next.config.ts`, with the repository base path enabled only for the Pages workflow.

## Run locally

Requirements: Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run typecheck
npm run build
```

For a local Pages-path export on Linux/macOS:

```bash
GITHUB_PAGES=true npm run build
```

## Project structure

- `app/` — routes and global styling
- `components/` — navigation, recipe cards and discovery UI
- `lib/recipes.ts` — seeded demo recipe data
- `lib/local-store.ts` — browser-local persistence helpers
- `.github/workflows/deploy-pages.yml` — GitHub Pages build/deploy pipeline

No secrets or backend credentials are required for the local-first edition.
