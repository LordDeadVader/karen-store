import { Link } from 'react-router-dom'
import { useStoreData } from '@/context/StoreDataContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ProductImage } from '@/components/product/ProductImage'

export function CategoriesOverviewPage() {
  const { categories } = useStoreData()
  useDocumentTitle('Categorias', 'Explore todas as categorias da Karen Store')

  const active = categories.filter((c) => c.isActive)

  return (
    <div className="px-4 py-4 pb-6 md:px-6">
      <h1 className="font-display mb-4 text-2xl font-bold text-ink-900">Categorias</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        <Link to="/categoria/novidades" className="flex aspect-[3/4] flex-col items-center justify-center gap-1 rounded-2xl bg-ink-900 px-4 text-center text-white">
          <span className="font-display text-lg font-semibold">Novidades</span>
          <span className="text-xs text-white/70">Peças recentes</span>
        </Link>
        <Link to="/categoria/promocoes" className="flex aspect-[3/4] flex-col items-center justify-center gap-1 rounded-2xl bg-brand-600 px-4 text-center text-white">
          <span className="font-display text-lg font-semibold">Promoções</span>
          <span className="text-xs text-white/70">Ofertas especiais</span>
        </Link>
        {active.map((category) => (
          <Link key={category.id} to={`/categoria/${category.slug}`} className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-50">
            <ProductImage
              src={category.image}
              alt={category.name}
              className="h-full w-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-0 w-full text-center text-sm font-semibold text-white">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
