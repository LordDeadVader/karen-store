import { useStoreData } from '@/context/StoreDataContext'
import { StaticInfoPage } from '@/components/layout/StaticInfoPage'

export function ShippingInfoPage() {
  const { settings } = useStoreData()
  return <StaticInfoPage title="Informações de entrega" content={settings.shippingInfo} />
}
