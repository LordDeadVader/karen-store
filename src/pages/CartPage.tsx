import { useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { CartItemRow } from '@/components/cart/CartItemRow'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { CartIcon } from '@/components/ui/icons'
import { formatCurrency } from '@/utils/formatCurrency'

export function CartPage() {
  const { items, subtotal, discount, total } = useCart()
  const navigate = useNavigate()

  useDocumentTitle('Carrinho', 'Revise seus produtos antes de finalizar a compra')

  return (
    <div className="px-4 py-4 pb-40 md:px-6 md:pb-10">
      <h1 className="font-display mb-4 text-2xl font-bold text-ink-900">Seu carrinho</h1>

      {items.length === 0 ? (
        <EmptyState
          icon={<CartIcon width={24} height={24} />}
          title="Seu carrinho está vazio"
          description="Adicione peças que você ama e volte aqui para finalizar sua compra."
          action={<Button onClick={() => navigate('/')}>Continuar comprando</Button>}
        />
      ) : (
        <div className="md:grid md:grid-cols-3 md:gap-8">
          <div className="divide-y divide-ink-900/6 md:col-span-2">
            {items.map((item) => (
              <CartItemRow key={`${item.productId}-${item.size}-${item.color}`} item={item} />
            ))}
          </div>

          <div className="mt-4 h-fit rounded-2xl border border-ink-900/8 p-4 md:mt-0">
            <p className="mb-3 font-display text-lg font-semibold text-ink-900">Resumo</p>
            <div className="flex items-center justify-between text-sm text-ink-500">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="mt-1 flex items-center justify-between text-sm text-emerald-600">
                <span>Descontos</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between border-t border-ink-900/8 pt-2 text-base font-bold text-ink-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Button fullWidth size="lg" className="mt-4" onClick={() => navigate('/checkout')}>
              Finalizar compra
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
