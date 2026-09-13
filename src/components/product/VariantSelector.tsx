import type { ColorOption, Product, Size } from '@/types'
import { getStockFor } from '@/types'
import { cn } from '@/utils/cn'

interface VariantSelectorProps {
  product: Product
  selectedSize: Size | ''
  selectedColor: string
  onSelectSize: (size: Size) => void
  onSelectColor: (color: string) => void
  onOpenSizeGuide?: () => void
}

export function VariantSelector({
  product,
  selectedSize,
  selectedColor,
  onSelectSize,
  onSelectColor,
  onOpenSizeGuide,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-col gap-5">
      {product.colors.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-semibold text-ink-900">
            Cor{selectedColor && <span className="font-normal text-ink-500"> — {selectedColor}</span>}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((color: ColorOption) => (
              <button
                key={color.name}
                type="button"
                aria-label={color.name}
                aria-pressed={selectedColor === color.name}
                onClick={() => onSelectColor(color.name)}
                className={cn(
                  'h-10 w-10 rounded-full border-2 transition-transform active:scale-95',
                  selectedColor === color.name ? 'border-brand-600' : 'border-transparent',
                )}
                style={{ boxShadow: `inset 0 0 0 2px white, inset 0 0 0 3px ${color.hex}` }}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-900">
              Tamanho{selectedSize && <span className="font-normal text-ink-500"> — {selectedSize}</span>}
            </p>
            {product.sizeGuide.length > 0 && (
              <button type="button" onClick={onOpenSizeGuide} className="text-xs font-semibold text-brand-600 underline underline-offset-2">
                Guia de tamanhos
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.sizes.map((size) => {
              const stock = selectedColor ? getStockFor(product, size, selectedColor) : 0
              const disabled = selectedColor ? stock <= 0 : false
              return (
                <button
                  key={size}
                  type="button"
                  disabled={disabled}
                  aria-pressed={selectedSize === size}
                  onClick={() => onSelectSize(size)}
                  className={cn(
                    'h-11 min-w-11 rounded-full border px-3.5 text-sm font-semibold transition-colors',
                    selectedSize === size ? 'border-ink-900 bg-ink-900 text-white' : 'border-ink-900/15 text-ink-900',
                    disabled && 'border-ink-900/8 text-ink-500/50 line-through',
                  )}
                >
                  {size}
                </button>
              )
            })}
          </div>
          {selectedColor && !selectedSize && <p className="mt-2 text-xs text-ink-500">Selecione um tamanho disponível</p>}
        </div>
      )}
    </div>
  )
}
