import { useState } from 'react'
import {
  AdminTable,
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
import {
  getDashboardData,
  type DashboardActivity,
  type DashboardPeriod,
} from '@/mocks/dashboard'
import '@/styles/dashboard.css'

export function DashboardPage() {
  const { brand } = useBrand()
  const support = useBrandSupport()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [profile, setProfile] = useState('admin')
  const [period, setPeriod] = useState<DashboardPeriod>('30d')
  const [isLoading, setIsLoading] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(false)
  const dashboardData = getDashboardData(period)
  const visibleData = showEmptyState
    ? { ...dashboardData, salesTrend: [], acquisitionMix: [], activities: [] }
    : dashboardData

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
        <div className="dashboard__section-header">
          <div>
            <h2>Métricas do Dashboard</h2>
            <p>Dados simulados para acompanhar a operação.</p>
          </div>
          <div className="dashboard__controls">
            <Select
              label="Período"
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value as DashboardPeriod)
              }
              options={[
                { value: '7d', label: 'Últimos 7 dias' },
                { value: '30d', label: 'Últimos 30 dias' },
                { value: '90d', label: 'Últimos 90 dias' },
              ]}
            />
            <Button
              size="sm"
              variant="secondary"
              aria-pressed={isLoading}
              onClick={() => setIsLoading((loading) => !loading)}
            >
              {isLoading ? 'Exibir dados' : 'Visualizar carregamento'}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              aria-pressed={showEmptyState}
              onClick={() => setShowEmptyState((empty) => !empty)}
            >
              {showEmptyState ? 'Exibir dados' : 'Visualizar vazio'}
            </Button>
          </div>
        </div>
        <div className="dashboard__metrics-grid">
          <MetricCard
            title="Faturamento Mensal"
            value={dashboardData.metrics.revenue}
            formatValue={(val) => formatCurrency(Number(val))}
            trend="positive"
            trendValue={12.4}
            period="vs. mês anterior"
            icon="💰"
            loading={isLoading}
          />
          <MetricCard
            title="Novos Usuários"
            value={dashboardData.metrics.users}
            trend="positive"
            trendValue={5.8}
            period="últimos 30 dias"
            icon="👤"
            loading={isLoading}
          />
          <MetricCard
            title="Taxa de Cancelamento"
            value={dashboardData.metrics.churn}
            formatValue={(val) => formatPercent(Number(val))}
            trend="negative"
            trendValue={-0.4}
            period="vs. mês anterior"
            icon="📉"
            loading={isLoading}
          />
          <MetricCard
            title="Atendimentos Pendentes"
            value={dashboardData.metrics.pending}
            trend="neutral"
            trendValue={0}
            period="sem alteração"
            icon="⏱️"
            loading={isLoading}
          />
        </div>
      </section>

      <section className="dashboard__charts" aria-label="Visões gráficas">
        <LineChart
          title="Vendas por mês"
          description="Comparativo entre faturamento real e meta planejada"
          data={visibleData.salesTrend.map(({ label, sales, goal }) => ({
            label,
            vendas: sales,
            metas: goal,
          }))}
          series={[
            { key: 'vendas', label: 'Vendas' },
            { key: 'metas', label: 'Meta', color: 'var(--color-success)' },
          ]}
          legend
          ariaLabel="Linha de vendas por mês"
          loading={isLoading}
          emptyTitle="Nenhuma venda no período"
          emptyDescription="Altere o filtro ou aguarde novos dados."
        />
        <BarChart
          title="Ativações por canal"
          description="Volume semanal consolidado por origem"
          data={visibleData.salesTrend.map(({ label, sales, goal }) => ({
            label,
            prod: sales,
            suporte: goal,
          }))}
          series={[
            { key: 'prod', label: 'Produtos' },
            { key: 'suporte', label: 'Suporte', color: 'var(--color-success)' },
          ]}
          legend
          ariaLabel="Barra de ativações por canal"
          loading={isLoading}
          emptyTitle="Nenhuma ativação no período"
          emptyDescription="Altere o filtro ou aguarde novos dados."
        />
        <DonutChart
          title="Mix de aquisição"
          description="Participação por canal de aquisição"
          data={visibleData.acquisitionMix}
          totalLabel="Leads"
          ariaLabel="Gráfico de rosca do mix de aquisição"
          loading={isLoading}
          emptyTitle="Nenhuma aquisição no período"
          emptyDescription="Altere o filtro ou aguarde novos dados."
        />
      </section>

      <Card
        title="Atividades recentes"
        description="Acompanhe as últimas movimentações da sua operação."
        className="dashboard__activity"
      >
        <AdminTable<DashboardActivity>
          ariaLabel="Tabela de atividades recentes"
          data={visibleData.activities}
          loading={isLoading}
          emptyMessage="Nenhuma atividade encontrada neste período."
          getRowId={(row) => row.id}
          columns={[
            { key: 'activity', header: 'Atividade' },
            { key: 'user', header: 'Responsável' },
            {
              key: 'status',
              header: 'Status',
              render: (value) => (
                <Badge
                  variant={
                    value === 'Concluída'
                      ? 'success'
                      : value === 'Pendente'
                        ? 'warning'
                        : 'info'
                  }
                >
                  {String(value)}
                </Badge>
              ),
            },
            { key: 'date', header: 'Data' },
          ]}
        />
      </Card>

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
