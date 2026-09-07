import type { HTMLAttributes, ReactNode } from 'react'
import './ui.css'

export interface EmptyStateProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}

export function EmptyState({
  action,
  children,
  className = '',
  description,
  title,
  ...props
}: EmptyStateProps) {
  return (
    <div
      {...props}
      className={['ui-empty-state', className].filter(Boolean).join(' ')}
    >
      <div className="ui-empty-state__icon" aria-hidden="true">
        —
      </div>
      <h2 className="ui-empty-state__title">{title}</h2>
      {description ? (
        <p className="ui-empty-state__description">{description}</p>
      ) : null}
      {children}
      {action ? <div className="ui-empty-state__action">{action}</div> : null}
    </div>
  )
}
