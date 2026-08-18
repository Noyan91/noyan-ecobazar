import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../../data/content'
import { cn } from '../../lib/utils'
import Avatar from '../ui/Avatar'
import Rating from '../ui/Rating'
import SectionHeading from '../ui/SectionHeading'

/** Customer quotes; shows three at a time on desktop, one on mobile. */
export default function Testimonials() {
  const [start, setStart] = useState(0)

  const visible = Array.from({ length: 3 }, (_, offset) => testimonials[(start + offset) % testimonials.length])
  const move = (delta) =>
    setStart((current) => (current + delta + testimonials.length) % testimonials.length)

  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Testimonial" title="What Our Customers Say" className="mb-0" />
          <div className="mb-6 flex items-center gap-2 md:mb-8">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous testimonials"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-gray-600 transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next testimonials"
              className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hard"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <figure
              key={`${item.name}-${index}`}
              className={cn(
                'flex animate-fade-in flex-col rounded-lg bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]',
                index === 2 && 'hidden lg:flex',
                index === 1 && 'hidden md:flex',
              )}
            >
              <Quote size={28} className="text-primary-soft" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-7 text-gray-600">{item.text}</blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-gray-50 pt-4">
                <span className="flex items-center gap-3">
                  <Avatar name={item.name} size={40} />
                  <span>
                    <span className="block text-sm font-semibold text-gray-900">{item.name}</span>
                    <span className="block text-xs text-gray-500">{item.role}</span>
                  </span>
                </span>
                <Rating value={item.rating} />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
