import { useAuth } from '@/features/auth'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { PageShell } from './PageShell'

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destination = (location.state as { from?: string } | null)?.from ?? '/'

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <PageShell title="Entrar" description="Acesse o dashboard administrativo.">
      <section className="page-shell__card">
        <button
          type="button"
          onClick={() => {
            login()
            navigate(destination, { replace: true })
          }}
        >
          Entrar na aplicação
        </button>
      </section>
    </PageShell>
  )
}
