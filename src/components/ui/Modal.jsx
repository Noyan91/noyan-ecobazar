import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

/** Centred dialog with scroll lock, backdrop click and Escape to close. */
export default function Modal({ open, onClose, children, className, labelledBy }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 animate-fade-in bg-gray-900/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          'relative max-h-[92vh] w-full max-w-4xl animate-zoom-in overflow-y-auto rounded-lg bg-white shadow-2xl',
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
