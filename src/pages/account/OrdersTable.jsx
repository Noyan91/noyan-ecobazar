import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { useStore } from '../../context/StoreContext'
import { cn } from '../../lib/utils'

export const STATUS_STYLES = {
  Processing: 'text-warning',
  'On the way': 'text-primary',
  Completed: 'text-gray-600',
}

/** Order totals are derived from the catalogue so prices never drift. */
export function orderTotals(order) {
  const lines = order.items
    .map((line) => {
      const product = products.find((p) => p.id === line.id)
      return product ? { ...line, product, subtotal: product.price * line.quantity } : null
    })
    .filter(Boolean)
  const subtotal = lines.reduce((sum, line) => sum + line.subtotal, 0)
  const discount = (subtotal * (order.discount ?? 0)) / 100
  const total = subtotal - discount + (order.shipping ?? 0)
  const count = lines.reduce((sum, line) => sum + line.quantity, 0)
  return { lines, subtotal, discount, total, count }
}

export default function OrdersTable({ orders, limit }) {
  const { price } = useStore()
  const rows = limit ? orders.slice(0, limit) : orders

  if (rows.length === 0) {
    return (
      <p className="px-6 py-10 text-center text-sm text-gray-600">
        No orders yet — anything you buy will appear here.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-6 py-3.5 font-medium">Order ID</th>
            <th className="px-6 py-3.5 font-medium">Date</th>
            <th className="px-6 py-3.5 font-medium">Total</th>
            <th className="px-6 py-3.5 font-medium">Status</th>
            <th className="px-6 py-3.5" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-sm">
          {rows.map((order) => {
            const { total, count } = orderTotals(order)
            return (
              <tr key={order.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-gray-600">{order.date}</td>
                <td className="px-6 py-4 text-gray-600">
                  {price(total)}{' '}
                  <span className="text-gray-400">
                    ({count} Product{count === 1 ? '' : 's'})
                  </span>
                </td>
                <td className={cn('px-6 py-4 font-medium', STATUS_STYLES[order.status])}>
                  {order.status}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/account/orders/${order.id.replace('#', '')}`}
                    className="font-medium text-primary hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
