import type { ColorOption, Product, Size, SizeGuideRow, StockEntry } from '@/types'

export const ALL_SIZES: Size[] = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'Único']

export interface ProductFormState {
  name: string
  sku: string
  categoryId: string
  description: string
  composition: string
  careInstructions: string
  price: string
  promoPrice: string
  images: string[]
  sizes: Size[]
  colors: ColorOption[]
  stock: StockEntry[]
  sizeGuide: SizeGuideRow[]
  isFeatured: boolean
  isNew: boolean
  isBestSeller: boolean
  isActive: boolean
}

export function emptyProductForm(defaultCategoryId: string): ProductFormState {
  return {
    name: '',
    sku: '',
    categoryId: defaultCategoryId,
    description: '',
    composition: '',
    careInstructions: '',
    price: '',
    promoPrice: '',
    images: [],
    sizes: [],
    colors: [],
    stock: [],
    sizeGuide: [],
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    isActive: true,
  }
}

export function productToFormState(product: Product): ProductFormState {
  return {
    name: product.name,
    sku: product.sku,
    categoryId: product.categoryId,
    description: product.description,
    composition: product.composition,
    careInstructions: product.careInstructions,
    price: String(product.price),
    promoPrice: product.promoPrice ? String(product.promoPrice) : '',
    images: product.images,
    sizes: product.sizes,
    colors: product.colors,
    stock: product.stock,
    sizeGuide: product.sizeGuide,
    isFeatured: product.isFeatured,
    isNew: product.isNew,
    isBestSeller: product.isBestSeller,
    isActive: product.isActive,
  }
}

export function reconcileStock(
  previous: StockEntry[],
  sizes: Size[],
  colors: ColorOption[],
): StockEntry[] {
  const colorNames = colors.length > 0 ? colors.map((c) => c.name) : ['Único']
  const sizeList = sizes.length > 0 ? sizes : (['Único'] as Size[])

  return sizeList.flatMap((size) =>
    colorNames.map((color) => {
      const existing = previous.find((entry) => entry.size === size && entry.color === color)
      return { size, color, quantity: existing?.quantity ?? 0 }
    }),
  )
}

export function reconcileSizeGuide(previous: SizeGuideRow[], sizes: Size[]): SizeGuideRow[] {
  const relevant = sizes.filter((s) => s !== 'Único')
  return relevant.map((size) => {
    const existing = previous.find((row) => row.size === size)
    return existing ?? { size, bust: '', waist: '', hip: '' }
  })
}

export function validateProductForm(form: ProductFormState): Partial<Record<keyof ProductFormState, string>> {
  const errors: Partial<Record<keyof ProductFormState, string>> = {}
  if (!form.name.trim()) errors.name = 'Digite o nome do produto'
  if (!form.categoryId) errors.categoryId = 'Selecione uma categoria'
  if (!form.price || Number(form.price) <= 0) errors.price = 'Informe um preço válido'
  if (form.promoPrice && Number(form.promoPrice) >= Number(form.price)) {
    errors.promoPrice = 'O preço promocional deve ser menor que o preço normal'
  }
  if (form.sizes.length === 0) errors.sizes = 'Selecione pelo menos um tamanho'
  return errors
}
