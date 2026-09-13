import { useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { Drawer } from '@/components/ui/Drawer'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { CartIcon } from '@/components/ui/icons'
import { formatCurrency } from '@/utils/formatCurrency'
import { CartItemRow } from './CartItemRow'

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, subtotal, discount, total } = useCart()
  const navigate = useNavigate()

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      title={`Seu carrinho${items.length ? ` (${items.length})` : ''}`}
      footer={
        items.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm text-ink-500">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-sm text-emerald-600">
                <span>Descontos</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-base font-bold text-ink-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Button
              fullWidth
              size="lg"
              className="mt-2"
              onClick={() => {
                closeDrawer()
                navigate('/checkout')
              }}
            >
              Finalizar compra
            </Button>
          </div>
        ) : undefined
      }
    >
      {items.length === 0 ? (
        <EmptyState
          icon={<CartIcon width={22} height={22} />}
          title="Seu carrinho está vazio"
          description="Adicione peças que você ama e volte aqui para finalizar sua compra."
          action={
            <Button variant="secondary" onClick={closeDrawer}>
              Continuar comprando
            </Button>
          }
        />
      ) : (
        <div className="divide-y divide-ink-900/6">
          {items.map((item) => (
            <CartItemRow key={`${item.productId}-${item.size}-${item.color}`} item={item} />
          ))}
        </div>
      )}
    </Drawer>
  )
}
