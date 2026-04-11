import type { CSSProperties } from 'react'
import { SafeImage } from '../common/SafeImage'
import type { Chapter, MediaLayer } from '../../data/caseStudies'

function toPercent(value: number) {
  return `${value}%`
}

function getLayerStyle(layer: MediaLayer): CSSProperties {
  if (layer.kind === 'hotspot') {
    return {
      left: toPercent(layer.left),
      top: toPercent(layer.top),
      width: toPercent(layer.width),
      height: toPercent(layer.height),
      borderRadius: layer.radius ?? '0',
      background: 'transparent',
      cursor: 'pointer',
      zIndex: 2,
    }
  }

  return {
    left: toPercent(layer.left),
    top: toPercent(layer.top),
    width: toPercent(layer.width),
    aspectRatio: layer.aspectRatio,
    borderRadius: layer.radius ?? '0',
    objectFit: layer.fit ?? 'cover',
  }
}

type CaseStudyChapterProps = {
  chapter: Chapter
  locked?: boolean
}

export function CaseStudyChapter({ chapter, locked = false }: CaseStudyChapterProps) {
  return (
    <section id={chapter.id} className="case-frame page-scroll-target relative">
      <div className={locked ? 'case-chapter-media case-chapter-media-locked' : 'case-chapter-media'}>
        <SafeImage
          src={chapter.image}
          alt={chapter.alt}
          className="w-full"
          sizes="(min-width: 1024px) 72vw, 100vw"
          fallbackClassName="flex min-h-[40vh] w-full items-center justify-center bg-white/[0.04] py-16 text-center text-xs uppercase tracking-[0.18em] text-site-secondary"
          fallbackLabel={`${chapter.label} image unavailable`}
        />

        {chapter.layers?.map((layer, index) => {
          if (layer.kind === 'hotspot') {
            return (
              <a
                key={`${chapter.id}-hotspot-${index}`}
                href={layer.href}
                target="_blank"
                rel="noreferrer"
                aria-label={layer.ariaLabel}
                className="absolute focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
                style={getLayerStyle(layer)}
              />
            )
          }

          return (
            <video
              key={`${chapter.id}-video-${index}`}
              className="overlay-media"
              controls
              loop
              muted
              playsInline
              preload="metadata"
              style={getLayerStyle(layer)}
            >
              <source src={layer.src} type="video/mp4" />
            </video>
          )
        })}
      </div>

      {locked ? <div className="case-chapter-lock-overlay" aria-hidden="true" /> : null}
    </section>
  )
}
