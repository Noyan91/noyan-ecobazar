import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle2, Leaf, Percent, Play } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import ProductGallery from '../components/product/ProductGallery'
import ProductSummary from '../components/product/ProductSummary'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import Rating from '../components/ui/Rating'
import SectionHeading from '../components/ui/SectionHeading'
import { categoryName } from '../data/categories'
import { getProductBySlug, getRelated } from '../data/products'
import { useStore } from '../context/StoreContext'
import { cn } from '../lib/utils'
import NotFound from './NotFound'

const TABS = ['Descriptions', 'Additional Information', 'Customer Feedback']

const REVIEWS = [
  {
    name: 'Kristin Watson',
    rating: 5,
    when: '2 min ago',
    text: 'Arrived cold and perfectly packed. This is the third week running and the quality has not slipped once.',
  },
  {
    name: 'Jane Cooper',
    rating: 4,
    when: '30 Apr, 2026',
    text: 'Keep it somewhere cool and it stays crisp for well over a week. Great value compared to my local shop.',
  },
  {
    name: 'Jacob Jones',
    rating: 5,
    when: '2 min ago',
    text: 'Exactly as pictured and generously sized. The kids actually ask for it now, which I did not expect.',
  },
  {
    name: 'Ralph Edwards',
    rating: 5,
    when: '12 Apr, 2026',
    text: 'Ordered for a dinner party and it held up beautifully. Delivery slot was accurate to the minute.',
  },
]

export default function ProductDetails() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const [tab, setTab] = useState(TABS[0])
  const [visibleReviews, setVisibleReviews] = useState(3)
  const { toast } = useStore()

  useEffect(() => {
    if (product) document.title = `${product.name} — Ecobazar`
  }, [product])

  useEffect(() => {
    setTab(TABS[0])
    setVisibleReviews(3)
  }, [slug])

  if (!product) return <NotFound />

  const related = getRelated(product)

  return (
    <>
      <PageHeader
        trail={[
          { label: 'Category', to: '/shop' },
          { label: categoryName(product.category), to: `/shop?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="container-x py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery product={product} />
          <ProductSummary product={product} />
        </div>

        {/* Tabs */}
        <div className="mt-12 border-b border-gray-50">
          <div className="scrollbar-none flex justify-start gap-6 overflow-x-auto whitespace-nowrap sm:justify-center">
            {TABS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                aria-selected={tab === item}
                role="tab"
                className={cn(
                  'relative pb-3 text-sm font-medium transition-colors',
                  tab === item ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900',
                )}
              >
                {item}
                {tab === item && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-10 py-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {tab === 'Descriptions' && (
              <div className="animate-fade-in">
                <p className="text-sm leading-8 text-gray-600">{product.description}</p>
                <p className="mt-4 text-sm leading-8 text-gray-600">
                  Everything we sell is traceable back to the grower. We publish the farm name, the
                  week of harvest and the storage advice on every order slip, so you always know what
                  you are eating and how long it will keep.
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {product.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === 'Additional Information' && (
              <dl className="animate-fade-in divide-y divide-gray-50 text-sm">
                {[
                  ['Weight', product.weight],
                  ['Colour', product.color],
                  ['Type', product.type],
                  ['Category', categoryName(product.category)],
                  ['Stock status', product.inStock ? `Available (${product.stock})` : 'Out of stock'],
                  ['Tags', product.tags.join(', ')],
                  ['SKU', product.sku],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-6 py-3">
                    <dt className="w-40 shrink-0 text-gray-600">{label}:</dt>
                    <dd className="text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {tab === 'Customer Feedback' && (
              <div className="animate-fade-in">
                <ul className="divide-y divide-gray-50">
                  {REVIEWS.slice(0, visibleReviews).map((review) => (
                    <li key={review.name} className="flex gap-4 py-5">
                      <Avatar name={review.name} size={40} />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-medium text-gray-900">{review.name}</p>
                          <span className="text-xs text-gray-400">{review.when}</span>
                        </div>
                        <Rating value={review.rating} className="mt-1" />
                        <p className="mt-2 text-sm leading-7 text-gray-600">{review.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                {visibleReviews < REVIEWS.length ? (
                  <Button variant="soft" className="mt-4" onClick={() => setVisibleReviews(REVIEWS.length)}>
                    Load More
                  </Button>
                ) : (
                  <Button
                    variant="soft"
                    className="mt-4"
                    onClick={() => toast('Thanks — reviews open once your order is delivered')}
                  >
                    Write a review
                  </Button>
                )}
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-4">
            <div className="relative isolate overflow-hidden rounded-lg">
              <img
                src="/images/products/delivery-1.jpg"
                alt="Ecobazar delivery"
                loading="lazy"
                className="h-64 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => toast('Video coming soon')}
                className="absolute inset-0 grid place-items-center bg-gray-900/30 transition-colors hover:bg-gray-900/40"
                aria-label="Play video"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-white">
                  <Play size={22} className="fill-white" />
                </span>
              </button>
            </div>

            <ul className="grid gap-4 rounded-lg border border-gray-50 p-5 sm:grid-cols-2">
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-surface text-primary">
                  <Percent size={18} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-gray-900">
                    {product.discount || 20}% Discount
                  </span>
                  <span className="block text-xs text-gray-500">Save more with us</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-surface text-primary">
                  <Leaf size={18} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-gray-900">100% Organic</span>
                  <span className="block text-xs text-gray-500">Certified every season</span>
                </span>
              </li>
            </ul>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="pt-4">
            <SectionHeading title="Related Products" align="center" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
