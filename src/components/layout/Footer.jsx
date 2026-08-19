import { Link } from 'react-router-dom'
import { storeInfo } from '../../data/content'
import { categories } from '../../data/categories'
import Logo from './Logo'

const COLUMNS = [
  {
    title: 'My Account',
    links: [
      { label: 'My Account', to: '/account' },
      { label: 'Order History', to: '/account/orders' },
      { label: 'Shoping Cart', to: '/cart' },
      { label: 'Wishlist', to: '/wishlist' },
    ],
  },
  {
    title: 'Helps',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Faqs', to: '/faq' },
      { label: 'Terms & Condition', to: '/faq' },
      { label: 'Privacy Policy', to: '/faq' },
    ],
  },
  {
    title: 'Proxy',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Shop', to: '/shop' },
      { label: 'Product', to: '/shop' },
      { label: 'Track Order', to: '/account/orders' },
    ],
  },
]

const PAYMENTS = ['Apple Pay', 'VISA', 'Discover', 'Mastercard', 'Secure Payment']

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-x grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:py-16">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-4 text-sm leading-7 text-gray-400">
            Organic groceries from growers we know by name — picked at peak ripeness and delivered
            to your door, seven days a week.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <a
              href={`tel:${storeInfo.phone.replace(/[^\d]/g, '')}`}
              className="border-b border-primary pb-0.5 text-white transition-colors hover:text-primary"
            >
              {storeInfo.phone}
            </a>
            <span className="text-gray-500">or</span>
            <a
              href={`mailto:${storeInfo.email}`}
              className="border-b border-primary pb-0.5 text-white transition-colors hover:text-primary"
            >
              {storeInfo.email}
            </a>
          </div>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="mb-4 text-base text-white">{column.title}</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Categories">
          <h3 className="mb-4 text-base text-white">Categories</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {categories.slice(0, 5).map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/shop?category=${category.slug}`}
                  className="text-gray-400 transition-colors hover:text-primary"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-5 text-sm text-gray-500 md:flex-row">
          <p>Ecobazar eCommerce © {new Date().getFullYear()}. All Rights Reserved Noyan</p>
          <ul className="flex flex-wrap items-center gap-2">
            {PAYMENTS.map((method) => (
              <li
                key={method}
                className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-gray-300"
              >
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
