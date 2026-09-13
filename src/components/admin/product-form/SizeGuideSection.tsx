import type { ProductFormState } from './types'

export function SizeGuideSection({ form, onChange }: { form: ProductFormState; onChange: (patch: Partial<ProductFormState>) => void }) {
  if (form.sizeGuide.length === 0) return null

  function updateRow(size: string, field: 'bust' | 'waist' | 'hip', value: string) {
    const sizeGuide = form.sizeGuide.map((row) => (row.size === size ? { ...row, [field]: value } : row))
    onChange({ sizeGuide })
  }

  return (
    <section className="rounded-2xl border border-ink-900/8 bg-white p-4">
      <h2 className="font-display text-lg font-semibold text-ink-900">Guia de tamanhos</h2>
      <p className="mb-3 text-sm text-ink-500">Medidas do corpo para cada tamanho (opcional, mas ajuda a cliente a escolher certo).</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="text-xs font-bold tracking-wide text-ink-500 uppercase">
            <tr>
              <th className="py-1.5 pr-3">Tamanho</th>
              <th className="py-1.5 pr-3">Busto</th>
              <th className="py-1.5 pr-3">Cintura</th>
              <th className="py-1.5">Quadril</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-900/6">
            {form.sizeGuide.map((row) => (
              <tr key={row.size}>
                <td className="py-2 pr-3 font-medium text-ink-900">{row.size}</td>
                {(['bust', 'waist', 'hip'] as const).map((field) => (
                  <td key={field} className="py-2 pr-3">
                    <input
                      value={row[field]}
                      onChange={(e) => updateRow(row.size, field, e.target.value)}
                      placeholder="Ex.: 90-94 cm"
                      className="h-10 w-32 rounded-lg border border-ink-900/12 px-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
