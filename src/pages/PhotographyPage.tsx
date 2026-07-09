import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { SafeImage } from '../components/common/SafeImage'
import { siteConfig } from '../config/site'
import { photographyImages, type PhotographyImage } from '../data/photography'
import { usePageMeta } from '../hooks/usePageMeta'

const MASONRY_GAP = 16

type PhotographyItem = PhotographyImage & {
  id: string
}

const shuffleItems = <T,>(items: T[]) => {
  const next = [...items]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }
  return next
}

const getSeed = (value: string) => {
  let seed = 0
  for (let index = 0; index < value.length; index += 1) {
    seed += value.charCodeAt(index)
  }
  return seed
}

export function PhotographyPage() {
  const [selectedImage, setSelectedImage] = useState<PhotographyImage | null>(null)
  const [gridWidth, setGridWidth] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [streamHeight, setStreamHeight] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const scrollRafRef = useRef<number | null>(null)
  const lastScrollTopRef = useRef(0)
  const pendingScrollTopRef = useRef(0)
  const showBackToTopRef = useRef(false)

  const shuffledImages = useMemo(() => shuffleItems(photographyImages), [])

  const streamItems = useMemo<PhotographyItem[]>(() => {
    const firstPass = shuffleItems(shuffledImages)
    const secondPass = shuffleItems(shuffledImages)
    const extraCount = Math.max(10, Math.ceil(shuffledImages.length * 0.2))

    return [...firstPass, ...secondPass.slice(0, extraCount)].map((image, index) => ({
      ...image,
      id: `${index}-${image.src}`,
    }))
  }, [shuffledImages])

  const baseRowHeight = useMemo(() => {
    if (gridWidth >= 1200) return 290
    if (gridWidth >= 720) return 250
    return Math.max(180, gridWidth * 0.72)
  }, [gridWidth])

  usePageMeta({
    title: 'Photography - Chyi',
    description: 'A moving selection of photographic frames from the Chyi portfolio.',
    themeColor: '#0A0A0A',
    image: photographyImages[0]?.src ?? siteConfig.defaultOgImage,
  })

  useEffect(() => {
    const element = gridRef.current
    if (!element) return

    const updateWidth = () => {
      setGridWidth(element.clientWidth)
      setViewportHeight(window.innerHeight)
      setStreamHeight(element.getBoundingClientRect().height)
    }

    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!selectedImage) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage])

  useEffect(() => {
    const setBackToTopVisible = (next: boolean) => {
      if (showBackToTopRef.current === next) return
      showBackToTopRef.current = next
      setShowBackToTop(next)
    }

    const flushScrollState = () => {
      scrollRafRef.current = null

      const scrollTop = pendingScrollTopRef.current
      const previousScrollTop = lastScrollTopRef.current
      const isScrollingDown = scrollTop > previousScrollTop + 1
      const nearTop = scrollTop <= 8

      if (nearTop) {
        setBackToTopVisible(false)
      } else if ((isScrollingDown || showBackToTopRef.current) && scrollTop > 12) {
        setBackToTopVisible(true)
      }

      lastScrollTopRef.current = scrollTop
    }

    const scheduleScrollFlush = () => {
      if (scrollRafRef.current !== null) return
      scrollRafRef.current = window.requestAnimationFrame(flushScrollState)
    }

    const handleScroll = () => {
      pendingScrollTopRef.current = window.scrollY || document.documentElement.scrollTop
      scheduleScrollFlush()
    }

    const handleResize = () => {
      pendingScrollTopRef.current = window.scrollY || document.documentElement.scrollTop
      scheduleScrollFlush()
    }

    pendingScrollTopRef.current = window.scrollY || document.documentElement.scrollTop
    lastScrollTopRef.current = pendingScrollTopRef.current
    showBackToTopRef.current = pendingScrollTopRef.current > 12
    setShowBackToTop(showBackToTopRef.current)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const streamRows = useMemo(() => {
    if (!gridWidth) return []

    const rows: Array<
      Array<
        PhotographyItem & {
          displayHeight: number
          displayWidth: number
        }
      >
    > = []
    const minItemsPerRow = gridWidth >= 1200 ? 2 : gridWidth >= 720 ? 2 : 1
    const targetLoopHeight = Math.max(viewportHeight * 3.3, baseRowHeight * (gridWidth >= 1200 ? 12.8 : 10.4))

    let currentRow: PhotographyItem[] = []
    let ratioSum = 0
    let rowIndex = 0
    let currentTargetHeight = baseRowHeight
    let currentThreshold = 0.94
    let currentMaxItems = gridWidth >= 1200 ? 4 : gridWidth >= 720 ? 3 : 1
    let renderedHeight = 0
    let pool = shuffleItems(streamItems)
    let poolIndex = 0

    const takeNextImage = () => {
      if (poolIndex >= pool.length) {
        pool = shuffleItems(streamItems)
        poolIndex = 0
      }

      const image = pool[poolIndex]
      poolIndex += 1
      return image
    }

    const commitRow = () => {
      if (!currentRow.length) return

      const ratios = currentRow.map((image) => image.width / image.height)
      const gaps = MASONRY_GAP * Math.max(0, currentRow.length - 1)
      const rowHeight = (gridWidth - gaps) / ratios.reduce((sum, value) => sum + value, 0)

      rows.push(
        currentRow.map((image, index) => ({
          ...image,
          displayHeight: rowHeight,
          displayWidth: rowHeight * ratios[index],
        })),
      )

      renderedHeight += rowHeight + (rows.length > 1 ? MASONRY_GAP : 0)
      currentRow = []
      ratioSum = 0
      rowIndex += 1
    }

    while (renderedHeight < targetLoopHeight || rows.length < (gridWidth >= 1200 ? 6 : 5)) {
      const image = takeNextImage()
      const ratio = image.width / image.height

      if (currentRow.length === 0) {
        const seed = getSeed(image.src) + rowIndex * 17
        const multipliers =
          gridWidth >= 1200 ? [0.72, 0.82, 0.92, 1, 1.08, 1.18] : gridWidth >= 720 ? [0.82, 0.92, 1, 1.08] : [1]
        const thresholds = gridWidth >= 1200 ? [0.8, 0.86, 0.92, 0.98] : gridWidth >= 720 ? [0.82, 0.9, 0.98] : [1]
        const maxItemsPool = gridWidth >= 1200 ? [2, 3, 4] : gridWidth >= 720 ? [2, 3] : [1]
        currentTargetHeight = baseRowHeight * multipliers[seed % multipliers.length]
        currentThreshold = thresholds[seed % thresholds.length]
        currentMaxItems = maxItemsPool[seed % maxItemsPool.length]
      }

      currentRow.push(image)
      ratioSum += ratio

      const gaps = MASONRY_GAP * Math.max(0, currentRow.length - 1)
      const estimatedWidth = ratioSum * currentTargetHeight + gaps
      const enoughItems = currentRow.length >= minItemsPerRow
      const allPortraits = currentRow.every((item) => item.width / item.height < 0.92)
      const threshold = allPortraits ? Math.max(0.76, currentThreshold - 0.08) : currentThreshold
      const shouldCommit =
        enoughItems && (estimatedWidth >= gridWidth * threshold || currentRow.length >= currentMaxItems)

      if (shouldCommit) {
        commitRow()
      }
    }

    if (currentRow.length) {
      if (rows.length > 0 && currentRow.length < minItemsPerRow) {
        const mergedRow = [...rows[rows.length - 1].map(({ displayHeight, displayWidth, ...image }) => image), ...currentRow]
        rows.pop()
        currentRow = mergedRow
        commitRow()
      } else {
        commitRow()
      }
    }

    return rows
  }, [baseRowHeight, gridWidth, streamItems, viewportHeight])

  const trackStyle = useMemo<CSSProperties>(() => {
    return {
      animationDuration: '168s',
      ['--photography-loop-distance' as '--photography-loop-distance']: `${streamHeight + MASONRY_GAP}px`,
    }
  }, [streamHeight])

  return (
    <main className="photography-page-home">
      <div className="photography-topbar-home">
        <Link to="/" className="photography-back-home">
          <span aria-hidden="true">←</span>
          Back to Portfolio
        </Link>
        <p className="photography-title-home">Photography by Chyi</p>
      </div>

      <section className="photography-marquee-home" style={streamHeight ? { height: `${streamHeight}px` } : undefined}>
        <div className="photography-track-home" style={trackStyle}>
          {[0, 1].map((copyIndex) => (
            <div
              key={`stream-${copyIndex}`}
              ref={copyIndex === 0 ? gridRef : undefined}
              className="photography-stream-home"
              aria-hidden={copyIndex === 1}
            >
              {streamRows.map((row, rowIndex) => (
                <div key={`row-${copyIndex}-${rowIndex}`} className="photography-row-home">
                  {row.map((item) => (
                    <button
                      key={`${item.id}-${copyIndex}`}
                      type="button"
                      className="photography-tile-home"
                      style={{ width: item.displayWidth, height: item.displayHeight }}
                      onClick={() => setSelectedImage(item)}
                    >
                      <span className="photography-media-frame-home">
                        <SafeImage
                          src={item.src}
                          sources={item.sources}
                          alt="Photography work"
                          className="photography-image-home"
                          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 40vw, 100vw"
                          fallbackClassName="photography-fallback-home"
                          fallbackLabel="Photo unavailable"
                        />
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        className={`photography-top-button-home${showBackToTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span aria-hidden="true">↑</span>
        TOP
      </button>

      {selectedImage ? (
        <div
          className="photography-modal-home"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="photography-modal-close-home"
            onClick={() => setSelectedImage(null)}
          >
            Close
          </button>
          <div className="photography-modal-frame-home" onClick={(event) => event.stopPropagation()}>
            <SafeImage
              src={selectedImage.src}
              sources={selectedImage.sources}
              alt="Photography enlarged"
              className="photography-modal-image-home"
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              fallbackClassName="photography-fallback-home"
              fallbackLabel="Photo unavailable"
            />
          </div>
        </div>
      ) : null}
    </main>
  )
}
