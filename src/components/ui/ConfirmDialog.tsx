import { createPortal } from 'react-dom'
import { Button } from './Button'
import { AlertIcon } from './icons'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4" role="alertdialog" aria-modal="true">
      <div className="animate-fade-in absolute inset-0 bg-ink-900/50" onClick={onCancel} />
      <div className="animate-slide-up relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertIcon width={24} height={24} />
          </div>
          <h3 className="font-display text-lg font-semibold text-ink-900">{title}</h3>
          {description && <p className="text-sm text-ink-500">{description}</p>}
        </div>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" fullWidth onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={danger ? 'danger' : 'primary'} fullWidth onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
