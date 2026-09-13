export interface OrderMessageVars {
  produto: string
  tamanho: string
  cor: string
  quantidade: number | string
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

export function isWhatsappConfigured(phone: string): boolean {
  return onlyDigits(phone).length >= 10
}

export function buildWhatsappLink(phone: string, message: string): string {
  const digits = onlyDigits(phone)
  const params = new URLSearchParams({ text: message })
  return `https://wa.me/${digits}?${params.toString()}`
}

export function fillOrderMessageTemplate(template: string, vars: OrderMessageVars): string {
  return template
    .replaceAll('{produto}', vars.produto)
    .replaceAll('{tamanho}', vars.tamanho)
    .replaceAll('{cor}', vars.cor)
    .replaceAll('{quantidade}', String(vars.quantidade))
}

interface OrderSummaryInput {
  code: string
  customerName: string
  items: { name: string; size: string; color: string; quantity: number; unitPrice: number }[]
  total: number
  paymentLabel: string
  deliveryLabel: string
}

export function buildOrderSummaryMessage(input: OrderSummaryInput): string {
  const lines = [
    `Olá! Acabei de fazer o pedido ${input.code} no site.`,
    '',
    `Cliente: ${input.customerName}`,
    '',
    'Itens:',
    ...input.items.map(
      (item) => `• ${item.quantity}x ${item.name} (tam. ${item.size}, ${item.color}) — ${formatCurrencyBRL(item.unitPrice * item.quantity)}`,
    ),
    '',
    `Total: ${formatCurrencyBRL(input.total)}`,
    `Entrega: ${input.deliveryLabel}`,
    `Pagamento: ${input.paymentLabel}`,
  ]
  return lines.join('\n')
}

function formatCurrencyBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
