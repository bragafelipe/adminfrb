import type { InputHTMLAttributes } from 'react'
import './ui.css'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
}

export function TextField({
  className = '',
  error,
  hint,
  id,
  label,
  ...props
}: TextFieldProps) {
  const generatedId = id ?? props.name ?? 'text-field'
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
      <input
        {...props}
        id={generatedId}
        className="ui-field__input"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
      />
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
