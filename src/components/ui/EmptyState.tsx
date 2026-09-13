import type { ReactNode } from 'react'

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-400">{icon}</div>
      )}
      <p className="font-display text-lg font-semibold text-ink-900">{title}</p>
      {description && <p className="max-w-xs text-sm text-ink-500">{description}</p>}
      {action}
    </div>
  )
}
