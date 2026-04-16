import { industrialPlaceholders, type ProjectTab, uxProjects } from '../../data/home'
import { ProjectCard } from './ProjectCard'
import { SectionLabel } from './SectionLabel'

type ProjectsSectionProps = {
  projectTab: ProjectTab
  onTabChange: (tab: ProjectTab) => void
  onProjectNavigate: () => void
}

export function ProjectsSection({ projectTab, onTabChange, onProjectNavigate }: ProjectsSectionProps) {
  return (
    <section id="projects" className="home-section-home section-divider-home">
      <SectionLabel>Selected Work</SectionLabel>

      <div className="projects-tabs-home">
        <button
          type="button"
          className={projectTab === 'ux' ? 'tab-button-home active' : 'tab-button-home'}
          onClick={() => onTabChange('ux')}
        >
          UX &amp; UI Design
        </button>
        <button
          type="button"
          className={projectTab === 'ai' ? 'tab-button-home active' : 'tab-button-home'}
          onClick={() => onTabChange('ai')}
        >
          AI Driven Product Design
        </button>
        <button
          type="button"
          className={projectTab === 'id' ? 'tab-button-home active' : 'tab-button-home'}
          onClick={() => onTabChange('id')}
        >
          Industrial Design
        </button>
      </div>

      {projectTab === 'ux' ? (
        <div className="projects-list-home">
          {uxProjects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              reverse={index % 2 !== 0}
              onNavigate={onProjectNavigate}
            />
          ))}
        </div>
      ) : projectTab === 'id' ? (
        <div className="id-panel-home">
          <h3>Industrial Design</h3>
          <p>
            A collection of product design, form studies, and industrial design projects.
            Case studies currently being prepared — check back soon.
          </p>
          <div className="id-grid-home">
            {industrialPlaceholders.map((item) => (
              <div key={item} className="id-card-home">
                Project
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="id-panel-home">
          <h3>AI Driven Product Design</h3>
          <p>
            A collection of AI-enabled product design projects focused on prototyping, workflow
            automation, and production-ready interactive systems. Case studies currently being
            prepared — check back soon.
          </p>
          <div className="id-grid-home">
            {industrialPlaceholders.map((item) => (
              <div key={`ai-${item}`} className="id-card-home">
                Project
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
