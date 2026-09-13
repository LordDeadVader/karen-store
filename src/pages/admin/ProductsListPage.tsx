import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStoreData } from '@/context/StoreDataContext'
import { productsService } from '@/services/productsService'
import { getTotalStock, hasDiscount } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHeader } from '@/components/admin/PageHeader'
import { ToggleSwitch } from '@/components/admin/ToggleSwitch'
import { Button } from '@/components/ui/Button'
import { ProductImage } from '@/components/product/ProductImage'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { CopyIcon, EditIcon, PlusIcon, SearchIcon, TrashIcon } from '@/components/ui/icons'
import { useToast } from '@/context/ToastContext'

export function ProductsListPage() {
  const { products, categories, refreshProducts } = useStoreData()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [term, setTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('todas')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  useDocumentTitle('Produtos')

  const categoryNameById = useMemo(() => new Map(categories.map((c) => [c.id, c.name])), [categories])

  const filtered = products.filter((product) => {
    if (categoryFilter !== 'todas' && product.categoryId !== categoryFilter) return false
    if (term && !product.name.toLowerCase().includes(term.toLowerCase()) && !product.sku.toLowerCase().includes(term.toLowerCase())) return false
    return true
  })

  async function handleToggleActive(id: string) {
    await productsService.toggleActive(id)
    await refreshProducts()
  }

  async function handleDuplicate(id: string) {
    await productsService.duplicate(id)
    await refreshProducts()
    showToast('Produto duplicado')
  }

  async function handleDelete() {
    if (!deleteTarget) return
    await productsService.remove(deleteTarget)
    await refreshProducts()
    setDeleteTarget(null)
    showToast('Produto excluído')
  }

  return (
    <div>
      <PageHeader
        title="Produtos"
        description={`${products.length} produtos cadastrados`}
        action={
          <Button onClick={() => navigate('/admin/produtos/novo')}>
            <PlusIcon width={16} height={16} /> Novo produto
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-ink-900/12 bg-white px-3.5 py-2.5">
          <SearchIcon width={16} height={16} className="text-ink-500" />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar por nome ou SKU"
            className="flex-1 bg-transparent text-sm text-ink-900 focus:outline-none"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-11 rounded-xl border border-ink-900/12 bg-white px-3 text-sm text-ink-900"
        >
          <option value="todas">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="📦" title="Nenhum produto encontrado" description="Ajuste a busca ou cadastre um novo produto." />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((product) => {
            const stock = getTotalStock(product)
            return (
              <div key={product.id} className="flex flex-col gap-3 rounded-2xl border border-ink-900/8 bg-white p-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-3">
                  <ProductImage src={product.images[0]} alt={product.name} className="h-16 w-14 shrink-0 rounded-xl" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink-900">{product.name}</p>
                    <p className="text-xs text-ink-500">
                      SKU {product.sku} · {categoryNameById.get(product.categoryId) ?? 'Sem categoria'}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      {hasDiscount(product) && <Badge tone="brand">Promoção</Badge>}
                      {product.isNew && <Badge tone="dark">Novidade</Badge>}
                      {product.isBestSeller && <Badge tone="neutral">Mais vendido</Badge>}
                      {stock <= 0 && <Badge tone="danger">Esgotado</Badge>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="text-right">
                    <p className="text-sm font-bold text-ink-900">{formatCurrency(product.promoPrice ?? product.price)}</p>
                    <p className="text-xs text-ink-500">{stock} em estoque</p>
                  </div>

                  <ToggleSwitch checked={product.isActive} onChange={() => handleToggleActive(product.id)} label={`Ativar ${product.name}`} />

                  <div className="flex items-center gap-1">
                    <Link
                      to={`/admin/produtos/${product.id}`}
                      aria-label={`Editar ${product.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-ink-900/5"
                    >
                      <EditIcon width={16} height={16} />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Duplicar ${product.name}`}
                      onClick={() => handleDuplicate(product.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-ink-900/5"
                    >
                      <CopyIcon width={16} height={16} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Excluir ${product.name}`}
                      onClick={() => setDeleteTarget(product.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-red-600 hover:bg-red-50"
                    >
                      <TrashIcon width={16} height={16} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Excluir este produto?"
        description="Essa ação não poderá ser desfeita."
        confirmLabel="Excluir"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
