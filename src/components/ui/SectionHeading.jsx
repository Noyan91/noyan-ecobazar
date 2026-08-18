import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'

/** Section title with the brand underline, plus an optional "View All" link. */
export default function SectionHeading({ eyebrow, title, viewAllTo, align = 'left', className }) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'mb-6 flex flex-wrap gap-4 md:mb-8',
        centered ? 'flex-col items-center text-center' : 'items-end justify-between',
        className,
      )}
    >
      <div className={centered ? 'flex flex-col items-center' : ''}>
        {eyebrow && (
          <p className="mb-1 text-sm font-medium uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h2 className={cn('text-2xl md:text-[32px]', centered ? 'heading-rule-center' : 'heading-rule')}>
          {title}
        </h2>
      </div>
      {viewAllTo && (
        <Link
          to={viewAllTo}
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-900 transition-colors hover:text-primary"
        >
          View All
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
