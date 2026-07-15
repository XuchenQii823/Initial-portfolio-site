import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const publicDir = path.join(projectRoot, 'public')
const siteUrl = (process.env.VITE_SITE_URL || 'https://example.com').replace(/\/+$/, '')

const routes = ['/', '/projects/strata', '/projects/dimension', '/projects/vitrum', '/projects/gxm/', '/photography']

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

const redirects = `/* /index.html 200
`

const manifest = {
  name: 'Chyi Portfolio',
  short_name: 'Chyi',
  start_url: '/',
  display: 'standalone',
  background_color: '#0A0A0A',
  theme_color: '#0A0A0A',
  icons: [
    {
      src: '/favicon.svg',
      sizes: 'any',
      type: 'image/svg+xml',
      purpose: 'any',
    },
  ],
}

fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots)
fs.writeFileSync(path.join(publicDir, '_redirects'), redirects)
fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`)
