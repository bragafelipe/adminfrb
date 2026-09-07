import type { HTMLAttributes } from 'react'
import './ui.css'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  label?: string
}

export function Spinner({
  className = '',
  label = 'Carregando',
  size = 'md',
  ...props
}: SpinnerProps) {
  return (
    <span
      {...props}
      className={['ui-spinner', `ui-spinner--${size}`, className]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-label={label}
    />
  )
}
