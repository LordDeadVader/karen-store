import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { readStorage, writeStorage } from '@/services/storage'
import { useToast } from './ToastContext'

const KEY = 'favorites'

interface FavoritesContextValue {
  favoriteIds: string[]
  isFavorite: (productId: string) => boolean
  toggleFavorite: (productId: string, productName?: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => readStorage<string[]>(KEY, []))
  const { showToast } = useToast()

  useEffect(() => {
    writeStorage(KEY, favoriteIds)
  }, [favoriteIds])

  const isFavorite = (productId: string) => favoriteIds.includes(productId)

  const toggleFavorite = (productId: string, productName?: string) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast(productName ? `${productName} removido dos favoritos` : 'Removido dos favoritos', 'info')
        return prev.filter((id) => id !== productId)
      }
      showToast(productName ? `${productName} adicionado aos favoritos` : 'Adicionado aos favoritos')
      return [...prev, productId]
    })
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites deve ser usado dentro de FavoritesProvider')
  return ctx
}
