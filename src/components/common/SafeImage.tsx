import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

export type ImageSource = {
  srcSet: string
  type: string
  media?: string
  sizes?: string
}

type SafeImageProps = {
  src: string
  sources?: ImageSource[]
  alt: string
  className?: string
  fallbackClassName?: string
  fallbackLabel?: string
  loading?: ImgHTMLAttributes<HTMLImageElement>['loading']
  decoding?: ImgHTMLAttributes<HTMLImageElement>['decoding']
  fetchPriority?: ImgHTMLAttributes<HTMLImageElement>['fetchPriority']
  sizes?: string
  onLoad?: ImgHTMLAttributes<HTMLImageElement>['onLoad']
}

export function SafeImage({
  src,
  sources,
  alt,
  className,
  fallbackClassName,
  fallbackLabel = 'Image unavailable',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  sizes,
  onLoad,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={fallbackClassName} role="img" aria-label={alt}>
        <span>{fallbackLabel}</span>
      </div>
    )
  }

  const image = (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      sizes={sizes}
      onLoad={onLoad}
      onError={() => setHasError(true)}
    />
  )

  if (!sources?.length) {
    return image
  }

  return (
    <picture>
      {sources.map((source) => (
        <source
          key={`${source.type}-${source.srcSet}-${source.media ?? 'default'}`}
          srcSet={source.srcSet}
          type={source.type}
          media={source.media}
          sizes={source.sizes ?? sizes}
        />
      ))}
      {image}
    </picture>
  )
}
