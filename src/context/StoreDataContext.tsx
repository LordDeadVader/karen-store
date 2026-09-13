import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Banner, Category, HomeContent, Product, StoreSettings } from '@/types'
import { bannersService } from '@/services/bannersService'
import { categoriesService } from '@/services/categoriesService'
import { productsService } from '@/services/productsService'
import { storeService } from '@/services/storeService'
import { seedBanners } from '@/data/banners'
import { seedCategories } from '@/data/categories'
import { seedProducts } from '@/data/products'
import { seedHomeContent, seedStoreSettings } from '@/data/storeSettings'

interface StoreDataContextValue {
  isLoading: boolean
  products: Product[]
  categories: Category[]
  banners: Banner[]
  settings: StoreSettings
  homeContent: HomeContent
  refreshProducts: () => Promise<void>
  refreshCategories: () => Promise<void>
  refreshBanners: () => Promise<void>
  refreshSettings: () => Promise<void>
  refreshHomeContent: () => Promise<void>
  getCategoryById: (id: string) => Category | undefined
}

const StoreDataContext = createContext<StoreDataContextValue | null>(null)

export function StoreDataProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>(seedProducts)
  const [categories, setCategories] = useState<Category[]>(seedCategories)
  const [banners, setBanners] = useState<Banner[]>(seedBanners)
  const [settings, setSettings] = useState<StoreSettings>(seedStoreSettings)
  const [homeContent, setHomeContent] = useState<HomeContent>(seedHomeContent)

  const refreshProducts = useCallback(async () => {
    setProducts(await productsService.list())
  }, [])

  const refreshCategories = useCallback(async () => {
    setCategories(await categoriesService.list())
  }, [])

  const refreshBanners = useCallback(async () => {
    setBanners(await bannersService.list())
  }, [])

  const refreshSettings = useCallback(async () => {
    setSettings(await storeService.getSettings())
  }, [])

  const refreshHomeContent = useCallback(async () => {
    setHomeContent(await storeService.getHomeContent())
  }, [])

  useEffect(() => {
    async function loadAll() {
      setIsLoading(true)
      await Promise.all([
        refreshProducts(),
        refreshCategories(),
        refreshBanners(),
        refreshSettings(),
        refreshHomeContent(),
      ])
      setIsLoading(false)
    }
    loadAll()
  }, [refreshProducts, refreshCategories, refreshBanners, refreshSettings, refreshHomeContent])

  const getCategoryById = useCallback((id: string) => categories.find((c) => c.id === id), [categories])

  const value = useMemo<StoreDataContextValue>(
    () => ({
      isLoading,
      products,
      categories,
      banners,
      settings,
      homeContent,
      refreshProducts,
      refreshCategories,
      refreshBanners,
      refreshSettings,
      refreshHomeContent,
      getCategoryById,
    }),
    [
      isLoading,
      products,
      categories,
      banners,
      settings,
      homeContent,
      refreshProducts,
      refreshCategories,
      refreshBanners,
      refreshSettings,
      refreshHomeContent,
      getCategoryById,
    ],
  )

  return <StoreDataContext.Provider value={value}>{children}</StoreDataContext.Provider>
}

export function useStoreData(): StoreDataContextValue {
  const ctx = useContext(StoreDataContext)
  if (!ctx) throw new Error('useStoreData deve ser usado dentro de StoreDataProvider')
  return ctx
}
