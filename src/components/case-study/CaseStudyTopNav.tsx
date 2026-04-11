import { useNavigate } from 'react-router-dom'

type CaseStudyTopNavProps = {
  title: string
  counter: string
  surfaceColor: string
}

export function CaseStudyTopNav({ title, counter, surfaceColor: _surfaceColor }: CaseStudyTopNavProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/', { replace: true })
  }

  return (
    <nav className="case-top-nav">
      <div className="case-top-nav-bar">
        <button type="button" onClick={handleBack} className="case-top-nav-back">
          <span aria-hidden="true">←</span>
          Back to Projects
        </button>

        <span className="case-top-nav-title">{title}</span>

        <span className="case-top-nav-counter">{counter}</span>
      </div>
    </nav>
  )
}
