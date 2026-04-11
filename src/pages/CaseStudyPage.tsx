import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { SafeImage } from '../components/common/SafeImage'
import { CaseStudyChapter } from '../components/case-study/CaseStudyChapter'
import { CaseStudyNextLink } from '../components/case-study/CaseStudyNextLink'
import { CaseStudySidebar } from '../components/case-study/CaseStudySidebar'
import { CaseStudyTopNav } from '../components/case-study/CaseStudyTopNav'
import { siteConfig } from '../config/site'
import { caseStudiesBySlug } from '../data/caseStudies'
import { usePageMeta } from '../hooks/usePageMeta'

const navHeight = 56

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: 'strata' | 'dimension' | 'vitrum' }>()
  const study = slug ? caseStudiesBySlug[slug] : undefined
  const [activeIndex, setActiveIndex] = useState(0)
  const [protectedUnlocked, setProtectedUnlocked] = useState(false)
  const [protectionModalOpen, setProtectionModalOpen] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [returningToSafeSection, setReturningToSafeSection] = useState(false)
  const [initialScrollSettled, setInitialScrollSettled] = useState(false)
  const bootstrapFrameRef = useRef<number | null>(null)
  const stableTopFramesRef = useRef(0)

  const sections = useMemo(() => {
    if (!study) return []

    return [
      { id: 'cover', label: 'Overview' },
      ...study.chapters.map((chapter) => ({ id: chapter.id, label: chapter.label })),
    ]
  }, [study])

  const protectedSectionIndex = useMemo(() => {
    if (!study?.protection) return -1
    return sections.findIndex((section) => section.id === study.protection?.protectedFromChapterId)
  }, [sections, study?.protection])

  const protectedChapterIds = useMemo(() => {
    if (!study?.protection) return new Set<string>()

    const startIndex = study.chapters.findIndex(
      (chapter) => chapter.id === study.protection?.protectedFromChapterId,
    )

    if (startIndex === -1) return new Set<string>()
    return new Set(study.chapters.slice(startIndex).map((chapter) => chapter.id))
  }, [study])

  const previousAccessibleSectionId = useMemo(() => {
    if (protectedSectionIndex <= 0) return 'cover'
    return sections[protectedSectionIndex - 1]?.id ?? 'cover'
  }, [protectedSectionIndex, sections])

  usePageMeta({
    title: study ? `${study.title} - Chyi` : 'Project - Chyi',
    description: study?.summary ?? 'Case study page from the Chyi portfolio.',
    themeColor: study?.background ?? '#0A0A0A',
    image: study?.cover.image ?? siteConfig.defaultOgImage,
  })

  useLayoutEffect(() => {
    setActiveIndex(0)
    setInitialScrollSettled(false)
    stableTopFramesRef.current = 0

    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    const previousScrollRestoration =
      typeof window !== 'undefined' && 'scrollRestoration' in window.history
        ? window.history.scrollRestoration
        : null

    root.style.scrollBehavior = 'auto'

    if (previousScrollRestoration) {
      window.history.scrollRestoration = 'manual'
    }

    resetToTop()

    let frameCount = 0
    const maxFrames = 24

    const settleAtTop = () => {
      resetToTop()
      frameCount += 1

      if (window.scrollY <= 1) {
        stableTopFramesRef.current += 1
      } else {
        stableTopFramesRef.current = 0
      }

      if (stableTopFramesRef.current >= 2 || frameCount >= maxFrames) {
        resetToTop()
        setActiveIndex(0)
        setInitialScrollSettled(true)
        return
      }

      bootstrapFrameRef.current = requestAnimationFrame(settleAtTop)
    }

    bootstrapFrameRef.current = requestAnimationFrame(settleAtTop)

    return () => {
      if (bootstrapFrameRef.current !== null) {
        cancelAnimationFrame(bootstrapFrameRef.current)
      }

      root.style.scrollBehavior = previousScrollBehavior

      if (previousScrollRestoration) {
        window.history.scrollRestoration = previousScrollRestoration
      }
    }
  }, [slug])

  useEffect(() => {
    if (!study || !initialScrollSettled) return

    const updateActiveSection = () => {
      const midpoint = window.innerHeight * 0.5
      let nextIndex = 0

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= midpoint) {
          nextIndex = index
        }
      })

      setActiveIndex(nextIndex)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [initialScrollSettled, sections, study])

  useEffect(() => {
    if (!study?.protection) {
      setProtectedUnlocked(false)
      setProtectionModalOpen(false)
      setPasswordInput('')
      setPasswordError('')
      setReturningToSafeSection(false)
      return
    }

    const unlocked =
      typeof window !== 'undefined' &&
      window.sessionStorage.getItem(study.protection.storageKey) === 'true'

    setProtectedUnlocked(unlocked)
    setProtectionModalOpen(false)
    setPasswordInput('')
    setPasswordError('')
    setReturningToSafeSection(false)
  }, [study])

  useEffect(() => {
    if (!study?.protection || protectedUnlocked || protectedSectionIndex === -1) return

    if (returningToSafeSection) {
      if (activeIndex < protectedSectionIndex) {
        setReturningToSafeSection(false)
      }
      return
    }

    if (activeIndex >= protectedSectionIndex) {
      setProtectionModalOpen(true)
    }
  }, [activeIndex, protectedSectionIndex, protectedUnlocked, returningToSafeSection, study?.protection])

  useEffect(() => {
    if (!protectionModalOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setReturningToSafeSection(true)
        setProtectionModalOpen(false)
        setPasswordInput('')
        setPasswordError('')
        requestAnimationFrame(() => {
          scrollToSection(previousAccessibleSectionId)
        })
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [previousAccessibleSectionId, protectionModalOpen])

  if (!study) {
    return <Navigate to="/" replace />
  }

  const scrollToSection = (id: string) => {
    if (study.protection && !protectedUnlocked && protectedChapterIds.has(id)) {
      setProtectionModalOpen(true)
      setPasswordInput('')
      setPasswordError('')
      id = study.protection.protectedFromChapterId
    }

    if (id === 'cover') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.getElementById(id)
    if (!target) return

    const nextTop = Math.max(target.getBoundingClientRect().top + window.scrollY - navHeight, 0)
    window.scrollTo({ top: nextTop, behavior: 'smooth' })
  }

  const handleProtectionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!study.protection) return

    if (passwordInput.trim() === study.protection.password) {
      setProtectedUnlocked(true)
      setProtectionModalOpen(false)
      setPasswordInput('')
      setPasswordError('')
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(study.protection.storageKey, 'true')
      }
      return
    }

    setPasswordError(study.protection.errorMessage)
  }

  const handleProtectionGoBack = () => {
    setReturningToSafeSection(true)
    setProtectionModalOpen(false)
    setPasswordInput('')
    setPasswordError('')
    scrollToSection(previousAccessibleSectionId)
  }

  const counter = `${String(activeIndex + 1).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')}`
  const navSurface = `${study.background}eb`

  return (
    <main
      className={`min-h-screen text-site-text case-study-${study.slug}`}
      style={{ backgroundColor: study.background }}
    >
      <CaseStudyTopNav title={study.title} counter={counter} surfaceColor={navSurface} />

      <CaseStudySidebar activeIndex={activeIndex} sections={sections} onSelect={scrollToSection} />

      <section id="cover" className="case-frame case-cover-frame page-scroll-target flex h-screen items-center justify-center overflow-hidden">
        <SafeImage
          src={study.cover.image}
          alt={study.cover.alt}
          className="h-full w-full object-contain"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          fallbackClassName="flex h-full w-full items-center justify-center bg-white/[0.04] text-center text-xs uppercase tracking-[0.18em] text-site-secondary"
          fallbackLabel={`${study.title} cover unavailable`}
        />
      </section>

      <div className="relative case-study-chapters">
        {study.chapters.map((chapter) => (
          <CaseStudyChapter
            key={chapter.id}
            chapter={chapter}
            locked={Boolean(study.protection && !protectedUnlocked && protectedChapterIds.has(chapter.id))}
          />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-20 bg-gradient-to-t from-black/60 to-transparent" />

      <CaseStudyNextLink href={study.nextProject.href} title={study.nextProject.title} />

      {study.protection && protectionModalOpen ? (
        <div className="case-protection-overlay" role="dialog" aria-modal="true" aria-labelledby="case-protection-title">
          <div className="case-protection-dialog">
            <h3 id="case-protection-title">{study.protection.title}</h3>
            <p>{study.protection.description}</p>

            <form className="case-protection-form" onSubmit={handleProtectionSubmit}>
              <label className="case-protection-helper" htmlFor="case-protection-password">
                {study.protection.helperText}
              </label>
              <input
                id="case-protection-password"
                type="password"
                value={passwordInput}
                onChange={(event) => {
                  setPasswordInput(event.target.value)
                  if (passwordError) setPasswordError('')
                }}
                placeholder={study.protection.inputPlaceholder}
                className="case-protection-input"
                autoFocus
              />
              {passwordError ? <div className="case-protection-error">{passwordError}</div> : null}
              <div className="case-protection-actions">
                <button type="submit" className="case-protection-submit">
                  {study.protection.submitLabel}
                </button>
                <button type="button" className="case-protection-secondary" onClick={handleProtectionGoBack}>
                  {study.protection.goBackLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}
