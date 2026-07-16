import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { SafeImage } from '../common/SafeImage'
import type { ProjectCard as ProjectCardType } from '../../data/home'

type ProjectCardProps = {
  project: ProjectCardType
  reverse: boolean
  priority?: boolean
  onNavigate?: () => void
}

const prefetchedDocuments = new Set<string>()
const prefetchedAssets = new Set<string>()

function appendPrefetch(href: string, as: 'document' | 'script' | 'style') {
  if (prefetchedAssets.has(href)) return

  prefetchedAssets.add(href)
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  link.as = as
  document.head.append(link)
}

async function prefetchDocument(href: string) {
  const absoluteHref = new URL(href, window.location.href).href
  if (prefetchedDocuments.has(absoluteHref)) return

  prefetchedDocuments.add(absoluteHref)
  appendPrefetch(absoluteHref, 'document')

  try {
    const response = await fetch(absoluteHref, { credentials: 'same-origin' })
    if (!response.ok) return

    const markup = await response.text()
    const parsed = new DOMParser().parseFromString(markup, 'text/html')

    parsed.querySelectorAll<HTMLScriptElement>('script[src]').forEach((script) => {
      appendPrefetch(new URL(script.src, response.url).href, 'script')
    })
    parsed.querySelectorAll<HTMLLinkElement>('link[rel="modulepreload"][href]').forEach((module) => {
      appendPrefetch(new URL(module.href, response.url).href, 'script')
    })
    parsed.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][href]').forEach((stylesheet) => {
      appendPrefetch(new URL(stylesheet.href, response.url).href, 'style')
    })
  } catch {
    prefetchedDocuments.delete(absoluteHref)
  }
}

export function ProjectCard({ project, reverse, priority = false, onNavigate }: ProjectCardProps) {
  const documentLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (project.navigation !== 'document' || !project.href || !documentLinkRef.current) return

    const link = documentLinkRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        void prefetchDocument(project.href!)
        observer.disconnect()
      },
      { rootMargin: '700px 0px' },
    )

    observer.observe(link)
    return () => observer.disconnect()
  }, [project.href, project.navigation])

  const content = (
    <>
      <div className={reverse ? 'project-media-home project-media-home-order' : 'project-media-home'}>
        {project.image ? (
          <SafeImage
            src={project.image}
            alt={project.title}
            className="project-image-home"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            sizes="(min-width: 1024px) 40vw, 100vw"
            fallbackClassName="project-placeholder-home"
            fallbackLabel={project.title}
          />
        ) : (
          <div className="project-placeholder-home" />
        )}
        {project.comingSoon ? <span className="coming-soon-badge-home">Coming Soon</span> : null}
      </div>

      <div className={reverse ? 'project-copy-home project-copy-home-align' : 'project-copy-home'}>
        <p className="project-number-home">{project.number}</p>
        <h3 className="project-title-home">{project.title}</h3>
        {project.subtitle ? <p className="project-subtitle-home">{project.subtitle}</p> : null}
        <p className="project-description-home">{project.description}</p>
        <div className={reverse ? 'project-tags-home project-tags-home-align' : 'project-tags-home'}>
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag-home">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  const className = project.comingSoon
    ? 'project-row-home project-row-home-coming-soon'
    : 'project-row-home'

  if (project.href) {
    if (project.navigation === 'document') {
      return (
        <a
          ref={documentLinkRef}
          href={project.href}
          className={className}
          onMouseEnter={() => void prefetchDocument(project.href!)}
          onFocus={() => void prefetchDocument(project.href!)}
          onTouchStart={() => void prefetchDocument(project.href!)}
          onClick={() => {
            onNavigate?.()
          }}
        >
          {content}
        </a>
      )
    }

    return (
      <Link
        to={project.href}
        className={className}
        onClick={() => {
          onNavigate?.()
        }}
      >
        {content}
      </Link>
    )
  }

  return <div className={className}>{content}</div>
}
