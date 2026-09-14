import { useRef, useState } from 'react'
import type { ProductFormState } from './types'
import { ProductImage } from '@/components/product/ProductImage'
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, TrashIcon } from '@/components/ui/icons'
import { useToast } from '@/context/ToastContext'

export function ImagesSection({ form, onChange }: { form: ProductFormState; onChange: (patch: Partial<ProductFormState>) => void }) {
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showToast } = useToast()

  function addImage(src: string) {
    onChange({ images: [...form.images, src] })
  }

  function removeImage(index: number) {
    onChange({ images: form.images.filter((_, i) => i !== index) })
  }

  function moveImage(index: number, direction: -1 | 1) {
    const next = [...form.images]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange({ images: next })
  }

  function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return
    const validFiles = Array.from(files).filter((file) => {
      if (!file.type.startsWith('image/')) {
        showToast('Selecione apenas arquivos de imagem', 'error')
        return false
      }
      if (file.size > 3 * 1024 * 1024) {
        showToast('Imagem muito grande (máx. 3MB)', 'error')
        return false
      }
      return true
    })
    if (validFiles.length === 0) return
    // Lidas em paralelo e adicionadas em uma única atualização — chamar addImage
    // por arquivo aqui causava condição de corrida: cada leitura assíncrona
    // partia do mesmo form.images "congelado", e a última a terminar
    // sobrescrevia as fotos adicionadas pelas anteriores.
    const dataUrls = await Promise.all(validFiles.map(readFileAsDataUrl))
    onChange({ images: [...form.images, ...dataUrls] })
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-4">
      <h2 className="font-display text-lg font-semibold text-ink-900">Imagens</h2>

      {form.images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {form.images.map((img, i) => (
            <div key={i} className="group relative">
              <ProductImage src={img} alt={`Imagem ${i + 1}`} className="aspect-[3/4] w-full rounded-xl" />
              {i === 0 && <span className="absolute top-1 left-1 rounded-full bg-ink-900 px-1.5 py-0.5 text-[10px] font-bold text-white">Capa</span>}
              <div className="absolute inset-x-0 bottom-1 flex justify-center gap-1">
                <button
                  type="button"
                  aria-label="Mover para a esquerda"
                  onClick={() => moveImage(i, -1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow"
                >
                  <ChevronLeftIcon width={12} height={12} />
                </button>
                <button
                  type="button"
                  aria-label="Remover imagem"
                  onClick={() => removeImage(i)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-red-600 shadow"
                >
                  <TrashIcon width={12} height={12} />
                </button>
                <button
                  type="button"
                  aria-label="Mover para a direita"
                  onClick={() => moveImage(i, 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow"
                >
                  <ChevronRightIcon width={12} height={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-ink-900/20 text-sm font-semibold text-ink-700"
        >
          <PlusIcon width={16} height={16} /> Enviar do celular/computador
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
      </div>

      <div className="flex items-center gap-2">
        <input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="ou cole o link de uma imagem"
          className="h-11 flex-1 rounded-xl border border-ink-900/12 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
        <button
          type="button"
          onClick={() => {
            if (!urlInput.trim()) return
            addImage(urlInput.trim())
            setUrlInput('')
          }}
          className="h-11 shrink-0 rounded-xl bg-ink-900 px-4 text-sm font-semibold text-white"
        >
          Adicionar
        </button>
      </div>
      <p className="text-xs text-ink-500">Sem foto real ainda? Deixe em branco — um espaço reservado será exibido no lugar.</p>
    </section>
  )
}
