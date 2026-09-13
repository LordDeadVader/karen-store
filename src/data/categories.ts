import type { Category } from '@/types'
import { publicUrl } from '@/utils/publicUrl'

/**
 * Dados iniciais de categorias. Editável pela proprietária em /admin/categorias.
 */
const rawSeedCategories: Category[] = [
  { id: 'cat-vestidos', slug: 'vestidos', name: 'Vestidos', image: '/photos/categories/vestidos.jpg', isActive: true, order: 1 },
  { id: 'cat-blusas', slug: 'blusas', name: 'Blusas', image: '/photos/categories/blusas.jpg', isActive: true, order: 2 },
  { id: 'cat-calcas', slug: 'calcas', name: 'Calças', image: '/photos/categories/calcas.jpg', isActive: true, order: 3 },
  { id: 'cat-shorts', slug: 'shorts', name: 'Shorts', image: '/photos/categories/shorts.jpg', isActive: true, order: 4 },
  { id: 'cat-saias', slug: 'saias', name: 'Saias', image: '/photos/categories/saias.jpg', isActive: true, order: 5 },
  { id: 'cat-jeans', slug: 'jeans', name: 'Jeans', image: '/photos/categories/jeans.jpg', isActive: true, order: 6 },
  { id: 'cat-conjuntos', slug: 'conjuntos', name: 'Conjuntos', image: '/photos/categories/conjuntos.jpg', isActive: true, order: 7 },
  { id: 'cat-intima', slug: 'moda-intima', name: 'Moda Íntima', image: '/photos/categories/moda-intima.jpg', isActive: true, order: 8 },
  { id: 'cat-acessorios', slug: 'acessorios', name: 'Acessórios', image: '/photos/categories/acessorios.jpg', isActive: true, order: 9 },
]

export const seedCategories: Category[] = rawSeedCategories.map((category) => ({ ...category, image: publicUrl(category.image) }))
