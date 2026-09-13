import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStoreData } from '@/context/StoreDataContext'
import { hasDiscount } from '@/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useProductFilters, countActiveFilters } from '@/hooks/useProductFilters'
import { ProductGrid } from '@/components/product/ProductGrid'
import { CategoryStrip } from '@/components/home/CategoryStrip'
import { FilterDrawer } from '@/components/filters/FilterDrawer'
import { SortSelect } from '@/components/filters/SortSelect'
import { Button } from '@/components/ui/Button'
import { AlertIcon, FilterIcon } from '@/components/ui/icons'
import { EmptyState } from '@/components/ui/EmptyState'

const VIRTUAL_CATEGORIES: Record<string, { name: string; description: string }> = {
  novidades: { name: 'Novidades', description: 'As peças mais recentes da Karen Store' },
  promocoes: { name: 'Promoções', description: 'Ofertas especiais por tempo limitado' },
  'mais-vendidos': { name: 'Mais vendidos', description: 'As queridinhas da Karen Store' },
}

export function CategoryPage() {
  const { slug = '' } = useParams()
  const { products, categories, isLoading } = useStoreData()
  const [isFilterOpen, setFilterOpen] = useState(false)

  const category = categories.find((c) => c.slug === slug)
  const virtual = VIRTUAL_CATEGORIES[slug]

  const title = category?.name ?? virtual?.name ?? 'Categoria'
  useDocumentTitle(title, virtual?.description ?? `Confira ${title.toLowerCase()} na Karen Store`)

  const baseProducts = useMemo(() => {
    const active = products.filter((p) => p.isActive)
    if (category) return active.filter((p) => p.categoryId === category.id)
    if (slug === 'novidades') return active.filter((p) => p.isNew)
    if (slug === 'promocoes') return active.filter(hasDiscount)
    if (slug === 'mais-vendidos') return active.filter((p) => p.isBestSeller)
    return active
  }, [products, category, slug])

  const { filters, setFilters, filteredProducts, availableSizes, availableColors, toggleSize, toggleColor, reset } =
    useProductFilters(baseProducts)

  const activeFilterCount = countActiveFilters(filters)

  if (!category && !virtual) {
    return (
      <EmptyState
        icon={<AlertIcon width={22} height={22} />}
        title="Categoria não encontrada"
        description="Essa categoria pode ter sido removida ou renomeada."
      />
    )
  }

  return (
    <div className="pb-6">
      <div className="border-b border-ink-900/6 px-4 pt-4 pb-2 md:px-6">
        <h1 className="font-display text-2xl font-bold text-ink-900">{title}</h1>
        <p className="text-sm text-ink-500">{virtual?.description ?? `${baseProducts.length} produtos disponíveis`}</p>
      </div>

      <CategoryStrip categories={categories} />

      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Button variant="outline" size="sm" onClick={() => setFilterOpen(true)} className="relative">
          <FilterIcon width={16} height={16} /> Filtrar
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </Button>
        <SortSelect value={filters.sort} onChange={(sort) => setFilters((prev) => ({ ...prev, sort }))} />
      </div>

      <div className="px-4 md:px-6">
        <ProductGrid products={filteredProducts} isLoading={isLoading} />
      </div>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        availableSizes={availableSizes}
        availableColors={availableColors}
        toggleSize={toggleSize}
        toggleColor={toggleColor}
        onReset={reset}
        resultCount={filteredProducts.length}
      />
    </div>
  )
}
