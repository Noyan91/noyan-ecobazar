import { cn } from '../../lib/utils'

/**
 * People in this demo are fictional, so rather than putting a stranger's
 * photograph behind an invented name we draw a monogram in the brand palette.
 * A real `src` (for example the avatar a signed-in user uploads) wins.
 */

const TONES = [
  'bg-primary-surface text-primary-hard',
  'bg-ggray-100 text-ggray-700',
  'bg-warning/15 text-warning',
  'bg-gray-50 text-gray-700',
]

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

const toneFor = (name = '') =>
  TONES[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % TONES.length]

export default function Avatar({ name = '', src, size = 40, rounded = 'full', className }) {
  const style = { width: size, height: size, fontSize: Math.max(12, size * 0.36) }
  const shape = rounded === 'full' ? 'rounded-full' : 'rounded-lg'

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={style}
        loading="lazy"
        className={cn('shrink-0 object-cover', shape, className)}
      />
    )
  }

  return (
    <span
      style={style}
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center font-semibold uppercase tracking-wide',
        shape,
        toneFor(name),
        className,
      )}
    >
      {initials(name) || '·'}
    </span>
  )
}
