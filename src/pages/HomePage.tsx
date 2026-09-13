import { useMemo } from 'react'
import { useStoreData } from '@/context/StoreDataContext'
import { hasDiscount } from '@/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { HeroBanner } from '@/components/home/HeroBanner'
import { CategoryShowcase } from '@/components/home/CategoryShowcase'
import { SectionHeader } from '@/components/home/SectionHeader'
import { BenefitsSection } from '@/components/home/BenefitsSection'
import { InstagramTeaser } from '@/components/home/InstagramTeaser'
import { ProductGrid } from '@/components/product/ProductGrid'

export function HomePage() {
  const { products, categories, banners, settings, homeContent, isLoading } = useStoreData()

  useDocumentTitle('Karen Store — Moda Feminina Online', settings.description)

  const activeProducts = useMemo(() => products.filter((p) => p.isActive), [products])
  const bestSellers = useMemo(() => activeProducts.filter((p) => p.isBestSeller).slice(0, 8), [activeProducts])
  const onOffer = useMemo(() => activeProducts.filter(hasDiscount).slice(0, 8), [activeProducts])
  const newArrivals = useMemo(() => activeProducts.filter((p) => p.isNew).slice(0, 8), [activeProducts])
  const featured = useMemo(() => activeProducts.filter((p) => p.isFeatured).slice(0, 8), [activeProducts])

  return (
    <div className="pb-6">
      <HeroBanner banners={banners.filter((b) => b.isActive)} />

      <CategoryShowcase categories={categories} />

      {bestSellers.length > 0 && (
        <section className="px-4 py-4 md:px-6">
          <SectionHeader title={homeContent.featuredSection.title} subtitle={homeContent.featuredSection.subtitle} viewAllTo="/categoria/mais-vendidos" />
          <ProductGrid products={bestSellers} isLoading={isLoading} />
        </section>
      )}

      {onOffer.length > 0 && (
        <section className="bg-brand-50/40 px-4 py-6 md:px-6">
          <SectionHeader title={homeContent.offersSection.title} subtitle={homeContent.offersSection.subtitle} viewAllTo="/categoria/promocoes" />
          <ProductGrid products={onOffer} isLoading={isLoading} />
        </section>
      )}

      {newArrivals.length > 0 && (
        <section className="px-4 py-6 md:px-6">
          <SectionHeader title={homeContent.newArrivalsSection.title} subtitle={homeContent.newArrivalsSection.subtitle} viewAllTo="/categoria/novidades" />
          <ProductGrid products={newArrivals} isLoading={isLoading} />
        </section>
      )}

      <BenefitsSection benefits={homeContent.benefits} />

      {featured.length > 0 && (
        <section className="px-4 py-6 md:px-6">
          <SectionHeader title="Você pode gostar" subtitle="Selecionamos algumas peças especiais para você" />
          <ProductGrid products={featured} isLoading={isLoading} />
        </section>
      )}

      <InstagramTeaser instagram={settings.instagram} storeName={settings.storeName} />
    </div>
  )
}
