import type { ReactNode } from 'react'

type DetailItem = {
  label: string
  value: string
}

type AboutCopyProps = {
  body: ReactNode
  details: DetailItem[]
  reveal?: boolean
}

export function AboutCopy({ body, details, reveal = false }: AboutCopyProps) {
  return (
    <div className={reveal ? 'about-copy-home reveal' : 'about-copy-home'}>
      <h2>Good design is grounded in reality.</h2>
      <p className="about-bio-home-copy">{body}</p>

      <div className="about-details-home">
        {details.map((item) => (
          <div key={item.label}>
            <label>{item.label}</label>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
