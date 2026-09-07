import type { ReactNode } from 'react'
import { Alert, type AlertProps } from './Alert'

export interface ToastProps extends Omit<
  AlertProps,
  'role' | 'title' | 'variant'
> {
  title?: ReactNode
  variant?: AlertProps['variant']
  onDismiss?: () => void
  dismissLabel?: string
}

export function Toast({
  children,
  dismissLabel = 'Fechar mensagem',
  onDismiss,
  ...props
}: ToastProps) {
  return (
    <div className="ui-toast" role="region" aria-label="Notificação">
      <Alert {...props} role="status">
        <div className="ui-toast__content">{children}</div>
        {onDismiss ? (
          <button
            type="button"
            className="ui-toast__dismiss"
            aria-label={dismissLabel}
            onClick={onDismiss}
          >
            ×
          </button>
        ) : null}
      </Alert>
    </div>
  )
}
