# Upload ScentLab to GitHub, then import it into Emergent

Your GitHub profile: https://github.com/SudhaMondal

## 1. Create a repository

1. Open https://github.com/new while signed in.
2. Repository name: `scentlab`.
3. Choose Private or Public (either works for an import if Emergent has permission to access it).
4. Do not initialize it with a README, `.gitignore`, or license; this ZIP already contains the project files.
5. Create the repository.

## 2. Upload this project's files

1. Download and unzip `scentlab-github-import.zip`.
2. Open the extracted folder. You should see `package.json`, `README.md`, `app/`, `components/`, `lib/`, and `supabase/` immediately inside it.
3. In your new GitHub repository, choose **Add file → Upload files**.
4. Drag the CONTENTS of the extracted folder into the upload area. Do not upload an extra enclosing `scentlab` folder.
5. Commit the upload to the `main` branch.

The important check: `package.json` must be at the repository root. The repository URL will look like `https://github.com/SudhaMondal/scentlab`.

## 3. Import into Emergent

1. Open Emergent.
2. Choose **Import Project → Frontends, backends or agents from a repository**.
3. Connect/authorize GitHub if prompted.
4. Select `SudhaMondal/scentlab` and the `main` branch.
5. Start the import and let Emergent inspect the repository.
6. After import, open `EMERGENT_BUILD_PROMPT.md` in the repository and give its contents to the Emergent agent. It tells the agent to continue the existing work and implement the real two-account journey rather than replacing the project.

## 4. Environment variables

The starter includes `.env.example`. When you configure Supabase, add the actual values through Emergent's environment/secrets settings, not by committing them to GitHub:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Configure Google OAuth and the Supabase redirect/callback URLs in the Supabase and Google provider dashboards once the app's deployed URL is known. Never put a Supabase service-role key in browser-exposed variables.

## What this package is

This is the importable source available in this workspace, with the current Brew Lab milestone and SQL schema foundation. It is not a download of the private code or managed backend from an existing Emergent preview. The `/journey` publishing, brew logs, and remix interactions are currently browser-local demo behavior; the fake persona selector is not real authentication. The handoff prompt asks Emergent to connect real accounts, persistence, RLS, immutable versioning, and moderation.
