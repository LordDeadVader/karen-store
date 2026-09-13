import { Route, Routes } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { HomePage } from '@/pages/HomePage'
import { CategoryPage } from '@/pages/CategoryPage'
import { CategoriesOverviewPage } from '@/pages/CategoriesOverviewPage'
import { ProductPage } from '@/pages/ProductPage'
import { SearchResultsPage } from '@/pages/SearchResultsPage'
import { CartPage } from '@/pages/CartPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { AccountPage } from '@/pages/AccountPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { ExchangePolicyPage } from '@/pages/ExchangePolicyPage'
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage'
import { ShippingInfoPage } from '@/pages/ShippingInfoPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage'
import { DashboardPage } from '@/pages/admin/DashboardPage'
import { ProductsListPage } from '@/pages/admin/ProductsListPage'
import { ProductFormPage } from '@/pages/admin/ProductFormPage'
import { CategoriesPage } from '@/pages/admin/CategoriesPage'
import { BannersPage } from '@/pages/admin/BannersPage'
import { SettingsPage } from '@/pages/admin/SettingsPage'
import { OrdersPage } from '@/pages/admin/OrdersPage'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="categorias" element={<CategoriesOverviewPage />} />
        <Route path="categoria/:slug" element={<CategoryPage />} />
        <Route path="produto/:slug" element={<ProductPage />} />
        <Route path="busca" element={<SearchResultsPage />} />
        <Route path="carrinho" element={<CartPage />} />
        <Route path="favoritos" element={<FavoritesPage />} />
        <Route path="conta" element={<AccountPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="politica-de-trocas" element={<ExchangePolicyPage />} />
        <Route path="politica-de-privacidade" element={<PrivacyPolicyPage />} />
        <Route path="entrega" element={<ShippingInfoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="admin/login" element={<AdminLoginPage />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="produtos" element={<ProductsListPage />} />
        <Route path="produtos/novo" element={<ProductFormPage />} />
        <Route path="produtos/:id" element={<ProductFormPage />} />
        <Route path="categorias" element={<CategoriesPage />} />
        <Route path="banners" element={<BannersPage />} />
        <Route path="pedidos" element={<OrdersPage />} />
        <Route path="configuracoes" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
