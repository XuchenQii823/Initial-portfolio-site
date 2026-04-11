import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

type SafeImageProps = {
  src: string
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

  return (
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
}
