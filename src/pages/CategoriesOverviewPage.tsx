import { Link } from 'react-router-dom'
import { useStoreData } from '@/context/StoreDataContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function CategoriesOverviewPage() {
  const { categories } = useStoreData()
  useDocumentTitle('Categorias', 'Explore todas as categorias da Karen Store')

  const active = categories.filter((c) => c.isActive)

  return (
    <div className="px-4 py-4 pb-6 md:px-6">
      <h1 className="font-display mb-4 text-2xl font-bold text-ink-900">Categorias</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        <Link to="/categoria/novidades" className="flex flex-col items-center gap-2 rounded-2xl bg-ink-900 px-4 py-6 text-center text-white">
          <span className="text-3xl">✨</span>
          <span className="text-sm font-semibold">Novidades</span>
        </Link>
        <Link to="/categoria/promocoes" className="flex flex-col items-center gap-2 rounded-2xl bg-brand-600 px-4 py-6 text-center text-white">
          <span className="text-3xl">🏷️</span>
          <span className="text-sm font-semibold">Promoções</span>
        </Link>
        {active.map((category) => (
          <Link
            key={category.id}
            to={`/categoria/${category.slug}`}
            className="flex flex-col items-center gap-2 rounded-2xl bg-brand-50 px-4 py-6 text-center"
          >
            <span className="text-3xl">{category.icon}</span>
            <span className="text-sm font-semibold text-ink-900">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
