import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { getDiscountPercent, getTotalStock, hasDiscount, isOutOfStock } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { ProductImage } from './ProductImage'
import { HeartIcon } from '@/components/ui/icons'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const outOfStock = isOutOfStock(product)
  const favorite = isFavorite(product.id)

  function handleQuickAdd() {
    if (outOfStock) return
    const defaultSize = product.sizes[0]
    const defaultColor = product.colors[0]?.name ?? 'Único'
    const stockEntry = product.stock.find((s) => s.size === defaultSize && s.color === defaultColor)
    const maxQuantity = stockEntry?.quantity ?? getTotalStock(product)
    if (maxQuantity <= 0) return
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      size: defaultSize,
      color: defaultColor,
      unitPrice: hasDiscount(product) ? (product.promoPrice as number) : product.price,
      originalPrice: product.price,
      quantity: 1,
      maxQuantity,
    })
  }

  return (
    <div className="group relative flex flex-col">
      <Link to={`/produto/${product.slug}`} className="relative block overflow-hidden rounded-2xl bg-brand-50">
        <div className="relative aspect-[3/4] w-full">
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount(product) && <Badge tone="brand">-{getDiscountPercent(product)}%</Badge>}
          {product.isNew && !hasDiscount(product) && <Badge tone="dark">Novo</Badge>}
          {outOfStock && <Badge tone="neutral">Esgotado</Badge>}
        </div>

        <button
          type="button"
          aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={favorite}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleFavorite(product.id, product.name)
          }}
          className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-sm backdrop-blur transition-transform active:scale-90"
        >
          <HeartIcon
            width={18}
            height={18}
            filled={favorite}
            className={cn(favorite && 'text-brand-600 animate-heart-pop')}
          />
        </button>
      </Link>

      <div className="mt-2.5 flex flex-1 flex-col gap-1">
        <Link to={`/produto/${product.slug}`} className="line-clamp-2 min-h-[2.5rem] text-[13.5px] font-medium text-ink-900">
          {product.name}
        </Link>

        <div className="flex items-baseline gap-1.5">
          {hasDiscount(product) ? (
            <>
              <span className="text-base font-bold text-brand-700">{formatCurrency(product.promoPrice as number)}</span>
              <span className="text-xs text-ink-500 line-through">{formatCurrency(product.price)}</span>
            </>
          ) : (
            <span className="text-base font-bold text-ink-900">{formatCurrency(product.price)}</span>
          )}
        </div>

        {product.colors.length > 0 && (
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="h-3.5 w-3.5 rounded-full border border-ink-900/10"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleQuickAdd()
          }}
          disabled={outOfStock}
          className="mt-1 h-9 w-full rounded-full bg-ink-900 text-xs font-semibold text-white transition-colors active:bg-ink-700 disabled:bg-ink-900/15 disabled:text-ink-500"
        >
          {outOfStock ? 'Esgotado' : 'Adicionar'}
        </button>
      </div>
    </div>
  )
}
