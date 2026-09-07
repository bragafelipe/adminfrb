import type { ClientConfig } from '@/types/config'

export const demoBrandConfig: ClientConfig = {
  id: 'demo',
  companyName: 'Acme Corp',
  tradeName: 'Acme Enterprise',
  tagline: 'Soluções Corporativas',
  description: 'Portal de operações e gestão integrada da Acme Corporation.',
  logo: {
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230d9488'/%3E%3Cpath d='M8 24L16 8l8 16h-4l-4-8-4 8z' fill='%23ffffff'/%3E%3C/svg%3E",
    alt: 'Acme Corp Logo',
    width: 32,
    height: 32,
  },
  faviconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230d9488'/%3E%3Cpath d='M8 24L16 8l8 16h-4l-4-8-4 8z' fill='%23ffffff'/%3E%3C/svg%3E",
  colors: {
    accent: '#0d9488',
    background: '#f0fdfa',
    surface: '#ffffff',
    text: '#134e4a',
    textMuted: '#115e59',
    border: '#ccfbf1',
    success: '#059669',
    successSurface: '#d1fae5',
    dark: {
      accent: '#2dd4bf',
      background: '#042f2e',
      surface: '#115e59',
      text: '#f0fdfa',
      textMuted: '#99f6e4',
      border: '#134e4a',
      success: '#34d399',
      successSurface: '#064e3b',
    },
  },
  support: {
    domain: 'ajuda.acme.com',
    url: 'https://ajuda.acme.com',
    email: 'atendimento@acme.com',
  },
  navigation: [
    {
      id: 'dashboard',
      label: 'Painel Geral',
      href: '#',
    },
    {
      id: 'clients',
      label: 'Clientes & Contratos',
      href: '#clients',
      badge: 'Ativo',
    },
    {
      id: 'billing',
      label: 'Faturamento',
      href: '#billing',
    },
    {
      id: 'integrations',
      label: 'Integrações',
      href: '#integrations',
    },
    {
      id: 'helpdesk',
      label: 'Central de Ajuda',
      href: 'https://ajuda.acme.com',
      external: true,
      target: '_blank',
    },
  ],
  domains: ['acme.adminfrb.com', 'acme.localhost', 'demo.localhost'],
  meta: {
    title: 'Acme Corp | Portal Corporativo',
    description:
      'Portal de gestão administrativa e operacional Acme Corporation',
  },
}
