import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  PhoneCall,
  ShoppingBag,
  User,
  X,
} from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { categories } from '../../data/categories'
import { storeInfo } from '../../data/content'
import { cn, formatPrice } from '../../lib/utils'
import Logo from './Logo'
import SearchBar from './SearchBar'

const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'Shop',
    to: '/shop',
    children: [
      { label: 'All Products', to: '/shop' },
      ...categories.slice(0, 8).map((c) => ({ label: c.name, to: `/shop?category=${c.slug}` })),
    ],
  },
  {
    label: 'Pages',
    children: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQs', to: '/faq' },
      { label: 'Wishlist', to: '/wishlist' },
      { label: 'Shopping Cart', to: '/cart' },
      { label: 'Checkout', to: '/checkout' },
      { label: 'My Account', to: '/account' },
      { label: 'Sign In', to: '/sign-in' },
      { label: 'Sign Up', to: '/sign-up' },
      { label: '404 Page', to: '/404' },
    ],
  },
  {
    label: 'Blog',
    to: '/blog',
    children: [
      { label: 'Blog Grid', to: '/blog' },
      { label: 'Blog Details', to: '/blog/seasonal-citrus-guide' },
    ],
  },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]

function DesktopNavItem({ item }) {
  const { pathname, search } = useLocation()
  const isActive =
    item.to === '/'
      ? pathname === '/'
      : item.to
        ? pathname.startsWith(item.to)
        : item.children?.some((child) => child.to === pathname + search)

  return (
    <li className="group relative">
      {item.to ? (
        <Link
          to={item.to}
          className={cn(
            'flex items-center gap-1 py-4 text-sm font-medium transition-colors hover:text-primary',
            isActive ? 'text-primary' : 'text-gray-700',
          )}
        >
          {item.label}
          {item.children && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />}
        </Link>
      ) : (
        <button
          type="button"
          className="flex items-center gap-1 py-4 text-sm font-medium text-gray-700 transition-colors hover:text-primary"
          aria-haspopup="true"
        >
          {item.label}
          <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
        </button>
      )}

      {item.children && (
        <ul className="invisible absolute left-0 top-full z-50 w-56 translate-y-2 rounded-md border border-gray-50 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          {item.children.map((child) => (
            <li key={child.label}>
              <Link
                to={child.to}
                className="block px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState(null)
  const { user } = useStore()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div className="absolute inset-0 animate-fade-in bg-gray-900/60" onClick={onClose} aria-hidden="true" />
      <nav
        className="absolute left-0 top-0 flex h-full w-[min(320px,85%)] flex-col bg-white shadow-2xl"
        style={{ animation: 'slide-left 0.3s cubic-bezier(0.16,1,0.3,1) both', transformOrigin: 'left' }}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-gray-50 px-5 py-4">
          <Logo />
          <button type="button" onClick={onClose} aria-label="Close menu" className="text-gray-600">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-gray-50">
                <div className="flex items-center justify-between">
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className="flex-1 py-3 text-sm font-medium text-gray-900"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="flex-1 py-3 text-sm font-medium text-gray-900">{item.label}</span>
                  )}
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className="p-2 text-gray-600"
                    >
                      <ChevronDown
                        size={16}
                        className={cn('transition-transform', expanded === item.label && 'rotate-180')}
                      />
                    </button>
                  )}
                </div>
                {item.children && expanded === item.label && (
                  <ul className="mb-2 flex flex-col gap-1 pl-3">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          to={child.to}
                          onClick={onClose}
                          className="block py-1.5 text-sm text-gray-600 transition-colors hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 text-sm">
            <Link
              to={user ? '/account' : '/sign-in'}
              onClick={onClose}
              className="flex items-center gap-2 text-gray-700 transition-colors hover:text-primary"
            >
              <User size={18} /> {user ? 'My Account' : 'Sign In / Sign Up'}
            </Link>
            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center gap-2 text-gray-700 transition-colors hover:text-primary"
            >
              <Heart size={18} /> Wishlist
            </Link>
            <a
              href={`tel:${storeInfo.phone.replace(/[^\d]/g, '')}`}
              className="flex items-center gap-2 text-gray-700 transition-colors hover:text-primary"
            >
              <PhoneCall size={18} /> {storeInfo.phone}
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default function Header() {
  const { cartCount, subtotal, wishlist, user, setCartOpen, mobileNavOpen, setMobileNavOpen } = useStore()
  const { pathname } = useLocation()

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname, setMobileNavOpen])

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      {/* Utility strip */}
      <div className="hidden bg-gray-900 text-white md:block">
        <div className="container-x flex h-10 items-center justify-between text-xs">
          <p className="flex items-center gap-2 text-white/80">
            <MapPin size={14} />
            Store Location: {storeInfo.address}
          </p>
          <div className="flex items-center gap-4 text-white/80">
            <span className="flex items-center gap-1">Eng <ChevronDown size={12} /></span>
            <span className="flex items-center gap-1">USD <ChevronDown size={12} /></span>
            <span className="text-white/30">|</span>
            {user ? (
              <Link to="/account" className="transition-colors hover:text-primary">
                {user.firstName}’s Account
              </Link>
            ) : (
              <span>
                <Link to="/sign-in" className="transition-colors hover:text-primary">
                  Sign In
                </Link>
                <span className="mx-1 text-white/40">/</span>
                <Link to="/sign-up" className="transition-colors hover:text-primary">
                  Sign Up
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Logo / search / actions */}
      <div className="container-x flex items-center gap-4 py-4 lg:gap-8">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="text-gray-900 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <Logo className="shrink-0" />

        <div className="hidden flex-1 justify-center lg:flex">
          <div className="w-full max-w-[520px]">
            <SearchBar />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4 lg:gap-6">
          <Link
            to="/wishlist"
            className="relative hidden text-gray-900 transition-colors hover:text-primary sm:block"
            aria-label={`Wishlist, ${wishlist.length} items`}
          >
            <Heart size={24} />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <span className="hidden h-6 w-px bg-gray-100 sm:block" />

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-3 text-left"
            aria-label={`Open cart, ${cartCount} items`}
          >
            <span className="relative text-gray-900 transition-colors hover:text-primary">
              <ShoppingBag size={24} />
              <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-xs text-gray-600">Shopping cart:</span>
              <span className="block text-sm font-semibold text-gray-900">{formatPrice(subtotal)}</span>
            </span>
          </button>

          <Link
            to={user ? '/account' : '/sign-in'}
            className="hidden text-gray-900 transition-colors hover:text-primary lg:block"
            aria-label="Account"
          >
            <User size={24} />
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <div className="container-x pb-4 lg:hidden">
        <SearchBar />
      </div>

      {/* Primary navigation */}
      <div className="hidden border-t border-gray-50 lg:block">
        <div className="container-x flex items-center justify-between">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </ul>
          <a
            href={`tel:${storeInfo.phone.replace(/[^\d]/g, '')}`}
            className="flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-primary"
          >
            <PhoneCall size={18} />
            {storeInfo.phone}
          </a>
        </div>
      </div>

      <MobileMenu open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </header>
  )
}

export { NAV }
