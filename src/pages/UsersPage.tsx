import { PageShell } from './PageShell'

export function UsersPage() {
  return (
    <PageShell
      title="Usuários"
      description="Gerencie os usuários e os acessos da aplicação."
    >
      <section className="page-shell__card" aria-label="Lista de usuários">
        <h2>Usuários cadastrados</h2>
        <p>A gestão de usuários estará disponível em breve.</p>
      </section>
    </PageShell>
  )
}
