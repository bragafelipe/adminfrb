import { useBrandNavigation } from '@/features/brand'
import { NavLink } from 'react-router-dom'

interface NavigationProps {
  className?: string
}

export function Navigation({ className = '' }: NavigationProps) {
  const items = useBrandNavigation()

  return (
    <nav
      className={`layout__nav ${className}`.trim()}
      aria-label="Navegação Principal"
    >
      {items.map((item) => {
        if (item.external) {
          return (
            <a
              key={item.id}
              href={item.href}
              target={item.target ?? '_blank'}
              rel="noopener noreferrer"
              className="nav-item"
            >
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="nav-item__badge">{item.badge}</span>
              )}
            </a>
          )
        }

        return (
          <NavLink
            key={item.id}
            to={item.href}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item--active' : ''}`
            }
          >
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span className="nav-item__badge">{item.badge}</span>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
