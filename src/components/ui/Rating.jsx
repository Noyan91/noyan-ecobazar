import { Star } from 'lucide-react'
import { cn } from '../../lib/utils'

/** Five stars, filled to the nearest whole star. */
export default function Rating({ value = 0, count, size = 14, className, showCount = false }) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, index) => {
          const filled = index < Math.round(value)
          return (
            <Star
              key={index}
              size={size}
              className={filled ? 'fill-warning text-warning' : 'fill-gray-100 text-gray-100'}
              aria-hidden="true"
            />
          )
        })}
      </div>
      {showCount && count != null && (
        <span className="ml-1 text-sm text-gray-500">
          {count} Review{count === 1 ? '' : 's'}
        </span>
      )}
      <span className="sr-only">{value} out of 5 stars</span>
    </div>
  )
}
