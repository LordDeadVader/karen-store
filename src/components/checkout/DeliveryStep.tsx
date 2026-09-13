import { TextInput } from '@/components/ui/FormField'
import { cn } from '@/utils/cn'
import type { DeliveryFormData } from './types'

export function DeliveryStep({
  data,
  errors,
  onChange,
}: {
  data: DeliveryFormData
  errors: Partial<Record<keyof DeliveryFormData, string>>
  onChange: (data: DeliveryFormData) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-xl font-bold text-ink-900">Entrega</h2>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange({ ...data, method: 'entrega' })}
          className={cn(
            'rounded-xl border-2 p-4 text-left transition-colors',
            data.method === 'entrega' ? 'border-brand-600 bg-brand-50' : 'border-ink-900/10',
          )}
        >
          <p className="text-sm font-semibold text-ink-900">Receber em casa</p>
          <p className="text-xs text-ink-500">Entrega no seu endereço</p>
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...data, method: 'retirada' })}
          className={cn(
            'rounded-xl border-2 p-4 text-left transition-colors',
            data.method === 'retirada' ? 'border-brand-600 bg-brand-50' : 'border-ink-900/10',
          )}
        >
          <p className="text-sm font-semibold text-ink-900">Retirar na loja</p>
          <p className="text-xs text-ink-500">Combinar retirada</p>
        </button>
      </div>

      {data.method === 'entrega' && (
        <div className="flex flex-col gap-4">
          <TextInput
            label="CEP"
            required
            inputMode="numeric"
            placeholder="00000-000"
            value={data.zipCode}
            error={errors.zipCode}
            onChange={(e) => onChange({ ...data, zipCode: e.target.value })}
          />
          <TextInput
            label="Endereço"
            required
            placeholder="Rua, avenida..."
            value={data.address}
            error={errors.address}
            onChange={(e) => onChange({ ...data, address: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Número"
              required
              value={data.number}
              error={errors.number}
              onChange={(e) => onChange({ ...data, number: e.target.value })}
            />
            <TextInput
              label="Complemento"
              placeholder="opcional"
              value={data.complement}
              onChange={(e) => onChange({ ...data, complement: e.target.value })}
            />
          </div>
          <TextInput
            label="Bairro"
            required
            value={data.neighborhood}
            error={errors.neighborhood}
            onChange={(e) => onChange({ ...data, neighborhood: e.target.value })}
          />
          <TextInput
            label="Cidade"
            required
            value={data.city}
            error={errors.city}
            onChange={(e) => onChange({ ...data, city: e.target.value })}
          />
        </div>
      )}
    </div>
  )
}
