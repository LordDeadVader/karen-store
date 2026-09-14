import { useRef, useState } from 'react'
import { useStoreData } from '@/context/StoreDataContext'
import { bannersService } from '@/services/bannersService'
import type { Banner } from '@/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useToast } from '@/context/ToastContext'
import { PageHeader } from '@/components/admin/PageHeader'
import { ToggleSwitch } from '@/components/admin/ToggleSwitch'
import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import { TextInput } from '@/components/ui/FormField'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { ProductImage } from '@/components/product/ProductImage'
import { ChevronDownIcon, EditIcon, PlusIcon, TrashIcon } from '@/components/ui/icons'
import { resizeImage } from '@/utils/resizeImage'

const EMPTY_FORM = { title: '', subtitle: '', image: '', buttonLabel: 'Ver mais', linkTo: '/' }

export function BannersPage() {
  const { banners, refreshBanners } = useStoreData()
  const { showToast } = useToast()
  useDocumentTitle('Banners')

  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Banner | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function openCreate() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setDrawerOpen(true)
  }

  function openEdit(banner: Banner) {
    setEditing(banner)
    setForm({ title: banner.title, subtitle: banner.subtitle, image: banner.image, buttonLabel: banner.buttonLabel, linkTo: banner.linkTo })
    setDrawerOpen(true)
  }

  async function handleFile(files: FileList | null) {
    const file = files?.[0]
    if (!file) return
    try {
      const dataUrl = await resizeImage(file, 1600)
      setForm((f) => ({ ...f, image: dataUrl }))
    } catch {
      showToast('Não foi possível processar essa imagem', 'error')
    }
  }

  async function handleSave() {
    if (!form.title.trim()) {
      showToast('Digite o título do banner', 'error')
      return
    }
    try {
      if (editing) {
        await bannersService.update(editing.id, form)
        showToast('Banner atualizado')
      } else {
        await bannersService.create({ ...form, isActive: true, order: banners.length + 1 })
        showToast('Banner criado')
      }
      await refreshBanners()
      setDrawerOpen(false)
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível salvar o banner', 'error')
    }
  }

  async function handleToggle(banner: Banner) {
    await bannersService.update(banner.id, { isActive: !banner.isActive })
    await refreshBanners()
  }

  async function handleMove(banner: Banner, direction: -1 | 1) {
    const sorted = [...banners].sort((a, b) => a.order - b.order)
    const index = sorted.findIndex((b) => b.id === banner.id)
    const target = index + direction
    if (target < 0 || target >= sorted.length) return
    ;[sorted[index], sorted[target]] = [sorted[target], sorted[index]]
    await bannersService.reorder(sorted.map((b) => b.id))
    await refreshBanners()
  }

  async function handleDelete() {
    if (!deleteTarget) return
    await bannersService.remove(deleteTarget.id)
    await refreshBanners()
    setDeleteTarget(null)
    showToast('Banner excluído')
  }

  const sortedBanners = [...banners].sort((a, b) => a.order - b.order)

  return (
    <div>
      <PageHeader
        title="Banners"
        description="Controle os destaques da página inicial"
        action={
          <Button onClick={openCreate}>
            <PlusIcon width={16} height={16} /> Novo banner
          </Button>
        }
      />

      <div className="flex flex-col gap-3">
        {sortedBanners.map((banner, i) => (
          <div key={banner.id} className="flex flex-col gap-3 rounded-2xl border border-ink-900/8 bg-white p-3 sm:flex-row sm:items-center">
            <ProductImage src={banner.image} alt={banner.title} className="h-24 w-full rounded-xl sm:h-16 sm:w-28" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink-900">{banner.title}</p>
              <p className="text-xs text-ink-500">{banner.subtitle}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Mover para cima"
                disabled={i === 0}
                onClick={() => handleMove(banner, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-700 hover:bg-ink-900/5 disabled:opacity-30"
              >
                <ChevronDownIcon width={16} height={16} className="rotate-180" />
              </button>
              <button
                type="button"
                aria-label="Mover para baixo"
                disabled={i === sortedBanners.length - 1}
                onClick={() => handleMove(banner, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-700 hover:bg-ink-900/5 disabled:opacity-30"
              >
                <ChevronDownIcon width={16} height={16} />
              </button>
              <ToggleSwitch checked={banner.isActive} onChange={() => handleToggle(banner)} label={`Ativar banner ${banner.title}`} />
              <button
                type="button"
                aria-label={`Editar ${banner.title}`}
                onClick={() => openEdit(banner)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-ink-900/5"
              >
                <EditIcon width={16} height={16} />
              </button>
              <button
                type="button"
                aria-label={`Excluir ${banner.title}`}
                onClick={() => setDeleteTarget(banner)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-red-600 hover:bg-red-50"
              >
                <TrashIcon width={16} height={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? 'Editar banner' : 'Novo banner'}
        footer={
          <Button fullWidth onClick={handleSave}>
            Salvar alterações
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          {form.image && <ProductImage src={form.image} alt="Prévia" className="aspect-video w-full rounded-xl" />}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-ink-900/20 text-sm font-semibold text-ink-700"
          >
            <PlusIcon width={16} height={16} /> Enviar imagem
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files)} />
          <TextInput label="Título" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <TextInput label="Subtítulo" value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} />
          <TextInput label="Texto do botão" value={form.buttonLabel} onChange={(e) => setForm((f) => ({ ...f, buttonLabel: e.target.value }))} />
          <TextInput
            label="Destino do botão"
            hint="Ex.: /categoria/vestidos"
            value={form.linkTo}
            onChange={(e) => setForm((f) => ({ ...f, linkTo: e.target.value }))}
          />
        </div>
      </Drawer>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Excluir este banner?"
        description="Essa ação não poderá ser desfeita."
        confirmLabel="Excluir"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
