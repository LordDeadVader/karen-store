import type { Banner } from '@/types'
import { publicUrl } from '@/utils/publicUrl'

const rawSeedBanners: Banner[] = [
  {
    id: 'banner-1',
    title: 'Coleção Primavera',
    subtitle: 'Peças leves e florais para os dias quentes',
    image: '/photos/banners/primavera.jpg',
    buttonLabel: 'Ver coleção',
    linkTo: '/categoria/vestidos',
    isActive: true,
    order: 1,
  },
  {
    id: 'banner-2',
    title: 'Novidades toda semana',
    subtitle: 'Peças novas chegando direto pra você',
    image: '/photos/banners/novidades.jpg',
    buttonLabel: 'Ver novidades',
    linkTo: '/categoria/novidades',
    isActive: true,
    order: 2,
  },
  {
    id: 'banner-3',
    title: 'Até 30% OFF',
    subtitle: 'Ofertas especiais por tempo limitado',
    image: '/photos/banners/promocao.jpg',
    buttonLabel: 'Ver ofertas',
    linkTo: '/categoria/promocoes',
    isActive: true,
    order: 3,
  },
]

export const seedBanners: Banner[] = rawSeedBanners.map((banner) => ({ ...banner, image: publicUrl(banner.image) }))
