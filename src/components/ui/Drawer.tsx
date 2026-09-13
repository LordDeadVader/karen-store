import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from './icons'
import { IconButton } from './IconButton'
import { cn } from '@/utils/cn'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  side?: 'bottom' | 'right'
  footer?: ReactNode
}

export function Drawer({ isOpen, onClose, title, children, side = 'bottom', footer }: DrawerProps) {
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label={title}>
      <div className="animate-fade-in absolute inset-0 bg-ink-900/40" onClick={onClose} />
      <div
        className={cn(
          'animate-slide-up relative flex flex-col bg-white shadow-2xl',
          side === 'bottom' && 'safe-bottom mt-auto max-h-[88vh] w-full rounded-t-3xl',
          side === 'right' && 'ml-auto h-full w-full max-w-sm',
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-ink-900/8 px-5 py-4">
          {side === 'bottom' && (
            <div className="absolute top-2 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-ink-900/10" />
          )}
          <h2 className="font-display text-lg font-semibold text-ink-900">{title}</h2>
          <IconButton aria-label="Fechar" onClick={onClose}>
            <CloseIcon width={20} height={20} />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">{children}</div>
        {footer && <div className="safe-bottom shrink-0 border-t border-ink-900/8 px-5 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
