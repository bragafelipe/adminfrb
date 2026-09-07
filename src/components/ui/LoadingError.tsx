import type { ReactNode } from 'react'
import { Alert } from './Alert'
import { Button } from './Button'

export interface LoadingErrorProps {
  title?: ReactNode
  description?: ReactNode
  retryLabel?: string
  onRetry: () => void
}

export function LoadingError({
  description = 'Não foi possível carregar os dados. Tente novamente.',
  onRetry,
  retryLabel = 'Tentar novamente',
  title = 'Erro ao carregar',
}: LoadingErrorProps) {
  return (
    <Alert variant="danger" title={title}>
      <p className="ui-loading-error__description">{description}</p>
      <Button variant="secondary" size="sm" onClick={onRetry}>
        {retryLabel}
      </Button>
    </Alert>
  )
}
