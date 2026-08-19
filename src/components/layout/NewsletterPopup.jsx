import { useEffect, useState } from 'react'
import { useStore } from '../../context/StoreContext'
import { readStorage, writeStorage } from '../../lib/utils'
import Modal from '../ui/Modal'

const KEY = 'ecobazar.newsletterDismissed'

/** Welcome offer dialog — shows once per visitor unless they opt out. */
export default function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const [dontShow, setDontShow] = useState(false)
  const [email, setEmail] = useState('')
  const { toast } = useStore()

  useEffect(() => {
    if (readStorage(KEY, false)) return undefined
    const timer = setTimeout(() => setOpen(true), 3500)
    return () => clearTimeout(timer)
  }, [])

  const close = () => {
    if (dontShow) writeStorage(KEY, true)
    setOpen(false)
  }

  const submit = (event) => {
    event.preventDefault()
    if (!email.includes('@')) {
      toast('Please enter a valid email address', 'error')
      return
    }
    writeStorage(KEY, true)
    toast('Thanks! Your 20% code is on its way')
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={close} className="max-w-3xl" labelledBy="newsletter-popup-title">
      <div className="grid md:grid-cols-2">
        <div className="hidden bg-primary md:block">
          <img
            src="/images/products/hero-veggies.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-8 md:p-10">
          <h2 id="newsletter-popup-title" className="text-2xl md:text-[28px]">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Subscribe to our newsletter and save <span className="font-semibold text-warning">20%</span>{' '}
            on your first order with a welcome discount code.
          </p>
          <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              className="h-12 flex-1 rounded-full border border-gray-100 px-5 text-sm focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-hard"
            >
              Subscribe
            </button>
          </form>
          <label className="mt-6 flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(event) => setDontShow(event.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            Do not show this window
          </label>
        </div>
      </div>
    </Modal>
  )
}
