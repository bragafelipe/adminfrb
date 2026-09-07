import type { InputHTMLAttributes, ReactNode } from 'react'
import './ui.css'

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label: ReactNode
  description?: ReactNode
  error?: string
}

export function Checkbox({
  className = '',
  description,
  error,
  label,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={['ui-checkbox', error ? 'ui-checkbox--error' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        {...props}
        type="checkbox"
        className="ui-checkbox__input"
        aria-invalid={error ? true : undefined}
      />
      <span className="ui-checkbox__control" aria-hidden="true" />
      <span className="ui-checkbox__content">
        <span className="ui-checkbox__label">{label}</span>
        {description ? (
          <span className="ui-checkbox__description">{description}</span>
        ) : null}
        {error ? <span className="ui-checkbox__error">{error}</span> : null}
      </span>
    </label>
  )
}
