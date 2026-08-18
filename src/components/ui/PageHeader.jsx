import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

/**
 * The dark produce banner with breadcrumbs that sits under the header on
 * every inner page. `trail` is [{ label, to? }] — the last item is current.
 */
export default function PageHeader({ trail = [], title }) {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <img
        src="/images/products/market-1.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/20" />
      <div className="container-x relative flex min-h-[120px] flex-col justify-center py-8 md:min-h-[150px]">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
          <Link to="/" className="text-white/80 transition-colors hover:text-primary" aria-label="Home">
            <Home size={18} />
          </Link>
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1
            return (
              <Fragment key={item.label}>
                <ChevronRight size={16} className="text-white/50" />
                {isLast || !item.to ? (
                  <span className="font-medium text-primary">{item.label}</span>
                ) : (
                  <Link to={item.to} className="text-white/80 transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                )}
              </Fragment>
            )
          })}
        </nav>
        {title && <h1 className="mt-3 text-2xl text-white md:text-3xl">{title}</h1>}
      </div>
    </div>
  )
}
