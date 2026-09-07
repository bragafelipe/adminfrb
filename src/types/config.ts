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

export interface BrandMeta {
  title?: string
  description?: string
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
  meta?: BrandMeta
}

export type BrandConfig = ClientConfig

export interface BrandResolveOptions {
  domain?: string
  envBrand?: string
  searchParams?: URLSearchParams | string
  defaultBrandId?: string
}
