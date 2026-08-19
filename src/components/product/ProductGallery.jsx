import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Main image plus a thumbnail rail; thumbnails switch the framing.
 * The rail sits under the image on phones and beside it from `sm` up.
 */
export default function ProductGallery({ product, className }) {
  const [active, setActive] = useState(0)
  const views = product.gallery ?? [{ src: product.image, style: {} }]
  const view = views[active] ?? views[0]

  const step = (delta) => setActive((current) => (current + delta + views.length) % views.length)

  return (
    <div className={cn('flex flex-col-reverse gap-4 sm:flex-row', className)}>
      <div className="flex items-center gap-2 sm:flex-col">
        <button
          type="button"
          onClick={() => step(-1)}
          className="hidden text-gray-400 transition-colors hover:text-primary sm:block"
          aria-label="Previous image"
        >
          <ChevronUp size={20} />
        </button>

        <div className="scrollbar-none flex flex-1 gap-3 overflow-x-auto sm:flex-none sm:flex-col sm:overflow-visible">
          {views.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View ${index + 1}`}
              aria-current={index === active}
              className={cn(
                'h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-gray-50 transition-colors',
                index === active ? 'border-primary' : 'border-transparent hover:border-gray-100',
              )}
            >
              <img
                src={item.src}
                alt=""
                className="h-full w-full object-cover"
                style={item.style}
                loading="lazy"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          className="hidden text-gray-400 transition-colors hover:text-primary sm:block"
          aria-label="Next image"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg bg-gray-50">
        <img
          src={view.src}
          alt={product.name}
          className="h-full max-h-[460px] w-full object-cover transition-all duration-500"
          style={view.style}
        />
      </div>
    </div>
  )
}
