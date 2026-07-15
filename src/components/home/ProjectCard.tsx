import { Link } from 'react-router-dom'
import { SafeImage } from '../common/SafeImage'
import type { ProjectCard as ProjectCardType } from '../../data/home'

type ProjectCardProps = {
  project: ProjectCardType
  reverse: boolean
  onNavigate?: () => void
}

export function ProjectCard({ project, reverse, onNavigate }: ProjectCardProps) {
  const content = (
    <>
      <div className={reverse ? 'project-media-home project-media-home-order' : 'project-media-home'}>
        {project.image ? (
          <SafeImage
            src={project.image}
            alt={project.title}
            className="project-image-home"
            loading="eager"
            fetchPriority="high"
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
          href={project.href}
          className={className}
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
