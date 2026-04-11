type SectionLink = {
  id: string
  label: string
}

type CaseStudySidebarProps = {
  activeIndex: number
  sections: SectionLink[]
  onSelect: (id: string) => void
}

export function CaseStudySidebar({
  activeIndex,
  sections,
  onSelect,
}: CaseStudySidebarProps) {
  return (
    <aside className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-0.5 py-2 lg:flex">
      {sections.map((section, index) => {
        const active = index === activeIndex

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(section.id)}
            className="flex items-center gap-3 rounded-r-sm px-5 py-2 text-left transition-opacity hover:opacity-100"
          >
            <span
              className={`block h-1 transition-all ${
                active ? 'w-3 rounded-sm bg-site-text' : 'w-1 rounded-full bg-[#555555]'
              }`}
            />
            <span
              className={`whitespace-nowrap text-[11px] tracking-[0.05em] ${
                active ? 'font-medium text-site-text' : 'text-site-secondary'
              }`}
            >
              {section.label}
            </span>
          </button>
        )
      })}
    </aside>
  )
}
