import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStoreData } from '@/context/StoreDataContext'
import { ordersService } from '@/services/ordersService'
import { getTotalStock, hasDiscount, ORDER_STATUS_LABELS, type Order } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHeader } from '@/components/admin/PageHeader'
import { StatCard } from '@/components/admin/StatCard'
import { PackageIcon, TruckIcon } from '@/components/ui/icons'

export function DashboardPage() {
  const { products } = useStoreData()
  const [orders, setOrders] = useState<Order[]>([])

  useDocumentTitle('Painel administrativo')

  useEffect(() => {
    ordersService.list().then(setOrders)
  }, [])

  const activeProducts = products.filter((p) => p.isActive)
  const outOfStock = products.filter((p) => getTotalStock(p) <= 0)
  const onPromo = products.filter(hasDiscount)
  const revenue = orders.reduce((sum, order) => sum + order.total, 0)
  const recentOrders = orders.slice(0, 5)

  return (
    <div>
      <PageHeader title="Painel" description="Resumo geral da sua loja" />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Produtos" value={products.length} icon={<PackageIcon width={16} height={16} />} />
        <StatCard label="Em estoque" value={activeProducts.length - outOfStock.length} tone="success" icon={<PackageIcon width={16} height={16} />} />
        <StatCard label="Esgotados" value={outOfStock.length} tone="warning" icon={<PackageIcon width={16} height={16} />} />
        <StatCard label="Em promoção" value={onPromo.length} icon={<PackageIcon width={16} height={16} />} />
        <StatCard label="Pedidos" value={orders.length} icon={<TruckIcon width={16} height={16} />} />
        <StatCard label="Faturamento" value={formatCurrency(revenue)} tone="success" icon={<TruckIcon width={16} height={16} />} />
      </div>

      <div className="mt-8 rounded-2xl border border-ink-900/8 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-lg font-semibold text-ink-900">Últimos pedidos</p>
          <Link to="/admin/pedidos" className="text-sm font-semibold text-brand-600">
            Ver todos
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="py-6 text-center text-sm text-ink-500">Nenhum pedido registrado ainda.</p>
        ) : (
          <div className="divide-y divide-ink-900/6">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-semibold text-ink-900">{order.code}</p>
                  <p className="text-ink-500">{order.customer.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-ink-900">{formatCurrency(order.total)}</p>
                  <p className="text-xs text-ink-500">{ORDER_STATUS_LABELS[order.status]}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {outOfStock.length > 0 && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-800">{outOfStock.length} produto(s) esgotado(s)</p>
          <p className="text-xs text-amber-700">Considere repor o estoque ou desativar esses produtos.</p>
        </div>
      )}
    </div>
  )
}
