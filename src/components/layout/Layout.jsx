import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import CartDrawer from '../product/CartDrawer'
import QuickView from '../product/QuickView'
import Toaster from '../ui/Toaster'
import Footer from './Footer'
import Header from './Header'
import Newsletter from './Newsletter'
import NewsletterPopup from './NewsletterPopup'

/** Restores scroll position on navigation. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-4 z-[90] grid h-11 w-11 animate-fade-in place-items-center rounded-full bg-primary text-white shadow-lg transition-colors hover:bg-primary-hard"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
      <CartDrawer />
      <QuickView />
      <NewsletterPopup />
      <Toaster />
      <BackToTop />
    </div>
  )
}
