import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../lib/utils'

/** Main image plus a thumbnail rail; thumbnails switch the framing. */
export default function ProductGallery({ product, className }) {
  const [active, setActive] = useState(0)
  const views = product.gallery ?? [{ src: product.image, style: {} }]
  const view = views[active] ?? views[0]

  const step = (delta) => setActive((current) => (current + delta + views.length) % views.length)

  return (
    <div className={cn('flex gap-4', className)}>
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          className="text-gray-400 transition-colors hover:text-primary"
          aria-label="Previous image"
        >
          <ChevronUp size={20} />
        </button>
        <div className="flex flex-col gap-3">
          {views.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View ${index + 1}`}
              aria-current={index === active}
              className={cn(
                'h-16 w-16 overflow-hidden rounded-md border bg-gray-50 transition-colors',
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
          className="text-gray-400 transition-colors hover:text-primary"
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
