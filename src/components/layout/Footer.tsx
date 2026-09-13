import { Link } from 'react-router-dom'
import defaultLogo from '@/assets/brand/logo-karen-store.png'
import { useStoreData } from '@/context/StoreDataContext'
import { InstagramIcon, MapPinIcon, TikTokIcon, WhatsAppIcon } from '@/components/ui/icons'
import { buildWhatsappLink, isWhatsappConfigured } from '@/services/whatsappService'

const PLACEHOLDER = '[Configure no painel administrativo]'

export function Footer() {
  const { settings, categories } = useStoreData()

  return (
    <footer className="mt-10 border-t border-ink-900/8 bg-brand-50/60 pb-24 lg:pb-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-10 md:grid-cols-4 md:px-6">
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <img src={settings.logoOverride || defaultLogo} alt="Karen Store" className="h-14 w-auto" />
          <p className="text-sm text-ink-500">{settings.description}</p>
          <div className="flex items-center gap-2">
            {isWhatsappConfigured(settings.whatsapp) && (
              <a
                href={buildWhatsappLink(settings.whatsapp, settings.whatsappDefaultMessage)}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm"
              >
                <WhatsAppIcon width={18} height={18} />
              </a>
            )}
            {settings.instagram !== PLACEHOLDER && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm"
              >
                <InstagramIcon width={18} height={18} />
              </a>
            )}
            {settings.tiktok !== PLACEHOLDER && (
              <a
                href={settings.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-900 shadow-sm"
              >
                <TikTokIcon width={18} height={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-wide text-ink-500 uppercase">Categorias</p>
          <ul className="flex flex-col gap-2">
            {categories.slice(0, 6).map((category) => (
              <li key={category.id}>
                <Link to={`/categoria/${category.slug}`} className="text-sm text-ink-700 hover:text-brand-700">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-wide text-ink-500 uppercase">Ajuda</p>
          <ul className="flex flex-col gap-2 text-sm text-ink-700">
            <li>
              <Link to="/politica-de-trocas" className="hover:text-brand-700">
                Política de trocas
              </Link>
            </li>
            <li>
              <Link to="/politica-de-privacidade" className="hover:text-brand-700">
                Privacidade
              </Link>
            </li>
            <li>
              <Link to="/entrega" className="hover:text-brand-700">
                Entrega
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-wide text-ink-500 uppercase">Contato</p>
          <ul className="flex flex-col gap-2 text-sm text-ink-700">
            <li>{settings.email !== PLACEHOLDER ? settings.email : <span className="text-ink-500 italic">E-mail: {PLACEHOLDER}</span>}</li>
            <li className="flex items-start gap-1.5">
              <MapPinIcon width={15} height={15} className="mt-0.5 shrink-0 text-ink-500" />
              <span className={settings.address === PLACEHOLDER ? 'text-ink-500 italic' : ''}>{settings.address}</span>
            </li>
            <li className={settings.openingHours === PLACEHOLDER ? 'text-ink-500 italic' : ''}>{settings.openingHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-900/8 px-5 py-4 text-center text-xs text-ink-500 md:px-6">
        © {new Date().getFullYear()} {settings.storeName}. Todos os direitos reservados.
      </div>
    </footer>
  )
}
