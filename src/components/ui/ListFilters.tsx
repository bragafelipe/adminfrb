import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import './ui.css'
import { Button } from './Button'
import { Select, type SelectOption } from './Select'
import { TextField } from './TextField'

export type ListFilterValue = string | undefined

export interface ListFiltersValue {
  search?: ListFilterValue
  role?: ListFilterValue
  status?: ListFilterValue
  period?: ListFilterValue
  startDate?: ListFilterValue
  endDate?: ListFilterValue
  [key: string]: ListFilterValue | undefined
}

export interface ListFiltersField {
  key: string
  label?: string
  type?: 'search' | 'select' | 'date' | 'date-range'
  placeholder?: string
  options?: SelectOption[]
  value?: string
}

export interface ListFiltersProps {
  fields?: ListFiltersField[]
  value?: ListFiltersValue
  onChange?: (value: ListFiltersValue) => void
  onApply?: (value: ListFiltersValue) => void
  onClear?: () => void
  syncToUrl?: boolean
  searchDelay?: number
  className?: string
  clearLabel?: string
  applyLabel?: string
  actions?: ReactNode
}

const searchParamKeys = ['search', 'role', 'status', 'period', 'startDate', 'endDate']

export function ListFilters({
  actions,
  applyLabel = 'Aplicar filtros',
  className = '',
  clearLabel = 'Limpar filtros',
  fields = [],
  onApply,
  onChange,
  onClear,
  searchDelay = 300,
  syncToUrl = false,
  value,
}: ListFiltersProps) {
  const initialValue = useMemo<ListFiltersValue>(() => {
    const merged: ListFiltersValue = {}

    for (const key of searchParamKeys) {
      const nextValue = value?.[key]
      merged[key] = nextValue ?? (key === 'search' || key === 'startDate' || key === 'endDate' ? '' : 'all')
    }

    for (const field of fields) {
      if (field.key && field.value !== undefined) {
        merged[field.key] = field.value
      }
    }

    return merged
  }, [fields, value])

  const state = value ?? initialValue
  const searchTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!syncToUrl || typeof window === 'undefined') {
      return
    }

    const params = new URLSearchParams(window.location.search)

    for (const key of searchParamKeys) {
      const nextValue = state[key]
      if (nextValue && nextValue !== 'all') {
        params.set(key, nextValue)
      } else {
        params.delete(key)
      }
    }

    const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    window.history.replaceState(null, '', nextUrl)
  }, [state, syncToUrl])

  const updateState = (nextState: ListFiltersValue) => {
    onChange?.(nextState)
  }

  const handleValueChange = (key: string, nextValue: string) => {
    const nextState = { ...state, [key]: nextValue }

    if (key === 'search') {
      if (typeof window !== 'undefined' && searchTimerRef.current) {
        window.clearTimeout(searchTimerRef.current)
      }

      if (typeof window !== 'undefined') {
        searchTimerRef.current = window.setTimeout(() => {
          onChange?.(nextState)
        }, searchDelay)
      }
      return
    }

    updateState(nextState)
  }

  const handleApply = () => {
    onApply?.(state)
  }

  const handleClear = () => {
    const cleared: ListFiltersValue = {}
    for (const key of searchParamKeys) {
      cleared[key] = key === 'search' || key === 'startDate' || key === 'endDate' ? '' : 'all'
    }
    for (const field of fields) {
      cleared[field.key] = field.value ?? ''
    }

    onChange?.(cleared)
    onClear?.()
  }

  const fieldsToRender = fields.length
    ? fields
    : [
        {
          key: 'search',
          label: 'Buscar',
          type: 'search' as const,
          placeholder: 'Buscar usuários',
        },
        {
          key: 'role',
          label: 'Perfil',
          type: 'select' as const,
          options: [
            { value: 'all', label: 'Todos' },
            { value: 'admin', label: 'Administrador' },
            { value: 'editor', label: 'Editor' },
          ],
        },
        {
          key: 'status',
          label: 'Status',
          type: 'select' as const,
          options: [
            { value: 'all', label: 'Todos' },
            { value: 'active', label: 'Ativo' },
            { value: 'inactive', label: 'Inativo' },
          ],
        },
        {
          key: 'period',
          label: 'Período',
          type: 'select' as const,
          options: [
            { value: 'all', label: 'Qualquer período' },
            { value: '7', label: 'Últimos 7 dias' },
            { value: '30', label: 'Últimos 30 dias' },
            { value: '90', label: 'Últimos 90 dias' },
          ],
        },
      ]

  return (
    <div className={['ui-list-filters', className].filter(Boolean).join(' ')}>
      <div className="ui-list-filters__row">
        {fieldsToRender.map((field) => {
          if (field.type === 'search') {
            return (
              <div key={field.key} className="ui-list-filters__search">
                <TextField
                  aria-label={field.label ?? 'Buscar'}
                  label={field.label ?? 'Buscar'}
                  name={field.key}
                  onChange={(event) => handleValueChange(field.key, event.target.value)}
                  placeholder={field.placeholder ?? 'Buscar'}
                  value={state[field.key] ?? ''}
                />
              </div>
            )
          }

          if (field.type === 'date' || field.type === 'date-range') {
            return (
              <div key={field.key} className="ui-list-filters__field">
                <TextField
                  label={field.label ?? 'Data'}
                  name={field.key}
                  onChange={(event) => handleValueChange(field.key, event.target.value)}
                  type="date"
                  value={state[field.key] ?? ''}
                />
              </div>
            )
          }

          return (
            <div key={field.key} className="ui-list-filters__field">
              <Select
                label={field.label ?? field.key}
                name={field.key}
                onChange={(event) => handleValueChange(field.key, event.target.value)}
                options={field.options ?? [{ value: 'all', label: 'Todos' }]}
                value={state[field.key] ?? field.options?.[0]?.value ?? 'all'}
              />
            </div>
          )
        })}
      </div>

      <div className="ui-list-filters__actions">
        {actions}
        {onClear || onApply ? (
          <>
            {onClear ? (
              <Button onClick={handleClear} size="sm" type="button" variant="secondary">
                {clearLabel}
              </Button>
            ) : null}
            {onApply ? (
              <Button onClick={handleApply} size="sm" type="button">
                {applyLabel}
              </Button>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  )
}

export const FilterBar = ListFilters
export const FiltersBar = ListFilters
export const SearchFilters = ListFilters
