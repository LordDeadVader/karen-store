import { NavLink } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { CartIcon, GridIcon, HomeIcon, SearchIcon, UserIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'

const items = [
  { to: '/', label: 'Início', icon: HomeIcon, end: true },
  { to: '/categorias', label: 'Categorias', icon: GridIcon, end: false },
  { to: '/busca', label: 'Buscar', icon: SearchIcon, end: false },
  { to: '/carrinho', label: 'Carrinho', icon: CartIcon, end: false },
  { to: '/conta', label: 'Conta', icon: UserIcon, end: false },
]

export function BottomNav() {
  const { itemCount } = useCart()

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-ink-900/8 bg-white/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'relative flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10.5px] font-medium transition-colors',
                isActive ? 'text-brand-600' : 'text-ink-500',
              )
            }
          >
            <span className="relative">
              <Icon width={22} height={22} />
              {to === '/carrinho' && itemCount > 0 && (
                <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[9px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </span>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
