import type { PaymentMethodId } from '@/types'

export interface CustomerFormData {
  name: string
  phone: string
  email: string
}

export interface DeliveryFormData {
  method: 'entrega' | 'retirada'
  zipCode: string
  address: string
  number: string
  complement: string
  neighborhood: string
  city: string
}

export interface CheckoutFormData {
  customer: CustomerFormData
  delivery: DeliveryFormData
  paymentMethod: PaymentMethodId | ''
  notes: string
}

export const EMPTY_CHECKOUT_FORM: CheckoutFormData = {
  customer: { name: '', phone: '', email: '' },
  delivery: { method: 'entrega', zipCode: '', address: '', number: '', complement: '', neighborhood: '', city: '' },
  paymentMethod: '',
  notes: '',
}

export function validateCustomer(data: CustomerFormData): Partial<Record<keyof CustomerFormData, string>> {
  const errors: Partial<Record<keyof CustomerFormData, string>> = {}
  if (!data.name.trim()) errors.name = 'Digite seu nome completo'
  if (!data.phone.trim()) errors.phone = 'Digite um telefone para contato'
  else if (data.phone.replace(/\D/g, '').length < 10) errors.phone = 'Telefone inválido'
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'E-mail inválido'
  return errors
}

export function validateDelivery(data: DeliveryFormData): Partial<Record<keyof DeliveryFormData, string>> {
  const errors: Partial<Record<keyof DeliveryFormData, string>> = {}
  if (data.method === 'retirada') return errors
  if (!data.zipCode.trim()) errors.zipCode = 'Informe o CEP'
  if (!data.address.trim()) errors.address = 'Informe o endereço'
  if (!data.number.trim()) errors.number = 'Informe o número'
  if (!data.neighborhood.trim()) errors.neighborhood = 'Informe o bairro'
  if (!data.city.trim()) errors.city = 'Informe a cidade'
  return errors
}
