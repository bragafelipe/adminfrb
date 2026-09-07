import type { ClientConfig } from '@/types/config'

export const defaultBrandConfig: ClientConfig = {
  id: 'default',
  companyName: 'AdminFRB',
  tradeName: 'AdminFRB Core',
  tagline: 'Dashboard Administrativo',
  description: 'Uma base pronta para evoluir seu dashboard administrativo.',
  logo: {
    src: '/favicon.svg',
    alt: 'AdminFRB Logo',
    width: 32,
    height: 32,
  },
  faviconUrl: '/favicon.svg',
  colors: {
    accent: '#4968d8',
    background: '#f4f7fb',
    surface: '#ffffff',
    text: '#172033',
    textMuted: '#5d687d',
    border: '#e0e6f0',
    success: '#197a50',
    successSurface: '#dff5eb',
    dark: {
      accent: '#a9b9ff',
      background: '#111827',
      surface: '#1f2937',
      text: '#f3f4f6',
      textMuted: '#c2cad8',
      border: '#3b4659',
      success: '#6ee7b7',
      successSurface: '#164e3b',
    },
  },
  support: {
    domain: 'suporte.adminfrb.com',
    url: 'https://suporte.adminfrb.com',
    email: 'suporte@adminfrb.com',
  },
  navigation: [
    {
      id: 'overview',
      label: 'Visão Geral',
      href: '/',
    },
    {
      id: 'users',
      label: 'Usuários',
      href: '/users',
    },
    {
      id: 'settings',
      label: 'Configurações',
      href: '/settings',
    },
    {
      id: 'support',
      label: 'Suporte',
      href: 'https://suporte.adminfrb.com',
      external: true,
      target: '_blank',
    },
  ],
  domains: ['localhost', 'adminfrb.com', 'app.adminfrb.com'],
  meta: {
    title: 'AdminFRB | Dashboard Administrativo',
    description: 'Dashboard administrativo white-label',
  },
}
