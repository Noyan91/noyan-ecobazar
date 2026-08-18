import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { cn, formatPrice } from '../../lib/utils'
import { orderTotals } from './OrdersTable'

const STAGES = ['Order received', 'Processing', 'On the way', 'Delivered']

const stageIndex = (status) => {
  if (status === 'Completed') return 3
  const index = STAGES.indexOf(status)
  return index === -1 ? 1 : index
}

export default function OrderDetail() {
  const { id } = useParams()
  const { orders, user } = useStore()
  const order = orders.find((item) => item.id === `#${id}`)

  useEffect(() => {
    document.title = `Order #${id} — Ecobazar`
  }, [id])

  if (!order) {
    return (
      <section className="rounded-lg border border-gray-50 p-10 text-center">
        <h1 className="text-lg text-gray-900">Order not found</h1>
        <p className="mt-2 text-sm text-gray-600">
          We could not find order #{id} on this account.
        </p>
        <Link to="/account/orders" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
          Back to order history
        </Link>
      </section>
    )
  }

  const { lines, subtotal, discount, total, count } = orderTotals(order)
  const active = stageIndex(order.status)
  const billing = order.billing ?? user.billing ?? {}

  return (
    <section className="overflow-hidden rounded-lg border border-gray-50">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-50 px-6 py-4">
        <h1 className="text-lg text-gray-900">
          Order Details <span className="text-gray-300">•</span>{' '}
          <span className="text-sm font-normal text-gray-600">{order.date}</span>{' '}
          <span className="text-gray-300">•</span>{' '}
          <span className="text-sm font-normal text-gray-600">
            {count} Product{count === 1 ? '' : 's'}
          </span>
        </h1>
        <Link to="/account/orders" className="text-sm font-medium text-primary hover:underline">
          Back to List
        </Link>
      </header>

      <div className="grid gap-4 p-6 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-50 p-5">
          <h2 className="text-xs uppercase tracking-wide text-gray-500">Billing Address</h2>
          <p className="mt-3 font-semibold text-gray-900">
            {billing.firstName} {billing.lastName}
          </p>
          <p className="mt-2 text-sm leading-7 text-gray-600">
            {billing.street}, {billing.state} {billing.zip}
          </p>
          <p className="mt-3 text-xs uppercase tracking-wide text-gray-400">Email</p>
          <p className="text-sm text-gray-600">{billing.email}</p>
          <p className="mt-2 text-xs uppercase tracking-wide text-gray-400">Phone</p>
          <p className="text-sm text-gray-600">{billing.phone}</p>
        </div>

        <div className="rounded-lg border border-gray-50 p-5">
          <h2 className="text-xs uppercase tracking-wide text-gray-500">Shipping Address</h2>
          <p className="mt-3 font-semibold text-gray-900">
            {billing.firstName} {billing.lastName}
          </p>
          <p className="mt-2 text-sm leading-7 text-gray-600">
            {billing.street}, {billing.state} {billing.zip}
          </p>
          <p className="mt-3 text-xs uppercase tracking-wide text-gray-400">Delivery</p>
          <p className="text-sm text-gray-600">
            {order.shipping === 0 ? 'Free next-day delivery' : formatPrice(order.shipping)}
          </p>
        </div>

        <div className="rounded-lg border border-gray-50 p-5">
          <div className="flex justify-between gap-4 border-b border-gray-50 pb-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">Order ID</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-gray-400">Payment Method</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{order.paymentMethod}</p>
            </div>
          </div>
          <dl className="mt-3 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Subtotal:</dt>
              <dd className="text-gray-900">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Discount:</dt>
              <dd className="text-gray-900">{order.discount ?? 0}%</dd>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <dt className="text-gray-600">Shipping:</dt>
              <dd className="text-gray-900">
                {order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}
              </dd>
            </div>
            <div className="flex justify-between pt-1">
              <dt className="font-medium text-gray-900">Total</dt>
              <dd className="text-lg font-semibold text-primary">{formatPrice(total)}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Progress tracker */}
      <div className="px-6 pb-8">
        <ol className="flex items-start">
          {STAGES.map((stage, index) => {
            const done = index < active
            const currentStage = index === active
            return (
              <li key={stage} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  <span
                    className={cn(
                      'h-1 flex-1 rounded-full',
                      index === 0 ? 'bg-transparent' : done || currentStage ? 'bg-primary' : 'bg-gray-100',
                    )}
                  />
                  <span
                    className={cn(
                      'grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 text-xs font-semibold',
                      done
                        ? 'border-primary bg-primary text-white'
                        : currentStage
                          ? 'border-primary bg-primary text-white'
                          : 'border-dashed border-primary/40 bg-white text-primary/60',
                    )}
                  >
                    {done ? <Check size={16} /> : String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'h-1 flex-1 rounded-full',
                      index === STAGES.length - 1
                        ? 'bg-transparent'
                        : done
                          ? 'bg-primary'
                          : 'bg-gray-100',
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'mt-2 text-center text-xs',
                    done || currentStage ? 'font-medium text-primary' : 'text-gray-500',
                  )}
                >
                  {stage}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="overflow-x-auto border-t border-gray-50">
        <table className="w-full min-w-[560px]">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-6 py-3.5 font-medium">Product</th>
              <th className="px-6 py-3.5 font-medium">Price</th>
              <th className="px-6 py-3.5 font-medium">Quantity</th>
              <th className="px-6 py-3.5 font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {lines.map((line) => (
              <tr key={line.id}>
                <td className="px-6 py-4">
                  <Link to={`/product/${line.product.slug}`} className="flex items-center gap-3">
                    <img
                      src={line.product.image}
                      alt=""
                      className="h-12 w-12 rounded object-cover"
                      loading="lazy"
                    />
                    <span className="text-gray-900 hover:text-primary">{line.product.name}</span>
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-600">{formatPrice(line.product.price)}</td>
                <td className="px-6 py-4 text-gray-600">×{line.quantity}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{formatPrice(line.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {discount > 0 && (
        <p className="px-6 py-4 text-sm text-gray-600">
          Discount applied: <span className="font-medium text-primary">−{formatPrice(discount)}</span>
        </p>
      )}
    </section>
  )
}
