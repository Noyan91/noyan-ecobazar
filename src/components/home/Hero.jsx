import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import Button from '../ui/Button'

const SLIDES = [
  {
    eyebrow: 'Welcome to Ecobazar',
    title: ['Fresh & Healthy', 'Organic Food'],
    highlight: '30% OFF',
    note: 'Free shipping on every order over $50. We deliver, you enjoy.',
    image: '/images/products/hero-1.jpg',
    to: '/shop',
  },
  {
    eyebrow: 'Seasonal picks',
    title: ['Crisp Greens,', 'Picked This Morning'],
    highlight: '25% OFF',
    note: 'Harvested at dawn, chilled within the hour, at your door by evening.',
    image: '/images/products/hero-2.jpg',
    to: '/shop?category=vegetables',
  },
  {
    eyebrow: 'Fruit season',
    title: ['Sweet Fruit,', 'Straight From the Grove'],
    highlight: '40% OFF',
    note: 'A short season and a very good price. Stock up while it lasts.',
    image: '/images/products/hero-3.jpg',
    to: '/shop?category=fresh-fruit',
  },
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index]

  const go = useCallback((next) => setIndex((current) => (next + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    const timer = setInterval(() => go(index + 1), 6500)
    return () => clearInterval(timer)
  }, [index, go])

  return (
    <section className="container-x pt-6 lg:pt-8" aria-label="Featured offers">
      <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        {/* Slider */}
        <div className="group relative overflow-hidden rounded-lg bg-ggray-50">
          <div className="grid items-center gap-4 sm:grid-cols-[1.15fr_1fr]">
            <div className="flex flex-col gap-4 p-8 sm:py-10 sm:pl-10 lg:py-16 lg:pl-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {slide.eyebrow}
              </p>
              <h1
                key={slide.image}
                className="animate-fade-in text-[28px] leading-tight text-balance sm:text-[34px] lg:text-[42px]"
              >
                {slide.title[0]}
                <br />
                {slide.title[1]}
              </h1>
              <p className="flex flex-wrap items-center gap-3 text-gray-700">
                <span className="text-lg">Sale up to</span>
                <span className="rounded bg-warning/15 px-2 py-1 text-sm font-semibold text-warning">
                  {slide.highlight}
                </span>
              </p>
              <p className="max-w-xs text-sm text-gray-600">{slide.note}</p>
              <div>
                <Button to={slide.to} size="lg" className="mt-2">
                  Shop now
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>

            <div className="relative h-56 sm:h-full sm:min-h-[360px] lg:min-h-[440px]">
              <img
                key={slide.image}
                src={slide.image}
                alt=""
                className="absolute inset-0 h-full w-full animate-fade-in object-contain object-center mix-blend-multiply"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-gray-700 opacity-0 shadow-sm transition-all hover:bg-primary hover:text-white group-hover:opacity-100 lg:grid"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-gray-700 opacity-0 shadow-sm transition-all hover:bg-primary hover:text-white group-hover:opacity-100 lg:grid"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {SLIDES.map((item, dot) => (
              <button
                key={item.image}
                type="button"
                onClick={() => setIndex(dot)}
                aria-label={`Go to slide ${dot + 1}`}
                aria-current={dot === index}
                className={cn(
                  'h-2 rounded-full transition-all',
                  dot === index ? 'w-6 bg-primary' : 'w-2 bg-gray-200 hover:bg-gray-300',
                )}
              />
            ))}
          </div>
        </div>

        {/* Promo cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <Link
            to="/shop?sale=true"
            className="group relative flex min-h-[180px] items-center overflow-hidden rounded-lg bg-ggray-50 p-6 lg:min-h-[210px]"
          >
            <div className="relative z-10 max-w-[60%]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                Summer Sale
              </p>
              <h2 className="mt-2 text-2xl leading-snug lg:text-[28px]">75% OFF</h2>
              <p className="mt-1 text-sm text-gray-600">Only Fruit &amp; Vegetable</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Shop Now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <img
              src="/images/products/hero-3.jpg"
              alt=""
              loading="lazy"
              className="absolute -right-4 bottom-0 h-full w-1/2 object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          <Link
            to="/shop?sort=discount"
            className="group relative isolate flex min-h-[180px] items-center overflow-hidden rounded-lg p-6 lg:min-h-[210px]"
          >
            <img
              src="/images/products/field-1.jpg"
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ggray-900/95 to-ggray-900/50" />
            <div className="relative max-w-[75%]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-soft">
                Best Deal
              </p>
              <h2 className="mt-2 text-2xl leading-snug text-white lg:text-[28px]">
                Special Products Deal of the Month
              </h2>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-soft">
                Shop Now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
