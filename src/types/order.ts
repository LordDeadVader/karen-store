import type { PaymentMethodId } from './store'

export type OrderStatus =
  | 'novo'
  | 'confirmado'
  | 'pagamento_pendente'
  | 'pago'
  | 'em_preparacao'
  | 'enviado'
  | 'entregue'
  | 'cancelado'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  novo: 'Novo',
  confirmado: 'Confirmado',
  pagamento_pendente: 'Pagamento pendente',
  pago: 'Pago',
  em_preparacao: 'Em preparação',
  enviado: 'Enviado',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
}

export interface OrderItem {
  productId: string
  productName: string
  image: string
  size: string
  color: string
  quantity: number
  unitPrice: number
}

export interface Customer {
  name: string
  phone: string
  email?: string
}

export interface DeliveryInfo {
  method: 'entrega' | 'retirada'
  address?: string
  city?: string
  zipCode?: string
  neighborhood?: string
  number?: string
  complement?: string
}

export interface Order {
  id: string
  code: string
  createdAt: string
  customer: Customer
  items: OrderItem[]
  delivery: DeliveryInfo
  paymentMethod: PaymentMethodId
  subtotal: number
  discount: number
  total: number
  status: OrderStatus
  notes?: string
}
