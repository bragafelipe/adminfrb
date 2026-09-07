import type { HTMLAttributes } from 'react'
import './ui.css'

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
}

export function Badge({
  children,
  className = '',
  size = 'md',
  variant = 'neutral',
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={[
        'ui-badge',
        `ui-badge--${variant}`,
        `ui-badge--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
