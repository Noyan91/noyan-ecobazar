import { useEffect, useState } from 'react'
import Pagination from '../../components/ui/Pagination'
import { useStore } from '../../context/StoreContext'
import OrdersTable from './OrdersTable'

const PER_PAGE = 8

export default function OrderHistory() {
  const { orders } = useStore()
  const [page, setPage] = useState(1)

  useEffect(() => {
    document.title = 'Order History — Ecobazar'
  }, [])

  const totalPages = Math.max(1, Math.ceil(orders.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const visible = orders.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  return (
    <section className="overflow-hidden rounded-lg border border-gray-50">
      <h1 className="px-6 py-4 text-lg text-gray-900">Order History</h1>
      <OrdersTable orders={visible} />
      {totalPages > 1 && (
        <div className="border-t border-gray-50 py-5">
          <Pagination page={current} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </section>
  )
}
