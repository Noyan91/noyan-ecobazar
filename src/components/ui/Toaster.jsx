import { CheckCircle2, XCircle } from 'lucide-react'
import { useStore } from '../../context/StoreContext'

/** Bottom-right notifications driven by `toast()` in the store. */
export default function Toaster() {
  const { toasts } = useStore()
  if (!toasts.length) return null

  return (
    <div
      className="pointer-events-none fixed bottom-6 right-4 z-[120] flex w-[min(340px,calc(100vw-2rem))] flex-col gap-2"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex animate-slide-up items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg"
        >
          {toast.tone === 'error' ? (
            <XCircle size={18} className="shrink-0 text-danger" />
          ) : (
            <CheckCircle2 size={18} className="shrink-0 text-primary-soft" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
