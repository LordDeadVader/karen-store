import type { Category, Product } from '@/types'

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

export function searchProducts(products: Product[], categories: Category[], term: string): Product[] {
  const query = normalize(term).trim()
  if (!query) return []

  const categoryNameById = new Map(categories.map((c) => [c.id, normalize(c.name)]))

  return products.filter((product) => {
    if (!product.isActive) return false
    const haystack = [
      product.name,
      product.description,
      categoryNameById.get(product.categoryId) ?? '',
      ...product.colors.map((c) => c.name),
      product.sku,
    ]
      .map(normalize)
      .join(' ')
    return haystack.includes(query)
  })
}
