import { useState } from 'react'
import {
  Badge,
  BarChart,
  Button,
  Card,
  Checkbox,
  DonutChart,
  formatCurrency,
  formatPercent,
  LineChart,
  MetricCard,
  Select,
  Switch,
  TextField,
  Tooltip,
  TrendWidget,
} from '@/components'
import { useBrand, useBrandSupport } from '@/features/brand'
import '@/styles/dashboard.css'

export function DashboardPage() {
  const { brand } = useBrand()
  const support = useBrandSupport()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [profile, setProfile] = useState('admin')

  const salesTrend = [
    { label: 'Jan', vendas: 30, metas: 22 },
    { label: 'Fev', vendas: 42, metas: 34 },
    { label: 'Mar', vendas: 38, metas: 36 },
    { label: 'Abr', vendas: 61, metas: 48 },
    { label: 'Mai', vendas: 58, metas: 52 },
    { label: 'Jun', vendas: 74, metas: 60 },
  ]

  const acquisitionMix = [
    { label: 'Orgânico', value: 44, color: 'var(--color-accent)' },
    { label: 'Pago', value: 31, color: 'var(--color-success)' },
    { label: 'Parceria', value: 18, color: 'var(--color-warning)' },
    { label: 'Indireto', value: 7, color: 'var(--color-info)' },
  ]

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

      <section className="dashboard__metrics" aria-label="Métricas principais">
        <h2>Métricas do Dashboard</h2>
        <div className="dashboard__metrics-grid">
          <MetricCard
            title="Faturamento Mensal"
            value={145800}
            formatValue={(val) => formatCurrency(Number(val))}
            trend="positive"
            trendValue={12.4}
            period="vs. mês anterior"
            icon="💰"
          />
          <MetricCard
            title="Novos Usuários"
            value={1240}
            trend="positive"
            trendValue={5.8}
            period="últimos 30 dias"
            icon="👤"
          />
          <MetricCard
            title="Taxa de Cancelamento"
            value={2.1}
            formatValue={(val) => formatPercent(Number(val))}
            trend="negative"
            trendValue={-0.4}
            period="vs. mês anterior"
            icon="📉"
          />
          <MetricCard
            title="Atendimentos Pendentes"
            value={18}
            trend="neutral"
            trendValue={0}
            period="sem alteração"
            icon="⏱️"
          />
        </div>
      </section>

      <section className="dashboard__charts" aria-label="Visões gráficas">
        <LineChart
          title="Vendas por mês"
          description="Comparativo entre faturamento real e meta planejada"
          data={salesTrend}
          series={[
            { key: 'vendas', label: 'Vendas' },
            { key: 'metas', label: 'Meta', color: 'var(--color-success)' },
          ]}
          legend
          ariaLabel="Linha de vendas por mês"
        />
        <BarChart
          title="Ativações por canal"
          description="Volume semanal consolidado por origem"
          data={[
            { label: 'Seg', prod: 18, suporte: 10 },
            { label: 'Ter', prod: 27, suporte: 14 },
            { label: 'Qua', prod: 26, suporte: 17 },
            { label: 'Qui', prod: 35, suporte: 16 },
            { label: 'Sex', prod: 41, suporte: 20 },
          ]}
          series={[
            { key: 'prod', label: 'Produtos' },
            { key: 'suporte', label: 'Suporte', color: 'var(--color-success)' },
          ]}
          legend
          ariaLabel="Barra de ativações por canal"
        />
        <DonutChart
          title="Mix de aquisição"
          description="Participação por canal de aquisição"
          data={acquisitionMix}
          totalLabel="Leads"
          ariaLabel="Gráfico de rosca do mix de aquisição"
        />
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

          <div className="design-system-demo__panel">
            <h3>Widgets de Tendência</h3>
            <div className="design-system-demo__badges">
              <TrendWidget trend="positive" value={15.2} label="vs mês ant." />
              <TrendWidget trend="negative" value={-3.4} />
              <TrendWidget trend="neutral" value={0} />
              <TrendWidget trend="positive" loading />
            </div>
          </div>

          <div
            className="design-system-demo__panel"
            style={{ gridColumn: 'span 2' }}
          >
            <h3>Card Genérico</h3>
            <Card
              title="Resumo Operacional"
              description="Visão das atividades recentes no sistema."
              actions={
                <Button size="sm" variant="secondary">
                  Atualizar
                </Button>
              }
              footer={<span>Atualizado há 5 minutos</span>}
            >
              <p style={{ margin: 0 }}>
                Todos os serviços operando normalmente. Nenhum incidente
                registrado.
              </p>
            </Card>
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
