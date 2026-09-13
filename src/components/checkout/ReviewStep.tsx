import type { CartItem, PaymentMethod } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import type { CheckoutFormData } from './types'

export function ReviewStep({
  items,
  form,
  total,
  paymentMethod,
  onEditStep,
}: {
  items: CartItem[]
  form: CheckoutFormData
  total: number
  paymentMethod?: PaymentMethod
  onEditStep: (step: 'dados' | 'entrega' | 'pagamento') => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display text-xl font-bold text-ink-900">Revisar pedido</h2>

      <section className="rounded-xl border border-ink-900/8 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-ink-900">Itens ({items.length})</p>
        </div>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-sm text-ink-700">
              <span>
                {item.quantity}x {item.name} ({item.size}, {item.color})
              </span>
              <span className="font-medium">{formatCurrency(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-ink-900/8 pt-3 text-base font-bold text-ink-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </section>

      <section className="flex items-center justify-between rounded-xl border border-ink-900/8 p-4">
        <div>
          <p className="text-sm font-semibold text-ink-900">Cliente</p>
          <p className="text-sm text-ink-700">{form.customer.name}</p>
          <p className="text-sm text-ink-500">{form.customer.phone}</p>
        </div>
        <button type="button" onClick={() => onEditStep('dados')} className="text-xs font-semibold text-brand-600">
          Editar
        </button>
      </section>

      <section className="flex items-center justify-between rounded-xl border border-ink-900/8 p-4">
        <div>
          <p className="text-sm font-semibold text-ink-900">Entrega</p>
          {form.delivery.method === 'retirada' ? (
            <p className="text-sm text-ink-700">Retirar na loja</p>
          ) : (
            <p className="text-sm text-ink-700">
              {form.delivery.address}, {form.delivery.number} — {form.delivery.neighborhood}, {form.delivery.city}
            </p>
          )}
        </div>
        <button type="button" onClick={() => onEditStep('entrega')} className="text-xs font-semibold text-brand-600">
          Editar
        </button>
      </section>

      <section className="flex items-center justify-between rounded-xl border border-ink-900/8 p-4">
        <div>
          <p className="text-sm font-semibold text-ink-900">Pagamento</p>
          <p className="text-sm text-ink-700">{paymentMethod?.label}</p>
        </div>
        <button type="button" onClick={() => onEditStep('pagamento')} className="text-xs font-semibold text-brand-600">
          Editar
        </button>
      </section>
    </div>
  )
}
