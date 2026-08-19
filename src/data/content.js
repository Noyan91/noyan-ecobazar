/** Editorial content: blog posts, testimonials, team, FAQs and store info. */

const body = [
  'Eating with the seasons is the simplest way to eat better. Produce that is harvested when it is genuinely ready travels a shorter distance, spends less time in storage and keeps far more of the vitamins that make it worth eating in the first place.',
  'When you shop from growers rather than warehouses, the difference shows up on the plate. Tomatoes taste like tomatoes, greens stay crisp for days and you throw away noticeably less at the end of the week.',
  'Start small. Pick two or three ingredients you cook with every week and switch those to organic first — you will notice the change immediately, and your weekly bill barely moves.',
]

export const posts = [
  {
    slug: 'seasonal-citrus-guide',
    title: 'The seasonal citrus guide: picking fruit that is actually ripe',
    excerpt:
      'Colour tells you almost nothing about a good orange. Here is what to look for instead, and how to store citrus so it lasts a fortnight.',
    image: '/images/products/blog-1.jpg',
    category: 'Food',
    author: 'Cameron Williamson',
    date: '18 Nov 2025',
    readTime: '6 min read',
    comments: 65,
    tags: ['Fruit', 'Healthy', 'Vitamins'],
    body,
  },
  {
    slug: 'vegetables-that-keep',
    title: 'Ten vegetables that keep for two weeks (and how to store them)',
    excerpt:
      'A little planning turns a single grocery run into a fortnight of good cooking. These are the vegetables that reward you for it.',
    image: '/images/products/blog-2.jpg',
    category: 'Food',
    author: 'Jenny Wilson',
    date: '23 Nov 2025',
    readTime: '5 min read',
    comments: 42,
    tags: ['Vegetables', 'Healthy'],
    body,
  },
  {
    slug: 'breakfast-bowls',
    title: 'Breakfast bowls you can build in under five minutes',
    excerpt:
      'Yogurt, fruit, a handful of nuts and something crunchy. Five combinations that keep you full until lunch without any cooking.',
    image: '/images/products/blog-3.jpg',
    category: 'Recipes',
    author: 'Robert Fox',
    date: '18 Nov 2025',
    readTime: '4 min read',
    comments: 28,
    tags: ['Breackfast', 'Healthy', 'Kid foods'],
    body,
  },
  {
    slug: 'mango-season',
    title: 'Mango season is short — here is how to make the most of it',
    excerpt:
      'From choosing by smell to freezing cheeks for smoothies, a practical guide to the best six weeks of the fruit calendar.',
    image: '/images/products/blog-4.jpg',
    category: 'Food',
    author: 'Dianne Russell',
    date: '25 Nov 2025',
    readTime: '7 min read',
    comments: 51,
    tags: ['Fruit', 'Vitamins'],
    body,
  },
  {
    slug: 'peppers-every-colour',
    title: 'Why bell peppers change colour, and which one to cook with',
    excerpt:
      'Green, yellow and red are the same pepper at three stages of ripeness. That single fact should change how you cook them.',
    image: '/images/products/blog-5.jpg',
    category: 'Cooking',
    author: 'Eleanor Pena',
    date: '30 Nov 2025',
    readTime: '5 min read',
    comments: 34,
    tags: ['Vegetables', 'Cooking'],
    body,
  },
  {
    slug: 'citrus-vitamin-c',
    title: 'Vitamin C: how much you actually need each day',
    excerpt:
      'The number is smaller than most supplements suggest, and a single bowl of fruit usually covers it. Here is the maths.',
    image: '/images/products/blog-6.jpg',
    category: 'Health',
    author: 'Cody Fisher',
    date: '2 Dec 2025',
    readTime: '6 min read',
    comments: 19,
    tags: ['Healthy', 'Vitamins', 'Fruit'],
    body,
  },
  {
    slug: 'avocado-toast-upgrade',
    title: 'Five ways to upgrade avocado toast without a recipe',
    excerpt:
      'Acid, salt, heat, crunch and herbs. Get those five right and breakfast stops being repetitive.',
    image: '/images/products/blog-7.jpg',
    category: 'Recipes',
    author: 'Jane Cooper',
    date: '6 Dec 2025',
    readTime: '4 min read',
    comments: 23,
    tags: ['Breackfast', 'Vegetarian'],
    body,
  },
  {
    slug: 'shop-market-like-a-chef',
    title: 'Shop the market like a chef: a simple weekly system',
    excerpt:
      'Buy the vegetables first, build the menu second. It sounds backwards and it works remarkably well.',
    image: '/images/products/market-1.jpg',
    category: 'Food',
    author: 'Guy Hawkins',
    date: '11 Dec 2025',
    readTime: '8 min read',
    comments: 47,
    tags: ['Vegetables', 'Dinner'],
    body,
  },
]

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug)

/** Names and quotes are illustrative demo content, so no portraits are used. */
export const testimonials = [
  {
    name: 'Robert Fox',
    role: 'Customer',
    rating: 5,
    text: 'I have been ordering weekly for six months. Deliveries turn up in the window they promise, and the produce lasts noticeably longer than what I was buying at my local supermarket.',
  },
  {
    name: 'Dianne Russell',
    role: 'Customer',
    rating: 5,
    text: 'The vegetable boxes changed how we cook. Everything arrives cold, properly packed, and the app makes it easy to swap anything the kids will not eat.',
  },
  {
    name: 'Eleanor Pena',
    role: 'Customer',
    rating: 4,
    text: 'Great range and genuinely fresh fruit. Customer service sorted a missing item within the hour and refunded it without any argument.',
  },
  {
    name: 'Guy Hawkins',
    role: 'Customer',
    rating: 5,
    text: 'Prices are fair for organic and the seasonal deals are worth watching. The mango offer last month was better than anything at the market.',
  },
]

export const team = [
  { name: 'Jenny Wilson', role: 'Ceo & Founder' },
  { name: 'Jane Cooper', role: 'Worker' },
  { name: 'Cody Fisher', role: 'Security Guard' },
  { name: 'Robert Fox', role: 'Senior Farmer Manager' },
]

export const faqs = [
  {
    q: 'How quickly will my order be delivered?',
    a: 'Orders placed before 6pm are delivered the next day across the metro area, and within 48 hours everywhere else we serve. You will get a text with a two-hour window on the morning of delivery, and you can reschedule from the order page right up until the driver leaves the depot.',
  },
  {
    q: 'Is delivery really free?',
    a: 'Delivery is free on every order over $50. Below that a flat $4.99 fee applies, which is shown on the checkout page before you pay — we never add anything after you place the order.',
  },
  {
    q: 'What if something arrives damaged or missing?',
    a: 'Tell us within 48 hours through the contact form or by phone and we will refund the item straight away, no photographs and no forms. Fresh produce is judged generously: if it is not good enough to serve, it is not good enough to charge for.',
  },
  {
    q: 'Where do you source your produce?',
    a: 'From 120 certified organic growers, most of them within 200 miles of our depots. Every product page lists the farm and the week it was harvested, and our buying team visits each grower at least once a season.',
  },
  {
    q: 'Can I change or cancel an order after checkout?',
    a: 'Yes. Orders can be edited or cancelled from Account → Order History until they move into the "On the way" stage, which is usually around 10pm the evening before your delivery slot.',
  },
  {
    q: 'Do you offer a subscription?',
    a: 'You can turn any basket into a weekly or fortnightly repeat order at checkout. Subscriptions can be paused, skipped or cancelled at any time and there is no minimum commitment.',
  },
]

export const storeInfo = {
  address: 'Lincoln- 344, Illinois, Chicago, USA',
  addressLong: '2715 Ash Dr. San Jose, South Dakota 83475',
  phone: '(219) 555-0114',
  phoneAlt: '(164) 333-0487',
  email: 'hello@codersnoyan.com',
}

export const features = [
  { icon: 'truck', title: 'Free Shipping', text: 'Free shipping on all your orders' },
  { icon: 'headset', title: 'Customer Support 24/7', text: 'Instant access to support' },
  { icon: 'shield', title: '100% Secure Payment', text: 'We ensure your money is safe' },
  { icon: 'box', title: 'Money-Back Guarantee', text: '30 days money-back guarantee' },
]

export const stats = [
  { value: '37+', label: 'Years of Hard Work' },
  { value: '500k+', label: 'Happy Customer' },
  { value: '28', label: 'Qualified Team Member' },
  { value: '750k+', label: 'Monthly Orders' },
]

export const brands = ['steps', 'MANGO', 'fusad', 'FOOD', 'BOOK-OFF', 'G Series']

export const instagramFeed = [
  '/images/products/red-tomato.jpg',
  '/images/products/spinach.jpg',
  '/images/products/red-capsicum.jpg',
  '/images/products/fresh-mango.jpg',
  '/images/products/green-apple.jpg',
  '/images/products/market-2.jpg',
]
