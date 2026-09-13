import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface FieldWrapperProps {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
}

export function FieldWrapper({ label, htmlFor, error, hint, required, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink-900">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-ink-500">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

const controlClasses =
  'h-12 w-full rounded-xl border bg-white px-4 text-[15px] text-ink-900 placeholder:text-ink-500/60 focus:outline-none focus:ring-2 focus:ring-brand-400'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, error, hint, id, required, className, ...props },
  ref,
) {
  const inputId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <FieldWrapper label={label} htmlFor={inputId} error={error} hint={hint} required={required}>
      <input
        ref={ref}
        id={inputId}
        className={cn(controlClasses, error ? 'border-red-400' : 'border-ink-900/12', className)}
        aria-invalid={Boolean(error)}
        required={required}
        {...props}
      />
    </FieldWrapper>
  )
})

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, error, hint, id, required, className, rows = 4, ...props },
  ref,
) {
  const inputId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <FieldWrapper label={label} htmlFor={inputId} error={error} hint={hint} required={required}>
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className={cn(
          'w-full resize-none rounded-xl border bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-500/60 focus:outline-none focus:ring-2 focus:ring-brand-400',
          error ? 'border-red-400' : 'border-ink-900/12',
          className,
        )}
        aria-invalid={Boolean(error)}
        required={required}
        {...props}
      />
    </FieldWrapper>
  )
})

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  hint?: string
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(function SelectInput(
  { label, error, hint, id, required, className, children, ...props },
  ref,
) {
  const inputId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <FieldWrapper label={label} htmlFor={inputId} error={error} hint={hint} required={required}>
      <select
        ref={ref}
        id={inputId}
        className={cn(controlClasses, 'appearance-none bg-no-repeat pr-10', error ? 'border-red-400' : 'border-ink-900/12', className)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23453838'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundPosition: 'right 0.9rem center',
          backgroundSize: '1.1rem',
        }}
        aria-invalid={Boolean(error)}
        required={required}
        {...props}
      >
        {children}
      </select>
    </FieldWrapper>
  )
})
