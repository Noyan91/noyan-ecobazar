import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, X } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import QuantityStepper from '../components/ui/QuantityStepper'
import { useStore } from '../context/StoreContext'
import { SHIPPING_FREE_THRESHOLD } from '../context/StoreContext'
import { formatPrice } from '../lib/utils'

export default function Cart() {
  const {
    cartLines,
    subtotal,
    discount,
    shipping,
    total,
    coupon,
    setQuantity,
    removeFromCart,
    applyCoupon,
    clearCoupon,
    toast,
  } = useStore()
  const [code, setCode] = useState('')

  useEffect(() => {
    document.title = 'Shopping Cart — Ecobazar'
  }, [])

  return (
    <>
      <PageHeader trail={[{ label: 'Shopping cart' }]} />

      <div className="container-x py-10 lg:py-14">
        <h1 className="text-center text-2xl md:text-[32px]">My Shopping Cart</h1>

        {cartLines.length === 0 ? (
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-gray-50 text-gray-400">
              <ShoppingBag size={32} />
            </span>
            <h2 className="text-lg text-gray-900">Your cart is empty</h2>
            <p className="text-sm text-gray-600">
              Browse the shop and add a few fresh things — your basket is saved on this device.
            </p>
            <Button to="/shop" size="lg">
              Return to shop
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <div className="overflow-hidden rounded-lg border border-gray-50">
                <table className="w-full">
                  <thead className="hidden bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 sm:table-header-group">
                    <tr>
                      <th className="px-5 py-4 font-medium">Product</th>
                      <th className="px-5 py-4 font-medium">Price</th>
                      <th className="px-5 py-4 font-medium">Quantity</th>
                      <th className="px-5 py-4 font-medium">Subtotal</th>
                      <th className="px-5 py-4" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cartLines.map((line) => (
                      <tr key={line.id} className="flex flex-wrap items-center gap-4 p-4 sm:table-row sm:p-0">
                        <td className="sm:px-5 sm:py-4">
                          <div className="flex items-center gap-4">
                            <Link
                              to={`/product/${line.product.slug}`}
                              className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-50"
                            >
                              <img
                                src={line.product.image}
                                alt={line.product.name}
                                className="h-full w-full object-cover"
                              />
                            </Link>
                            <Link
                              to={`/product/${line.product.slug}`}
                              className="text-sm text-gray-900 transition-colors hover:text-primary"
                            >
                              {line.product.name}
                            </Link>
                          </div>
                        </td>
                        <td className="text-sm text-gray-600 sm:px-5 sm:py-4">
                          {formatPrice(line.product.price)}
                        </td>
                        <td className="sm:px-5 sm:py-4">
                          <QuantityStepper
                            size="sm"
                            value={line.quantity}
                            onChange={(value) => setQuantity(line.id, value)}
                          />
                        </td>
                        <td className="text-sm font-semibold text-gray-900 sm:px-5 sm:py-4">
                          {formatPrice(line.subtotal)}
                        </td>
                        <td className="ml-auto sm:px-5 sm:py-4">
                          <button
                            type="button"
                            onClick={() => removeFromCart(line.id)}
                            aria-label={`Remove ${line.product.name}`}
                            className="grid h-7 w-7 place-items-center rounded-full border border-gray-100 text-gray-400 transition-colors hover:border-danger hover:text-danger"
                          >
                            <X size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-50 p-4">
                  <Button to="/shop" variant="ghost">
                    Return to shop
                  </Button>
                  <Button variant="ghost" onClick={() => toast('Cart updated')}>
                    Update Cart
                  </Button>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-gray-50 p-5">
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    if (applyCoupon(code)) setCode('')
                  }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <span className="text-base font-semibold text-gray-900">Coupon Code</span>
                  <input
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="Enter code"
                    aria-label="Coupon code"
                    className="h-11 min-w-[180px] flex-1 rounded-full border border-gray-100 px-5 text-sm focus:border-primary focus:outline-none"
                  />
                  <Button type="submit" variant="dark">
                    Apply Coupon
                  </Button>
                </form>
                <p className="mt-3 text-xs text-gray-500">
                  Try <span className="font-semibold text-primary">ECO20</span> for 20% off, or{' '}
                  <span className="font-semibold text-primary">SAVE15</span> on baskets over $100.
                </p>
              </div>
            </div>

            <aside className="h-fit rounded-lg border border-gray-50 p-6">
              <h2 className="text-lg text-gray-900">Cart Total</h2>
              <dl className="mt-5 flex flex-col gap-3 text-sm">
                <div className="flex justify-between border-b border-gray-50 pb-3">
                  <dt className="text-gray-600">Subtotal:</dt>
                  <dd className="font-medium text-gray-900">{formatPrice(subtotal)}</dd>
                </div>
                {coupon && (
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <dt className="flex items-center gap-2 text-gray-600">
                      Coupon ({coupon.code})
                      <button
                        type="button"
                        onClick={clearCoupon}
                        className="text-danger hover:underline"
                        aria-label="Remove coupon"
                      >
                        <X size={13} />
                      </button>
                    </dt>
                    <dd className="font-medium text-primary">−{formatPrice(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between border-b border-gray-50 pb-3">
                  <dt className="text-gray-600">Shipping:</dt>
                  <dd className="font-medium text-gray-900">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between pt-1">
                  <dt className="text-gray-900">Total:</dt>
                  <dd className="text-lg font-semibold text-gray-900">{formatPrice(total)}</dd>
                </div>
              </dl>

              {shipping > 0 && (
                <p className="mt-3 rounded-md bg-primary-surface px-3 py-2 text-xs text-primary-hard">
                  Add {formatPrice(SHIPPING_FREE_THRESHOLD - (subtotal - discount))} more to unlock free
                  shipping.
                </p>
              )}

              <Button to="/checkout" size="lg" full className="mt-6">
                Proceed to checkout
              </Button>
            </aside>
          </div>
        )}
      </div>
    </>
  )
}
