import type { ClientConfig } from '@/types/config'
import { defaultBrandConfig } from './defaultBrand'
import { demoBrandConfig } from './demoBrand'

const initialBrands: Record<string, ClientConfig> = {
  [defaultBrandConfig.id]: defaultBrandConfig,
  [demoBrandConfig.id]: demoBrandConfig,
}

let brandsMap: Record<string, ClientConfig> = { ...initialBrands }

export function registerBrand(config: ClientConfig): void {
  brandsMap[config.id] = config
}

export function unregisterBrand(brandId: string): void {
  delete brandsMap[brandId]
}

export function getBrandById(id: string): ClientConfig | undefined {
  return brandsMap[id]
}

export function getBrandByDomain(domain: string): ClientConfig | undefined {
  const normalizedDomain = domain.toLowerCase().trim()
  return Object.values(brandsMap).find((brand) =>
    brand.domains?.some((d) => d.toLowerCase().trim() === normalizedDomain),
  )
}

export function getAllBrands(): ClientConfig[] {
  return Object.values(brandsMap)
}

export function resetBrandRegistry(): void {
  brandsMap = { ...initialBrands }
}
