import { AboutCopy } from './AboutCopy'
import { AboutPhoto } from './AboutPhoto'
import { aboutCopy, infoDetails } from '../../data/home'

export function HeroInfoPanel() {
  return (
    <div className="hero-info-grid-home">
      <AboutPhoto />
      <AboutCopy body={aboutCopy} details={infoDetails} />
    </div>
  )
}
