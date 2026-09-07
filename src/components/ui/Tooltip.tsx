import type { PropsWithChildren, ReactNode } from 'react'
import './ui.css'

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps extends PropsWithChildren {
  content: ReactNode
  side?: TooltipSide
}

export function Tooltip({ children, content, side = 'top' }: TooltipProps) {
  return (
    <span
      className={`ui-tooltip ui-tooltip--${side}`}
      tabIndex={0}
      aria-label={String(content)}
    >
      <span className="ui-tooltip__trigger">{children}</span>
      <span className="ui-tooltip__bubble" role="tooltip">
        {content}
      </span>
    </span>
  )
}
