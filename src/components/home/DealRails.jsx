import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { bestSellers, hotDeals, topRated } from '../../data/products'
import ProductCard from '../product/ProductCard'

const RAILS = [
  { title: 'Hot Deals', items: hotDeals.slice(0, 3), to: '/shop?sale=true' },
  { title: 'Best Seller', items: bestSellers.slice(0, 3), to: '/shop?sort=popular' },
  { title: 'Top Rated', items: topRated.slice(0, 3), to: '/shop?sort=rating' },
]

/** Three compact product columns plus the yellow "Save 37%" promo card. */
export default function DealRails() {
  return (
    <section className="container-x pb-12 lg:pb-16">
      <div className="grid gap-6 lg:grid-cols-4">
        {RAILS.map((rail) => (
          <div key={rail.title}>
            <div className="mb-3 flex items-center justify-between border-b border-gray-50 pb-2">
              <h3 className="text-base font-semibold text-gray-900">{rail.title}</h3>
              <Link to={rail.to} className="text-xs font-medium text-gray-500 hover:text-primary">
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {rail.items.map((product) => (
                <ProductCard key={product.id} product={product} variant="compact" />
              ))}
            </div>
          </div>
        ))}

        <article className="relative isolate flex min-h-[260px] flex-col justify-center overflow-hidden rounded-lg bg-warning p-6 text-center">
          <img
            src="/images/products/indian-malta.jpg"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="relative">
            <h3 className="text-2xl leading-snug text-white">
              Save 37% on
              <br />
              Every Order
            </h3>
            <Link
              to="/shop?sale=true"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-primary hover:text-white"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
