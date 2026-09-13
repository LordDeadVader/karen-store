import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export function StatCard({
  label,
  value,
  icon,
  tone = 'default',
}: {
  label: string
  value: string | number
  icon?: ReactNode
  tone?: 'default' | 'warning' | 'success'
}) {
  return (
    <div className="rounded-2xl border border-ink-900/8 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wide text-ink-500 uppercase">{label}</p>
        {icon && (
          <span
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full',
              tone === 'default' && 'bg-brand-50 text-brand-600',
              tone === 'warning' && 'bg-amber-50 text-amber-600',
              tone === 'success' && 'bg-emerald-50 text-emerald-600',
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="font-display mt-2 text-3xl font-bold text-ink-900">{value}</p>
    </div>
  )
}
