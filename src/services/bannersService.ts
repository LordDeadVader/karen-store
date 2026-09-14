import { seedBanners } from '@/data/banners'
import type { Banner } from '@/types'
import { delay, readStorage, writeStorage } from './storage'

const KEY = 'banners'

function loadAll(): Banner[] {
  return readStorage<Banner[]>(KEY, seedBanners)
}

function saveAll(banners: Banner[]): void {
  const ok = writeStorage(KEY, banners)
  if (!ok) {
    throw new Error('Não foi possível salvar: o armazenamento do navegador está cheio. Tente usar uma foto menor.')
  }
}

export const bannersService = {
  async list(): Promise<Banner[]> {
    return delay([...loadAll()].sort((a, b) => a.order - b.order))
  },

  async listActive(): Promise<Banner[]> {
    const all = await this.list()
    return all.filter((b) => b.isActive)
  },

  async create(input: Omit<Banner, 'id'>): Promise<Banner> {
    const banners = loadAll()
    const banner: Banner = { ...input, id: `banner-${Date.now().toString(36)}` }
    banners.push(banner)
    saveAll(banners)
    return delay(banner)
  },

  async update(id: string, patch: Partial<Banner>): Promise<Banner | undefined> {
    const banners = loadAll()
    const idx = banners.findIndex((b) => b.id === id)
    if (idx === -1) return delay(undefined)
    banners[idx] = { ...banners[idx], ...patch }
    saveAll(banners)
    return delay(banners[idx])
  },

  async remove(id: string): Promise<void> {
    saveAll(loadAll().filter((b) => b.id !== id))
    return delay(undefined)
  },

  async reorder(orderedIds: string[]): Promise<void> {
    const banners = loadAll()
    const withOrder = banners.map((b) => ({ ...b, order: orderedIds.indexOf(b.id) + 1 }))
    saveAll(withOrder)
    return delay(undefined)
  },
}
