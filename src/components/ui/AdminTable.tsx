import { useMemo, useState, type ReactNode } from 'react'
import './ui.css'

export interface AdminTableColumn<T> {
  key: keyof T | string
  header: ReactNode
  sortable?: boolean
  render?: (value: unknown, row: T, index: number) => ReactNode
  sortValue?: (row: T) => string | number
}

export interface AdminTablePagination {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[]
  data: T[]
  ariaLabel: string
  loading?: boolean
  error?: ReactNode
  emptyMessage?: ReactNode
  onRetry?: () => void
  actions?: (row: T) => ReactNode
  getRowId?: (row: T, index: number) => string
  selectable?: boolean
  selectedRowIds?: string[]
  onSelectionChange?: (rowIds: string[]) => void
  pagination?: AdminTablePagination
}

type SortState = {
  key: string
  direction: 'ascending' | 'descending'
}

export function AdminTable<T>({
  actions,
  ariaLabel,
  columns,
  data,
  emptyMessage = 'Nenhum registro encontrado.',
  error,
  getRowId = (_row, index) => String(index),
  loading = false,
  onRetry,
  onSelectionChange,
  pagination,
  selectable = false,
  selectedRowIds,
}: AdminTableProps<T>) {
  const [sort, setSort] = useState<SortState | null>(null)
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([])
  const selectedIds = selectedRowIds ?? internalSelectedIds
  const rows = useMemo(() => {
    if (!sort) return data

    const column = columns.find((item) => String(item.key) === sort.key)
    if (!column) return data

    return [...data].sort((left, right) => {
      const leftValue = column.sortValue
        ? column.sortValue(left)
        : String(left[column.key as keyof T] ?? '')
      const rightValue = column.sortValue
        ? column.sortValue(right)
        : String(right[column.key as keyof T] ?? '')
      const comparison =
        leftValue < rightValue ? -1 : leftValue > rightValue ? 1 : 0
      return sort.direction === 'ascending' ? comparison : -comparison
    })
  }, [columns, data, sort])

  const updateSelection = (ids: string[]) => {
    setInternalSelectedIds(ids)
    onSelectionChange?.(ids)
  }

  const toggleSort = (column: AdminTableColumn<T>) => {
    if (!column.sortable) return
    const key = String(column.key)
    setSort((current) =>
      current?.key === key
        ? {
            key,
            direction:
              current.direction === 'ascending' ? 'descending' : 'ascending',
          }
        : { key, direction: 'ascending' },
    )
  }

  const allRowsSelected =
    rows.length > 0 &&
    rows.every((row, index) => selectedIds.includes(getRowId(row, index)))

  const toggleAll = () => {
    if (allRowsSelected) {
      updateSelection(
        selectedIds.filter(
          (id) => !rows.some((row, index) => getRowId(row, index) === id),
        ),
      )
    } else {
      updateSelection([
        ...new Set([
          ...selectedIds,
          ...rows.map((row, index) => getRowId(row, index)),
        ]),
      ])
    }
  }

  const getCellValue = (row: T, column: AdminTableColumn<T>) =>
    row[column.key as keyof T]

  return (
    <div className="ui-admin-table" aria-busy={loading}>
      <div className="ui-admin-table__scroll">
        <table aria-label={ariaLabel}>
          <thead>
            <tr>
              {selectable ? (
                <th scope="col" className="ui-admin-table__selection">
                  <input
                    type="checkbox"
                    aria-label="Selecionar todos os registros"
                    checked={allRowsSelected}
                    onChange={toggleAll}
                    disabled={loading || rows.length === 0}
                  />
                </th>
              ) : null}
              {columns.map((column) => {
                const key = String(column.key)
                const direction = sort?.key === key ? sort.direction : 'none'
                return (
                  <th
                    key={key}
                    scope="col"
                    aria-sort={column.sortable ? direction : undefined}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className="ui-admin-table__sort"
                        onClick={() => toggleSort(column)}
                        aria-label={`Ordenar por ${String(column.header)}`}
                      >
                        {column.header}
                        <span aria-hidden="true">
                          {direction === 'ascending'
                            ? ' ↑'
                            : direction === 'descending'
                              ? ' ↓'
                              : ' ↕'}
                        </span>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                )
              })}
              {actions ? <th scope="col">Ações</th> : null}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  className="ui-admin-table__message"
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)
                  }
                >
                  <span role="status">Carregando registros…</span>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  className="ui-admin-table__message"
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)
                  }
                >
                  <div role="alert">
                    <p>{error}</p>
                    {onRetry ? (
                      <button type="button" onClick={onRetry}>
                        Tentar novamente
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  className="ui-admin-table__message"
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)
                  }
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => {
                const rowId = getRowId(row, index)
                return (
                  <tr key={rowId}>
                    {selectable ? (
                      <td
                        className="ui-admin-table__selection"
                        data-label="Selecionar"
                      >
                        <input
                          type="checkbox"
                          aria-label={`Selecionar registro ${rowId}`}
                          checked={selectedIds.includes(rowId)}
                          onChange={() =>
                            updateSelection(
                              selectedIds.includes(rowId)
                                ? selectedIds.filter((id) => id !== rowId)
                                : [...selectedIds, rowId],
                            )
                          }
                        />
                      </td>
                    ) : null}
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        data-label={String(column.header)}
                      >
                        {column.render
                          ? column.render(getCellValue(row, column), row, index)
                          : String(getCellValue(row, column) ?? '—')}
                      </td>
                    ))}
                    {actions ? (
                      <td
                        className="ui-admin-table__actions"
                        data-label="Ações"
                      >
                        {actions(row)}
                      </td>
                    ) : null}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && pagination.totalPages > 1 ? (
        <nav className="ui-admin-table__pagination" aria-label="Paginação">
          <button
            type="button"
            onClick={() => pagination.onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1 || loading}
          >
            Anterior
          </button>
          <span>
            Página {pagination.page} de {pagination.totalPages}
          </span>
          <button
            type="button"
            onClick={() => pagination.onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages || loading}
          >
            Próxima
          </button>
        </nav>
      ) : null}
    </div>
  )
}
