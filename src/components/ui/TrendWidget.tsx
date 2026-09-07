import type { HTMLAttributes, ReactNode } from 'react'
import { Skeleton } from './Skeleton'
import './ui.css'

export type TrendDirection =
  'positive' | 'negative' | 'neutral' | 'up' | 'down' | 'flat'

export type TrendWidgetSize = 'sm' | 'md' | 'lg'

export interface TrendWidgetProps extends HTMLAttributes<HTMLSpanElement> {
  trend?: TrendDirection
  value?: number | string
  label?: ReactNode
  icon?: ReactNode
  formatValue?: (value: number | string) => ReactNode
  size?: TrendWidgetSize
  loading?: boolean
  className?: string
}

function normalizeDirection(
  trend: TrendDirection = 'neutral',
): 'positive' | 'negative' | 'neutral' {
  if (trend === 'up' || trend === 'positive') return 'positive'
  if (trend === 'down' || trend === 'negative') return 'negative'
  return 'neutral'
}

function DefaultTrendIcon({
  direction,
}: {
  direction: 'positive' | 'negative' | 'neutral'
}) {
  if (direction === 'positive') {
    return (
      <svg
        className="ui-trend-widget__icon"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 7.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L14 7.414V16a1 1 0 11-2 0V7.414z"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  if (direction === 'negative') {
    return (
      <svg
        className="ui-trend-widget__icon"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 12.586l4.293-4.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 011.414-1.414L10 12.586V4a1 1 0 112 0v8.586z"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  return (
    <svg
      className="ui-trend-widget__icon"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5 10a1 1 0 011-1h10a1 1 0 110 2H6a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function defaultFormatTrendValue(
  val: number | string,
  dir: 'positive' | 'negative' | 'neutral',
): ReactNode {
  if (typeof val === 'number') {
    const absVal = Math.abs(val)
    const formatted = absVal.toLocaleString('pt-BR', {
      maximumFractionDigits: 1,
    })
    const sign = dir === 'positive' ? '+' : dir === 'negative' ? '-' : ''
    return `${sign}${formatted}%`
  }
  return val
}

export function TrendWidget({
  className = '',
  formatValue,
  icon,
  label,
  loading = false,
  size = 'md',
  trend = 'neutral',
  value,
  ...props
}: TrendWidgetProps) {
  if (loading) {
    return (
      <span
        className={[
          'ui-trend-widget',
          'ui-trend-widget--loading',
          `ui-trend-widget--${size}`,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Skeleton width="4rem" height="1.25rem" />
      </span>
    )
  }

  const normalizedDir = normalizeDirection(trend)

  const renderedValue =
    value !== undefined
      ? formatValue
        ? formatValue(value)
        : defaultFormatTrendValue(value, normalizedDir)
      : null

  const classes = [
    'ui-trend-widget',
    `ui-trend-widget--${normalizedDir}`,
    `ui-trend-widget--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      {...props}
      className={classes}
      aria-label={
        props['aria-label'] ||
        `Tendência ${normalizedDir}${value !== undefined ? `: ${value}` : ''}`
      }
    >
      {icon ? (
        <span className="ui-trend-widget__icon-wrapper">{icon}</span>
      ) : (
        <DefaultTrendIcon direction={normalizedDir} />
      )}
      {renderedValue !== null && (
        <span className="ui-trend-widget__value">{renderedValue}</span>
      )}
      {label && <span className="ui-trend-widget__label">{label}</span>}
    </span>
  )
}
