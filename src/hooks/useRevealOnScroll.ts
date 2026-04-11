import { useEffect } from 'react'

export function useRevealOnScroll(selector = '.reveal') {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))
    const revealElement = (element: HTMLElement) => {
      element.classList.add('reveal-visible')
    }

    const isNearViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect()
      return rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.05
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target as HTMLElement)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.01, rootMargin: '0px 0px -8% 0px' },
    )

    elements.forEach((element) => {
      if (isNearViewport(element)) {
        revealElement(element)
        return
      }

      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [selector])
}
