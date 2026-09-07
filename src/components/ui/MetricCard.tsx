import type { HTMLAttributes, ReactNode } from 'react'
import { Skeleton } from './Skeleton'
import { TrendWidget, type TrendDirection } from './TrendWidget'
import './ui.css'

export interface MetricCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  title: ReactNode
  value: number | string
  formatValue?: (value: number | string) => ReactNode
  trend?: TrendDirection
  trendValue?: number | string
  formatComparison?: (value: number | string) => ReactNode
  comparison?: ReactNode
  comparisonLabel?: ReactNode
  period?: ReactNode
  periodLabel?: ReactNode
  icon?: ReactNode
  actions?: ReactNode
  loading?: boolean
  className?: string
}

export function MetricCard({
  actions,
  className = '',
  comparison,
  comparisonLabel,
  formatComparison,
  formatValue,
  icon,
  loading = false,
  period,
  periodLabel,
  title,
  trend,
  trendValue,
  value,
  ...props
}: MetricCardProps) {
  const periodText = period || periodLabel || comparisonLabel

  const classes = ['ui-metric-card', className].filter(Boolean).join(' ')

  if (loading) {
    return (
      <div
        {...props}
        className={`${classes} ui-metric-card--loading`}
        aria-busy="true"
        aria-label="Carregando métrica..."
      >
        <div className="ui-metric-card__header">
          <Skeleton width="50%" height="1.1rem" />
          <Skeleton width="2rem" height="2rem" variant="circle" />
        </div>
        <div className="ui-metric-card__body">
          <Skeleton
            width="65%"
            height="2.25rem"
            style={{ margin: '0.5rem 0' }}
          />
        </div>
        <div className="ui-metric-card__footer">
          <Skeleton width="35%" height="1.25rem" />
          <Skeleton width="40%" height="0.875rem" />
        </div>
      </div>
    )
  }

  const renderedValue = formatValue
    ? formatValue(value)
    : typeof value === 'number'
      ? value.toLocaleString('pt-BR')
      : value

  const hasTrend = trend !== undefined || trendValue !== undefined
  const hasFooter = Boolean(comparison || hasTrend || periodText)

  return (
    <div {...props} className={classes}>
      <div className="ui-metric-card__header">
        <div className="ui-metric-card__title">
          {typeof title === 'string' ? <span>{title}</span> : title}
        </div>
        {(icon || actions) && (
          <div className="ui-metric-card__header-right">
            {actions && (
              <div className="ui-metric-card__actions">{actions}</div>
            )}
            {icon && (
              <div className="ui-metric-card__icon" aria-hidden="true">
                {icon}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="ui-metric-card__body">
        <div className="ui-metric-card__value">{renderedValue}</div>
      </div>

      {hasFooter && (
        <div className="ui-metric-card__footer">
          {comparison ? (
            comparison
          ) : hasTrend ? (
            <TrendWidget
              trend={trend}
              value={trendValue}
              formatValue={formatComparison}
            />
          ) : null}
          {periodText && (
            <span className="ui-metric-card__period">{periodText}</span>
          )}
        </div>
      )}
    </div>
  )
}
