import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Small dropdown used by the language and currency pickers in the top bar.
 *
 * Closes on outside click, Escape and selection, marks the current choice, and
 * aligns its panel to the trigger's right edge so it cannot run off screen in
 * the corner of the header.
 */
export default function SelectMenu({
  options,
  value,
  onChange,
  label,
  renderTrigger,
  align = 'right',
  tone = 'light',
  className,
  panelClassName,
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const buttonRef = useRef(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const triggerTone =
    tone === 'light'
      ? 'text-white/80 hover:text-white'
      : 'text-gray-700 hover:text-primary'

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={label}
        className={cn(
          'flex items-center gap-1 rounded py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
          triggerTone,
        )}
      >
        {renderTrigger ? renderTrigger(value) : value.label}
        <ChevronDown size={12} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <ul
          id={menuId}
          role="listbox"
          aria-label={label}
          className={cn(
            'absolute top-[calc(100%+8px)] z-[60] min-w-[9rem] animate-fade-in overflow-hidden rounded-md border border-gray-50 bg-white py-1 shadow-xl',
            align === 'right' ? 'right-0' : 'left-0',
            panelClassName,
          )}
        >
          {options.map((option) => {
            const selected = option.code === value.code
            return (
              <li key={option.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    if (!selected) onChange(option)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors',
                    selected
                      ? 'font-medium text-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary',
                  )}
                >
                  <span className="flex items-center gap-2">
                    {option.symbol && <span className="w-3 text-gray-400">{option.symbol}</span>}
                    {option.label}
                  </span>
                  {selected && <Check size={14} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
