import { TextArea } from '@/components/ui/FormField'
import type { ProductFormState } from './types'

export function DetailsSection({ form, onChange }: { form: ProductFormState; onChange: (patch: Partial<ProductFormState>) => void }) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-4">
      <h2 className="font-display text-lg font-semibold text-ink-900">Composição e cuidados</h2>
      <TextArea
        label="Composição"
        placeholder="Ex.: 98% Viscose, 2% Elastano"
        rows={2}
        value={form.composition}
        onChange={(e) => onChange({ composition: e.target.value })}
      />
      <TextArea
        label="Como cuidar"
        placeholder="Ex.: Lavar à mão, não usar alvejante..."
        rows={2}
        value={form.careInstructions}
        onChange={(e) => onChange({ careInstructions: e.target.value })}
      />
    </section>
  )
}
