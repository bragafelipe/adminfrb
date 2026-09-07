import { useBrand } from '@/features/brand'
import { Link } from 'react-router-dom'
import { BrandLogo } from './BrandLogo'
import { Navigation } from './Navigation'

interface SidebarProps {
  isCollapsed: boolean
  isMobileOpen: boolean
  onCollapse: () => void
  onCloseMobile: () => void
}

export function Sidebar({
  isCollapsed,
  isMobileOpen,
  onCollapse,
  onCloseMobile,
}: SidebarProps) {
  const { brand } = useBrand()

  return (
    <>
      <aside
        className={`layout__sidebar ${isMobileOpen ? 'layout__sidebar--open' : ''}`}
        aria-label="Barra lateral"
      >
        <div className="layout__sidebar-header">
          <Link className="brand-badge" to="/" aria-label={brand.companyName}>
            <BrandLogo logo={brand.logo} />
            <span className="brand-badge__info">
              <span className="brand-badge__name">{brand.companyName}</span>
              {brand.tagline && (
                <span className="brand-badge__tagline">{brand.tagline}</span>
              )}
            </span>
          </Link>
          <button
            className="sidebar-toggle"
            type="button"
            onClick={onCollapse}
            aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
            title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            <span aria-hidden="true">{isCollapsed ? '→' : '←'}</span>
          </button>
        </div>
        <Navigation onNavigate={onCloseMobile} />
      </aside>
      {isMobileOpen && (
        <button
          className="layout__backdrop"
          type="button"
          aria-label="Fechar menu"
          onClick={onCloseMobile}
        />
      )}
    </>
  )
}
