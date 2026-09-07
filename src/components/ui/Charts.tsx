import type { HTMLAttributes, ReactNode } from 'react'
import { EmptyState } from './EmptyState'
import { Skeleton } from './Skeleton'
import './ui.css'

export type ChartDatum = Record<string, string | number | null | undefined>

export interface ChartSeries {
  key: string
  label: string
  color?: string
  strokeWidth?: number
  formatValue?: (value: number) => ReactNode
}

export interface ChartLegendItem {
  label: string
  color?: string
}

export interface BaseChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  description?: ReactNode
  loading?: boolean
  emptyTitle?: ReactNode
  emptyDescription?: ReactNode
  legend?: boolean
  ariaLabel?: string
  tooltip?: boolean | ((label: string, value: number, series: ChartSeries) => ReactNode)
}

export interface LineChartProps extends BaseChartProps {
  data: ChartDatum[]
  series: ChartSeries[]
  height?: number
  padding?: number
}

export interface BarChartProps extends BaseChartProps {
  data: ChartDatum[]
  series: ChartSeries[]
  height?: number
  padding?: number
}

export interface DonutChartSegment {
  label: string
  value: number
  color?: string
}

export interface DonutChartProps extends BaseChartProps {
  data: DonutChartSegment[]
  totalLabel?: ReactNode
  centerLabel?: ReactNode
  showTotal?: boolean
}

const CHART_COLORS = [
  'var(--color-accent)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-info)',
  'var(--color-danger)',
]

function coerceNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null
  const numericValue = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numericValue) ? numericValue : null
}

function resolveColor(index: number, color?: string): string {
  return color ?? CHART_COLORS[index % CHART_COLORS.length]
}

function defaultChartTooltip(
  label: string,
  value: number,
  series: ChartSeries,
): string {
  const formattedValue = series.formatValue ? series.formatValue(value) : value
  return `${series.label}: ${label} — ${formattedValue}`
}

export function ChartLegend({ items }: { items: ChartLegendItem[] }) {
  if (!items.length) return null

  return (
    <ul className="ui-chart__legend" aria-label="Legenda do gráfico">
      {items.map((item) => (
        <li key={`${item.label}-${item.color ?? 'default'}`} className="ui-chart__legend-item">
          <span
            className="ui-chart__legend-swatch"
            style={{ background: item.color ?? 'var(--color-accent)' }}
            aria-hidden="true"
          />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  )
}

function ChartLoadingState({ title }: { title?: ReactNode }) {
  return (
    <div className="ui-chart ui-chart--loading" aria-live="polite">
      {title ? <div className="ui-chart__title ui-chart__title--loading">{title}</div> : null}
      <Skeleton width="100%" height="11rem" />
    </div>
  )
}

function ChartEmptyState({
  title,
  description,
}: {
  title: ReactNode
  description?: ReactNode
}) {
  return (
    <div className="ui-chart ui-chart--empty">
      <EmptyState title={title} description={description} />
    </div>
  )
}

function ChartFrame({
  title,
  description,
  legend,
  ariaLabel,
  children,
  series,
  className = '',
}: {
  title?: ReactNode
  description?: ReactNode
  legend?: boolean
  ariaLabel?: string
  children: ReactNode
  series?: ChartSeries[]
  className?: string
}) {
  const legendItems = (series ?? []).map((item) => ({
    label: item.label,
    color: item.color ?? resolveColor(0, item.color),
  }))

  return (
    <figure className={['ui-chart', className].filter(Boolean).join(' ')}>
      {(title || description) && (
        <figcaption className="ui-chart__header">
          {title ? <h3 className="ui-chart__title">{title}</h3> : null}
          {description ? <p className="ui-chart__description">{description}</p> : null}
        </figcaption>
      )}
      {legend && legendItems.length ? <ChartLegend items={legendItems} /> : null}
      <div className="ui-chart__canvas" aria-label={ariaLabel} role="img">
        {children}
      </div>
    </figure>
  )
}

export function LineChart({
  ariaLabel,
  className = '',
  data,
  description,
  emptyDescription,
  emptyTitle = 'Sem dados para exibir',
  height = 220,
  label,
  legend = true,
  loading = false,
  padding = 26,
  series,
  title,
  tooltip = true,
}: LineChartProps & { label?: string }) {
  if (loading) {
    return <ChartLoadingState title={title} />
  }

  if (!data.length || !series.length) {
    return (
      <ChartEmptyState title={emptyTitle} description={emptyDescription} />
    )
  }

  const width = 600
  const plotHeight = height - padding * 2
  const values = data.flatMap((point) =>
    series
      .map((item) => coerceNumber(point[item.key]))
      .filter((value): value is number => value !== null),
  )
  const minValue = values.length ? Math.min(...values) : 0
  const maxValue = values.length ? Math.max(...values) : 0
  const range = maxValue - minValue || 1
  const xStep = data.length > 1 ? (width - padding * 2) / (data.length - 1) : 0

  const renderLine = (seriesItem: ChartSeries, index: number) => {
    const points = data
      .map((point, pointIndex) => {
        const value = coerceNumber(point[seriesItem.key])
        if (value === null) return null

        const x = padding + pointIndex * xStep
        const y = height - padding - ((value - minValue) / range) * plotHeight
        return { x, y, value, label: String(point.label ?? `${pointIndex + 1}`) }
      })
      .filter((point): point is { x: number; y: number; value: number; label: string } => point !== null)

    if (!points.length) return null

    const coordinates = points
      .map((point) => `${point.x},${point.y}`)
      .join(' ')

    return (
      <g key={seriesItem.key}>
        <polyline
          fill="none"
          points={coordinates}
          stroke={resolveColor(index, seriesItem.color)}
          strokeWidth={seriesItem.strokeWidth ?? 3}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((point) => {
          const tooltipText =
            tooltip === false
              ? ''
              : typeof tooltip === 'function'
                ? tooltip(point.label, point.value, seriesItem)
                : defaultChartTooltip(point.label, point.value, seriesItem)

          return (
            <g key={`${seriesItem.key}-${point.label}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r={4}
                fill={resolveColor(index, seriesItem.color)}
              >
                {tooltipText ? <title>{String(tooltipText)}</title> : null}
              </circle>
            </g>
          )
        })}
      </g>
    )
  }

  return (
    <ChartFrame
      title={title}
      description={description}
      legend={legend}
      ariaLabel={ariaLabel ?? label ?? 'Linha do gráfico'}
      series={series}
      className={className}
    >
      <svg
        className="ui-chart__svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel ?? label ?? 'Gráfico de linha'}
      >
        {[0, 1, 2, 3].map((tick) => {
          const value = minValue + ((maxValue - minValue) / 3) * tick
          const y = height - padding - ((value - minValue) / range) * plotHeight
          return (
            <g key={`grid-${tick}`}>
              <line
                x1={padding}
                x2={width - padding}
                y1={y}
                y2={y}
                className="ui-chart__grid-line"
              />
              <text x={8} y={y + 4} className="ui-chart__axis-label">
                {Number(value).toLocaleString('pt-BR', {
                  maximumFractionDigits: 0,
                })}
              </text>
            </g>
          )
        })}
        {data.map((point, index) => {
          const x = padding + index * xStep
          return (
            <g key={`label-${String(point.label ?? index)}`}>
              <line
                x1={x}
                x2={x}
                y1={height - padding}
                y2={height - padding + 6}
                className="ui-chart__axis-tick"
              />
              <text
                x={x}
                y={height - padding + 18}
                textAnchor="middle"
                className="ui-chart__axis-label"
              >
                {String(point.label ?? index + 1)}
              </text>
            </g>
          )
        })}
        {series.map((item, index) => renderLine(item, index))}
      </svg>
    </ChartFrame>
  )
}

export function BarChart({
  ariaLabel,
  className = '',
  data,
  description,
  emptyDescription,
  emptyTitle = 'Sem dados para exibir',
  height = 220,
  label,
  legend = true,
  loading = false,
  padding = 30,
  series,
  title,
  tooltip = true,
}: BarChartProps & { label?: string }) {
  if (loading) {
    return <ChartLoadingState title={title} />
  }

  if (!data.length || !series.length) {
    return (
      <ChartEmptyState title={emptyTitle} description={emptyDescription} />
    )
  }

  const width = 600
  const plotHeight = height - padding * 2
  const allValues = data.flatMap((point) =>
    series
      .map((item) => coerceNumber(point[item.key]))
      .filter((value): value is number => value !== null),
  )
  const minValue = allValues.length ? Math.min(...allValues) : 0
  const maxValue = allValues.length ? Math.max(...allValues) : 0
  const range = maxValue - minValue || 1
  const groupWidth = Math.max(48, (width - padding * 2) / data.length)
  const barWidth = Math.min(24, groupWidth / Math.max(series.length, 1))

  return (
    <ChartFrame
      title={title}
      description={description}
      legend={legend}
      ariaLabel={ariaLabel ?? label ?? 'Gráfico de barras'}
      series={series}
      className={className}
    >
      <svg
        className="ui-chart__svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel ?? label ?? 'Gráfico de barras'}
      >
        {[0, 1, 2, 3].map((tick) => {
          const value = minValue + ((maxValue - minValue) / 3) * tick
          const y = height - padding - ((value - minValue) / range) * plotHeight
          return (
            <g key={`grid-${tick}`}>
              <line
                x1={padding}
                x2={width - padding}
                y1={y}
                y2={y}
                className="ui-chart__grid-line"
              />
              <text x={8} y={y + 4} className="ui-chart__axis-label">
                {Number(value).toLocaleString('pt-BR', {
                  maximumFractionDigits: 0,
                })}
              </text>
            </g>
          )
        })}
        {data.map((point, pointIndex) => {
          const xStart = padding + pointIndex * groupWidth + 10
          const label = String(point.label ?? pointIndex + 1)

          return (
            <g key={`bar-group-${label}`}>
              {series.map((seriesItem, seriesIndex) => {
                const value = coerceNumber(point[seriesItem.key])
                if (value === null) return null
                const barHeight = ((value - minValue) / range) * plotHeight
                const x = xStart + seriesIndex * barWidth
                const y = height - padding - barHeight
                const tooltipText =
                  tooltip === false
                    ? ''
                    : typeof tooltip === 'function'
                      ? tooltip(label, value, seriesItem)
                      : defaultChartTooltip(label, value, seriesItem)

                return (
                  <g key={`${seriesItem.key}-${label}`}>
                    <rect
                      x={x}
                      y={y}
                      width={Math.max(12, barWidth - 4)}
                      height={barHeight}
                      rx={6}
                      fill={resolveColor(seriesIndex, seriesItem.color)}
                    >
                      {tooltipText ? <title>{String(tooltipText)}</title> : null}
                    </rect>
                  </g>
                )
              })}
              <text
                x={xStart + groupWidth / 2 - 8}
                y={height - padding + 18}
                textAnchor="middle"
                className="ui-chart__axis-label"
              >
                {label}
              </text>
            </g>
          )
        })}
      </svg>
    </ChartFrame>
  )
}

export function DonutChart({
  ariaLabel,
  className = '',
  centerLabel,
  data,
  description,
  emptyDescription,
  emptyTitle = 'Sem dados para exibir',
  legend = true,
  loading = false,
  showTotal = true,
  title,
  totalLabel = 'Total',
  tooltip = true,
}: DonutChartProps) {
  if (loading) {
    return <ChartLoadingState title={title} />
  }

  if (!data.length) {
    return (
      <ChartEmptyState title={emptyTitle} description={emptyDescription} />
    )
  }

  const radius = 54
  const circumference = 2 * Math.PI * radius
  const total = data.reduce((sum, item) => sum + Math.max(item.value, 0), 0) || 1
  const segments = data.reduce<{ dash: number; offset: number }[]>((acc, item) => {
    const share = Math.max(item.value, 0) / total
    const dash = share * circumference
    const previous = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0
    acc.push({ dash, offset: -previous })
    return acc
  }, [])

  return (
    <ChartFrame
      title={title}
      description={description}
      legend={legend}
      ariaLabel={ariaLabel ?? 'Gráfico de rosca'}
      series={data.map((item, index) => ({
        key: item.label,
        label: item.label,
        color: resolveColor(index, item.color),
      }))}
      className={className}
    >
      <svg
        className="ui-chart__svg ui-chart__svg--donut"
        viewBox="0 0 220 220"
        role="img"
        aria-label={ariaLabel ?? 'Gráfico de rosca'}
      >
        <circle
          cx="110"
          cy="110"
          r={radius}
          className="ui-chart__donut-track"
        />
        {data.map((item, index) => {
          const segment = segments[index]
          if (!segment) return null

          const circle = (
            <circle
              key={`${item.label}-${index}`}
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke={resolveColor(index, item.color)}
              strokeWidth="16"
              strokeDasharray={`${segment.dash} ${circumference - segment.dash}`}
              strokeDashoffset={segment.offset}
              strokeLinecap="round"
              transform="rotate(-90 110 110)"
            >
              {tooltip !== false ? <title>{String(typeof tooltip === 'function' ? tooltip(item.label, item.value, { key: item.label, label: item.label, color: resolveColor(index, item.color) }) : `${item.label}: ${item.value}`)}</title> : null}
            </circle>
          )
          return circle
        })}
        <text x="110" y="105" textAnchor="middle" className="ui-chart__donut-value">
          {centerLabel ?? (showTotal ? total.toLocaleString('pt-BR') : totalLabel)}
        </text>
        {showTotal ? (
          <text x="110" y="130" textAnchor="middle" className="ui-chart__donut-caption">
            {totalLabel}
          </text>
        ) : null}
      </svg>
    </ChartFrame>
  )
}

export const PieChart = DonutChart
