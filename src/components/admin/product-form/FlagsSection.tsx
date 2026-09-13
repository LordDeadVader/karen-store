import type { ProductFormState } from './types'

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-ink-900/10 px-4 py-3">
      <span className="text-sm font-medium text-ink-900">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-ink-900/20 text-brand-600 focus:ring-brand-400"
      />
    </label>
  )
}

export function FlagsSection({ form, onChange }: { form: ProductFormState; onChange: (patch: Partial<ProductFormState>) => void }) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-ink-900/8 bg-white p-4">
      <h2 className="font-display text-lg font-semibold text-ink-900">Destaques</h2>
      <Toggle label="Produto ativo (visível na loja)" checked={form.isActive} onChange={(isActive) => onChange({ isActive })} />
      <Toggle label="Mostrar em destaque" checked={form.isFeatured} onChange={(isFeatured) => onChange({ isFeatured })} />
      <Toggle label="Marcar como novidade" checked={form.isNew} onChange={(isNew) => onChange({ isNew })} />
      <Toggle label="Marcar como mais vendido" checked={form.isBestSeller} onChange={(isBestSeller) => onChange({ isBestSeller })} />
    </section>
  )
}
