import type { ReactNode } from 'react'
import './ui.css'

export interface ActionBarProps {
  title?: string
  description?: string
  primaryAction?: ReactNode
  secondaryActions?: ReactNode
  children?: ReactNode
  className?: string
}

export function ActionBar({
  children,
  className = '',
  description,
  primaryAction,
  secondaryActions,
  title,
}: ActionBarProps) {
  const classes = ['ui-action-bar', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {(title || description || children) && (
        <div className="ui-action-bar__content">
          {title ? <h3 className="ui-action-bar__title">{title}</h3> : null}
          {description ? (
            <p className="ui-action-bar__description">{description}</p>
          ) : null}
          {children}
        </div>
      )}

      {(primaryAction || secondaryActions) && (
        <div className="ui-action-bar__actions">
          {secondaryActions}
          {primaryAction}
        </div>
      )}
    </div>
  )
}

export const ListActionBar = ActionBar
export const ActionToolbar = ActionBar
export const Toolbar = ActionBar
