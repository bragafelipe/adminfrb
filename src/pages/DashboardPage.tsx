import { useBrand, useBrandSupport } from '@/features/brand'
import '@/styles/dashboard.css'

export function DashboardPage() {
  const { brand } = useBrand()
  const support = useBrandSupport()

  return (
    <div className="dashboard">
      <section className="dashboard__header">
        <p className="dashboard__eyebrow">{brand.companyName}</p>
        <h1>Visão geral</h1>
        <p className="dashboard__description">
          {brand.description ||
            'Uma base pronta para evoluir seu dashboard administrativo.'}
        </p>
      </section>

      <section className="dashboard__card" aria-label="Status da aplicação">
        <span className="dashboard__status" aria-hidden="true" />
        <div>
          <strong>Aplicação configurada</strong>
          <p>React, TypeScript e Vite estão prontos para uso.</p>
        </div>
      </section>

      <section
        className="brand-overview-card"
        aria-label="Informações da marca"
      >
        <h2 className="brand-overview-card__title">
          Configuração White-label Ativa
        </h2>
        <dl className="brand-overview-grid">
          <div className="brand-overview-item">
            <dt>Identificador da marca</dt>
            <dd>{brand.id}</dd>
          </div>
          <div className="brand-overview-item">
            <dt>Empresa</dt>
            <dd>{brand.companyName}</dd>
          </div>
          {brand.tagline && (
            <div className="brand-overview-item">
              <dt>Slogan / Tagline</dt>
              <dd>{brand.tagline}</dd>
            </div>
          )}
          {support && (
            <div className="brand-overview-item">
              <dt>Suporte</dt>
              <dd>{support.domain || support.email || support.url || '-'}</dd>
            </div>
          )}
          <div className="brand-overview-item">
            <dt>Itens de Menu</dt>
            <dd>{brand.navigation.length} itens configurados</dd>
          </div>
          {brand.colors?.accent && (
            <div className="brand-overview-item">
              <dt>Cor de Destaque</dt>
              <dd>
                <span
                  className="brand-color-swatch"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                  aria-hidden="true"
                />
                {brand.colors.accent}
              </dd>
            </div>
          )}
        </dl>
      </section>
    </div>
  )
}
