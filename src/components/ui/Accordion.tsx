import { useState, type ReactNode } from 'react'
import { ChevronDownIcon } from './icons'
import { cn } from '@/utils/cn'

export function AccordionItem({ title, children, defaultOpen }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(Boolean(defaultOpen))

  return (
    <div className="border-b border-ink-900/8 py-3.5">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between text-left text-sm font-semibold text-ink-900"
      >
        {title}
        <ChevronDownIcon width={18} height={18} className={cn('transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && <div className="mt-2.5 text-sm leading-relaxed text-ink-700">{children}</div>}
    </div>
  )
}
