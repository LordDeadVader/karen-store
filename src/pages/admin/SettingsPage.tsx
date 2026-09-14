import { useRef, useState } from 'react'
import { useStoreData } from '@/context/StoreDataContext'
import { storeService } from '@/services/storeService'
import { useToast } from '@/context/ToastContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import defaultLogo from '@/assets/brand/logo-karen-store.png'
import { PageHeader } from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/Button'
import { TextInput, TextArea } from '@/components/ui/FormField'
import { ToggleSwitch } from '@/components/admin/ToggleSwitch'
import { PlusIcon } from '@/components/ui/icons'
import type { HomeContent, StoreSettings } from '@/types'
import { resizeImage } from '@/utils/resizeImage'

export function SettingsPage() {
  const { settings, homeContent, refreshSettings, refreshHomeContent } = useStoreData()
  const { showToast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useDocumentTitle('Configurações da loja')

  const [form, setForm] = useState<StoreSettings>(settings)
  const [home, setHome] = useState<HomeContent>(homeContent)
  const [isSaving, setIsSaving] = useState(false)

  function updateForm(patch: Partial<StoreSettings>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  function updateHome(patch: Partial<HomeContent>) {
    setHome((prev) => ({ ...prev, ...patch }))
  }

  async function handleLogoUpload(files: FileList | null) {
    const file = files?.[0]
    if (!file) return
    try {
      const dataUrl = await resizeImage(file, 600, 0.9, 'image/png')
      updateForm({ logoOverride: dataUrl })
    } catch {
      showToast('Não foi possível processar essa imagem', 'error')
    }
  }

  async function handleSave() {
    setIsSaving(true)
    try {
      await storeService.updateSettings(form)
      await storeService.updateHomeContent(home)
      await refreshSettings()
      await refreshHomeContent()
      showToast('Configurações salvas')
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível salvar as configurações', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="pb-24">
      <PageHeader title="Configurações" description="Informações que aparecem em toda a loja" />

      <div className="flex flex-col gap-5">
        <section className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-4">
          <h2 className="font-display text-lg font-semibold text-ink-900">Identidade</h2>
          <div className="flex items-center gap-4">
            <img src={form.logoOverride || defaultLogo} alt="Logo atual" className="h-16 w-16 rounded-xl object-contain" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-10 items-center gap-2 rounded-xl border border-dashed border-ink-900/20 px-3.5 text-sm font-semibold text-ink-700"
            >
              <PlusIcon width={16} height={16} /> Trocar logo
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e) => handleLogoUpload(e.target.files)} />
          </div>
          <TextInput label="Nome da loja" value={form.storeName} onChange={(e) => updateForm({ storeName: e.target.value })} />
          <TextInput label="Slogan" value={form.tagline} onChange={(e) => updateForm({ tagline: e.target.value })} />
          <TextArea label="Descrição da loja" rows={2} value={form.description} onChange={(e) => updateForm({ description: e.target.value })} />
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-4">
          <h2 className="font-display text-lg font-semibold text-ink-900">Contato</h2>
          <p className="-mt-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
            Os dados abaixo são de exemplo. Atualize com as informações reais da loja antes de divulgar o site.
          </p>
          <TextInput
            label="WhatsApp"
            hint="Apenas números, com DDD. Ex.: 11999999999"
            placeholder="11999999999"
            value={form.whatsapp}
            onChange={(e) => updateForm({ whatsapp: e.target.value, whatsappConfigured: e.target.value.length >= 10 })}
          />
          <TextArea
            label="Mensagem padrão do WhatsApp"
            rows={2}
            value={form.whatsappDefaultMessage}
            onChange={(e) => updateForm({ whatsappDefaultMessage: e.target.value })}
          />
          <TextArea
            label="Mensagem de pedido rápido"
            hint="Use {produto}, {tamanho}, {cor} e {quantidade}"
            rows={2}
            value={form.whatsappOrderMessageTemplate}
            onChange={(e) => updateForm({ whatsappOrderMessageTemplate: e.target.value })}
          />
          <TextInput label="Instagram" placeholder="https://instagram.com/..." value={form.instagram} onChange={(e) => updateForm({ instagram: e.target.value })} />
          <TextInput label="TikTok" placeholder="https://tiktok.com/@..." value={form.tiktok} onChange={(e) => updateForm({ tiktok: e.target.value })} />
          <TextInput label="E-mail" type="email" value={form.email} onChange={(e) => updateForm({ email: e.target.value })} />
          <TextInput label="Endereço" value={form.address} onChange={(e) => updateForm({ address: e.target.value })} />
          <TextInput label="Horário de atendimento" value={form.openingHours} onChange={(e) => updateForm({ openingHours: e.target.value })} />
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-4">
          <h2 className="font-display text-lg font-semibold text-ink-900">Formas de pagamento</h2>
          {form.paymentMethods.map((method) => (
            <label key={method.id} className="flex items-center justify-between gap-3 rounded-xl border border-ink-900/10 px-4 py-3">
              <span>
                <p className="text-sm font-semibold text-ink-900">{method.label}</p>
                <p className="text-xs text-ink-500">{method.description}</p>
              </span>
              <ToggleSwitch
                checked={method.enabled}
                onChange={(enabled) =>
                  updateForm({
                    paymentMethods: form.paymentMethods.map((m) => (m.id === method.id ? { ...m, enabled } : m)),
                  })
                }
                label={`Ativar ${method.label}`}
              />
            </label>
          ))}
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-4">
          <h2 className="font-display text-lg font-semibold text-ink-900">Políticas e entrega</h2>
          <TextArea label="Política de trocas" rows={3} value={form.exchangePolicy} onChange={(e) => updateForm({ exchangePolicy: e.target.value })} />
          <TextArea label="Política de privacidade" rows={3} value={form.privacyPolicy} onChange={(e) => updateForm({ privacyPolicy: e.target.value })} />
          <TextArea label="Informações de entrega" rows={3} value={form.shippingInfo} onChange={(e) => updateForm({ shippingInfo: e.target.value })} />
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-4">
          <h2 className="font-display text-lg font-semibold text-ink-900">Conteúdo da Home</h2>
          <p className="text-sm text-ink-500">Textos exibidos na página inicial da loja.</p>
          <TextInput label="Título do banner principal" value={home.hero.title} onChange={(e) => updateHome({ hero: { ...home.hero, title: e.target.value } })} />
          <TextInput
            label="Subtítulo do banner principal"
            value={home.hero.subtitle}
            onChange={(e) => updateHome({ hero: { ...home.hero, subtitle: e.target.value } })}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <TextInput
              label="Título — Mais vendidos"
              value={home.featuredSection.title}
              onChange={(e) => updateHome({ featuredSection: { ...home.featuredSection, title: e.target.value } })}
            />
            <TextInput
              label="Título — Ofertas"
              value={home.offersSection.title}
              onChange={(e) => updateHome({ offersSection: { ...home.offersSection, title: e.target.value } })}
            />
            <TextInput
              label="Título — Novidades"
              value={home.newArrivalsSection.title}
              onChange={(e) => updateHome({ newArrivalsSection: { ...home.newArrivalsSection, title: e.target.value } })}
            />
          </div>
        </section>
      </div>

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-ink-900/8 bg-white/95 p-3 backdrop-blur md:static md:mt-6 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <div className="mx-auto max-w-3xl">
          <Button fullWidth onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>
      </div>
    </div>
  )
}
