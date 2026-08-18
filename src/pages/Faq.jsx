import { useEffect } from 'react'
import Accordion from '../components/ui/Accordion'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { faqs } from '../data/content'

export default function Faq() {
  useEffect(() => {
    document.title = 'FAQs — Ecobazar'
  }, [])

  return (
    <>
      <PageHeader trail={[{ label: 'Faqs' }]} />

      <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <h1 className="text-2xl leading-tight md:text-[36px]">
            Welcome, Let’s Talk About Our Ecobazar
          </h1>
          <p className="mt-4 text-sm leading-8 text-gray-600">
            Everything people usually ask before their first order. If your question is not here,
            our support team answers within a working day.
          </p>
          <Accordion items={faqs} className="mt-8" />
          <Button to="/contact" size="lg" className="mt-8">
            Still need help? Contact us
          </Button>
        </div>
        <img
          src="/images/products/market-1.jpg"
          alt="A market stall stacked with fruit and vegetables"
          loading="lazy"
          className="hidden aspect-[3/4] w-full rounded-lg object-cover lg:block"
        />
      </div>
    </>
  )
}
