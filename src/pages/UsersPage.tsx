import { useMemo, useState, type FormEvent } from 'react'
import {
  ActionBar,
  AdminTable,
  Badge,
  Button,
  ConfirmDialog,
  ListFilters,
  Select,
  TextField,
  type AdminTableColumn,
  type ListFiltersValue,
} from '../components/ui'
import { PageShell } from './PageShell'

type UserRole = 'admin' | 'editor' | 'viewer'
type UserStatus = 'active' | 'inactive'

interface UserRow {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
}

const roleLabels: Record<UserRole, string> = {
  admin: 'Administrador',
  editor: 'Editor',
  viewer: 'Visualizador',
}

const statusLabels: Record<UserStatus, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
}

const initialUsers: UserRow[] = [
  {
    id: 'ana-souza',
    name: 'Ana Souza',
    email: 'ana@exemplo.com',
    role: 'admin',
    status: 'active',
    createdAt: '12/01/2026',
  },
  {
    id: 'bruno-lima',
    name: 'Bruno Lima',
    email: 'bruno@exemplo.com',
    role: 'editor',
    status: 'active',
    createdAt: '18/01/2026',
  },
  {
    id: 'carla-mendes',
    name: 'Carla Mendes',
    email: 'carla@exemplo.com',
    role: 'viewer',
    status: 'inactive',
    createdAt: '03/02/2026',
  },
]

const defaultFilters: ListFiltersValue = {
  search: '',
  role: 'all',
  status: 'all',
  period: 'all',
}

const emptyForm = { name: '', email: '', role: 'viewer' as UserRole }

const columns: AdminTableColumn<UserRow>[] = [
  { key: 'name', header: 'Nome', sortable: true },
  { key: 'email', header: 'E-mail' },
  {
    key: 'role',
    header: 'Perfil',
    render: (_, user) => roleLabels[user.role],
  },
  {
    key: 'status',
    header: 'Status',
    render: (_, user) => (
      <Badge variant={user.status === 'active' ? 'success' : 'neutral'}>
        {statusLabels[user.status]}
      </Badge>
    ),
  },
  { key: 'createdAt', header: 'Cadastro' },
]

export function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [filters, setFilters] = useState<ListFiltersValue>(defaultFilters)
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null)
  const [editingUser, setEditingUser] = useState<UserRow | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<typeof emptyForm>>({})
  const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null)

  const filteredUsers = useMemo(() => {
    const search = filters.search?.trim().toLowerCase() ?? ''
    const role = filters.role ?? 'all'
    const status = filters.status ?? 'all'

    return users.filter((user) => {
      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)

      const matchesRole = role === 'all' || user.role === role
      const matchesStatus = status === 'all' || user.status === status

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [filters, users])

  const openCreateForm = () => {
    setEditingUser(null)
    setForm(emptyForm)
    setErrors({})
    setIsFormOpen(true)
  }

  const openEditForm = (user: UserRow) => {
    setEditingUser(user)
    setForm({ name: user.name, email: user.email, role: user.role })
    setErrors({})
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setErrors({})
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Partial<typeof emptyForm> = {}
    if (!form.name.trim()) nextErrors.name = 'Informe o nome do usuário.'
    if (!form.email.trim() || !form.email.includes('@')) {
      nextErrors.email = 'Informe um e-mail válido.'
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    if (editingUser) {
      setUsers((current) =>
        current.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...form,
                name: form.name.trim(),
                email: form.email.trim(),
              }
            : user,
        ),
      )
    } else {
      setUsers((current) => [
        ...current,
        {
          id: `${form.name.toLowerCase().replaceAll(' ', '-')}-${Date.now()}`,
          ...form,
          name: form.name.trim(),
          email: form.email.trim(),
          status: 'active',
          createdAt: new Date().toLocaleDateString('pt-BR'),
        },
      ])
    }
    closeForm()
  }

  const toggleStatus = (user: UserRow) => {
    setUsers((current) =>
      current.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status: item.status === 'active' ? 'inactive' : 'active',
            }
          : item,
      ),
    )
  }

  return (
    <PageShell
      title="Usuários"
      description="Gerencie os usuários e os acessos da aplicação."
    >
      <ActionBar
        title="Ações"
        description="Atualize a lista, aplique filtros ou cadastre um novo membro."
        primaryAction={
          <Button type="button" variant="primary" onClick={openCreateForm}>
            Adicionar usuário
          </Button>
        }
      />

      <ListFilters
        fields={[
          {
            key: 'search',
            label: 'Buscar',
            type: 'search',
            placeholder: 'Nome ou e-mail',
          },
          {
            key: 'role',
            label: 'Perfil',
            type: 'select',
            options: [
              { value: 'all', label: 'Todos' },
              ...Object.entries(roleLabels).map(([value, label]) => ({
                value,
                label,
              })),
            ],
          },
          {
            key: 'status',
            label: 'Status',
            type: 'select',
            options: [
              { value: 'all', label: 'Todos' },
              { value: 'active', label: 'Ativo' },
              { value: 'inactive', label: 'Inativo' },
            ],
          },
        ]}
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
          getRowId={(user) => user.id}
          actions={(user) => (
            <div className="users-page__row-actions">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedUser(user)}
              >
                Visualizar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => openEditForm(user)}
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleStatus(user)}
              >
                {user.status === 'active' ? 'Desativar' : 'Ativar'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setDeleteTarget(user)}
              >
                Excluir
              </Button>
            </div>
          )}
        />
      </section>

      {selectedUser ? (
        <aside className="users-page__panel" aria-label="Detalhes do usuário">
          <div className="users-page__panel-header">
            <div>
              <p className="users-page__eyebrow">Detalhes do usuário</p>
              <h2>{selectedUser.name}</h2>
            </div>
            <Button variant="ghost" onClick={() => setSelectedUser(null)}>
              Fechar
            </Button>
          </div>
          <dl className="users-page__details">
            <div>
              <dt>E-mail</dt>
              <dd>{selectedUser.email}</dd>
            </div>
            <div>
              <dt>Perfil</dt>
              <dd>{roleLabels[selectedUser.role]}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{statusLabels[selectedUser.status]}</dd>
            </div>
            <div>
              <dt>Cadastrado em</dt>
              <dd>{selectedUser.createdAt}</dd>
            </div>
          </dl>
          <Button
            onClick={() => {
              setSelectedUser(null)
              openEditForm(selectedUser)
            }}
          >
            Editar usuário
          </Button>
        </aside>
      ) : null}

      {isFormOpen ? (
        <div className="users-page__form-backdrop" role="presentation">
          <section
            className="users-page__form-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-form-title"
          >
            <div className="users-page__panel-header">
              <div>
                <p className="users-page__eyebrow">Cadastro</p>
                <h2 id="user-form-title">
                  {editingUser ? 'Editar usuário' : 'Adicionar usuário'}
                </h2>
              </div>
              <Button variant="ghost" onClick={closeForm}>
                Fechar
              </Button>
            </div>
            <form
              className="users-page__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <TextField
                label="Nome"
                name="name"
                value={form.name}
                error={errors.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
              <TextField
                label="E-mail"
                name="email"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
              />
              <Select
                label="Perfil"
                name="role"
                value={form.role}
                options={Object.entries(roleLabels).map(([value, label]) => ({
                  value,
                  label,
                }))}
                onChange={(event) =>
                  setForm({ ...form, role: event.target.value as UserRole })
                }
              />
              <div className="users-page__form-actions">
                <Button type="button" variant="secondary" onClick={closeForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingUser ? 'Salvar alterações' : 'Criar usuário'}
                </Button>
              </div>
            </form>
          </section>
        </div>
      ) : null}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Excluir usuário?"
        description={`Essa ação removerá ${deleteTarget?.name ?? 'este usuário'} da listagem.`}
        confirmLabel="Excluir"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget)
            setUsers((current) =>
              current.filter((user) => user.id !== deleteTarget.id),
            )
          setDeleteTarget(null)
        }}
      />
    </PageShell>
  )
}
