import { useState } from 'react'
import { Link, Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
import defaultLogo from '@/assets/brand/logo-karen-store.png'
import { useAuth } from '@/context/AuthContext'
import { useStoreData } from '@/context/StoreDataContext'
import { IconButton } from '@/components/ui/IconButton'
import { Drawer } from '@/components/ui/Drawer'
import {
  DashboardIcon,
  GridIcon,
  LogOutIcon,
  MenuIcon,
  PackageIcon,
  SettingsIcon,
  UserIcon,
} from '@/components/ui/icons'
import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  { to: '/admin', label: 'Painel', icon: DashboardIcon, end: true },
  { to: '/admin/produtos', label: 'Produtos', icon: PackageIcon, end: false },
  { to: '/admin/categorias', label: 'Categorias', icon: GridIcon, end: false },
  { to: '/admin/banners', label: 'Banners', icon: GridIcon, end: false },
  { to: '/admin/pedidos', label: 'Pedidos', icon: PackageIcon, end: false },
  { to: '/admin/configuracoes', label: 'Configurações', icon: SettingsIcon, end: false },
]

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors',
              isActive ? 'bg-brand-600 text-white' : 'text-ink-700 hover:bg-brand-50',
            )
          }
        >
          <Icon width={19} height={19} /> {label}
        </NavLink>
      ))}
    </nav>
  )
}

export function AdminLayout() {
  const { isAuthenticated, logout } = useAuth()
  const { settings } = useStoreData()
  const location = useLocation()
  const [isMenuOpen, setMenuOpen] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return (
    <div className="flex min-h-screen bg-brand-50/30">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-ink-900/8 bg-white p-4 md:flex">
        <Link to="/admin" className="mb-6 flex items-center px-1">
          <img src={settings.logoOverride || defaultLogo} alt="Karen Store" className="h-12 w-auto" />
        </Link>
        <NavItems />
        <div className="mt-auto flex flex-col gap-1 border-t border-ink-900/8 pt-4">
          <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-ink-700 hover:bg-brand-50">
            <UserIcon width={19} height={19} /> Ver loja
          </Link>
          <button type="button" onClick={logout} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50">
            <LogOutIcon width={19} height={19} /> Sair
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-ink-900/8 bg-white px-4 py-3 md:hidden">
          <IconButton aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </IconButton>
          <img src={settings.logoOverride || defaultLogo} alt="Karen Store" className="h-9 w-auto" />
          <span className="ml-auto text-xs font-semibold tracking-wide text-ink-500 uppercase">Admin</span>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      <Drawer isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} title="Menu administrativo" side="right">
        <NavItems onNavigate={() => setMenuOpen(false)} />
        <div className="mt-6 flex flex-col gap-1 border-t border-ink-900/8 pt-4">
          <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-ink-700 hover:bg-brand-50">
            <UserIcon width={19} height={19} /> Ver loja
          </Link>
          <button type="button" onClick={logout} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50">
            <LogOutIcon width={19} height={19} /> Sair
          </button>
        </div>
      </Drawer>
    </div>
  )
}
