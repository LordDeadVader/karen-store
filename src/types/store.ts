export type PaymentMethodId = 'pix' | 'cartao' | 'dinheiro' | 'transferencia'

export interface PaymentMethod {
  id: PaymentMethodId
  label: string
  description: string
  enabled: boolean
}

export interface StoreSettings {
  storeName: string
  tagline: string
  description: string
  /** Sobrescreve a logo padrão do projeto quando a proprietária envia uma nova pelo painel. */
  logoOverride?: string
  whatsapp: string
  whatsappConfigured: boolean
  whatsappDefaultMessage: string
  whatsappOrderMessageTemplate: string
  instagram: string
  tiktok: string
  email: string
  address: string
  openingHours: string
  exchangePolicy: string
  privacyPolicy: string
  shippingInfo: string
  paymentMethods: PaymentMethod[]
}

export interface HomeHeroContent {
  title: string
  subtitle: string
  buttonLabel: string
}

export interface HomeSectionContent {
  title: string
  subtitle: string
}

export interface HomeContent {
  hero: HomeHeroContent
  featuredSection: HomeSectionContent
  offersSection: HomeSectionContent
  newArrivalsSection: HomeSectionContent
  benefits: { icon: string; title: string; description: string }[]
}
