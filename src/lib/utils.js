/** Joins class names, dropping falsy values. */
export const cn = (...classes) => classes.filter(Boolean).join(' ')

/**
 * Formats a USD amount in the shopper's chosen currency.
 * `currency` is an entry from data/settings.js; it defaults to USD.
 */
export const formatPrice = (value, currency) => {
  const { code = 'USD', rate = 1 } = currency ?? {}
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 2,
  }).format((value ?? 0) * rate)
}

/** Reads JSON from localStorage, tolerating private mode and corrupt values. */
export function readStorage(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or unavailable — the app still works, it just forgets */
  }
}

export const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
