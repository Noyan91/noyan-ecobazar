import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { brands, instagramFeed, stats } from '../../data/content'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import { Instagram } from '../ui/SocialIcons'
import SectionHeading from '../ui/SectionHeading'

/** Full-width discount strip. */
export function OfferBanner() {
  return (
    <section className="container-x pb-12 lg:pb-16">
      <div className="relative isolate overflow-hidden rounded-lg bg-gray-900">
        <img
          src="/images/products/broccoli.jpg"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-gray-900/95" />
        <div className="relative flex min-h-[220px] flex-col items-center justify-center gap-3 p-8 text-center md:items-end md:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-soft">
            Summer Sale
          </p>
          <h2 className="text-3xl text-white lg:text-[40px]">
            <span className="text-warning">37% OFF</span>
          </h2>
          <p className="max-w-sm text-sm text-white/70">
            Free on all your order, free shipping and 30 days money-back guarantee.
          </p>
          <Button to="/shop?sale=true" className="mt-2">
            Shop Now <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  )
}

/** Editorial block used on the home page and the about page. */
export function TrustedSection() {
  const points = [
    'Healthy and natural food for lovers of healthy food.',
    'Every day fresh and quality products for you.',
    'Certified organic growers, audited every single season.',
  ]

  return (
    <section className="container-x py-12 lg:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <img
            src="/images/products/field-1.jpg"
            alt="Rows of lettuce on a partner farm"
            loading="lazy"
            className="h-full max-h-[380px] w-full rounded-lg object-cover"
          />
          <img
            src="/images/products/market-1.jpg"
            alt="Fresh produce at the market"
            loading="lazy"
            className="mt-8 h-full max-h-[380px] w-full rounded-lg object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl leading-tight md:text-[32px]">100% Trusted Organic Food Store</h2>
          <ul className="mt-6 flex flex-col gap-5">
            {points.map((point) => (
              <li key={point} className="flex gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  <span className="block font-medium text-gray-900">{point}</span>
                  <span className="mt-1 block text-sm leading-7 text-gray-600">
                    We work directly with the people who grow your food, so we can tell you exactly
                    where every item came from and when it was picked.
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <Button to="/about" size="lg" className="mt-7">
            Shop Now <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  )
}

/** Dark stats strip. */
export function StatsBar() {
  return (
    <section className="relative isolate overflow-hidden bg-ggray-900">
      <img
        src="/images/products/field-1.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <ul className="container-x relative grid gap-8 py-12 text-center sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {stats.map((stat) => (
          <li key={stat.label}>
            <p className="text-3xl font-semibold text-primary lg:text-[40px]">{stat.value}</p>
            <p className="mt-2 text-sm text-white/70">{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Partner logos. */
export function BrandStrip() {
  return (
    <section className="container-x py-10">
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-y border-gray-50 py-8">
        {brands.map((brand) => (
          <li
            key={brand}
            className="text-xl font-semibold uppercase tracking-widest text-gray-200 transition-colors hover:text-gray-400"
          >
            {brand}
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Instagram tiles. */
export function InstagramFeed() {
  return (
    <section className="container-x pb-12 lg:pb-16">
      <SectionHeading title="Follow us on Instagram" align="center" />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {instagramFeed.map((image, index) => (
          <li key={image + index}>
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              className="group relative block aspect-square overflow-hidden rounded-lg"
              aria-label="View on Instagram"
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-gray-900/60 opacity-0 transition-opacity group-hover:opacity-100">
                <Instagram size={24} className="text-white" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Team grid, shared by home and about. */
export function TeamSection({ members }) {
  return (
    <section className="container-x py-12 lg:py-16">
      <SectionHeading eyebrow="Team" title="Our Professional Members" align="center" />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <li
            key={member.name}
            className="group overflow-hidden rounded-lg border border-gray-50 bg-white transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          >
            <div className="grid aspect-[4/3] place-items-center bg-ggray-50">
              <Avatar name={member.name} size={96} className="text-2xl shadow-sm" />
            </div>
            <div className="p-4 text-center">
              <p className="font-semibold text-gray-900">{member.name}</p>
              <p className="mt-1 text-sm text-gray-500">{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link to="/about" className="text-sm font-semibold text-primary hover:underline">
          Meet the whole team
        </Link>
      </div>
    </section>
  )
}
