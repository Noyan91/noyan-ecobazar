# Ecobazar — Organic Grocery eCommerce

A complete, responsive storefront built from the Ecobazar Figma design with **React 19**,
**React Router 7**, **Tailwind CSS 4** and **Vite 7**. Every screen in the design is
implemented, and the shop actually works: filtering, search, cart, wishlist, coupons,
checkout, orders and a demo account area all run on real state that survives a refresh.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

Node 18+ is required.

---

## What is implemented

### Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero slider, categories, product rails, deals, testimonials, blog, Instagram |
| `/shop` | Shop with sidebar filters, sorting, grid/list view and pagination |
| `/product/:slug` | Product detail — gallery, buy box, tabbed description/specs/reviews, related items |
| `/cart` | Shopping cart with quantities, coupons and totals |
| `/checkout` | Billing form with validation, order summary and payment method |
| `/order-confirmed` | Order confirmation |
| `/wishlist` | Saved products |
| `/blog`, `/blog/:slug` | Blog index with search/tags, and article with working comments |
| `/about`, `/contact`, `/faq` | Marketing pages (contact form validates, FAQ accordion) |
| `/sign-in`, `/sign-up` | Demo authentication |
| `/account`, `/account/orders`, `/account/orders/:id`, `/account/settings` | Account area with order tracking |
| `*` | 404 page |

### Working features

- **Cart** — add from any card, quick view or product page; quantity stepper, remove,
  slide-over drawer, live header badge and totals.
- **Coupons** — `ECO20` (20% off), `FRESH10` (10% off), `SAVE15` ($15 off baskets over $100).
- **Free shipping** over $50, otherwise a $4.99 fee, shown before payment.
- **Wishlist** — toggle from cards or the product page, with its own page.
- **Search** — header search with live suggestions; results open in the shop.
- **Filters** — category, price range, rating, tag and on-sale, all reflected in the URL so
  filtered views can be shared and bookmarked.
- **Checkout** — required-field validation with inline errors, then a real order is created.
- **Account** — sign in (any valid email + 6-character password), dashboard, order history,
  order detail with a delivery progress tracker, editable profile/billing/password.
- **Currency switcher** — the `USD` picker in the top bar reprices the entire site
  (cards, cart, checkout, order history) using the fixed demo rates in
  `src/data/settings.js`; there is no live FX feed in this build.
- **Language switcher** — remembers the choice and sets `<html lang>`; the copy itself
  ships in English only, so picking another language says so rather than pretending.
- **Persistence** — cart, wishlist, orders, currency, language and the signed-in user are
  stored in `localStorage`, so a refresh keeps everything.
- **Quick view**, newsletter popup (once per visitor), toasts, back-to-top, mobile menu.

### Responsive

Every page was checked at 390 px, 768 px, 1024 px and 1440 px. The header collapses into a
slide-in menu, the shop filters move into a drawer, tables reflow into stacked cards, and
grids step down from 5 → 3 → 2 columns.

---

## Project structure

```
src/
├── components/
│   ├── blog/       BlogSidebar
│   ├── home/       Hero, FeatureBar, CategoryGrid, DealBanners, DealRails,
│   │               Testimonials, BlogCard, Sections (trusted/stats/brands/instagram/team)
│   ├── layout/     Header, Footer, Logo, SearchBar, Newsletter, NewsletterPopup, Layout
│   ├── product/    ProductCard, ProductGallery, ProductSummary, QuickView, CartDrawer
│   ├── shop/       ShopSidebar
│   └── ui/         Button, Rating, QuantityStepper, Modal, Pagination, PageHeader,
│                   SectionHeading, Accordion, Countdown, Avatar, Toaster, SocialIcons
├── context/        StoreContext — cart, wishlist, orders, user, toasts
├── data/           products.js, categories.js, content.js (blog, FAQ, testimonials…)
├── lib/            utils.js — class merge, price format, storage helpers
├── pages/          One file per route (account pages under pages/account)
├── App.jsx         Routing
└── index.css       Tailwind theme: brand colours, typography, animations, utilities
```

### Design system

The Tailwind theme in `src/index.css` mirrors the Figma style guide:

| Token | Value |
| --- | --- |
| `primary` | `#00B207` |
| `primary-soft` | `#84D187` |
| `primary-hard` | `#2C742F` |
| `warning` | `#FF8A00` |
| `danger` | `#EA4B48` |
| `gray-50 … gray-900` | `#F2F2F2 … #1A1A1A` |
| `ggray-50 … ggray-900` | green-tinted greys used for panels |

Typography is **Poppins** (Google Fonts), matching the design's type scale.

---

## Images

Product and editorial photography is downloaded from [Openverse](https://openverse.org)
(rawpixel, Flickr and Wikimedia sources) under open, commercial-use licences, then
normalised to right-sized JPEGs. Three helper scripts keep this reproducible:

```bash
npm run images:fetch     # search-based download of anything missing
npm run images:picks     # re-download the hand-reviewed picks (exact titles/URLs)
npm run images:optimize  # convert to JPEG, resize and compress (17 MB → ~4 MB)
```

`node scripts/candidates.mjs "green bell pepper"` lists search results with titles and URLs,
which is how a replacement photo gets chosen before it is pinned in `scripts/picks.mjs`.

People in the demo (team members, reviewers, testimonials) are fictional, so they are shown
as monogram avatars rather than photographs of real people who never worked here.

---

## Notes for review

- No backend: orders, sign-in and form submissions are simulated in the browser.
- Sample data lives in `src/data/` — add a product by appending one row to `raw` in
  `products.js`; everything else (SKU, gallery, badges, category counts) is derived.
- Payment logos, brand names and store details are placeholders from the design.
