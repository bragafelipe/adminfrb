export type DashboardPeriod = '7d' | '30d' | '90d'

export interface DashboardActivity {
  id: string
  activity: string
  user: string
  status: 'Concluída' | 'Em andamento' | 'Pendente'
  date: string
}

export interface DashboardData {
  metrics: {
    revenue: number
    users: number
    churn: number
    pending: number
  }
  salesTrend: { label: string; sales: number; goal: number }[]
  acquisitionMix: { label: string; value: number; color: string }[]
  activities: DashboardActivity[]
}

const data: Record<DashboardPeriod, DashboardData> = {
  '7d': {
    metrics: { revenue: 38200, users: 286, churn: 1.4, pending: 8 },
    salesTrend: [
      { label: 'Seg', sales: 18, goal: 22 },
      { label: 'Ter', sales: 27, goal: 25 },
      { label: 'Qua', sales: 24, goal: 28 },
      { label: 'Qui', sales: 35, goal: 31 },
      { label: 'Sex', sales: 41, goal: 36 },
    ],
    acquisitionMix: [
      { label: 'Orgânico', value: 48, color: 'var(--color-accent)' },
      { label: 'Pago', value: 28, color: 'var(--color-success)' },
      { label: 'Parceria', value: 16, color: 'var(--color-warning)' },
      { label: 'Indireto', value: 8, color: 'var(--color-info)' },
    ],
    activities: [
      {
        id: '1',
        activity: 'Novo contrato criado',
        user: 'Ana Souza',
        status: 'Concluída',
        date: 'Hoje, 10:42',
      },
      {
        id: '2',
        activity: 'Importação de usuários',
        user: 'Carlos Lima',
        status: 'Em andamento',
        date: 'Hoje, 09:18',
      },
      {
        id: '3',
        activity: 'Pagamento aprovado',
        user: 'Marina Costa',
        status: 'Concluída',
        date: 'Ontem, 16:05',
      },
    ],
  },
  '30d': {
    metrics: { revenue: 145800, users: 1240, churn: 2.1, pending: 18 },
    salesTrend: [
      { label: 'Jan', sales: 30, goal: 22 },
      { label: 'Fev', sales: 42, goal: 34 },
      { label: 'Mar', sales: 38, goal: 36 },
      { label: 'Abr', sales: 61, goal: 48 },
      { label: 'Mai', sales: 58, goal: 52 },
      { label: 'Jun', sales: 74, goal: 60 },
    ],
    acquisitionMix: [
      { label: 'Orgânico', value: 44, color: 'var(--color-accent)' },
      { label: 'Pago', value: 31, color: 'var(--color-success)' },
      { label: 'Parceria', value: 18, color: 'var(--color-warning)' },
      { label: 'Indireto', value: 7, color: 'var(--color-info)' },
    ],
    activities: [
      {
        id: '4',
        activity: 'Novo contrato criado',
        user: 'Ana Souza',
        status: 'Concluída',
        date: 'Hoje, 10:42',
      },
      {
        id: '5',
        activity: 'Importação de usuários',
        user: 'Carlos Lima',
        status: 'Em andamento',
        date: 'Ontem, 09:18',
      },
      {
        id: '6',
        activity: 'Pagamento aguardando confirmação',
        user: 'Marina Costa',
        status: 'Pendente',
        date: '02 Jun, 16:05',
      },
    ],
  },
  '90d': {
    metrics: { revenue: 412600, users: 3680, churn: 2.8, pending: 31 },
    salesTrend: [
      { label: 'Abr', sales: 61, goal: 48 },
      { label: 'Mai', sales: 58, goal: 52 },
      { label: 'Jun', sales: 74, goal: 60 },
    ],
    acquisitionMix: [
      { label: 'Orgânico', value: 51, color: 'var(--color-accent)' },
      { label: 'Pago', value: 25, color: 'var(--color-success)' },
      { label: 'Parceria', value: 15, color: 'var(--color-warning)' },
      { label: 'Indireto', value: 9, color: 'var(--color-info)' },
    ],
    activities: [
      {
        id: '7',
        activity: 'Revisão de permissões',
        user: 'João Alves',
        status: 'Concluída',
        date: '03 Jun, 14:20',
      },
      {
        id: '8',
        activity: 'Relatório mensal gerado',
        user: 'Ana Souza',
        status: 'Concluída',
        date: '01 Jun, 11:10',
      },
    ],
  },
}

export function getDashboardData(period: DashboardPeriod): DashboardData {
  return data[period]
}
