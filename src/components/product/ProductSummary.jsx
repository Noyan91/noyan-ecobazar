import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { categoryName } from '../../data/categories'
import { cn, slugify } from '../../lib/utils'
import Button from '../ui/Button'
import QuantityStepper from '../ui/QuantityStepper'
import Rating from '../ui/Rating'
import { Facebook, Instagram, Twitter } from '../ui/SocialIcons'

/** Buy-box shared by the product page and the quick-view dialog. */
export default function ProductSummary({ product, compact = false }) {
  const { addToCart, toggleWishlist, isWishlisted, price } = useStore()
  const [quantity, setQuantity] = useState(1)
  const wishlisted = isWishlisted(product.id)

  const share = [
    { Icon: Facebook, label: 'Share on Facebook', primary: true },
    { Icon: Twitter, label: 'Share on Twitter' },
    { Icon: Instagram, label: 'Share on Instagram' },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className={cn('text-gray-900', compact ? 'text-2xl' : 'text-2xl md:text-[32px]')}>
          {product.name}
        </h1>
        <span
          className={cn(
            'rounded px-2 py-1 text-xs font-medium',
            product.inStock ? 'bg-primary-surface text-primary' : 'bg-danger/10 text-danger',
          )}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Rating value={product.rating} count={product.reviews} showCount />
        <span className="text-gray-200">•</span>
        <p className="text-sm text-gray-600">
          SKU: <span className="text-gray-900">{product.sku}</span>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {product.oldPrice && (
          <span className="text-lg text-gray-400 line-through">{price(product.oldPrice)}</span>
        )}
        <span className="text-2xl font-semibold text-primary">{price(product.price)}</span>
        {product.discount > 0 && (
          <span className="rounded bg-danger/10 px-2 py-1 text-xs font-medium text-danger">
            {product.discount}% Off
          </span>
        )}
        <span className="text-sm text-gray-500">/ {product.unit}</span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-y border-gray-50 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Brand:</span>
          <span className="rounded border border-gray-100 px-3 py-1 text-sm font-medium italic text-gray-900">
            {product.brand}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Share item:</span>
          <div className="flex items-center gap-2">
            {share.map(({ Icon, label, primary }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className={cn(
                  'grid h-8 w-8 place-items-center rounded-full transition-colors',
                  primary
                    ? 'bg-primary text-white hover:bg-primary-hard'
                    : 'text-gray-600 hover:text-primary',
                )}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-gray-600">{product.description}</p>

      {/* On phones the stepper and wishlist share a row, with a full-width buy button below */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} max={20} className="order-1" />
        <Button
          size="lg"
          className="order-3 w-full min-w-[180px] sm:order-2 sm:w-auto sm:flex-1"
          disabled={!product.inStock}
          onClick={() => addToCart(product, quantity)}
        >
          Add to Cart
          <ShoppingBag size={18} />
        </Button>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
          className={cn(
            'order-2 grid h-[51px] w-[51px] place-items-center rounded-full transition-colors sm:order-3',
            wishlisted
              ? 'bg-danger/10 text-danger'
              : 'bg-primary-surface text-primary hover:bg-primary hover:text-white',
          )}
        >
          <Heart size={20} className={wishlisted ? 'fill-danger' : undefined} />
        </button>
      </div>

      <dl className="mt-6 space-y-2 border-t border-gray-50 pt-5 text-sm">
        <div className="flex gap-3">
          <dt className="w-20 text-gray-600">Category:</dt>
          <dd>
            <Link
              to={`/shop?category=${product.category}`}
              className="text-gray-900 transition-colors hover:text-primary"
            >
              {categoryName(product.category)}
            </Link>
          </dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-20 shrink-0 text-gray-600">Tag:</dt>
          <dd className="flex flex-wrap gap-x-3 gap-y-1">
            {product.tags.map((tag) => (
              <Link
                key={tag}
                to={`/shop?tag=${slugify(tag)}`}
                className="text-gray-900 transition-colors hover:text-primary hover:underline"
              >
                {tag}
              </Link>
            ))}
          </dd>
        </div>
      </dl>
    </div>
  )
}
