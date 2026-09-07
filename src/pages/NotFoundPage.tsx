import { Link } from 'react-router-dom'
import { PageShell } from './PageShell'

export function NotFoundPage() {
  return (
    <PageShell
      title="Página não encontrada"
      description="O endereço informado não corresponde a uma página disponível."
    >
      <section className="page-shell__card">
        <p>Verifique a URL ou volte para o início do dashboard.</p>
        <Link to="/">Voltar ao dashboard</Link>
      </section>
    </PageShell>
  )
}
