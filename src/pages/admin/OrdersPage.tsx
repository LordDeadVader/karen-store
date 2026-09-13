import { useEffect, useState } from 'react'
import { useStoreData } from '@/context/StoreDataContext'
import { ordersService } from '@/services/ordersService'
import { ORDER_STATUS_LABELS, type Order, type OrderStatus } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHeader } from '@/components/admin/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { PackageIcon } from '@/components/ui/icons'

const STATUS_OPTIONS = Object.entries(ORDER_STATUS_LABELS) as [OrderStatus, string][]

export function OrdersPage() {
  const { settings } = useStoreData()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useDocumentTitle('Pedidos')

  useEffect(() => {
    ordersService.list().then((data) => {
      setOrders(data)
      setIsLoading(false)
    })
  }, [])

  async function handleStatusChange(id: string, status: OrderStatus) {
    const updated = await ordersService.updateStatus(id, status)
    if (updated) setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)))
  }

  return (
    <div>
      <PageHeader title="Pedidos" description={`${orders.length} pedidos registrados`} />

      {!isLoading && orders.length === 0 ? (
        <EmptyState
          icon={<PackageIcon width={22} height={22} />}
          title="Nenhum pedido ainda"
          description="Os pedidos feitos pelas clientes no checkout aparecerão aqui automaticamente."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-ink-900/8 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-ink-900">{order.code}</p>
                  <p className="text-xs text-ink-500">{new Date(order.createdAt).toLocaleString('pt-BR')}</p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                  className="h-9 rounded-full border border-ink-900/12 bg-white px-3 text-xs font-semibold text-ink-900"
                >
                  {STATUS_OPTIONS.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-ink-500 uppercase">Cliente</p>
                  <p className="text-ink-900">{order.customer.name}</p>
                  <p className="text-ink-500">{order.customer.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink-500 uppercase">Entrega</p>
                  <p className="text-ink-900">
                    {order.delivery.method === 'retirada' ? 'Retirar na loja' : `${order.delivery.address}, ${order.delivery.number} — ${order.delivery.city}`}
                  </p>
                </div>
              </div>

              <div className="mt-3 border-t border-ink-900/6 pt-3">
                <p className="mb-1 text-xs font-semibold text-ink-500 uppercase">Itens</p>
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm text-ink-700">
                    {item.quantity}x {item.productName} ({item.size}, {item.color})
                  </p>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-ink-900/6 pt-3">
                <span className="text-xs text-ink-500">
                  Pagamento: {settings.paymentMethods.find((m) => m.id === order.paymentMethod)?.label ?? order.paymentMethod}
                </span>
                <span className="text-base font-bold text-ink-900">{formatCurrency(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
