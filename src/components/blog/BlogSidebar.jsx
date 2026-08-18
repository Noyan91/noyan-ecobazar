import { Link } from 'react-router-dom'
import { CalendarDays, Search } from 'lucide-react'
import { popularTags } from '../../data/categories'
import { posts } from '../../data/content'
import { categories } from '../../data/categories'
import { productCountByCategory } from '../../data/products'
import { instagramFeed } from '../../data/content'
import { cn } from '../../lib/utils'

function Panel({ title, children }) {
  return (
    <section className="border-b border-gray-50 py-6 first:pt-0 last:border-0">
      {title && <h3 className="mb-4 text-base font-semibold text-gray-900">{title}</h3>}
      {children}
    </section>
  )
}

export default function BlogSidebar({ query, onQueryChange, activeTag, onTagChange }) {
  return (
    <aside className="w-full lg:w-[300px] lg:shrink-0" aria-label="Blog filters">
      <Panel>
        <div className="relative">
          <Search
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search…"
            aria-label="Search articles"
            className="h-12 w-full rounded-md border border-gray-100 pl-11 pr-4 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </Panel>

      <Panel title="Top Categories">
        <ul className="flex flex-col gap-3 text-sm">
          {categories.slice(0, 7).map((category) => (
            <li key={category.slug} className="flex items-center justify-between">
              <Link
                to={`/shop?category=${category.slug}`}
                className="text-gray-600 transition-colors hover:text-primary"
              >
                {category.name}
              </Link>
              <span className="text-xs text-gray-400">({productCountByCategory[category.slug] ?? 0})</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Popular Tag">
        <ul className="flex flex-wrap gap-2">
          {popularTags.slice(0, 11).map((tag) => (
            <li key={tag}>
              <button
                type="button"
                onClick={() => onTagChange(activeTag === tag ? null : tag)}
                aria-pressed={activeTag === tag}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs transition-colors',
                  activeTag === tag
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-primary-surface hover:text-primary',
                )}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Our Gallery">
        <ul className="grid grid-cols-4 gap-2">
          {instagramFeed.concat(instagramFeed.slice(0, 2)).map((image, index) => (
            <li key={image + index}>
              <img
                src={image}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded object-cover"
              />
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Recently Added">
        <ul className="flex flex-col gap-4">
          {posts.slice(0, 3).map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="group flex items-center gap-3">
                <img
                  src={post.image}
                  alt=""
                  loading="lazy"
                  className="h-14 w-14 shrink-0 rounded object-cover"
                />
                <span className="min-w-0">
                  <span className="line-clamp-2 text-sm text-gray-900 transition-colors group-hover:text-primary">
                    {post.title}
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                    <CalendarDays size={12} /> {post.date}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </aside>
  )
}
