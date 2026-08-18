import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'

/** FAQ-style accordion; the first panel is open by default. */
export default function Accordion({ items, className }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {items.map((item, index) => {
        const open = openIndex === index
        return (
          <div
            key={item.q}
            className={cn(
              'overflow-hidden rounded-lg border transition-colors',
              open ? 'border-primary bg-white' : 'border-transparent bg-gray-50',
            )}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className={cn('font-medium', open ? 'text-primary' : 'text-gray-900')}>
                  {item.q}
                </span>
                <span
                  className={cn(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors',
                    open ? 'bg-primary-surface text-primary' : 'bg-white text-gray-600',
                  )}
                >
                  {open ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
            </h3>
            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="border-t border-gray-50 px-5 py-4 text-sm leading-7 text-gray-600">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
