import { useEffect, useState } from 'react'

type HeroWorkPanelProps = {
  scrollHintHidden: boolean
}

const heroRoles = ['Product Designer', 'UX Engineer', 'AI Driven Product Designer', 'Vibe Coder']
const heroLoopRoles = [...heroRoles, heroRoles[0]]
const heroRoleIntervalMs = 2450

export function HeroWorkPanel({ scrollHintHidden }: HeroWorkPanelProps) {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePreference = () => {
      setReduceMotion(media.matches)
    }

    updatePreference()
    media.addEventListener('change', updatePreference)

    return () => {
      media.removeEventListener('change', updatePreference)
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setActiveRoleIndex(0)
      setTransitionEnabled(false)
      return
    }

    const timer = window.setInterval(() => {
      setTransitionEnabled(true)
      setActiveRoleIndex((previous) => previous + 1)
    }, heroRoleIntervalMs)

    return () => {
      window.clearInterval(timer)
    }
  }, [reduceMotion])

  return (
    <div className="hero-grid-home hero-grid-home-single">
      <div className="hero-left-home hero-left-home-wide fade-up-home">
        <h1 className="hero-name-home">Xuchen Qi</h1>
        <p className="hero-bio-home">
          A{' '}
          <span
            className="hero-role-slot-home"
            aria-label={heroRoles[activeRoleIndex === heroRoles.length ? 0 : activeRoleIndex]}
          >
            <span className="hero-role-measure-home" aria-hidden="true">
              Product Designer
            </span>
            <span className="hero-role-viewport-home" aria-hidden="true">
              <span
                className={`hero-role-track-home${reduceMotion ? ' reduced-motion' : ''}${transitionEnabled ? '' : ' no-transition'}`}
                style={{ transform: `translateY(calc(-1 * var(--hero-role-step) * ${activeRoleIndex}))` }}
                onTransitionEnd={() => {
                  if (!reduceMotion && activeRoleIndex === heroRoles.length) {
                    setTransitionEnabled(false)
                    setActiveRoleIndex(0)
                  }
                }}
              >
                {heroLoopRoles.map((role, index) => (
                  <span key={`${role}-${index}`} className="hero-role-item-home">
                    {role}
                  </span>
                ))}
              </span>
            </span>
          </span>{' '}
          specialising in <em>complex interactive systems,</em> with 3+ years delivering
          human-centred products from research to production, and{' '}
          <em>leveraging AI to design and ship them directly.</em>
        </p>
        <div className="hero-cta-home">
          <a href="#projects" className="button-home button-home-primary">
            View Work
          </a>
          <a href="#contact" className="button-home button-home-secondary">
            Get in Touch
          </a>
        </div>
      </div>

      <div className={scrollHintHidden ? 'hero-scroll-hint-home hidden' : 'hero-scroll-hint-home'}>
        <span aria-hidden="true">↓</span>
        <span>Scroll</span>
      </div>
    </div>
  )
}
