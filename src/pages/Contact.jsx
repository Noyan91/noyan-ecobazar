import { useEffect, useState } from 'react'
import { Mail, MapPin, PhoneCall } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { storeInfo } from '../data/content'
import { useStore } from '../context/StoreContext'
import { cn } from '../lib/utils'

export default function Contact() {
  const { toast } = useStore()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    document.title = 'Contact Us — Ecobazar'
  }, [])

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell us your name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address'
    if (!form.message.trim()) next.message = 'Please write a short message'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    toast('Message sent — we reply within one working day')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const field = (name) =>
    cn(
      'h-12 w-full rounded-md border bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none',
      errors[name] ? 'border-danger' : 'border-gray-100 focus:border-primary',
    )

  return (
    <>
      <PageHeader trail={[{ label: 'Contact' }]} />

      <div className="container-x grid gap-6 py-10 lg:grid-cols-[320px_1fr] lg:py-14">
        <aside className="flex flex-col divide-y divide-gray-50 rounded-lg border border-gray-50 p-6 text-center">
          {[
            { Icon: MapPin, lines: [storeInfo.addressLong] },
            { Icon: Mail, lines: [storeInfo.email] },
            { Icon: PhoneCall, lines: [storeInfo.phone, storeInfo.phoneAlt] },
          ].map(({ Icon, lines }, index) => (
            <div key={index} className="flex flex-col items-center gap-3 py-6 first:pt-0 last:pb-0">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-surface text-primary">
                <Icon size={22} />
              </span>
              {lines.map((line) => (
                <p key={line} className="text-sm text-gray-600">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </aside>

        <section className="rounded-lg border border-gray-50 p-6 lg:p-10">
          <h1 className="text-2xl md:text-[28px]">Just Say Hello!</h1>
          <p className="mt-3 max-w-lg text-sm leading-7 text-gray-600">
            Questions about an order, a delivery slot or a product? Send us a message and a real
            person will get back to you — usually the same day.
          </p>

          <form onSubmit={submit} className="mt-7 grid gap-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Your name"
                  aria-label="Your name"
                  aria-invalid={Boolean(errors.name)}
                  className={field('name')}
                />
                {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="Email address"
                  aria-label="Email address"
                  aria-invalid={Boolean(errors.email)}
                  className={field('email')}
                />
                {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
              </div>
            </div>

            <input
              value={form.subject}
              onChange={(event) => setForm({ ...form, subject: event.target.value })}
              placeholder="Subject"
              aria-label="Subject"
              className={field('subject')}
            />

            <div>
              <textarea
                rows={5}
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                placeholder="How can we help?"
                aria-label="Message"
                aria-invalid={Boolean(errors.message)}
                className={cn(
                  'w-full rounded-md border bg-white p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none',
                  errors.message ? 'border-danger' : 'border-gray-100 focus:border-primary',
                )}
              />
              {errors.message && <p className="mt-1 text-xs text-danger">{errors.message}</p>}
            </div>

            <div>
              <Button type="submit" size="lg">
                Send Message
              </Button>
            </div>
          </form>
        </section>
      </div>

      <section aria-label="Store location" className="relative">
        <img
          src="/images/products/field-1.jpg"
          alt="Map of our depot location"
          loading="lazy"
          className="h-[320px] w-full object-cover"
        />
        <div className="absolute inset-0 grid place-items-center bg-gray-900/30">
          <div className="rounded-lg bg-white px-6 py-4 text-center shadow-lg">
            <p className="font-semibold text-gray-900">Ecobazar Depot</p>
            <p className="mt-1 text-sm text-gray-600">{storeInfo.addressLong}</p>
          </div>
        </div>
      </section>
    </>
  )
}
