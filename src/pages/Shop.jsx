import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import ShopSidebar from '../components/shop/ShopSidebar'
import Pagination from '../components/ui/Pagination'
import PageHeader from '../components/ui/PageHeader'
import { categoryName } from '../data/categories'
import { priceBounds, products } from '../data/products'
import { cn, formatPrice, slugify } from '../lib/utils'
import Rating from '../components/ui/Rating'
import Button from '../components/ui/Button'
import { useStore } from '../context/StoreContext'

const PER_PAGE = 12
const SORTS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popularity' },
  { value: 'rating', label: 'Average rating' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'discount', label: 'Biggest discount' },
]

/** Reads the shop filters out of the query string. */
function useFilters() {
  const [params, setParams] = useSearchParams()

  const filters = {
    category: params.get('category'),
    tag: params.get('tag'),
    q: params.get('q') ?? '',
    sale: params.get('sale') === 'true',
    rating: params.get('rating') ? Number(params.get('rating')) : null,
    sort: params.get('sort') ?? 'latest',
    minPrice: Number(params.get('minPrice') ?? 0),
    maxPrice: Number(params.get('maxPrice') ?? priceBounds.max),
    page: Number(params.get('page') ?? 1),
  }

  const update = (patch) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([key, value]) => {
      // Falsy values and page 1 are defaults, so they stay out of the URL.
      if (value === null || value === '' || value === false || (key === 'page' && value === 1)) {
        next.delete(key)
      } else {
        next.set(key, String(value))
      }
    })
    if (!('page' in patch)) next.delete('page')
    setParams(next, { replace: false })
  }

  return [filters, update]
}

/** Row layout used when the list view is selected. */
function ProductRow({ product }) {
  const { addToCart } = useStore()
  return (
    <article className="group flex flex-col gap-4 rounded-lg border border-gray-100 p-4 transition-colors hover:border-primary sm:flex-row sm:items-center">
      <Link to={`/product/${product.slug}`} className="h-40 w-full shrink-0 overflow-hidden rounded-md bg-gray-50 sm:h-32 sm:w-32">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex-1">
        <h3 className="text-base text-gray-900">
          <Link to={`/product/${product.slug}`} className="transition-colors hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-2">
          <span className="font-semibold text-gray-900">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </p>
        <Rating value={product.rating} count={product.reviews} showCount className="mt-2" />
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{product.description}</p>
      </div>
      <Button onClick={() => addToCart(product)} disabled={!product.inStock} className="sm:self-center">
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </Button>
    </article>
  )
}

export default function Shop() {
  const [filters, update] = useFilters()
  const [view, setView] = useState('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    document.title = 'Shop — Ecobazar'
  }, [])

  const filtered = useMemo(() => {
    const term = filters.q.trim().toLowerCase()
    let list = products.filter((product) => {
      if (filters.category && product.category !== filters.category) return false
      if (filters.tag && !product.tags.some((tag) => slugify(tag) === filters.tag)) return false
      if (filters.sale && !product.onSale) return false
      if (filters.rating && product.rating < filters.rating) return false
      if (product.price < filters.minPrice || product.price > filters.maxPrice) return false
      if (
        term &&
        !product.name.toLowerCase().includes(term) &&
        !product.tags.some((tag) => tag.toLowerCase().includes(term)) &&
        !categoryName(product.category).toLowerCase().includes(term)
      ) {
        return false
      }
      return true
    })

    const sorters = {
      latest: (a, b) => b.id - a.id,
      popular: (a, b) => b.reviews - a.reviews,
      rating: (a, b) => b.rating - a.rating,
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      discount: (a, b) => b.discount - a.discount,
    }
    list = [...list].sort(sorters[filters.sort] ?? sorters.latest)
    return list
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const page = Math.min(filters.page, totalPages)
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const activeChips = [
    filters.category && { label: categoryName(filters.category), clear: { category: null } },
    filters.tag && { label: filters.tag.replace(/-/g, ' '), clear: { tag: null } },
    filters.q && { label: `“${filters.q}”`, clear: { q: null } },
    filters.sale && { label: 'On sale', clear: { sale: null } },
    filters.rating && { label: `${filters.rating}.0 & up`, clear: { rating: null } },
    (filters.minPrice > 0 || filters.maxPrice < priceBounds.max) && {
      label: `${formatPrice(filters.minPrice)} – ${formatPrice(filters.maxPrice)}`,
      clear: { minPrice: 0, maxPrice: priceBounds.max },
    },
  ].filter(Boolean)

  return (
    <>
      <PageHeader trail={[{ label: 'Shop' }]} />

      <div className="container-x flex flex-col gap-8 py-10 lg:flex-row lg:py-14">
        {/* Filters: inline on desktop, drawer on mobile */}
        <div className="hidden lg:block">
          <ShopSidebar filters={filters} update={update} priceMax={priceBounds.max} />
        </div>

        {filtersOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div
              className="absolute inset-0 bg-gray-900/60"
              onClick={() => setFiltersOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute left-0 top-0 h-full w-[min(340px,88%)] animate-slide-left overflow-y-auto bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg text-gray-900">Filters</h2>
                <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                  <X size={22} className="text-gray-600" />
                </button>
              </div>
              <ShopSidebar filters={filters} update={update} priceMax={priceBounds.max} />
              <Button full className="mt-4" onClick={() => setFiltersOpen(false)}>
                Show {filtered.length} results
              </Button>
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white lg:hidden"
            >
              <SlidersHorizontal size={16} /> Filter
            </button>

            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm text-gray-600">
                Sort by:
              </label>
              <select
                id="sort"
                value={filters.sort}
                onChange={(event) => update({ sort: event.target.value, page: 1 })}
                className="h-10 rounded-md border border-gray-100 bg-white px-3 text-sm text-gray-900 focus:border-primary focus:outline-none"
              >
                {SORTS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <div className="hidden items-center gap-1 sm:flex">
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  aria-label="Grid view"
                  aria-pressed={view === 'grid'}
                  className={cn(
                    'grid h-9 w-9 place-items-center rounded-md transition-colors',
                    view === 'grid' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary',
                  )}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setView('list')}
                  aria-label="List view"
                  aria-pressed={view === 'list'}
                  className={cn(
                    'grid h-9 w-9 place-items-center rounded-md transition-colors',
                    view === 'list' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary',
                  )}
                >
                  <List size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{filtered.length}</span> Results Found
              </p>
            </div>
          </div>

          {activeChips.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2 border-y border-gray-50 py-3">
              <span className="text-sm text-gray-500">Active Filters:</span>
              {activeChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => update({ ...chip.clear, page: 1 })}
                  className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs capitalize text-gray-700 transition-colors hover:bg-danger/10 hover:text-danger"
                >
                  {chip.label}
                  <X size={13} />
                </button>
              ))}
            </div>
          )}

          {visible.length === 0 ? (
            <div className="mt-16 flex flex-col items-center gap-4 text-center">
              <p className="text-lg font-medium text-gray-900">No products match those filters</p>
              <p className="max-w-sm text-sm text-gray-600">
                Try widening the price range, clearing a tag, or searching for something else.
              </p>
              <Button
                onClick={() =>
                  update({
                    category: null,
                    tag: null,
                    rating: null,
                    sale: null,
                    q: null,
                    minPrice: 0,
                    maxPrice: priceBounds.max,
                    page: 1,
                  })
                }
              >
                Clear filters
              </Button>
            </div>
          ) : view === 'grid' ? (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              {visible.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </div>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(next) => {
              update({ page: next })
              window.scrollTo({ top: 300, behavior: 'smooth' })
            }}
            className="mt-10"
          />
        </div>
      </div>
    </>
  )
}
