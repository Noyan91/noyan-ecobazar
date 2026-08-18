import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

/** Builds a 1 … n page list with ellipses around the current page. */
function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) pages.push('…')
  for (let page = start; page <= end; page += 1) pages.push(page)
  if (end < total - 1) pages.push('…')
  pages.push(total)
  return pages
}

export default function Pagination({ page, totalPages, onChange, className }) {
  if (totalPages <= 1) return null
  const base =
    'grid h-10 w-10 place-items-center rounded-full text-sm font-medium transition-colors disabled:opacity-40'

  return (
    <nav className={cn('flex items-center justify-center gap-2', className)} aria-label="Pagination">
      <button
        type="button"
        className={cn(base, 'bg-gray-50 text-gray-600 hover:bg-primary hover:text-white')}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {pageList(page, totalPages).map((entry, index) =>
        entry === '…' ? (
          <span key={`gap-${index}`} className="px-1 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            onClick={() => onChange(entry)}
            aria-current={entry === page ? 'page' : undefined}
            className={cn(
              base,
              entry === page
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-primary-surface hover:text-primary',
            )}
          >
            {entry}
          </button>
        ),
      )}

      <button
        type="button"
        className={cn(base, 'bg-gray-50 text-gray-600 hover:bg-primary hover:text-white')}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  )
}
