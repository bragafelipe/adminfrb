import type { HTMLAttributes, ReactNode } from 'react'
import './ui.css'

export type FeedbackVariant = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  variant?: FeedbackVariant
  title?: ReactNode
}

export function Alert({
  children,
  className = '',
  role,
  title,
  variant = 'info',
  ...props
}: AlertProps) {
  return (
    <div
      {...props}
      className={['ui-alert', `ui-alert--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      role={role ?? (variant === 'danger' ? 'alert' : 'status')}
    >
      <div className="ui-alert__body">
        {title ? <strong className="ui-alert__title">{title}</strong> : null}
        <div>{children}</div>
      </div>
    </div>
  )
}
