import { useEffect, useState } from 'react'

export function useHomeScrollState() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrollHintHidden, setScrollHintHidden] = useState(false)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))

    const updateScrollUi = () => {
      setScrollHintHidden(window.scrollY > 80)

      const targetLine = 120
      const matchedSection =
        window.scrollY < 80
          ? 'home'
          : sections.find((section) => {
              const rect = section.getBoundingClientRect()
              return rect.top <= targetLine && rect.bottom > targetLine
            })?.id

      setActiveSection((previous) => matchedSection ?? previous)
    }

    updateScrollUi()
    window.addEventListener('scroll', updateScrollUi, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollUi)
  }, [])

  return { activeSection, scrollHintHidden }
}
