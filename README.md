# Chyi Portfolio React

React migration of the Chyi portfolio site, rebuilt from the original static HTML version with:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Vite is configured with `server.host = true`, so the site can also be previewed from another device on the same network.

## Environment Variables

Create a local env file from `.env.example`:

```bash
cp .env.example .env.local
```

Then set:

```bash
VITE_SITE_URL=https://your-domain.com
VITE_CONTACT_EMAIL=you@example.com
```

`VITE_SITE_URL` is used to generate:

- `sitemap.xml`
- `robots.txt`
- canonical URLs
- Open Graph absolute image URLs

`VITE_CONTACT_EMAIL` is used by the contact section and the `mailto:` draft flow.

## Build

Production build:

```bash
npm run build
```

The build pipeline also generates:

- `public/sitemap.xml`
- `public/robots.txt`
- `public/site.webmanifest`
- `public/_redirects`

## Deployment

For the step-by-step release and maintenance workflow, see [`DEPLOYMENT.md`](/Users/chyi/Documents/Playground/chyi-portfolio-react/DEPLOYMENT.md).

### Recommended Setup: Vercel + GitHub

This project is best deployed as a static Vite site on Vercel, with GitHub as the single source of truth.

Recommended production workflow:

1. Create a GitHub repository for `chyi-portfolio-react`.
2. Add the GitHub remote locally and push the production branch:

```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

3. Import the repository into Vercel.
4. Set the project root to `chyi-portfolio-react`.
5. Configure the environment variables in Vercel:
   - `VITE_SITE_URL`
   - `VITE_CONTACT_EMAIL`
6. Deploy once to a `*.vercel.app` preview domain.
7. Connect the final custom domain.
8. Update `VITE_SITE_URL` to the final production domain and redeploy.

Branch strategy:

- `main` = production
- any feature branch or pull request = Vercel preview deployment

### Vercel

This repo includes [`vercel.json`](/Users/chyi/Documents/Playground/chyi-portfolio-react/vercel.json) with:

- SPA rewrite to `index.html`
- immutable caching for `/assets/*`

Recommended settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

Set the same environment variables in the Vercel dashboard:

- `VITE_SITE_URL`
- `VITE_CONTACT_EMAIL`

Vercel is the recommended default because:

- this project is already a static Vite build
- route rewrites are already configured
- preview deployments are useful for content and design review
- rollback is simpler than manual static hosting

### Netlify

This repo includes [`netlify.toml`](/Users/chyi/Documents/Playground/chyi-portfolio-react/netlify.toml) and generated `_redirects` for SPA routing.

Recommended settings:

- Build command: `npm run build`
- Publish directory: `dist`

Set the same environment variables in the Netlify dashboard:

- `VITE_SITE_URL`
- `VITE_CONTACT_EMAIL`

## Project Structure

```text
src/
  components/
    case-study/
    common/
    home/
  config/
  data/
  hooks/
  pages/
public/
  assets/
scripts/
```

## Notes

- Case study pages are data-driven from `src/data/caseStudies.ts`.
- The homepage content and navigation data live in `src/data/home.tsx`.
- Photography content is driven by `src/data/photography.ts`.
- Images use a shared safe loader with fallback UI and loading priority control.
- Static assets from the legacy portfolio are served from `public/assets`.
- The current contact flow is `mailto:` based, so no backend form service is required for launch.
