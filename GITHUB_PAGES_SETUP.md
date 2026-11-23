# ScentLab GitHub Pages setup

The site is a Next.js static export. Do not point Vercel at this repository unless you deliberately configure a separate server deployment. GitHub Pages is the intended host.

1. Upload all files and folders in this project to the root of `SudhaMondal/ScentLab` on `main` (including hidden `.github` and `.nojekyll` files).
2. In repository Settings → Pages, choose **GitHub Actions** as the source.
3. Open Actions and watch **Deploy ScentLab to GitHub Pages**. The first run may need approval depending on repository settings.
4. When the deployment job succeeds, open `https://sudhamondal.github.io/ScentLab/`.

If the workflow fails, open the failed job and share the complete first error block. Do not create a second workflow or change the base path until the error is understood.
