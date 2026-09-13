import type { HomeContent, StoreSettings } from '@/types'

const NOT_CONFIGURED = '[Configure no painel administrativo]'

/**
 * Configuração inicial da loja. Nenhum dado de contato real foi informado
 * até o momento — os campos abaixo ficam com placeholders claros até a
 * proprietária preenchê-los em /admin/configuracoes.
 */
export const seedStoreSettings: StoreSettings = {
  storeName: 'Karen Store',
  tagline: 'Moda feminina online',
  description: 'Você linda, sempre! Roupas femininas com qualidade, variedade de estilos e pagamento acessível.',
  whatsapp: '',
  whatsappConfigured: false,
  whatsappDefaultMessage: 'Olá! Vim pela Karen Store e gostaria de mais informações.',
  whatsappOrderMessageTemplate:
    'Olá! Gostaria de comprar o produto {produto}, tamanho {tamanho}, cor {cor}. Quantidade: {quantidade}.',
  instagram: NOT_CONFIGURED,
  tiktok: NOT_CONFIGURED,
  email: NOT_CONFIGURED,
  address: NOT_CONFIGURED,
  openingHours: NOT_CONFIGURED,
  exchangePolicy:
    'Política de troca a ser configurada pela loja. Em geral, trocas são aceitas em até 7 dias corridos após o recebimento, mediante produto sem uso e com etiqueta.',
  privacyPolicy:
    'Política de privacidade a ser configurada pela loja. Os dados informados no checkout são usados apenas para processar seu pedido.',
  shippingInfo: 'Informações de entrega a serem configuradas pela loja.',
  paymentMethods: [
    { id: 'pix', label: 'Pix', description: 'Pagamento instantâneo', enabled: true },
    { id: 'cartao', label: 'Cartão', description: 'Crédito ou débito', enabled: true },
    { id: 'dinheiro', label: 'Dinheiro', description: 'Pagamento na entrega/retirada', enabled: true },
    { id: 'transferencia', label: 'Transferência', description: 'Transferência bancária', enabled: false },
  ],
}

export const seedHomeContent: HomeContent = {
  hero: {
    title: 'Novidades toda semana pra você arrasar',
    subtitle: 'Roupas femininas com qualidade, variedade de estilos e pagamento acessível.',
    buttonLabel: 'Ver coleção',
  },
  featuredSection: {
    title: 'Mais vendidos',
    subtitle: 'As queridinhas da Karen Store',
  },
  offersSection: {
    title: 'Ofertas especiais',
    subtitle: 'Peças selecionadas com desconto',
  },
  newArrivalsSection: {
    title: 'Novidades',
    subtitle: 'Chegou fresquinho',
  },
  benefits: [
    { icon: '✅', title: 'Produtos de qualidade', description: 'Peças selecionadas com cuidado' },
    { icon: '👗', title: 'Variedade de estilos', description: 'Do casual ao elegante' },
    { icon: '💳', title: 'Pagamento acessível', description: 'Pix, cartão e mais opções' },
  ],
}
