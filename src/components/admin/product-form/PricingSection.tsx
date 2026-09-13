import { TextInput } from '@/components/ui/FormField'
import type { ProductFormState } from './types'

interface Props {
  form: ProductFormState
  errors: Partial<Record<keyof ProductFormState, string>>
  onChange: (patch: Partial<ProductFormState>) => void
}

export function PricingSection({ form, errors, onChange }: Props) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-4">
      <h2 className="font-display text-lg font-semibold text-ink-900">Preço</h2>
      <div className="grid grid-cols-2 gap-3">
        <TextInput
          label="Preço"
          required
          type="number"
          inputMode="decimal"
          step="0.01"
          placeholder="0,00"
          value={form.price}
          error={errors.price}
          onChange={(e) => onChange({ price: e.target.value })}
        />
        <TextInput
          label="Preço promocional"
          type="number"
          inputMode="decimal"
          step="0.01"
          placeholder="opcional"
          hint="Preencha para colocar o produto em promoção"
          value={form.promoPrice}
          error={errors.promoPrice}
          onChange={(e) => onChange({ promoPrice: e.target.value })}
        />
      </div>
    </section>
  )
}
