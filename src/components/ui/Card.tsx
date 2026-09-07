import type { HTMLAttributes, ReactNode } from 'react'
import { Skeleton } from './Skeleton'
import './ui.css'

export interface CardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  title?: ReactNode
  subtitle?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  loading?: boolean
  className?: string
}

export function Card({
  actions,
  children,
  className = '',
  description,
  footer,
  loading = false,
  subtitle,
  title,
  ...props
}: CardProps) {
  const cardDescription = description || subtitle

  return (
    <div
      {...props}
      className={['ui-card', loading && 'ui-card--loading', className]
        .filter(Boolean)
        .join(' ')}
      aria-busy={loading ? 'true' : undefined}
    >
      {loading ? (
        <div className="ui-card__loading" aria-label="Carregando conteúdo...">
          <div className="ui-card__header">
            <div className="ui-card__header-text">
              <Skeleton width="40%" height="1.25rem" />
              <Skeleton
                width="60%"
                height="0.875rem"
                style={{ marginTop: '0.35rem' }}
              />
            </div>
          </div>
          <div className="ui-card__body">
            <Skeleton width="100%" height="4rem" />
          </div>
        </div>
      ) : (
        <>
          {(title || cardDescription || actions) && (
            <div className="ui-card__header">
              <div className="ui-card__header-text">
                {title && (
                  <div className="ui-card__title">
                    {typeof title === 'string' ? <h3>{title}</h3> : title}
                  </div>
                )}
                {cardDescription && (
                  <div className="ui-card__description">
                    {typeof cardDescription === 'string' ? (
                      <p>{cardDescription}</p>
                    ) : (
                      cardDescription
                    )}
                  </div>
                )}
              </div>
              {actions && <div className="ui-card__actions">{actions}</div>}
            </div>
          )}
          {children && <div className="ui-card__body">{children}</div>}
          {footer && <div className="ui-card__footer">{footer}</div>}
        </>
      )}
    </div>
  )
}
