import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Heart, LayoutGrid, LogOut, RefreshCw, Settings, ShoppingBag } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import { useStore } from '../../context/StoreContext'
import { cn } from '../../lib/utils'

const LINKS = [
  { to: '/account', label: 'Dashboard', Icon: LayoutGrid, end: true },
  { to: '/account/orders', label: 'Order History', Icon: RefreshCw },
  { to: '/wishlist', label: 'Wishlist', Icon: Heart },
  { to: '/cart', label: 'Shopping Cart', Icon: ShoppingBag },
  { to: '/account/settings', label: 'Settings', Icon: Settings },
]

/** Shell for the account area; unauthenticated visitors get sent to sign-in. */
export default function AccountLayout() {
  const { user, logout } = useStore()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/sign-in" replace state={{ from: pathname }} />

  const current =
    pathname.startsWith('/account/orders/') ? 'Order Detail'
    : pathname === '/account/orders' ? 'Order History'
    : pathname === '/account/settings' ? 'Settings'
    : 'Dashboard'

  return (
    <>
      <PageHeader trail={[{ label: 'Account', to: '/account' }, { label: current }]} />

      <div className="container-x grid gap-6 py-10 lg:grid-cols-[280px_1fr] lg:py-14">
        <aside className="h-fit overflow-hidden rounded-lg border border-gray-50">
          <h2 className="border-b border-gray-50 px-6 py-4 text-lg text-gray-900">Navigation</h2>
          <nav aria-label="Account">
            <ul>
              {LINKS.map(({ to, label, Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 border-l-2 px-6 py-3.5 text-sm transition-colors',
                        isActive && to.startsWith('/account')
                          ? 'border-primary bg-gray-50 font-medium text-gray-900'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      )
                    }
                  >
                    <Icon size={18} />
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  className="flex w-full items-center gap-3 border-l-2 border-transparent px-6 py-3.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-danger"
                >
                  <LogOut size={18} />
                  Log-out
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </>
  )
}
