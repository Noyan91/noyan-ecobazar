import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CalendarDays, Link2, MessageSquare, Tag, User } from 'lucide-react'
import { Facebook, Instagram, Twitter } from '../components/ui/SocialIcons'
import BlogSidebar from '../components/blog/BlogSidebar'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { getPostBySlug, posts } from '../data/content'
import { useStore } from '../context/StoreContext'
import NotFound from './NotFound'

const COMMENTS = [
  {
    name: 'Annette Black',
    date: '26 Apr, 2026',
    text: 'Really useful — I had no idea storing herbs upright in water made that much difference. Trying it this week.',
  },
  {
    name: 'Devon Lane',
    date: '24 Apr, 2026',
    text: 'Would love a follow-up on freezing. Half of what I buy ends up in the freezer and I never know what survives it.',
  },
  {
    name: 'Jacob Jones',
    date: '20 Apr, 2026',
    text: 'Great read. The section on buying by weight rather than by piece saved me a surprising amount last month.',
  },
]

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const { toast } = useStore()
  const [comments, setComments] = useState(COMMENTS)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    if (post) document.title = `${post.title} — Ecobazar`
  }, [post])

  if (!post) return <NotFound />

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2)

  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.message.trim() || !form.email.includes('@')) {
      toast('Please add your name, a valid email and a message', 'error')
      return
    }
    setComments((current) => [
      {
        name: form.name,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        text: form.message,
      },
      ...current,
    ])
    setForm({ name: '', email: '', message: '' })
    toast('Thanks — your comment is published')
  }

  return (
    <>
      <PageHeader trail={[{ label: 'Blog', to: '/blog' }, { label: 'Single Blog' }]} />

      <div className="container-x flex flex-col gap-8 py-10 lg:flex-row-reverse lg:py-14">
        <BlogSidebar query="" onQueryChange={() => {}} activeTag={null} onTagChange={() => {}} />

        <article className="min-w-0 flex-1">
          <img
            src={post.image}
            alt=""
            className="aspect-[16/9] w-full rounded-lg object-cover"
          />

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Tag size={13} /> {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={13} /> By {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare size={13} /> {post.comments} Comments
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} /> {post.date}
            </span>
          </div>

          <h1 className="mt-4 text-2xl leading-snug md:text-[32px]">{post.title}</h1>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-y border-gray-50 py-4">
            <div className="flex items-center gap-3">
              <Avatar name={post.author} size={40} />
              <div>
                <p className="text-sm font-medium text-gray-900">{post.author}</p>
                <p className="text-xs text-gray-500">
                  {post.date} • {post.readTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label="Share article"
                  className="grid h-8 w-8 place-items-center rounded-full text-gray-600 transition-colors hover:bg-primary hover:text-white"
                >
                  <Icon size={15} />
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href)
                  toast('Link copied to clipboard')
                }}
                aria-label="Copy link"
                className="grid h-8 w-8 place-items-center rounded-full text-gray-600 transition-colors hover:bg-primary hover:text-white"
              >
                <Link2 size={15} />
              </button>
            </div>
          </div>

          <p className="mt-6 text-base font-medium leading-8 text-gray-900">{post.excerpt}</p>
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 text-sm leading-8 text-gray-600">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <img
                key={item.slug}
                src={item.image}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            ))}
          </div>

          <div className="relative isolate mt-8 overflow-hidden rounded-lg bg-gray-900 p-8">
            <img
              src="/images/products/carrot.jpg"
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-soft">
                  Summer Sales
                </p>
                <h2 className="mt-2 text-2xl text-white">Fresh Fruit</h2>
              </div>
              <span className="rounded-full bg-warning px-4 py-2 text-sm font-semibold text-white">
                Up to 56% Off
              </span>
              <Button to="/shop?sale=true">Shop Now</Button>
            </div>
          </div>

          {/* Comment form */}
          <section className="mt-10">
            <h2 className="text-xl">Leave a Comment</h2>
            <form onSubmit={submit} className="mt-5 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-gray-600">Full Name</span>
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    placeholder="Your name"
                    className="h-12 w-full rounded-md border border-gray-100 px-4 text-sm focus:border-primary focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-gray-600">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-md border border-gray-100 px-4 text-sm focus:border-primary focus:outline-none"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm text-gray-600">Message</span>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="Write your comment here…"
                  className="w-full rounded-md border border-gray-100 p-4 text-sm focus:border-primary focus:outline-none"
                />
              </label>
              <div>
                <Button type="submit">Post Comments</Button>
              </div>
            </form>
          </section>

          <section className="mt-10">
            <h2 className="text-xl">Comments</h2>
            <ul className="mt-5 divide-y divide-gray-50">
              {comments.map((comment, index) => (
                <li key={`${comment.name}-${index}`} className="flex gap-4 py-5">
                  <Avatar name={comment.name} size={40} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {comment.name} <span className="ml-2 text-xs text-gray-400">{comment.date}</span>
                    </p>
                    <p className="mt-2 text-sm leading-7 text-gray-600">{comment.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8">
            <Link to="/blog" className="text-sm font-semibold text-primary hover:underline">
              ← Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </>
  )
}
