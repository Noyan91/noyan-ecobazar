/**
 * Language and currency options for the top utility bar.
 *
 * Rates are fixed demo values relative to USD — this build has no live FX feed,
 * so they are here to show the switcher working end to end, not to be accurate.
 */

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'Eng' },
  { code: 'bn', label: 'Bangla', short: 'Bn' },
  { code: 'ar', label: 'Arabic', short: 'Ar' },
  { code: 'es', label: 'Spanish', short: 'Es' },
]

export const CURRENCIES = [
  { code: 'USD', label: 'USD', symbol: '$', rate: 1 },
  { code: 'EUR', label: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', label: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'BDT', label: 'BDT', symbol: '৳', rate: 122 },
]

export const DEFAULT_LANGUAGE = LANGUAGES[0]
export const DEFAULT_CURRENCY = CURRENCIES[0]

export const findLanguage = (code) => LANGUAGES.find((l) => l.code === code) ?? DEFAULT_LANGUAGE
export const findCurrency = (code) => CURRENCIES.find((c) => c.code === code) ?? DEFAULT_CURRENCY
