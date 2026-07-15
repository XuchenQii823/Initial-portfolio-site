export type HeroTab = 'work' | 'info'
export type ProjectTab = 'ux' | 'id' | 'ai'

export type ProjectCard = {
  number: string
  title: string
  subtitle?: string
  description: string
  tags: string[]
  image?: string
  href?: string
  navigation?: 'spa' | 'document'
  comingSoon?: boolean
}

export const homeNavItems = [
  { href: '#projects', label: 'Projects', section: 'projects' },
  { href: '#about', label: 'About', section: 'about' },
  { href: '#contact', label: 'Contact', section: 'contact' },
  { href: '/photography', label: 'Photography', section: '' },
]

export const uxProjects: ProjectCard[] = [
  {
    number: '01',
    title: 'STRATA',
    description:
      'As UX designer and feature owner, led the end-to-end redesign of the Toyota and Lexus product launcher from interaction architecture to UI delivery, shipping a unified, task-centric framework across two product lines.',
    tags: ['Interaction Architecture', 'Context-Aware UI', 'Usability Research', 'Design Systems', 'Cross-Platform UX'],
    image: '/assets/images/home/preview-strata.png',
    href: '/projects/strata',
    navigation: 'spa',
  },
  {
    number: '02',
    title: 'LEXUS DIMENSION',
    description:
      'A full-system interaction concept exploring spatial navigation, gesture control, and cross-screen interaction design from information architecture to motion specification.',
    tags: ['Spatial Interaction', 'Gesture Design', 'Concept Development'],
    image: '/assets/images/home/preview-dimension.png',
    href: '/projects/dimension',
    navigation: 'spa',
  },
  {
    number: '03',
    title: 'VITRUM',
    description:
      'A transparent-display interaction concept exploring how spatial UI layers can coexist with the physical environment, from early experimentation through design system to real-world validation.',
    tags: ['Spatial UI', 'Design System', 'Prototyping', 'User Validation'],
    image: '/assets/images/home/preview-vitrum.png',
    href: '/projects/vitrum',
    navigation: 'spa',
  },
  {
    number: '04',
    title: 'GLOBAL EXPERIENCE MATRIX',
    subtitle: 'Global UX Strategy',
    description:
      'A two-year global automotive UX strategy program spanning five regions, translating mixed-methods research into a validated experience matrix and reusable product roadmap framework.',
    tags: ['UX Strategy', 'Global User Research', 'Mixed-Methods Research', 'Automotive UX'],
    image: '/assets/images/home/preview-gxm.webp',
    href: '/projects/gxm/',
    navigation: 'document',
  },
  {
    number: '05',
    title: 'In Progress',
    description: 'New project currently in development.',
    tags: ['TBD'],
    comingSoon: true,
  },
  {
    number: '06',
    title: 'In Progress',
    description: 'New project currently in development.',
    tags: ['TBD'],
    comingSoon: true,
  },
]

export const infoDetails = [
  { label: 'Education', value: 'MSc Industrial Design, Loughborough University' },
  { label: 'Experience', value: '3+ years in the R&D field, complex product systems' },
]

export const aboutCopy = (
  <>
    I&apos;m <strong>Chyi (Xuchen Qi)</strong>, a product designer with a background in complex
    product systems and a deep interest in how emerging technology reshapes human interaction.
    <br />
    <br />
    Over 3+ years in the R&amp;D field, I&apos;ve worked on production-level digital products
    across multiple platforms, from defining <strong>interaction architecture</strong> for a
    large-scale product launcher to exploring <strong>spatial interaction</strong> and{' '}
    <strong>design system</strong> frameworks, while leveraging{' '}
    <strong>AI-assisted prototyping and vibe-coding</strong> to design and ship digital products
    end-to-end.
    <br />
    <br />
    I hold an <strong>MSc in Integrated Industrial Design</strong> from Loughborough University
    (UK). Outside of work, I shoot film, collect vintage stuff, and document the world through a
    viewfinder.
  </>
)

export const industrialPlaceholders = Array.from({ length: 6 }, (_, index) => `Project ${index + 1}`)
