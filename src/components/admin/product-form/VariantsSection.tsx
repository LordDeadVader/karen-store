import { useState } from 'react'
import type { ProductFormState } from './types'
import { ALL_SIZES, reconcileSizeGuide, reconcileStock } from './types'
import { Button } from '@/components/ui/Button'
import { PlusIcon, TrashIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'

interface Props {
  form: ProductFormState
  errors: Partial<Record<keyof ProductFormState, string>>
  onChange: (patch: Partial<ProductFormState>) => void
}

export function VariantsSection({ form, errors, onChange }: Props) {
  const [newColorName, setNewColorName] = useState('')
  const [newColorHex, setNewColorHex] = useState('#df5c85')

  function toggleSize(size: (typeof ALL_SIZES)[number]) {
    const sizes = form.sizes.includes(size) ? form.sizes.filter((s) => s !== size) : [...form.sizes, size]
    onChange({
      sizes,
      stock: reconcileStock(form.stock, sizes, form.colors),
      sizeGuide: reconcileSizeGuide(form.sizeGuide, sizes),
    })
  }

  function addColor() {
    if (!newColorName.trim()) return
    if (form.colors.some((c) => c.name.toLowerCase() === newColorName.trim().toLowerCase())) return
    const colors = [...form.colors, { name: newColorName.trim(), hex: newColorHex }]
    onChange({ colors, stock: reconcileStock(form.stock, form.sizes, colors) })
    setNewColorName('')
  }

  function removeColor(name: string) {
    const colors = form.colors.filter((c) => c.name !== name)
    onChange({ colors, stock: reconcileStock(form.stock, form.sizes, colors) })
  }

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-ink-900/8 bg-white p-4">
      <h2 className="font-display text-lg font-semibold text-ink-900">Tamanhos e cores</h2>

      <div>
        <p className="mb-2 text-sm font-semibold text-ink-900">
          Tamanhos disponíveis <span className="text-brand-600">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={cn(
                'h-10 min-w-10 rounded-full border px-3 text-sm font-medium',
                form.sizes.includes(size) ? 'border-ink-900 bg-ink-900 text-white' : 'border-ink-900/15 text-ink-900',
              )}
            >
              {size}
            </button>
          ))}
        </div>
        {errors.sizes && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.sizes}</p>}
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-ink-900">Cores disponíveis</p>
        <div className="mb-3 flex flex-wrap gap-2">
          {form.colors.map((color) => (
            <span key={color.name} className="flex items-center gap-1.5 rounded-full border border-ink-900/12 py-1.5 pr-1.5 pl-2.5 text-sm">
              <span className="h-3.5 w-3.5 rounded-full border border-ink-900/10" style={{ backgroundColor: color.hex }} />
              {color.name}
              <button
                type="button"
                aria-label={`Remover cor ${color.name}`}
                onClick={() => removeColor(color.name)}
                className="flex h-5 w-5 items-center justify-center rounded-full text-ink-500 hover:bg-ink-900/5"
              >
                <TrashIcon width={12} height={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={newColorHex}
            onChange={(e) => setNewColorHex(e.target.value)}
            className="h-11 w-11 shrink-0 cursor-pointer rounded-lg border border-ink-900/12"
            aria-label="Cor"
          />
          <input
            value={newColorName}
            onChange={(e) => setNewColorName(e.target.value)}
            placeholder="Nome da cor, ex.: Rosa"
            className="h-11 flex-1 rounded-xl border border-ink-900/12 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
          <Button type="button" variant="secondary" size="md" onClick={addColor}>
            <PlusIcon width={16} height={16} /> Adicionar
          </Button>
        </div>
      </div>
    </section>
  )
}
