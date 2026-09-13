import { useMemo, useState } from 'react'
import type { Product } from '@/types'
import { getDisplayPrice, hasDiscount, isOutOfStock } from '@/types'

export type SortOption = 'relevantes' | 'recentes' | 'menor-preco' | 'maior-preco' | 'mais-vendidos'

export interface ProductFilters {
  sizes: string[]
  colors: string[]
  minPrice: string
  maxPrice: string
  onlyAvailable: boolean
  onlyPromo: boolean
  sort: SortOption
}

export const EMPTY_FILTERS: ProductFilters = {
  sizes: [],
  colors: [],
  minPrice: '',
  maxPrice: '',
  onlyAvailable: false,
  onlyPromo: false,
  sort: 'relevantes',
}

export function countActiveFilters(filters: ProductFilters): number {
  let count = filters.sizes.length + filters.colors.length
  if (filters.minPrice) count += 1
  if (filters.maxPrice) count += 1
  if (filters.onlyAvailable) count += 1
  if (filters.onlyPromo) count += 1
  return count
}

export function useProductFilters(baseProducts: Product[]) {
  const [filters, setFilters] = useState<ProductFilters>(EMPTY_FILTERS)

  const availableSizes = useMemo(() => {
    const set = new Set<string>()
    baseProducts.forEach((p) => p.sizes.forEach((s) => set.add(s)))
    return Array.from(set)
  }, [baseProducts])

  const availableColors = useMemo(() => {
    const map = new Map<string, string>()
    baseProducts.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)))
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }))
  }, [baseProducts])

  const filteredProducts = useMemo(() => {
    let list = baseProducts.filter((product) => {
      if (filters.sizes.length > 0 && !product.sizes.some((s) => filters.sizes.includes(s))) return false
      if (filters.colors.length > 0 && !product.colors.some((c) => filters.colors.includes(c.name))) return false
      if (filters.onlyAvailable && isOutOfStock(product)) return false
      if (filters.onlyPromo && !hasDiscount(product)) return false
      const price = getDisplayPrice(product)
      if (filters.minPrice && price < Number(filters.minPrice)) return false
      if (filters.maxPrice && price > Number(filters.maxPrice)) return false
      return true
    })

    list = [...list].sort((a, b) => {
      switch (filters.sort) {
        case 'menor-preco':
          return getDisplayPrice(a) - getDisplayPrice(b)
        case 'maior-preco':
          return getDisplayPrice(b) - getDisplayPrice(a)
        case 'recentes':
          return a.createdAt < b.createdAt ? 1 : -1
        case 'mais-vendidos':
          return Number(b.isBestSeller) - Number(a.isBestSeller)
        default:
          return 0
      }
    })

    return list
  }, [baseProducts, filters])

  function toggleSize(size: string) {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }))
  }

  function toggleColor(color: string) {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color) ? prev.colors.filter((c) => c !== color) : [...prev.colors, color],
    }))
  }

  function reset() {
    setFilters(EMPTY_FILTERS)
  }

  return {
    filters,
    setFilters,
    filteredProducts,
    availableSizes,
    availableColors,
    toggleSize,
    toggleColor,
    reset,
  }
}
