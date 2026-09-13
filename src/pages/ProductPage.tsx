import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStoreData } from '@/context/StoreDataContext'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import type { Size } from '@/types'
import { getDiscountPercent, getStockFor, hasDiscount, isOutOfStock } from '@/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { formatCurrency } from '@/utils/formatCurrency'
import { ProductGallery } from '@/components/product/ProductGallery'
import { VariantSelector } from '@/components/product/VariantSelector'
import { SizeGuideDrawer } from '@/components/product/SizeGuideTable'
import { RatingStars } from '@/components/ui/RatingStars'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { AccordionItem } from '@/components/ui/Accordion'
import { EmptyState } from '@/components/ui/EmptyState'
import { ProductGrid } from '@/components/product/ProductGrid'
import { SectionHeader } from '@/components/home/SectionHeader'
import { AlertIcon, ArrowLeftIcon, CreditCardIcon, HeartIcon, MinusIcon, PlusIcon, ShieldCheckIcon, TruckIcon } from '@/components/ui/icons'

export function ProductPage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const { products, categories, settings } = useStoreData()
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()

  const product = products.find((p) => p.slug === slug && p.isActive)

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? '')
  const [selectedSize, setSelectedSize] = useState<Size | ''>('')
  const [quantity, setQuantity] = useState(1)
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false)

  useDocumentTitle(product?.name ?? 'Produto', product?.description)

  const related = useMemo(() => {
    if (!product) return []
    return products.filter((p) => p.isActive && p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4)
  }, [products, product])

  if (!product) {
    return (
      <EmptyState
        icon={<AlertIcon width={22} height={22} />}
        title="Produto não encontrado"
        description="Esse produto pode ter sido removido ou o link está incorreto."
        action={
          <Button variant="secondary" onClick={() => navigate('/')}>
            Voltar para a loja
          </Button>
        }
      />
    )
  }

  const category = categories.find((c) => c.id === product.categoryId)
  const outOfStock = isOutOfStock(product)
  const maxQuantity = selectedColor && selectedSize ? getStockFor(product, selectedSize, selectedColor) : 0
  const favorite = isFavorite(product.id)
  const unitPrice = hasDiscount(product) ? (product.promoPrice as number) : product.price

  function handleAddToCart() {
    if (!product) return
    if (!selectedColor && product.colors.length > 0) {
      showToast('Selecione uma cor', 'error')
      return
    }
    if (!selectedSize) {
      showToast('Selecione um tamanho', 'error')
      return
    }
    if (maxQuantity <= 0) {
      showToast('Essa variação está esgotada', 'error')
      return
    }
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor || 'Único',
      unitPrice,
      originalPrice: product.price,
      quantity,
      maxQuantity,
    })
    setQuantity(1)
  }

  return (
    <div className="relative pb-28 lg:pb-10">
      <div className="hidden items-center gap-1.5 px-4 pt-4 text-xs text-ink-500 md:flex md:px-6">
        <Link to="/" className="hover:text-brand-700">
          Início
        </Link>
        {category && (
          <>
            <span>/</span>
            <Link to={`/categoria/${category.slug}`} className="hover:text-brand-700">
              {category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-ink-900">{product.name}</span>
      </div>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute top-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-sm md:hidden"
        aria-label="Voltar"
      >
        <ArrowLeftIcon width={18} height={18} />
      </button>

      <div className="md:mx-auto md:grid md:max-w-6xl md:grid-cols-2 md:gap-10 md:px-6 md:py-6">
        <ProductGallery images={product.images} name={product.name} />

        <div className="px-4 pt-5 md:px-0 md:pt-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              {category && <p className="text-xs font-semibold text-brand-600 uppercase">{category.name}</p>}
              <h1 className="font-display mt-0.5 text-2xl font-bold text-ink-900">{product.name}</h1>
            </div>
            <button
              type="button"
              aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              onClick={() => toggleFavorite(product.id, product.name)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-900/10 text-ink-900"
            >
              <HeartIcon width={20} height={20} filled={favorite} className={favorite ? 'text-brand-600' : ''} />
            </button>
          </div>

          {product.review && <div className="mt-2"><RatingStars rating={product.review.rating} count={product.review.count} /></div>}

          <div className="mt-3 flex items-center gap-2">
            {hasDiscount(product) ? (
              <>
                <span className="font-display text-3xl font-bold text-brand-700">{formatCurrency(product.promoPrice as number)}</span>
                <span className="text-base text-ink-500 line-through">{formatCurrency(product.price)}</span>
                <Badge tone="brand">-{getDiscountPercent(product)}%</Badge>
              </>
            ) : (
              <span className="font-display text-3xl font-bold text-ink-900">{formatCurrency(product.price)}</span>
            )}
          </div>
          <p className="mt-1 text-xs text-ink-500">
            ou em até 3x de {formatCurrency(unitPrice / 3)} sem juros
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {settings.paymentMethods.filter((m) => m.enabled).map((method) => (
              <span key={method.id} className="flex items-center gap-1.5 rounded-full bg-ink-900/5 px-3 py-1.5 text-xs font-medium text-ink-700">
                <CreditCardIcon width={14} height={14} /> {method.label}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <VariantSelector
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onSelectSize={setSelectedSize}
              onSelectColor={(color) => {
                setSelectedColor(color)
                setSelectedSize('')
              }}
              onOpenSizeGuide={() => setSizeGuideOpen(true)}
            />
          </div>

          {!outOfStock ? (
            <div className="mt-5 flex items-center gap-4">
              <span className="text-sm font-semibold text-ink-900">Quantidade</span>
              <div className="flex items-center gap-3 rounded-full border border-ink-900/12 px-2 py-1">
                <button
                  type="button"
                  aria-label="Diminuir quantidade"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-900 active:bg-ink-900/5"
                >
                  <MinusIcon width={14} height={14} />
                </button>
                <span className="w-5 text-center text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={() => setQuantity((q) => Math.min(q + 1, maxQuantity || 99))}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-900 active:bg-ink-900/5"
                >
                  <PlusIcon width={14} height={14} />
                </button>
              </div>
              {selectedColor && selectedSize && (
                <span className="text-xs text-ink-500">{maxQuantity > 0 ? `${maxQuantity} em estoque` : 'Esgotado nessa variação'}</span>
              )}
            </div>
          ) : (
            <p className="mt-5 text-sm font-semibold text-red-600">Produto esgotado</p>
          )}

          <div className="mt-6 hidden lg:block">
            <Button size="lg" fullWidth disabled={outOfStock} onClick={handleAddToCart}>
              {outOfStock ? 'Produto esgotado' : 'Adicionar ao carrinho'}
            </Button>
          </div>

          <div className="mt-6 flex flex-col gap-2 rounded-2xl bg-brand-50/70 p-4 text-xs text-ink-700">
            <div className="flex items-center gap-2">
              <TruckIcon width={16} height={16} /> {settings.shippingInfo}
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon width={16} height={16} /> Compra segura e protegida
            </div>
          </div>

          <div className="mt-6">
            <AccordionItem title="Descrição" defaultOpen>
              {product.description}
            </AccordionItem>
            {product.sizeGuide.length > 0 && (
              <AccordionItem title="Medidas">
                <button type="button" onClick={() => setSizeGuideOpen(true)} className="font-semibold text-brand-600 underline underline-offset-2">
                  Ver guia de tamanhos completo
                </button>
              </AccordionItem>
            )}
            <AccordionItem title="Composição">{product.composition}</AccordionItem>
            <AccordionItem title="Como cuidar">{product.careInstructions}</AccordionItem>
            <AccordionItem title="Trocas e devoluções">{settings.exchangePolicy}</AccordionItem>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8 px-4 md:px-6">
          <SectionHeader title="Você também pode gostar" />
          <ProductGrid products={related} />
        </section>
      )}

      <SizeGuideDrawer isOpen={isSizeGuideOpen} onClose={() => setSizeGuideOpen(false)} rows={product.sizeGuide} />

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-ink-900/8 bg-white/95 p-3 backdrop-blur lg:hidden">
        <Button size="lg" fullWidth disabled={outOfStock} onClick={handleAddToCart}>
          {outOfStock ? 'Produto esgotado' : `Adicionar — ${formatCurrency(unitPrice * quantity)}`}
        </Button>
      </div>
    </div>
  )
}
