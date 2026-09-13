import { Link } from 'react-router-dom'
import { Drawer } from '@/components/ui/Drawer'
import { useStoreData } from '@/context/StoreDataContext'
import { HeartIcon, HomeIcon, InstagramIcon, UserIcon, WhatsAppIcon } from '@/components/ui/icons'
import { isWhatsappConfigured, buildWhatsappLink } from '@/services/whatsappService'

export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { categories, settings } = useStoreData()

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Menu" side="right">
      <nav className="flex flex-col gap-1">
        <Link to="/" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-ink-900 hover:bg-brand-50">
          <HomeIcon width={20} height={20} /> Início
        </Link>
        <Link to="/favoritos" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-ink-900 hover:bg-brand-50">
          <HeartIcon width={20} height={20} /> Favoritos
        </Link>

        <p className="mt-4 mb-1 px-3 text-xs font-bold tracking-wide text-ink-500 uppercase">Categorias</p>
        {categories
          .filter((c) => c.isActive)
          .map((category) => (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-ink-900 hover:bg-brand-50"
            >
              <span>{category.icon}</span> {category.name}
            </Link>
          ))}

        <div className="mt-4 flex flex-col gap-2 border-t border-ink-900/8 pt-4">
          {isWhatsappConfigured(settings.whatsapp) && (
            <a
              href={buildWhatsappLink(settings.whatsapp, settings.whatsappDefaultMessage)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
            >
              <WhatsAppIcon width={20} height={20} /> Falar no WhatsApp
            </a>
          )}
          {settings.instagram && settings.instagram !== '[Configure no painel administrativo]' && (
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-ink-900 hover:bg-brand-50"
            >
              <InstagramIcon width={20} height={20} /> Instagram
            </a>
          )}
          <Link
            to="/admin/login"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-ink-500 hover:bg-ink-900/5"
          >
            <UserIcon width={20} height={20} /> Área administrativa
          </Link>
        </div>
      </nav>
    </Drawer>
  )
}
