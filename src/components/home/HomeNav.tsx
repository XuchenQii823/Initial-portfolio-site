import { useEffect, useState } from 'react'
import { DownloadIcon } from '../icons'

type HomeNavItem = {
  href: string
  label: string
  section: string
}

type HomeNavProps = {
  activeSection: string
  navItems: HomeNavItem[]
  onSelectSection?: (sectionId: string) => void
}

export function HomeNav({ activeSection, navItems, onSelectSection }: HomeNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="site-nav-home">
      <div className="site-nav-bar-home">
        <a
          href="#home"
          className="nav-logo-home"
          onClick={(event) => {
            closeMobileMenu()
            if (onSelectSection) {
              event.preventDefault()
              onSelectSection('home')
            }
          }}
        >
          Chyi Design
        </a>

        <div className="nav-desktop-home">
          <ul className="nav-links-home">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={
                    item.section && activeSection === item.section
                      ? 'nav-link-home nav-link-home-active'
                      : 'nav-link-home'
                  }
                  onClick={(event) => {
                    if (item.section && onSelectSection) {
                      event.preventDefault()
                      onSelectSection(item.section)
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions-home">
            <div className="relative group">
              <button type="button" className="nav-cv-btn-home">
                CV ↓
              </button>
              <div className="cv-dropdown-home">
                <a href="/assets/cv-en.pdf" download>
                  <DownloadIcon />
                  English
                </a>
                <a href="/assets/cv-zh.pdf" download>
                  <DownloadIcon />
                  中文
                </a>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="nav-mobile-toggle-home"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="nav-mobile-panel-home">
          <div className="nav-mobile-links-home">
            {navItems.map((item) => (
              <a
                key={`mobile-${item.label}`}
                href={item.href}
                className={
                  item.section && activeSection === item.section
                    ? 'nav-mobile-link-home nav-mobile-link-home-active'
                    : 'nav-mobile-link-home'
                }
                onClick={(event) => {
                  closeMobileMenu()
                  if (item.section && onSelectSection) {
                    event.preventDefault()
                    onSelectSection(item.section)
                  }
                }}
              >
                {item.label}
              </a>
            ))}

            <a
              href="/assets/cv-en.pdf"
              download
              className="nav-mobile-link-home"
              onClick={closeMobileMenu}
            >
              English CV
            </a>
            <a
              href="/assets/cv-zh.pdf"
              download
              className="nav-mobile-link-home"
              onClick={closeMobileMenu}
            >
              中文 CV
            </a>
          </div>

        </div>
      ) : null}
    </nav>
  )
}
