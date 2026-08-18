import { useEffect } from 'react'
import { ArrowRight, CheckCircle2, Headset, Leaf, ShieldCheck, Sparkles, Truck, Users } from 'lucide-react'
import FeatureBar from '../components/home/FeatureBar'
import { BrandStrip, StatsBar, TeamSection } from '../components/home/Sections'
import Testimonials from '../components/home/Testimonials'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { team } from '../data/content'

const VALUES = [
  { Icon: Leaf, title: '100% Organic food', text: '100% healthy and fresh food.' },
  { Icon: Headset, title: 'Great Support 24/7', text: 'Instant access to contact.' },
  { Icon: Users, title: 'Customer Feedback', text: 'Our happy customers.' },
  { Icon: ShieldCheck, title: '100% Secure Payment', text: 'We ensure your money is safe.' },
  { Icon: Truck, title: 'Free Shipping', text: 'Free shipping with discount.' },
  { Icon: Sparkles, title: 'Quality Guarantee', text: 'Not happy? We refund it.' },
]

export default function About() {
  useEffect(() => {
    document.title = 'About Us — Ecobazar'
  }, [])

  return (
    <>
      <PageHeader trail={[{ label: 'About' }]} />

      <section className="container-x grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <h1 className="text-2xl leading-tight md:text-[36px]">100% Trusted Organic Food Store</h1>
          <p className="mt-5 text-sm leading-8 text-gray-600">
            Ecobazar started in 2019 as a single stall at a Saturday farmers market. Today we work
            with 120 certified organic growers and deliver to more than half a million households —
            but the rule has not changed: we only sell food we would put on our own table.
          </p>
          <p className="mt-4 text-sm leading-8 text-gray-600">
            Every crate is checked by hand on arrival, cooled within the hour and picked for your
            order the same day it leaves us. Anything that does not meet the bar is donated or
            composted, never sold at a discount.
          </p>
          <Button to="/shop" size="lg" className="mt-7">
            Shop Now <ArrowRight size={16} />
          </Button>
        </div>
        <img
          src="/images/products/market-1.jpg"
          alt="Fruit and vegetables on an Ecobazar market stall"
          className="aspect-[4/3] w-full rounded-lg object-cover"
        />
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <img
            src="/images/products/market-2.jpg"
            alt="Fresh produce laid out ready for packing"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
          <div>
            <h2 className="text-2xl leading-tight md:text-[32px]">Why people choose Ecobazar</h2>
            <p className="mt-4 text-sm leading-8 text-gray-600">
              Fair prices for growers, honest labelling for shoppers and a delivery promise we
              actually keep. That is the whole business model.
            </p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {VALUES.map(({ Icon, title, text }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-primary">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-900">{title}</span>
                    <span className="mt-1 block text-xs text-gray-500">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <h2 className="text-2xl leading-tight md:text-[32px]">We Delivered, You Enjoy Your Order</h2>
          <p className="mt-4 text-sm leading-8 text-gray-600">
            Our drivers are employed, not contracted, and they run the same routes each week — which
            is why they know which door to use and when you are usually home.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {[
              'Next-day delivery on orders placed before 6pm.',
              'Two-hour delivery window, texted on the morning.',
              'Contactless drop-off and a photo confirmation.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
          <Button to="/shop" size="lg" className="mt-7">
            Shop Now <ArrowRight size={16} />
          </Button>
        </div>
        <img
          src="/images/products/delivery-1.jpg"
          alt="Ecobazar delivery"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-lg object-cover"
        />
      </section>

      <StatsBar />
      <FeatureBar className="py-12 lg:py-16" />
      <TeamSection members={team} />
      <Testimonials />
      <BrandStrip />
    </>
  )
}
