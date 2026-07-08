export type MediaLayer =
  | {
      kind: 'video'
      src: string
      left: number
      top: number
      width: number
      aspectRatio: string
      radius?: string
      fit?: 'cover' | 'contain'
    }
  | {
      kind: 'hotspot'
      href: string
      left: number
      top: number
      width: number
      height: number
      radius?: string
      ariaLabel: string
    }

export type Chapter = {
  id: string
  page: number
  label: string
  image: string
  sources?: ImageSource[]
  alt: string
  layers?: MediaLayer[]
}

export type ImageSource = {
  srcSet: string
  type: string
  media?: string
  sizes?: string
}

export type CaseStudyProtection = {
  protectedFromChapterId: string
  storageKey: string
  title: string
  description: string
  password: string
  inputPlaceholder: string
  helperText: string
  submitLabel: string
  goBackLabel: string
  errorMessage: string
}

export type CaseStudy = {
  slug: 'strata' | 'dimension' | 'vitrum'
  title: string
  background: string
  summary: string
  cover: {
    image: string
    sources?: ImageSource[]
    alt: string
  }
  nextProject: {
    href: string
    title: string
  }
  chapters: Chapter[]
  protection?: CaseStudyProtection
}

const prototypeHref =
  'https://ttrsux.protopie.cloud/p/f13a50719620dc15dda423de?ui=true&scaleToFit=true&enableHotspotHints=true&cursorType=touch&mockup=true&bgColor=%23F5F5F5&bgImage=undefined&playSpeed=1'

const strataImage = (fileName: string) => {
  const image = `/assets/images/01strata/${fileName}.png`
  const webp = `/assets/images/01strata/optimized/${encodeURIComponent(fileName)}.webp`

  return {
    image,
    sources: [{ srcSet: webp, type: 'image/webp' }],
  }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'strata',
    title: 'STRATA',
    background: '#121212',
    summary:
      'Production launcher restructure across two digital product lines, from information architecture to final UI rollout.',
    cover: {
      ...strataImage('1_Overview'),
      alt: 'STRATA overview',
    },
    nextProject: {
      href: '/projects/dimension',
      title: 'LEXUS DIMENSION',
    },
    chapters: [
      { id: 'ch-2', page: 2, label: 'Highlights', ...strataImage('2_Highlights'), alt: 'Highlights' },
      { id: 'ch-3', page: 3, label: 'Why Restructure', ...strataImage('3_Why_Restructure'), alt: 'Why restructure' },
      { id: 'ch-4', page: 4, label: 'The Problems', ...strataImage('4_The Problems'), alt: 'The problems' },
      { id: 'ch-5', page: 5, label: 'Design Decisions', ...strataImage('5_Design_Decisions'), alt: 'Design decisions' },
      { id: 'ch-6', page: 6, label: 'Interaction Architecture', ...strataImage('6_Interaction_Architecture'), alt: 'Interaction architecture' },
      { id: 'ch-7', page: 7, label: 'Visual Design', ...strataImage('7_Visual Design'), alt: 'Visual design' },
      { id: 'ch-8', page: 8, label: 'Post-Launch Iteration', ...strataImage('8_Post-Launch_Iteration'), alt: 'Post-launch iteration' },
      {
        id: 'ch-9',
        page: 9,
        label: 'Interactive Demo',
        ...strataImage('9_Interactive_Demo'),
        alt: 'Interactive demo',
        layers: [
          {
            kind: 'hotspot',
            href: prototypeHref,
            left: 43.5,
            top: 47.3,
            width: 51.8,
            height: 40.6,
            radius: '18px',
            ariaLabel: 'Open interactive prototype',
          },
        ],
      },
      { id: 'ch-10', page: 10, label: 'Full UI - Toyota', ...strataImage('10_Full_UI_Toyota'), alt: 'Full UI Toyota' },
      { id: 'ch-11', page: 11, label: 'Full UI - Lexus', ...strataImage('11_Full_UI_Lexus'), alt: 'Full UI Lexus' },
      { id: 'ch-12', page: 12, label: 'Retrospective', ...strataImage('12_Retrospective'), alt: 'Retrospective' },
    ],
  },
  {
    slug: 'dimension',
    title: 'LEXUS DIMENSION',
    background: '#0D0B09',
    summary:
      'Spatial interaction concept exploring 3D navigation, gesture control, and cross-screen linkage.',
    cover: {
      image: '/assets/images/02dimension/01_Cover.png',
      alt: 'Lexus Dimension overview',
    },
    nextProject: {
      href: '/projects/vitrum',
      title: 'VITRUM',
    },
    chapters: [
      { id: 'ch-2', page: 2, label: 'Hero Shot', image: '/assets/images/02dimension/02_Hero_Shot.png', alt: 'Hero shot' },
      { id: 'ch-3', page: 3, label: 'Context', image: '/assets/images/02dimension/03_Context.png', alt: 'Context' },
      { id: 'ch-4', page: 4, label: 'Design Challenges', image: '/assets/images/02dimension/04_Design_Challenges.png', alt: 'Design challenges' },
      { id: 'ch-5', page: 5, label: 'Challenge 1 - Interaction Exploration', image: '/assets/images/02dimension/05_Challenge_1_Interaction Exploration.png', alt: 'Interaction exploration' },
      { id: 'ch-6', page: 6, label: 'Challenge 1 - 3D Core Experience', image: '/assets/images/02dimension/06_Challenge_1_Respnse_3D Experience.png', alt: '3D core experience' },
      {
        id: 'ch-7',
        page: 7,
        label: 'Challenge 1 - Gesture Navigation Demo',
        image: '/assets/images/02dimension/07_Challenge_1_Gesture_Navigation_Demo.png',
        alt: 'Gesture navigation demo',
        layers: [
          {
            kind: 'video',
            src: '/assets/videos/02dimension/Page_07_Demoivi-gesture-demo.mp4',
            left: 6.6667,
            top: 19.5313,
            width: 86.6667,
            aspectRatio: '1248 / 472',
            radius: '0px',
          },
        ],
      },
      {
        id: 'ch-8',
        page: 8,
        label: 'Challenge 2 - BB Screen Definition',
        image: '/assets/images/02dimension/08_Challenge_2_BB_Screen_Definition.png',
        alt: 'BB screen definition',
        layers: [
          {
            kind: 'video',
            src: '/assets/videos/02dimension/Page_08_left_bb-nav-linkage.mp4',
            left: 6.6667,
            top: 68.3155,
            width: 42.7778,
            aspectRatio: '616 / 266',
            radius: '2px',
          },
          {
            kind: 'video',
            src: '/assets/videos/02dimension/Page_08_right_bb-setting-linkage.mp4',
            left: 50.5556,
            top: 68.2264,
            width: 42.7778,
            aspectRatio: '616 / 266',
            radius: '2px',
          },
        ],
      },
      { id: 'ch-9', page: 9, label: 'Challenge 1 - Reach Zone Layout System', image: '/assets/images/02dimension/09_Challenge_1&3_Layout_System.png', alt: 'Reach zone layout system' },
    ],
  },
  {
    slug: 'vitrum',
    title: 'VITRUM',
    background: '#07090E',
    summary:
      'Future-facing interaction system covering experiments, design system work, demo flows, and real-world validation.',
    cover: {
      image: '/assets/images/03vitrum/1_Overview.png',
      alt: 'Vitrum overview',
    },
    nextProject: {
      href: '/',
      title: 'Back to Projects',
    },
    protection: {
      protectedFromChapterId: 'ch-7',
      storageKey: 'case-study-vitrum-unlocked',
      title: 'Confidential Content',
      description:
        'The following section contains confidential material related to the design system and validation work. Please contact author to get the password.',
      password: '980823',
      inputPlaceholder: 'Enter password',
      helperText: 'Access to this section is restricted.',
      submitLabel: 'Continue',
      goBackLabel: 'Go Back',
      errorMessage: 'Incorrect password. Please try again.',
    },
    chapters: [
      { id: 'ch-2', page: 2, label: 'Context', image: '/assets/images/03vitrum/2_Context.png', alt: 'Context' },
      { id: 'ch-3', page: 3, label: 'Ch.01 - Experiment 01', image: '/assets/images/03vitrum/3_Chapter 01_Experiment_01.png', alt: 'Experiment 01' },
      { id: 'ch-4', page: 4, label: 'Ch.01 - Experiment 02 and 03', image: '/assets/images/03vitrum/4_Chapter 01_Experiment_02&03.png', alt: 'Experiment 02 and 03' },
      { id: 'ch-5', page: 5, label: 'Ch.01 - The Specification', image: '/assets/images/03vitrum/5_Chapter 01_The specification.png', alt: 'The specification' },
      { id: 'ch-6', page: 6, label: 'Ch.01 - Retrospective', image: '/assets/images/03vitrum/6_Chapter 01_Retrospective.png', alt: 'Retrospective' },
      { id: 'ch-7', page: 7, label: 'Ch.02 - Design System', image: '/assets/images/03vitrum/7_Chapter 02_Design System.png', alt: 'Design system' },
      { id: 'ch-8', page: 8, label: 'Ch.02 - Design and Practice', image: '/assets/images/03vitrum/8_Chapter 02_Design & Practice.png', alt: 'Design and practice' },
      {
        id: 'ch-9',
        page: 9,
        label: 'Ch.02 - Demo',
        image: '/assets/images/03vitrum/9_Chapter 02_Demo.png',
        alt: 'Demo',
        layers: [
          {
            kind: 'video',
            src: '/assets/videos/03vitrum/Page_09_All_13_Scene_Full_Demo.mp4',
            left: 6.6667,
            top: 17.6471,
            width: 86.6667,
            aspectRatio: '1248 / 702',
            radius: '1.2%',
          },
        ],
      },
      { id: 'ch-10', page: 10, label: 'Ch.02 - Interaction', image: '/assets/images/03vitrum/10_Chapter 02_Interaction.png', alt: 'Interaction' },
      { id: 'ch-11', page: 11, label: 'Ch.03 - Real-Vehicle Validation', image: '/assets/images/03vitrum/11_Chapter 03_Real-Vehicle_Validation.png', alt: 'Real-vehicle validation' },
      {
        id: 'ch-12',
        page: 12,
        label: 'Ch.03 - Inner Display Design and Validation',
        image: '/assets/images/03vitrum/12_Chapter 03_Inner_Display.png',
        alt: 'Inner display design and validation',
        layers: [
          {
            kind: 'video',
            src: '/assets/videos/03vitrum/Page_12_Left_Dynamic Daytime validation.mp4',
            left: 6.6667,
            top: 66.9998,
            width: 42.8472,
            aspectRatio: '617 / 349',
            radius: '0.9%',
          },
          {
            kind: 'video',
            src: '/assets/videos/03vitrum/Page_12_right_Dynamic Night validation.mp4',
            left: 50.4861,
            top: 66.9998,
            width: 42.8472,
            aspectRatio: '617 / 349',
            radius: '0.9%',
          },
        ],
      },
      {
        id: 'ch-13',
        page: 13,
        label: 'Ch.03 - Outer Display Design and Validation',
        image: '/assets/images/03vitrum/13_Chapter 03_Outer_Display.png',
        alt: 'Outer display design and validation',
        layers: [
          {
            kind: 'video',
            src: '/assets/videos/03vitrum/Page_13_Hands-free_door unlocks automatically.mp4',
            left: 13.4028,
            top: 56.8011,
            width: 36.0417,
            aspectRatio: '519 / 294',
            radius: '0.7%',
          },
          {
            kind: 'video',
            src: '/assets/videos/03vitrum/Page_13_Hands full_boot opens automatically.mp4',
            left: 50.5556,
            top: 56.8011,
            width: 36.0417,
            aspectRatio: '519 / 294',
            radius: '0.7%',
          },
        ],
      },
      { id: 'ch-14', page: 14, label: 'Retrospective', image: '/assets/images/03vitrum/14_Retrospective.png', alt: 'Retrospective' },
    ],
  },
]

export const caseStudiesBySlug = Object.fromEntries(
  caseStudies.map((study) => [study.slug, study]),
) as Record<CaseStudy['slug'], CaseStudy>
