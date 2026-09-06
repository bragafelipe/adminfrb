import '@/styles/dashboard.css'

export function DashboardPage() {
  return (
    <main className="dashboard">
      <section className="dashboard__header">
        <p className="dashboard__eyebrow">AdminFRB</p>
        <h1>Visão geral</h1>
        <p className="dashboard__description">
          Uma base pronta para evoluir seu dashboard administrativo.
        </p>
      </section>
      <section className="dashboard__card" aria-label="Status da aplicação">
        <span className="dashboard__status" aria-hidden="true" />
        <div>
          <strong>Aplicação configurada</strong>
          <p>React, TypeScript e Vite estão prontos para uso.</p>
        </div>
      </section>
    </main>
  )
}
