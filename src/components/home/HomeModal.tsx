import type { ReactNode } from 'react'
import { useEffect } from 'react'

type HomeModalProps = {
  open: boolean
  onClose: () => void
  title: string
  description: string
  children: ReactNode
}

export function HomeModal({ open, onClose, title, description, children }: HomeModalProps) {
  useEffect(() => {
    if (!open) return

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [onClose, open])

  if (!open) return null

  return (
    <div className="modal-overlay-home" onClick={onClose}>
      <div className="modal-box-home" onClick={(event) => event.stopPropagation()}>
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
        <button type="button" className="modal-close-home" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
