import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useStoreData } from '@/context/StoreDataContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ordersService } from '@/services/ordersService'
import type { Order, PaymentMethodId } from '@/types'
import { StepIndicator } from '@/components/checkout/StepIndicator'
import { CustomerStep } from '@/components/checkout/CustomerStep'
import { DeliveryStep } from '@/components/checkout/DeliveryStep'
import { PaymentStep } from '@/components/checkout/PaymentStep'
import { ReviewStep } from '@/components/checkout/ReviewStep'
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { ArrowLeftIcon, CartIcon } from '@/components/ui/icons'
import { EMPTY_CHECKOUT_FORM, validateCustomer, validateDelivery, type CheckoutFormData } from '@/components/checkout/types'

const STEPS = ['dados', 'entrega', 'pagamento', 'revisao'] as const
type Step = (typeof STEPS)[number]
const STEP_LABELS = ['Dados', 'Entrega', 'Pagamento', 'Revisão']

export function CheckoutPage() {
  const { items, total, clear } = useCart()
  const { settings } = useStoreData()
  const navigate = useNavigate()

  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState<CheckoutFormData>(EMPTY_CHECKOUT_FORM)
  const [customerErrors, setCustomerErrors] = useState<ReturnType<typeof validateCustomer>>({})
  const [deliveryErrors, setDeliveryErrors] = useState<ReturnType<typeof validateDelivery>>({})
  const [paymentError, setPaymentError] = useState<string | undefined>()
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useDocumentTitle('Finalizar compra', 'Finalize sua compra na Karen Store')

  const step: Step = STEPS[stepIndex]

  if (completedOrder) {
    return <OrderConfirmation order={completedOrder} />
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<CartIcon width={22} height={22} />}
        title="Seu carrinho está vazio"
        description="Adicione produtos ao carrinho antes de finalizar a compra."
        action={<Button onClick={() => navigate('/')}>Ir às compras</Button>}
      />
    )
  }

  function goNext() {
    if (step === 'dados') {
      const errors = validateCustomer(form.customer)
      setCustomerErrors(errors)
      if (Object.keys(errors).length > 0) return
    }
    if (step === 'entrega') {
      const errors = validateDelivery(form.delivery)
      setDeliveryErrors(errors)
      if (Object.keys(errors).length > 0) return
    }
    if (step === 'pagamento') {
      if (!form.paymentMethod) {
        setPaymentError('Selecione uma forma de pagamento')
        return
      }
      setPaymentError(undefined)
    }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
  }

  function goBack() {
    if (stepIndex === 0) {
      navigate(-1)
      return
    }
    setStepIndex((i) => Math.max(i - 1, 0))
  }

  async function handleConfirm() {
    if (!form.paymentMethod) return
    setIsSubmitting(true)
    try {
      const order = await ordersService.create({
        customer: { name: form.customer.name, phone: form.customer.phone, email: form.customer.email || undefined },
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.name,
          image: item.image,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        delivery:
          form.delivery.method === 'retirada'
            ? { method: 'retirada' }
            : {
                method: 'entrega',
                address: form.delivery.address,
                number: form.delivery.number,
                complement: form.delivery.complement,
                neighborhood: form.delivery.neighborhood,
                city: form.delivery.city,
                zipCode: form.delivery.zipCode,
              },
        paymentMethod: form.paymentMethod as PaymentMethodId,
        subtotal: total,
        discount: 0,
        total,
        notes: form.notes || undefined,
      })
      setCompletedOrder(order)
      clear()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pb-28">
      <div className="flex items-center gap-2 px-4 pt-4 md:px-6">
        <button type="button" onClick={goBack} aria-label="Voltar" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink-900/5">
          <ArrowLeftIcon width={18} height={18} />
        </button>
        <h1 className="font-display text-lg font-bold text-ink-900">Finalizar compra</h1>
      </div>

      <StepIndicator steps={STEP_LABELS} currentIndex={stepIndex} />

      <div className="mx-auto max-w-lg px-4 md:px-6">
        {step === 'dados' && (
          <CustomerStep data={form.customer} errors={customerErrors} onChange={(customer) => setForm((f) => ({ ...f, customer }))} />
        )}
        {step === 'entrega' && (
          <DeliveryStep data={form.delivery} errors={deliveryErrors} onChange={(delivery) => setForm((f) => ({ ...f, delivery }))} />
        )}
        {step === 'pagamento' && (
          <PaymentStep
            methods={settings.paymentMethods}
            selected={form.paymentMethod}
            error={paymentError}
            onSelect={(paymentMethod) => {
              setForm((f) => ({ ...f, paymentMethod }))
              setPaymentError(undefined)
            }}
          />
        )}
        {step === 'revisao' && (
          <ReviewStep
            items={items}
            form={form}
            total={total}
            paymentMethod={settings.paymentMethods.find((m) => m.id === form.paymentMethod)}
            onEditStep={(target) => setStepIndex(STEPS.indexOf(target))}
          />
        )}
      </div>

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-ink-900/8 bg-white/95 p-3 backdrop-blur">
        <div className="mx-auto max-w-lg">
          {step === 'revisao' ? (
            <Button size="lg" fullWidth onClick={handleConfirm} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando pedido...' : 'Confirmar pedido'}
            </Button>
          ) : (
            <Button size="lg" fullWidth onClick={goNext}>
              Continuar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
