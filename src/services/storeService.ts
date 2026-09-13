import { seedHomeContent, seedStoreSettings } from '@/data/storeSettings'
import type { HomeContent, StoreSettings } from '@/types'
import { delay, readStorage, writeStorage } from './storage'

const SETTINGS_KEY = 'store-settings'
const HOME_KEY = 'home-content'

export const storeService = {
  async getSettings(): Promise<StoreSettings> {
    return delay(readStorage<StoreSettings>(SETTINGS_KEY, seedStoreSettings))
  },

  async updateSettings(patch: Partial<StoreSettings>): Promise<StoreSettings> {
    const current = readStorage<StoreSettings>(SETTINGS_KEY, seedStoreSettings)
    const updated: StoreSettings = { ...current, ...patch }
    writeStorage(SETTINGS_KEY, updated)
    return delay(updated)
  },

  async getHomeContent(): Promise<HomeContent> {
    return delay(readStorage<HomeContent>(HOME_KEY, seedHomeContent))
  },

  async updateHomeContent(patch: Partial<HomeContent>): Promise<HomeContent> {
    const current = readStorage<HomeContent>(HOME_KEY, seedHomeContent)
    const updated: HomeContent = { ...current, ...patch }
    writeStorage(HOME_KEY, updated)
    return delay(updated)
  },
}
