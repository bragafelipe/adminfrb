import { useContext } from 'react'
import type {
  BrandLogo,
  BrandThemeColors,
  ClientConfig,
  NavigationItem,
  SupportConfig,
} from '@/types/config'
import { BrandContext, type BrandContextValue } from './BrandContext'

export function useBrand(): BrandContextValue {
  const context = useContext(BrandContext)
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider')
  }
  return context
}

export function useBrandConfig(): ClientConfig {
  const { brand } = useBrand()
  return brand
}

export function useBrandNavigation(): NavigationItem[] {
  const { brand } = useBrand()
  return brand.navigation
}

export function useBrandTheme(): BrandThemeColors | undefined {
  const { brand } = useBrand()
  return brand.colors
}

export function useBrandLogo(): BrandLogo {
  const { brand } = useBrand()
  return brand.logo
}

export function useBrandSupport(): SupportConfig | undefined {
  const { brand } = useBrand()
  return brand.support
}
