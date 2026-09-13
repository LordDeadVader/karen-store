import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartItem } from '@/types'
import { readStorage, writeStorage } from '@/services/storage'
import { useToast } from './ToastContext'

const KEY = 'cart'

interface AddToCartInput {
  productId: string
  name: string
  slug: string
  image: string
  size: string
  color: string
  unitPrice: number
  originalPrice: number
  quantity: number
  maxQuantity: number
}

interface CartContextValue {
  items: CartItem[]
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  addItem: (input: AddToCartInput) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateVariant: (
    productId: string,
    size: string,
    color: string,
    next: { size: string; color: string; maxQuantity: number },
  ) => void
  clear: () => void
  subtotal: number
  discount: number
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

function sameVariant(item: CartItem, productId: string, size: string, color: string): boolean {
  return item.productId === productId && item.size === size && item.color === color
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStorage<CartItem[]>(KEY, []))
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    writeStorage(KEY, items)
  }, [items])

  const addItem = (input: AddToCartInput) => {
    setItems((prev) => {
      const existing = prev.find((item) => sameVariant(item, input.productId, input.size, input.color))
      if (existing) {
        const nextQty = Math.min(existing.quantity + input.quantity, input.maxQuantity)
        return prev.map((item) =>
          sameVariant(item, input.productId, input.size, input.color) ? { ...item, quantity: nextQty } : item,
        )
      }
      return [
        ...prev,
        {
          productId: input.productId,
          name: input.name,
          slug: input.slug,
          image: input.image,
          size: input.size,
          color: input.color,
          unitPrice: input.unitPrice,
          originalPrice: input.originalPrice,
          quantity: Math.min(input.quantity, input.maxQuantity),
          maxQuantity: input.maxQuantity,
        },
      ]
    })
    showToast(`${input.name} adicionado ao carrinho`)
    setDrawerOpen(true)
  }

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        sameVariant(item, productId, size, color)
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.maxQuantity)) }
          : item,
      ),
    )
  }

  const removeItem = (productId: string, size: string, color: string) => {
    setItems((prev) => prev.filter((item) => !sameVariant(item, productId, size, color)))
  }

  const updateVariant = (
    productId: string,
    size: string,
    color: string,
    next: { size: string; color: string; maxQuantity: number },
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        sameVariant(item, productId, size, color)
          ? { ...item, size: next.size, color: next.color, maxQuantity: next.maxQuantity, quantity: Math.min(item.quantity, next.maxQuantity) }
          : item,
      ),
    )
  }

  const clear = () => setItems([])

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0), [items])
  const total = useMemo(() => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0), [items])
  const discount = subtotal - total
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        addItem,
        updateQuantity,
        removeItem,
        updateVariant,
        clear,
        subtotal,
        discount,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider')
  return ctx
}
