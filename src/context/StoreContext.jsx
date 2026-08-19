import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { products } from '../data/products'
import { DEFAULT_CURRENCY, DEFAULT_LANGUAGE, findCurrency, findLanguage } from '../data/settings'
import { formatPrice, readStorage, writeStorage } from '../lib/utils'

/**
 * Single source of truth for cart, wishlist, orders and the demo account.
 * Everything is persisted to localStorage so a refresh keeps the basket.
 */

const StoreContext = createContext(null)

const KEYS = {
  cart: 'ecobazar.cart',
  wishlist: 'ecobazar.wishlist',
  orders: 'ecobazar.orders',
  user: 'ecobazar.user',
  coupon: 'ecobazar.coupon',
  language: 'ecobazar.language',
  currency: 'ecobazar.currency',
}

export const COUPONS = {
  ECO20: { code: 'ECO20', type: 'percent', value: 20, label: '20% off your basket' },
  FRESH10: { code: 'FRESH10', type: 'percent', value: 10, label: '10% off your basket' },
  SAVE15: { code: 'SAVE15', type: 'fixed', value: 15, label: '$15 off orders over $100' },
}

export const SHIPPING_FREE_THRESHOLD = 50
export const SHIPPING_FEE = 4.99

const initialState = {
  cart: readStorage(KEYS.cart, []),
  wishlist: readStorage(KEYS.wishlist, []),
  orders: readStorage(KEYS.orders, []),
  user: readStorage(KEYS.user, null),
  coupon: readStorage(KEYS.coupon, null),
}

function reducer(state, action) {
  switch (action.type) {
    case 'cart/add': {
      const { id, quantity } = action
      const existing = state.cart.find((line) => line.id === id)
      const cart = existing
        ? state.cart.map((line) =>
            line.id === id ? { ...line, quantity: line.quantity + quantity } : line,
          )
        : [...state.cart, { id, quantity }]
      return { ...state, cart }
    }
    case 'cart/setQuantity': {
      if (action.quantity < 1) {
        return { ...state, cart: state.cart.filter((line) => line.id !== action.id) }
      }
      return {
        ...state,
        cart: state.cart.map((line) =>
          line.id === action.id ? { ...line, quantity: action.quantity } : line,
        ),
      }
    }
    case 'cart/remove':
      return { ...state, cart: state.cart.filter((line) => line.id !== action.id) }
    case 'cart/clear':
      return { ...state, cart: [], coupon: null }
    case 'wishlist/toggle': {
      const exists = state.wishlist.includes(action.id)
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((id) => id !== action.id)
          : [...state.wishlist, action.id],
      }
    }
    case 'wishlist/remove':
      return { ...state, wishlist: state.wishlist.filter((id) => id !== action.id) }
    case 'coupon/apply':
      return { ...state, coupon: action.coupon }
    case 'coupon/clear':
      return { ...state, coupon: null }
    case 'orders/add':
      return { ...state, orders: [action.order, ...state.orders], cart: [], coupon: null }
    case 'user/login':
      return { ...state, user: action.user }
    case 'user/update':
      return { ...state, user: { ...state.user, ...action.patch } }
    case 'user/logout':
      return { ...state, user: null }
    default:
      return state
  }
}

/** Seed order history so a fresh account still has something to show. */
function seedOrders() {
  const pick = (i) => products[i]
  return [
    {
      id: '#4152',
      date: '18 Mar, 2026',
      status: 'Processing',
      paymentMethod: 'Paypal',
      discount: 20,
      shipping: 0,
      items: [
        { id: pick(17).id, quantity: 5 },
        { id: pick(18).id, quantity: 2 },
        { id: pick(11).id, quantity: 10 },
      ],
      billing: {
        firstName: 'Dianne',
        lastName: 'Russell',
        street: '4140 Parker Rd. Allentown',
        state: 'New Mexico',
        zip: '31134',
        email: 'dianne.russell@gmail.com',
        phone: '(671) 555-0110',
      },
    },
    {
      id: '#5045',
      date: '27 Feb, 2026',
      status: 'On the way',
      paymentMethod: 'Cash on Delivery',
      discount: 0,
      shipping: 0,
      items: [{ id: pick(0).id, quantity: 1 }],
      billing: {
        firstName: 'Dianne',
        lastName: 'Russell',
        street: '4140 Parker Rd. Allentown',
        state: 'New Mexico',
        zip: '31134',
        email: 'dianne.russell@gmail.com',
        phone: '(671) 555-0110',
      },
    },
    {
      id: '#5028',
      date: '20 Jan, 2026',
      status: 'Completed',
      paymentMethod: 'Paypal',
      discount: 0,
      shipping: 0,
      items: [
        { id: pick(4).id, quantity: 2 },
        { id: pick(9).id, quantity: 1 },
        { id: pick(30).id, quantity: 1 },
        { id: pick(35).id, quantity: 3 },
      ],
      billing: {
        firstName: 'Dianne',
        lastName: 'Russell',
        street: '4140 Parker Rd. Allentown',
        state: 'New Mexico',
        zip: '31134',
        email: 'dianne.russell@gmail.com',
        phone: '(671) 555-0110',
      },
    },
  ]
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [toasts, setToasts] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [quickView, setQuickView] = useState(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [language, setLanguageState] = useState(() =>
    findLanguage(readStorage(KEYS.language, DEFAULT_LANGUAGE.code)),
  )
  const [currency, setCurrencyState] = useState(() =>
    findCurrency(readStorage(KEYS.currency, DEFAULT_CURRENCY.code)),
  )

  useEffect(() => {
    writeStorage(KEYS.language, language.code)
    document.documentElement.lang = language.code
  }, [language])

  useEffect(() => writeStorage(KEYS.currency, currency.code), [currency])

  useEffect(() => writeStorage(KEYS.cart, state.cart), [state.cart])
  useEffect(() => writeStorage(KEYS.wishlist, state.wishlist), [state.wishlist])
  useEffect(() => writeStorage(KEYS.orders, state.orders), [state.orders])
  useEffect(() => writeStorage(KEYS.user, state.user), [state.user])
  useEffect(() => writeStorage(KEYS.coupon, state.coupon), [state.coupon])

  const toast = useCallback((message, tone = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, message, tone }])
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3200)
  }, [])

  const productById = useMemo(() => Object.fromEntries(products.map((p) => [p.id, p])), [])

  const cartLines = useMemo(
    () =>
      state.cart
        .map((line) => {
          const product = productById[line.id]
          return product ? { ...line, product, subtotal: product.price * line.quantity } : null
        })
        .filter(Boolean),
    [state.cart, productById],
  )

  const subtotal = cartLines.reduce((sum, line) => sum + line.subtotal, 0)
  const discount = state.coupon
    ? state.coupon.type === 'percent'
      ? (subtotal * state.coupon.value) / 100
      : Math.min(state.coupon.value, subtotal)
    : 0
  const shipping = subtotal === 0 || subtotal - discount >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_FEE
  const total = Math.max(subtotal - discount + shipping, 0)
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0)

  const wishlistProducts = useMemo(
    () => state.wishlist.map((id) => productById[id]).filter(Boolean),
    [state.wishlist, productById],
  )

  const value = useMemo(() => {
    const addToCart = (product, quantity = 1, options = {}) => {
      if (!product.inStock) {
        toast(`${product.name} is out of stock`, 'error')
        return
      }
      dispatch({ type: 'cart/add', id: product.id, quantity })
      if (options.silent !== true) toast(`${product.name} added to cart`)
    }

    const applyCoupon = (code) => {
      const found = COUPONS[code.trim().toUpperCase()]
      if (!found) {
        toast('That coupon code is not valid', 'error')
        return false
      }
      if (found.code === 'SAVE15' && subtotal < 100) {
        toast('SAVE15 needs a basket over $100', 'error')
        return false
      }
      dispatch({ type: 'coupon/apply', coupon: found })
      toast(`Coupon applied — ${found.label}`)
      return true
    }

    const placeOrder = (billing, paymentMethod) => {
      const order = {
        id: '#' + Math.floor(1000 + Math.random() * 8999),
        date: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        status: 'Processing',
        paymentMethod,
        discount: state.coupon ? Math.round((discount / Math.max(subtotal, 1)) * 100) : 0,
        shipping,
        items: state.cart.map((line) => ({ ...line })),
        billing,
      }
      dispatch({ type: 'orders/add', order })
      toast('Order placed — thank you!')
      return order
    }

    const login = ({ email, name }) => {
      const existing = state.user
      const user = {
        firstName: name?.split(' ')[0] ?? existing?.firstName ?? 'Dianne',
        lastName: name?.split(' ').slice(1).join(' ') || existing?.lastName || 'Russell',
        email,
        phone: existing?.phone ?? '(671) 555-0110',
        avatar: existing?.avatar ?? null,
        billing: existing?.billing ?? {
          firstName: 'Dianne',
          lastName: 'Russell',
          company: '',
          street: '4140 Parker Rd. Allentown',
          country: 'United States',
          state: 'New Mexico',
          zip: '31134',
          email,
          phone: '(671) 555-0110',
        },
      }
      dispatch({ type: 'user/login', user })
      if (state.orders.length === 0) {
        seedOrders().forEach((order) => dispatch({ type: 'orders/add', order }))
      }
      toast('Welcome back to Ecobazar')
    }

    return {
      ...state,
      cartLines,
      cartCount,
      subtotal,
      discount,
      shipping,
      total,
      wishlistProducts,
      toasts,
      cartOpen,
      setCartOpen,
      quickView,
      setQuickView,
      mobileNavOpen,
      setMobileNavOpen,
      toast,
      language,
      currency,
      /** Formats a USD amount in the shopper's chosen currency. */
      price: (amount) => formatPrice(amount, currency),
      setLanguage: (next) => {
        setLanguageState(next)
        if (next.code === DEFAULT_LANGUAGE.code) {
          toast('Language set to English')
        } else {
          toast(`${next.label} selected — this demo ships English copy only`)
        }
      },
      setCurrency: (next) => {
        setCurrencyState(next)
        toast(`Prices now shown in ${next.code}`)
      },
      addToCart,
      setQuantity: (id, quantity) => dispatch({ type: 'cart/setQuantity', id, quantity }),
      removeFromCart: (id) => dispatch({ type: 'cart/remove', id }),
      clearCart: () => dispatch({ type: 'cart/clear' }),
      toggleWishlist: (product) => {
        const exists = state.wishlist.includes(product.id)
        dispatch({ type: 'wishlist/toggle', id: product.id })
        toast(exists ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`)
      },
      removeFromWishlist: (id) => dispatch({ type: 'wishlist/remove', id }),
      isWishlisted: (id) => state.wishlist.includes(id),
      applyCoupon,
      clearCoupon: () => dispatch({ type: 'coupon/clear' }),
      placeOrder,
      login,
      logout: () => {
        dispatch({ type: 'user/logout' })
        toast('You have been signed out')
      },
      updateUser: (patch) => {
        dispatch({ type: 'user/update', patch })
        toast('Your details have been saved')
      },
    }
  }, [
    state,
    cartLines,
    cartCount,
    subtotal,
    discount,
    shipping,
    total,
    wishlistProducts,
    toasts,
    cartOpen,
    quickView,
    mobileNavOpen,
    toast,
    language,
    currency,
  ])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside <StoreProvider>')
  return context
}
