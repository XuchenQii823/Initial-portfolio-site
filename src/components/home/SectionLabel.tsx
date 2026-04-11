type SectionLabelProps = {
  children: string
}

export function SectionLabel({ children }: SectionLabelProps) {
  return <p className="section-label-home">{children}</p>
}
