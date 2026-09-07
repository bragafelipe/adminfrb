/**
 * Formatting utilities for metric cards and widgets.
 */

export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
  locale = 'pt-BR',
): string {
  return new Intl.NumberFormat(locale, options).format(value)
}

export function formatCurrency(
  value: number,
  currency = 'BRL',
  locale = 'pt-BR',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

export function formatPercent(
  value: number,
  includeSign = false,
  locale = 'pt-BR',
): string {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  }).format(value / 100)

  if (includeSign && value > 0) {
    return `+${formatted}`
  }
  return formatted
}
