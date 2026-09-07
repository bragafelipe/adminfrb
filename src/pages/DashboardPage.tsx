import { useState } from 'react'
import {
  Badge,
  Button,
  Checkbox,
  Select,
  Switch,
  TextField,
  Tooltip,
} from '@/components'
import { useBrand, useBrandSupport } from '@/features/brand'
import '@/styles/dashboard.css'

export function DashboardPage() {
  const { brand } = useBrand()
  const support = useBrandSupport()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [profile, setProfile] = useState('admin')

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
        className="design-system-demo"
        aria-label="Biblioteca de componentes"
      >
        <div className="design-system-demo__header">
          <h2>Componentes do design system</h2>
          <div className="design-system-demo__badges">
            <Badge variant="success">Produção</Badge>
            <Badge variant="info">Acessível</Badge>
          </div>
        </div>

        <div className="design-system-demo__grid">
          <div className="design-system-demo__panel">
            <h3>Botões</h3>
            <div className="design-system-demo__buttons">
              <Button>Primário</Button>
              <Button variant="secondary">Secundário</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Perigoso</Button>
              <Button loading>Carregando</Button>
              <Button size="sm" variant="secondary">
                Pequeno
              </Button>
            </div>
          </div>

          <div className="design-system-demo__panel">
            <h3>Campos</h3>
            <div className="design-system-demo__stack">
              <TextField
                label="Nome da empresa"
                placeholder="Digite o nome"
                defaultValue="AdminFRB"
                hint="Visível no cabeçalho da aplicação"
              />
              <TextField
                label="Contato do suporte"
                defaultValue="suporte@adminfrb.com"
                error="Informe um e-mail válido"
              />
              <Select
                label="Perfil de acesso"
                value={profile}
                onChange={(event) => setProfile(event.target.value)}
                options={[
                  { value: 'admin', label: 'Administrador' },
                  { value: 'user', label: 'Usuário' },
                  { value: 'viewer', label: 'Visualizador' },
                ]}
              />
            </div>
          </div>

          <div className="design-system-demo__panel">
            <h3>Controles</h3>
            <div className="design-system-demo__stack">
              <Checkbox
                label="Aceitar políticas"
                description="Concordo com o uso de dados e suporte de acesso."
                checked={marketingConsent}
                onChange={(event) => setMarketingConsent(event.target.checked)}
              />
              <Switch
                label="Notificações por e-mail"
                description="Receba alertas sobre novos acessos e eventos."
                checked={notificationsEnabled}
                onChange={(event) =>
                  setNotificationsEnabled(event.target.checked)
                }
              />
            </div>
          </div>

          <div className="design-system-demo__panel">
            <h3>Badges e tooltip</h3>
            <div className="design-system-demo__badges">
              <Badge variant="success">Ativo</Badge>
              <Badge variant="warning">Atenção</Badge>
              <Badge variant="danger">Bloqueado</Badge>
            </div>
            <Tooltip content="As alterações são salvas automaticamente.">
              <Button size="sm" variant="secondary">
                Dica de uso
              </Button>
            </Tooltip>
          </div>
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
