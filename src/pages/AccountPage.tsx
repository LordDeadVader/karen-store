import { Link } from 'react-router-dom'
import { useStoreData } from '@/context/StoreDataContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { buildWhatsappLink, isWhatsappConfigured } from '@/services/whatsappService'
import { ClockIcon, HeartIcon, MapPinIcon, UserIcon, WhatsAppIcon } from '@/components/ui/icons'

const PLACEHOLDER = '[Configure no painel administrativo]'

export function AccountPage() {
  const { settings } = useStoreData()
  useDocumentTitle('Minha conta', 'Favoritos, pedidos e informações da Karen Store')

  return (
    <div className="px-4 py-4 pb-6 md:px-6">
      <h1 className="font-display mb-4 text-2xl font-bold text-ink-900">Minha conta</h1>

      <div className="flex flex-col gap-3">
        <Link to="/favoritos" className="flex items-center gap-3 rounded-2xl border border-ink-900/8 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <HeartIcon width={18} height={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-900">Meus favoritos</p>
            <p className="text-xs text-ink-500">Produtos que você salvou</p>
          </div>
        </Link>

        {isWhatsappConfigured(settings.whatsapp) && (
          <a
            href={buildWhatsappLink(settings.whatsapp, 'Olá! Gostaria de acompanhar o status do meu pedido.')}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-ink-900/8 p-4"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <WhatsAppIcon width={18} height={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">Acompanhar meu pedido</p>
              <p className="text-xs text-ink-500">Fale direto com a loja pelo WhatsApp</p>
            </div>
          </a>
        )}

        <Link to="/admin/login" className="flex items-center gap-3 rounded-2xl border border-ink-900/8 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/5 text-ink-900">
            <UserIcon width={18} height={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-900">Área administrativa</p>
            <p className="text-xs text-ink-500">Acesso restrito à proprietária da loja</p>
          </div>
        </Link>
      </div>

      <div className="mt-6 rounded-2xl bg-brand-50/60 p-4">
        <p className="mb-2 text-xs font-bold tracking-wide text-ink-500 uppercase">Sobre a {settings.storeName}</p>
        <p className="text-sm text-ink-700">{settings.description}</p>
        <div className="mt-3 flex flex-col gap-1.5 text-sm text-ink-700">
          <p className={`flex items-center gap-1.5 ${settings.address === PLACEHOLDER ? 'text-ink-500 italic' : ''}`}>
            <MapPinIcon width={15} height={15} /> {settings.address}
          </p>
          <p className={`flex items-center gap-1.5 ${settings.openingHours === PLACEHOLDER ? 'text-ink-500 italic' : ''}`}>
            <ClockIcon width={15} height={15} /> {settings.openingHours}
          </p>
        </div>
      </div>
    </div>
  )
}
