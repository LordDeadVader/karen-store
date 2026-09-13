import type { SortOption } from '@/hooks/useProductFilters'

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevantes', label: 'Mais relevantes' },
  { value: 'recentes', label: 'Mais recentes' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'mais-vendidos', label: 'Mais vendidos' },
]

export function SortSelect({ value, onChange }: { value: SortOption; onChange: (value: SortOption) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      aria-label="Ordenar produtos"
      className="h-10 rounded-full border border-ink-900/12 bg-white px-3.5 text-sm font-medium text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-400"
    >
      {OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
