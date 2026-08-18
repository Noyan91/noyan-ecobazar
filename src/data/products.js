/**
 * Product catalogue.
 *
 * Entries are written in a compact form and expanded by `expand()` so every
 * product ends up with the same shape (gallery, SKU, stock, copy, flags…).
 * Flags drive the home-page rails: featured / best / hot / top / new / sale.
 */

const DESCRIPTIONS = {
  'fresh-fruit':
    'Hand-picked at peak ripeness and delivered within 24 hours of harvest, so every piece arrives sweet, juicy and full of natural vitamins.',
  vegetables:
    'Grown without synthetic pesticides on certified organic farms, then cooled and packed the same day to lock in crunch, colour and nutrients.',
  'meat-fish':
    'Sourced from farms and day boats we know by name, cut to order and kept in an unbroken cold chain from the counter to your kitchen.',
  snacks:
    'A better-for-you snack made with simple, recognisable ingredients — no artificial colours, no preservatives, just honest flavour.',
  beverages:
    'Bottled fresh with nothing added but care. Chill it, pour it and enjoy a clean, refreshing taste from the first sip to the last.',
  'beauty-health':
    'A gentle, dermatologically tested formula built on plant-derived actives that respect your skin and the water it washes into.',
  'bread-bakery':
    'Baked in small batches each morning using a slow ferment, stone-milled flour and nothing you would not find in a home kitchen.',
  'baking-needs':
    'A dependable pantry staple, carefully sourced and packed so your baking turns out exactly the same way every single time.',
  cooking:
    'A kitchen essential chosen for consistency and flavour, packed in resealable packaging that keeps it fresh right to the last spoon.',
  'diabetic-food':
    'Low on sugar, high on goodness. A mindful choice with a gentle glycaemic load, portioned to make balanced eating effortless.',
  'dish-detergents':
    'Cuts through grease fast while staying kind to your hands, with a readily biodegradable formula and recyclable packaging.',
  oil: 'Cold pressed in small batches and stored in dark glass to protect the aroma, the antioxidants and the delicate finish.',
}

const HIGHLIGHTS = [
  '100 g of fresh produce provides all the daily goodness you need.',
  'Sourced from certified organic growers we visit every season.',
  'Packed the same day it is picked to keep nutrients intact.',
  'Free from artificial preservatives, colours and flavours.',
]

const raw = [
  // ── Fresh fruit ────────────────────────────────────────────────────────
  { n: 'Green Apple', img: 'green-apple', cat: 'fresh-fruit', price: 14.99, old: 20.99, rating: 4.5, reviews: 32, unit: '1 kg', tags: ['Healthy', 'Fruit', 'Vitamins'], flags: ['featured', 'hot', 'best'] },
  { n: 'Fresh Indian Malta', img: 'indian-malta', cat: 'fresh-fruit', price: 20.0, rating: 4.4, reviews: 21, unit: '1 kg', tags: ['Fruit', 'Vitamins', 'Healthy'], flags: ['featured', 'hot', 'new'] },
  { n: 'Fresh Mango', img: 'fresh-mango', cat: 'fresh-fruit', price: 34.0, old: 40.0, rating: 4.8, reviews: 54, unit: '1 kg', tags: ['Fruit', 'Healthy'], flags: ['top', 'new'] },
  { n: 'Red Grapes', img: 'red-grapes', cat: 'fresh-fruit', price: 24.5, rating: 4.3, reviews: 18, unit: '500 g', tags: ['Fruit', 'Vitamins'], flags: ['new'] },
  { n: 'Organic Banana', img: 'banana', cat: 'fresh-fruit', price: 9.99, old: 12.99, rating: 4.6, reviews: 47, unit: '1 dozen', tags: ['Fruit', 'Kid foods', 'Breackfast'], flags: ['best', 'top'] },
  { n: 'Fresh Strawberry', img: 'strawberry', cat: 'fresh-fruit', price: 18.0, rating: 4.9, reviews: 63, unit: '250 g', tags: ['Fruit', 'Healthy'], flags: ['featured', 'top'] },
  { n: 'Sweet Pineapple', img: 'pineapple', cat: 'fresh-fruit', price: 15.75, rating: 4.2, reviews: 12, unit: '1 pc', tags: ['Fruit', 'Vitamins'] },
  { n: 'Baby Watermelon', img: 'watermelon', cat: 'fresh-fruit', price: 12.0, old: 16.0, rating: 4.1, reviews: 9, unit: '1 pc', tags: ['Fruit', 'Healthy'] },
  { n: 'Yellow Lemon', img: 'lemon', cat: 'fresh-fruit', price: 6.5, rating: 4.4, reviews: 26, unit: '500 g', tags: ['Fruit', 'Vitamins', 'Cooking'] },

  // ── Vegetables ─────────────────────────────────────────────────────────
  { n: 'Chinese Cabbage', img: 'chinese-cabbage', cat: 'vegetables', price: 17.28, old: 48.0, rating: 5, reviews: 4, unit: '1 kg', tags: ['Vegetables', 'Healthy', 'Chinese', 'Cabbage'], flags: ['featured', 'best', 'top'] },
  { n: 'Green Lettuce', img: 'green-lettuce', cat: 'vegetables', price: 9.0, rating: 4.2, reviews: 15, unit: '1 pc', tags: ['Vegetables', 'Low fat', 'Vegetarian'], flags: ['featured', 'hot'] },
  { n: 'Green Chili', img: 'green-chili', cat: 'vegetables', price: 34.0, rating: 4.0, reviews: 11, unit: '250 g', tags: ['Vegetables', 'Cooking'], flags: ['featured', 'best'] },
  { n: 'Sweet Corn', img: 'corn', cat: 'vegetables', price: 14.99, rating: 4.3, reviews: 24, unit: '2 pcs', tags: ['Vegetables', 'Kid foods'], flags: ['featured', 'top'], out: true },
  { n: 'Fresh Eggplant', img: 'eggplant', cat: 'vegetables', price: 34.0, rating: 4.1, reviews: 8, unit: '1 kg', tags: ['Vegetables', 'Vegetarian'], flags: ['best'] },
  { n: 'Big Potatoes', img: 'big-potatoes', cat: 'vegetables', price: 20.0, old: 24.0, rating: 4.5, reviews: 39, unit: '2 kg', tags: ['Vegetables', 'Dinner'], flags: ['top', 'hot'] },
  { n: 'Fresh Cauliflower', img: 'cauliflower', cat: 'vegetables', price: 12.0, rating: 4.4, reviews: 17, unit: '1 pc', tags: ['Vegetables', 'Low fat'], flags: ['top'] },
  { n: 'Green Capsicum', img: 'green-capsicum', cat: 'vegetables', price: 9.0, old: 20.99, rating: 4.6, reviews: 41, unit: '500 g', tags: ['Vegetables', 'Vegetarian'], flags: ['featured', 'hot', 'new'] },
  { n: 'Red Capsicum', img: 'red-capsicum', cat: 'vegetables', price: 32.0, old: 40.99, rating: 4.5, reviews: 28, unit: '500 g', tags: ['Vegetables', 'Vegetarian'], flags: ['hot'] },
  { n: 'Red Tomato', img: 'red-tomato', cat: 'vegetables', price: 14.99, rating: 4.7, reviews: 52, unit: '1 kg', tags: ['Vegetables', 'Cooking', 'Healthy'], flags: ['best', 'new'] },
  { n: 'Red Chili', img: 'red-chili', cat: 'vegetables', price: 12.0, rating: 4.2, reviews: 13, unit: '250 g', tags: ['Vegetables', 'Cooking'], flags: ['hot'] },
  { n: 'Ladies Finger', img: 'ladies-finger', cat: 'vegetables', price: 14.99, old: 20.99, rating: 4.0, reviews: 10, unit: '500 g', tags: ['Vegetables', 'Vegetarian'], flags: ['new'] },
  { n: 'Green Cucumber', img: 'green-cucumber', cat: 'vegetables', price: 14.99, old: 20.99, rating: 4.3, reviews: 22, unit: '1 kg', tags: ['Vegetables', 'Low fat', 'Healthy'], flags: ['new'] },
  { n: 'Fresh Broccoli', img: 'broccoli', cat: 'vegetables', price: 16.5, rating: 4.8, reviews: 45, unit: '500 g', tags: ['Vegetables', 'Healthy', 'Low fat'], flags: ['featured', 'top'] },
  { n: 'Organic Carrot', img: 'carrot', cat: 'vegetables', price: 11.25, old: 15.0, rating: 4.6, reviews: 34, unit: '1 kg', tags: ['Vegetables', 'Kid foods', 'Vitamins'], flags: ['best'] },
  { n: 'Red Onion', img: 'onion', cat: 'vegetables', price: 8.99, rating: 4.1, reviews: 19, unit: '1 kg', tags: ['Vegetables', 'Cooking'] },
  { n: 'Fresh Garlic', img: 'garlic', cat: 'vegetables', price: 7.5, rating: 4.4, reviews: 23, unit: '250 g', tags: ['Vegetables', 'Cooking'] },
  { n: 'Golden Pumpkin', img: 'pumpkin', cat: 'vegetables', price: 13.0, old: 18.0, rating: 4.0, reviews: 7, unit: '1 pc', tags: ['Vegetables', 'Dinner'] },
  { n: 'Baby Spinach', img: 'spinach', cat: 'vegetables', price: 10.5, rating: 4.7, reviews: 31, unit: '250 g', tags: ['Vegetables', 'Healthy', 'Low fat'], flags: ['top'] },

  // ── Meat & fish ────────────────────────────────────────────────────────
  { n: 'Beef Sirloin Steak', img: 'beef-steak', cat: 'meat-fish', price: 79.99, old: 95.0, rating: 4.7, reviews: 58, unit: '1 kg', tags: ['Meat', 'Dinner'], flags: ['hot', 'best'] },
  { n: 'Whole Farm Chicken', img: 'chicken-breast', cat: 'meat-fish', price: 45.0, rating: 4.5, reviews: 36, unit: '1 kg', tags: ['Meat', 'Low fat'], flags: ['top'] },
  { n: 'Norwegian Salmon', img: 'salmon-fillet', cat: 'meat-fish', price: 89.0, old: 110.0, rating: 4.9, reviews: 71, unit: '500 g', tags: ['Meat', 'Healthy', 'Dinner'], flags: ['featured', 'hot'] },
  { n: 'Fresh Tiger Prawns', img: 'shrimp', cat: 'meat-fish', price: 62.5, rating: 4.6, reviews: 29, unit: '500 g', tags: ['Meat', 'Dinner'], flags: ['new'] },

  // ── Bread & bakery ─────────────────────────────────────────────────────
  { n: 'Whole Grain Bread', img: 'brown-bread', cat: 'bread-bakery', price: 8.5, rating: 4.4, reviews: 25, unit: '400 g', tags: ['Bread', 'Breackfast'], flags: ['best'] },
  { n: 'Butter Croissant', img: 'croissant', cat: 'bread-bakery', price: 6.99, old: 9.5, rating: 4.6, reviews: 33, unit: '4 pcs', tags: ['Bread', 'Breackfast', 'Tiffin'], flags: ['hot', 'new'] },

  // ── Beverages ──────────────────────────────────────────────────────────
  { n: 'Fresh Cow Milk', img: 'cow-milk', cat: 'beverages', price: 14.99, rating: 4.5, reviews: 44, unit: '1 litre', tags: ['Breackfast', 'Kid foods', 'Healthy'], flags: ['featured', 'best'] },
  { n: 'Orange Juice', img: 'orange-juice', cat: 'beverages', price: 12.99, old: 17.0, rating: 4.7, reviews: 51, unit: '1 litre', tags: ['Vitamins', 'Breackfast'], flags: ['hot', 'top'] },
  { n: 'Mixed Fruit Smoothie', img: 'smoothie', cat: 'beverages', price: 7.99, rating: 4.2, reviews: 26, unit: '330 ml', tags: ['Healthy', 'Kid foods', 'Breackfast'] },
  { n: 'Organic Green Tea', img: 'green-tea', cat: 'beverages', price: 18.5, old: 22.0, rating: 4.8, reviews: 62, unit: '100 g', tags: ['Healthy', 'Low fat'], flags: ['top', 'new'] },

  // ── Snacks ─────────────────────────────────────────────────────────────
  { n: 'Salted Potato Chips', img: 'potato-chips', cat: 'snacks', price: 4.99, rating: 4.1, reviews: 20, unit: '150 g', tags: ['Snacks', 'Kid foods', 'Tiffin'], flags: ['hot'] },
  { n: 'Chocolate Chip Cookies', img: 'cookies', cat: 'snacks', price: 9.99, old: 13.5, rating: 4.5, reviews: 38, unit: '300 g', tags: ['Snacks', 'Kid foods', 'Tiffin'], flags: ['best', 'new'] },
  { n: 'Roasted Almonds', img: 'almonds', cat: 'snacks', price: 26.0, rating: 4.8, reviews: 49, unit: '500 g', tags: ['Healthy', 'Vitamins', 'Snacks'], flags: ['top'] },

  // ── Beauty & health ────────────────────────────────────────────────────
  { n: 'Herbal Shampoo', img: 'shampoo', cat: 'beauty-health', price: 22.0, old: 28.0, rating: 4.3, reviews: 16, unit: '400 ml', tags: ['Healthy'], flags: ['new'] },
  { n: 'Natural Soap Bar', img: 'soap', cat: 'beauty-health', price: 6.75, rating: 4.4, reviews: 27, unit: '2 pcs', tags: ['Healthy'] },

  // ── Cooking, baking, oil, diabetic, detergents ─────────────────────────
  { n: 'Basmati Rice', img: 'rice', cat: 'cooking', price: 32.0, old: 38.0, rating: 4.6, reviews: 55, unit: '5 kg', tags: ['Cooking', 'Dinner'], flags: ['best'] },
  { n: 'Farm Fresh Eggs', img: 'eggs', cat: 'baking-needs', price: 11.99, rating: 4.7, reviews: 66, unit: '12 pcs', tags: ['Breackfast', 'Kid foods'], flags: ['hot', 'top'] },
  { n: 'Camembert Cheese', img: 'cheese', cat: 'baking-needs', price: 28.5, rating: 4.5, reviews: 23, unit: '250 g', tags: ['Breackfast', 'Dinner'] },
  { n: 'Extra Virgin Olive Oil', img: 'olive-oil', cat: 'oil', price: 42.0, old: 52.0, rating: 4.9, reviews: 74, unit: '750 ml', tags: ['Cooking', 'Healthy'], flags: ['featured', 'hot'] },
  { n: 'Raw Forest Honey', img: 'honey', cat: 'diabetic-food', price: 24.99, rating: 4.8, reviews: 43, unit: '500 g', tags: ['Healthy', 'Breackfast'], flags: ['top'] },
  { n: 'Blueberry Yogurt', img: 'yogurt', cat: 'diabetic-food', price: 8.99, old: 11.5, rating: 4.4, reviews: 30, unit: '400 g', tags: ['Healthy', 'Low fat', 'Breackfast'], flags: ['new'] },
  { n: 'Lemon Dishwash Bar', img: 'soap', cat: 'dish-detergents', price: 3.99, rating: 4.0, reviews: 12, unit: '2 pcs', tags: ['Healthy'] },
]

/** Four crops of the same photo give the detail gallery something to switch. */
const galleryFor = (src) => [
  { src, style: { transform: 'scale(1)', objectPosition: '50% 50%' } },
  { src, style: { transform: 'scale(1.25)', objectPosition: '50% 35%' } },
  { src, style: { transform: 'scale(1.4)', objectPosition: '40% 55%' } },
  { src, style: { transform: 'scale(1.15)', objectPosition: '60% 60%' } },
]

function expand(entry, index) {
  const flags = entry.flags ?? []
  const image = `/images/products/${entry.img}.jpg`
  const discount = entry.old ? Math.round(((entry.old - entry.price) / entry.old) * 100) : 0
  return {
    id: index + 1,
    slug: `${entry.img}-${index + 1}`,
    name: entry.n,
    image,
    gallery: galleryFor(image),
    price: entry.price,
    oldPrice: entry.old ?? null,
    discount,
    rating: entry.rating,
    reviews: entry.reviews,
    category: entry.cat,
    tags: entry.tags ?? [],
    unit: entry.unit ?? '1 kg',
    inStock: !entry.out,
    stock: entry.out ? 0 : 5413 - index * 37,
    sku: `2,51,${(594 + index * 7).toString().padStart(3, '0')}`,
    brand: 'Farmary',
    weight: entry.unit ?? '1 kg',
    color: entry.n.split(' ')[0],
    type: 'Organic',
    description: DESCRIPTIONS[entry.cat],
    highlights: HIGHLIGHTS,
    featured: flags.includes('featured'),
    bestSeller: flags.includes('best'),
    hotDeal: flags.includes('hot'),
    topRated: flags.includes('top'),
    isNew: flags.includes('new'),
    onSale: Boolean(entry.old),
  }
}

export const products = raw.map(expand)

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)

export const getRelated = (product, limit = 4) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit)

export const featuredProducts = products.filter((p) => p.featured)
export const bestSellers = products.filter((p) => p.bestSeller)
export const hotDeals = products.filter((p) => p.hotDeal)
export const topRated = products.filter((p) => p.topRated)
export const newestProducts = products.filter((p) => p.isNew)
export const saleProducts = products.filter((p) => p.onSale)

export const productCountByCategory = products.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] ?? 0) + 1
  return acc
}, {})

export const priceBounds = {
  min: 0,
  max: Math.ceil(Math.max(...products.map((p) => p.price)) / 10) * 10,
}
