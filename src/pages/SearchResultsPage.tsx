import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStoreData } from '@/context/StoreDataContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useDebounce } from '@/hooks/useDebounce'
import { searchProducts } from '@/utils/searchProducts'
import { useProductFilters, countActiveFilters } from '@/hooks/useProductFilters'
import { ProductGrid } from '@/components/product/ProductGrid'
import { FilterDrawer } from '@/components/filters/FilterDrawer'
import { SortSelect } from '@/components/filters/SortSelect'
import { Button } from '@/components/ui/Button'
import { FilterIcon, SearchIcon } from '@/components/ui/icons'

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { products, categories, isLoading } = useStoreData()
  const [term, setTerm] = useState(searchParams.get('q') ?? '')
  const [isFilterOpen, setFilterOpen] = useState(false)
  const debouncedTerm = useDebounce(term, 300)

  useDocumentTitle(term ? `Busca por "${term}"` : 'Buscar produtos', 'Encontre vestidos, blusas, calças e mais na Karen Store')

  useEffect(() => {
    if (debouncedTerm) setSearchParams({ q: debouncedTerm }, { replace: true })
    else setSearchParams({}, { replace: true })
  }, [debouncedTerm, setSearchParams])

  const baseResults = useMemo(
    () => (debouncedTerm.trim().length >= 2 ? searchProducts(products, categories, debouncedTerm) : []),
    [products, categories, debouncedTerm],
  )

  const { filters, setFilters, filteredProducts, availableSizes, availableColors, toggleSize, toggleColor, reset } =
    useProductFilters(baseResults)

  const activeFilterCount = countActiveFilters(filters)
  const isTyping = term !== debouncedTerm

  return (
    <div className="pb-6">
      <div className="border-b border-ink-900/6 px-4 py-4 md:px-6">
        <div className="flex items-center gap-2 rounded-full border border-ink-900/12 bg-ink-900/3 px-4 py-3">
          <SearchIcon width={18} height={18} className="text-ink-500" />
          <input
            autoFocus
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar vestido, blusa, jeans..."
            className="flex-1 bg-transparent text-[15px] text-ink-900 placeholder:text-ink-500/60 focus:outline-none"
          />
        </div>
      </div>

      {debouncedTerm.trim().length >= 2 && !isTyping && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
          <p className="text-sm text-ink-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
          </p>
          <div className="flex items-center gap-2">
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
        </div>
      )}

      <div className="px-4 md:px-6">
        {term.trim().length > 0 && term.trim().length < 2 && (
          <p className="py-10 text-center text-sm text-ink-500">Digite pelo menos 2 letras para buscar.</p>
        )}
        {term.trim().length === 0 && (
          <p className="py-10 text-center text-sm text-ink-500">Digite o que você está procurando, ex.: "vestido rosa".</p>
        )}
        {debouncedTerm.trim().length >= 2 && (
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading || isTyping}
            emptyMessage={`Nenhum resultado para "${debouncedTerm}"`}
            emptyDescription="Tente buscar por outra palavra-chave, categoria ou cor."
          />
        )}
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
