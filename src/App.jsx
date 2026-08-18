import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import About from './pages/About'
import AccountDashboard from './pages/account/AccountDashboard'
import AccountLayout from './pages/account/AccountLayout'
import AccountSettings from './pages/account/AccountSettings'
import OrderDetail from './pages/account/OrderDetail'
import OrderHistory from './pages/account/OrderHistory'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import OrderConfirmed from './pages/OrderConfirmed'
import ProductDetails from './pages/ProductDetails'
import Shop from './pages/Shop'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Wishlist from './pages/Wishlist'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<AccountDashboard />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="wishlist" element={<Navigate to="/wishlist" replace />} />
          <Route path="cart" element={<Navigate to="/cart" replace />} />
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
