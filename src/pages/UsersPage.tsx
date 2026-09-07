import { useMemo, useState } from 'react'
import {
  ActionBar,
  AdminTable,
  Button,
  ListFilters,
  type AdminTableColumn,
  type ListFiltersValue,
} from '../components/ui'
import { PageShell } from './PageShell'

interface UserRow {
  name: string
  email: string
  role: string
  status: string
}

const columns: AdminTableColumn<UserRow>[] = [
  { key: 'name', header: 'Nome', sortable: true },
  { key: 'email', header: 'E-mail' },
  { key: 'role', header: 'Perfil' },
  { key: 'status', header: 'Status' },
]

const users: UserRow[] = [
  {
    name: 'Ana Souza',
    email: 'ana@exemplo.com',
    role: 'Admin',
    status: 'Ativo',
  },
  {
    name: 'Bruno Lima',
    email: 'bruno@exemplo.com',
    role: 'Editor',
    status: 'Ativo',
  },
]

const defaultFilters: ListFiltersValue = {
  search: '',
  role: 'all',
  status: 'all',
  period: 'all',
}

export function UsersPage() {
  const [filters, setFilters] = useState<ListFiltersValue>(defaultFilters)

  const filteredUsers = useMemo(() => {
    const search = filters.search?.trim().toLowerCase() ?? ''
    const role = filters.role ?? 'all'
    const status = filters.status ?? 'all'

    return users.filter((user) => {
      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)

      const matchesRole = role === 'all' || user.role.toLowerCase() === role.toLowerCase()
      const matchesStatus =
        status === 'all' || user.status.toLowerCase() === status.toLowerCase()

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [filters])

  return (
    <PageShell
      title="Usuários"
      description="Gerencie os usuários e os acessos da aplicação."
    >
      <ActionBar
        title="Ações"
        description="Atualize a lista, aplique filtros ou cadastre um novo membro."
        primaryAction={
          <Button type="button" variant="primary">
            Adicionar usuário
          </Button>
        }
      />

      <ListFilters
        value={filters}
        onChange={setFilters}
        onApply={setFilters}
        onClear={() => setFilters(defaultFilters)}
        syncToUrl
      />

      <section className="page-shell__card" aria-label="Lista de usuários">
        <h2>Usuários cadastrados</h2>
        <AdminTable
          ariaLabel="Usuários cadastrados"
          columns={columns}
          data={filteredUsers}
          getRowId={(user) => user.email}
          actions={(user) => (
            <button type="button" aria-label={`Editar ${user.name}`}>
              Editar
            </button>
          )}
        />
      </section>
    </PageShell>
  )
}
