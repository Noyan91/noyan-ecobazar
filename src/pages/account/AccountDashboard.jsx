import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../components/ui/Avatar'
import { useStore } from '../../context/StoreContext'
import OrdersTable from './OrdersTable'

export default function AccountDashboard() {
  const { user, orders } = useStore()

  useEffect(() => {
    document.title = 'My Account — Ecobazar'
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="flex flex-col items-center rounded-lg border border-gray-50 p-6 text-center">
          <Avatar
            name={`${user.firstName} ${user.lastName}`}
            src={user.avatar}
            size={96}
            className="text-2xl"
          />
          <p className="mt-4 text-lg font-semibold text-gray-900">
            {user.firstName} {user.lastName}
          </p>
          <p className="mt-1 text-sm text-gray-500">Customer</p>
          <Link to="/account/settings" className="mt-3 text-sm font-medium text-primary hover:underline">
            Edit Profile
          </Link>
        </section>

        <section className="rounded-lg border border-gray-50 p-6">
          <h2 className="text-xs uppercase tracking-wide text-gray-500">Billing Address</h2>
          <p className="mt-4 font-semibold text-gray-900">
            {user.billing?.firstName} {user.billing?.lastName}
          </p>
          <p className="mt-2 text-sm leading-7 text-gray-600">
            {user.billing?.street}, {user.billing?.state} {user.billing?.zip}
          </p>
          <p className="mt-2 text-sm text-gray-600">{user.email}</p>
          <p className="mt-1 text-sm text-gray-600">{user.phone}</p>
          <Link to="/account/settings" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            Edit Address
          </Link>
        </section>
      </div>

      <section className="overflow-hidden rounded-lg border border-gray-50">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg text-gray-900">Recent Order History</h2>
          <Link to="/account/orders" className="text-sm font-medium text-primary hover:underline">
            View All
          </Link>
        </div>
        <OrdersTable orders={orders} limit={6} />
      </section>
    </div>
  )
}
