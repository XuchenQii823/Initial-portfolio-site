import { useEffect } from 'react'

type PageMeta = {
  title: string
  description: string
  themeColor?: string
  image?: string
}

function ensureMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    Object.entries(attrs).forEach(([key, value]) => {
      element?.setAttribute(key, value)
    })
    document.head.appendChild(element)
  }

  return element
}

function ensureLink(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector)

  if (!element) {
    element = document.createElement('link')
    Object.entries(attrs).forEach(([key, value]) => {
      element?.setAttribute(key, value)
    })
    document.head.appendChild(element)
  }

  return element
}

export function usePageMeta({
  title,
  description,
  themeColor = '#0A0A0A',
  image,
}: PageMeta) {
  useEffect(() => {
    document.title = title
    const currentUrl = window.location.href
    const origin = window.location.origin
    const absoluteImage = image
      ? image.startsWith('http')
        ? image
        : `${origin}${image.startsWith('/') ? image : `/${image}`}`
      : ''

    const descriptionMeta = ensureMeta('meta[name="description"]', { name: 'description' })
    descriptionMeta.setAttribute('content', description)

    const themeMeta = ensureMeta('meta[name="theme-color"]', { name: 'theme-color' })
    themeMeta.setAttribute('content', themeColor)

    const ogTitle = ensureMeta('meta[property="og:title"]', { property: 'og:title' })
    ogTitle.setAttribute('content', title)

    const ogDescription = ensureMeta('meta[property="og:description"]', {
      property: 'og:description',
    })
    ogDescription.setAttribute('content', description)
    const ogUrl = ensureMeta('meta[property="og:url"]', { property: 'og:url' })
    ogUrl.setAttribute('content', currentUrl)

    if (absoluteImage) {
      const ogImage = ensureMeta('meta[property="og:image"]', { property: 'og:image' })
      ogImage.setAttribute('content', absoluteImage)
    }

    const twitterTitle = ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' })
    twitterTitle.setAttribute('content', title)

    const twitterDescription = ensureMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
    })
    twitterDescription.setAttribute('content', description)

    if (absoluteImage) {
      const twitterImage = ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image' })
      twitterImage.setAttribute('content', absoluteImage)
    }

    const canonical = ensureLink('link[rel="canonical"]', { rel: 'canonical' })
    canonical.setAttribute('href', currentUrl)
  }, [description, image, themeColor, title])
}
