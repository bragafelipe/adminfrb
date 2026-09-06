import type { BrandResolveOptions, ClientConfig } from '@/types/config'
import { defaultBrandConfig } from '@/features/brand/defaultBrand'
import {
  getAllBrands,
  getBrandByDomain,
  getBrandById,
} from '@/features/brand/registry'

function parseSearchParams(
  params?: URLSearchParams | string,
): URLSearchParams | null {
  if (!params) return null
  if (typeof params === 'string') {
    return new URLSearchParams(params.startsWith('?') ? params : `?${params}`)
  }
  return params
}

export function resolveBrandConfig(
  options: BrandResolveOptions = {},
): ClientConfig {
  const { domain, envBrand, searchParams, defaultBrandId } = options

  // 1. URL Query parameter resolution (?brand=xxx or ?tenant=xxx)
  let queryBrandKey: string | null = null
  if (searchParams) {
    const parsed = parseSearchParams(searchParams)
    queryBrandKey = parsed?.get('brand') || parsed?.get('tenant') || null
  } else if (typeof window !== 'undefined' && window.location?.search) {
    const parsed = new URLSearchParams(window.location.search)
    queryBrandKey = parsed.get('brand') || parsed.get('tenant') || null
  }

  if (queryBrandKey) {
    const brandFromQuery =
      getBrandById(queryBrandKey) || getBrandByDomain(queryBrandKey)
    if (brandFromQuery) {
      return brandFromQuery
    }
  }

  // 2. Environment variable resolution (VITE_BRAND or VITE_TENANT)
  const resolvedEnvBrand =
    envBrand ??
    (typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.VITE_BRAND as string | undefined) ||
        (import.meta.env.VITE_TENANT as string | undefined)
      : undefined)

  if (resolvedEnvBrand) {
    const brandFromEnv =
      getBrandById(resolvedEnvBrand) || getBrandByDomain(resolvedEnvBrand)
    if (brandFromEnv) {
      return brandFromEnv
    }
  }

  // 3. Domain / Hostname resolution
  const resolvedDomain =
    domain ??
    (typeof window !== 'undefined' ? window.location?.hostname : undefined)

  if (resolvedDomain) {
    const brandFromDomain = getBrandByDomain(resolvedDomain)
    if (brandFromDomain) {
      return brandFromDomain
    }

    // Check if subdomain matches any registered brand ID (e.g. demo.adminfrb.com -> demo)
    const subdomain = resolvedDomain.split('.')[0]
    if (subdomain) {
      const brandFromSubdomain = getBrandById(subdomain)
      if (brandFromSubdomain) {
        return brandFromSubdomain
      }
    }
  }

  // 4. Default brand ID override if provided
  if (defaultBrandId) {
    const brandFromDefaultId = getBrandById(defaultBrandId)
    if (brandFromDefaultId) {
      return brandFromDefaultId
    }
  }

  // 5. Fallback to default brand
  return getBrandById(defaultBrandConfig.id) ?? defaultBrandConfig
}

export { getAllBrands, getBrandByDomain, getBrandById }
