import { useState } from 'react'
import { SOCIALS } from '../ui/SocialIcons'
import { useStore } from '../../context/StoreContext'

/** Newsletter strip that sits directly above the footer on every page. */
export default function Newsletter() {
  const [email, setEmail] = useState('')
  const { toast } = useStore()

  const submit = (event) => {
    event.preventDefault()
    if (!email.includes('@')) {
      toast('Please enter a valid email address', 'error')
      return
    }
    toast('You are subscribed — welcome to Ecobazar!')
    setEmail('')
  }

  return (
    <section className="bg-gray-50">
      <div className="container-x grid gap-6 py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:py-12">
        <div className="min-w-0 max-w-md">
          <h2 className="text-xl md:text-2xl">Subscribe to our Newsletter</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Get weekly seasonal offers, recipes and first access to new produce. No spam, unsubscribe
            in one click.
          </p>
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-5">
          <form onSubmit={submit} noValidate className="flex w-full max-w-md flex-wrap items-center gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              aria-label="Email address"
              className="h-[45px] w-full min-w-0 flex-1 rounded-full border border-gray-100 bg-white px-5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none xs:w-auto"
            />
            <button
              type="submit"
              className="h-[45px] w-full shrink-0 rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-hard xs:w-auto"
            >
              Subscribe
            </button>
          </form>

          <div className="flex items-center gap-2">
            {SOCIALS.map(({ Icon, label }, index) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                onClick={(event) => event.preventDefault()}
                className={
                  index === 0
                    ? 'grid h-9 w-9 place-items-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hard'
                    : 'grid h-9 w-9 place-items-center rounded-full text-gray-700 transition-colors hover:bg-primary hover:text-white'
                }
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
