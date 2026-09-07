import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ClientConfig } from '@/types/config'
import { applyBrandToDocument } from '@/services/domThemeService'
import { resolveBrandConfig } from '@/services/brandResolver'
import {
  BrandContext,
  type BrandContextValue,
  type BrandProviderProps,
} from './BrandContext'
import { defaultBrandConfig } from './defaultBrand'
import { getAllBrands, getBrandById, registerBrand } from './registry'

export function BrandProvider({
  children,
  initialConfig,
  resolveOptions,
  disableDomSideEffects = false,
}: BrandProviderProps) {
  const [brand, setCurrentBrand] = useState<ClientConfig>(() => {
    if (initialConfig) return initialConfig
    return resolveBrandConfig(resolveOptions)
  })

  const [availableBrands, setAvailableBrands] = useState<ClientConfig[]>(() =>
    getAllBrands(),
  )

  const isDefaultBrand = brand.id === defaultBrandConfig.id

  const setBrand = useCallback((brandIdOrConfig: string | ClientConfig) => {
    if (typeof brandIdOrConfig === 'string') {
      const found = getBrandById(brandIdOrConfig)
      if (found) {
        setCurrentBrand(found)
      }
    } else {
      registerBrand(brandIdOrConfig)
      setAvailableBrands(getAllBrands())
      setCurrentBrand(brandIdOrConfig)
    }
  }, [])

  const registerCustomBrand = useCallback((config: ClientConfig) => {
    registerBrand(config)
    setAvailableBrands(getAllBrands())
  }, [])

  useEffect(() => {
    if (disableDomSideEffects) return
    const cleanup = applyBrandToDocument(brand)
    return cleanup
  }, [brand, disableDomSideEffects])

  const contextValue = useMemo<BrandContextValue>(
    () => ({
      brand,
      brandId: brand.id,
      isDefaultBrand,
      availableBrands,
      setBrand,
      registerCustomBrand,
    }),
    [brand, isDefaultBrand, availableBrands, setBrand, registerCustomBrand],
  )

  return (
    <BrandContext.Provider value={contextValue}>
      {children}
    </BrandContext.Provider>
  )
}
