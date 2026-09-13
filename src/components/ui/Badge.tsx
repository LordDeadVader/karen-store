import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Tone = 'brand' | 'dark' | 'success' | 'neutral' | 'danger'

export function Badge({ tone = 'brand', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  const toneClasses: Record<Tone, string> = {
    brand: 'bg-brand-600 text-white',
    dark: 'bg-ink-900 text-white',
    success: 'bg-emerald-600 text-white',
    neutral: 'bg-ink-900/8 text-ink-700',
    danger: 'bg-red-600 text-white',
  }

  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase', toneClasses[tone], className)}>
      {children}
    </span>
  )
}
