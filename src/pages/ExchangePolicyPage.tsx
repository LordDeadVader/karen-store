import { useStoreData } from '@/context/StoreDataContext'
import { StaticInfoPage } from '@/components/layout/StaticInfoPage'

export function ExchangePolicyPage() {
  const { settings } = useStoreData()
  return <StaticInfoPage title="Política de trocas" content={settings.exchangePolicy} />
}
