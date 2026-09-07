import { useBrand } from '@/features/brand'

interface HeaderProps {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { brand, availableBrands, setBrand } = useBrand()

  return (
    <header className="layout__header">
      <div className="layout__header-inner">
        <button
          className="mobile-menu-toggle"
          type="button"
          onClick={onMenuToggle}
          aria-label="Abrir menu de navegação"
        >
          <span aria-hidden="true">☰</span>
        </button>

        <div className="layout__actions">
          <button
            className="header-action"
            type="button"
            aria-label="Notificações"
            title="Notificações"
          >
            <span aria-hidden="true">♢</span>
          </button>
          <button
            className="header-action header-action--user"
            type="button"
            aria-label="Menu do usuário"
            aria-haspopup="menu"
          >
            <span aria-hidden="true">●</span>
            <span className="header-action__label">Minha conta</span>
          </button>
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
