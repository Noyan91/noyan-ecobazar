import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, X } from 'lucide-react'
import { Facebook, Instagram, Twitter } from '../components/ui/SocialIcons'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { useStore } from '../context/StoreContext'
import { cn, formatPrice } from '../lib/utils'

export default function Wishlist() {
  const { wishlistProducts, removeFromWishlist, addToCart } = useStore()

  useEffect(() => {
    document.title = 'My Wishlist — Ecobazar'
  }, [])

  return (
    <>
      <PageHeader trail={[{ label: 'Wishlist' }]} />

      <div className="container-x py-10 lg:py-14">
        <h1 className="text-center text-2xl md:text-[32px]">My Wishlist</h1>

        {wishlistProducts.length === 0 ? (
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-gray-50 text-gray-400">
              <Heart size={32} />
            </span>
            <h2 className="text-lg text-gray-900">Nothing saved yet</h2>
            <p className="text-sm text-gray-600">
              Tap the heart on any product to keep it here for later.
            </p>
            <Button to="/shop" size="lg">
              Browse products
            </Button>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-lg border border-gray-50">
            <table className="w-full">
              <thead className="hidden bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 sm:table-header-group">
                <tr>
                  <th className="px-5 py-4 font-medium">Product</th>
                  <th className="px-5 py-4 font-medium">Price</th>
                  <th className="px-5 py-4 font-medium">Stock Status</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {wishlistProducts.map((product) => (
                  <tr key={product.id} className="flex flex-wrap items-center gap-4 p-4 sm:table-row sm:p-0">
                    <td className="sm:px-5 sm:py-4">
                      <div className="flex items-center gap-4">
                        <Link
                          to={`/product/${product.slug}`}
                          className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-50"
                        >
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        </Link>
                        <Link
                          to={`/product/${product.slug}`}
                          className="text-sm text-gray-900 transition-colors hover:text-primary"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </td>
                    <td className="sm:px-5 sm:py-4">
                      <span className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</span>
                      {product.oldPrice && (
                        <span className="ml-2 text-xs text-gray-400 line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </td>
                    <td className="sm:px-5 sm:py-4">
                      <span
                        className={cn(
                          'rounded px-2 py-1 text-xs font-medium',
                          product.inStock ? 'bg-primary-surface text-primary' : 'bg-danger/10 text-danger',
                        )}
                      >
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="ml-auto flex items-center gap-3 sm:px-5 sm:py-4">
                      <Button size="sm" disabled={!product.inStock} onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label={`Remove ${product.name} from wishlist`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-gray-100 text-gray-400 transition-colors hover:border-danger hover:text-danger"
                      >
                        <X size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center gap-3 border-t border-gray-50 p-4">
              <span className="text-sm text-gray-600">Share:</span>
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label="Share wishlist"
                  className={cn(
                    'grid h-8 w-8 place-items-center rounded-full transition-colors',
                    index === 0
                      ? 'bg-primary text-white hover:bg-primary-hard'
                      : 'text-gray-600 hover:text-primary',
                  )}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
