import { Drawer } from '@/components/ui/Drawer'
import { Button } from '@/components/ui/Button'
import type { ProductFilters } from '@/hooks/useProductFilters'
import { cn } from '@/utils/cn'

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: ProductFilters
  setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>
  availableSizes: string[]
  availableColors: { name: string; hex: string }[]
  toggleSize: (size: string) => void
  toggleColor: (color: string) => void
  onReset: () => void
  resultCount: number
}

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  setFilters,
  availableSizes,
  availableColors,
  toggleSize,
  toggleColor,
  onReset,
  resultCount,
}: FilterDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Filtrar produtos"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" fullWidth onClick={onReset}>
            Limpar
          </Button>
          <Button fullWidth onClick={onClose}>
            Ver {resultCount} {resultCount === 1 ? 'produto' : 'produtos'}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {availableSizes.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-semibold text-ink-900">Tamanho</p>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={cn(
                    'h-10 min-w-10 rounded-full border px-3 text-sm font-medium',
                    filters.sizes.includes(size) ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-900/12 text-ink-900',
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {availableColors.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-semibold text-ink-900">Cor</p>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => toggleColor(color.name)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium',
                    filters.colors.includes(color.name) ? 'border-brand-600 bg-brand-50' : 'border-ink-900/12',
                  )}
                >
                  <span className="h-3.5 w-3.5 rounded-full border border-ink-900/10" style={{ backgroundColor: color.hex }} />
                  {color.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="mb-2 text-sm font-semibold text-ink-900">Faixa de preço</p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              inputMode="decimal"
              placeholder="Mín."
              value={filters.minPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
              className="h-11 w-full rounded-xl border border-ink-900/12 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <span className="text-ink-500">até</span>
            <input
              type="number"
              inputMode="decimal"
              placeholder="Máx."
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
              className="h-11 w-full rounded-xl border border-ink-900/12 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2.5 text-sm font-medium text-ink-900">
            <input
              type="checkbox"
              checked={filters.onlyAvailable}
              onChange={(e) => setFilters((prev) => ({ ...prev, onlyAvailable: e.target.checked }))}
              className="h-5 w-5 rounded border-ink-900/20 text-brand-600 focus:ring-brand-400"
            />
            Apenas disponíveis em estoque
          </label>
          <label className="flex items-center gap-2.5 text-sm font-medium text-ink-900">
            <input
              type="checkbox"
              checked={filters.onlyPromo}
              onChange={(e) => setFilters((prev) => ({ ...prev, onlyPromo: e.target.checked }))}
              className="h-5 w-5 rounded border-ink-900/20 text-brand-600 focus:ring-brand-400"
            />
            Apenas promoções
          </label>
        </div>
      </div>
    </Drawer>
  )
}
