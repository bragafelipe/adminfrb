import { useBrand } from '@/features/brand'
import { BrandLogo } from './BrandLogo'
import { Navigation } from './Navigation'

export function Header() {
  const { brand, availableBrands, setBrand } = useBrand()

  return (
    <header className="layout__header">
      <div className="layout__header-inner">
        <a href="#" className="brand-badge" aria-label={brand.companyName}>
          <BrandLogo logo={brand.logo} />
          <div className="brand-badge__info">
            <span className="brand-badge__name">{brand.companyName}</span>
            {brand.tagline && (
              <span className="brand-badge__tagline">{brand.tagline}</span>
            )}
          </div>
        </a>

        <Navigation />

        <div className="layout__actions">
          {availableBrands.length > 1 && (
            <label className="brand-selector">
              <span>Marca:</span>
              <select
                value={brand.id}
                onChange={(e) => setBrand(e.target.value)}
                aria-label="Selecionar Marca White-label"
              >
                {availableBrands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.companyName} ({b.id})
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>
    </header>
  )
}
