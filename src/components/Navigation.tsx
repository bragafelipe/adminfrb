import { useBrandNavigation } from '@/features/brand'

interface NavigationProps {
  currentPath?: string
  className?: string
}

export function Navigation({
  currentPath = '#',
  className = '',
}: NavigationProps) {
  const items = useBrandNavigation()

  return (
    <nav
      className={`layout__nav ${className}`.trim()}
      aria-label="Navegação Principal"
    >
      {items.map((item) => {
        const isActive =
          item.href === currentPath ||
          (currentPath === '#' && item.href === '#')
        return (
          <a
            key={item.id}
            href={item.href}
            target={item.target ?? (item.external ? '_blank' : undefined)}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span className="nav-item__badge">{item.badge}</span>
            )}
          </a>
        )
      })}
    </nav>
  )
}
