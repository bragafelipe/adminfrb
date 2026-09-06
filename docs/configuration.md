# Arquitetura de Configuração White-label

Este documento descreve o modelo e as estratégias de configuração white-label no AdminFRB.

## Visão Geral

A arquitetura white-label permite customizar a identidade visual, textos institucionais, navegação e canais de suporte para diferentes clientes ou marcas **sem alterar os componentes compartilhados** do frontend.

## Interface Tipada (`ClientConfig` / `BrandConfig`)

Definida em `src/types/config.ts`:

```typescript
export interface BrandThemeColors {
  accent?: string
  background?: string
  surface?: string
  text?: string
  textMuted?: string
  border?: string
  success?: string
  successSurface?: string
  dark?: Partial<Omit<BrandThemeColors, 'dark' | 'customVariables'>>
  customVariables?: Record<`--${string}`, string>
}

export interface BrandLogo {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  darkModeSrc?: string
}

export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: string
  badge?: string | number
  external?: boolean
  target?: '_blank' | '_self'
  children?: NavigationItem[]
}

export interface SupportConfig {
  domain?: string
  url?: string
  email?: string
  phone?: string
}

export interface ClientConfig {
  id: string
  companyName: string
  tradeName?: string
  tagline?: string
  description?: string
  logo: BrandLogo
  faviconUrl: string
  colors?: BrandThemeColors
  support?: SupportConfig
  navigation: NavigationItem[]
  domains?: string[]
  meta?: {
    title?: string
    description?: string
  }
}
```

## Estratégias de Carregamento e Resolução

A resolução da marca ativa é executada pela função `resolveBrandConfig()` (`src/services/brandResolver.ts`) seguindo a seguinte ordem de precedência:

1. **Parâmetros de URL (`?brand=xxx` ou `?tenant=xxx`)**:
   - Útil para pré-visualização, desenvolvimento, testes e QA em múltiplos tenants.
2. **Variável de Ambiente (`VITE_BRAND` ou `VITE_TENANT`)**:
   - Permite fixar uma marca específica durante a compilação ou deploy de ambientes dedicados.
3. **Domínio / Hostname (`window.location.hostname`)**:
   - Mapeia o domínio ou subdomínio do cliente diretamente para a marca correspondente (ex: `acme.adminfrb.com` ou `acme.localhost` resolve para a configuração `Acme Corp`).
4. **Configuração Padrão (`defaultBrandConfig`)**:
   - Fallback automático caso nenhuma marca seja correspondida, garantindo que a aplicação sempre funcione com as configurações e identidade padrão do AdminFRB.

## Injeção Dinâmica de Tema e Tokens

O serviço `applyBrandToDocument` (`src/services/domThemeService.ts`) e o `BrandProvider` (`src/features/brand/BrandProvider.tsx`) aplicam automaticamente as propriedades no documento:

- **CSS Variables**: atualiza `--color-accent`, `--color-background`, `--color-surface`, `--color-text`, `--color-border`, etc. no `:root`, suportando também modo escuro (`dark`).
- **Título da Página**: atualiza `document.title` com o nome da empresa e tagline.
- **Favicon**: atualiza a tag `<link rel="icon">`.
- **Meta Description**: atualiza `<meta name="description">`.

## Como Criar uma Nova Marca

Para adicionar uma nova marca sem alterar componentes compartilhados:

1. Crie um objeto que implementa `ClientConfig`:

```typescript
import type { ClientConfig } from '@/types/config'

export const novaMarcaConfig: ClientConfig = {
  id: 'minha-empresa',
  companyName: 'Minha Empresa',
  tagline: 'Gestão Inteligente',
  logo: {
    src: '/logo-minha-empresa.svg',
    alt: 'Minha Empresa',
    width: 32,
    height: 32,
  },
  faviconUrl: '/favicon-minha-empresa.svg',
  colors: {
    accent: '#2563eb',
  },
  support: {
    domain: 'suporte.minhaempresa.com',
    url: 'https://suporte.minhaempresa.com',
  },
  navigation: [
    { id: 'dashboard', label: 'Painel', href: '#' },
    { id: 'pedidos', label: 'Pedidos', href: '#pedidos' },
  ],
  domains: ['minhaempresa.com', 'app.minhaempresa.com'],
}
```

2. Registre a marca usando `registerBrand(novaMarcaConfig)` em tempo de inicialização ou passe-a para o `BrandProvider`.
