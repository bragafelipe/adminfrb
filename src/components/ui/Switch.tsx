import type { InputHTMLAttributes, ReactNode } from 'react'
import './ui.css'

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label: ReactNode
  description?: ReactNode
}

export function Switch({
  className = '',
  description,
  label,
  ...props
}: SwitchProps) {
  return (
    <label className={['ui-switch', className].filter(Boolean).join(' ')}>
      <input {...props} type="checkbox" className="ui-switch__input" />
      <span className="ui-switch__track" aria-hidden="true">
        <span className="ui-switch__thumb" />
      </span>
      <span className="ui-switch__content">
        <span className="ui-switch__label">{label}</span>
        {description ? (
          <span className="ui-switch__description">{description}</span>
        ) : null}
      </span>
    </label>
  )
}
