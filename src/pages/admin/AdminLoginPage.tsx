import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import defaultLogo from '@/assets/brand/logo-karen-store.png'
import { useAuth } from '@/context/AuthContext'
import { useStoreData } from '@/context/StoreDataContext'
import { TextInput } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function AdminLoginPage() {
  const { isAuthenticated, login } = useAuth()
  const { settings } = useStoreData()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useDocumentTitle('Login administrativo')

  if (isAuthenticated) {
    const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/admin'
    return <Navigate to={from} replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(undefined)
    if (!password) {
      setError('Digite a senha de acesso')
      return
    }
    setIsSubmitting(true)
    const ok = await login(password)
    setIsSubmitting(false)
    if (ok) navigate('/admin')
    else setError('Senha incorreta')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50/50 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <img src={settings.logoOverride || defaultLogo} alt="Karen Store" className="h-16 w-auto" />
          <p className="font-display text-lg font-semibold text-ink-900">Área administrativa</p>
          <p className="text-sm text-ink-500">Acesso restrito à proprietária da loja</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput
            label="Senha de acesso"
            type="password"
            autoFocus
            value={password}
            error={error}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className="mt-6 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
          Modo de desenvolvimento: esta senha é apenas local e deve ser substituída por um login real (com backend)
          antes de a loja receber pedidos de verdade.
        </p>
      </div>
    </div>
  )
}
