import { useRef, useState } from 'react'
import { useStoreData } from '@/context/StoreDataContext'
import { categoriesService } from '@/services/categoriesService'
import { slugify } from '@/services/productsService'
import type { Category } from '@/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useToast } from '@/context/ToastContext'
import { PageHeader } from '@/components/admin/PageHeader'
import { ToggleSwitch } from '@/components/admin/ToggleSwitch'
import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import { TextInput } from '@/components/ui/FormField'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { ProductImage } from '@/components/product/ProductImage'
import { EditIcon, PlusIcon, TrashIcon } from '@/components/ui/icons'
import { resizeImage } from '@/utils/resizeImage'

const EMPTY_FORM = { name: '', image: '' }

export function CategoriesPage() {
  const { categories, refreshCategories } = useStoreData()
  const { showToast } = useToast()
  useDocumentTitle('Categorias')

  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function openCreate() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setDrawerOpen(true)
  }

  function openEdit(category: Category) {
    setEditing(category)
    setForm({ name: category.name, image: category.image })
    setDrawerOpen(true)
  }

  async function handleImageUpload(files: FileList | null) {
    const file = files?.[0]
    if (!file) return
    try {
      const dataUrl = await resizeImage(file, 1000)
      setForm((f) => ({ ...f, image: dataUrl }))
    } catch {
      showToast('Não foi possível processar essa imagem', 'error')
    }
  }

  async function handleSave() {
    if (!form.name.trim()) {
      showToast('Digite o nome da categoria', 'error')
      return
    }
    try {
      if (editing) {
        await categoriesService.update(editing.id, { name: form.name.trim(), image: form.image })
        showToast('Categoria atualizada')
      } else {
        await categoriesService.create({
          name: form.name.trim(),
          slug: slugify(form.name),
          image: form.image,
          isActive: true,
          order: categories.length + 1,
        })
        showToast('Categoria criada')
      }
      await refreshCategories()
      setDrawerOpen(false)
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível salvar a categoria', 'error')
    }
  }

  async function handleToggle(category: Category) {
    await categoriesService.update(category.id, { isActive: !category.isActive })
    await refreshCategories()
  }

  async function handleDelete() {
    if (!deleteTarget) return
    await categoriesService.remove(deleteTarget.id)
    await refreshCategories()
    setDeleteTarget(null)
    showToast('Categoria excluída')
  }

  return (
    <div>
      <PageHeader
        title="Categorias"
        description="Organize como os produtos aparecem na loja"
        action={
          <Button onClick={openCreate}>
            <PlusIcon width={16} height={16} /> Nova categoria
          </Button>
        }
      />

      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-3 rounded-2xl border border-ink-900/8 bg-white p-3">
            <ProductImage src={category.image} alt={category.name} className="h-14 w-11 shrink-0 rounded-xl" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink-900">{category.name}</p>
              <p className="text-xs text-ink-500">/categoria/{category.slug}</p>
            </div>
            <ToggleSwitch checked={category.isActive} onChange={() => handleToggle(category)} label={`Ativar ${category.name}`} />
            <button
              type="button"
              aria-label={`Editar ${category.name}`}
              onClick={() => openEdit(category)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-ink-900/5"
            >
              <EditIcon width={16} height={16} />
            </button>
            <button
              type="button"
              aria-label={`Excluir ${category.name}`}
              onClick={() => setDeleteTarget(category)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-red-600 hover:bg-red-50"
            >
              <TrashIcon width={16} height={16} />
            </button>
          </div>
        ))}
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? 'Editar categoria' : 'Nova categoria'}
        footer={
          <Button fullWidth onClick={handleSave}>
            Salvar alterações
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <TextInput label="Nome da categoria" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <div>
            <p className="mb-1.5 text-sm font-semibold text-ink-900">Foto da categoria</p>
            {form.image && <ProductImage src={form.image} alt="Prévia" className="mb-2 aspect-[3/4] w-28 rounded-xl" />}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-ink-900/20 px-4 text-sm font-semibold text-ink-700"
            >
              <PlusIcon width={16} height={16} /> Enviar foto
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e.target.files)} />
          </div>
        </div>
      </Drawer>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Excluir esta categoria?"
        description="Produtos dessa categoria não serão excluídos, mas ficarão sem categoria."
        confirmLabel="Excluir"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
