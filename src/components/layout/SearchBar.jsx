import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { products } from '../../data/products'
import { formatPrice } from '../../lib/utils'

/** Header search with live suggestions; Enter goes to the shop results page. */
export default function SearchBar({ onNavigate }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (term.length < 2) return []
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.tags.some((tag) => tag.toLowerCase().includes(term)),
      )
      .slice(0, 6)
  }, [query])

  useEffect(() => {
    const onClickAway = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickAway)
    return () => document.removeEventListener('mousedown', onClickAway)
  }, [])

  const submit = (event) => {
    event.preventDefault()
    const term = query.trim()
    if (!term) return
    navigate(`/shop?q=${encodeURIComponent(term)}`)
    setOpen(false)
    onNavigate?.()
  }

  const goToProduct = (product) => {
    navigate(`/product/${product.slug}`)
    setQuery('')
    setOpen(false)
    onNavigate?.()
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={submit} role="search" className="flex w-full items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search"
            aria-label="Search products"
            className="h-[45px] w-full rounded-l-md border border-gray-100 bg-white pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="h-[45px] shrink-0 rounded-r-md bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-hard"
        >
          Search
        </button>
      </form>

      {open && matches.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 animate-fade-in overflow-hidden rounded-md border border-gray-100 bg-white shadow-xl">
          <ul className="max-h-80 overflow-y-auto py-1">
            {matches.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => goToProduct(product)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-50"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded object-cover"
                    loading="lazy"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-gray-900">{product.name}</span>
                    <span className="block text-xs text-gray-500">{formatPrice(product.price)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={submit}
            className="w-full border-t border-gray-50 bg-gray-50 px-4 py-2.5 text-center text-sm font-medium text-primary transition-colors hover:bg-primary-surface"
          >
            See all results for “{query.trim()}”
          </button>
        </div>
      )}
    </div>
  )
}
