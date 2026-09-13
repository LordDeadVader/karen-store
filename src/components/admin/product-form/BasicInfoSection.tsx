import type { Category } from '@/types'
import { TextInput, TextArea, SelectInput } from '@/components/ui/FormField'
import type { ProductFormState } from './types'

interface Props {
  form: ProductFormState
  errors: Partial<Record<keyof ProductFormState, string>>
  categories: Category[]
  onChange: (patch: Partial<ProductFormState>) => void
}

export function BasicInfoSection({ form, errors, categories, onChange }: Props) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-4">
      <h2 className="font-display text-lg font-semibold text-ink-900">Informações básicas</h2>
      <TextInput
        label="Nome do produto"
        required
        placeholder="Ex.: Vestido Elegance Midi"
        value={form.name}
        error={errors.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />
      <SelectInput label="Categoria" required value={form.categoryId} error={errors.categoryId} onChange={(e) => onChange({ categoryId: e.target.value })}>
        <option value="">Selecione</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </SelectInput>
      <TextInput
        label="SKU / Código"
        hint="Código interno para identificar o produto"
        placeholder="Ex.: VEST-001"
        value={form.sku}
        onChange={(e) => onChange({ sku: e.target.value })}
      />
      <TextArea
        label="Descrição"
        placeholder="Conte sobre o tecido, caimento e ocasião de uso..."
        value={form.description}
        onChange={(e) => onChange({ description: e.target.value })}
      />
    </section>
  )
}
