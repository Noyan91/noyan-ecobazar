import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import { productCountByCategory } from '../../data/products'
import SectionHeading from '../ui/SectionHeading'

/** "Shop by Top Categories" tiles. */
export default function CategoryGrid() {
  return (
    <section className="container-x py-12 lg:py-16">
      <SectionHeading eyebrow="Category" title="Shop by Top Categories" viewAllTo="/shop" />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              to={`/shop?category=${category.slug}`}
              className="group flex h-full flex-col items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            >
              <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-gray-50">
                <img
                  src={category.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span className="text-sm font-medium text-gray-900 transition-colors group-hover:text-primary">
                {category.name}
              </span>
              <span className="text-xs text-gray-500">
                {productCountByCategory[category.slug] ?? 0} Products
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
