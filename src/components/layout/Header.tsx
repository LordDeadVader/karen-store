import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import defaultLogo from '@/assets/brand/logo-karen-store.png'
import { useStoreData } from '@/context/StoreDataContext'
import { useCart } from '@/context/CartContext'
import { IconButton } from '@/components/ui/IconButton'
import { CartIcon, MenuIcon, SearchIcon, UserIcon } from '@/components/ui/icons'
import { MobileMenu } from './MobileMenu'
import { SearchOverlay } from '@/components/search/SearchOverlay'

export function Header() {
  const { categories, settings } = useStoreData()
  const { itemCount, openDrawer } = useCart()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink-900/6 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5 lg:gap-4 lg:px-6 lg:py-3">
          <IconButton aria-label="Abrir menu" onClick={() => setMenuOpen(true)} className="lg:hidden">
            <MenuIcon />
          </IconButton>

          <Link to="/" className="flex shrink-0 items-center" aria-label="Karen Store — início">
            <img src={settings.logoOverride || defaultLogo} alt="Karen Store — Moda Feminina Online" className="h-11 w-auto lg:h-14" />
          </Link>

          <nav className="hidden shrink-0 items-center gap-1 lg:flex">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                to={`/categoria/${category.slug}`}
                className="rounded-full px-2.5 py-2 text-sm font-medium whitespace-nowrap text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden min-w-0 flex-1 items-center gap-2 rounded-full border border-ink-900/10 bg-ink-900/3 px-4 py-2.5 text-sm text-ink-500 lg:flex lg:max-w-xs"
          >
            <SearchIcon width={18} height={18} />
            <span className="truncate">Buscar vestido, blusa, jeans...</span>
          </button>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <IconButton aria-label="Buscar" onClick={() => setSearchOpen(true)} className="lg:hidden">
              <SearchIcon />
            </IconButton>
            <div className="hidden lg:block">
              <IconButton aria-label="Minha conta" onClick={() => navigate('/conta')}>
                <UserIcon />
              </IconButton>
            </div>
            <IconButton aria-label={`Carrinho, ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`} onClick={openDrawer} className="relative">
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </IconButton>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setSearchOpen(false)}
        onSubmit={(term) => {
          setSearchOpen(false)
          navigate(`/busca?q=${encodeURIComponent(term)}`)
        }}
      />
    </>
  )
}
