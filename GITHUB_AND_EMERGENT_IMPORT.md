# Upload ScentLab to GitHub and import it into Emergent

GitHub profile: https://github.com/SudhaMondal

## Part 1 — Create the GitHub repository

1. Sign in to GitHub.
2. Visit https://github.com/new
3. Repository name: `scentlab`
4. Choose Public or Private.
5. Leave **Add a README**, `.gitignore` and license unchecked because this package already includes those files.
6. Click **Create repository**.

## Part 2 — Upload this project

1. Download `scentlab-github-import.zip`.
2. Extract the ZIP on your computer.
3. Open the extracted `scentlab-github-import` folder.
4. Select everything inside it (`app`, `components`, `lib`, `package.json`, `README.md`, etc.).
5. In your empty GitHub repository, choose **Add file → Upload files**.
6. Drag the selected contents into GitHub. Do not upload an extra parent folder.
7. Commit the files to the `main` branch.

Check the repository homepage: `package.json`, `app/`, `components/`, `lib/` and `EMERGENT_BUILD_PROMPT.md` should be visible at the repository root.

Your repository URL will be:

`https://github.com/SudhaMondal/scentlab`

## Part 3 — Import into Emergent

1. Open Emergent.
2. Choose **Import Project** (the option for importing a project from a GitHub repository).
3. Connect or authorize your GitHub account if asked.
4. Select `SudhaMondal/scentlab` and branch `main`.
5. Let Emergent inspect and import the repository.
6. Open `EMERGENT_BUILD_PROMPT.md` in the imported project.
7. Copy the complete contents of that file into the Emergent agent and ask it to implement the brief in stages.
8. Ask Emergent to inspect and run the project before making large changes. Keep a checkpoint/commit before each major implementation stage.

## Part 4 — Configure Supabase later

The UI starter can be explored before authentication is configured. For real accounts and community persistence, create a Supabase project and add these values in Emergent's environment/secrets settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Then configure Google OAuth in Supabase and Google Cloud using the callback URL supplied by Supabase. Ask Emergent to document the exact redirect URLs for the deployed app.

Never commit `.env.local`, passwords, OAuth secrets or a Supabase service-role key. Never expose the service-role key in browser code.

## What to expect

This repository contains an actual Next.js application starter and working seeded discovery/detail UI. It is not yet a production social network. Real auth, server persistence, comments, follows, brew logs, remix attribution, moderation and analytics are specified in the Emergent prompt and still need implementation and verification.
