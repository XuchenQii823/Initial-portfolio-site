import { aboutCopy, infoDetails } from '../../data/home'
import { AboutCopy } from './AboutCopy'
import { AboutPhoto } from './AboutPhoto'
import { SectionLabel } from './SectionLabel'

export function AboutSection() {
  return (
    <section id="about" className="home-section-home section-divider-home">
      <SectionLabel>About</SectionLabel>
      <div className="about-grid-home">
        <AboutPhoto reveal />
        <AboutCopy body={aboutCopy} details={infoDetails} reveal />
      </div>
    </section>
  )
}
