import type { HomeContent, StoreSettings } from '@/types'

/**
 * Configuração inicial da loja. Os dados de contato abaixo são fictícios
 * (placeholders realistas) para a loja não ficar com aparência incompleta —
 * a proprietária deve substituí-los pelos dados reais em /admin/configuracoes.
 */
export const seedStoreSettings: StoreSettings = {
  storeName: 'Karen Store',
  tagline: 'Moda feminina online',
  description: 'Você linda, sempre! Roupas femininas com qualidade, variedade de estilos e pagamento acessível.',
  whatsapp: '11987654321',
  whatsappConfigured: true,
  whatsappDefaultMessage: 'Olá! Vim pela Karen Store e gostaria de mais informações.',
  whatsappOrderMessageTemplate:
    'Olá! Gostaria de comprar o produto {produto}, tamanho {tamanho}, cor {cor}. Quantidade: {quantidade}.',
  instagram: 'https://instagram.com/karenstore.oficial',
  tiktok: 'https://tiktok.com/@karenstore.oficial',
  email: 'contato@karenstore.com.br',
  address: 'Rua das Flores, 245 — Centro, São Paulo - SP',
  openingHours: 'Segunda a sábado, das 9h às 19h',
  exchangePolicy:
    'Aceitamos trocas em até 7 dias corridos após o recebimento, desde que o produto esteja sem uso, com etiqueta e embalagem originais. Para solicitar, entre em contato pelo WhatsApp informando o número do pedido.',
  privacyPolicy:
    'Seus dados são usados apenas para processar seu pedido e entrar em contato quando necessário. Não compartilhamos suas informações com terceiros para fins de marketing.',
  shippingInfo: 'Enviamos para todo o Brasil pelos Correios e transportadoras parceiras. Prazo médio de 5 a 10 dias úteis após a confirmação do pagamento.',
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
    { icon: 'quality', title: 'Produtos de qualidade', description: 'Peças selecionadas com cuidado' },
    { icon: 'variety', title: 'Variedade de estilos', description: 'Do casual ao elegante' },
    { icon: 'payment', title: 'Pagamento acessível', description: 'Pix, cartão e mais opções' },
  ],
}
