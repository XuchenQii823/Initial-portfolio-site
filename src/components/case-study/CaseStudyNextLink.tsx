import { Link } from 'react-router-dom'

type CaseStudyNextLinkProps = {
  href: string
  title: string
}

export function CaseStudyNextLink({ href, title }: CaseStudyNextLinkProps) {
  return (
    <Link
      to={href}
      className="flex items-center justify-between border-t border-site-border px-6 py-16 transition-opacity hover:opacity-70 md:px-24"
    >
      <div>
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-site-tertiary">
          Next Project
        </p>
        <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{title}</h2>
      </div>

      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-site-border text-site-secondary">
        →
      </span>
    </Link>
  )
}
