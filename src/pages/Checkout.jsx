import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { useStore } from '../context/StoreContext'
import { cn, formatPrice } from '../lib/utils'

const COUNTRIES = ['United States', 'United Kingdom', 'Bangladesh', 'Kenya', 'Canada', 'Australia']
const STATES = ['New Mexico', 'California', 'Illinois', 'Texas', 'Florida', 'New York']
const PAYMENTS = ['Cash on Delivery', 'Paypal', 'Amazon Pay']

function Field({ label, name, type = 'text', required, value, onChange, error, placeholder, hint }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-gray-600">
        {label} {hint && <span className="text-gray-400">{hint}</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={cn(
          'h-12 w-full rounded-md border bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none',
          error ? 'border-danger' : 'border-gray-100 focus:border-primary',
        )}
      />
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  )
}

export default function Checkout() {
  const { cartLines, subtotal, discount, shipping, total, coupon, placeOrder, user } = useStore()
  const navigate = useNavigate()
  const [payment, setPayment] = useState(PAYMENTS[0])
  const [errors, setErrors] = useState({})
  const [shipDifferent, setShipDifferent] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    street: '',
    country: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
    notes: '',
  })

  useEffect(() => {
    document.title = 'Checkout — Ecobazar'
  }, [])

  useEffect(() => {
    if (user?.billing) {
      setForm((current) => ({ ...current, ...user.billing }))
    }
  }, [user])

  const set = (name) => (event) => {
    const { value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'First name is required'
    if (!form.lastName.trim()) next.lastName = 'Last name is required'
    if (!form.street.trim()) next.street = 'Street address is required'
    if (!form.country) next.country = 'Select a country'
    if (!form.state) next.state = 'Select a state'
    if (!form.zip.trim()) next.zip = 'Zip code is required'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address'
    if (form.phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a valid phone number'

    if (Object.keys(next).length > 0) {
      setErrors(next)
      const firstError = document.querySelector('[aria-invalid="true"]')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const order = placeOrder(form, payment)
    navigate('/order-confirmed', { state: { orderId: order.id } })
  }

  if (cartLines.length === 0) {
    return (
      <>
        <PageHeader trail={[{ label: 'Shopping Cart', to: '/cart' }, { label: 'Checkout' }]} />
        <div className="container-x flex flex-col items-center gap-4 py-20 text-center">
          <h1 className="text-2xl">Your cart is empty</h1>
          <p className="max-w-sm text-sm text-gray-600">
            Add a few items before checking out — everything you pick is saved on this device.
          </p>
          <Button to="/shop" size="lg">
            Go to shop
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader trail={[{ label: 'Shopping Cart', to: '/cart' }, { label: 'Checkout' }]} />

      <form onSubmit={submit} className="container-x grid gap-8 py-10 lg:grid-cols-[1.5fr_1fr] lg:py-14" noValidate>
        <div>
          <h1 className="text-2xl md:text-[28px]">Billing Information</h1>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <Field label="First name" name="firstName" required value={form.firstName} onChange={set('firstName')} error={errors.firstName} placeholder="Your first name" />
            <Field label="Last name" name="lastName" required value={form.lastName} onChange={set('lastName')} error={errors.lastName} placeholder="Your last name" />
            <Field label="Company Name" hint="(optional)" name="company" value={form.company} onChange={set('company')} placeholder="Company name" />
          </div>

          <div className="mt-5">
            <Field label="Street Address" name="street" required value={form.street} onChange={set('street')} error={errors.street} placeholder="House number and street name" />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm text-gray-600">Country / Region</span>
              <select
                value={form.country}
                onChange={set('country')}
                aria-invalid={Boolean(errors.country)}
                className={cn(
                  'h-12 w-full rounded-md border bg-white px-4 text-sm focus:outline-none',
                  errors.country ? 'border-danger' : 'border-gray-100 focus:border-primary',
                  form.country ? 'text-gray-900' : 'text-gray-400',
                )}
              >
                <option value="">Select</option>
                {COUNTRIES.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
              {errors.country && <span className="mt-1 block text-xs text-danger">{errors.country}</span>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-gray-600">States</span>
              <select
                value={form.state}
                onChange={set('state')}
                aria-invalid={Boolean(errors.state)}
                className={cn(
                  'h-12 w-full rounded-md border bg-white px-4 text-sm focus:outline-none',
                  errors.state ? 'border-danger' : 'border-gray-100 focus:border-primary',
                  form.state ? 'text-gray-900' : 'text-gray-400',
                )}
              >
                <option value="">Select</option>
                {STATES.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
              {errors.state && <span className="mt-1 block text-xs text-danger">{errors.state}</span>}
            </label>

            <Field label="Zip Code" name="zip" required value={form.zip} onChange={set('zip')} error={errors.zip} placeholder="Zip Code" />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Email" name="email" type="email" required value={form.email} onChange={set('email')} error={errors.email} placeholder="Email Address" />
            <Field label="Phone" name="phone" type="tel" required value={form.phone} onChange={set('phone')} error={errors.phone} placeholder="Phone number" />
          </div>

          <label className="mt-5 flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={shipDifferent}
              onChange={(event) => setShipDifferent(event.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            Ship to a different address
          </label>

          {shipDifferent && (
            <p className="mt-3 rounded-md bg-gray-50 px-4 py-3 text-sm text-gray-600">
              Our courier will call you on the number above to arrange the delivery address.
            </p>
          )}

          <h2 className="mt-10 text-2xl md:text-[28px]">Additional Info</h2>
          <label className="mt-5 block">
            <span className="mb-2 block text-sm text-gray-600">Order Notes (Optional)</span>
            <textarea
              rows={4}
              value={form.notes}
              onChange={set('notes')}
              placeholder="Notes about your order, e.g. special notes for delivery"
              className="w-full rounded-md border border-gray-100 bg-white p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none"
            />
          </label>
        </div>

        <aside className="h-fit rounded-lg border border-gray-50 p-6 lg:sticky lg:top-32">
          <h2 className="text-lg text-gray-900">Order Summary</h2>

          <ul className="mt-5 flex flex-col gap-4">
            {cartLines.map((line) => (
              <li key={line.id} className="flex items-center gap-3">
                <img
                  src={line.product.image}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded object-cover"
                  loading="lazy"
                />
                <span className="min-w-0 flex-1 truncate text-sm text-gray-700">
                  {line.product.name} <span className="text-gray-400">×{line.quantity}</span>
                </span>
                <span className="text-sm font-medium text-gray-900">{formatPrice(line.subtotal)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-6 flex flex-col gap-3 border-t border-gray-50 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Subtotal:</dt>
              <dd className="font-medium text-gray-900">{formatPrice(subtotal)}</dd>
            </div>
            {coupon && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Discount ({coupon.code}):</dt>
                <dd className="font-medium text-primary">−{formatPrice(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-gray-50 pb-3">
              <dt className="text-gray-600">Shipping:</dt>
              <dd className="font-medium text-gray-900">
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-900">Total:</dt>
              <dd className="text-lg font-semibold text-gray-900">{formatPrice(total)}</dd>
            </div>
          </dl>

          <h3 className="mt-6 text-base font-semibold text-gray-900">Payment Method</h3>
          <ul className="mt-3 flex flex-col gap-3">
            {PAYMENTS.map((method) => (
              <li key={method}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === method}
                    onChange={() => setPayment(method)}
                    className="h-4 w-4 accent-primary"
                  />
                  {method}
                </label>
              </li>
            ))}
          </ul>

          <Button type="submit" size="lg" full className="mt-6">
            Place Order
          </Button>
        </aside>
      </form>
    </>
  )
}
