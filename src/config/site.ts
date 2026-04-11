export const siteConfig = {
  name: 'Chyi Portfolio',
  defaultTitle: 'Chyi - UX Designer',
  defaultDescription:
    'Portfolio of Chyi (Xuchen Qi), a product designer specialising in complex interactive systems, design systems, and scalable product experiences.',
  defaultThemeColor: '#0A0A0A',
  defaultOgImage: '/assets/images/01strata/1_Overview.png',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'xuchenqi823@gmail.com',
}

export function getSiteOrigin() {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin
  }

  return import.meta.env.VITE_SITE_URL || 'https://example.com'
}

export function toAbsoluteUrl(pathname: string) {
  if (/^https?:\/\//.test(pathname)) return pathname
  return `${getSiteOrigin().replace(/\/+$/, '')}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}
