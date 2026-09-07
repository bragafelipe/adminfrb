import { useId, type ReactNode } from 'react'
import { Button } from './Button'
import './ui.css'

export interface ConfirmDialogProps {
  open: boolean
  title: ReactNode
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  confirming?: boolean
}

export function ConfirmDialog({
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  confirming = false,
  description,
  onCancel,
  onConfirm,
  open,
  title,
}: ConfirmDialogProps) {
  const id = useId()

  if (!open) return null

  return (
    <div className="ui-dialog-backdrop" role="presentation">
      <section
        className="ui-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={description ? `${id}-description` : undefined}
      >
        <h2 id={`${id}-title`} className="ui-dialog__title">
          {title}
        </h2>
        {description ? (
          <p id={`${id}-description`} className="ui-dialog__description">
            {description}
          </p>
        ) : null}
        <div className="ui-dialog__actions">
          <Button variant="secondary" onClick={onCancel} disabled={confirming}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={confirming}>
            {confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  )
}
