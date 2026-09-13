import { useEffect, useMemo, useState } from 'react'
import { Drawer } from '@/components/ui/Drawer'
import { useStoreData } from '@/context/StoreDataContext'
import { useDebounce } from '@/hooks/useDebounce'
import { searchProducts } from '@/utils/searchProducts'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { SearchIcon } from '@/components/ui/icons'

const SUGGESTIONS = ['Vestido', 'Blusa', 'Jeans', 'Saia', 'Conjunto', 'Rosa', 'Preto', 'Promoção']

export function SearchOverlay({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (term: string) => void
}) {
  const { products, categories } = useStoreData()
  const [term, setTerm] = useState('')
  const debouncedTerm = useDebounce(term, 250)

  useEffect(() => {
    if (!isOpen) setTerm('')
  }, [isOpen])

  const results = useMemo(() => {
    if (debouncedTerm.trim().length < 2) return []
    return searchProducts(products, categories, debouncedTerm).slice(0, 6)
  }, [products, categories, debouncedTerm])

  const isSearching = term !== debouncedTerm && term.trim().length >= 2

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Buscar produtos">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (term.trim()) onSubmit(term.trim())
        }}
        className="flex items-center gap-2 rounded-full border border-ink-900/12 bg-ink-900/3 px-4 py-3"
      >
        <SearchIcon width={18} height={18} className="text-ink-500" />
        <input
          autoFocus
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Ex.: vestido, blusa, jeans, rosa..."
          className="flex-1 bg-transparent text-[15px] text-ink-900 placeholder:text-ink-500/60 focus:outline-none"
        />
      </form>

      {term.trim().length === 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold tracking-wide text-ink-500 uppercase">Buscas populares</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTerm(s)}
                className="rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-700"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {term.trim().length > 0 && term.trim().length < 2 && (
        <p className="mt-6 text-center text-sm text-ink-500">Digite pelo menos 2 letras para buscar.</p>
      )}

      {isSearching && <p className="mt-6 text-center text-sm text-ink-500">Buscando...</p>}

      {!isSearching && debouncedTerm.trim().length >= 2 && results.length === 0 && (
        <p className="mt-6 text-center text-sm text-ink-500">
          Nenhum resultado para <strong>&ldquo;{debouncedTerm}&rdquo;</strong>.
        </p>
      )}

      {!isSearching && results.length > 0 && (
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3">
            {results.map((product) => (
              <div key={product.id} onClick={onClose}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <Button variant="secondary" fullWidth className="mt-5" onClick={() => onSubmit(debouncedTerm)}>
            Ver todos os resultados
          </Button>
        </div>
      )}
    </Drawer>
  )
}
