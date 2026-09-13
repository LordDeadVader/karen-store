import { useNavigate } from 'react-router-dom'
import { useStoreData } from '@/context/StoreDataContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ProductGrid } from '@/components/product/ProductGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'

export function FavoritesPage() {
  const { products, isLoading } = useStoreData()
  const { favoriteIds } = useFavorites()
  const navigate = useNavigate()

  useDocumentTitle('Favoritos', 'Seus produtos favoritos na Karen Store')

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id) && p.isActive)

  return (
    <div className="px-4 py-4 pb-6 md:px-6">
      <h1 className="font-display mb-4 text-2xl font-bold text-ink-900">Favoritos</h1>

      {favoriteProducts.length === 0 && !isLoading ? (
        <EmptyState
          icon="💗"
          title="Você ainda não tem favoritos"
          description="Toque no coração dos produtos que você amar para vê-los aqui."
          action={<Button onClick={() => navigate('/')}>Explorar produtos</Button>}
        />
      ) : (
        <ProductGrid products={favoriteProducts} isLoading={isLoading} />
      )}
    </div>
  )
}
