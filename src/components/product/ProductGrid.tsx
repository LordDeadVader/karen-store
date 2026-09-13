import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchIcon } from '@/components/ui/icons'

export function ProductGrid({
  products,
  isLoading,
  emptyMessage = 'Nenhum produto encontrado',
  emptyDescription = 'Tente ajustar os filtros ou buscar por outro termo.',
}: {
  products: Product[]
  isLoading?: boolean
  emptyMessage?: string
  emptyDescription?: string
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return <EmptyState icon={<SearchIcon width={22} height={22} />} title={emptyMessage} description={emptyDescription} />
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
