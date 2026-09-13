import type { CartItem } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { useCart } from '@/context/CartContext'
import { ProductImage } from '@/components/product/ProductImage'
import { IconButton } from '@/components/ui/IconButton'
import { MinusIcon, PlusIcon, TrashIcon } from '@/components/ui/icons'

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-3 py-3">
      <ProductImage src={item.image} alt={item.name} className="h-20 w-16 shrink-0 rounded-xl" />

      <div className="flex flex-1 flex-col gap-1">
        <p className="line-clamp-2 text-sm font-medium text-ink-900">{item.name}</p>
        <p className="text-xs text-ink-500">
          Tam. {item.size} · {item.color}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-ink-900">{formatCurrency(item.unitPrice)}</span>
            {item.unitPrice < item.originalPrice && (
              <span className="text-xs text-ink-500 line-through">{formatCurrency(item.originalPrice)}</span>
            )}
          </div>

          <div className="flex items-center gap-1 rounded-full border border-ink-900/10 px-1">
            <IconButton
              aria-label="Diminuir quantidade"
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="h-8 w-8"
            >
              <MinusIcon width={14} height={14} />
            </IconButton>
            <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
            <IconButton
              aria-label="Aumentar quantidade"
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
              disabled={item.quantity >= item.maxQuantity}
              className="h-8 w-8"
            >
              <PlusIcon width={14} height={14} />
            </IconButton>
          </div>
        </div>
        {item.quantity >= item.maxQuantity && (
          <p className="text-[11px] font-medium text-brand-600">Máximo em estoque para esta variação</p>
        )}
      </div>

      <IconButton
        aria-label={`Remover ${item.name} do carrinho`}
        onClick={() => removeItem(item.productId, item.size, item.color)}
        className="h-8 w-8 self-start text-ink-500"
      >
        <TrashIcon width={16} height={16} />
      </IconButton>
    </div>
  )
}
