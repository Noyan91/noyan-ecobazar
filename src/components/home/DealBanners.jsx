import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Countdown from '../ui/Countdown'

/** Three promo tiles: month sale (with timer), meat deal, fruit deal. */
export default function DealBanners() {
  return (
    <section className="container-x pb-12 lg:pb-16">
      <div className="grid gap-5 lg:grid-cols-3">
        <article className="relative isolate flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-lg bg-[#3E6EA6] p-8 text-center">
          <img
            src="/images/products/hero-veggies.jpg"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">Best Deals</p>
            <h3 className="mt-2 text-2xl text-white lg:text-[28px]">Sale of the Month</h3>
            <Countdown days={2} tone="dark" className="mt-5 justify-center" />
            <Link
              to="/shop?sale=true"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-primary hover:text-white"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </article>

        <article className="relative isolate flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-900 p-8 text-center">
          <img
            src="/images/products/beef-steak.jpg"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">85% Fat Free</p>
            <h3 className="mt-2 text-2xl text-white lg:text-[28px]">Low-Fat Meat</h3>
            <p className="mt-3 text-white/80">
              Started at <span className="font-semibold text-warning">$79.99</span>
            </p>
            <Link
              to="/shop?category=meat-fish"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-primary hover:text-white"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </article>

        <article className="relative isolate flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-lg bg-warning p-8 text-center">
          <img
            src="/images/products/green-apple.jpg"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">Summer Sale</p>
            <h3 className="mt-2 text-2xl text-white lg:text-[28px]">100% Fresh Fruit</h3>
            <p className="mt-3 flex items-center justify-center gap-2 text-white">
              Up to <span className="rounded bg-gray-900 px-2 py-1 text-sm font-semibold">64% OFF</span>
            </p>
            <Link
              to="/shop?category=fresh-fruit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-primary hover:text-white"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
