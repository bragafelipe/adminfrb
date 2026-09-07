import { PageShell } from './PageShell'

export function SettingsPage() {
  return (
    <PageShell
      title="Configurações"
      description="Ajuste as preferências e configurações do dashboard."
    >
      <section className="page-shell__card" aria-label="Configurações">
        <h2>Preferências da aplicação</h2>
        <p>As configurações estarão disponíveis em breve.</p>
      </section>
    </PageShell>
  )
}
