import type { Category } from '@/types'

/**
 * Dados iniciais de categorias. Editável pela proprietária em /admin/categorias.
 */
export const seedCategories: Category[] = [
  { id: 'cat-vestidos', slug: 'vestidos', name: 'Vestidos', icon: '👗', isActive: true, order: 1 },
  { id: 'cat-blusas', slug: 'blusas', name: 'Blusas', icon: '👚', isActive: true, order: 2 },
  { id: 'cat-calcas', slug: 'calcas', name: 'Calças', icon: '👖', isActive: true, order: 3 },
  { id: 'cat-shorts', slug: 'shorts', name: 'Shorts', icon: '🩳', isActive: true, order: 4 },
  { id: 'cat-saias', slug: 'saias', name: 'Saias', icon: '🎀', isActive: true, order: 5 },
  { id: 'cat-jeans', slug: 'jeans', name: 'Jeans', icon: '👖', isActive: true, order: 6 },
  { id: 'cat-conjuntos', slug: 'conjuntos', name: 'Conjuntos', icon: '✨', isActive: true, order: 7 },
  { id: 'cat-intima', slug: 'moda-intima', name: 'Moda Íntima', icon: '🎗️', isActive: true, order: 8 },
  { id: 'cat-acessorios', slug: 'acessorios', name: 'Acessórios', icon: '👜', isActive: true, order: 9 },
]
