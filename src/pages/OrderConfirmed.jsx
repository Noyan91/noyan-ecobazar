import { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'

export default function OrderConfirmed() {
  const { state } = useLocation()
  const { orders, price } = useStore()
  const order = orders.find((item) => item.id === state?.orderId) ?? orders[0]

  useEffect(() => {
    document.title = 'Order confirmed — Ecobazar'
  }, [])

  if (!order) return <Navigate to="/shop" replace />

  const lines = order.items
    .map((line) => {
      const product = products.find((p) => p.id === line.id)
      return product ? { ...line, product } : null
    })
    .filter(Boolean)
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)

  return (
    <>
      <PageHeader trail={[{ label: 'Checkout', to: '/checkout' }, { label: 'Order confirmed' }]} />

      <div className="container-x py-12 lg:py-16">
        <div className="mx-auto max-w-2xl rounded-lg border border-gray-50 p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-surface text-primary">
            <CheckCircle2 size={32} />
          </span>
          <h1 className="mt-5 text-2xl md:text-[32px]">Thank you for your order</h1>
          <p className="mt-2 text-sm text-gray-600">
            Order <span className="font-semibold text-gray-900">{order.id}</span> was placed on{' '}
            {order.date}. A confirmation email is on its way, and you can track progress from your
            account at any time.
          </p>

          <ul className="mt-8 divide-y divide-gray-50 text-left">
            {lines.map((line) => (
              <li key={line.id} className="flex items-center gap-3 py-3">
                <img src={line.product.image} alt="" className="h-12 w-12 rounded object-cover" />
                <span className="min-w-0 flex-1 truncate text-sm text-gray-700">
                  {line.product.name} <span className="text-gray-400">×{line.quantity}</span>
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {price(line.product.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between border-t border-gray-50 pt-4 text-left">
            <span className="text-gray-900">Total paid</span>
            <span className="text-lg font-semibold text-gray-900">
              {price(subtotal * (1 - (order.discount ?? 0) / 100) + (order.shipping ?? 0))}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to={`/account/orders/${order.id.replace('#', '')}`} size="lg">
              Track your order
            </Button>
            <Button to="/shop" variant="outline" size="lg">
              Continue shopping
            </Button>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Need to change something?{' '}
            <Link to="/contact" className="font-medium text-primary hover:underline">
              Contact our support team
            </Link>{' '}
            — orders can be edited until they leave the depot.
          </p>
        </div>
      </div>
    </>
  )
}
