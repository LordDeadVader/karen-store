import type { PaymentMethod, PaymentMethodId } from '@/types'
import { cn } from '@/utils/cn'
import { CreditCardIcon } from '@/components/ui/icons'

export function PaymentStep({
  methods,
  selected,
  onSelect,
  error,
}: {
  methods: PaymentMethod[]
  selected: PaymentMethodId | ''
  onSelect: (id: PaymentMethodId) => void
  error?: string
}) {
  const enabled = methods.filter((m) => m.enabled)

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-xl font-bold text-ink-900">Pagamento</h2>
      <p className="text-sm text-ink-500">
        Esta loja ainda não possui pagamento online integrado — a forma escolhida será combinada diretamente com a
        vendedora após o pedido.
      </p>

      <div className="flex flex-col gap-2.5">
        {enabled.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={cn(
              'flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors',
              selected === method.id ? 'border-brand-600 bg-brand-50' : 'border-ink-900/10',
            )}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-900">
              <CreditCardIcon width={18} height={18} />
            </span>
            <span>
              <p className="text-sm font-semibold text-ink-900">{method.label}</p>
              <p className="text-xs text-ink-500">{method.description}</p>
            </span>
          </button>
        ))}
      </div>
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}
