import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@/components/ui/icons'

export function SectionHeader({ title, subtitle, viewAllTo }: { title: string; subtitle?: string; viewAllTo?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h2 className="font-display text-xl font-bold text-ink-900 md:text-2xl">{title}</h2>
        {subtitle && <p className="text-sm text-ink-500">{subtitle}</p>}
      </div>
      {viewAllTo && (
        <Link to={viewAllTo} className="flex shrink-0 items-center gap-0.5 text-sm font-semibold text-brand-600">
          Ver tudo <ChevronRightIcon width={16} height={16} />
        </Link>
      )}
    </div>
  )
}
