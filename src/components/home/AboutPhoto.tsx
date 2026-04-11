import { SafeImage } from '../common/SafeImage'

type AboutPhotoProps = {
  reveal?: boolean
}

export function AboutPhoto({ reveal = false }: AboutPhotoProps) {
  return (
    <div className={reveal ? 'about-photo-wrap-home reveal' : 'about-photo-wrap-home'}>
      <SafeImage
        src="/assets/images/image of about.jpg"
        alt="Portrait of Xuchen Qi"
        className="about-photo-image-home"
        sizes="(min-width: 1024px) 36vw, 100vw"
        loading="eager"
        fetchPriority="high"
        fallbackClassName="about-photo-placeholder-home"
        fallbackLabel="Photo unavailable"
      />
    </div>
  )
}
