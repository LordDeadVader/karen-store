import { seedCategories } from '@/data/categories'
import type { Category } from '@/types'
import { delay, readStorage, writeStorage } from './storage'

const KEY = 'categories'

function loadAll(): Category[] {
  return readStorage<Category[]>(KEY, seedCategories)
}

function saveAll(categories: Category[]): void {
  const ok = writeStorage(KEY, categories)
  if (!ok) {
    throw new Error('Não foi possível salvar: o armazenamento do navegador está cheio. Tente usar uma foto menor.')
  }
}

export const categoriesService = {
  async list(): Promise<Category[]> {
    return delay([...loadAll()].sort((a, b) => a.order - b.order))
  },

  async listActive(): Promise<Category[]> {
    const all = await this.list()
    return all.filter((c) => c.isActive)
  },

  async getBySlug(slug: string): Promise<Category | undefined> {
    return delay(loadAll().find((c) => c.slug === slug))
  },

  async create(input: Omit<Category, 'id'>): Promise<Category> {
    const categories = loadAll()
    const category: Category = { ...input, id: `cat-${Date.now().toString(36)}` }
    categories.push(category)
    saveAll(categories)
    return delay(category)
  },

  async update(id: string, patch: Partial<Category>): Promise<Category | undefined> {
    const categories = loadAll()
    const idx = categories.findIndex((c) => c.id === id)
    if (idx === -1) return delay(undefined)
    categories[idx] = { ...categories[idx], ...patch }
    saveAll(categories)
    return delay(categories[idx])
  },

  async remove(id: string): Promise<void> {
    saveAll(loadAll().filter((c) => c.id !== id))
    return delay(undefined)
  },
}
