import { createContext, type ReactNode } from 'react'
import type { BrandResolveOptions, ClientConfig } from '@/types/config'

export interface BrandContextValue {
  brand: ClientConfig
  brandId: string
  isDefaultBrand: boolean
  availableBrands: ClientConfig[]
  setBrand: (brandIdOrConfig: string | ClientConfig) => void
  registerCustomBrand: (config: ClientConfig) => void
}

export const BrandContext = createContext<BrandContextValue | null>(null)

export interface BrandProviderProps {
  children: ReactNode
  initialConfig?: ClientConfig
  resolveOptions?: BrandResolveOptions
  disableDomSideEffects?: boolean
}
