import type { SizeGuideRow } from '@/types'
import { Drawer } from '@/components/ui/Drawer'

export function SizeGuideDrawer({ isOpen, onClose, rows }: { isOpen: boolean; onClose: () => void; rows: SizeGuideRow[] }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Guia de tamanhos">
      <p className="mb-4 text-sm text-ink-500">Medidas aproximadas do corpo, em centímetros.</p>
      <div className="overflow-x-auto rounded-xl border border-ink-900/8">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50 text-xs font-bold tracking-wide text-ink-700 uppercase">
            <tr>
              <th className="px-3 py-2.5">Tamanho</th>
              <th className="px-3 py-2.5">Busto</th>
              <th className="px-3 py-2.5">Cintura</th>
              <th className="px-3 py-2.5">Quadril</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-900/6">
            {rows.map((row) => (
              <tr key={row.size}>
                <td className="px-3 py-2.5 font-semibold text-ink-900">{row.size}</td>
                <td className="px-3 py-2.5 text-ink-700">{row.bust}</td>
                <td className="px-3 py-2.5 text-ink-700">{row.waist}</td>
                <td className="px-3 py-2.5 text-ink-700">{row.hip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Drawer>
  )
}
