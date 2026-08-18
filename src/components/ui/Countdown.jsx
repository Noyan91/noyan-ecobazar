import { useEffect, useMemo, useState } from 'react'
import { cn } from '../../lib/utils'

/** Live countdown; `days` sets how far ahead the deal ends. */
export default function Countdown({ days = 3, tone = 'light', className }) {
  const target = useMemo(() => Date.now() + days * 24 * 60 * 60 * 1000, [days])
  const [remaining, setRemaining] = useState(() => target - Date.now())

  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(target - Date.now(), 0)), 1000)
    return () => clearInterval(id)
  }, [target])

  const seconds = Math.floor(remaining / 1000)
  const parts = [
    { label: 'Days', value: Math.floor(seconds / 86400) },
    { label: 'Hours', value: Math.floor((seconds % 86400) / 3600) },
    { label: 'Mins', value: Math.floor((seconds % 3600) / 60) },
    { label: 'Secs', value: seconds % 60 },
  ]

  return (
    <div className={cn('flex items-center gap-2 sm:gap-3', className)}>
      {parts.map((part, index) => (
        <div key={part.label} className="flex items-center gap-1.5 sm:gap-3">
          <div
            className={cn(
              'flex flex-col items-center justify-center rounded-md',
              'h-14 w-14 sm:h-16 sm:w-16',
              tone === 'light' ? 'bg-white text-gray-900' : 'bg-white/15 text-white backdrop-blur',
            )}
          >
            <span className="text-lg font-semibold leading-none sm:text-xl">
              {String(part.value).padStart(2, '0')}
            </span>
            <span
              className={cn(
                'mt-0.5 text-[10px] uppercase leading-none',
                tone === 'light' ? 'text-gray-500' : 'text-white/70',
              )}
            >
              {part.label}
            </span>
          </div>
          {index < parts.length - 1 && (
            <span className={cn('font-semibold', tone === 'light' ? 'text-gray-400' : 'text-white/60')}>
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
