import { TextInput } from '@/components/ui/FormField'
import type { CustomerFormData } from './types'

export function CustomerStep({
  data,
  errors,
  onChange,
}: {
  data: CustomerFormData
  errors: Partial<Record<keyof CustomerFormData, string>>
  onChange: (data: CustomerFormData) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-xl font-bold text-ink-900">Seus dados</h2>
      <TextInput
        label="Nome completo"
        required
        placeholder="Ex.: Maria Silva"
        value={data.name}
        error={errors.name}
        onChange={(e) => onChange({ ...data, name: e.target.value })}
      />
      <TextInput
        label="WhatsApp / Telefone"
        required
        type="tel"
        placeholder="(00) 00000-0000"
        value={data.phone}
        error={errors.phone}
        onChange={(e) => onChange({ ...data, phone: e.target.value })}
      />
      <TextInput
        label="E-mail"
        type="email"
        placeholder="opcional"
        hint="Usaremos apenas para te enviar a confirmação do pedido"
        value={data.email}
        error={errors.email}
        onChange={(e) => onChange({ ...data, email: e.target.value })}
      />
    </div>
  )
}
