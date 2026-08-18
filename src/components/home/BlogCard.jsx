import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare, Tag, User } from 'lucide-react'
import { cn } from '../../lib/utils'

/** Blog teaser used on the home page and the blog index. */
export default function BlogCard({ post, className }) {
  const [day, month] = post.date.split(' ')

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-lg border border-gray-50 bg-white transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link to={`/blog/${post.slug}`}>
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <span className="absolute left-4 top-4 flex flex-col items-center rounded bg-white px-3 py-2 leading-none shadow-sm">
          <span className="text-lg font-semibold text-gray-900">{day}</span>
          <span className="mt-1 text-[10px] font-medium uppercase text-gray-500">{month}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Tag size={13} /> {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={13} /> By {post.author.split(' ')[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={13} /> {post.comments} Comments
          </span>
        </div>

        <h3 className="mt-3 text-base leading-7 text-gray-900">
          <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-primary">
            {post.title}
          </Link>
        </h3>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-primary"
        >
          Read More
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
