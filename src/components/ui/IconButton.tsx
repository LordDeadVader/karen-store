import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string
  variant?: 'ghost' | 'solid'
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, variant = 'ghost', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-150 active:scale-95',
        variant === 'ghost' && 'text-ink-900 hover:bg-ink-900/5',
        variant === 'solid' && 'bg-white text-ink-900 shadow-sm hover:bg-brand-50',
        className,
      )}
      {...props}
    />
  )
})
