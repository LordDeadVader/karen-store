import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  const navigate = useNavigate()
  useDocumentTitle('Página não encontrada')

  return (
    <EmptyState
      icon="🙈"
      title="Página não encontrada"
      description="O endereço que você tentou acessar não existe ou foi movido."
      action={<Button onClick={() => navigate('/')}>Voltar para a loja</Button>}
    />
  )
}
