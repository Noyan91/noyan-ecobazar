import { useEffect } from 'react'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — Ecobazar'
  }, [])

  return (
    <>
      <PageHeader trail={[{ label: '404 Error Page' }]} />

      <div className="container-x flex flex-col items-center py-16 text-center lg:py-24">
        <p className="text-[110px] font-semibold leading-none text-primary lg:text-[160px]">404</p>
        <h1 className="mt-4 text-2xl md:text-[32px]">Oops! page not found</h1>
        <p className="mt-3 max-w-md text-sm leading-7 text-gray-600">
          The page you were looking for has moved or never existed. Try the shop, or head back to
          the homepage and start again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" size="lg">
            Back to Home
          </Button>
          <Button to="/shop" size="lg" variant="outline">
            Go to shop
          </Button>
        </div>
      </div>
    </>
  )
}
