import { Link } from 'react-router-dom'
import { siteConfig } from '../config/site'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found - Chyi',
    description: 'The page you are looking for does not exist in the React portfolio site.',
    themeColor: '#0A0A0A',
    image: siteConfig.defaultOgImage,
  })

  return (
    <main className="min-h-screen bg-site-bg px-6 py-24 text-site-text md:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl border border-site-border bg-white/[0.02] p-8 md:p-12">
        <p className="mb-4 text-xs uppercase tracking-[0.18em] text-site-tertiary">404</p>
        <h1 className="text-4xl font-bold tracking-[-0.03em] md:text-6xl">Page not found.</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-site-secondary">
          The route you opened does not exist in the migrated React portfolio. You can go
          back to the homepage or jump directly into the main case studies.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm border border-site-border px-5 py-3 text-sm tracking-[0.06em] text-site-text transition-colors hover:border-site-secondary"
          >
            <span aria-hidden="true">←</span>
            Back to portfolio
          </Link>

          <Link
            to="/projects/strata"
            className="inline-flex items-center gap-2 rounded-sm border border-site-border px-5 py-3 text-sm tracking-[0.06em] text-site-text transition-colors hover:border-site-secondary"
          >
            Open STRATA
          </Link>
        </div>
      </div>
    </main>
  )
}
