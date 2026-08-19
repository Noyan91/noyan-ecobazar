import { Link } from 'react-router-dom'
import { Eye, Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { cn } from '../../lib/utils'
import Rating from '../ui/Rating'

/**
 * Catalogue tile used across the home page, shop grid and related rails.
 * `variant="compact"` renders the small horizontal row used in the deal rails.
 */
export default function ProductCard({ product, variant = 'grid', className }) {
  const { addToCart, toggleWishlist, isWishlisted, setQuickView, cart, price } = useStore()
  const wishlisted = isWishlisted(product.id)
  const inCart = cart.some((line) => line.id === product.id)

  if (variant === 'compact') {
    return (
      <article
        className={cn(
          'group flex items-center gap-4 rounded-lg border border-transparent bg-white p-2 transition-colors hover:border-primary',
          className,
        )}
      >
        <Link
          to={`/product/${product.slug}`}
          className="grid h-[72px] w-[72px] shrink-0 place-items-center overflow-hidden rounded-md bg-gray-50"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm text-gray-900">
            <Link to={`/product/${product.slug}`} className="transition-colors hover:text-primary">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-900">{price(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">{price(product.oldPrice)}</span>
            )}
          </p>
          <Rating value={product.rating} className="mt-1" size={12} />
        </div>
        <button
          type="button"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to cart`}
          className={cn(
            'grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors',
            inCart ? 'bg-primary text-white' : 'bg-gray-50 text-gray-600 hover:bg-primary hover:text-white',
          )}
        >
          <ShoppingBag size={16} />
        </button>
      </article>
    )
  }

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-all duration-300 hover:border-primary hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]',
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <Link to={`/product/${product.slug}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {!product.inStock && (
            <span className="rounded bg-gray-900 px-2 py-1 text-[11px] font-medium text-white">
              Out of Stock
            </span>
          )}
          {product.inStock && product.discount > 0 && (
            <span className="rounded bg-danger px-2 py-1 text-[11px] font-medium text-white">
              Sale {product.discount}%
            </span>
          )}
          {product.isNew && product.discount === 0 && product.inStock && (
            <span className="rounded bg-primary px-2 py-1 text-[11px] font-medium text-white">New</span>
          )}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 max-lg:opacity-100">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            className={cn(
              'grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm transition-colors',
              wishlisted ? 'text-danger' : 'text-gray-600 hover:text-primary',
            )}
          >
            <Heart size={16} className={wishlisted ? 'fill-danger' : undefined} />
          </button>
          <button
            type="button"
            onClick={() => setQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="grid h-8 w-8 place-items-center rounded-full bg-white text-gray-600 shadow-sm transition-colors hover:text-primary"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Stacks on small phones so the name and price are not squeezed by the button */}
      <div className="flex flex-1 flex-col gap-2 border-t border-gray-50 p-3 xs:flex-row xs:items-end xs:justify-between">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm text-gray-900">
            <Link to={`/product/${product.slug}`} className="transition-colors hover:text-primary">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 flex flex-wrap items-center gap-2">
            <span className="font-medium text-gray-900">{price(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">{price(product.oldPrice)}</span>
            )}
          </p>
          <Rating value={product.rating} className="mt-1.5" />
        </div>
        <button
          type="button"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          aria-label={`Add ${product.name} to cart`}
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center self-end rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40',
            inCart
              ? 'bg-primary text-white'
              : 'bg-gray-50 text-gray-900 hover:bg-primary hover:text-white',
          )}
        >
          <ShoppingBag size={18} />
        </button>
      </div>
    </article>
  )
}
