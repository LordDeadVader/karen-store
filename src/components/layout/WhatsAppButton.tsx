import { useStoreData } from '@/context/StoreDataContext'
import { buildWhatsappLink, isWhatsappConfigured } from '@/services/whatsappService'
import { WhatsAppIcon } from '@/components/ui/icons'

export function WhatsAppButton() {
  const { settings } = useStoreData()

  if (!isWhatsappConfigured(settings.whatsapp)) return null

  return (
    <a
      href={buildWhatsappLink(settings.whatsapp, settings.whatsappDefaultMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-4 bottom-20 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:right-6 md:bottom-6"
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  )
}
