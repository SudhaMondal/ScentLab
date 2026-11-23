# Publish ScentLab with GitLab Pages

This repository is configured for GitLab Pages. The CI job builds the Next.js app as a static export and publishes it from `public/`. GitLab's `CI_PAGES_URL` is used to set the correct asset path for either a project URL or a unique Pages domain.

## Publish

1. Upload/commit the contents of this folder to the root of your GitLab project (not the enclosing folder).
2. Keep the default branch as `main` (or change the pipeline rule in `.gitlab-ci.yml` to match your default branch).
3. Open **Build → Pipelines** and wait for the `pages` job to pass.
4. Open **Deploy → Pages** to copy the live website URL.

If no pipeline starts, check **Settings → CI/CD** for available shared runners and **Settings → General → Visibility, project features, permissions** to ensure Pages is enabled.

## Important functionality boundary

GitLab Pages is static hosting. This edition's profiles, created recipes, bookmarks and community posts are stored in each visitor's browser, not in a shared database. Real shared accounts and cross-device community features require a hosted backend such as Supabase; do not put service-role secrets in browser code.
