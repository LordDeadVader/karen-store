import { seedProducts } from '@/data/products'
import type { Product } from '@/types'
import { delay, readStorage, writeStorage } from './storage'

const KEY = 'products'

function loadAll(): Product[] {
  return readStorage<Product[]>(KEY, seedProducts)
}

function saveAll(products: Product[]): void {
  const ok = writeStorage(KEY, products)
  if (!ok) {
    throw new Error(
      'Não foi possível salvar: o armazenamento do navegador está cheio. Tente usar fotos menores ou remova alguma imagem.',
    )
  }
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function generateId(name: string): string {
  return `prod-${slugify(name)}-${Date.now().toString(36)}`
}

export const productsService = {
  async list(): Promise<Product[]> {
    return delay(loadAll())
  },

  async listActive(): Promise<Product[]> {
    return delay(loadAll().filter((p) => p.isActive))
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    return delay(loadAll().find((p) => p.slug === slug))
  },

  async getById(id: string): Promise<Product | undefined> {
    return delay(loadAll().find((p) => p.id === id))
  },

  async create(input: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const products = loadAll()
    const product: Product = {
      ...input,
      id: generateId(input.name),
      createdAt: new Date().toISOString(),
    }
    products.unshift(product)
    saveAll(products)
    return delay(product)
  },

  async update(id: string, patch: Partial<Product>): Promise<Product | undefined> {
    const products = loadAll()
    const idx = products.findIndex((p) => p.id === id)
    if (idx === -1) return delay(undefined)
    products[idx] = { ...products[idx], ...patch }
    saveAll(products)
    return delay(products[idx])
  },

  async duplicate(id: string): Promise<Product | undefined> {
    const products = loadAll()
    const original = products.find((p) => p.id === id)
    if (!original) return delay(undefined)
    const copy: Product = {
      ...original,
      id: generateId(original.name + '-copia'),
      name: `${original.name} (cópia)`,
      slug: `${original.slug}-copia-${Date.now().toString(36)}`,
      sku: `${original.sku}-COPY`,
      isActive: false,
      createdAt: new Date().toISOString(),
    }
    products.unshift(copy)
    saveAll(products)
    return delay(copy)
  },

  async remove(id: string): Promise<void> {
    const products = loadAll().filter((p) => p.id !== id)
    saveAll(products)
    return delay(undefined)
  },

  async toggleActive(id: string): Promise<Product | undefined> {
    const products = loadAll()
    const idx = products.findIndex((p) => p.id === id)
    if (idx === -1) return delay(undefined)
    products[idx] = { ...products[idx], isActive: !products[idx].isActive }
    saveAll(products)
    return delay(products[idx])
  },

  async resetToSeed(): Promise<void> {
    saveAll(seedProducts)
    return delay(undefined)
  },
}
