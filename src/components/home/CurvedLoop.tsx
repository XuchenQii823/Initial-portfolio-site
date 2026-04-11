import type { PointerEvent } from 'react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'

type CurvedLoopProps = {
  marqueeText: string
  speed?: number
  className?: string
  curveAmount?: number
  direction?: 'left' | 'right'
  interactive?: boolean
}

export function CurvedLoop({
  marqueeText,
  speed = 1.2,
  className,
  curveAmount = 0,
  direction = 'right',
  interactive = false,
}: CurvedLoopProps) {
  const text = useMemo(() => {
    const hasTrailingWhitespace = /\s|\u00A0$/.test(marqueeText)
    return (hasTrailingWhitespace ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0'
  }, [marqueeText])

  const containerRef = useRef<HTMLDivElement | null>(null)
  const measureRef = useRef<SVGTextElement | null>(null)
  const textPathRef = useRef<SVGTextPathElement | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const currentOffsetRef = useRef(0)
  const dragActiveRef = useRef(false)
  const lastPointerXRef = useRef(0)
  const dragVelocityRef = useRef(0)
  const directionRef = useRef<'left' | 'right'>(direction)

  const [spacing, setSpacing] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  const uid = useId()
  const pathId = `curved-loop-${uid}`
  const pathD = `M-120,60 Q720,${60 + curveAmount} 1560,60`

  const totalText = useMemo(() => {
    if (!spacing) return text
    return Array(Math.ceil(2200 / spacing) + 2)
      .fill(text)
      .join('')
  }, [spacing, text])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReduceMotion(media.matches)

    updateMotionPreference()
    media.addEventListener('change', updateMotionPreference)

    return () => {
      media.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  useEffect(() => {
    const updateSpacing = () => {
      const nextSpacing = measureRef.current?.getComputedTextLength() ?? 0
      if (nextSpacing > 0) {
        setSpacing(nextSpacing)
      }
    }

    updateSpacing()
    document.fonts?.ready.then(updateSpacing).catch(() => {})

    if ('ResizeObserver' in window && containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        updateSpacing()
      })
      resizeObserverRef.current.observe(containerRef.current)
    } else {
      window.addEventListener('resize', updateSpacing)
    }

    return () => {
      resizeObserverRef.current?.disconnect()
      resizeObserverRef.current = null
      window.removeEventListener('resize', updateSpacing)
    }
  }, [className, text])

  useEffect(() => {
    if (!spacing || !textPathRef.current) return

    const initialOffset = -spacing
    currentOffsetRef.current = initialOffset
    textPathRef.current.setAttribute('startOffset', `${initialOffset}px`)
  }, [spacing])

  useEffect(() => {
    if (!spacing || !textPathRef.current || reduceMotion) return

    const step = () => {
      if (!dragActiveRef.current) {
        const delta = directionRef.current === 'right' ? speed : -speed
        let nextOffset = currentOffsetRef.current + delta

        if (nextOffset <= -spacing) nextOffset += spacing
        if (nextOffset > 0) nextOffset -= spacing

        currentOffsetRef.current = nextOffset
        textPathRef.current?.setAttribute('startOffset', `${nextOffset}px`)
      }

      animationFrameRef.current = requestAnimationFrame(step)
    }

    animationFrameRef.current = requestAnimationFrame(step)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [reduceMotion, spacing, speed])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return
    dragActiveRef.current = true
    lastPointerXRef.current = event.clientX
    dragVelocityRef.current = 0
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragActiveRef.current || !textPathRef.current || !spacing) return

    const deltaX = event.clientX - lastPointerXRef.current
    lastPointerXRef.current = event.clientX
    dragVelocityRef.current = deltaX

    let nextOffset = currentOffsetRef.current + deltaX
    if (nextOffset <= -spacing) nextOffset += spacing
    if (nextOffset > 0) nextOffset -= spacing

    currentOffsetRef.current = nextOffset
    textPathRef.current.setAttribute('startOffset', `${nextOffset}px`)
  }

  const handlePointerEnd = () => {
    if (!interactive) return
    dragActiveRef.current = false
    directionRef.current = dragVelocityRef.current > 0 ? 'right' : 'left'
  }

  return (
    <div
      ref={containerRef}
      className="home-loop-band-home"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
    >
      <svg className="home-loop-svg-home" viewBox="0 0 1440 120" aria-hidden="true">
        <text ref={measureRef} className={className} xmlSpace="preserve" style={{ visibility: 'hidden' }}>
          {text}
        </text>
        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {spacing > 0 ? (
          <text className={className} xmlSpace="preserve">
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={`${currentOffsetRef.current}px`} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        ) : null}
      </svg>
    </div>
  )
}
