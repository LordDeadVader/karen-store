import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStoreData } from '@/context/StoreDataContext'
import { useToast } from '@/context/ToastContext'
import { productsService, slugify } from '@/services/productsService'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHeader } from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/Button'
import { ArrowLeftIcon } from '@/components/ui/icons'
import { BasicInfoSection } from '@/components/admin/product-form/BasicInfoSection'
import { PricingSection } from '@/components/admin/product-form/PricingSection'
import { VariantsSection } from '@/components/admin/product-form/VariantsSection'
import { StockSection } from '@/components/admin/product-form/StockSection'
import { ImagesSection } from '@/components/admin/product-form/ImagesSection'
import { FlagsSection } from '@/components/admin/product-form/FlagsSection'
import { SizeGuideSection } from '@/components/admin/product-form/SizeGuideSection'
import { DetailsSection } from '@/components/admin/product-form/DetailsSection'
import { emptyProductForm, productToFormState, validateProductForm, type ProductFormState } from '@/components/admin/product-form/types'

export function ProductFormPage() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const { categories, refreshProducts } = useStoreData()
  const { showToast } = useToast()

  const [form, setForm] = useState<ProductFormState>(() => emptyProductForm(categories[0]?.id ?? ''))
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormState, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useDocumentTitle(isEditing ? 'Editar produto' : 'Novo produto')

  useEffect(() => {
    if (!id) return
    productsService.getById(id).then((product) => {
      if (!product) {
        setNotFound(true)
        return
      }
      setForm(productToFormState(product))
    })
  }, [id])

  function updateForm(patch: Partial<ProductFormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  async function handleSubmit() {
    const validationErrors = validateProductForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      showToast('Revise os campos destacados', 'error')
      return
    }

    setIsSubmitting(true)
    const payload = {
      name: form.name.trim(),
      slug: slugify(form.name),
      sku: form.sku.trim() || slugify(form.name).toUpperCase(),
      description: form.description.trim(),
      composition: form.composition.trim(),
      careInstructions: form.careInstructions.trim(),
      categoryId: form.categoryId,
      price: Number(form.price),
      promoPrice: form.promoPrice ? Number(form.promoPrice) : undefined,
      images: form.images,
      sizes: form.sizes,
      colors: form.colors,
      stock: form.stock,
      sizeGuide: form.sizeGuide,
      isFeatured: form.isFeatured,
      isNew: form.isNew,
      isBestSeller: form.isBestSeller,
      isActive: form.isActive,
    }

    try {
      if (isEditing && id) {
        await productsService.update(id, payload)
        showToast('Produto atualizado')
      } else {
        await productsService.create(payload)
        showToast('Produto cadastrado')
      }
      await refreshProducts()
      navigate('/admin/produtos')
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível salvar o produto', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (notFound) {
    return (
      <div>
        <p className="text-sm text-ink-500">Produto não encontrado.</p>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/admin/produtos')}>
          Voltar para produtos
        </Button>
      </div>
    )
  }

  return (
    <div className="pb-24">
      <div className="mb-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate('/admin/produtos')}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink-900/5"
          aria-label="Voltar"
        >
          <ArrowLeftIcon width={18} height={18} />
        </button>
        <PageHeader title={isEditing ? 'Editar produto' : 'Novo produto'} description="Preencha as informações do produto" />
      </div>

      <div className="flex flex-col gap-5">
        <BasicInfoSection form={form} errors={errors} categories={categories} onChange={updateForm} />
        <PricingSection form={form} errors={errors} onChange={updateForm} />
        <ImagesSection form={form} onChange={updateForm} />
        <VariantsSection form={form} errors={errors} onChange={updateForm} />
        <StockSection form={form} onChange={updateForm} />
        <SizeGuideSection form={form} onChange={updateForm} />
        <DetailsSection form={form} onChange={updateForm} />
        <FlagsSection form={form} onChange={updateForm} />
      </div>

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-ink-900/8 bg-white/95 p-3 backdrop-blur md:static md:mt-6 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <div className="mx-auto flex max-w-3xl gap-3">
          <Button variant="outline" fullWidth onClick={() => navigate('/admin/produtos')}>
            Cancelar
          </Button>
          <Button fullWidth onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>
      </div>
    </div>
  )
}
