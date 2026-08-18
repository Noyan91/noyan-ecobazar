import { useEffect } from 'react'
import BlogCard from '../components/home/BlogCard'
import CategoryGrid from '../components/home/CategoryGrid'
import DealBanners from '../components/home/DealBanners'
import DealRails from '../components/home/DealRails'
import FeatureBar from '../components/home/FeatureBar'
import Hero from '../components/home/Hero'
import {
  BrandStrip,
  InstagramFeed,
  OfferBanner,
  StatsBar,
  TeamSection,
  TrustedSection,
} from '../components/home/Sections'
import Testimonials from '../components/home/Testimonials'
import ProductCard from '../components/product/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import { posts, team } from '../data/content'
import { featuredProducts, newestProducts, products } from '../data/products'

export default function Home() {
  useEffect(() => {
    document.title = 'Ecobazar — Fresh & Healthy Organic Food'
  }, [])

  const popular = products.slice(0, 10)

  return (
    <>
      <Hero />
      <FeatureBar className="py-10 lg:py-12" />

      <section className="container-x pb-12 lg:pb-16">
        <SectionHeading title="Popular Products" viewAllTo="/shop" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <DealBanners />
      <DealRails />

      <section className="container-x pb-12 lg:pb-16">
        <SectionHeading eyebrow="Products" title="Our Featured Products" viewAllTo="/shop?sort=popular" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {featuredProducts.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <OfferBanner />
      <TrustedSection />
      <StatsBar />

      <section className="container-x py-12 lg:py-16">
        <SectionHeading title="Newest Products" viewAllTo="/shop?sort=newest" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {newestProducts.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <TeamSection members={team} />
      <Testimonials />

      <section className="container-x py-12 lg:py-16">
        <SectionHeading eyebrow="Blog" title="Latest News" viewAllTo="/blog" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <BrandStrip />
      <InstagramFeed />
    </>
  )
}
