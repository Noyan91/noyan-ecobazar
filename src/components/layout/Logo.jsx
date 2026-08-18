import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

/** Sprout mark + wordmark. `tone="light"` is for dark backgrounds. */
export default function Logo({ tone = 'dark', className }) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2', className)} aria-label="Ecobazar home">
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <path
          d="M16 30V13.5"
          stroke="#00B207"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16 16.5C16 10.7 20.9 6 27 6c0 5.8-4.9 10.5-11 10.5Z"
          fill="#00B207"
        />
        <path
          d="M15.4 13.8C11.6 13.8 8 10.6 8 6.2c4.1 0 7.4 3.2 7.4 7.6Z"
          fill="#2C742F"
        />
      </svg>
      <span
        className={cn(
          'text-[26px] font-semibold leading-none tracking-tight',
          tone === 'light' ? 'text-white' : 'text-gray-900',
        )}
      >
        Ecobazar
      </span>
    </Link>
  )
}
