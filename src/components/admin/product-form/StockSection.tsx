import type { ProductFormState } from './types'

export function StockSection({ form, onChange }: { form: ProductFormState; onChange: (patch: Partial<ProductFormState>) => void }) {
  if (form.stock.length === 0) {
    return (
      <section className="rounded-2xl border border-ink-900/8 bg-white p-4">
        <h2 className="font-display text-lg font-semibold text-ink-900">Estoque</h2>
        <p className="mt-2 text-sm text-ink-500">Selecione ao menos um tamanho para configurar o estoque por variação.</p>
      </section>
    )
  }

  function updateQuantity(size: string, color: string, quantity: number) {
    const stock = form.stock.map((entry) =>
      entry.size === size && entry.color === color ? { ...entry, quantity: Math.max(0, quantity) } : entry,
    )
    onChange({ stock })
  }

  return (
    <section className="rounded-2xl border border-ink-900/8 bg-white p-4">
      <h2 className="font-display text-lg font-semibold text-ink-900">Estoque por variação</h2>
      <p className="mb-3 text-sm text-ink-500">Quantidade disponível para cada combinação de tamanho e cor.</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="text-xs font-bold tracking-wide text-ink-500 uppercase">
            <tr>
              <th className="py-1.5 pr-3">Tamanho</th>
              <th className="py-1.5 pr-3">Cor</th>
              <th className="py-1.5">Quantidade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-900/6">
            {form.stock.map((entry) => (
              <tr key={`${entry.size}-${entry.color}`}>
                <td className="py-2 pr-3 font-medium text-ink-900">{entry.size}</td>
                <td className="py-2 pr-3 text-ink-700">{entry.color}</td>
                <td className="py-2">
                  <input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={entry.quantity}
                    onChange={(e) => updateQuantity(entry.size, entry.color, Number(e.target.value))}
                    className="h-10 w-24 rounded-lg border border-ink-900/12 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
