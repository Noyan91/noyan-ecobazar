/** Storefront taxonomy. `image` doubles as the tile artwork on the home page. */
export const categories = [
  { slug: 'fresh-fruit', name: 'Fresh Fruit', image: '/images/products/green-apple.jpg' },
  { slug: 'vegetables', name: 'Fresh Vegetables', image: '/images/products/broccoli.jpg' },
  { slug: 'meat-fish', name: 'Meat & Fish', image: '/images/products/salmon-fillet.jpg' },
  { slug: 'snacks', name: 'Snacks', image: '/images/products/potato-chips.jpg' },
  { slug: 'beverages', name: 'Beverages', image: '/images/products/orange-juice.jpg' },
  { slug: 'beauty-health', name: 'Beauty & Health', image: '/images/products/shampoo.jpg' },
  { slug: 'bread-bakery', name: 'Bread & Bakery', image: '/images/products/brown-bread.jpg' },
  { slug: 'baking-needs', name: 'Baking Needs', image: '/images/products/eggs.jpg' },
  { slug: 'cooking', name: 'Cooking', image: '/images/products/rice.jpg' },
  { slug: 'diabetic-food', name: 'Diabetic Food', image: '/images/products/almonds.jpg' },
  { slug: 'dish-detergents', name: 'Dish Detergents', image: '/images/products/soap.jpg' },
  { slug: 'oil', name: 'Oil', image: '/images/products/olive-oil.jpg' },
]

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

export const categoryName = (slug) => categoryBySlug[slug]?.name ?? slug

/** Tag cloud shown in the shop sidebar and the blog sidebar. */
export const popularTags = [
  'Healthy',
  'Low fat',
  'Vegetarian',
  'Kid foods',
  'Vitamins',
  'Bread',
  'Meat',
  'Snacks',
  'Tiffin',
  'Launch',
  'Dinner',
  'Breackfast',
  'Fruit',
]
