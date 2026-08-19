import { useEffect, useMemo, useState } from 'react'
import BlogSidebar from '../components/blog/BlogSidebar'
import BlogCard from '../components/home/BlogCard'
import PageHeader from '../components/ui/PageHeader'
import Pagination from '../components/ui/Pagination'
import Button from '../components/ui/Button'
import { posts } from '../data/content'

const PER_PAGE = 6

export default function Blog() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    document.title = 'Blog — Ecobazar'
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return posts.filter((post) => {
      if (tag && !post.tags.includes(tag)) return false
      if (!term) return true
      return (
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term)
      )
    })
  }, [query, tag])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  return (
    <>
      <PageHeader trail={[{ label: 'Blog' }]} />

      {/* The banner shows breadcrumbs only, so the page heading is for assistive tech */}
      <h1 className="sr-only">Ecobazar blog — food, recipes and healthy eating</h1>

      <div className="container-x flex flex-col gap-8 py-10 lg:flex-row lg:py-14">
        <BlogSidebar
          query={query}
          onQueryChange={(value) => {
            setQuery(value)
            setPage(1)
          }}
          activeTag={tag}
          onTagChange={(value) => {
            setTag(value)
            setPage(1)
          }}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filtered.length}</span> Results Found
            </p>
            {(tag || query) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTag(null)
                  setQuery('')
                  setPage(1)
                }}
              >
                Clear filters
              </Button>
            )}
          </div>

          {visible.length === 0 ? (
            <p className="mt-16 text-center text-gray-600">
              No articles match that search. Try a different keyword.
            </p>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {visible.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          <Pagination page={current} totalPages={totalPages} onChange={setPage} className="mt-10" />
        </div>
      </div>
    </>
  )
}
