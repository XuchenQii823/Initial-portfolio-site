import type { FormEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import ColorBends from '../components/background/ColorBends'
import { AboutSection } from '../components/home/AboutSection'
import { ContactSection } from '../components/home/ContactSection'
import { HomeFooter } from '../components/home/HomeFooter'
import { HeroWorkPanel } from '../components/home/HeroWorkPanel'
import { HomeNav } from '../components/home/HomeNav'
import { ProjectsSection } from '../components/home/ProjectsSection'
import {
  homeNavItems,
  type ProjectTab,
} from '../data/home'
import { siteConfig } from '../config/site'
import { useHomeScrollState } from '../hooks/useHomeScrollState'
import { usePageMeta } from '../hooks/usePageMeta'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export function HomePage() {
  const moduleGapPx = Math.round((0.5 / 2.54) * 96)
  const navTopInsetPx = 16
  const navBarHeightPx = 56
  const sectionTopPaddingPx = 120
  const moduleSnapOffset =
    navTopInsetPx + navBarHeightPx + moduleGapPx - sectionTopPaddingPx
  const extendedModuleOffset = moduleSnapOffset + moduleGapPx

  const [projectTab, setProjectTab] = useState<ProjectTab>('ux')
  const [messageSent, setMessageSent] = useState(false)
  const { activeSection, scrollHintHidden } = useHomeScrollState()
  const snapTimeoutRef = useRef<number | null>(null)
  const snappingRef = useRef(false)
  const releaseTimeoutRef = useRef<number | null>(null)

  const heroTab = useMemo(
    () => (activeSection === 'about' || activeSection === 'contact' ? 'info' : 'work'),
    [activeSection],
  )
  const backgroundMuted = activeSection !== 'home'

  const cancelHomeScrollEffects = () => {
    if (snapTimeoutRef.current !== null) {
      window.clearTimeout(snapTimeoutRef.current)
      snapTimeoutRef.current = null
    }

    if (releaseTimeoutRef.current !== null) {
      window.clearTimeout(releaseTimeoutRef.current)
      releaseTimeoutRef.current = null
    }

    snappingRef.current = false
  }

  const getSectionSnapOffset = (sectionId: string) => {
    if (sectionId === 'projects' || sectionId === 'contact') {
      return extendedModuleOffset
    }

    return moduleSnapOffset
  }

  useEffect(() => {
    const sectionIds = ['projects', 'about', 'contact']
    const snapThreshold = 270

    const handleScroll = () => {
      if (snappingRef.current) return

      if (snapTimeoutRef.current !== null) {
        window.clearTimeout(snapTimeoutRef.current)
        snapTimeoutRef.current = null
      }

      snapTimeoutRef.current = window.setTimeout(() => {
        const currentY = window.scrollY
        if (currentY < 120) return

        const candidates = sectionIds
          .map((id) => document.getElementById(id))
          .filter((element): element is HTMLElement => Boolean(element))
          .map((element) => {
            const sectionOffset = getSectionSnapOffset(element.id)
            const targetY = Math.max(
              element.getBoundingClientRect().top + window.scrollY - sectionOffset,
              0,
            )
            return { element, targetY, distance: Math.abs(window.scrollY - targetY) }
          })

        const nearest = candidates.reduce<(typeof candidates)[number] | null>((best, candidate) => {
          if (!best || candidate.distance < best.distance) return candidate
          return best
        }, null)

        if (!nearest || nearest.distance > snapThreshold || nearest.distance < 12) return

        snappingRef.current = true
        window.scrollTo({ top: nearest.targetY, behavior: 'smooth' })

        if (releaseTimeoutRef.current !== null) {
          window.clearTimeout(releaseTimeoutRef.current)
          releaseTimeoutRef.current = null
        }

        releaseTimeoutRef.current = window.setTimeout(() => {
          snappingRef.current = false
        }, 860)
      }, 280)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelHomeScrollEffects()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [extendedModuleOffset, moduleSnapOffset])

  useRevealOnScroll()
  usePageMeta({
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    themeColor: siteConfig.defaultThemeColor,
    image: siteConfig.defaultOgImage,
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim() || 'Portfolio visitor'
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = `Portfolio inquiry from ${name}`
    const body = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n')

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    event.currentTarget.reset()
    setMessageSent(true)
    window.setTimeout(() => setMessageSent(false), 2400)
  }

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const element = document.getElementById(id)
    if (!element) return

    const sectionOffset = getSectionSnapOffset(id)
    const nextTop = Math.max(
      element.getBoundingClientRect().top + window.scrollY - sectionOffset,
      0,
    )

    window.scrollTo({ top: nextTop, behavior: 'smooth' })
  }

  return (
    <main
      className={`home-shell-home min-h-screen bg-site-bg text-site-text${backgroundMuted ? ' home-shell-home-muted' : ''}`}
    >
      <div className="home-background-home" aria-hidden="true">
        <ColorBends
          className="home-background-canvas-home"
          colors={['#ff5c7a', '#8a5cff', '#00ffd1']}
          rotation={0}
          speed={0.2}
          scale={0.7}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.9}
          noise={0.69}
          transparent
          autoRotate={0}
        />
        <div className="home-background-overlay-home" />
      </div>

      <HomeNav
        activeSection={activeSection}
        navItems={homeNavItems}
        onSelectSection={scrollToSection}
      />

      <section id="home" className="home-hero-section">
        <div className="hero-tabs-home">
          <button
            type="button"
            className={heroTab === 'work' ? 'tab-button-home active' : 'tab-button-home'}
            onClick={() => scrollToSection('home')}
          >
            Work
          </button>
          <button
            type="button"
            className={heroTab === 'info' ? 'tab-button-home active' : 'tab-button-home'}
            onClick={() => scrollToSection('about')}
          >
            Info
          </button>
        </div>

        <HeroWorkPanel scrollHintHidden={scrollHintHidden} />
      </section>

      <ProjectsSection
        projectTab={projectTab}
        onTabChange={setProjectTab}
        onProjectNavigate={cancelHomeScrollEffects}
      />
      <AboutSection />
      <ContactSection messageSent={messageSent} onSubmit={handleSubmit} />
      <HomeFooter />
    </main>
  )
}
