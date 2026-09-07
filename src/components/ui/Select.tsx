import type { SelectHTMLAttributes } from 'react'
import './ui.css'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  hint?: string
  error?: string
  options: SelectOption[]
}

export function Select({
  className = '',
  error,
  hint,
  id,
  label,
  options,
  ...props
}: SelectProps) {
  const generatedId = id ?? props.name ?? 'select-field'
  const message = error ?? hint
  const describedBy = [
    hint ? `${generatedId}-hint` : '',
    error ? `${generatedId}-error` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label
      className={['ui-field', error ? 'ui-field--error' : '', className]
        .filter(Boolean)
        .join(' ')}
      htmlFor={generatedId}
    >
      <span className="ui-field__label">{label}</span>
      <select
        {...props}
        id={generatedId}
        className="ui-field__input ui-field__select"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {message ? (
        <span
          className={[
            'ui-field__message',
            error ? 'ui-field__message--error' : 'ui-field__message--hint',
          ]
            .filter(Boolean)
            .join(' ')}
          id={error ? `${generatedId}-error` : `${generatedId}-hint`}
        >
          {message}
        </span>
      ) : null}
    </label>
  )
}
