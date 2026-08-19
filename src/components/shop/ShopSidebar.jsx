import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { categories, popularTags } from '../../data/categories'
import { productCountByCategory, saleProducts } from '../../data/products'
import { useStore } from '../../context/StoreContext'
import { cn, slugify } from '../../lib/utils'
import Rating from '../ui/Rating'

function Panel({ title, children }) {
  return (
    <section className="border-b border-gray-50 py-6 first:pt-0 last:border-0">
      <h3 className="mb-4 text-base font-semibold text-gray-900">{title}</h3>
      {children}
    </section>
  )
}

/** All shop filters. `filters` / `update` come from the Shop page URL state. */
export default function ShopSidebar({ filters, update, priceMax }) {
  const { price } = useStore()
  const ratings = [5, 4, 3, 2, 1]

  return (
    <aside className="w-full lg:w-[280px] lg:shrink-0" aria-label="Product filters">
      <Panel title="All Categories">
        <ul className="flex flex-col gap-3">
          <li>
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="radio"
                name="category"
                checked={!filters.category}
                onChange={() => update({ category: null, page: 1 })}
                className="h-4 w-4 accent-primary"
              />
              <span className={cn('flex-1', !filters.category ? 'text-gray-900' : 'text-gray-600')}>
                All Products
              </span>
            </label>
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category.slug}
                  onChange={() => update({ category: category.slug, page: 1 })}
                  className="h-4 w-4 accent-primary"
                />
                <span
                  className={cn(
                    'flex-1',
                    filters.category === category.slug ? 'font-medium text-primary' : 'text-gray-600',
                  )}
                >
                  {category.name}
                </span>
                <span className="text-xs text-gray-400">
                  ({productCountByCategory[category.slug] ?? 0})
                </span>
              </label>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Price">
        <div className="relative h-6">
          <div className="absolute top-2.5 h-1 w-full rounded-full bg-gray-100" />
          <div
            className="absolute top-2.5 h-1 rounded-full bg-primary"
            style={{
              left: `${(filters.minPrice / priceMax) * 100}%`,
              right: `${100 - (filters.maxPrice / priceMax) * 100}%`,
            }}
          />
          <input
            type="range"
            min={0}
            max={priceMax}
            value={filters.minPrice}
            onChange={(event) =>
              update({
                minPrice: Math.min(Number(event.target.value), filters.maxPrice - 1),
                page: 1,
              })
            }
            aria-label="Minimum price"
            className="top-2"
          />
          <input
            type="range"
            min={0}
            max={priceMax}
            value={filters.maxPrice}
            onChange={(event) =>
              update({
                maxPrice: Math.max(Number(event.target.value), filters.minPrice + 1),
                page: 1,
              })
            }
            aria-label="Maximum price"
            className="top-2"
          />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Price: <span className="font-medium text-gray-900">{price(filters.minPrice)}</span> —{' '}
          <span className="font-medium text-gray-900">{price(filters.maxPrice)}</span>
        </p>
      </Panel>

      <Panel title="Rating">
        <ul className="flex flex-col gap-3">
          {ratings.map((value) => (
            <li key={value}>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={filters.rating === value}
                  onChange={() => update({ rating: filters.rating === value ? null : value, page: 1 })}
                  className="h-4 w-4 rounded accent-primary"
                />
                <Rating value={value} />
                <span className="text-gray-600">{value === 5 ? '5.0' : `${value}.0 & up`}</span>
              </label>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Popular Tag">
        <ul className="flex flex-wrap gap-2">
          {popularTags.map((tag) => {
            const value = slugify(tag)
            const active = filters.tag === value
            return (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => update({ tag: active ? null : value, page: 1 })}
                  aria-pressed={active}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs transition-colors',
                    active
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-primary-surface hover:text-primary',
                  )}
                >
                  {tag}
                </button>
              </li>
            )
          })}
        </ul>
      </Panel>

      <div className="relative isolate my-6 overflow-hidden rounded-lg bg-gray-900 p-6 text-center">
        <img
          src="/images/products/red-capsicum.jpg"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative">
          <p className="text-2xl font-semibold text-warning">79% Discount</p>
          <p className="mt-1 text-sm text-white/80">on your first order</p>
          <Link
            to="/shop?sale=true"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-soft hover:underline"
          >
            Shop Now <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <Panel title="Sale Products">
        <ul className="flex flex-col gap-4">
          {saleProducts.slice(0, 3).map((product) => (
            <li key={product.id}>
              <Link
                to={`/product/${product.slug}`}
                className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-primary"
              >
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  className="h-14 w-14 shrink-0 rounded object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm text-gray-900 group-hover:text-primary">
                    {product.name}
                  </span>
                  <span className="mt-1 flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-900">{price(product.price)}</span>
                    <span className="text-xs text-gray-400 line-through">
                      {price(product.oldPrice)}
                    </span>
                  </span>
                  <Rating value={product.rating} size={12} className="mt-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>

      <button
        type="button"
        onClick={() =>
          update({
            category: null,
            tag: null,
            rating: null,
            sale: null,
            q: null,
            minPrice: 0,
            maxPrice: priceMax,
            page: 1,
          })
        }
        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-100 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary"
      >
        <Star size={15} /> Reset all filters
      </button>
    </aside>
  )
}
