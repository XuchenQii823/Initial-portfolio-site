# Deployment and Maintenance Guide

This is the operational guide for shipping and maintaining the Chyi portfolio.

Default recommendation:

- Hosting: **Vercel**
- Source of truth: **GitHub**
- Production branch: **main**
- Maintenance model: **edit repo content directly, do not add a CMS yet**

## Before First Deploy

1. Create the GitHub repository and push the project.

```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Create production environment variables.

```bash
VITE_SITE_URL=https://your-domain.com
VITE_CONTACT_EMAIL=you@example.com
```

3. Install dependencies and verify the build locally.

```bash
npm install
npm run build
```

4. Check the generated files inside `dist/`:

- `index.html`
- `sitemap.xml`
- `robots.txt`
- `site.webmanifest`
- `_redirects`

5. Validate the main routes locally:

- `/`
- `/projects/strata`
- `/projects/dimension`
- `/projects/vitrum`
- `/photography`
- an invalid path such as `/test-404`

## Vercel

Reference: [Vercel Vite docs](https://vercel.com/docs/frameworks/frontend/vite), [Vercel rewrites docs](https://vercel.com/docs/rewrites)

Project settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
- Root directory: `chyi-portfolio-react` if this project lives inside a larger parent repo

Environment variables:

- `VITE_SITE_URL`
- `VITE_CONTACT_EMAIL`

Repo config already included:

- [`vercel.json`](/Users/chyi/Documents/Playground/chyi-portfolio-react/vercel.json)
- SPA rewrite for app routes
- immutable caching for `/assets/*`
- basic security headers

Recommended first-release flow:

1. Import the GitHub repository into Vercel.
2. Set the environment variables.
3. Deploy to the default `*.vercel.app` domain first.
4. Validate route refresh on a case study path such as `/projects/strata`.
5. Confirm page metadata with browser devtools or a metadata preview tool.
6. Bind the production domain.
7. Update `VITE_SITE_URL` to the final production domain.
8. Redeploy once so `sitemap.xml`, `robots.txt`, and absolute URLs use the correct origin.

Recommended ongoing release flow:

1. Make changes on a branch.
2. Push branch changes to GitHub.
3. Review the Vercel preview deployment.
4. Merge to `main`.
5. Let Vercel deploy production automatically.

## Netlify

Reference: [Netlify Vite docs](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/), [Netlify SPA rewrites docs](https://docs.netlify.com/build/configure-builds/javascript-spas/)

Site settings:

- Build command: `npm run build`
- Publish directory: `dist`

Environment variables:

- `VITE_SITE_URL`
- `VITE_CONTACT_EMAIL`

Repo config already included:

- [`netlify.toml`](/Users/chyi/Documents/Playground/chyi-portfolio-react/netlify.toml)
- generated [`public/_redirects`](/Users/chyi/Documents/Playground/chyi-portfolio-react/public/_redirects)
- immutable caching for `/assets/*`
- basic security headers

Recommended release flow:

1. Deploy a preview.
2. Refresh direct SPA routes to confirm rewrite behavior.
3. Confirm long image pages and video overlays still render correctly.
4. Promote to production.

## Ongoing Content Updates

Most maintenance should happen only in these locations:

- [`src/data/home.tsx`](/Users/chyi/Documents/Playground/chyi-portfolio-react/src/data/home.tsx)
- [`src/data/caseStudies.ts`](/Users/chyi/Documents/Playground/chyi-portfolio-react/src/data/caseStudies.ts)
- [`src/data/photography.ts`](/Users/chyi/Documents/Playground/chyi-portfolio-react/src/data/photography.ts)
- [`src/config/site.ts`](/Users/chyi/Documents/Playground/chyi-portfolio-react/src/config/site.ts)
- `public/assets/images/...`
- `public/assets/videos/...`

Recommended update workflow:

1. Replace assets or update text.
2. Run `npm run build`.
3. Check the changed pages locally.
4. Deploy to preview first.
5. Publish after visual QA.

Common maintenance tasks:

- Homepage or About copy:
  - update [`src/data/home.tsx`](/Users/chyi/Documents/Playground/chyi-portfolio-react/src/data/home.tsx)
- Case study text, chapters, media overlays:
  - update [`src/data/caseStudies.ts`](/Users/chyi/Documents/Playground/chyi-portfolio-react/src/data/caseStudies.ts)
- Photography additions:
  - add image files under `public/assets/images/Photography/`
  - add matching `src / width / height` entries in [`src/data/photography.ts`](/Users/chyi/Documents/Playground/chyi-portfolio-react/src/data/photography.ts)
- Site-wide metadata or email fallback:
  - update [`src/config/site.ts`](/Users/chyi/Documents/Playground/chyi-portfolio-react/src/config/site.ts)
- Contact email for production:
  - prefer updating `VITE_CONTACT_EMAIL` in Vercel instead of hardcoding a new address

What not to do yet:

- Do not add a CMS right now.
- Do not add a backend form service unless you want to replace the current `mailto:` flow.
- Keep this project repo-driven until content changes become too frequent for GitHub-based updates.

## When You Add New Routes

Update these places together:

1. [`src/App.tsx`](/Users/chyi/Documents/Playground/chyi-portfolio-react/src/App.tsx)
2. [`scripts/generate-static-files.mjs`](/Users/chyi/Documents/Playground/chyi-portfolio-react/scripts/generate-static-files.mjs)
3. navigation data if needed
4. metadata for the new page

If you skip step 2, the sitemap will fall behind the actual routes.

## When You Replace Cover Images

Update these places together:

1. case study or home data source
2. metadata image source for the page if needed
3. visual QA for crop, loading priority, and fallback state

## Final QA Before Production

- Desktop homepage
- Mobile homepage menu
- All case study page counters and sidebars
- Hotspot link on STRATA
- Video overlays on Dimension and Vitrum
- WeChat modal
- WhatsApp modal
- Contact mailto flow
- 404 page
- Direct refresh on `/projects/strata`, `/projects/dimension`, `/projects/vitrum`, and `/photography`
- `sitemap.xml`, `robots.txt`, and `site.webmanifest` load correctly on the production domain
