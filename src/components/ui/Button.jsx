import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-hard',
  dark: 'bg-gray-900 text-white hover:bg-primary',
  soft: 'bg-primary-surface text-primary hover:bg-primary hover:text-white',
  outline: 'border border-gray-100 bg-white text-gray-900 hover:border-primary hover:text-primary',
  ghost: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
  white: 'bg-white text-gray-900 hover:bg-primary hover:text-white',
}

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-[51px] px-8 text-base',
}

/** One button, three shapes: <button>, <Link> (to) or <a> (href). */
export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  full,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    full && 'w-full',
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  const Component = as ?? 'button'
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
