import type { Order, OrderStatus } from '@/types'
import { delay, readStorage, writeStorage } from './storage'

const KEY = 'orders'

function loadAll(): Order[] {
  return readStorage<Order[]>(KEY, [])
}

function saveAll(orders: Order[]): void {
  writeStorage(KEY, orders)
}

function generateOrderCode(sequence: number): string {
  return `KS${String(sequence).padStart(4, '0')}`
}

export const ordersService = {
  async list(): Promise<Order[]> {
    return delay([...loadAll()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)))
  },

  async getById(id: string): Promise<Order | undefined> {
    return delay(loadAll().find((o) => o.id === id))
  },

  async create(input: Omit<Order, 'id' | 'code' | 'createdAt' | 'status'>): Promise<Order> {
    const orders = loadAll()
    const order: Order = {
      ...input,
      id: `order-${Date.now().toString(36)}`,
      code: generateOrderCode(orders.length + 1),
      createdAt: new Date().toISOString(),
      status: 'novo',
    }
    orders.unshift(order)
    saveAll(orders)
    return delay(order)
  },

  async updateStatus(id: string, status: OrderStatus): Promise<Order | undefined> {
    const orders = loadAll()
    const idx = orders.findIndex((o) => o.id === id)
    if (idx === -1) return delay(undefined)
    orders[idx] = { ...orders[idx], status }
    saveAll(orders)
    return delay(orders[idx])
  },
}
