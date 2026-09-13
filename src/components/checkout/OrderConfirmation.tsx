import { useNavigate } from 'react-router-dom'
import type { Order } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { Button } from '@/components/ui/Button'
import { CheckIcon, WhatsAppIcon } from '@/components/ui/icons'
import { buildOrderSummaryMessage, buildWhatsappLink, isWhatsappConfigured } from '@/services/whatsappService'
import { useStoreData } from '@/context/StoreDataContext'

export function OrderConfirmation({ order }: { order: Order }) {
  const { settings } = useStoreData()
  const navigate = useNavigate()

  const paymentLabel = settings.paymentMethods.find((m) => m.id === order.paymentMethod)?.label ?? order.paymentMethod
  const deliveryLabel = order.delivery.method === 'retirada' ? 'Retirar na loja' : `${order.delivery.address}, ${order.delivery.number} — ${order.delivery.city}`

  const whatsappMessage = buildOrderSummaryMessage({
    code: order.code,
    customerName: order.customer.name,
    items: order.items.map((item) => ({ ...item, name: item.productName })),
    total: order.total,
    paymentLabel,
    deliveryLabel,
  })

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckIcon width={28} height={28} />
      </div>
      <h1 className="font-display text-2xl font-bold text-ink-900">Pedido realizado!</h1>
      <p className="max-w-sm text-sm text-ink-500">
        Seu pedido <strong className="text-ink-900">{order.code}</strong> foi registrado. Total de{' '}
        <strong className="text-ink-900">{formatCurrency(order.total)}</strong>.
      </p>

      {isWhatsappConfigured(settings.whatsapp) && (
        <a
          href={buildWhatsappLink(settings.whatsapp, whatsappMessage)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-emerald-500 px-6 text-sm font-semibold text-white"
        >
          <WhatsAppIcon width={18} height={18} /> Enviar pedido pelo WhatsApp
        </a>
      )}

      <p className="max-w-sm text-xs text-ink-500">
        {isWhatsappConfigured(settings.whatsapp)
          ? 'Envie a mensagem para confirmarmos seu pedido e combinarmos o pagamento e a entrega.'
          : 'A loja ainda não configurou o WhatsApp — em breve entraremos em contato para confirmar seu pedido.'}
      </p>

      <Button variant="outline" onClick={() => navigate('/')} className="mt-2">
        Continuar comprando
      </Button>
    </div>
  )
}
