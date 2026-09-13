import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CartDrawer } from '@/components/cart/CartDrawer'

export function PublicLayout() {
  const { pathname } = useLocation()
  const isDistractionFree = pathname.startsWith('/checkout')

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {!isDistractionFree && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isDistractionFree && (
        <>
          <Footer />
          <BottomNav />
          <WhatsAppButton />
        </>
      )}
      <CartDrawer />
    </div>
  )
}
