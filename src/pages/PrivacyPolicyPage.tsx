import { useStoreData } from '@/context/StoreDataContext'
import { StaticInfoPage } from '@/components/layout/StaticInfoPage'

export function PrivacyPolicyPage() {
  const { settings } = useStoreData()
  return <StaticInfoPage title="Política de privacidade" content={settings.privacyPolicy} />
}
