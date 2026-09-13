export type Size = 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XG' | 'Único'

export interface ColorOption {
  name: string
  hex: string
}

export interface StockEntry {
  size: Size
  color: string
  quantity: number
}

export interface SizeGuideRow {
  size: Size
  bust: string
  waist: string
  hip: string
}

export interface ProductReview {
  rating: number
  count: number
}

export interface Product {
  id: string
  slug: string
  sku: string
  name: string
  description: string
  composition: string
  careInstructions: string
  categoryId: string
  price: number
  promoPrice?: number
  images: string[]
  sizes: Size[]
  colors: ColorOption[]
  stock: StockEntry[]
  sizeGuide: SizeGuideRow[]
  review?: ProductReview
  isFeatured: boolean
  isNew: boolean
  isBestSeller: boolean
  isActive: boolean
  createdAt: string
}

export function getTotalStock(product: Product): number {
  return product.stock.reduce((sum, entry) => sum + entry.quantity, 0)
}

export function getStockFor(product: Product, size: Size, color: string): number {
  const entry = product.stock.find((s) => s.size === size && s.color === color)
  return entry?.quantity ?? 0
}

export function isOutOfStock(product: Product): boolean {
  return getTotalStock(product) <= 0
}

export function hasDiscount(product: Product): boolean {
  return typeof product.promoPrice === 'number' && product.promoPrice < product.price
}

export function getDiscountPercent(product: Product): number {
  if (!hasDiscount(product) || !product.promoPrice) return 0
  return Math.round(((product.price - product.promoPrice) / product.price) * 100)
}

export function getDisplayPrice(product: Product): number {
  return hasDiscount(product) ? (product.promoPrice as number) : product.price
}
