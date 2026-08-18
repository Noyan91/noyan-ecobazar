import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ShoppingBag, X } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { formatPrice } from '../../lib/utils'
import Button from '../ui/Button'

/** Slide-over basket opened from the header cart button. */
export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartLines, cartCount, subtotal, removeFromCart } = useStore()

  useEffect(() => {
    if (!cartOpen) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setCartOpen(false)
    document.addEventListener('keydown', onKeyDown)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previous
    }
  }, [cartOpen, setCartOpen])

  if (!cartOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[110]">
      <div
        className="absolute inset-0 animate-fade-in bg-gray-900/60"
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute right-0 top-0 flex h-full w-[min(420px,100%)] animate-slide-left flex-col bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-gray-50 px-6 py-5">
          <h2 className="text-lg text-gray-900">Shopping Cart ({cartCount})</h2>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="text-gray-600 transition-colors hover:text-gray-900"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6">
          {cartLines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gray-50 text-gray-400">
                <ShoppingBag size={26} />
              </div>
              <p className="text-gray-600">Your cart is empty.</p>
              <Button to="/shop" onClick={() => setCartOpen(false)}>
                Start shopping
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {cartLines.map((line) => (
                <li key={line.id} className="flex items-center gap-4 py-4">
                  <Link
                    to={`/product/${line.product.slug}`}
                    onClick={() => setCartOpen(false)}
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-50"
                  >
                    <img
                      src={line.product.image}
                      alt={line.product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${line.product.slug}`}
                      onClick={() => setCartOpen(false)}
                      className="block truncate text-sm text-gray-900 transition-colors hover:text-primary"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-gray-500">
                      {line.quantity} × <span className="font-medium text-gray-900">{formatPrice(line.product.price)}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(line.id)}
                    aria-label={`Remove ${line.product.name}`}
                    className="grid h-7 w-7 place-items-center rounded-full border border-gray-100 text-gray-400 transition-colors hover:border-danger hover:text-danger"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartLines.length > 0 && (
          <footer className="border-t border-gray-50 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-600">{cartCount} Product{cartCount === 1 ? '' : 's'}</span>
              <span className="text-lg font-semibold text-gray-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Button to="/checkout" size="lg" full onClick={() => setCartOpen(false)}>
                Checkout
              </Button>
              <Button to="/cart" size="lg" variant="soft" full onClick={() => setCartOpen(false)}>
                Go To Cart
              </Button>
            </div>
          </footer>
        )}
      </aside>
    </div>,
    document.body,
  )
}
